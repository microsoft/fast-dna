import { clone, cloneDeep, get, isEqual, mergeWith } from "lodash-es";
import * as tv4 from "tv4";
import { IBreadcrumbItemConfig, IBreadcrumbItemsConfig, IComponentItem, IFormProps, IFormState } from "./form.props";

export enum RegexType {
    squareBracket,
    oneOfAnyOf
}

/**
 * Get regex
 */
export function getRegex(type: RegexType): RegExp {
    switch (type) {
        case RegexType.squareBracket:
            return /\[(\d+?)\]/g;
        case RegexType.oneOfAnyOf:
            return /(oneOf|anyOf)\[\d+\]/g;
    }
}

/**
 * Gets the data cache based on a new data object and
 * previous data object
 */
export function getDataCache(dataCache: any, newData: any): any {
    let newDataCache: any = (typeof dataCache !== "undefined") ? cloneDeep(dataCache) : newData;

    if (newDataCache !== newData) {
        newDataCache = mergeWith(dataCache, newData, cachedArrayResolver);
    }

    return newDataCache;
}

/**
 * Resolves arrays when the object is an array and the data passed is an array
 */
function cachedArrayResolver(objValue: any, srcValue: any): any {
    if (Array.isArray(objValue) && Array.isArray(srcValue)) {
        return srcValue;
    }
}

export interface IBreadcrumbItem {
    href: string;
    text: string;
    onClick: (e: React.MouseEvent<HTMLElement>) => void;
}

/**
 * Gets the schema location as a string which can be used as a lodash get location
 */
function getSchemaLocation(schemaLocation: string, schemaLocationItem: string): string {
    return schemaLocation === "" ? schemaLocationItem : `${schemaLocation}.${schemaLocationItem}`;
}

/**
 * Determine if the properties object is present on the given schema
 */
function checkHasProperties(schema: any): boolean {
    return typeof schema !== "undefined" && typeof schema.properties === "object";
}

/**
 * Determine if a oneOf or anyOf options array is present on the given schema
 */
function checkHasOneOfAnyOf(schema: any): boolean {
    return typeof schema !== "undefined" && (typeof schema.anyOf !== "undefined" || typeof schema.oneOf !== "undefined");
}

/**
 * Determine if the schema corresponds to an array location
 */
function checkIsArray(schema: any, isProperties: boolean, isOneOfAnyOf: boolean): boolean {
    return typeof schema === "undefined" && !isProperties && !isOneOfAnyOf;
}

/**
 * Determine if the there is a schema within the schema
 */
function checkHasSubSchema(schema: any, isOneOfAnyOf: boolean): boolean {
    const hasProperties: boolean = checkHasProperties(schema);
    const hasOneOfAnyOf: boolean = checkHasOneOfAnyOf(schema);
    return typeof schema !== "undefined" && !isOneOfAnyOf && (schema.type === "object" || hasProperties || hasOneOfAnyOf);
}

/**
 * Gets a breadcrumb item props
 */
function getBreadcrumbItem(itemConfig: IBreadcrumbItemConfig): IBreadcrumbItem {
    return {
        href: "#",
        text: itemConfig.subSchema && itemConfig.subSchema.title ? itemConfig.subSchema.title : itemConfig.untitled,
        onClick: (e: React.MouseEvent<HTMLElement>): void => {
            e.preventDefault();

            if (itemConfig.config.onUpdateLocation) {
                itemConfig.config.onUpdateLocation(
                    itemConfig.config.activeSchemaLocation,
                    itemConfig.config.activeDataLocation
                );
            } else {
                itemConfig.config.onUpdateActiveSection(
                    itemConfig.config.activeSchemaLocation,
                    itemConfig.config.activeDataLocation,
                    itemConfig.schema
                );
            }
        }
    };
}

/**
 * Checks to see if this is pointing to an array or contains a schema
 */
function isArrayOrHasSubSchema(schemaLocationItem: string, subSchema: any): boolean {
    const isProperties: boolean = schemaLocationItem === "properties";
    const isOneOfAnyOf: boolean = schemaLocationItem.match(getRegex(RegexType.oneOfAnyOf)) !== null;
    const isArray: boolean = checkIsArray(subSchema, isProperties, isOneOfAnyOf);
    const hasSubSchema: boolean = checkHasSubSchema(subSchema, isOneOfAnyOf);

    return isArray || hasSubSchema;
}

