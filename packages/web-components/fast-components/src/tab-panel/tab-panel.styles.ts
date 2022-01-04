import { css, ElementStyles } from "@microsoft/fast-element";
import {
    display,
    ElementDefinitionContext,
    FoundationElementDefinition,
    FoundationElementTemplate,
} from "@microsoft/fast-foundation";
import {
    density,
    designUnit,
    typeRampBaseFontSize,
    typeRampBaseLineHeight,
} from "../design-tokens";

/**
 * Styles for Tab Panel
 * @public
 */
export const tabPanelStyles: FoundationElementTemplate<ElementStyles> = (
    context: ElementDefinitionContext,
    definition: FoundationElementDefinition
) => css`
    ${display("block")} :host {
        box-sizing: border-box;
        font-size: ${typeRampBaseFontSize};
        line-height: ${typeRampBaseLineHeight};
        padding: 0 calc((6 + (${designUnit} * 2 * ${density})) * 1px);
    }
`;
