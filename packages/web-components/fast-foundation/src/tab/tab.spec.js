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
import { expect } from "chai";
import { Tab, tabTemplate as template } from "./index";
import { fixture } from "../test-utilities/fixture";
const FASTTab = Tab.compose({
    baseName: "tab",
    template,
});
function setup() {
    return __awaiter(this, void 0, void 0, function* () {
        const { element, connect, disconnect } = yield fixture(FASTTab());
        return { element, connect, disconnect };
    });
}
describe("Tab", () => {
    it("should have a role of `tab`", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            yield connect();
            expect(element.getAttribute("role")).to.equal("tab");
            yield disconnect();
        }));
    it("should have a slot attribute of `tab`", () =>
        __awaiter(void 0, void 0, void 0, function* () {
            const { element, connect, disconnect } = yield setup();
            yield connect();
            expect(element.getAttribute("slot")).to.equal("tab");
            yield disconnect();
        }));
});
