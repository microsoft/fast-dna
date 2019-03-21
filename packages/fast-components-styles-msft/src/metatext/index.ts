import { DesignSystem, withDesignSystemDefaults } from "../design-system";
import { ComponentStyles, ComponentStyleSheet } from "@microsoft/fast-jss-manager";
import { MetatextClassNameContract } from "@microsoft/fast-components-class-name-contracts-msft";
import { neutralForegroundHint } from "../utilities/color";
import { scaleApplyTypeRampConfigWithDensity } from "../utilities/typography";

const styles: ComponentStyles<MetatextClassNameContract, DesignSystem> = (
    config: DesignSystem
): ComponentStyleSheet<MetatextClassNameContract, DesignSystem> => {
    const designSystem: DesignSystem = withDesignSystemDefaults(config);

    return {
        metatext: {
            ...scaleApplyTypeRampConfigWithDensity(designSystem, "t7"),
            color: neutralForegroundHint,
        },
    };
};

export default styles;
