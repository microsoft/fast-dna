import { MenuItem } from "@microsoft/fast-tooling-react";
import { FormChildOptionItem } from "@microsoft/fast-tooling-react/dist/form/form";
import { pascalCase } from "@microsoft/fast-web-utilities";
import * as testComponentViewConfigs from "./utilities/components";
import * as componentViewConfigs from "./utilities/configs";
import { createBrowserHistory } from "history";

function getRouteFromSchemaId(schemaId: string): string {
    const matchedRegex: RegExpMatchArray | null = schemaId.match(/\/(?:.(?!\/))+$/);
    return Array.isArray(matchedRegex) ? `/components${matchedRegex[0]}` : "";
}

function generateMenu(schemas: any[]): MenuItem[] {
    return [
        {
            displayName: "Components",
            items: schemas.map(
                (schema: any): MenuItem => {
                    return {
                        displayName: schema.title,
                        location: getRouteFromSchemaId(schema.id),
                    };
                }
            ),
        },
    ];
}

function getComponentChildrenOptions(): FormChildOptionItem[] {
    return Object.keys(componentViewConfigs).map(
        (componentViewKey: string): FormChildOptionItem => {
            return {
                name: pascalCase(componentViewConfigs[componentViewKey].schema.title),
                component: componentViewConfigs[componentViewKey].component,
                schema: componentViewConfigs[componentViewKey].schema,
            };
        }
    );
}

function getTestComponentChildrenOptions(): FormChildOptionItem[] {
    return Object.keys(testComponentViewConfigs).map(
        (testComponentViewKey: string): FormChildOptionItem => {
            return {
                name: pascalCase(
                    testComponentViewConfigs[testComponentViewKey].schema.title
                ),
                component: testComponentViewConfigs[testComponentViewKey].component,
                schema: testComponentViewConfigs[testComponentViewKey].schema,
            };
        }
    );
}

const schemas: any[] = [];

Object.keys(componentViewConfigs).forEach((componentViewConfigKey: string) => {
    schemas.push(componentViewConfigs[componentViewConfigKey].schema);
});

const history = createBrowserHistory();
const menu: MenuItem[] = generateMenu(schemas);
const childOptions: FormChildOptionItem[] = getComponentChildrenOptions().concat(
    getTestComponentChildrenOptions()
);

export { childOptions, history, menu };
