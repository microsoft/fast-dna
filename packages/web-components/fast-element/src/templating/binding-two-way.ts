import { isString, Message } from "../interfaces.js";
import type { Subscriber } from "../observation/notifier.js";
import {
    Binding,
    BindingNotifier,
    BindingObserver,
    ExecutionContext,
    Observable,
    ObservationRecord,
} from "../observation/observable.js";
import { FAST } from "../platform.js";
import type { HTMLBindingDirective } from "./binding.js";
import { BindingConfiguration } from "./html-directive.js";

/**
 * The twoWay binding options.
 * @public
 */
export type TwoWayBindingOptions = {
    changeEvent?: string;
    fromView?: (value: any) => any;
};

const defaultOptions: TwoWayBindingOptions = {
    fromView: v => v,
};

/**
 * The settings required to enable two-way binding.
 * @public
 */
export interface TwoWaySettings {
    /**
     * Determines which event to listen to, to detect changes in the view.
     * @param directive - The directive to determine the change event for.
     * @param target - The target element to determine the change event for.
     */
    determineChangeEvent(directive: HTMLBindingDirective, target: HTMLElement): string;
}

let twoWaySettings: TwoWaySettings = {
    determineChangeEvent() {
        return "change";
    },
};

class TwoWayObserver<TSource = any, TReturn = any, TParent = any>
    implements BindingObserver<TSource, TReturn, TParent> {
    private notifier: BindingNotifier;

    target!: HTMLElement;
    source!: any;
    context!: ExecutionContext;
    changeEvent: string;

    constructor(
        private directive: HTMLBindingDirective,
        private subscriber: Subscriber,
        private options: TwoWayBindingOptions,
        binding: Binding,
        isVolatile: boolean
    ) {
        this.notifier = Observable.binding(binding, this, isVolatile);
    }

    observe(source: TSource, context?: ExecutionContext<TParent> | undefined): TReturn {
        if (!this.changeEvent) {
            this.changeEvent =
                this.options.changeEvent ??
                twoWaySettings.determineChangeEvent(this.directive, this.target);
        }

        this.target.addEventListener(this.changeEvent, this);
        return this.notifier.observe(source, context);
    }

    dispose(): void {
        this.target.removeEventListener(this.changeEvent, this);
    }

    /** @internal */
    public handleChange(subject: any, args: any) {
        this.subscriber.handleChange(subject, args);
    }

    /** @internal */
    public handleEvent(event: Event): void {
        const directive = this.directive;
        const target = event.currentTarget as HTMLElement;
        const notifier = this.notifier;
        const last = (notifier as any).last as ObservationRecord; // using internal API!!!

        if (!last) {
            FAST.warn(Message.twoWayBindingRequiresObservables);
            return;
        }

        let value;

        switch (directive.aspectType) {
            case 1:
                value = target.getAttribute(directive.targetAspect);
                break;
            case 2:
                value = target.hasAttribute(directive.targetAspect);
                break;
            case 4:
                value = target.innerText;
                break;
            default:
                value = target[directive.targetAspect];
                break;
        }

        last.propertySource[last.propertyName] = this.options.fromView!(value);
    }
}

class TwoWayBinding<
    TSource = any,
    TReturn = any,
    TParent = any
> extends BindingConfiguration<TSource, TReturn, TParent> {
    constructor(
        public readonly binding: Binding<TSource, TReturn, TParent>,
        public isVolatile: boolean,
        public options: TwoWayBindingOptions = defaultOptions
    ) {
        super();

        if (!options.fromView) {
            options.fromView = defaultOptions.fromView;
        }
    }

    createObserver(
        directive: HTMLBindingDirective,
        subscriber: Subscriber
    ): BindingObserver<TSource, TReturn, TParent> {
        return new TwoWayObserver(
            directive,
            subscriber,
            this.options,
            this.binding,
            this.isVolatile
        );
    }

    /**
     * Configures two-way binding.
     * @param settings - The settings to use for the two-way binding system.
     */
    public static configure(settings: TwoWaySettings) {
        twoWaySettings = settings;
    }
}

/**
 * Creates a default binding.
 * @param binding - The binding to refresh when changed.
 * @param isBindingVolatile - Indicates whether the binding is volatile or not.
 * @returns A binding configuration.
 * @public
 */
export function twoWay<T = any>(
    binding: Binding<T>,
    optionsOrChangeEvent?: TwoWayBindingOptions | string,
    isBindingVolatile = Observable.isVolatileBinding(binding)
): BindingConfiguration<T> {
    if (isString(optionsOrChangeEvent)) {
        optionsOrChangeEvent = { changeEvent: optionsOrChangeEvent };
    }

    return new TwoWayBinding(binding, isBindingVolatile, optionsOrChangeEvent);
}
