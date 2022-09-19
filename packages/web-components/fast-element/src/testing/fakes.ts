import { ExecutionContext } from "../index.js";

export const Fake = Object.freeze({
    executionContext<TParent = any>(
        parent?: TParent,
        parentContext?: ExecutionContext<TParent>
    ): ExecutionContext<TParent> {
        return {
            /**
             * The index of the current item within a repeat context.
             */
            index: 0,

            /**
             * The length of the current collection within a repeat context.
             */
            length: 0,

            /**
             * The parent data source within a nested context.
             */
            parent: parent as TParent,

            /**
             * The parent execution context when in nested context scenarios.
             */
            parentContext: parentContext as ExecutionContext<TParent>,

            /**
             * The current event within an event handler.
             */
            get event(): Event {
                return ExecutionContext.getEvent()!;
            },

            /**
             * Indicates whether the current item within a repeat context
             * has an even index.
             */
            get isEven(): boolean {
                return this.index % 2 === 0;
            },

            /**
             * Indicates whether the current item within a repeat context
             * has an odd index.
             */
            get isOdd(): boolean {
                return this.index % 2 !== 0;
            },

            /**
             * Indicates whether the current item within a repeat context
             * is the first item in the collection.
             */
            get isFirst(): boolean {
                return this.index === 0;
            },

            /**
             * Indicates whether the current item within a repeat context
             * is somewhere in the middle of the collection.
             */
            get isInMiddle(): boolean {
                return !this.isFirst && !this.isLast;
            },

            /**
             * Indicates whether the current item within a repeat context
             * is the last item in the collection.
             */
            get isLast(): boolean {
                return this.index === this.length - 1;
            },

            /**
             * Returns the typed event detail of a custom event.
             */
            eventDetail<TDetail>(): TDetail {
                return (this.event as CustomEvent<TDetail>).detail;
            },

            /**
             * Returns the typed event target of the event.
             */
            eventTarget<TTarget extends EventTarget>(): TTarget {
                return this.event.target! as TTarget;
            },
        };
    },
});
