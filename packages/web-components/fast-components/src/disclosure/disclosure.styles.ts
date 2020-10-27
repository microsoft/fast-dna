import { css } from "@microsoft/fast-element";
import {
    accentFillActiveBehavior,
    accentFillHoverBehavior,
    accentFillRestBehavior,
    accentForegroundActiveBehavior,
    accentForegroundCutRestBehavior,
    accentForegroundHoverBehavior,
    accentForegroundRestBehavior,
} from "../styles/recipes";

export const DisclosureStyles = css`
    .disclosure .invoker::-webkit-details-marker {
        display: none;
    }

    .disclosure .invoker {
        list-style-type: none;
    }

    :host(.accent) .invoker {
        background: ${accentFillRestBehavior.var};
        color: ${accentForegroundCutRestBehavior.var};
        font-family: var(--body-font);
        font-size: var(--type-ramp-base-font-size);
        border-radius: calc(var(--corner-radius) * 1px);
        outline: none;
        cursor: pointer;
        margin: 16px 0;
        padding: 12px;
        max-width: max-content;
    }

    :host(.accent) .invoker:active {
        background: ${accentFillActiveBehavior.var};
    }

    :host(.accent) .invoker:hover {
        background: ${accentFillHoverBehavior.var};
    }

    :host(.lightweight) .invoker {
        background: transparent;
        color: ${accentForegroundRestBehavior.var};
        border-bottom: calc(var(--outline-width) * 1px) solid
            var(--accent-foreground-rest);
        cursor: pointer;
        width: max-content;
        margin: 16px 0;
    }

    :host(.lightweight) .invoker:active {
        border-bottom-color: ${accentForegroundActiveBehavior.var};
    }

    :host(.lightweight) .invoker:hover {
        border-bottom-color: ${accentForegroundHoverBehavior.var};
    }

    // TODO: is it needed? 🤔
    // :host(.accent) .invoker:focus {
    //     border: calc(var(--outline-width) * 1px) solid var(--neutral-focus);
    //     box-shadow: 0 0 0 calc(var(--focus-outline-width) * 1px) inset
    //         var(--neutral-focus-inner-accent);
    // }

    .disclosure[open] .invoker ~ * {
        animation: fadeIn 0.5s ease-in-out;
    }

    @keyframes fadeIn {
        0% {
            opacity: 0;
        }
        100% {
            opacity: 1;
        }
    }
`.withBehaviors(
    accentFillRestBehavior,
    accentForegroundRestBehavior,
    accentForegroundCutRestBehavior,
    accentForegroundActiveBehavior,
    accentForegroundHoverBehavior,
    accentFillHoverBehavior,
    accentFillActiveBehavior
);
