import "@lit-labs/ssr/lib/install-global-dom-shim.js";
import { customElement, FASTElement, html, when } from "@microsoft/fast-element";
import { expect, test } from "@playwright/test";
import fastSSR from "../exports.js";
import { TemplateRenderer } from "./template-renderer.js";

function consolidate(strings: IterableIterator<string>): string {
    let str = "";
    let current = strings.next();

    while(!current.done) {
        str = str.concat(current.value)
        current = strings.next();
    }

    return str;
}

@customElement("hello-world")
class HelloWorld extends FASTElement {}

@customElement({name: "with-slot", template: html`
    <slot></slot>
`})
class WithSlot extends FASTElement {}
test.describe("TemplateRenderer", () => {
    test.describe("should have an initial configuration", () => {
        test("that emits to shadow DOM", () => {
            const instance = new TemplateRenderer();
            expect(instance.componentDOMEmissionMode).toBe("shadow")
        });
    });

    test.describe("should allow configuration", () => {
        test("that emits to light DOM", () => {
            const instance = new TemplateRenderer({componentDOMEmissionMode: "light"});
            expect(instance.componentDOMEmissionMode).toBe("light")
        });
    });

    test("should emit a single element template", () => {
        const { templateRenderer, defaultRenderInfo} = fastSSR();
        const result = templateRenderer.render(html`<p>Hello world</p>`, defaultRenderInfo)

        expect(consolidate(result)).toBe("<p>Hello world</p>")
    });

    test("should emit un-registerd custom elements without any shadow DOM", () => {
        const { templateRenderer, defaultRenderInfo} = fastSSR();
        const result = templateRenderer.render(html`<unregistered-element>Hello world</unregistered-element>`, defaultRenderInfo)

        expect(consolidate(result)).toBe("<unregistered-element>Hello world</unregistered-element>");
    });
    test("should emit template element with shadowroot attribute for defined custom element", () => {
        const { templateRenderer, defaultRenderInfo} = fastSSR();
        const result = templateRenderer.render(html`<hello-world></hello-world>`, defaultRenderInfo)

        expect(consolidate(result)).toBe("<hello-world><template shadowroot=\"open\"></template></hello-world>");
    });
    // TODO: enable. This is disabled because fast-element throws during element connection
    test.skip("should emit static shadow DOM template for a defined custom element", () => {
        const { templateRenderer, defaultRenderInfo} = fastSSR();
        const result = templateRenderer.render(html`<with-slot></with-slot>`, defaultRenderInfo)

        expect(consolidate(result)).toBe("<with-slot><template shadowroot=\"open\"><slot></slot></template></with-slot>");
    });

    /**
     * Bindings
     */
    test("should provide the source object to any bindings", () => {
        const source = {};
        let calledWith: any;
        const { templateRenderer, defaultRenderInfo} = fastSSR();
        consolidate(templateRenderer.render(html`${(x) => {calledWith = x}}`, defaultRenderInfo, source));

        expect(source).toBe(calledWith);
    });

    test("should not emit string content from a binding that returns a null value", () => {
        const { templateRenderer, defaultRenderInfo} = fastSSR();
        const result = consolidate(templateRenderer.render(html`${(x) => null}`, defaultRenderInfo));

        expect(result).toBe("");
    });

    test("should not emit string content from a binding that returns an undefined value", () => {
        const { templateRenderer, defaultRenderInfo} = fastSSR();
        const result = consolidate(templateRenderer.render(html`${(x) => undefined}`, defaultRenderInfo));

        expect(result).toBe("");
    });

    /**
     * Directive tests
     */
    test("should render a 'when' directive's content when the binding evaluates true", () => {
        const { templateRenderer, defaultRenderInfo} = fastSSR();
        const result = templateRenderer.render(html`${when(x => true, html`<p>Hello world</p>`)}`, defaultRenderInfo)

        expect(consolidate(result)).toBe("<p>Hello world</p>")
    });
    test("should emit nothing when a 'when' directive's binding evaluates false ", () => {
        const { templateRenderer, defaultRenderInfo} = fastSSR();
        const result = templateRenderer.render(html`${when(x => false, html`<p>Hello world</p>`)}`, defaultRenderInfo)

        expect(consolidate(result)).toBe("");
    });
});
