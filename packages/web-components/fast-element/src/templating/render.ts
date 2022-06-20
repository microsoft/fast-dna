import { FASTElementDefinition } from "../components/fast-definitions.js";
import type { FASTElement } from "../components/fast-element.js";
import { Constructable, isFunction, isString } from "../interfaces.js";
import type { Behavior } from "../observation/behavior.js";
import type { Subscriber } from "../observation/notifier.js";
import {
    Binding,
    BindingObserver,
    ExecutionContext,
    Observable,
} from "../observation/observable.js";
import type { ContentTemplate, ContentView } from "./binding.js";
import {
    AddViewBehaviorFactory,
    HTMLDirective,
    ViewBehaviorTargets,
} from "./html-directive.js";
import { Markup } from "./markup.js";
import {
    CaptureType,
    html,
    SyntheticViewTemplate,
    TemplateValue,
    ViewTemplate,
} from "./template.js";

type ComposableView = ContentView & {
    isComposed?: boolean;
    needsBindOnly?: boolean;
    $fastTemplate?: ContentTemplate;
};

export class RenderBehavior<TSource = any> implements Behavior, Subscriber {
    private source: TSource | null = null;
    private view: ComposableView | null = null;
    private template!: ContentTemplate;
    private templateBindingObserver: BindingObserver<TSource, ContentTemplate>;
    private data: any | null = null;
    private dataBindingObserver: BindingObserver<TSource, any[]>;
    private originalContext: ExecutionContext | undefined = void 0;
    private childContext: ExecutionContext | undefined = void 0;

    public constructor(
        private location: Node,
        private dataBinding: Binding<TSource, any[]>,
        private templateBinding: Binding<TSource, ContentTemplate>
    ) {
        this.dataBindingObserver = Observable.binding(dataBinding, this, true);
        this.templateBindingObserver = Observable.binding(templateBinding, this, true);
    }

    public bind(source: TSource, context: ExecutionContext): void {
        this.source = source;
        this.originalContext = context;
        this.childContext = context.createChildContext(source);
        this.data = this.dataBindingObserver.observe(source, this.originalContext);
        this.template = this.templateBindingObserver.observe(
            source,
            this.originalContext
        );

        this.refreshView();
    }

    public unbind(): void {
        this.source = null;
        this.data = null;

        const view = this.view;

        if (view !== null && view.isComposed) {
            view.unbind();
            view.needsBindOnly = true;
        }

        this.dataBindingObserver.dispose();
        this.templateBindingObserver.dispose();
    }

    /** @internal */
    public handleChange(source: any): void {
        if (source === this.dataBinding) {
            this.data = this.dataBindingObserver.observe(
                this.source!,
                this.originalContext!
            );

            this.refreshView();
        } else if (source === this.templateBinding) {
            this.template = this.templateBindingObserver.observe(
                this.source!,
                this.originalContext!
            );

            this.refreshView();
        }
    }

    private refreshView() {
        let view = this.view;
        const template = this.template;

        if (view === null) {
            view = template.create();
        } else {
            // If there is a previous view, but it wasn't created
            // from the same template as the new value, then we
            // need to remove the old view if it's still in the DOM
            // and create a new view from the template.
            if (view.$fastTemplate !== template) {
                if (view.isComposed) {
                    view.remove();
                    view.unbind();
                }

                view = template.create();
            }
        }

        // It's possible that the value is the same as the previous template
        // and that there's actually no need to compose it.
        if (!view.isComposed) {
            view.isComposed = true;
            view.bind(this.data, this.childContext!);
            view.insertBefore(this.location);
            view.$fastTemplate = template;
        } else if (view.needsBindOnly) {
            view.needsBindOnly = false;
            view.bind(this.data, this.childContext!);
        }
    }
}

export class RenderDirective<TSource = any> implements HTMLDirective {
    public id: string;
    public nodeId: string;

    public constructor(
        public readonly dataBinding: Binding,
        public readonly templateBinding: Binding<TSource, ContentTemplate>
    ) {}

    public createHTML(add: AddViewBehaviorFactory): string {
        return Markup.comment(add(this));
    }

