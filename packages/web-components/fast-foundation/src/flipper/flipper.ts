import { attr, booleanConverter, SyntheticViewTemplate } from "@microsoft/fast-element";
import { FoundationElement, FoundationElementDefinition } from "../foundation-element";
import { FlipperDirection } from "./flipper.options";

export { FlipperDirection };

/**
 * Flipper configuration options
 * @public
 */
export type FlipperOptions = FoundationElementDefinition & {
    next?: string | SyntheticViewTemplate;
    previous?: string | SyntheticViewTemplate;
};

/**
 * A Flipper Custom HTML Element.
 * Flippers are a form of button that implies directional content navigation, such as in a carousel.
 *
 * @public
 */
export class Flipper extends FoundationElement {
    /**
     * The disabled state of the flipper.
     * @public
     * @remarks
     * HTML Attribute: disabled
     */
    @attr({ mode: "boolean" })
    public disabled: boolean;

    /**
     * Indicates the flipper should be hidden from assistive technology. Because flippers are often supplementary navigation, they are often hidden from assistive technology.
     *
     * @public
     * @defaultValue - true
     * @remarks
     * HTML Attribute: aria-hidden
     */
    @attr({ attribute: "aria-hidden", converter: booleanConverter })
    public hiddenFromAT: boolean = true;

    /**
     * The direction that the flipper implies navigating.
     *
     * @public
     * @remarks
     * HTML Attribute: direction
     */
    @attr
    public direction: FlipperDirection = FlipperDirection.next;
}
