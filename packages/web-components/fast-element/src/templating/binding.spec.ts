import { expect } from "chai";
import { bind, HTMLBindingDirective, oneTime, listener } from "./binding.js";
import { observable } from "../observation/observable.js";
import { html, ViewTemplate } from "./template.js";
import { toHTML } from "../__test__/helpers.js";
import { SyntheticView, HTMLView } from "./view.js";
import { Updates } from "../observation/update-queue.js";
import { Aspect, ViewBehaviorTargets, ViewController } from "./html-directive.js";
import { DOM } from "./dom.js";
import { Signal, signal } from "./binding-signal.js";
import { twoWay, TwoWayBindingOptions } from "./binding-two-way.js";
import { Fake } from "../testing/fakes.js";

describe("The HTML binding directive", () => {
    class Model {
        constructor(value: any) {
            this.value = value;
        }

        @observable value: any = null;
        @observable private trigger = 0;
        @observable knownValue = "value";
        actionInvokeCount = 0;

        forceComputedUpdate() {
            this.trigger++;
        }

        invokeAction() {
            this.actionInvokeCount++;
        }

        get computedValue() {
            const trigger = this.trigger;
            return this.value;
        }
    }

    function contentBinding(propertyName: keyof Model = "value") {
        const directive = new HTMLBindingDirective(bind(x => x[propertyName]));
        directive.nodeId = 'r';

        const node = document.createTextNode(" ");
        const targets = { r: node };

        const behavior = directive.createBehavior();
        const parentNode = document.createElement("div");

        parentNode.appendChild(node);

        return { directive, behavior, node, parentNode, targets };
    }

    function configureDirective(directive: HTMLBindingDirective, sourceAspect?: string) {
        directive.nodeId = 'r';

        if (sourceAspect) {
            Aspect.assign(directive, sourceAspect);
        }

        const node = document.createElement("div");
        const targets = { r: node };

        const behavior = directive.createBehavior();
        const parentNode = document.createElement("div");

        parentNode.appendChild(node);

        return { directive, behavior, node, parentNode, targets };
    }

    function defaultBinding(sourceAspect?: string) {
        const directive = new HTMLBindingDirective(bind<Model>(x => x.value));
        return configureDirective(directive, sourceAspect);
    }

    function oneTimeBinding(sourceAspect?: string) {
        const directive = new HTMLBindingDirective(oneTime<Model>(x => x.value));
        return configureDirective(directive, sourceAspect);
    }

    function signalBinding(signalName: string, sourceAspect?: string) {
        const directive = new HTMLBindingDirective(signal<Model>(x => x.value, signalName));
        return configureDirective(directive, sourceAspect);
    }

    function twoWayBinding(options: TwoWayBindingOptions, sourceAspect?: string) {
        const directive = new HTMLBindingDirective(twoWay<Model>(x => x.value, options));
        return configureDirective(directive, sourceAspect);
    }

    function eventBinding(options: AddEventListenerOptions, sourceAspect: string) {
        const directive = new HTMLBindingDirective(listener<Model>(x => x.invokeAction(), options));
        return configureDirective(directive, sourceAspect);
    }

    function createController(source: any, targets: ViewBehaviorTargets) {
        const unbindables = new Set<{ unbind(controller: ViewController) }>();

        return {
            context: Fake.executionContext(),
            onUnbind(object) {
                unbindables.add(object);
            },
            source,
            targets,
            unbind() {
                unbindables.forEach(x => x.unbind(this));
            }
        };
    }

    context("when binding text content", () => {
        it("initially sets the text of a node", () => {
            const { behavior, node, targets } = contentBinding();
            const model = new Model("This is a test");
            const controller = createController(model, targets);

            behavior.bind(controller);

            expect(node.textContent).to.equal(model.value);
        });

        it("updates the text of a node when the expression changes", async () => {
            const { behavior, node, targets } = contentBinding();
            const model = new Model("This is a test");
            const controller = createController(model, targets);

            behavior.bind(controller);

            expect(node.textContent).to.equal(model.value);

            model.value = "This is another test, different from the first.";

            await Updates.next();

            expect(node.textContent).to.equal(model.value);
        });
    });

    context("when binding template content", () => {
        it("initially inserts a view based on the template", () => {
            const { behavior, parentNode, targets } = contentBinding();
            const template = html<Model>`This is a template. ${x => x.knownValue}`;
            const model = new Model(template);
            const controller = createController(model, targets);

            behavior.bind(controller);

            expect(toHTML(parentNode)).to.equal(`This is a template. value`);
        });

        it("removes an inserted view when the value changes to plain text", async () => {
            const { behavior, parentNode, targets } = contentBinding();
            const template = html`This is a template. ${x => x.knownValue}`;
            const model = new Model(template);
            const controller = createController(model, targets);

            behavior.bind(controller);

            expect(toHTML(parentNode)).to.equal(`This is a template. value`);

            model.value = "This is a test.";

            await Updates.next();

            expect(toHTML(parentNode)).to.equal(model.value);
        });

        it("removes an inserted view when the value changes to null", async () => {
            const { behavior, parentNode, targets } = contentBinding();
            const template = html`This is a template. ${x => x.knownValue}`;
            const model = new Model(template);
            const controller = createController(model, targets);

            behavior.bind(controller);

            expect(toHTML(parentNode)).to.equal(`This is a template. value`);

            model.value = null;

            await Updates.next();

            expect(toHTML(parentNode)).to.equal("");
        });

        it("removes an inserted view when the value changes to undefined", async () => {
            const { behavior, parentNode, targets } = contentBinding();
            const template = html`This is a template. ${x => x.knownValue}`;
            const model = new Model(template);
            const controller = createController(model, targets);

            behavior.bind(controller);

            expect(toHTML(parentNode)).to.equal(`This is a template. value`);

            model.value = void 0;

            await Updates.next();

            expect(toHTML(parentNode)).to.equal("");
        });

        it("updates an inserted view when the value changes to a new template", async () => {
            const { behavior, parentNode, targets } = contentBinding();
            const template = html`This is a template. ${x => x.knownValue}`;
            const model = new Model(template);
            const controller = createController(model, targets);

            behavior.bind(controller);

            expect(toHTML(parentNode)).to.equal(`This is a template. value`);

            const newTemplate = html<Model>`This is a new template ${x => x.knownValue}`;
            model.value = newTemplate;

            await Updates.next();

            expect(toHTML(parentNode)).to.equal(`This is a new template value`);
        });

        it("reuses a previous view when the value changes back from a string", async () => {
            const { behavior, parentNode, node, targets } = contentBinding();
            const template = html`This is a template. ${x => x.knownValue}`;
            const model = new Model(template);
            const controller = createController(model, targets);

            behavior.bind(controller);

            const view = (node as any).$fastView as SyntheticView;
            const capturedTemplate = (node as any).$fastTemplate as ViewTemplate;

            expect(view).to.be.instanceOf(HTMLView);
            expect(capturedTemplate).to.equal(template);
            expect(toHTML(parentNode)).to.equal(`This is a template. value`);

            model.value = "This is a test string.";

            await Updates.next();

            expect(toHTML(parentNode)).to.equal(model.value);

            model.value = template;

            await Updates.next();

            const newView = (node as any).$fastView as SyntheticView;
            const newCapturedTemplate = (node as any).$fastTemplate as ViewTemplate;

            expect(newView).to.equal(view);
            expect(newCapturedTemplate).to.equal(capturedTemplate);
            expect(toHTML(parentNode)).to.equal(`This is a template. value`);
        });

        it("doesn't compose an already composed view", async () => {
            const { behavior, parentNode, targets } = contentBinding("computedValue");
            const template = html`This is a template. ${x => x.knownValue}`;
            const model = new Model(template);
            const controller = createController(model, targets);

            behavior.bind(controller);

            expect(toHTML(parentNode)).to.equal(`This is a template. value`);

            model.value = template;
            model.forceComputedUpdate();

            await Updates.next();

            expect(toHTML(parentNode)).to.equal(`This is a template. value`);
        });

        it("allows interpolated HTML tags in templates", async () => {
            const { behavior, parentNode, targets } = contentBinding();
            const template = html`${x => html`<${x.knownValue}>Hi there!</${x.knownValue}>`}`;
            const model = new Model(template);
            model.knownValue = "button"
            const controller = createController(model, targets);

            behavior.bind(controller);

            expect(toHTML(parentNode)).to.equal(`<button>Hi there!</button>`);

            model.knownValue = "a"

            await Updates.next()

            expect(toHTML(parentNode)).to.equal(`<a>Hi there!</a>`);
        })
    })

    context("when unbinding template content", () => {
        it("unbinds a composed view", () => {
            const { behavior, node, parentNode, targets } = contentBinding();
            const template = html`This is a template. ${x => x.knownValue}`;
            const model = new Model(template);
            const controller = createController(model, targets);

            behavior.bind(controller);

            const newView = (node as any).$fastView as SyntheticView;
            expect(newView.source).to.equal(model);
            expect(toHTML(parentNode)).to.equal(`This is a template. value`);

            controller.unbind();

            expect(newView.source).to.equal(null);
        });

        it("rebinds a previously unbound composed view", () => {
            const { behavior, node, parentNode, targets } = contentBinding();
            const template = html`This is a template. ${x => x.knownValue}`;
            const model = new Model(template);
            const controller = createController(model, targets);

            behavior.bind(controller);

            const view = (node as any).$fastView as SyntheticView;
            expect(view.source).to.equal(model);
            expect(toHTML(parentNode)).to.equal(`This is a template. value`);

            controller.unbind();

            expect(view.source).to.equal(null);

            behavior.bind(controller);

            const newView = (node as any).$fastView as SyntheticView;
            expect(newView.source).to.equal(model);
            expect(toHTML(parentNode)).to.equal(`This is a template. value`);
        });
    });

    const aspectScenarios = [
        {
            name: "content",
            sourceAspect: "",
            originalValue: "This is a test",
            newValue: "This is another test",
            getValue(node: HTMLElement) {
                return node.textContent;
            },
            setValue(node: HTMLElement, value: any) {
                node.textContent = value;
            }
        },
        {
            name: "attribute",
            sourceAspect: "test-attribute",
            originalValue: "This is a test",
            newValue: "This is another test",
            getValue(node: HTMLElement) {
                return node.getAttribute("test-attribute");
            },
            setValue(node: HTMLElement, value: any) {
                DOM.setAttribute(node, "test-attribute", value);
            }
        },
        {
            name: "boolean attribute",
            sourceAspect: "?test-boolean-attribute",
            originalValue: true,
            newValue: false,
            getValue(node: HTMLElement) {
                return node.hasAttribute("test-boolean-attribute");
            },
            setValue(node: HTMLElement, value: any) {
                DOM.setBooleanAttribute(node, "test-boolean-attribute", value);
            }
        },
        {
            name: "property",
            sourceAspect: ":testProperty",
            originalValue: "This is a test",
            newValue: "This is another test",
            getValue(node: HTMLElement) {
                return (node as any).testProperty;
            },
            setValue(node: HTMLElement, value: any) {
                (node as any).testProperty = value;
            }
        },
    ];

    context("when binding on-change", () => {
        for (const aspectScenario of aspectScenarios) {
            it(`sets the initial value of a ${aspectScenario.name} binding`, () => {
                const { behavior, node, targets } = defaultBinding(aspectScenario.sourceAspect);
                const model = new Model(aspectScenario.originalValue);
                const controller = createController(model, targets);

                behavior.bind(controller);

                expect(aspectScenario.getValue(node)).to.equal(model.value);
            });

            it(`updates the ${aspectScenario.name} when the model changes`, async () => {
                const { behavior, node, targets } = defaultBinding(aspectScenario.sourceAspect);
                const model = new Model(aspectScenario.originalValue);
                const controller = createController(model, targets);

                behavior.bind(controller);

                expect(aspectScenario.getValue(node)).to.equal(model.value);

                model.value = aspectScenario.newValue;

                await Updates.next();

                expect(aspectScenario.getValue(node)).to.equal(model.value);
            });

            it(`doesn't update the ${aspectScenario.name} after unbind`, async () => {
                const { behavior, node, targets } = defaultBinding(aspectScenario.sourceAspect);
                const model = new Model(aspectScenario.originalValue);
                const controller = createController(model, targets);

                behavior.bind(controller);

                expect(aspectScenario.getValue(node)).to.equal(model.value);

                controller.unbind();
                model.value = aspectScenario.newValue;

                await Updates.next();

                expect(aspectScenario.getValue(node)).to.equal(aspectScenario.originalValue);
            });
        }
    });

    context("when binding one-time", () => {
        for (const aspectScenario of aspectScenarios) {
            it(`sets the initial value of a ${aspectScenario.name} binding`, () => {
                const { behavior, node, targets } = oneTimeBinding(aspectScenario.sourceAspect);
                const model = new Model(aspectScenario.originalValue);
                const controller = createController(model, targets);

                behavior.bind(controller);

                expect(aspectScenario.getValue(node)).to.equal(model.value);
            });

            it(`does not update the ${aspectScenario.name} after the initial set`, async () => {
                const { behavior, node, targets } = oneTimeBinding(aspectScenario.sourceAspect);
                const model = new Model(aspectScenario.originalValue);
                const controller = createController(model, targets);

                behavior.bind(controller);

                expect(aspectScenario.getValue(node)).to.equal(aspectScenario.originalValue);

                model.value = aspectScenario.newValue;

                await Updates.next();

                expect(aspectScenario.getValue(node)).to.equal(aspectScenario.originalValue);
            });

            it(`doesn't update the ${aspectScenario.name} after unbind`, async () => {
                const { behavior, node, targets } = oneTimeBinding(aspectScenario.sourceAspect);
                const model = new Model(aspectScenario.originalValue);
                const controller = createController(model, targets);

                behavior.bind(controller);

                expect(aspectScenario.getValue(node)).to.equal(aspectScenario.originalValue);

                controller.unbind();
                model.value = aspectScenario.newValue;
                await Updates.next();

                expect(aspectScenario.getValue(node)).to.equal(aspectScenario.originalValue);
            });
        }
    });

    context("when binding with a signal", () => {
        for (const aspectScenario of aspectScenarios) {
            it(`sets the initial value of the ${aspectScenario.name} binding`, () => {
                const { behavior, node, targets } = signalBinding("test-signal", aspectScenario.sourceAspect);
                const model = new Model(aspectScenario.originalValue);
                const controller = createController(model, targets);

                behavior.bind(controller);

                expect(aspectScenario.getValue(node)).to.equal(model.value);
            });

            it(`updates the ${aspectScenario.name} only when the signal is sent`, async () => {
                const signalName = "test-signal";
                const { behavior, node, targets } = signalBinding(signalName, aspectScenario.sourceAspect);
                const model = new Model(aspectScenario.originalValue);
                const controller = createController(model, targets);

                behavior.bind(controller);

                expect(aspectScenario.getValue(node)).to.equal(aspectScenario.originalValue);

                model.value = aspectScenario.newValue;

                await Updates.next();

                expect(aspectScenario.getValue(node)).to.equal(aspectScenario.originalValue);

                Signal.send(signalName);

                await Updates.next();

                expect(aspectScenario.getValue(node)).to.equal(model.value);
            });

            it(`doesn't respond to signals for a ${aspectScenario.name} binding after unbind`, async () => {
                const signalName = "test-signal";
                const { behavior, node, targets } = signalBinding(signalName, aspectScenario.sourceAspect);
                const model = new Model(aspectScenario.originalValue);
                const controller = createController(model, targets);

                behavior.bind(controller);

                expect(aspectScenario.getValue(node)).to.equal(model.value);

                controller.unbind();
                model.value = aspectScenario.newValue;
                Signal.send(signalName);

                await Updates.next();

                expect(aspectScenario.getValue(node)).to.equal(aspectScenario.originalValue);
            });
        }
    });

    context("when binding two-way", () => {
        for (const aspectScenario of aspectScenarios) {
            it(`sets the initial value of the ${aspectScenario.name} binding`, () => {
                const { behavior, node, targets } = twoWayBinding({}, aspectScenario.sourceAspect);
                const model = new Model(aspectScenario.originalValue);
                const controller = createController(model, targets);

                behavior.bind(controller);

                expect(aspectScenario.getValue(node)).to.equal(model.value);
            });

            it(`updates the ${aspectScenario.name} when the model changes`, async () => {
                const { behavior, node, targets } = twoWayBinding({}, aspectScenario.sourceAspect);
                const model = new Model(aspectScenario.originalValue);
                const controller = createController(model, targets);

                behavior.bind(controller);

                expect(aspectScenario.getValue(node)).to.equal(aspectScenario.originalValue);

                model.value = aspectScenario.newValue;

                await Updates.next();

                expect(aspectScenario.getValue(node)).to.equal(model.value);
            });

            it(`updates the model when a change event fires for the ${aspectScenario.name}`, async () => {
                const { behavior, node, targets } = twoWayBinding({}, aspectScenario.sourceAspect);
                const model = new Model(aspectScenario.originalValue);
                const controller = createController(model, targets);

                behavior.bind(controller);

                expect(aspectScenario.getValue(node)).to.equal(aspectScenario.originalValue);

                aspectScenario.setValue(node, aspectScenario.newValue);
                node.dispatchEvent(new CustomEvent("change"));

                await Updates.next();

                expect(model.value).to.equal(aspectScenario.newValue);
            });

            it(`updates the model when a change event fires for the ${aspectScenario.name} with conversion`, async () => {
                const fromView = value => "fixed value";
                const { behavior, node, targets } = twoWayBinding({ fromView }, aspectScenario.sourceAspect);
                const model = new Model(aspectScenario.originalValue);
                const controller = createController(model, targets);

                behavior.bind(controller);

                expect(aspectScenario.getValue(node)).to.equal(aspectScenario.originalValue);

                aspectScenario.setValue(node, aspectScenario.newValue);
                node.dispatchEvent(new CustomEvent("change"));

                await Updates.next();

                expect(model.value).to.equal("fixed value");
            });

            it(`updates the model when a configured event fires for the ${aspectScenario.name}`, async () => {
                const changeEvent = "foo";
                const { behavior, node, targets } = twoWayBinding({changeEvent}, aspectScenario.sourceAspect);
                const model = new Model(aspectScenario.originalValue);
                const controller = createController(model, targets);

                behavior.bind(controller);

                expect(aspectScenario.getValue(node)).to.equal(aspectScenario.originalValue);

                aspectScenario.setValue(node, aspectScenario.newValue);
                node.dispatchEvent(new CustomEvent(changeEvent));

                await Updates.next();

                expect(model.value).to.equal(aspectScenario.newValue);
            });

            it(`doesn't update the ${aspectScenario.name} after unbind`, async () => {
                const { behavior, node, targets } = twoWayBinding({}, aspectScenario.sourceAspect);
                const model = new Model(aspectScenario.originalValue);
                const controller = createController(model, targets);

                behavior.bind(controller);

                expect(aspectScenario.getValue(node)).to.equal(model.value);

                controller.unbind();
                model.value = aspectScenario.newValue;
                await Updates.next();

                expect(aspectScenario.getValue(node)).to.equal(aspectScenario.originalValue);
            });
        }
    });

    context("when binding events", () => {
        it("does not invoke the method on bind", () => {
            const { behavior, targets } = eventBinding({}, "@my-event");
            const model = new Model("Test value.");
            const controller = createController(model, targets);

            behavior.bind(controller);
            expect(model.actionInvokeCount).to.equal(0);
        });

        it("invokes the method each time the event is raised", () => {
            const { behavior, node, targets } = eventBinding({}, "@my-event");
            const model = new Model("Test value.");
            const controller = createController(model, targets);

            behavior.bind(controller);
            expect(model.actionInvokeCount).to.equal(0);

            node.dispatchEvent(new CustomEvent("my-event"));
            expect(model.actionInvokeCount).to.equal(1);

            node.dispatchEvent(new CustomEvent("my-event"));
            expect(model.actionInvokeCount).to.equal(2);

            node.dispatchEvent(new CustomEvent("my-event"));
            expect(model.actionInvokeCount).to.equal(3);
        });

        it("invokes the method one time for a one time event", () => {
            const { behavior, node, targets } = eventBinding({ once: true }, "@my-event");
            const model = new Model("Test value.");
            const controller = createController(model, targets);

            behavior.bind(controller);
            expect(model.actionInvokeCount).to.equal(0);

            node.dispatchEvent(new CustomEvent("my-event"));
            expect(model.actionInvokeCount).to.equal(1);

            node.dispatchEvent(new CustomEvent("my-event"));
            expect(model.actionInvokeCount).to.equal(1);
        });

        it("does not invoke the method after unbind", () => {
            const { behavior, node, targets } = eventBinding({}, "@my-event");
            const model = new Model("Test value.");
            const controller = createController(model, targets);

            behavior.bind(controller);
            expect(model.actionInvokeCount).to.equal(0);

            node.dispatchEvent(new CustomEvent("my-event"));
            expect(model.actionInvokeCount).to.equal(1);

            controller.unbind();

            node.dispatchEvent(new CustomEvent("my-event"));
            expect(model.actionInvokeCount).to.equal(1);
        });
    });
});