    public createBehavior(targets: ViewBehaviorTargets): RenderBehavior<TSource> {
        return new RenderBehavior<TSource>(
            targets[this.nodeId],
            this.dataBinding,
            this.templateBinding
        );
    }
}

HTMLDirective.define(RenderDirective);

export interface RenderInstruction {
    brand: symbol;
    type: Constructable;
    template: ContentTemplate;
    name: string;
}

export type CommonRenderOptions = {
    type: Constructable;
    name?: string;
};

export type TemplateRenderOptions = CommonRenderOptions & {
    template: ContentTemplate;
};

export type BaseElementRenderOptions<
    TSource = any,
    TParent = any
> = CommonRenderOptions & {
    attributes?: Record<string, string | TemplateValue<TSource, TParent>>;
    content?: string | SyntheticViewTemplate;
};

export type ElementConstructorRenderOptions<
    TSource = any,
    TParent = any
> = BaseElementRenderOptions<TSource, TParent> & {
    element: Constructable<FASTElement>;
};

export type TagNameRenderOptions<TSource = any, TParent = any> = BaseElementRenderOptions<
    TSource,
    TParent
> & {
    tagName: string;
};

type ElementRenderOptions<TSource = any, TParent = any> =
    | TagNameRenderOptions<TSource, TParent>
    | ElementConstructorRenderOptions<TSource, TParent>;

function isElementRenderOptions(object: any): object is ElementRenderOptions {
    return !!object.element || !!object.tagName;
}

const typeToInstructionLookup = new Map<
    Constructable,
    Record<string, RenderInstruction>
>();

/* eslint @typescript-eslint/naming-convention: "off"*/
const defaultAttributes = { ":model": x => x };
const brand = Symbol("RenderInstruction");
const defaultViewName = "default-view";
const nullTemplate = html`
    &nbsp;
`;

function instructionToTemplate(def: RenderInstruction | undefined) {
    if (def === void 0) {
        return nullTemplate;
    }

    return def.template;
}

function createElementTemplate<TSource = any, TParent = any>(
    tagName: string,
    attributes?: Record<string, string | TemplateValue<TSource, TParent>>,
    content?: string | ContentTemplate
): ViewTemplate<TSource, TParent> {
    const markup = [`<${tagName}`];
    const values: Array<TemplateValue<TSource, TParent>> = [];

    if (attributes) {
        const attrNames = Object.getOwnPropertyNames(attributes);

        for (let i = 0, ii = attrNames.length; i < ii; ++i) {
            const name = attrNames[i];

            if (i === 0) {
                markup[0] = `${markup[0]} ${name}="`;
            } else {
                markup.push(`" ${name}="`);
            }

            values.push(attributes[name]);
        }
    }

    if (content && isFunction((content as any).create)) {
        markup.push(`">`);
        values.push(content);
        markup.push(`</${tagName}>`);
    } else {
        markup.push(`">${content ?? ""}</${tagName}>`);
    }

    return html((markup as any) as TemplateStringsArray, ...values);
}

function create(options: TagNameRenderOptions): RenderInstruction;
function create(options: ElementConstructorRenderOptions): RenderInstruction;
function create(options: TemplateRenderOptions): RenderInstruction;
function create(options: any): RenderInstruction {
    const name = options.name ?? defaultViewName;
    let template: ContentTemplate;

    if (isElementRenderOptions(options)) {
        let tagName = (options as TagNameRenderOptions).tagName;

        if (!tagName) {
            const def = FASTElementDefinition.getByType(
                (options as ElementConstructorRenderOptions).element
            );

            if (def) {
                tagName = def.name;
            } else {
                throw new Error("Invalid element for model rendering.");
            }
        }

        template = createElementTemplate(
            tagName,
            options.attributes ?? defaultAttributes,
            options.content
        );
    } else {
        template = options.template;
    }

    return {
        brand,
        type: options.type,
        name,
        template,
    };
}

function instanceOf(object: any): object is RenderInstruction {
    return object && object.brand === brand;
}

