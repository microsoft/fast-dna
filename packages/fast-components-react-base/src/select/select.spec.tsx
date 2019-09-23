import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount, render, shallow } from "enzyme";
import Select, { SelectClassNameContract, SelectUnhandledProps } from "./select";
import ListboxItem from "../listbox-item";
import {
    keyCodeArrowDown,
    keyCodeArrowUp,
    keyCodeSpace,
} from "@microsoft/fast-web-utilities";
import { DisplayNamePrefix } from "../utilities";
import {
    AxisPositioningMode,
    ViewportPositionerVerticalPosition,
} from "../viewport-positioner";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

const itemA: JSX.Element = <ListboxItem id="a" value="a" displayString="a" />;
const itemADisabled: JSX.Element = (
    <ListboxItem id="a" value="a" displayString="a" disabled={true} />
);
const itemB: JSX.Element = <ListboxItem id="b" value="b" displayString="ab" />;
const itemC: JSX.Element = <ListboxItem id="c" value="c" displayString="abc" />;

const managedClasses: SelectClassNameContract = {
    select: "select",
    select__disabled: "select__disabled",
    select_menu: "elect_menu",
    select_menu__open: "select_menu__open",
    select__multiSelectable: "select__multiSelectable",
    select_viewportPositioner: "select_viewportPositioner",
    select_viewportPositioner__left: "select_viewportPositioner__left",
    select_viewportPositioner__right: "select_viewportPositioner__right",
    select_viewportPositioner__top: "select_viewportPositioner__top",
    select_viewportPositioner__bottom: "select_viewportPositioner__bottom",
    select_viewportPositioner__horizontalInset:
        "select_viewportPositioner__horizontalInset",
    select_viewportPositioner__verticalInset: "select_viewportPositioner__verticalInset",
};

const container: HTMLDivElement = document.createElement("div");
document.body.appendChild(container);

