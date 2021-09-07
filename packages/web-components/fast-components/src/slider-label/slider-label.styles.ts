import { css, ElementStyles } from "@microsoft/fast-element";
import { SystemColors } from "@microsoft/fast-web-utilities";
import {
    display,
    ElementDefinitionContext,
    forcedColorsStylesheetBehavior,
    FoundationElementDefinition,
} from "@microsoft/fast-foundation";
import {
    bodyFont,
    designUnit,
    disabledOpacity,
    neutralForegroundRest,
    strokeControlStrongRest,
    strokeWidth,
} from "../design-tokens";
import { heightNumber } from "../styles/index";

export const horizontalSliderStyles = css`
    :host {
        align-self: start;
        grid-row: 2;
        margin-top: -2px;
        height: calc((${heightNumber} / 2 + ${designUnit}) * 1px);
        width: auto;
    }
    .container {
        grid-template-rows: auto auto;
        grid-template-columns: 0;
    }
    .label {
        margin: 2px 0;
    }
`;

export const verticalSliderStyles = css`
    :host {
        justify-self: start;
        grid-column: 2;
        margin-left: 2px;
        height: auto;
        width: calc((${heightNumber} / 2 + ${designUnit}) * 1px);
    }
    .container {
        grid-template-columns: auto auto;
        grid-template-rows: 0;
        min-width: calc(var(--thumb-size) * 1px);
        height: calc(var(--thumb-size) * 1px);
    }
    .mark {
        transform: rotate(90deg);
        align-self: center;
    }
    .label {
        margin-left: calc((${designUnit} / 2) * 3px);
        align-self: center;
    }
`;

export const sliderLabelStyles: (
    context: ElementDefinitionContext,
    definition: FoundationElementDefinition
) => ElementStyles = (
    context: ElementDefinitionContext,
    definition: FoundationElementDefinition
) =>
    css`
        ${display("block")} :host {
            font-family: ${bodyFont};
            color: ${neutralForegroundRest};
            fill: currentcolor;
        }
        .root {
            position: absolute;
            display: grid;
        }
        :host(.horizontal) {
            align-self: start;
            grid-row: 2;
            margin-top: -4px;
        }
        :host(.vertical) {
            justify-self: start;
            grid-column: 2;
            margin-left: 2px;
        }
        .container {
            display: grid;
            justify-self: center;
        }
        :host(.horizontal) .container {
            grid-template-rows: auto auto;
            grid-template-columns: 0;
        }
        :host(.vertical) .container {
            grid-template-columns: auto auto;
            grid-template-rows: 0;
            min-width: calc(var(--thumb-size) * 1px);
            height: calc(var(--thumb-size) * 1px);
        }
        .label {
            justify-self: center;
            align-self: center;
            white-space: nowrap;
            max-width: 30px;
            margin: 2px 0;
        }
        .mark {
            width: calc(${strokeWidth} * 1px);
            height: calc(${designUnit} * 1px);
            background: ${strokeControlStrongRest};
            justify-self: center;
        }
        :host(.vertical) .mark {
            transform: rotate(90deg);
            align-self: center;
        }
        :host(.vertical) .label {
            margin-left: calc((${designUnit} / 2) * 2px);
            align-self: center;
        }
        :host(.disabled) {
            opacity: ${disabledOpacity};
        }
    `.withBehaviors(
        forcedColorsStylesheetBehavior(
            css`
                .mark {
                    forced-color-adjust: none;
                    background: ${SystemColors.FieldText};
                }
                :host(.disabled) {
                    forced-color-adjust: none;
                    opacity: 1;
                }
                :host(.disabled) .label {
                    color: ${SystemColors.GrayText};
                }
                :host(.disabled) .mark {
                    background: ${SystemColors.GrayText};
                }
            `
        )
    );
