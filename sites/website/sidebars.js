/* eslint-env node */
module.exports = {
    docs: [
        {
            type: "doc",
            id: "introduction",
        },
        {
            type: "category",
            label: "Using the Components",
            items: [
                "components/getting-started",
                "design-systems/fast-frame",
                {
                    type: "category",
                    label: "Components",
                    items: [
                        "components/accordion",
                        "components/anchor",
                        "components/anchored-region",
                        "components/avatar",
                        "components/badge",
                        "components/breadcrumb",
                        "components/button",
                        "components/card",
                        "components/checkbox",
                        "components/combobox",
                        "components/data-grid",
                        "components/dialog",
                        "components/disclosure",
                        "components/divider",
                        "components/flipper",
                        "components/horizontal-scroll",
                        "components/listbox",
                        "components/listbox-option",
                        "components/menu",
                        "components/number-field",
                        "components/progress",
                        "components/radio",
                        "components/radio-group",
                        "components/select",
                        "components/skeleton",
                        "components/slider",
                        "components/switch",
                        "components/tabs",
                        "components/text-area",
                        "components/text-field",
                        "components/toolbar",
                        "components/tooltip",
                        "components/tree-view",
                    ],
                },
            ],
        },
        {
            type: "category",
            label: "Building Components",
            items: [
                "fast-element/getting-started",
                "fast-element/defining-elements",
                "fast-element/declaring-templates",
                "fast-element/using-directives",
                "fast-element/observables-and-state",
                "fast-element/working-with-shadow-dom",
                "fast-element/leveraging-css",
                "fast-element/next-steps",
            ],
        },
        {
            type: "category",
            label: "Creating Design Systems",
            items: [
                "design-systems/overview",
                "design-systems/creating-a-component-library",
                "design-systems/design-tokens",
                "design-systems/high-contrast",
                "design/match-media-stylesheets",
                "design/localization",
            ],
        },
        {
            type: "category",
            label: "Apps and Experiences",
            items: ["apps-and-experiences/dependency-injection"],
        },
        {
            type: "category",
            label: "Integrations",
            items: [
                "integrations/introduction",
                "integrations/angular",
                "integrations/aspnet",
                "integrations/aurelia",
                "integrations/blazor",
                "integrations/react",
                "integrations/vue",
                "integrations/webpack",
            ],
        },
        {
            type: "category",
            label: "Tools",
            items: [
                "tools/component-explorer",
                "tools/vscode",
                "tools/hot-module-reload",
            ],
        },
        {
            type: "category",
            label: "API Reference",
            items: [
                "api/fast-animation",
                "api/fast-colors",
                "api/fast-components",
                "api/fast-element",
                "api/fast-foundation",
            ],
        },
        {
            type: "category",
            label: "Community Contribution",
            items: [
                "community/join",
                "community/code-of-conduct",
                "community/contributor-guide",
                "community/writing-documentation",
            ],
        },
        {
            type: "category",
            label: "Resources",
            items: [
                "resources/why-web-components",
                "resources/license",
                "resources/security",
                "resources/browser-support",
                "resources/acknowledgements",
                "resources/glossary",
                "resources/faq",
            ],
        },
    ],
};
