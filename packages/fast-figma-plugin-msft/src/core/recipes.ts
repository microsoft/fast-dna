import {
    accentFillLargeRest,
    accentFillRest,
    accentForegroundCut,
    accentForegroundCutLarge,
    accentForegroundLargeRest,
    accentForegroundRest,
    DesignSystemResolver,
    neutralFillCard,
    neutralFillInputRest,
    neutralFillRest,
    neutralFillStealthRest,
    neutralFillToggleRest,
    neutralFocus,
    neutralForegroundHint,
    neutralForegroundHintLarge,
    neutralForegroundRest,
    neutralForegroundToggle,
    neutralForegroundToggleLarge,
    neutralLayerCard,
    neutralLayerCardContainer,
    neutralLayerFloating,
    neutralLayerL1,
    neutralLayerL1Alt,
    neutralLayerL2,
    neutralLayerL3,
    neutralLayerL4,
    neutralOutlineRest,
} from "@microsoft/fast-components-styles-msft";

export interface RecipeStore {
    [key: string]: {
        resolver: DesignSystemResolver<string>;
        name: string;
    };
}

export const fillRecipes: RecipeStore = {
    accentFillRest: { resolver: accentFillRest, name: "Accent Fill" },
    // accentFillLargeRest,
    neutralFillRest: { resolver: neutralFillRest, name: "Neutral Fill" },
    // neutralFillCard,
    // neutralFillInputRest,
    // neutralFillStealthRest,
    // neutralFillToggleRest,
    neutralLayerCard: { resolver: neutralLayerCard, name: "Flyout" },
    // neutralLayerCardContainer,
    // neutralLayerFloating,
    neutralLayerL1: { resolver: neutralLayerL1, name: "L1" },
    neutralLayerL1Alt: { resolver: neutralLayerL1Alt, name: "L1 Alt" },
    neutralLayerL2: { resolver: neutralLayerL2, name: "L2" },
    neutralLayerL3: { resolver: neutralLayerL3, name: "L3" },
    neutralLayerL4: { resolver: neutralLayerL4, name: "L3" },
};

export const strokeRecipes: RecipeStore = {
    neutralFocus: { resolver: neutralFocus, name: "Focus" },
    neutralOutlineRest: { resolver: neutralOutlineRest, name: "Outline" },
};

export const textFillRecipes: RecipeStore = {
    neutralForegroundRest: { resolver: neutralForegroundRest, name: "Primary" },
    neutralForegroundHint: { resolver: neutralForegroundHint, name: "Secondary" },
    accentForegroundRest: { resolver: accentForegroundRest, name: "Accent" },
    // accentForegroundLargeRest,
    accentForegroundCut: { resolver: accentForegroundCut, name: "On Accent" },
    // accentForegroundCutLarge,

    // neutralForegroundHintLarge,
    // neutralForegroundToggle,
    // neutralForegroundToggleLarge,
};
