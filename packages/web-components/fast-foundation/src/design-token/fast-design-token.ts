import {
    AddBehavior,
    Behavior,
    ComposableStyles,
    CSSDirective,
    cssDirective,
    FASTElement,
    Observable,
    Subscriber,
    SubscriberSet,
} from "@microsoft/fast-element";
import { composedContains, composedParent } from "@microsoft/fast-element/utilities";
import {
    PropertyTargetManager,
    RootStyleSheetTarget,
} from "./custom-property-manager.js";
import {
    DesignTokenChangeRecord as CoreDesignTokenChangeRecord,
    DerivedDesignTokenValue,
    DesignTokenMutationType,
    DesignTokenNode,
    DesignTokenResolver,
    DesignTokenValue,
} from "./core/design-token-node.js";

/**
 * @public
 */
export interface DesignTokenChangeRecord<T extends DesignToken<any>> {
    /**
     * The element for which the value was changed
     */
    target: FASTElement | "default";

    /**
     * The token that was changed
     */
    token: T;
}

/**
 * A subscriber that should receive {@link DesignTokenChangeRecord | change records} when a token changes for a target
 * @public
 */
export interface DesignTokenSubscriber<T extends DesignToken<any>> {
    handleChange(token: T, record: DesignTokenChangeRecord<T>): void;
}

/**
 * Describes a {@link DesignToken} configuration
 * @public
 */
export interface DesignTokenConfiguration {
    /**
     * The name of the {@link DesignToken}.
     */
    name: string;
}

/**
 * @public
 */
export interface CSSDesignTokenConfiguration extends DesignTokenConfiguration {
    /**
     * The name of the CSS custom property to associate to the {@link CSSDesignToken}
     */
    cssCustomPropertyName: string;
}

/**
 * @public
 */
export class DesignToken<T> {
    public name: string;
    public get $value() {
        return this.default;
    }
    public get default(): T | undefined {
        return FASTDesignTokenNode.defaultNode.getTokenValue(this);
    }

    private _subscribers: SubscriberSet | undefined;
    private get subscribers() {
        if (this._subscribers) {
            return this._subscribers;
        }
        this._subscribers = new SubscriberSet(this);
        return this._subscribers;
    }

    constructor(configuration: DesignTokenConfiguration) {
        this.name = configuration.name;

        Observable.getNotifier(this).subscribe(this.subscriberNotifier);
    }

    private static isCSSDesignTokenConfiguration(
        config: CSSDesignTokenConfiguration | DesignTokenConfiguration
    ): config is CSSDesignTokenConfiguration {
        return (
            typeof (config as CSSDesignTokenConfiguration).cssCustomPropertyName ===
            "string"
        );
    }

    public static create<T>(name: string): CSSDesignToken<T>;
    public static create<T>(config: DesignTokenConfiguration): DesignToken<T>;
    public static create<T>(config: CSSDesignTokenConfiguration): CSSDesignToken<T>;
    public static create<T>(config: any): any {
        if (typeof config === "string") {
            return new CSSDesignToken<T>({ name: config, cssCustomPropertyName: config });
        } else {
            return DesignToken.isCSSDesignTokenConfiguration(config)
                ? new CSSDesignToken<T>(config)
                : new DesignToken<T>(config);
        }
    }

    public static withStrategy(strategy: DesignTokenResolutionStrategy): void {
        FASTDesignTokenNode.withStrategy(strategy);
    }

    /**
     * Registers and element or document as a DesignToken root.
     * {@link CSSDesignToken | CSSDesignTokens} with default values assigned via
     * {@link DesignToken.withDefault} will emit CSS custom properties to all
     * registered roots.
     * @param target - The root to register
     */
    public static registerRoot(target: FASTElement | Document = document) {
        RootStyleSheetTarget.registerRoot(target);
    }

    /**
     * Unregister an element or document as a DesignToken root.
     * @param target - The root to deregister
     */
    public static unregisterRoot(target: FASTElement | Document = document) {
        RootStyleSheetTarget.unregisterRoot(target);
    }
    public getValueFor(target: FASTElement): T {
        return FASTDesignTokenNode.getOrCreate(target).getTokenValue(this);
    }

