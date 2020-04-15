import { customElement } from "@microsoft/fast-element";
import {
    neutralFillStealthActive,
    neutralFillStealthHover,
    neutralFillStealthRest,
    neutralFocus,
    neutralForegroundRest,
    neutralOutlineActive,
    neutralOutlineHover,
    neutralOutlineRest,
} from "../styles/recipes";
import { Flipper } from "./flipper";
import { FlipperTemplate as template } from "./flipper.template";
import { FlipperStyles as styles } from "./flipper.styles";

@customElement({
    name: "fast-flipper",
    template,
    styles,
})
// @designSystemConsumer({
//     recipes: [
//         neutralFillStealthRest,
//         neutralFillStealthHover,
//         neutralFillStealthActive,
//         neutralForegroundRest,
//         neutralFocus,
//         neutralOutlineActive,
//         neutralOutlineHover,
//         neutralOutlineRest,
//     ],
// })
export class FASTFlipper extends Flipper {}
export * from "./flipper.template";
export * from "./flipper.styles";
export * from "./flipper";
