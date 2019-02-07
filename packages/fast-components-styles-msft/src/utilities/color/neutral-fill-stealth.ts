import {
    DesignSystem,
    DesignSystemResolver,
    ensureDesignSystemDefaults,
    withDesignSystemDefaults,
} from "../../design-system";
import { memoize } from "lodash";
import { findClosestSwatchIndex, palette, Palette, Palettes, Swatch } from "./palette";
import {
    ColorRecipe,
    StatefulSwatch,
    StatefulSwatchToColorRecipeFactory,
} from "./common";
import {
    neutralFillDeltaActive,
    neutralFillDeltaHover,
    neutralFillDeltaRest,
} from "./neutral-fill";

export const neutralFillStealthDeltaRest: number = 0;
export const neutralFillStealthDeltaHover: number = 2;
export const neutralFillStealthDeltaActive: number = 1;

/**
 * The minimum offset before which we can switch fill directions
 */
const swapThreshold: number = Math.max(
    neutralFillDeltaRest,
    neutralFillDeltaHover,
    neutralFillDeltaActive,
    neutralFillStealthDeltaRest,
    neutralFillStealthDeltaHover,
    neutralFillStealthDeltaActive
);

/**
 * Algorithm for determining stealth fill colors
 */
const neutralFillStealthAlgorithm: DesignSystemResolver<StatefulSwatch> = memoize(
    (designSystem: DesignSystem): StatefulSwatch => {
        const neutralPalette: Palette = palette(Palettes.neutral)(designSystem);
        const backgroundIndex: number = findClosestSwatchIndex(
            Palettes.neutral,
            designSystem.backgroundColor
        )(designSystem);
        const direction: number = backgroundIndex >= swapThreshold ? -1 : 1;

        return {
            rest:
                neutralPalette[backgroundIndex + direction * neutralFillStealthDeltaRest],
            hover:
                neutralPalette[
                    backgroundIndex + direction * neutralFillStealthDeltaHover
                ],
            active:
                neutralPalette[
                    backgroundIndex + direction * neutralFillStealthDeltaActive
                ],
        };
    },
    (designSystem: DesignSystem): string => {
        return designSystem.backgroundColor;
    }
);

export function neutralFillStealth(designSystem: DesignSystem): StatefulSwatch;
export function neutralFillStealth(
    backgroundResolver: (designSystem: DesignSystem) => Swatch
): (designSystem: DesignSystem) => StatefulSwatch;
export function neutralFillStealth(arg: any): any {
    if (typeof arg === "function") {
        return ensureDesignSystemDefaults(
            (designSystem: DesignSystem): StatefulSwatch => {
                return neutralFillStealthAlgorithm(
                    Object.assign({}, designSystem, {
                        backgroundColor: arg(designSystem),
                    })
                );
            }
        );
    } else {
        return neutralFillStealthAlgorithm(withDesignSystemDefaults(arg));
    }
}

export const neutralFillStealthRest: ColorRecipe = StatefulSwatchToColorRecipeFactory(
    "rest",
    neutralFillStealth
);
export const neutralFillStealthHover: ColorRecipe = StatefulSwatchToColorRecipeFactory(
    "hover",
    neutralFillStealth
);
export const neutralFillStealthActive: ColorRecipe = StatefulSwatchToColorRecipeFactory(
    "active",
    neutralFillStealth
);
