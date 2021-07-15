var __awaiter =
    (this && this.__awaiter) ||
    function (thisArg, _arguments, P, generator) {
        function adopt(value) {
            return value instanceof P
                ? value
                : new P(function (resolve) {
                      resolve(value);
                  });
        }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) {
                try {
                    step(generator.next(value));
                } catch (e) {
                    reject(e);
                }
            }
            function rejected(value) {
                try {
                    step(generator["throw"](value));
                } catch (e) {
                    reject(e);
                }
            }
            function step(result) {
                result.done
                    ? resolve(result.value)
                    : adopt(result.value).then(fulfilled, rejected);
            }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    };
import { assert, expect } from "chai";
import { Checkbox, checkboxTemplate as template } from "./index";
import { fixture } from "../test-utilities/fixture";
import { DOM } from "@microsoft/fast-element";
import { KeyCodes } from "@microsoft/fast-web-utilities";
const FASTCheckbox = Checkbox.compose({
    baseName: "checkbox",
    template,
});
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        const { connect, disconnect, element, parent } = yield fixture(FASTCheckbox());
        return { connect, disconnect, element, parent };
    });
}
describe("Checkbox", () => {
    it("should have a role of `checkbox`", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            yield connect();
            expect(element.getAttribute("role")).to.equal("checkbox");
            yield disconnect();
        }));
    it("should set the `aria-checked` attribute equal to the `checked` value", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            element.checked = true;
            yield connect();
            expect(element.getAttribute("aria-checked")).to.equal("true");
            element.checked = false;
            yield DOM.nextUpdate();
            expect(element.getAttribute("aria-checked")).to.equal("false");
            yield disconnect();
        }));
    it("should add a class of `checked` when checked is true", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            element.checked = true;
            yield connect();
            expect(element.classList.contains("checked")).to.equal(true);
            yield disconnect();
        }));
    it("should set a default `aria-checked` value when `checked` is not defined", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            yield connect();
            expect(element.getAttribute("aria-checked")).to.equal("false");
            yield disconnect();
        }));
    it("should set the `aria-required` attribute equal to the `required` value", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            element.required = true;
            yield connect();
            expect(element.getAttribute("aria-required")).to.equal("true");
            element.required = false;
            yield DOM.nextUpdate();
            expect(element.getAttribute("aria-required")).to.equal("false");
            yield disconnect();
        }));
    it("should set a default `aria-required` value when `required` is not defined", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            yield connect();
            expect(element.getAttribute("aria-required")).to.equal("false");
            yield disconnect();
        }));
    it("should set the `aria-disabled` attribute equal to the `disabled` value", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            element.disabled = true;
            yield connect();
            expect(element.getAttribute("aria-disabled")).to.equal("true");
            element.disabled = false;
            yield DOM.nextUpdate();
            expect(element.getAttribute("aria-disabled")).to.equal("false");
            yield disconnect();
        }));
    it("should set a default `aria-disabled` value when `disabled` is not defined", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            yield connect();
            expect(element.getAttribute("aria-disabled")).to.equal("false");
            yield disconnect();
        }));
    it("should set the `aria-readonly` attribute equal to the `readonly` value", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            element.readOnly = true;
            yield connect();
            expect(element.getAttribute("aria-readonly")).to.equal("true");
            element.readOnly = false;
            yield DOM.nextUpdate();
            expect(element.getAttribute("aria-readonly")).to.equal("false");
            yield disconnect();
        }));
    it("should NOT set a default `aria-readonly` value when `readonly` is not defined", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            yield connect();
            expect(element.getAttribute("aria-readonly")).to.equal(null);
            yield disconnect();
        }));
    it("should add a class of `readonly` when readonly is true", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            element.readOnly = true;
            yield connect();
            expect(element.classList.contains("readonly")).to.equal(true);
            yield disconnect();
        }));
    it("should set a tabindex of 0 on the element", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            yield connect();
            expect(element.getAttribute("tabindex")).to.equal("0");
            yield disconnect();
        }));
    it("should NOT set a tabindex when disabled is `true`", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            element.disabled = true;
            yield connect();
            expect(element.hasAttribute("tabindex")).to.equal(false);
            expect(element.getAttribute("tabindex")).to.equal(null);
            yield disconnect();
        }));
    it("should add a class of `indeterminate` when indeterminate is true", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            element.indeterminate = true;
            yield connect();
            expect(element.classList.contains("indeterminate")).to.equal(true);
            yield disconnect();
        }));
    it("should initialize to the initial value if no value property is set", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            yield connect();
            expect(element.value).to.equal(element["initialValue"]);
            yield disconnect();
        }));
    it("should initialize to the provided value attribute if set pre-connection", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            element.setAttribute("value", "foobar");
            yield connect();
            expect(element.value).to.equal("foobar");
            yield disconnect();
        }));
    it("should initialize to the provided value attribute if set post-connection", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            yield connect();
            element.setAttribute("value", "foobar");
            expect(element.value).to.equal("foobar");
            yield disconnect();
        }));
    it("should initialize to the provided value property if set pre-connection", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            element.value = "foobar";
            yield connect();
            expect(element.value).to.equal("foobar");
            yield disconnect();
        }));
    describe("label", () => {
        it("should add a class of `label` to the internal label when default slotted content exists", () =>
            __awaiter(void 0, void 0, void 0, function* () {
                var _a, _b;
                const { element, connect, disconnect } = yield setup();
                const label = document.createElement("span");
                element.appendChild(label);
                yield connect();
                expect(
                    (_b =
                        (_a = element.shadowRoot) === null || _a === void 0
                            ? void 0
                            : _a.querySelector("label")) === null || _b === void 0
                        ? void 0
                        : _b.classList.contains("label")
                ).to.equal(true);
                yield disconnect();
            }));
        it("should add classes of `label` and `label__hidden` to the internal label when default slotted content exists", () =>
            __awaiter(void 0, void 0, void 0, function* () {
                var _c, _d, _e, _f;
                const { element, connect, disconnect } = yield setup();
                yield connect();
                expect(
                    (_d =
                        (_c = element.shadowRoot) === null || _c === void 0
                            ? void 0
                            : _c.querySelector("label")) === null || _d === void 0
                        ? void 0
                        : _d.classList.contains("label")
                ).to.equal(true);
                expect(
                    (_f =
                        (_e = element.shadowRoot) === null || _e === void 0
                            ? void 0
                            : _e.querySelector("label")) === null || _f === void 0
                        ? void 0
                        : _f.classList.contains("label__hidden")
                ).to.equal(true);
                yield disconnect();
            }));
    });
    describe("events", () => {
        it("should fire an event on click", () =>
            __awaiter(void 0, void 0, void 0, function* () {
                const { element, connect, disconnect } = yield setup();
                yield connect();
                const wasClicked = yield new Promise(resolve => {
                    element.addEventListener("click", () => resolve(true));
                    element.click();
                    DOM.queueUpdate(() => resolve(false));
                });
                expect(wasClicked).to.equal(true);
                yield disconnect();
            }));
        it("should fire an event when spacebar is invoked", () =>
            __awaiter(void 0, void 0, void 0, function* () {
                const { element, connect, disconnect } = yield setup();
                const event = new KeyboardEvent("keydown", {
                    key: "space",
                    keyCode: KeyCodes.space,
                });
                yield connect();
                const wasInvoked = yield new Promise(resolve => {
                    element.addEventListener("keydown", () => resolve(true));
                    element.dispatchEvent(event);
                    // Resolve false on the next update in case the event hasn't happened
                    DOM.queueUpdate(() => resolve(false));
                });
                expect(wasInvoked).to.equal(true);
                yield disconnect();
            }));
    });
    describe("that is required", () => {
        it("should be invalid when unchecked", () =>
            __awaiter(void 0, void 0, void 0, function* () {
                const { element, connect, disconnect } = yield setup();
                yield connect();
                element.required = true;
                element.checked = false;
                expect(element.validity.valueMissing).to.equal(true);
                yield disconnect();
            }));
        it("should be valid when checked", () =>
            __awaiter(void 0, void 0, void 0, function* () {
                const { element, connect, disconnect } = yield setup();
                yield connect();
                element.required = true;
                element.checked = true;
                expect(element.validity.valueMissing).to.equal(false);
                yield disconnect();
            }));
    });
    describe("whose parent form has its reset() method invoked", () => {
        it("should set its checked property to false if the checked attribute is unset", () =>
            __awaiter(void 0, void 0, void 0, function* () {
                const { connect, disconnect, element, parent } = yield setup();
                const form = document.createElement("form");
                form.appendChild(element);
                parent.appendChild(form);
                yield connect();
                element.checked = true;
                assert.isNull(element.getAttribute("checked"));
                assert.isTrue(element.checked);
                form.reset();
                assert.isFalse(!!element.checked);
                yield disconnect();
            }));
        it("should set its checked property to true if the checked attribute is set", () =>
            __awaiter(void 0, void 0, void 0, function* () {
                const { connect, disconnect, element, parent } = yield setup();
                const form = document.createElement("form");
                form.appendChild(element);
                parent.appendChild(form);
                yield connect();
                element.setAttribute("checked", "");
                assert(element.getAttribute("checked") === "");
                assert(element.checked);
                element.checked = false;
                assert(!element.checked);
                form.reset();
                assert(element.checked);
                yield disconnect();
            }));
        it("should put the control into a clean state, where checked attribute changes change the checked property prior to user or programmatic interaction", () =>
            __awaiter(void 0, void 0, void 0, function* () {
                const { element, connect, disconnect, parent } = yield setup();
                const form = document.createElement("form");
                form.appendChild(element);
                parent.appendChild(form);
                yield connect();
                element.checked = true;
                element.removeAttribute("checked");
                assert(element.checked);
                form.reset();
                assert(!element.checked);
                element.setAttribute("checked", "");
                assert(element.value);
                yield disconnect();
            }));
    });
});
