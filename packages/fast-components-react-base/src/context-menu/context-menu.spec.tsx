import * as React from "react";
import * as ShallowRenderer from "react-test-renderer/shallow";
import * as Adapter from "enzyme-adapter-react-16";
import { configure, mount, shallow } from "enzyme";
import examples from "./examples.data";
import ContextMenu, {
    ContextMenuClassNameContract,
    ContextMenuHandledProps,
    ContextMenuManagedClasses,
    ContextMenuProps,
    ContextMenuUnhandledProps,
} from "./context-menu";
import KeyCodes from "../utilities/keycodes";
import { ContextMenuItemRole } from "../context-menu-item";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

describe("context-menu-item", (): void => {
    test("should have a displayName that matches the component name", () => {
        expect((ContextMenu as any).name).toBe(ContextMenu.displayName);
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<ContextMenu />);
        }).not.toThrow();
    });

    test("should implement unhandledProps", (): void => {
        const unhandledProps: ContextMenuUnhandledProps = {
            "aria-label": "label",
        };

        const rendered: any = shallow(<ContextMenu {...unhandledProps} />);

        expect(rendered.first().prop("aria-label")).toEqual("label");
    });

    test("should not have a focusIndex if no children are focusable", (): void => {
        const rendered: any = mount(
            <ContextMenu>
                <div>hello world</div>
            </ContextMenu>
        );

        expect(rendered.state("focusIndex")).toBe(-1);
    });

    test("should set focusIndex to the first focusable element on mount", (): void => {
        const rendered: any = mount(
            <ContextMenu>
                <div>not a focusable element</div>
                <div role="menuitem">focusable element</div>
            </ContextMenu>
        );

        expect(rendered.state("focusIndex")).toBe(1);
    });

    test("should move focus down when the down arrow is pressed", (): void => {
        const rendered: any = mount(
            <ContextMenu>
                <div role="menuitem">one</div>
                <div role="menuitem">two</div>
            </ContextMenu>
        );

        rendered.childAt(0).simulate("keydown", { keyCode: KeyCodes.ArrowDown });

        expect(rendered.state("focusIndex")).toBe(1);
    });

    test("should move focus down when the right arrow is pressed", (): void => {
        const rendered: any = mount(
            <ContextMenu>
                <div role="menuitem">one</div>
                <div role="menuitem">two</div>
            </ContextMenu>
        );

        rendered.childAt(0).simulate("keydown", { keyCode: KeyCodes.ArrowRight });

        expect(rendered.state("focusIndex")).toBe(1);
    });

    test("should move focus up when the up arrow is pressed", (): void => {
        const rendered: any = mount(
            <ContextMenu>
                <div role="menuitem">one</div>
                <div role="menuitem">two</div>
            </ContextMenu>
        );

        rendered.setState({ focusIndex: 1 });

        rendered.childAt(0).simulate("keydown", { keyCode: KeyCodes.ArrowUp });

        expect(rendered.state("focusIndex")).toBe(0);
    });

    test("should move focus up when the left arrow is pressed", (): void => {
        const rendered: any = mount(
            <ContextMenu>
                <div role="menuitem">one</div>
                <div role="menuitem">two</div>
            </ContextMenu>
        );

        rendered.setState({ focusIndex: 1 });

        rendered.childAt(0).simulate("keydown", { keyCode: KeyCodes.ArrowUp });

        expect(rendered.state("focusIndex")).toBe(0);
    });

    test("should move focus the last focusable element when the end key is pressed", (): void => {
        const rendered: any = mount(
            <ContextMenu>
                <div role="menuitem">one</div>
                <div role="menuitem">two</div>
                <div role="menuitem">three</div>
                <div>four</div>
            </ContextMenu>
        );

        rendered.childAt(0).simulate("keydown", { keyCode: KeyCodes.End });

        expect(rendered.state("focusIndex")).toBe(2);
    });

    test("should move focus the first focusable element when the home key is pressed", (): void => {
        const rendered: any = mount(
            <ContextMenu>
                <div>one</div>
                <div role="menuitem">two</div>
                <div role="menuitem">three</div>
                <div role="menuitem">four</div>
            </ContextMenu>
        );

        rendered.setState({ focusIndex: 3 });

        rendered.childAt(0).simulate("keydown", { keyCode: KeyCodes.Home });

        expect(rendered.state("focusIndex")).toBe(1);
    });

    test("should place focus any child with the proper role", (): void => {
        const children: React.ReactNode[] = Object.keys(ContextMenuItemRole).map(
            (key: string): React.ReactNode => {
                return (
                    <div role={key} key={key}>
                        {key}
                    </div>
                );
            }
        );

        const rendered: any = mount(<ContextMenu>{children}</ContextMenu>);

        expect(rendered.state("focusIndex")).toBe(0);

        rendered.childAt(0).simulate("keydown", { keyCode: KeyCodes.ArrowDown });
        expect(rendered.state("focusIndex")).toBe(1);

        rendered.childAt(0).simulate("keydown", { keyCode: KeyCodes.ArrowDown });
        expect(rendered.state("focusIndex")).toBe(2);
    });

    test("should not place focus any child without a the proper role", (): void => {
        const rendered: any = mount(
            <ContextMenu>
                <div />
                <div role="menuitem">two</div>
                <div />
                <div role="menuitem">three</div>
                <div />
                <div role="menuitem">four</div>
                <div />
            </ContextMenu>
        );

        expect(rendered.state("focusIndex")).toBe(1);

        rendered.childAt(0).simulate("keydown", { keyCode: KeyCodes.ArrowDown });
        expect(rendered.state("focusIndex")).toBe(3);

        rendered.childAt(0).simulate("keydown", { keyCode: KeyCodes.ArrowDown });
        expect(rendered.state("focusIndex")).toBe(5);
    });
});
