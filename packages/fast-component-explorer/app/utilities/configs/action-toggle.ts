import { ComponentViewConfig } from "./data.props";
import {
    ActionToggleProps,
    actionToggleSchema,
    ActionToggleAppearance,
    ActionToggle,
} from "@microsoft/fast-components-react-msft";
import glyphSchema from "../components/glyph.schema";
import { Icon } from "../components/glyph";

const actionToggleConfig: ComponentViewConfig<ActionToggleProps> = {
    schema: actionToggleSchema,
    component: ActionToggle,
    scenarios: [
        {
            displayName: "Default",
            data: {
                unselectedLabel: "Pause",
                selectedLabel: "Play",
                selectedContent: "Pause",
                unselectedContent: "Play",
                selectedGlyph: {
                    id: glyphSchema.id,
                    props: {
                        path: Icon.pause,
                    },
                } as any,
                unselectedGlyph: {
                    id: glyphSchema.id,
                    props: {
                        path: Icon.play,
                    },
                } as any,
            },
        },
        {
            displayName: "Primary",
            data: {
                appearance: ActionToggleAppearance.primary,
                selectedContent: "Pause",
                unselectedContent: "Play",
                selectedLabel: "Pause",
                unselectedLabel: "Play",
                selectedGlyph: {
                    id: glyphSchema.id,
                    props: {
                        path: Icon.pause,
                    },
                } as any,
                unselectedGlyph: {
                    id: glyphSchema.id,
                    props: {
                        path: Icon.play,
                    },
                } as any,
            },
        },
    ],
};

export default actionToggleConfig;
