import { css } from "@microsoft/fast-element";
import { display } from "@microsoft/fast-foundation";
import {
    bodyFont,
    cornerRadius,
    designUnit,
    typeRampMinus1FontSize,
    typeRampMinus1LineHeight,
} from "../design-tokens";
import { accentForegroundRestBehavior, heightNumber } from "../styles/index";

export const badgeStyles = (context, definition) =>
    css`
    ${display("inline-block")} :host {
        box-sizing: border-box;
        font-family: ${bodyFont};
        font-size: ${typeRampMinus1FontSize};
        line-height: ${typeRampMinus1LineHeight};
    }

    .control {
        border-radius: calc(${cornerRadius} * 1px);
        padding: calc(${designUnit} * 0.5px) calc(${designUnit} * 1px);
        color: ${accentForegroundRestBehavior.var};
        font-weight: 600;
    }

    .control[style] {
        font-weight: 400;
    }

    :host([circular]) .control {
        border-radius: 100px;
        padding: 0 calc(${designUnit} * 1px);
        ${
            /* Need to work with Brian on width and height here */ ""
        } height: calc((${heightNumber} - (${designUnit} * 3)) * 1px);
        min-width: calc((${heightNumber} - (${designUnit} * 3)) * 1px);
        display: flex;
        align-items: center;
        justify-content: center;
        box-sizing: border-box;
    }
`.withBehaviors(accentForegroundRestBehavior);
