import * as React from "react";
import * as Adapter from "enzyme-adapter-react-16";
import { configure, mount, shallow } from "enzyme";
import { ListboxItemClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import MSFTListboxItem from "./listbox-item";
import {
    ListboxItem,
    ListboxItemHandledProps,
    ListboxItemProps,
    ListboxItemUnhandledProps,
} from "./index";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

describe("listbox menu item", (): void => {
    test("should have a displayName that matches the component name", () => {
        expect((MSFTListboxItem as any).name).toBe(MSFTListboxItem.displayName);
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<MSFTListboxItem value="test" id="test" />);
        }).not.toThrow();
    });

    test("should accept unhandledProps", () => {
        const unhandledProps: ListboxItemUnhandledProps = {
            "aria-hidden": true,
        };

        const rendered: any = mount(
            <ListboxItem {...unhandledProps} value="test" id="test" />
        );

        expect(rendered.find("div").prop("aria-hidden")).toEqual(true);
    });

    test("should not throw if glyph prop is not provided", () => {
        expect(() => {
            shallow(<ListboxItem value="test" id="test" glyph={null} />);
        }).not.toThrow();
    });

    test("should create glyph element passed in", () => {
        const props: ListboxItemHandledProps = {
            value: "test",
            id: "test",
            glyph: (className?: string): React.ReactNode => {
                return <div>X</div>;
            },
        };

        const rendered: any = mount(<ListboxItem {...props} />);

        expect(rendered.contains(<div>X</div>)).toEqual(true);
    });
});
