import { ComponentStyles } from "@microsoft/fast-jss-manager-react";
import { applyControlRegion, applyControlWrapper, applyInputStyle } from "../../style";

export interface CSSBoxShadowClassNameContract {
    cssBoxShadow?: string;
    cssBoxShadow_colorInputRegion?: string;
    cssBoxShadow_control?: string;
    cssBoxShadow_controlRegion?: string;
    cssBoxShadow_colorRegion?: string;
    cssBoxShadow_opacityInput?: string;
    cssBoxShadow_xInput?: string;
    cssBoxShadow_yInput?: string;
    cssBoxShadow_blurInput?: string;
    cssBoxShadow_label?: string;
}

const styles: ComponentStyles<CSSBoxShadowClassNameContract, {}> = {
    cssBoxShadow: {
        display: "flex",
    },
    cssBoxShadow_colorInputRegion: {
        borderRadius: "2px",
        boxShadow: "0 0 0 1px inset rgba(255, 255, 255, 0.19)",
        width: "49%",
    },
    cssBoxShadow_colorRegion: {
        width: "37%",
    },
    cssBoxShadow_control: {
        ...applyControlRegion(),
    },
    cssBoxShadow_controlRegion: {
        display: "flex",
        flexDirection: "column",
        width: "21%",
        marginLeft: "4px",
    },
    cssBoxShadow_opacityInput: {
        ...applyInputStyle(),
        width: "51%",
        height: "25px",
    },
    cssBoxShadow_xInput: {
        ...applyInputStyle(),
        height: "25px",
    },
    cssBoxShadow_yInput: {
        ...applyInputStyle(),
        height: "25px",
    },
    cssBoxShadow_blurInput: {
        ...applyInputStyle(),
        height: "25px",
    },
};

export default styles;
