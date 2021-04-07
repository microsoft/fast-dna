import { attr } from "@microsoft/fast-element";
import {
    TextField as FoundationTextField,
    TextFieldTemplate as template,
} from "@microsoft/fast-foundation";
import { TextFieldStyles as styles } from "./text-field.styles";

/**
 * Text field appearances
 * @public
 */
export type TextFieldAppearance = "filled" | "outline";

/**
 * @internal
 */
export class TextField extends FoundationTextField {
    /**
     * The appearance of the element.
     *
     * @public
     * @remarks
     * HTML Attribute: appearance
     */
    @attr
    public appearance: TextFieldAppearance;

    /**
     * @internal
     */
    public connectedCallback() {
        super.connectedCallback();

        if (!this.appearance) {
            this.appearance = "outline";
        }
    }
}

/**
 * The FAST Text Field Custom Element. Implements {@link @microsoft/fast-foundation#TextField},
 * {@link @microsoft/fast-foundation#TextFieldTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-text-field\>
 *
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/ShadowRoot/delegatesFocus | delegatesFocus}
 */
export const FASTTextField = TextField.compose({
    baseName: "text-field",
    template,
    styles,
    shadowOptions: {
        delegatesFocus: true,
    },
});

/**
 * Styles for TextField
 * @public
 */
export const TextFieldStyles = styles;
