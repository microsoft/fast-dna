import { DesignSystem } from "@microsoft/fast-components-styles-msft";
import { RecipeTypes, RecipeData } from "./recipe-registry";

/**
 * Defines the data stored by the plugin on a node instance
 */
export interface PluginNodeData {
    /**
     * A set of recipe IDs applied to the node
     */
    recipes: string[];

    /**
     * Design system overrides applied to the node
     */
    designSystem: Partial<DesignSystem>;
}

/**
 * The abstract class the plugin controller interacts with
 * Implementation details of this class will need to be created
 * for each design tool.
 */
export abstract class PluginNode {
    public abstract id: string;
    public abstract type: string;
    protected abstract getPluginData<K extends keyof PluginNodeData>(
        key: K
    ): PluginNodeData[K];
    protected abstract setPluginData<K extends keyof PluginNodeData>(
        key: K,
        value: PluginNodeData[K]
    ): void;
    public abstract children(): PluginNode[];
    public abstract supports(): RecipeTypes[];
    public abstract designSystem(): DesignSystem;

    public get recipes(): string[] {
        return this.getPluginData("recipes");
    }

    public set recipes(recipes: string[]) {
        this.setPluginData("recipes", recipes);
    }

    public abstract paint(data: RecipeData): void;
}