    public setValueFor(
        target: FASTElement,
        value: DesignToken<T> | DesignTokenValue<T>
    ): void {
        FASTDesignTokenNode.getOrCreate(target).setTokenValue(
            this,
            this.normalizeValue(value)
        );
    }

    public deleteValueFor(target: FASTElement): this {
        FASTDesignTokenNode.getOrCreate(target).deleteTokenValue(this);
        return this;
    }

    public withDefault(value: DesignToken<T> | DesignTokenValue<T>): this {
        FASTDesignTokenNode.defaultNode.setTokenValue(this, this.normalizeValue(value));
        return this;
    }

    public subscribe(subscriber: DesignTokenSubscriber<this>): void {
        this.subscribers.subscribe(subscriber);
    }

    public unsubscribe(subscriber: DesignTokenSubscriber<this>): void {
        this.subscribers.unsubscribe(subscriber);
    }

    /**
     * Alias the token to the provided token.
     * @param token - the token to alias to
     */
    private alias(token: DesignToken<T>): DerivedDesignTokenValue<T> {
        return ((resolve: DesignTokenResolver) =>
            resolve(token)) as DerivedDesignTokenValue<T>;
    }

    private normalizeValue(value: DesignToken<T> | DesignTokenValue<T>) {
        if (value instanceof DesignToken) {
            value = this.alias(value);
        }

        return value as DesignTokenValue<T>;
    }

    private subscriberNotifier: Subscriber = {
        handleChange: (
            source: DesignToken<T>,
            change: CoreDesignTokenChangeRecord<T>
        ) => {
            const record: DesignTokenChangeRecord<this> = {
                target:
                    change.target === FASTDesignTokenNode.defaultNode
                        ? "default"
                        : (change.target as FASTDesignTokenNode).target,
                token: this,
            };
            this.subscribers.notify(record);
        },
    };
}

/**
 * @public
 */
@cssDirective()
export class CSSDesignToken<T> extends DesignToken<T> implements CSSDirective {
    public cssCustomProperty: string;
    private cssVar: string;

    public createCSS(add: AddBehavior): ComposableStyles {
        return this.cssVar;
    }
    private cssReflector: Subscriber = {
        handleChange: <T>(
            source: DesignToken<T>,
            record: CoreDesignTokenChangeRecord<T>
        ) => {
            const target =
                record.target === FASTDesignTokenNode.defaultNode
                    ? FASTDesignTokenNode.rootStyleSheetTarget
                    : record.target instanceof FASTDesignTokenNode
                    ? PropertyTargetManager.getOrCreate(record.target.target)
                    : null;
            if (target) {
                if (record.type === DesignTokenMutationType.delete) {
                    target.removeProperty(this.cssCustomProperty!);
                } else {
                    target.setProperty(
                        this.cssCustomProperty!,
                        this.resolveCSSValue(record.target.getTokenValue(this)) as any
                    );
                }
            }
        },
    };

    constructor(configuration: CSSDesignTokenConfiguration) {
        super(configuration);
        this.cssCustomProperty = `--${configuration.cssCustomPropertyName}`;
        this.cssVar = `var(${this.cssCustomProperty})`;
        Observable.getNotifier(this).subscribe(this.cssReflector);
    }

    private resolveCSSValue(value: any) {
        return value && typeof value.createCSS === "function" ? value.createCSS() : value;
    }
}

export interface DesignTokenResolutionStrategy {
    /**
     * Determines if a 'child' element is contained by a 'parent'.
     * @param child - The child element
     * @param parent - The parent element
     */
    contains(parent: FASTElement, child: FASTElement): boolean;

    /**
     * Finds the nearest FASTElement parent node
     * @param element - The element to find the parent of
     */
    parent(element: FASTElement): FASTElement | null;

    /**
     * Binds the strategy to the element
     */
    bind(element: FASTElement): void;

    /**
     * Un-binds the strategy to the element
     */
    unbind(element: FASTElement): void;
}

