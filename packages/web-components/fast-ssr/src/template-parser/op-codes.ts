import { AspectedHTMLDirective } from "@microsoft/fast-element";

/**
 * Allows fast identification of operation types
 */
export enum OpType {
    customElementOpen,
    customElementClose,
    customElementAttributes,
    customElementShadow,
    directive,
    text,
}

/**
 * Operation to emit static text
 */
export type TextOp = {
    type: OpType.text;
    value: string;
};

/**
 * Operation to open a custom element
 */
export type CustomElementOpenOp = {
    type: OpType.customElementOpen;
    /**
     * The tagname of the custom element
     */
    tagName: string;

    /**
     * The constructor of the custom element
     */
    ctor: typeof HTMLElement;

    /**
     * Attributes of the custom element, non-inclusive of any attributes
     * that are the product of bindings
     */
    staticAttributes: Map<string, string>;
};

/**
 * Operation to close a custom element
 */
export type CustomElementCloseOp = {
    type: OpType.customElementClose;
};

export type CustomElementShadowOp = {
    type: OpType.customElementShadow;
};

/**
 * Operation to emit static text
 */
export type DirectiveOp = {
    type: OpType.directive;
    directive: AspectedHTMLDirective;
};

/**
 * Operation to emit to custom-element attributes
 */
export type CustomElementAttributes = {
    type: OpType.customElementAttributes;
};

export type Op =
    | TextOp
    | CustomElementOpenOp
    | CustomElementCloseOp
    | DirectiveOp
    | CustomElementAttributes
    | CustomElementShadowOp;
