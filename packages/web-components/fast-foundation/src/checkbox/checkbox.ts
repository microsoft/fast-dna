import { attr, observable, SyntheticViewTemplate } from "@microsoft/fast-element";
import { keySpace } from "@microsoft/fast-web-utilities";
import type { FoundationElementDefinition } from "../foundation-element";
import { FormAssociatedCheckbox } from "./checkbox.form-associated";

/**
 * Checkbox configuration options
 * @public
 */
export type CheckboxOptions = FoundationElementDefinition & {
    checkedIndicator?: string | SyntheticViewTemplate;
    indeterminateIndicator?: string | SyntheticViewTemplate;
};

/**
 * A Checkbox Custom HTML Element.
 * Implements the {@link https://www.w3.org/TR/wai-aria-1.1/#checkbox | ARIA checkbox }.
 *
 * @public
 */
export class Checkbox extends FormAssociatedCheckbox {
    /**
     * When true, the control will be immutable by user interaction. See {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/readonly | readonly HTML attribute} for more information.
     * @public
     * @remarks
     * HTML Attribute: readonly
     */
    @attr({ attribute: "readonly", mode: "boolean" })
    public readOnly: boolean; // Map to proxy element
    private readOnlyChanged(): void {
        if (this.proxy instanceof HTMLInputElement) {
            this.proxy.readOnly = this.readOnly;
        }
    }

    /**
     * The element's value to be included in form submission when checked.
     * Default to "on" to reach parity with input[type="checkbox"]
     *
     * @internal
     */
    public initialValue: string = "on";

    /**
     * @internal
     */
    @observable
    public defaultSlottedNodes: Node[];

    /**
     * The indeterminate state of the control
     */
    @observable
    public indeterminate: boolean = false;

    constructor() {
        super();

        this.proxy.setAttribute("type", "checkbox");
    }

    /**
     * @internal
     */
    public keypressHandler = (e: KeyboardEvent): void => {
        switch (e.key) {
            case keySpace:
                this.checked = !this.checked;
                break;
        }
    };

    /**
     * @internal
     */
    public clickHandler = (e: MouseEvent): void => {
        if (!this.disabled && !this.readOnly) {
            this.checked = !this.checked;
        }
    };
}
