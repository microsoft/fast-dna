import { Palette } from "../palette";
import { InteractiveSwatchSet } from "../recipe";
import { Swatch } from "../swatch";
/**
 * @internal
 */
export declare function neutralFillInput(
    palette: Palette,
    reference: Swatch,
    restDelta: number,
    hoverDelta: number,
    activeDelta: number,
    focusDelta: number
): InteractiveSwatchSet;
