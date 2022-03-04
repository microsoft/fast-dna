import type { Callable } from "./interfaces.js";
import { $global, TrustedTypesPolicy } from "./platform.js";

/* eslint-disable */
const fastHTMLPolicy: TrustedTypesPolicy = $global.trustedTypes.createPolicy(
    "fast-html",
    {
        createHTML: html => html,
    }
);
/* eslint-enable */

let htmlPolicy: TrustedTypesPolicy = fastHTMLPolicy;
const updateQueue: Callable[] = [];
const pendingErrors: any[] = [];
const rAF = $global.requestAnimationFrame;
let updateAsync = true;

function throwFirstError(): void {
    if (pendingErrors.length) {
        throw pendingErrors.shift();
    }
}

function tryRunTask(task: Callable): void {
    try {
        (task as any).call();
    } catch (error) {
        if (updateAsync) {
            pendingErrors.push(error);
            setTimeout(throwFirstError, 0);
        } else {
            updateQueue.length = 0;
            throw error;
        }
    }
}

/**
 * Common DOM APIs.
 * @public
 */
export const DOM = Object.freeze({
    /**
     * Indicates whether the DOM supports the adoptedStyleSheets feature.
     */
    supportsAdoptedStyleSheets:
        Array.isArray((document as any).adoptedStyleSheets) &&
        "replace" in CSSStyleSheet.prototype,

    /**
     * Sets the HTML trusted types policy used by the templating engine.
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
     * Turns a string into trusted HTML using the configured trusted types policy.
     * @param html - The string to turn into trusted HTML.
     * @remarks
     * Used internally by the template engine when creating templates
     * and setting innerHTML.
     */
    createHTML(html: string): string {
        return htmlPolicy.createHTML(html);
    },

    /**
     * Sets the update mode used by queueUpdate.
     * @param isAsync - Indicates whether DOM updates should be asynchronous.
     * @remarks
     * By default, the update mode is asynchronous, since that provides the best
     * performance in the browser. Passing false to setUpdateMode will instead cause
     * the queue to be immediately processed for each call to queueUpdate. However,
     * ordering will still be preserved so that nested tasks do not run until
     * after parent tasks complete.
     */
    setUpdateMode(isAsync: boolean) {
        updateAsync = isAsync;
    },

    /**
     * Schedules DOM update work in the next async batch.
     * @param callable - The callable function or object to queue.
     */
    queueUpdate(callable: Callable) {
        updateQueue.push(callable);

        if (updateQueue.length < 2) {
            updateAsync ? rAF(DOM.processUpdates) : DOM.processUpdates();
        }
    },

    /**
     * Resolves with the next DOM update.
     */
    nextUpdate(): Promise<void> {
        return new Promise(DOM.queueUpdate);
    },

    /**
     * Immediately processes all work previously scheduled
     * through queueUpdate.
     * @remarks
     * This also forces nextUpdate promises
     * to resolve.
     */
    processUpdates(): void {
        const capacity = 1024;
        let index = 0;

        while (index < updateQueue.length) {
            tryRunTask(updateQueue[index]);
            index++;

            // Prevent leaking memory for long chains of recursive calls to `DOM.queueUpdate`.
            // If we call `DOM.queueUpdate` within a task scheduled by `DOM.queueUpdate`, the queue will
            // grow, but to avoid an O(n) walk for every task we execute, we don't
            // shift tasks off the queue after they have been executed.
            // Instead, we periodically shift 1024 tasks off the queue.
            if (index > capacity) {
                // Manually shift all values starting at the index back to the
                // beginning of the queue.
                for (
                    let scan = 0, newLength = updateQueue.length - index;
                    scan < newLength;
                    scan++
                ) {
                    updateQueue[scan] = updateQueue[scan + index];
                }

                updateQueue.length -= index;
                index = 0;
            }
        }

        updateQueue.length = 0;
    },

    /**
     * Sets an attribute value on an element.
     * @param element - The element to set the attribute value on.
     * @param attributeName - The attribute name to set.
     * @param value - The value of the attribute to set.
     * @remarks
     * If the value is `null` or `undefined`, the attribute is removed, otherwise
     * it is set to the provided value using the standard `setAttribute` API.
     */
    setAttribute(element: HTMLElement, attributeName: string, value: any) {
        value === null || value === undefined
            ? element.removeAttribute(attributeName)
            : element.setAttribute(attributeName, value);
    },

    /**
     * Sets a boolean attribute value.
     * @param element - The element to set the boolean attribute value on.
     * @param attributeName - The attribute name to set.
     * @param value - The value of the attribute to set.
     * @remarks
     * If the value is true, the attribute is added; otherwise it is removed.
     */
    setBooleanAttribute(element: HTMLElement, attributeName: string, value: boolean) {
        value
            ? element.setAttribute(attributeName, "")
            : element.removeAttribute(attributeName);
    },
});
