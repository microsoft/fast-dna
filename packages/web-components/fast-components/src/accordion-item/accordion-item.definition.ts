import { WebComponentDefinition } from "@microsoft/fast-tooling/dist/esm/data-utilities/web-component";
import { DataType } from "@microsoft/fast-tooling";

export const fastAccordionItemDefinition: WebComponentDefinition = {
    version: 1,
    tags: [
        {
            name: "fast-accordion-item",
            title: "Accordion item",
            description: "The FAST accordion item element",
            attributes: [
                {
                    name: "heading-level",
                    description: "The heading level attribute",
                    type: DataType.number,
                    default: 2,
                    required: false,
                },
                {
                    name: "expanded",
                    description: "The expanded attribute",
                    type: DataType.boolean,
                    default: false,
                    required: false,
                },
                {
                    name: "id",
                    description: "The id attribute",
                    type: DataType.string,
                    default: undefined,
                    required: false,
                },
            ],
            slots: [
                {
                    name: "",
                    description: "Default slot",
                },
                {
                    name: "heading",
                    description: "Heading slot",
                },
                {
                    name: "start",
                    description: "Start slot",
                },
                {
                    name: "end",
                    description: "End slot",
                },
                {
                    name: "expanded-icon",
                    description: "The expanded icon slot",
                },
                {
                    name: "collapsed-icon",
                    description: "The collapsed icon slot",
                },
            ],
        },
    ],
};
