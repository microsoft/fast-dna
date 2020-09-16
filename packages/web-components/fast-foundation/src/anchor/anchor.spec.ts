import { expect } from "chai";
import { Anchor, AnchorTemplate as template } from "./index";
import { fixture } from "../fixture";
import { DOM, customElement } from "@microsoft/fast-element";

describe("Anchor", () => {
    const name = "Anchor";

    @customElement({
        name: "fast-anchor",
        template,
    })
    class FASTAnchor extends Anchor {}

    it("should set the `download` attribute on the internal anchor equal to the value provided", async () => {
        const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
        const download: string = "foo";

        element.download = download;

        await connect();
        expect(element.shadowRoot?.querySelector("a")?.getAttribute("download")).to.equal(
            download
        );
    });

    it("should set the `href` attribute on the internal anchor equal to the value provided", async () => {
        const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
        const href: string = "https://fast.design";

        element.href = href;

        await connect();

        expect(element.shadowRoot?.querySelector("a")?.getAttribute("href")).to.equal(
            href
        );
    });

    it("should set the `hreflang` attribute on the internal anchor equal to the value provided", async () => {
        const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
        const hreflang: string = "en-GB";

        element.hreflang = hreflang;

        await connect();

        expect(element.shadowRoot?.querySelector("a")?.getAttribute("hreflang")).to.equal(
            hreflang
        );
    });

    it("should set the `ping` attribute on the internal anchor equal to the value provided", async () => {
        const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
        const ping: string = "https://fast.design/trackingthepings";

        element.ping = ping;

        await connect();

        expect(element.shadowRoot?.querySelector("a")?.getAttribute("ping")).to.equal(
            ping
        );
    });

    it("should set the `referrerpolicy` attribute on the internal anchor equal to the value provided", async () => {
        const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
        const referrerpolicy: string = "no-referrer";

        element.referrerpolicy = referrerpolicy;

        await connect();

        expect(
            element.shadowRoot?.querySelector("a")?.getAttribute("referrerpolicy")
        ).to.equal(referrerpolicy);
    });

    it("should set the `rel` attribute on the internal anchor equal to the value provided", async () => {
        const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
        const rel: string = "external";

        element.rel = rel;

        await connect();

        expect(element.shadowRoot?.querySelector("a")?.getAttribute("rel")).to.equal(rel);
    });

    it("should set the `target` attribute on the internal anchor equal to the value provided", async () => {
        const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
        const target = "_self";

        element.target = target;

        await connect();

        expect(element.shadowRoot?.querySelector("a")?.getAttribute("target")).to.equal(
            target
        );
    });

    it("should set the `type` attribute on the internal anchor equal to the value provided", async () => {
        const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
        const type = "text/html";

        element.type = type;

        await connect();

        expect(element.shadowRoot?.querySelector("a")?.getAttribute("type")).to.equal(
            type
        );
    });

    describe("Delegates ARIA link", () => {
        it("should set the `aria-atomic` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaAtomic = "true";
    
            element.ariaAtomic = ariaAtomic;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-atomic")).to.equal(
                ariaAtomic
            );
        });

        it("should set the `aria-busy` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaBusy = "false";
    
            element.ariaBusy = ariaBusy;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-busy")).to.equal(
                ariaBusy
            );
        });

        it("should set the `aria-controls` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaControls = "testId";
    
            element.ariaControls = ariaControls;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-controls")).to.equal(
                ariaControls
            );
        });

        it("should set the `aria-current` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaCurrent = "page";
    
            element.ariaCurrent = ariaCurrent;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-current")).to.equal(
                ariaCurrent
            );
        });

        it("should set the `aria-describedBy` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaDescribedby = "testId";
    
            element.ariaDescribedby = ariaDescribedby;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-describedBy")).to.equal(
                ariaDescribedby
            );
        });
    
        it("should set the `aria-details` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaDetails = "testId";
    
            element.ariaDetails = ariaDetails;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-details")).to.equal(
                ariaDetails
            );
        });

        it("should set the `aria-disabled` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaDisabled = "true";
    
            element.ariaDisabled = ariaDisabled;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-disabled")).to.equal(
                ariaDisabled
            );
        });

        it("should set the `aria-message` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaErrormessage = "test";
    
            element.ariaErrormessage = ariaErrormessage;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-errormessage")).to.equal(
                ariaErrormessage
            );
        });

        it("should set the `aria-expanded` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaExpanded = "true";
    
            element.ariaExpanded = ariaExpanded;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-expanded")).to.equal(
                ariaExpanded
            );
        });

        it("should set the `aria-flowto` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaFlowto = "testId";
    
            element.ariaFlowto = ariaFlowto;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-flowto")).to.equal(
                ariaFlowto
            );
        });
    
        it("should set the `aria-haspopup` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaHaspopup = "true";
    
            element.ariaHaspopup = ariaHaspopup;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-haspopup")).to.equal(
                ariaHaspopup
            );
        });

        it("should set the `aria-hidden` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaHidden = "true";
    
            element.ariaHidden = ariaHidden;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-hidden")).to.equal(
                ariaHidden
            );
        });

        it("should set the `aria-invalid` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaInvalid = "spelling";
    
            element.ariaInvalid = ariaInvalid;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-invalid")).to.equal(
                ariaInvalid
            );
        });

        it("should set the `aria-keyshortcuts` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaKeyshortcuts = "F4";
    
            element.ariaKeyshortcuts = ariaKeyshortcuts;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-keyshortcuts")).to.equal(
                ariaKeyshortcuts
            );
        });
    
        it("should set the `aria-label` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaLabel = "Foo label";
    
            element.ariaLabel = ariaLabel;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-label")).to.equal(
                ariaLabel
            );
        });
    
        it("should set the `aria-labelledby` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaLabelledby = "testId";
    
            element.ariaLabelledby = ariaLabelledby;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-labelledby")).to.equal(
                ariaLabelledby
            );
        });

        it("should set the `aria-live` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaLive = "polite";
    
            element.ariaLive = ariaLive;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-live")).to.equal(
                ariaLive
            );
        });

        it("should set the `aria-owns` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaOwns = "testId";
    
            element.ariaOwns = ariaOwns;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-owns")).to.equal(
                ariaOwns
            );
        });
    
        it("should set the `aria-relevant` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaRelevant = "removals";
    
            element.ariaRelevant = ariaRelevant;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-relevant")).to.equal(
                ariaRelevant
            );
        });
    
        it("should set the `aria-roledescription` attribute on the internal anchor when provided", async () => {
            const { element, connect } = await fixture<FASTAnchor>("fast-anchor");
            const ariaRoledescription = "slide";
    
            element.ariaRoledescription = ariaRoledescription;
    
            await connect();
    
            expect(element.shadowRoot?.querySelector("a")?.getAttribute("aria-roledescription")).to.equal(
                ariaRoledescription
            );
        });
    })
});