const defaultDesignTokenResolutionStrategy: DesignTokenResolutionStrategy = {
    contains: composedContains,
    parent(element: FASTElement): FASTElement | null {
        let parent: HTMLElement | null = composedParent(element);

        while (parent !== null) {
            if (parent instanceof FASTElement) {
                return parent as FASTElement;
            }

            parent = composedParent(parent);
        }

        return null;
    },
    bind() {},
    unbind() {},
};

class FASTDesignTokenNode extends DesignTokenNode implements Behavior {
    private static _strategy: DesignTokenResolutionStrategy;
    private static get strategy() {
        if (this._strategy === undefined) {
            FASTDesignTokenNode.withStrategy(defaultDesignTokenResolutionStrategy);
        }

        return this._strategy;
    }
    public static defaultNode = new DesignTokenNode();
    public static rootStyleSheetTarget = new RootStyleSheetTarget();
    private static cache = new WeakMap<FASTElement, FASTDesignTokenNode>();
    private bound = false;
    public bind(target: FASTElement) {
        FASTDesignTokenNode.strategy.bind(target);
        this.bound = true;

        let parent = FASTDesignTokenNode.findParent(target);

        // Reset these methods to the super method do avoid
        // state checking prior to token operations.
        this.setTokenValue = super.setTokenValue;
        this.getTokenValue = super.getTokenValue;
        this.deleteTokenValue = super.deleteTokenValue;

        if (parent === null) {
            parent = FASTDesignTokenNode.defaultNode;
        }

        if (parent !== this.parent) {
            const reparent = [];
            for (const child of parent.children) {
                if (
                    child instanceof FASTDesignTokenNode &&
                    FASTDesignTokenNode.strategy.contains(target, child.target)
                ) {
                    reparent.push(child);
                }
            }

            parent.appendChild(this);

            for (const child of reparent) {
                this.appendChild(child);
            }
        }
    }

    public unbind(): void {
        FASTDesignTokenNode.strategy.unbind(this.target);
    }

    public static getOrCreate(target: FASTElement) {
        let found = FASTDesignTokenNode.cache.get(target);

        if (found) {
            return found;
        }

        found = new FASTDesignTokenNode(target);
        FASTDesignTokenNode.cache.set(target, found);
        target.$fastController.addBehaviors([found]);

        return found;
    }

    public static withStrategy(strategy: DesignTokenResolutionStrategy) {
        this._strategy = strategy;
    }

    private static findParent(target: FASTElement): DesignTokenNode | null {
        let current = FASTDesignTokenNode.strategy.parent(target);

        while (current !== null) {
            const node = FASTDesignTokenNode.cache.get(current as FASTElement);
            if (node) {
                return node;
            }

            current = FASTDesignTokenNode.strategy.parent(current);
        }

        return null;
    }

    constructor(public readonly target: FASTElement) {
        super();

        /**
         * Get, set, and delete operations should lazily append the node to the default node
         * if they're called prior to the node getting bound to an element. This is a slight perf optimization
         * over appending the node to the default node in all cases during construction, which would force the default
         * node to notify the child of all tokens set for the default. In most cases, the node will be bound before any of these
         * APIs are called, so skip that notification unless they're called.
         *
         * These methods get reset to the super method in {@link FASTDesignTokenNode.bind()}
         */
        this.getTokenValue = this.lazyAppendToDefaultNode(super.getTokenValue);
        this.setTokenValue = this.lazyAppendToDefaultNode(super.setTokenValue);
        this.deleteTokenValue = this.lazyAppendToDefaultNode(super.deleteTokenValue);
    }

    /**
     * Appends the node to the 'default' node prior to executing the provided callback
     * if the node has not been bound and parent is null.
     */
    private lazyAppendToDefaultNode<T extends Function>(fn: T): T {
        return ((...args: any[]) => {
            if (!this.bound && this.parent === null) {
                FASTDesignTokenNode.defaultNode.appendChild(this);
            }

            return fn.apply(this, args);
        }) as any;
    }
}
