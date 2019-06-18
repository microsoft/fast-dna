import React from "react";
import { TextAction, TextActionProps, textActionSchema } from "./index";
import Documentation from "./.tmp/documentation";
import { ComponentFactoryExample } from "@microsoft/fast-development-site-react";
import { TextActionAppearance, TextActionButtonPosition } from "./text-action.props";
import { SVGGlyph } from "../../app/components/svg-svg-element";
import svgSchema from "../../app/components/svg-svg-element.schema";
import { buttonSchema } from "../index";

const examples: ComponentFactoryExample<TextActionProps> = {
    name: "Text action",
    component: TextAction,
    schema: textActionSchema as any,
    documentation: <Documentation />,
    detailData: {
        placeholder: "Placeholder",
        button: {
            id: buttonSchema.id,
            props: {
                children: {
                    id: svgSchema.id,
                    props: {
                        path: SVGGlyph.arrow,
                    },
                },
            },
        } as any,
        beforeGlyph: {
            id: svgSchema.id,
            props: {
                path: SVGGlyph.user,
            },
        } as any,
    },
    data: [
        {
            title: "Search",
            placeholder: "Search",
            button: {
                id: buttonSchema.id,
                props: {
                    children: {
                        id: svgSchema.id,
                        props: {
                            path: SVGGlyph.arrow,
                        },
                    },
                },
            } as any,
            beforeGlyph: {
                id: svgSchema.id,
                props: {
                    path: SVGGlyph.user,
                },
            } as any,
        },
        {
            button: {
                id: buttonSchema.id,
                props: {
                    children: "Search",
                },
            } as any,
            beforeGlyph: {
                id: svgSchema.id,
                props: {
                    path: SVGGlyph.user,
                },
            } as any,
            afterGlyph: {
                id: svgSchema.id,
                props: {
                    path: SVGGlyph.robot,
                },
            } as any,
        },
        {
            disabled: true,
            button: {
                id: buttonSchema.id,
                props: {
                    children: {
                        id: svgSchema.id,
                        props: {
                            path: SVGGlyph.arrow,
                        },
                    },
                },
            } as any,
            beforeGlyph: {
                id: svgSchema.id,
                props: {
                    path: SVGGlyph.arrow,
                },
            } as any,
        },
        {
            defaultValue: "foo",
            button: {
                id: buttonSchema.id,
                props: {
                    children: {
                        id: svgSchema.id,
                        props: {
                            path: SVGGlyph.arrow,
                        },
                    },
                },
            } as any,
        },
        {
            button: {
                id: svgSchema.id,
                props: {
                    path: SVGGlyph.arrow,
                },
            } as any,
            beforeGlyph: {
                id: svgSchema.id,
                props: {
                    path: SVGGlyph.user,
                },
            } as any,
        },
        {
            buttonPosition: TextActionButtonPosition.before,
            button: {
                id: svgSchema.id,
                props: {
                    path: SVGGlyph.arrow,
                },
            } as any,
            afterGlyph: {
                id: svgSchema.id,
                props: {
                    path: SVGGlyph.download,
                },
            } as any,
        },
        {
            button: {
                id: buttonSchema.id,
                props: {
                    children: {
                        id: svgSchema.id,
                        props: {
                            path: SVGGlyph.arrow,
                        },
                    },
                },
            } as any,
        },
        {
            afterGlyph: {
                id: svgSchema.id,
                props: {
                    path: SVGGlyph.download,
                },
            } as any,
        },
        {
            buttonPosition: TextActionButtonPosition.before,
            button: {
                id: buttonSchema.id,
                props: {
                    children: {
                        id: svgSchema.id,
                        props: {
                            path: SVGGlyph.arrow,
                        },
                    },
                },
            } as any,
            beforeGlyph: {
                id: svgSchema.id,
                props: {
                    path: SVGGlyph.user,
                },
            } as any,
        },
        {
            title: "Search",
            placeholder: "Search",
            appearance: TextActionAppearance.filled,
            beforeGlyph: {
                id: svgSchema.id,
                props: {
                    path: SVGGlyph.user,
                },
            } as any,
        },
    ],
};

export default examples;
