import { customElement } from "@microsoft/fast-element";
import { RadioGroup, RadioGroupTemplate as template } from "@microsoft/fast-components";
import { RadioGroupStyles as styles } from "./radio-group.styles";

@customElement({
    name: "fast-radio-group",
    template,
    styles,
})
export class FASTRadioGroup extends RadioGroup {}
