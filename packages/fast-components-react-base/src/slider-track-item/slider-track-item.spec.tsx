import React from "react";
import Adapter from "enzyme-adapter-react-16";
import { configure, mount, shallow } from "enzyme";
import SliderTrackItem, {
    SliderTrackItemAnchor,
    SliderTrackItemHandledProps,
    SliderTrackItemProps,
    SliderTrackItemUnhandledProps,
} from "./slider-track-item";
import {
    SliderContext,
    SliderMode,
    SliderOrientation,
    SliderRange,
    SliderThumb,
} from "../slider";
import { DisplayNamePrefix } from "../utilities";
import { number } from "prop-types";
import { SliderState } from "../slider/slider";

/*
 * Configure Enzyme
 */
configure({ adapter: new Adapter() });

describe("slider track item", (): void => {
    const defaultSliderState: SliderState = {
        dragValue: -1,
        upperValue: 100,
        lowerValue: 0,
        activeThumb: null,
        isDragging: false,
        isIncrementing: false,
        incrementDirection: 1,
    };

    test("should have a displayName that matches the component name", () => {
        expect(`${DisplayNamePrefix}${(SliderTrackItem as any).name}`).toBe(
            SliderTrackItem.displayName
        );
    });

    test("should not throw if managedClasses are not provided", () => {
        expect(() => {
            shallow(<SliderTrackItem />);
        }).not.toThrow();
    });

    test("should implement unhandledProps", (): void => {
        const unhandledProps: SliderTrackItemUnhandledProps = {
            "aria-label": "label",
        };

        const rendered: any = shallow(<SliderTrackItem {...unhandledProps} />);

        expect(rendered.first().prop("aria-label")).toEqual("label");
    });

    test("totalRangeMax and totalRangeMin bindings don't call getValueAsPercent", (): void => {
        const container: HTMLDivElement = document.createElement("div");
        document.body.appendChild(container);
        const getValueAsPercent: any = jest.fn();

        const rendered: any = mount(
            <SliderContext.Provider
                value={{
                    sliderOrientation: SliderOrientation.horizontal,
                    sliderMode: SliderMode.singleValue,
                    sliderState: defaultSliderState,
                    sliderConstrainedRange: undefined,
                    sliderValueAsPercent: getValueAsPercent,
                    sliderDirection: "ltr",
                }}
            >
                <SliderTrackItem
                    maxValuePositionBinding={SliderTrackItemAnchor.totalRangeMax}
                    minValuePositionBinding={SliderTrackItemAnchor.totalRangeMin}
                />
            </SliderContext.Provider>,
            { attachTo: container }
        );

        expect(getValueAsPercent).toHaveBeenCalledTimes(0);
        document.body.removeChild(container);
    });

    test("numeric bindings call getValueAsPercent", (): void => {
        const container: HTMLDivElement = document.createElement("div");
        document.body.appendChild(container);
        const getValueAsPercent: any = jest.fn();
        getValueAsPercent.mockReturnValueOnce(90);
        getValueAsPercent.mockReturnValueOnce(10);

        const rendered: any = mount(
            <SliderContext.Provider
                value={{
                    sliderOrientation: SliderOrientation.horizontal,
                    sliderMode: SliderMode.singleValue,
                    sliderState: defaultSliderState,
                    sliderConstrainedRange: undefined,
                    sliderValueAsPercent: getValueAsPercent,
                    sliderDirection: "ltr",
                }}
            >
                <SliderTrackItem
                    id="trackItem"
                    maxValuePositionBinding={90}
                    minValuePositionBinding={10}
                />
            </SliderContext.Provider>,
            { attachTo: container }
        );

        expect(getValueAsPercent).toHaveBeenCalledTimes(2);
        document.body.removeChild(container);
    });

    test("selectedRangeMax and selectedRangeMin bindings don't call getValueAsPercent", (): void => {
        const container: HTMLDivElement = document.createElement("div");
        document.body.appendChild(container);
        const getValueAsPercent: any = jest.fn();

        const rendered: any = mount(
            <SliderContext.Provider
                value={{
                    sliderOrientation: SliderOrientation.horizontal,
                    sliderMode: SliderMode.singleValue,
                    sliderState: defaultSliderState,
                    sliderConstrainedRange: undefined,
                    sliderValueAsPercent: getValueAsPercent,
                    sliderDirection: "ltr",
                }}
            >
                <SliderTrackItem
                    maxValuePositionBinding={SliderTrackItemAnchor.selectedRangeMax}
                    minValuePositionBinding={SliderTrackItemAnchor.selectedRangeMin}
                />
            </SliderContext.Provider>,
            { attachTo: container }
        );

        expect(getValueAsPercent).toHaveBeenCalledTimes(2);
        document.body.removeChild(container);
    });
});
