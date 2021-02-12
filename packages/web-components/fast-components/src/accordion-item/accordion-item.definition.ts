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
                    title: "Default slot",
                    description: "The content of the item",
                },
                {
                    name: "heading",
                    title: "Heading slot",
                    description: "The heading of the accordion item",
                },
                {
                    name: "start",
                    title: "Start slot",
                    description:
                        "Contents of the start slot are positioned before the heading",
                },
                {
                    name: "end",
                    title: "End slot",
                    description:
                        "Contents of the end slot are positioned after the heading and before the expand/collapse icons",
                },
                {
                    name: "expanded-icon",
                    title: "Expanded icon slot",
                    description:
                        "Slot to provide a custom icon representing the expanded state",
                },
                {
                    name: "collapsed-icon",
                    title: "Collapsed icon slot",
                    description:
                        "Slot to provide a custom icon representing the collapsed state",
                },
            ],
        },
    ],
};
