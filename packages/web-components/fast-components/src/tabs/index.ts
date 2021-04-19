import { Tabs, TabsTemplate as template } from "@microsoft/fast-foundation";
import { TabsStyles as styles } from "./tabs.styles";

/**
 * The FAST Tabs Custom Element. Implements {@link @microsoft/fast-foundation#Tabs},
 * {@link @microsoft/fast-foundation#TabsTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-tabs\>
 */
export const fastTabs = Tabs.compose({
    baseName: "tabs",
    template,
    styles,
});

export * from "../tab";
export * from "../tab-panel";
/**
 * Styles for Tabs
 * @public
 */
export const TabsStyles = styles;
