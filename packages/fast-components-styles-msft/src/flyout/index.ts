import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { FlyoutClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { DesignSystem, ensureDesignSystemDefaults } from "../design-system";
import { applyFloatingCornerRadius } from "../utilities/border";
import { applyElevation, ElevationMultiplier } from "../utilities/elevation";
import { format, toPx } from "@microsoft/fast-jss-utilities";
import { outlineWidth } from "../utilities/design-system";

const styles: ComponentStyles<FlyoutClassNameContract, DesignSystem> = {
    flyout: {
        display: "none",
        background: ensureDesignSystemDefaults(
            (designSystem: DesignSystem): string => designSystem.backgroundColor
        ),
        ...applyFloatingCornerRadius(),
        ...applyElevation(ElevationMultiplier.e14),
        zIndex: "1",
        '&[aria-hidden="false"]': {
            display: "block",
        },
        "@media (-ms-high-contrast:active)": {
            border: format("{0} solid WindowText", toPx<DesignSystem>(outlineWidth)),
        },
    },
    flyout__top: {},
    flyout__bottom: {},
    flyout__left: {},
    flyout__right: {},
    flyout__horizontalInset: {},
    flyout__verticalInset: {},
};

export default styles;
