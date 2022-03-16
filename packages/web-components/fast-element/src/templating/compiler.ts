import { isString, TrustedTypesPolicy } from "../interfaces.js";
import { DOM } from "../dom.js";
import type { ExecutionContext } from "../observation/observable.js";
import { Parser } from "./markup.js";
import { bind, oneTime } from "./binding.js";
import type {
    AspectedHTMLDirective,
    HTMLDirective,
    ViewBehaviorFactory,
} from "./html-directive.js";
import type { HTMLTemplateCompilationResult as TemplateCompilationResult } from "./template.js";
import { HTMLView } from "./view.js";

const targetIdFrom = (parentId: string, nodeIndex: number): string =>
    `${parentId}.${nodeIndex}`;
const descriptorCache: PropertyDescriptorMap = {};

interface NextNode {
    index: number;
    node: ChildNode | null;
}

// used to prevent creating lots of objects just to track node and index while compiling
const next: NextNode = {
    index: 0,
    node: null as ChildNode | null,
};

class CompilationContext implements TemplateCompilationResult {
    private proto: any = null;
    private targetIds = new Set<string>();
    private descriptors: PropertyDescriptorMap = {};
    public readonly factories: ViewBehaviorFactory[] = [];

    constructor(
        public readonly fragment: DocumentFragment,
        public readonly directives: ReadonlyArray<HTMLDirective>
    ) {}

    public addFactory(
        factory: ViewBehaviorFactory,
        parentId: string,
        targetId: string,
        targetIndex: number
    ): void {
        if (!this.targetIds.has(targetId)) {
            this.targetIds.add(targetId);
            this.addTargetDescriptor(parentId, targetId, targetIndex);
        }

        factory.targetId = targetId;
        this.factories.push(factory);
    }

    public freeze(): TemplateCompilationResult {
        this.proto = Object.create(null, this.descriptors);
        return this;
    }

    private addTargetDescriptor(
        parentId: string,
        targetId: string,
        targetIndex: number
    ): void {
        const descriptors = this.descriptors;

        if (
            targetId === "r" || // root
            targetId === "h" || // host
            descriptors[targetId]
        ) {
            return;
        }

        if (!descriptors[parentId]) {
            const index = parentId.lastIndexOf(".");
            const grandparentId = parentId.substring(0, index);
            const childIndex = parseInt(parentId.substring(index + 1));
            this.addTargetDescriptor(grandparentId, parentId, childIndex);
        }

        let descriptor = descriptorCache[targetId];

        if (!descriptor) {
            const field = `_${targetId}`;

            descriptorCache[targetId] = descriptor = {
                get() {
                    return (
                        this[field] ??
                        (this[field] = this[parentId].childNodes[targetIndex])
                    );
                },
            };
        }

        descriptors[targetId] = descriptor;
    }

    public createView(hostBindingTarget?: Element): HTMLView {
        const fragment = this.fragment.cloneNode(true) as DocumentFragment;
        const targets = Object.create(this.proto);

        targets.r = fragment;
        targets.h = hostBindingTarget ?? fragment;

        for (const id of this.targetIds) {
            targets[id]; // trigger locator
        }

        return new HTMLView(fragment, this.factories, targets);
    }
}

function compileAttributes(
    context: CompilationContext,
    parentId: string,
    node: HTMLElement,
    nodeId: string,
    nodeIndex: number,
    includeBasicValues: boolean = false
): void {
    const attributes = node.attributes;
    const directives = context.directives;

    for (let i = 0, ii = attributes.length; i < ii; ++i) {
        const attr = attributes[i];
        const attrValue = attr.value;
        const parseResult = Parser.parse(attrValue, directives);
        let result: HTMLDirective | null = null;

        if (parseResult === null) {
            if (includeBasicValues) {
                result = bind(() => attrValue, oneTime) as AspectedHTMLDirective;
                (result as AspectedHTMLDirective).captureSource(attr.name);
            }
        } else {
            /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
            result = Compiler.aggregate(parseResult);
        }

        if (result !== null) {
            node.removeAttributeNode(attr);
            i--;
            ii--;
            context.addFactory(result, parentId, nodeId, nodeIndex);
        }
    }
}

function compileContent(
    context: CompilationContext,
    node: Text,
    parentId,
    nodeId,
    nodeIndex
): NextNode {
    const parseResult = Parser.parse(node.textContent!, context.directives);
    if (parseResult === null) {
        next.node = node.nextSibling;
        next.index = nodeIndex + 1;
        return next;
    }

    let currentNode: Text;
    let lastNode = (currentNode = node);

    for (let i = 0, ii = parseResult.length; i < ii; ++i) {
        const currentPart = parseResult[i];

        if (i !== 0) {
            nodeIndex++;
            nodeId = targetIdFrom(parentId, nodeIndex);
            currentNode = lastNode.parentNode!.insertBefore(
                document.createTextNode(""),
                lastNode.nextSibling
            );
        }

        if (isString(currentPart)) {
            currentNode.textContent = currentPart;
        } else {
            currentNode.textContent = " ";
            context.addFactory(currentPart, parentId, nodeId, nodeIndex);
        }

        lastNode = currentNode;
    }

    next.index = nodeIndex + 1;
    next.node = lastNode.nextSibling;
    return next;
}

function compileChildren(
    context: CompilationContext,
    parent: Node,
    parentId: string
): void {
    let nodeIndex = 0;
    let childNode = parent.firstChild;

    while (childNode) {
        /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
        const result = compileNode(context, parentId, childNode, nodeIndex);
        childNode = result.node;
        nodeIndex = result.index;
    }
}

