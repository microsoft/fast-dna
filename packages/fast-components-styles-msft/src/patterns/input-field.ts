import { applyTypeRampConfig } from "../utilities/typography";
import { fontWeight } from "../utilities/fonts";
import { CSSRules } from "@microsoft/fast-jss-manager";
import { DesignSystem } from "../design-system";
import { applyFocusVisible, toPx } from "@microsoft/fast-jss-utilities";
import {
    neutralFillStealthRest,
    neutralForegroundRest,
    neutralOutlineHover,
    neutralOutlineRest,
} from "../utilities/color";

/**
 * Shared input field styles
 */
export function inputFieldStyles(designSystem: DesignSystem): CSSRules<{}> {
    return {
        ...applyTypeRampConfig("t7"),
        background: neutralFillStealthRest,
        border: `${toPx(
            designSystem.outlinePatternOutlineWidth
        )} solid ${neutralOutlineRest(designSystem)}`,
        color: neutralForegroundRest,
        fontFamily: "inherit",
        fontWeight: fontWeight.normal.toString(),
        boxSizing: "border-box",
        borderRadius: toPx(designSystem.cornerRadius),
        padding: "10px",
        margin: "0",
        "&:hover": {
            border: `${toPx(
                designSystem.outlinePatternOutlineWidth
            )} solid ${neutralOutlineHover(designSystem)}`,
        },
        ...applyFocusVisible({
            boxShadow: `0 0 0 1px ${designSystem.foregroundColor} inset`,
            border: `${toPx(designSystem.outlinePatternOutlineWidth)} solid ${
                designSystem.foregroundColor
            }`,
        }),
        "&:disabled": {
            cursor: "not-allowed",
            opacity: "0.3",
        },
        "&::placeholder": {
            color: neutralForegroundRest,
        },
    };
}
