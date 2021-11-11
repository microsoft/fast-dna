import { css, ElementStyles } from "@microsoft/fast-element";
import {
    AccordionItemOptions,
    display,
    ElementDefinitionContext,
    focusVisible,
    forcedColorsStylesheetBehavior,
} from "@microsoft/fast-foundation";
import { SystemColors } from "@microsoft/fast-web-utilities";
import {
    bodyFont,
    controlCornerRadius,
    density,
    designUnit,
    focusStrokeOuter,
    focusStrokeWidth,
    neutralFillActive,
    neutralForegroundRest,
    strokeWidth,
    typeRampBaseFontSize,
    typeRampBaseLineHeight,
} from "../design-tokens";
import { heightNumber } from "../styles/size";

/**
 * Styles for AccordionItem
 * @public
 */
export const accordionItemStyles: (
    context: ElementDefinitionContext,
    definition: AccordionItemOptions
) => ElementStyles = (
    context: ElementDefinitionContext,
    definition: AccordionItemOptions
) =>
    css`
        ${display("flex")} :host {
            box-sizing: border-box;
            font-family: ${bodyFont};
            flex-direction: column;
            font-size: ${typeRampBaseFontSize};
            line-height: ${typeRampBaseLineHeight};
            color: ${neutralForegroundRest};
            border-top: calc(${strokeWidth} * 1px) solid ${neutralFillActive};
            border-bottom: calc(${strokeWidth} * 1px) solid ${neutralFillActive};
            position: relative;
        }
        .region {
            display: none;
            padding: calc((6 + (${designUnit} * 2 * ${density})) * 1px);
        }
        .heading {
            display: grid;
            grid-template-columns: auto 1fr auto auto;
            align-items: center;
            z-index: 2;
        }
        .button {
            appearance: none;
            border: none;
            background: none;
            grid-column: 2;
            grid-row: 1;
            outline: none;
            padding: 0 calc((6 + (${designUnit} * 2 * ${density})) * 1px);
            text-align: left;
            height: calc(${heightNumber} * 1px);
            color: inherit;
            cursor: pointer;
            font-family: inherit;
        }
        .button::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 1;
            cursor: pointer;
        }
        .button:${focusVisible}::before {
            outline: none;
            border: calc(${strokeWidth} * 1px) solid ${focusStrokeOuter};
            border-radius: calc(${controlCornerRadius} * 1px);
            box-shadow: 0 0 0 calc(${focusStrokeWidth} * 1px) ${focusStrokeOuter};
        }
        :host(.expanded) .region {
        display: block;
        }
        .icon {
            display: flex;
            align-items: center;
            justify-content: center;
            grid-column: 4;
            z-index: 2;
            pointer-events: none;
            border-radius: calc(${controlCornerRadius} * 1px);
            fill: currentcolor;
            width: calc(${heightNumber} * 1px);
            height: calc(${heightNumber} * 1px);
            margin: calc(${designUnit} * 2 * 1px);
        }
        slot[name="collapsed-icon"] {
            display: flex;
        }
        :host(.expanded) slot[name="collapsed-icon"] {
            display: none;
        }
        slot[name="expanded-icon"] {
            display: none;
        }
        :host(.expanded) slot[name="expanded-icon"] {
            display: flex;
        }
        .start {
            display: flex;
            align-items: center;
            padding-inline-start: calc(${designUnit} * 1px);
            justify-content: center;
            grid-column: 1;
            z-index: 2;
        }
        .end {
            display: flex;
            align-items: center;
            justify-content: center;
            grid-column: 3;
            z-index: 2;
        }
    `.withBehaviors(
        forcedColorsStylesheetBehavior(
            css`
                .button:${focusVisible}::before {
                    forced-color-adjust: none;
                    border-color: ${SystemColors.Highlight};
                    box-shadow: 0 0 0 calc(${focusStrokeWidth} * 1px) ${SystemColors.Highlight};
                }
                slot[name="collapsed-icon"],
                slot[name="expanded-icon"] {
                    fill: ${SystemColors.ButtonText}
                }
            `
        )
    );