function compileNode(
    context: CompilationContext,
    parentId: string,
    node: Node,
    nodeIndex: number
): NextNode {
    const nodeId = targetIdFrom(parentId, nodeIndex);

    switch (node.nodeType) {
        case 1: // element node
            compileAttributes(context, parentId, node as HTMLElement, nodeId, nodeIndex);
            compileChildren(context, node, nodeId);
            break;
        case 3: // text node
            return compileContent(context, node as Text, parentId, nodeId, nodeIndex);
        case 8: // comment
            const parts = Parser.parse((node as Comment).data, context.directives);
            if (parts !== null) {
                context.addFactory(
                    /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
                    Compiler.aggregate(parts),
                    parentId,
                    nodeId,
                    nodeIndex
                );
            }
            break;
    }

    next.index = nodeIndex + 1;
    next.node = node.nextSibling;
    return next;
}

function isMarker(node: Node, directives: ReadonlyArray<HTMLDirective>): boolean {
    return (
        node &&
        node.nodeType == 8 &&
        Parser.parse((node as Comment).data, directives) !== null
    );
}

/**
 * A function capable of compiling a template from the preprocessed form produced
 * by the html template function into a result that can instantiate views.
 * @public
 */
export type CompilationStrategy = (
    /**
     * The preprocessed HTML string or template to compile.
     */
    html: string | HTMLTemplateElement,
    /**
     * The directives used within the html that is being compiled.
     */
    directives: readonly HTMLDirective[]
) => TemplateCompilationResult;

const templateTag = "TEMPLATE";
const fastHTMLPolicy: TrustedTypesPolicy = { createHTML: html => html };
let htmlPolicy: TrustedTypesPolicy = globalThis.trustedTypes
    ? globalThis.trustedTypes.createPolicy("fast-html", fastHTMLPolicy)
    : fastHTMLPolicy;

/**
 * Common APIs related to compilation.
 * @public
 */
export const Compiler = {
    /**
     * Sets the HTML trusted types policy used by the compiler.
     * @param policy - The policy to set for HTML.
     * @remarks
     * This API can only be called once, for security reasons. It should be
     * called by the application developer at the start of their program.
     */
    setHTMLPolicy(policy: TrustedTypesPolicy) {
        if (htmlPolicy !== fastHTMLPolicy) {
            throw new Error("The HTML policy can only be set once.");
        }

        htmlPolicy = policy;
    },
    /**
     * Compiles a template and associated directives into a compilation
     * result which can be used to create views.
     * @param html - The html string or template element to compile.
     * @param directives - The directives referenced by the template.
     * @remarks
     * The template that is provided for compilation is altered in-place
     * and cannot be compiled again. If the original template must be preserved,
     * it is recommended that you clone the original and pass the clone to this API.
     * @public
     */
    compile(
        html: string | HTMLTemplateElement,
        directives: ReadonlyArray<HTMLDirective>
    ): TemplateCompilationResult {
        let template: HTMLTemplateElement;

        if (isString(html)) {
            template = document.createElement(templateTag) as HTMLTemplateElement;
            template.innerHTML = htmlPolicy.createHTML(html);

            const fec = template.content.firstElementChild;

            if (fec !== null && fec.tagName === templateTag) {
                template = fec as HTMLTemplateElement;
            }
        } else {
            template = html;
        }

        // https://bugs.chromium.org/p/chromium/issues/detail?id=1111864
        const fragment = document.adoptNode(template.content);
        const context = new CompilationContext(fragment, directives);
        compileAttributes(context, "", template, /* host */ "h", 0, true);

        if (
            // If the first node in a fragment is a marker, that means it's an unstable first node,
            // because something like a when, repeat, etc. could add nodes before the marker.
            // To mitigate this, we insert a stable first node. However, if we insert a node,
            // that will alter the result of the TreeWalker. So, we also need to offset the target index.
            isMarker(fragment.firstChild!, directives) ||
            // Or if there is only one node and a directive, it means the template's content
            // is *only* the directive. In that case, HTMLView.dispose() misses any nodes inserted by
            // the directive. Inserting a new node ensures proper disposal of nodes added by the directive.
            (fragment.childNodes.length === 1 && directives.length)
        ) {
            fragment.insertBefore(document.createComment(""), fragment.firstChild);
        }

        compileChildren(context, fragment, /* root */ "r");
        next.node = null; // prevent leaks
        return context.freeze();
    },

    /**
     * Sets the default compilation strategy that will be used by the ViewTemplate whenever
     * it needs to compile a view preprocessed with the html template function.
     * @param strategy - The compilation strategy to use when compiling templates.
     */
    setDefaultStrategy(strategy: CompilationStrategy): void {
        this.compile = strategy;
    },

    /**
     * Aggregates an array of strings and directives into a single directive.
     * @param parts - A heterogeneous array of static strings interspersed with
     * directives.
     * @returns A single inline directive that aggregates the behavior of all the parts.
     */
    aggregate(parts: (string | HTMLDirective)[]): HTMLDirective {
        if (parts.length === 1) {
            return parts[0] as HTMLDirective;
        }

        let source: string | undefined;
        const partCount = parts.length;
        const finalParts = parts.map((x: string | AspectedHTMLDirective) => {
            if (isString(x)) {
                return (): string => x;
            }

            source = x.source || source;
            return x.binding!;
        });

        const binding = (scope: unknown, context: ExecutionContext): string => {
            let output = "";

            for (let i = 0; i < partCount; ++i) {
                output += finalParts[i](scope, context);
            }

            return output;
        };

        const directive = bind(binding) as AspectedHTMLDirective;
        directive.captureSource(source!);
        return directive;
    },
};
