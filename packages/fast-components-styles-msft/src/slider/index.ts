import { SliderClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { ComponentStyles } from "@microsoft/fast-jss-manager";
import {
    add,
    applyFocusVisible,
    divide,
    format,
    multiply,
    toPx,
} from "@microsoft/fast-jss-utilities";
import { DesignSystem, DesignSystemResolver } from "../design-system";
import { applyCornerRadius } from "../utilities/border";
import {
    neutralFocus,
    neutralForegroundActive,
    neutralForegroundHint,
    neutralForegroundHover,
    neutralForegroundRest,
    neutralOutlineRest,
} from "../utilities/color";
import { applyCursorPointer } from "../utilities/cursor";
import { heightNumber } from "../utilities/density";
import {
    backgroundColor,
    designUnit,
    focusOutlineWidth,
} from "../utilities/design-system";
import { applyDisabledState } from "../utilities/disabled";
import { applyElevation, ElevationMultiplier } from "../utilities/elevation";
import {
    highContrastBackground,
    highContrastDisabledBackground,
    highContrastHighlightBackground,
    highContrastSelector,
} from "../utilities/high-contrast";

const thumbSizeValue: DesignSystemResolver<number> = add(
    divide(heightNumber(), 2),
    designUnit
);
const thumbSize: DesignSystemResolver<string> = toPx(thumbSizeValue);
const halfThumbSize: DesignSystemResolver<string> = toPx(divide(thumbSizeValue, 2));
const trackOffset: DesignSystemResolver<string> = toPx(divide(heightNumber(), 4));
const trackOverhang: DesignSystemResolver<string> = toPx(
    multiply(divide(designUnit, 2), -1)
);
const minSize: string = "50px";

const styles: ComponentStyles<SliderClassNameContract, DesignSystem> = {
    slider: {
        display: "inline-grid",
        ...applyCursorPointer(),
    },
    slider_layoutRegion: {
        display: "grid",
    },
    slider_thumb: {
        height: thumbSize,
        width: thumbSize,
        border: "none",
        background: neutralForegroundRest,
        "border-radius": "50%",
        transition: "all 0.2s ease",
        ...applyElevation(ElevationMultiplier.e4),
        ...applyFocusVisible<DesignSystem>({
            "box-shadow": format(
                `0 0 0 2px {0}, 0 0 0 {2} {1}`,
                backgroundColor,
                neutralFocus,
                toPx(add(focusOutlineWidth, 2))
            ),
            [highContrastSelector]: {
                "box-shadow": format(
                    `0 0 0 2px Background, 0 0 0 {0} ButtonText`,
                    toPx(add(focusOutlineWidth, 2))
                ),
            },
        }),
        "&:hover": {
            background: neutralForegroundHover,
        },
        "&:active": {
            background: neutralForegroundActive,
        },
        [highContrastSelector]: {
            background: "ButtonText",
            "&:hover, &:active": {
                background: "Highlight",
            },
        },
    },
    slider_thumb__lowerValue: {},
    slider_thumb__upperValue: {},
    slider_track: {},
    slider_backgroundTrack: {
        ...applyCornerRadius(),
        background: neutralOutlineRest,
        ...highContrastBackground,
    },
    slider_foregroundTrack: {
        ...applyCornerRadius(),
        background: neutralForegroundHint,
        transition: "all 0.2s ease",
        ...highContrastHighlightBackground,
    },
    slider__disabled: {
        ...applyDisabledState(),
        "& $slider_thumb, & $slider_backgroundTrack": {
            ...highContrastDisabledBackground,
            "&:hover": {
                background: neutralForegroundRest,
            },
            "&:active": {
                background: neutralForegroundRest,
            },
        },
    },
    slider__dragging: {
        "& $slider_thumb": {
            transition: "none",
        },
        "& $slider_foregroundTrack": {
            transition: "none",
        },
    },
    slider__touchDragging: {
        "& $slider_thumb": {
            transition: "none",
        },
        "& $slider_foregroundTrack": {
            transition: "none",
        },
    },
    slider__incrementing: {
        "& $slider_thumb": {
            transition: "all 0.10s linear",
        },
        "& $slider_foregroundTrack": {
            transition: "all 0.10s linear",
        },
    },
    slider__horizontal: {
        "&$slider": {
            width: "100%",
            "min-height": thumbSize,
            "min-width": minSize,
        },
        "& $slider_layoutRegion": {
            margin: format(`0 {0}`, halfThumbSize),
            "grid-template-rows": format(`{0} 1fr`, thumbSize),
        },
        "& $slider_thumb": {
            "align-self": "start",
        },
        "& $slider_thumb__upperValue": {
            transform: format(`translateX({0})`, halfThumbSize),
        },
        "& $slider_thumb__lowerValue": {
            transform: format(`translateX(-{0})`, halfThumbSize),
        },
        "& $slider_track": {
            "align-self": "start",
            height: thumbSize,
            width: "100%",
        },
        "& $slider_backgroundTrack": {
            "margin-top": trackOffset,
            "align-self": "start",
            height: toPx(designUnit),
            left: trackOverhang,
            right: trackOverhang,
        },
        "& $slider_foregroundTrack": {
            "margin-top": trackOffset,
            "align-self": "start",
            height: toPx(designUnit),
        },
        "&$slider__modeAdjustLower": {
            "& $slider_foregroundTrack": {
                "margin-right": trackOverhang,
            },
        },
        "&$slider__modeAdjustUpper": {
            "& $slider_foregroundTrack": {
                "margin-left": trackOverhang,
            },
        },
    },
    slider__vertical: {
        "&$slider": {
            height: "100%",
            "min-height": minSize,
            "min-width": thumbSize,
        },
        "& $slider_thumb": {
            "justify-self": "start",
        },
        "& $slider_layoutRegion": {
            margin: format(`{0} 0`, halfThumbSize),
            "grid-template-columns": format(`{0} 1fr`, thumbSize),
        },
        "& $slider_thumb__upperValue": {
            transform: format(`translateY(-{0})`, halfThumbSize),
        },
        "& $slider_thumb__lowerValue": {
            transform: format(`translateY({0})`, halfThumbSize),
        },
        "& $slider_track": {
            "justify-self": "start",
            "margin-left": trackOffset,
            width: toPx(designUnit),
            height: "100%",
        },
        "& $slider_backgroundTrack": {
            "justify-self": "start",
            "margin-left": trackOffset,
            width: toPx(designUnit),
            top: trackOverhang,
            bottom: trackOverhang,
        },
        "& $slider_foregroundTrack": {
            "justify-self": "start",
            "margin-left": trackOffset,
            width: toPx(designUnit),
        },
        "&$slider__modeAdjustLower": {
            "& $slider_foregroundTrack": {
                "margin-top": trackOverhang,
            },
        },
        "&$slider__modeAdjustUpper": {
            "& $slider_foregroundTrack": {
                "margin-bottom": trackOverhang,
            },
        },
    },
    slider__rtl: {
        "&$slider__horizontal": {
            "& $slider_thumb__upperValue": {
                transform: format(`translateX(-{0})`, halfThumbSize),
            },
            "& $slider_thumb__lowerValue": {
                transform: format(`translateX({0})`, halfThumbSize),
            },
            "&$slider__modeAdjustLower": {
                "& $slider_foregroundTrack": {
                    "margin-right": "0",
                    "margin-left": trackOverhang,
                },
            },
            "&$slider__modeAdjustUpper": {
                "& $slider_foregroundTrack": {
                    "margin-right": trackOverhang,
                    "margin-left": "0",
                },
            },
        },
        "&$slider__vertical": {
            "& $slider_backgroundTrack": {
                "margin-right": trackOffset,
                "margin-left": "0",
            },
            "& $slider_foregroundTrack": {
                "margin-right": trackOffset,
                "margin-left": "0",
            },
        },
    },
    slider__modeSingle: {
        "& $slider_foregroundTrack": {
            display: "none",
        },
    },
    slider__modeAdjustLower: {},
    slider__modeAdjustUpper: {},
    slider__modeAdjustBoth: {
        "&$slider__horizontal": {
            "& $slider_thumb__upperValue": {
                width: halfThumbSize,
                "border-radius": format(`0px {0} {0} 0px`, halfThumbSize),
            },
            "& $slider_thumb__lowerValue": {
                width: halfThumbSize,
                "border-radius": format(`{0} 0px 0px {0}`, halfThumbSize),
            },
            "&$slider__rtl": {
                "& $slider_thumb__upperValue": {
                    "border-radius": format(`{0} 0px 0px {0}`, halfThumbSize),
                },

                "& $slider_thumb__lowerValue": {
                    "border-radius": format(`0px {0} {0} 0px`, halfThumbSize),
                },
            },
        },
        "&$slider__vertical": {
            "& $slider_thumb__upperValue": {
                height: halfThumbSize,
                "border-radius": format(`{0} {0} 0px 0px`, halfThumbSize),
            },
            "& $slider_thumb__lowerValue": {
                height: halfThumbSize,
                "border-radius": format(`0px 0px {0} {0}`, halfThumbSize),
            },
        },
        "& $slider_foregroundTrack": {
            "border-radius": "0",
        },
    },
};

export default styles;