describe("select", (): void => {
    test("should have a displayName that matches the component name", () => {
        expect(`${DisplayNamePrefix}${(Select as any).name}`).toBe(Select.displayName);
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<Select />);
        }).not.toThrow();
    });

    test("should implement unhandledProps", (): void => {
        const unhandledProps: SelectUnhandledProps = {
            "aria-label": "label",
        };

        const rendered: any = shallow(<Select {...unhandledProps} />);

        expect(rendered.first().prop("aria-label")).toEqual("label");
    });

    test("no items should be selected by default", (): void => {
        const rendered: any = mount(
            <Select>
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );

        expect(rendered.state("selectedItems").length).toBe(0);
    });

    test("default select aria tags are set correctly", (): void => {
        const rendered: any = shallow(
            <Select labelledBy="test-labelledBy">
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );
        expect(rendered.first().prop("role")).toEqual("listbox");
        expect(rendered.first().prop("aria-labelledby")).toEqual("test-labelledBy");
        expect(rendered.first().prop("aria-describedby")).toContain("selecttrigger-");
        expect(rendered.first().prop("aria-expanded")).toEqual(false);
        expect(rendered.first().prop("aria-disabled")).toEqual(false);
    });

    test("default trigger aria tags are set correctly", (): void => {
        const rendered: any = mount(
            <Select selectedItems={["a"]}>
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );

        const trigger: any = rendered.find("button");
        expect(trigger.prop("role")).toEqual("option");
        expect(trigger.prop("aria-expanded")).toEqual(false);
        expect(trigger.prop("aria-atomic")).toEqual(true);
        expect(trigger.prop("aria-label")).toEqual("a");
        expect(trigger.prop("aria-expanded")).toEqual(false);
        expect(trigger.prop("aria-selected")).toEqual(true);
        expect(trigger.prop("aria-posinset")).toEqual(1);
        expect(trigger.prop("aria-setsize")).toEqual(3);
    });

    test("menu should open and close on select click in single mode and aria-expanded is set properly", (): void => {
        const rendered: any = mount(
            <Select>
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );

        expect(rendered.state("selectedItems").length).toBe(0);
        expect(rendered.state("isMenuOpen")).toBe(false);
        expect(rendered.find("button").prop("aria-expanded")).toEqual(false);
        rendered.simulate("click");
        expect(rendered.state("isMenuOpen")).toBe(true);
        expect(rendered.find("button").prop("aria-expanded")).toEqual(true);

        rendered.find('[displayString="a"]').simulate("click");
        expect(rendered.state("isMenuOpen")).toBe(false);
        expect(rendered.state("selectedItems").length).toBe(1);
        expect(rendered.find("button").prop("aria-expanded")).toEqual(false);
    });

    test("menu should be open by default in multi mode and should remain so during selection", (): void => {
        const rendered: any = mount(
            <Select multiselectable={true}>
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );
        expect(rendered.state("isMenuOpen")).toBe(true);
        expect(rendered.state("selectedItems").length).toBe(0);
        rendered.find('[displayString="a"]').simulate("click");
        expect(rendered.state("isMenuOpen")).toBe(true);
        expect(rendered.state("selectedItems").length).toBe(1);
    });

    test("onValueChange callback function is called and value changes when selection changes", (): void => {
        const onValueChange: any = jest.fn();
        const rendered: any = mount(
            <Select onValueChange={onValueChange} defaultSelection={["b"]}>
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );

        expect(rendered.state("selectedItems").length).toBe(1);
        expect(onValueChange).toHaveBeenCalledTimes(0);

        rendered.simulate("click");
        expect(rendered.state("isMenuOpen")).toBe(true);

        rendered
            .find('[displayString="a"]')
            .simulate("keydown", { keyCode: keyCodeSpace });
        expect(rendered.state("selectedItems").length).toBe(1);
        expect(rendered.state("value")).toBe("a");
        expect(onValueChange).toHaveBeenCalledTimes(1);
    });

    test("onValueChange callback function is called and value does not change when selection changes in controlled mode", (): void => {
        const onValueChange: any = jest.fn();
        const rendered: any = mount(
            <Select onValueChange={onValueChange} selectedItems={["b"]}>
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );

        expect(rendered.state("selectedItems").length).toBe(1);
        expect(onValueChange).toHaveBeenCalledTimes(0);

        rendered.simulate("click");
        expect(rendered.state("isMenuOpen")).toBe(true);

        rendered
            .find('[displayString="a"]')
            .simulate("keydown", { keyCode: keyCodeSpace });
        expect(rendered.state("selectedItems").length).toBe(1);
        expect(rendered.state("value")).toBe("b");
        expect(onValueChange).toHaveBeenCalledTimes(1);
    });

    test("onValueChange callback function is not called when selected item is reselected", (): void => {
        const onValueChange: any = jest.fn();
        const rendered: any = mount(
            <Select
                onValueChange={onValueChange}
                defaultSelection={["a"]}
                isMenuOpen={true}
            >
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );

        expect(rendered.state("selectedItems").length).toBe(1);
        expect(onValueChange).toHaveBeenCalledTimes(0);

        rendered
            .find('[displayString="ab"]')
            .simulate("keydown", { keyCode: keyCodeSpace });
        expect(rendered.state("selectedItems").length).toBe(1);
        expect(onValueChange).toHaveBeenCalledTimes(1);

        rendered
            .find('[displayString="ab"]')
            .simulate("keydown", { keyCode: keyCodeSpace });
        expect(rendered.state("selectedItems").length).toBe(1);
        expect(onValueChange).toHaveBeenCalledTimes(1);
    });

    test("onMenuSelectionChange callback function is called when menu focus changes", (): void => {
        const onMenuSelectionChange: any = jest.fn();
        const rendered: any = mount(
            <Select
                onMenuSelectionChange={onMenuSelectionChange}
                defaultSelection={["a"]}
                isMenuOpen={true}
            >
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );

        expect(rendered.state("selectedItems").length).toBe(1);
        expect(onMenuSelectionChange).toHaveBeenCalledTimes(0);

        rendered
            .find('[displayString="a"]')
            .simulate("keydown", { keyCode: keyCodeSpace });
        expect(onMenuSelectionChange).toHaveBeenCalledTimes(0);

        rendered
            .find('[displayString="ab"]')
            .simulate("keydown", { keyCode: keyCodeSpace });
        expect(onMenuSelectionChange).toHaveBeenCalledTimes(1);

        rendered
            .find('[displayString="a"]')
            .simulate("keydown", { keyCode: keyCodeSpace });
        expect(onMenuSelectionChange).toHaveBeenCalledTimes(2);
    });

    test("Arrow keys should increment selection without opening menu in single select mode", (): void => {
        const rendered: any = mount(
            <Select>
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );

        expect(rendered.state("selectedItems").length).toBe(0);

        rendered.simulate("keydown", { keyCode: keyCodeArrowDown });

        expect(rendered.state("selectedItems").length).toBe(1);
        expect(rendered.state("selectedItems")[0].id).toBe("a");
        expect(rendered.state("isMenuOpen")).toBe(false);

        rendered.simulate("keydown", { keyCode: keyCodeArrowDown });

        expect(rendered.state("selectedItems").length).toBe(1);
        expect(rendered.state("selectedItems")[0].id).toBe("b");
        expect(rendered.state("isMenuOpen")).toBe(false);

        rendered.simulate("keydown", { keyCode: keyCodeArrowDown });
        expect(rendered.state("selectedItems").length).toBe(1);
        expect(rendered.state("selectedItems")[0].id).toBe("c");
        expect(rendered.state("isMenuOpen")).toBe(false);

        rendered.simulate("keydown", { keyCode: keyCodeArrowUp });

        expect(rendered.state("selectedItems").length).toBe(1);
        expect(rendered.state("selectedItems")[0].id).toBe("b");
        expect(rendered.state("isMenuOpen")).toBe(false);

        rendered.simulate("keydown", { keyCode: keyCodeArrowUp });

        expect(rendered.state("selectedItems").length).toBe(1);
        expect(rendered.state("selectedItems")[0].id).toBe("a");
        expect(rendered.state("isMenuOpen")).toBe(false);
    });

    test("Arrow up with no selection opens menu and select last item in single select mode", (): void => {
        const rendered: any = mount(
            <Select>
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );

        expect(rendered.state("selectedItems").length).toBe(0);
        expect(rendered.state("isMenuOpen")).toBe(false);

        rendered.simulate("keydown", { keyCode: keyCodeArrowUp });
        expect(rendered.state("isMenuOpen")).toBe(false);
        expect(rendered.state("selectedItems").length).toBe(1);
        expect(rendered.state("selectedItems")[0].id).toBe("c");
    });

    test("Default displaystring and value strings are correct", (): void => {
        const rendered: any = mount(
            <Select multiselectable={true} name="test">
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );

        expect(rendered.state("displayString")).toBe("");
        expect(rendered.state("value")).toEqual([]);

        rendered
            .find('[displayString="a"]')
            .simulate("keydown", { keyCode: keyCodeSpace });

        expect(rendered.state("displayString")).toBe("a");
        expect(rendered.state("value")).toEqual(["a"]);

        rendered
            .find('[displayString="a"]')
            .simulate("keydown", { keyCode: keyCodeArrowDown, shiftKey: true });

        expect(rendered.state("displayString")).toBe("a, ab");
        expect(rendered.state("value")).toEqual(["a", "b"]);
    });

    test("Custom display formatter is called", (): void => {
        const displayFormatter: any = jest.fn();
        displayFormatter.mockReturnValue("formatted display");
        const rendered: any = mount(
            <Select displayStringFormatter={displayFormatter}>
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );

        expect(displayFormatter).toHaveBeenCalledTimes(1);

        rendered.simulate("keydown", { keyCode: keyCodeArrowUp });
        expect(displayFormatter).toHaveBeenCalledTimes(2);
    });

    test("Custom trigger render function is called", (): void => {
        const triggerRenderFn: any = jest.fn();
        triggerRenderFn.mockReturnValue("Test");
        const rendered: any = mount(
            <Select trigger={triggerRenderFn}>
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );
        expect(triggerRenderFn).toHaveBeenCalledTimes(1);
    });

    test("Custom menu render function is called", (): void => {
        const menuRenderFn: jest.Mock = jest.fn();
        menuRenderFn.mockReturnValue("Test");
        const rendered: any = mount(
            <Select menu={menuRenderFn}>
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );

        expect(rendered.state("isMenuOpen")).toBe(false);
        expect(menuRenderFn).toHaveBeenCalledTimes(0);
        rendered.simulate("click");
        expect(rendered.state("isMenuOpen")).toBe(true);
        expect(menuRenderFn).toHaveBeenCalledTimes(1);
    });

    test("Hidden select element exists and it's value and props are populated", (): void => {
        const rendered: any = mount(
            <Select
                multiselectable={true}
                name="testName"
                form="testForm"
                required={true}
            >
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );

        const select: any = rendered.find("select");
        expect(select.prop("value")).toEqual([]);
        expect(select.prop("multiple")).toBe(true);
        expect(select.prop("required")).toBe(true);
        expect(select.prop("name")).toBe("testName");
        expect(select.prop("form")).toBe("testForm");

        rendered
            .find('[displayString="a"]')
            .simulate("keydown", { keyCode: keyCodeSpace });
        expect(rendered.find("select").prop("value")).toEqual(["a"]);

        rendered
            .find('[displayString="a"]')
            .simulate("keydown", { keyCode: keyCodeArrowDown, shiftKey: true });
        expect(rendered.find("select").prop("value")).toEqual(["a", "b"]);
    });

    test("IsMenuOpen prop set to false overrides default behavior in single select mode", (): void => {
        const rendered: any = mount(
            <Select isMenuOpen={false}>
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );

        rendered.simulate("click");
        expect(rendered.state("isMenuOpen")).toBe(false);
    });

    test("IsMenuOpen prop set to true overrides default behavior in single select mode", (): void => {
        const rendered: any = mount(
            <Select isMenuOpen={true}>
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );

        expect(rendered.state("isMenuOpen")).toBe(true);
    });

    test("IsMenuOpen prop set to false overrides default behavior in multiple select mode", (): void => {
        const rendered: any = mount(
            <Select isMenuOpen={false} multiselectable={true}>
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );

        expect(rendered.state("isMenuOpen")).toBe(false);
    });

    test("Default menuFlyoutConfig leaves both axis uncontrolled and is applied", (): void => {
        const rendered: any = mount(
            <Select isMenuOpen={true} managedClasses={managedClasses}>
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );

        const positioner: any = rendered.find("BaseViewportPositioner");
        expect(positioner.prop("horizontalPositioningMode")).toBe(
            AxisPositioningMode.uncontrolled
        );
        expect(positioner.prop("verticalPositioningMode")).toBe(
            AxisPositioningMode.uncontrolled
        );
    });

    test("Custom menuFlyoutConfig is applied to positioner", (): void => {
        const rendered: any = mount(
            <Select
                isMenuOpen={true}
                menuFlyoutConfig={{
                    horizontalPositioningMode: AxisPositioningMode.inset,
                    verticalPositioningMode: AxisPositioningMode.inset,
                }}
                managedClasses={managedClasses}
            >
                {itemA}
                {itemB}
                {itemC}
            </Select>
        );

        const positioner: any = rendered.find("BaseViewportPositioner");
        expect(positioner.prop("horizontalPositioningMode")).toBe(
            AxisPositioningMode.inset
        );
        expect(positioner.prop("verticalPositioningMode")).toBe(
            AxisPositioningMode.inset
        );
    });
});
