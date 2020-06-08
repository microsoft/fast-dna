import { ExecutionContext } from "../observation/observable";

/**
 * Represents and object that can contribute behavior to a view or
 * element's bind/unbind operations.
 */
export interface Behavior {
    /**
     * Bind this behavior to the source.
     * @param source - The source to bind to.
     * @param context - The execution context that the binding is operating within.
     */
    bind(source: unknown, context: ExecutionContext): void;

    /**
     * Unbinds this behavior from the source.
     * @param source - The source to unbind from.
     */
    unbind(source: unknown): void;
}

/**
 * A factory that can create a {@link Behavior} associated with a particular
 * location within a DOM fragment.
 */
export interface BehaviorFactory {
    /**
     * The index of the DOM node to which the created behavior will apply.
     */
    targetIndex: number;

    /**
     * Creates a behavior for the provided target node.
     * @param target - The node instance to create the behavior for.
     */
    createBehavior(target: Node): Behavior;
}
