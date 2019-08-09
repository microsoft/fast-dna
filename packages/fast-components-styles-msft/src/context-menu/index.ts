import { ContextMenuClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { ComponentStyles } from "@microsoft/fast-jss-manager";
import { format, toPx } from "@microsoft/fast-jss-utilities";
import { DesignSystem } from "../design-system";
import { applyElevatedCornerRadius } from "../utilities/border";
import { backgroundColor, designUnit, outlineWidth } from "../utilities/design-system";
import { applyElevation, ElevationMultiplier } from "../utilities/elevation";

const styles: ComponentStyles<ContextMenuClassNameContract, DesignSystem> = {
    contextMenu: {
        background: backgroundColor,
        ...applyElevatedCornerRadius(),
        ...applyElevation(ElevationMultiplier.e11),
        margin: "0",
        padding: format("{0} 0", toPx<DesignSystem>(designUnit)),
        maxWidth: "368px",
        minWidth: "64px",
        transition: "all 0.2s ease-in-out",
        "@media (-ms-high-contrast:active)": {
            background: "ButtonFace",
            border: format<DesignSystem>("{0} solid ButtonText", toPx(outlineWidth)),
        },
    },
};

export default styles;