function getSubSchema(schema: any, subSchema: any, schemaLocationItem: string): any {
    if (typeof subSchema === "undefined" && schemaLocationItem !== "properties") {
        return schema;
    }

    return subSchema;
}

/**
 * Gets the breadcrumb props
 */
export function getBreadcrumbItems(config: IBreadcrumbItemsConfig): IBreadcrumbItem[] {
    const breadcrumbItems: IBreadcrumbItem[] = [];
    const untitled: string = "Untitled";
    const schemaLocationItems: string[] = config.activeSchemaLocation.split(".");
    const dataLocationItems: string[] = config.activeDataLocation.split(".");
    let schemaLocation: string;
    let dataLocation: string = "";
    let dataLocationCount: number = 0;

    for (const schemaLocationItem of schemaLocationItems) {
        schemaLocation = getSchemaLocation(schemaLocation, schemaLocationItem);
        let subSchema: any = get(schemaLocation, config.schema);

        if (isArrayOrHasSubSchema(schemaLocationItem, subSchema)) {
            subSchema = getSubSchema(config.schema, subSchema, schemaLocationItem);
            dataLocation += dataLocationItems[dataLocationCount];
            dataLocationCount++;

            breadcrumbItems.push(getBreadcrumbItem({
                subSchema,
                schema: clone(config.schema),
                config,
                untitled,
                schemaLocation: clone(schemaLocation),
                activeDataLocation: clone(config.activeDataLocation)
            }));
        }
    }

    return breadcrumbItems;
}

/**
 * Determines the navigation from
 * - section links
 * - child components
 * - array items
 * - breadcrumb links
 */
export function getActiveComponentAndSection(
    schemaLocation: string,
    dataLocation: string,
    schema?: any
): Partial<IFormState> {
    const state: any = {};

    state.activeDataLocation = dataLocation;
    state.activeSchemaLocation = schemaLocation;

    // if the schema is undefined its most likely an array
    if (typeof schema !== "undefined") {
        state.schema = schema;
        state.titleProps = schema.title || "Untitled";
    }

    return state;
}

/**
 * Get the component tracker and update it if necessary
 */
export function getComponentTracker(
    schemaLocation: string,
    dataLocation: string,
    schema: any,
    componentTracker: IComponentItem[]
): IComponentItem[] {
    let updatedComponentTracker: IComponentItem[] = [];

    // check the component tracker against the schema provided
    let isTracked: boolean = false;
    let lastTracked: number;

    componentTracker.forEach((component: any, index: number): void => {
        if (
            (JSON.stringify(component.schema) === JSON.stringify(schema)) &&
            schemaLocation === component.schemaLocation
            && dataLocation === component.dataLocation
        ) {
            isTracked = true;
            lastTracked = index;
        }
    });

    // if there is no match add the new schema to the component tracker
    if (!isTracked) {
        updatedComponentTracker = updatedComponentTracker.concat(componentTracker);
        updatedComponentTracker.push({
            dataLocation,
            schemaLocation,
            schema
        });
    // if there is a containing item
    } else {
        updatedComponentTracker = updatedComponentTracker.concat(componentTracker);
        updatedComponentTracker.splice(lastTracked + 1);
    }

    return updatedComponentTracker;
}

/**
 * Creates a schema location from a data location
 */
export function mapSchemaLocationFromDataLocation(dataLocation: string, data: any, schema: any): string {
    const squareBracketRegex: RegExp = getRegex(RegexType.squareBracket);
    let normalizedDataLocation: string = dataLocation.replace(squareBracketRegex, `.$1`); // convert all [ ] to . notation
    normalizedDataLocation = convertArrayItemsToBracketNotation(dataLocation, data); // convert back all array items to use [ ]
    const dataLocationSegments: string[] = normalizedDataLocation.split(".");

    if (dataLocation !== "") {
        dataLocationSegments.unshift("");
    }

    const schemaLocationSegments: string[] = getSchemaLocationSegmentsFromDataLocationSegments(dataLocationSegments, schema, data);

    return schemaLocationSegments.join(".").replace(squareBracketRegex, "");
}

/**
 * Get an array of schema location strings from an array of data location strings
 */