function register(options: TagNameRenderOptions): RenderInstruction;
function register(options: ElementConstructorRenderOptions): RenderInstruction;
function register(options: TemplateRenderOptions): RenderInstruction;
function register(instruction: RenderInstruction): RenderInstruction;
function register(optionsOrInstruction: any): RenderInstruction {
    let lookup = typeToInstructionLookup.get(optionsOrInstruction.type);
    if (lookup === void 0) {
        typeToInstructionLookup.set(
            optionsOrInstruction.type,
            (lookup = Object.create(null) as {})
        );
    }

    const instruction = instanceOf(optionsOrInstruction)
        ? optionsOrInstruction
        : create(optionsOrInstruction);

    return (lookup[instruction.name] = instruction);
}

function getByType(type: Constructable, name?: string): RenderInstruction | undefined {
    const entries = typeToInstructionLookup.get(type);

    if (entries === void 0) {
        return void 0;
    }

    return entries[name ?? defaultViewName];
}

function getForInstance(object: any, name?: string): RenderInstruction | undefined {
    if (object) {
        return getByType(object.constructor, name);
    }

    return void 0;
}

export const RenderInstruction = Object.freeze({
    instanceOf,
    create,
    createElementTemplate,
    register,
    getByType,
    getForInstance,
});

export function renderWith(options: Omit<TagNameRenderOptions, "type">): ClassDecorator;
export function renderWith(
    options: Omit<ElementConstructorRenderOptions, "type">
): ClassDecorator;
export function renderWith(options: Omit<TemplateRenderOptions, "type">): ClassDecorator;
export function renderWith(
    element: Constructable<FASTElement>,
    name?: string
): ClassDecorator;
export function renderWith(template: ContentTemplate, name?: string): ClassDecorator;
export function renderWith(value: any, name?: string) {
    return function (type: Constructable) {
        if (isFunction(value)) {
            register({ type, element: value, name });
        } else if (isFunction(value.create)) {
            register({ type, template: value, name });
        } else {
            register({ type, ...value });
        }
    };
}

/**
 * @internal
 */
export class NodeTemplate implements ContentTemplate, ContentView {
    constructor(public readonly node: Node) {
        (node as any).$fastTemplate = this;
    }

    bind(source: any, context: ExecutionContext<any>): void {}

    unbind(): void {}

    insertBefore(refNode: Node): void {
        refNode.parentNode!.insertBefore(this.node, refNode);
    }

    remove(): void {
        this.node.parentNode!.removeChild(this.node);
    }

    create(): ContentView {
        return this;
    }
}

export function render<TSource = any, TItem = any>(
    binding?: Binding<TSource, TItem> | Node,
    templateOrTemplateBindingOrViewName?:
        | ContentTemplate
        | string
        | Binding<TSource, ContentTemplate | string | Node>
): CaptureType<TSource> {
    let dataBinding: Binding<TSource>;

    if (binding === void 0) {
        dataBinding = (source: TSource) => source;
    } else if (binding instanceof Node) {
        dataBinding = () => binding;
    } else {
        dataBinding = binding;
    }

    let templateBinding;

    if (templateOrTemplateBindingOrViewName === void 0) {
        templateBinding = (s: any, c: ExecutionContext) => {
            const data = dataBinding(s, c);

            if (data instanceof Node) {
                return (data as any).$fastTemplate ?? new NodeTemplate(data);
            }

            return instructionToTemplate(getForInstance(data));
        };
    } else if (isFunction(templateOrTemplateBindingOrViewName)) {
        templateBinding = (s: any, c: ExecutionContext) => {
            let result = templateOrTemplateBindingOrViewName(s, c);

            if (isString(result)) {
                result = instructionToTemplate(getForInstance(dataBinding(s, c), result));
            } else if (result instanceof Node) {
                result = (result as any).$fastTemplate ?? new NodeTemplate(result);
            }

            return result;
        };
    } else if (isString(templateOrTemplateBindingOrViewName)) {
        templateBinding = (s: any, c: ExecutionContext) => {
            const data = dataBinding(s, c);

            if (data instanceof Node) {
                return (data as any).$fastTemplate ?? new NodeTemplate(data);
            }

            return instructionToTemplate(
                getForInstance(data, templateOrTemplateBindingOrViewName)
            );
        };
    } else {
        templateBinding = (s: any, c: ExecutionContext) =>
            templateOrTemplateBindingOrViewName;
    }

    return new RenderDirective<TSource>(dataBinding, templateBinding);
}
