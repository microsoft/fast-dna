import React from "react";
import manageJss from "@microsoft/fast-jss-manager-react";
import {
    applyCornerRadius,
    DesignSystem,
    applyElevation,
} from "@microsoft/fast-components-styles-msft";

interface SwatchManagedClasses {
    swatch: string;
}
interface SwatchProps extends React.HTMLAttributes<HTMLSpanElement> {
    color: string;
    managedClasses: SwatchManagedClasses;
}

function Swatch(props: SwatchProps): JSX.Element {
    const { managedClasses, color, ...rest } = props;
    return (
        <span className={managedClasses.swatch} style={{ background: color }} {...rest} />
    );
}

export default manageJss<SwatchManagedClasses, SwatchProps>({
    swatch: {
        display: "inline-block",
        width: "16px",
        height: "16px",
        margin: "0 8px 0 0",
        ...applyCornerRadius(),
        ...applyElevation(2),
    },
})(Swatch);
