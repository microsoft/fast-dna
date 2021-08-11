import { html } from "@microsoft/fast-element";
import type { ViewTemplate } from "@microsoft/fast-element";
import type { ElementDefinitionContext } from "../design-system";
import type { FoundationElementDefinition } from "../foundation-element";
import { endTemplate, startTemplate } from "../patterns/start-end";
import type { ListboxOption } from "./listbox-option";

/**
 * The template for the {@link @microsoft/fast-foundation#(ListboxOption:class)} component.
 * @public
 */
export const listboxOptionTemplate: (
    context: ElementDefinitionContext,
    definition: FoundationElementDefinition
) => ViewTemplate<ListboxOption> = (
    context: ElementDefinitionContext,
    definition: FoundationElementDefinition
) => html`
    <template
        aria-checked="${x => x.ariaChecked}"
        aria-selected="${x => x.ariaSelected}"
        class="${x =>
            [x.checked && "checked", x.selected && "selected", x.disabled && "disabled"]
                .filter(Boolean)
                .join(" ")}"
        role="option"
    >
        ${startTemplate}
        <span class="content" part="content">
            <slot></slot>
        </span>
        ${endTemplate}
    </template>
`;
