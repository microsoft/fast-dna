import { Tab, tabTemplate as template } from "@microsoft/fast-foundation";
import { tabStyles as styles } from "./tab.styles";

/**
 * The FAST Tab Custom Element. Implements {@link @microsoft/fast-foundation#Tab},
 * {@link @microsoft/fast-foundation#TabTemplate}
 *
 *
 * @public
 * @remarks
 * HTML Element: \<fast-tab\>
 */
export const fastTab = Tab.compose({
    baseName: "tab",
    template,
    styles,
});

/**
 * Styles for Tab
 * @public
 */
export const TabStyles = styles;