export function getSchemaLocationSegmentsFromDataLocationSegments(dataLocationSegments: string[], schema: any, data: any): string[] {
    let schemaLocationSegments: string[] = [];
    let reconstitutedDataLocation: string = "";

    for (let i: number = 0; i < dataLocationSegments.length; i++) {
        const partialData: any = getPartialData(reconstitutedDataLocation, data);
        const partialSchema: any = getPartialData(schemaLocationSegments.join(".").replace(getRegex(RegexType.squareBracket), ""), schema);

        schemaLocationSegments = schemaLocationSegments.concat(
            getSchemaOneOfAnyOfLocationStrings(
                partialSchema,
                partialData
            )
        );

        // Do not check for additional JSON schema keywords such as "properties" if this is at the root level
        if (i !== 0) {
            schemaLocationSegments = schemaLocationSegments.concat(
                getSchemaLocationSegmentsFromDataLocationSegment(
                    dataLocationSegments[i],
                    dataLocationSegments.length > i + 1,
                    partialData
                )
            );
        }

        reconstitutedDataLocation += reconstitutedDataLocation === "" ? dataLocationSegments[i] : `.${dataLocationSegments[i]}`;
    }

    return schemaLocationSegments;
}

/**
 * Gets data from a data and location
 */
export function getPartialData(location: string, data: any): any {
    return location === "" ? data : get(data, location);
}

/**
 * Gets an array of oneOf/anyOf with a valid index from a schema and data
 */
export function getSchemaOneOfAnyOfLocationStrings(schema: any, data: any): string[] {
    const schemaLocationSegments: string[] = [];

    if (!!schema.anyOf) {
        schemaLocationSegments.push(`anyOf.${getValidAnyOfOneOfIndex("anyOf", data, schema)}`);
    }

    if (!!schema.oneOf) {
        schemaLocationSegments.push(`oneOf.${getValidAnyOfOneOfIndex("oneOf", data, schema)}`);
    }

    return schemaLocationSegments;
}

/**
 * Get an array of schema location strings from a single data location item
 */
export function getSchemaLocationSegmentsFromDataLocationSegment(dataLocation: string, endOfContainingString: boolean, data: any): string[] {
    const schemaLocationSegments: string[] = [];

    if (typeof data === "object" && !Array.isArray(data)) {
        schemaLocationSegments.push("properties");
    }

    schemaLocationSegments.push(dataLocation);

    if ((Array.isArray(data) || checkDataLocationIsArrayItem(dataLocation)) && endOfContainingString) {
        schemaLocationSegments.push("items");
    }

    return schemaLocationSegments;
}

/**
 * Checks to see if the data location item is an array item
 */
export function checkDataLocationIsArrayItem(dataLocationItem: string): boolean {
    const squareBracketRegex: RegExp = getRegex(RegexType.squareBracket);
    const match: boolean = false;

    if (dataLocationItem.match(squareBracketRegex)) {
        const matches: string[] = dataLocationItem.match(squareBracketRegex);

        if (typeof parseInt(matches[0].replace(squareBracketRegex, "$1"), 10) === "number") {
            return true;
        }
    }

    return match;
}

/**
 * Converts a data location strings array items into bracket notation
 */
export function convertArrayItemsToBracketNotation(dataLocation: string, data: any): string {
    const normalizedDataLocation: string[] = [];
    const dataLocations: string[] = dataLocation.split(".");
    const currentDataLocations: string[] = [];

    for (let i: number = 0; i < dataLocations.length; i++) {
        currentDataLocations.push(dataLocations[i]);
        const currentDataLocation: string = currentDataLocations.join(".");

        if (Array.isArray(get(currentDataLocation, data))) {
            normalizedDataLocation.push(`${dataLocations[i]}[${dataLocations[i + 1]}]`);
            i++;
        } else {
            normalizedDataLocation.push(dataLocations[i]);
        }
    }

    return normalizedDataLocation.join(".");
}

/**
 * Gets the index from a JSON schemas oneOf/anyOf array that validates against the data
 */
export function getValidAnyOfOneOfIndex(oneOfAnyOf: string, data: any, schema: any): number {
    let validIndex: number;

    schema[oneOfAnyOf].forEach((oneOfAnyOfItem: any, index: number) => {
        if (tv4.validate(data, oneOfAnyOfItem)) {
            validIndex = index;
        }
    });

    return validIndex;
}

/**
 * Check to see if we are on the root location
 */
export function isRootLocation(location: string): boolean {
    return location === "";
}

export function getComponentTrackerByLocation(props: IFormProps, rootLocation: IComponentItem): IComponentItem[] {
    return typeof props.location !== "undefined" // Location has been passed
        ? getComponentTracker(props.location.schemaLocation, props.location.dataLocation, props.schema, [rootLocation])
        : [rootLocation];
}
