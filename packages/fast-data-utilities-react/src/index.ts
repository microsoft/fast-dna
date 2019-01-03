import * as React from "react";
import { cloneDeep, get, isPlainObject, set } from "lodash-es";
import * as tv4 from "tv4";
import Plugin, { PluginProps } from "./plugin";

const pluginResolverIdKeyword: string = "pluginResolverId";
const typeKeyword: string = "type";
const squareBracketsRegex: RegExp = /\[(\d+?)\]/g;
const propsKeyword: string = "props";

export enum DataResolverType {
    plugin = "plugin",
    component = "component",
}

export enum PropertyKeyword {
    properties = "properties",
    reactProperties = "reactProperties",
}

export interface ChildOptionItem {
    /**
     * The name of the component
     */
    name?: string;

    /**
     * The React component
     */
    component: React.ComponentType;

    /**
     * The JSON schema for the component
     */
    schema: any;
}

export interface DataResolver {
    /**
     * The method for resolving the data
     */
    type: DataResolverType;

    /**
     * The data location to resolve
     */
    dataLocation: string;
}

export interface PluginLocation {
    /**
     * The data location of the data
     * to be interpreted by the plugin
     */
    dataLocation: string;

    /**
     * The schema related to the data location
     */
    schema: any;
}

/**
 * Gets data from a data and location
 */
export function getPartialData(location: string, data: any): any {
    return location === "" ? data : get(data, location);
}

/**
 * Converts all property locations to dot notation and all array item references to bracket notation
 */
export function normalizeDataLocation(dataLocation: string, data: any): string {
    const normalizedDataLocation: string = dataLocation.replace(
        squareBracketsRegex,
        `.$1`
    ); // convert all [ ] to . notation
    return arrayItemsToBracketNotation(normalizedDataLocation, data); // convert back all array items to use [ ]
}

/**
 * Converts a data location strings array items into bracket notation
 */
function arrayItemsToBracketNotation(dataLocation: string, data: any): string {
    const normalizedDataLocation: string[] = [];
    const dataLocations: string[] = dataLocation.split(".");

    for (let i: number = 0; i < dataLocations.length; i++) {
        const currentDataLocation: string = dataLocations.slice(0, i + 1).join(".");
        const subData: any = get(data, currentDataLocation);

        // if the data is an array and not a react property
        if (Array.isArray(subData) && dataLocations[i + 1] !== undefined) {
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
function getValidAnyOfOneOfIndex(oneOfAnyOf: string, data: any, schema: any): number {
    return schema[oneOfAnyOf].findIndex((item: any): number => tv4.validate(data, item));
}

/**
 * Gets an array of oneOf/anyOf with a valid index from a schema and data
 */
function getSchemaOneOfAnyOfLocationSegments(schema: any, data: any): string[] {
    const schemaLocationSegments: string[] = [];

    if (typeof schema === "undefined") {
        return schemaLocationSegments;
    }

    if (!!schema.anyOf) {
        schemaLocationSegments.push(
            `anyOf.${getValidAnyOfOneOfIndex("anyOf", data, schema)}`
        );
    }

    if (!!schema.oneOf) {
        schemaLocationSegments.push(
            `oneOf.${getValidAnyOfOneOfIndex("oneOf", data, schema)}`
        );
    }

    return schemaLocationSegments;
}

/**
 * Gets the correct property keyword
 */
function getObjectPropertyKeyword(schema: any): PropertyKeyword {
    if (!!schema) {
        return PropertyKeyword.reactProperties;
    } else {
        return PropertyKeyword.properties;
    }
}

/**
 * Removes any references to array index
 */
function normalizeSchemaLocation(schemaLocation: string): string {
    return schemaLocation.replace(squareBracketsRegex, "");
}

/**
 * Checks to see if the data location item is an array item
 */
function isDataLocationArrayItem(dataLocationItem: string): boolean {
    const squareBracketRegex: RegExp = squareBracketsRegex;
    const match: boolean = false;

    if (dataLocationItem.match(squareBracketRegex)) {
        const matches: string[] = dataLocationItem.match(squareBracketRegex);

        if (
            typeof parseInt(matches[0].replace(squareBracketRegex, "$1"), 10) === "number"
        ) {
            return true;
        }
    }

    return match;
}

/**
 * Get an array of schema location strings from a single data location item
 */
function getSchemaLocationSegmentsFromDataLocationSegment(
    dataLocation: string,
    schema: any,
    data: any
): string[] {
    const schemaLocationSegments: string[] = [];
    const normalizedDataLocationForArrayRemoval: string = dataLocation.replace(
        /\[\d+\]/g,
        ""
    );
    const subSchema: any = get(
        schema,
        `${PropertyKeyword.reactProperties}.${normalizedDataLocationForArrayRemoval}`
    );
    const isChildren: boolean = subSchema && subSchema.type === "children";

    if (isPlainObject(data)) {
        schemaLocationSegments.push(getObjectPropertyKeyword(subSchema));
    }

    schemaLocationSegments.push(
        isChildren ? normalizedDataLocationForArrayRemoval : dataLocation
    );

    // In the case that this is an array and not an array of children,
    // add the JSON schema "items" keyword
    if (isDataLocationArrayItem(dataLocation) && !isChildren) {
        schemaLocationSegments.push("items");
    }

    return schemaLocationSegments;
}

/**
 * Get an array of schema location strings from an array of data location strings
 */
function getSchemaLocationSegmentsFromDataLocationSegments(
    dataLocationSegments: string[],
    schema: any,
    data: any
): string[] {
    let schemaLocationSegments: string[] = getSchemaOneOfAnyOfLocationSegments(
        schema,
        data
    );

    for (let i: number = 0; i < dataLocationSegments.length; i++) {
        const partialData: any = getPartialData(
            dataLocationSegments.slice(0, i).join("."),
            data
        );
        const partialSchema: any = getPartialData(
            normalizeSchemaLocation(schemaLocationSegments.join(".")),
            schema
        );

        schemaLocationSegments = schemaLocationSegments.concat(
            getSchemaOneOfAnyOfLocationSegments(partialSchema, partialData)
        );

        schemaLocationSegments = schemaLocationSegments.concat(
            getSchemaLocationSegmentsFromDataLocationSegment(
                dataLocationSegments[i],
                partialSchema,
                partialData
            )
        );
    }

    return schemaLocationSegments;
}

/**
 * Creates a schema location from a data location
 */
export function mapSchemaLocationFromDataLocation(
    dataLocation: string,
    data: any,
    schema: any
): string {
    if (dataLocation === "") {
        return "";
    }

    const normalizedDataLocation: string = normalizeDataLocation(dataLocation, data);
    const dataLocationSegments: string[] = normalizedDataLocation.split(".");
    const schemaLocationSegments: string[] = getSchemaLocationSegmentsFromDataLocationSegments(
        dataLocationSegments,
        schema,
        data
    );

    return normalizeSchemaLocation(schemaLocationSegments.join("."));
}

/**
 * Finds the locations throughout an object
 */
function getLocationsFromObject(data: any, location: string = ""): string[] {
    let updatedLocations: string[] = [];

    if (typeof data === "string" || data === null || data === undefined) {
        return updatedLocations;
    }

    Object.keys(data).forEach((key: string) => {
        const newLocation: string = location === "" ? key : `${location}.${key}`;
        const dataSubset: any = get(data, key);
        updatedLocations.push(newLocation);

        if (typeof dataSubset === "object" && dataSubset !== null) {
            updatedLocations = updatedLocations.concat(
                getLocationsFromObject(dataSubset, newLocation)
            );
        }
    });

    return updatedLocations;
}

/**
 * Callback to determine if a string is found within an array of plugin locations
 */
function pluginPartialFindIndexCallback(location: string): any {
    return (locationItem: PluginLocation): boolean => {
        return location.includes(locationItem.dataLocation);
    };
}

/**
 * Finds the data locations of types mapped to plugins
 */
export function getDataLocationsOfPlugins(
    schema: any,
    data: any,
    childOptions: ChildOptionItem[],
    dataLocationPrefix: string = ""
): PluginLocation[] {
    let dataLocationsOfPlugins: PluginLocation[] = [];

    // get all data locations
    const dataLocations: string[] = getLocationsFromObject(data).concat([""]);

    // determine if the data location is mapped to a plugin
    dataLocations.forEach(
        (dataLocation: string): void => {
            const schemaLocation: string = mapSchemaLocationFromDataLocation(
                dataLocation,
                data,
                schema
            );
            const subSchema: any =
                schemaLocation === "" ? schema : get(schema, schemaLocation);
            const dataLocationOfPlugin: string =
                dataLocationPrefix === ""
                    ? dataLocation
                    : `${dataLocationPrefix}.${propsKeyword}.${dataLocation}`;

            // check to see if the data location matches with the current schema and includes a plugin identifier
            if (
                typeof get(subSchema, pluginResolverIdKeyword) === "string" &&
                dataLocationsOfPlugins.findIndex(
                    pluginPartialFindIndexCallback(dataLocationOfPlugin)
                ) === -1
            ) {
                dataLocationsOfPlugins.push({
                    schema,
                    dataLocation: dataLocationOfPlugin,
                });
            }

            // check to see if this is a child
            if (
                get(
                    schema,
                    `${
                        schemaLocation === ""
                            ? typeKeyword
                            : `${schemaLocation}.${typeKeyword}`
                    }`
                ) === "children"
            ) {
                // resolve the child id with a child option
                const childOption: ChildOptionItem = getChildOptionBySchemaId(
                    get(data, dataLocation).id,
                    childOptions
                );
                const updatedDataLocationPrefix: string =
                    dataLocationPrefix === ""
                        ? dataLocation
                        : `${dataLocationPrefix}.${propsKeyword}.${dataLocation}`;

                if (childOption !== undefined) {
                    dataLocationsOfPlugins = dataLocationsOfPlugins.concat(
                        getDataLocationsOfPlugins(
                            childOption.schema,
                            get(data, `${dataLocation}.${propsKeyword}`),
                            childOptions,
                            updatedDataLocationPrefix
                        )
                    );
                }
            }
        }
    );

    return dataLocationsOfPlugins;
}

/**
 * Finds the data locations of children
 */
export function getDataLocationsOfChildren(
    schema: any,
    data: any,
    childOptions: ChildOptionItem[]
): string[] {
    // get all schema locations from the schema
    const schemaLocations: string[] = getLocationsFromObject(schema);

    // get all data locations from the data
    const dataLocations: string[] = getLocationsFromObject(data);

    // get all schema locations from data locations
    const schemaLocationsFromDataLocations: string[] = dataLocations.map(
        (dataLocation: string): string => {
            return mapSchemaLocationFromDataLocation(dataLocation, data, schema);
        }
    );

    // get all data type locations as schema locations
    const dataTypeLocationsAsSchemaLocations: string[] = schemaLocations.filter(
        (dataTypeLocation: string) => {
            return !!schemaLocationsFromDataLocations.find(
                (schemaLocationsFromDataLocation: string): boolean => {
                    return dataTypeLocation === schemaLocationsFromDataLocation;
                }
            );
        }
    );

    const dataLocationsOfDataType: string[] = [];

    // get all data type locations as data locations
    dataLocations.forEach((dataLocation: string) => {
        if (
            !!dataTypeLocationsAsSchemaLocations.find(
                (dataTypeLocationsAsSchemaLocation: string) => {
                    return (
                        mapSchemaLocationFromDataLocation(dataLocation, data, schema) ===
                        dataTypeLocationsAsSchemaLocation
                    );
                }
            ) &&
            !Array.isArray(get(data, dataLocation))
        ) {
            dataLocationsOfDataType.push(dataLocation);
        }
    });

    // for every location get nested data locations of data type
    dataLocationsOfDataType.forEach((dataLocationOfDataType: string) => {
        const dataLocation: string = `${dataLocationOfDataType}.${propsKeyword}`;
        const subData: any = get(data, dataLocation);
        const nestedDataLocationsOfDataType: string[] = getDataLocationsOfChildren(
            schema,
            subData,
            childOptions
        );

        nestedDataLocationsOfDataType.forEach((nestedDataLocationOfDataType: string) => {
            dataLocationsOfDataType.push(
                `${dataLocation}.${nestedDataLocationOfDataType}`
            );
        });
    });

    return dataLocationsOfDataType.map((dataLocationOfDataType: string) => {
        return arrayItemsToBracketNotation(dataLocationOfDataType, data);
    });
}

/**
 * Maps data returned from the form generator to the React components
 */
export function mapDataToComponent(
    schema: any,
    data: any,
    childOptions: ChildOptionItem[],
    plugins?: Array<Plugin<PluginProps>>
): any {
    const mappedData: any = cloneDeep(data);

    // find locations of all items of data that are react children
    let reactChildrenDataLocations: string[] = getDataLocationsOfChildren(
        schema,
        mappedData,
        childOptions
    );

    // organize by length using split "."
    reactChildrenDataLocations.sort(orderChildrenByDataLocation);

    // find locations of all items of data that are overridden by mappings
    const pluginModifiedDataLocations: PluginLocation[] = getDataLocationsOfPlugins(
        schema,
        mappedData,
        childOptions
    );

    // remove any children data locations from plugin modified locations
    reactChildrenDataLocations = reactChildrenDataLocations.map(
        (reactChildrenDataLocation: string): string => {
            if (
                pluginModifiedDataLocations.findIndex(
                    pluginPartialFindIndexCallback(reactChildrenDataLocation)
                ) === -1
            ) {
                return reactChildrenDataLocation;
            }
        }
    );

    // going from the longest length to the shortest, resolve the data with plugins
    pluginModifiedDataLocations.forEach(
        (pluginModifiedDataLocation: PluginLocation): void => {
            const pluginModifiedSchemaLocation: string = mapSchemaLocationFromDataLocation(
                pluginModifiedDataLocation.dataLocation,
                data,
                schema
            );
            const pluginResolverId: string = get(
                pluginModifiedDataLocation.schema,
                `${pluginModifiedSchemaLocation}.${pluginResolverIdKeyword}`
            );
            const pluginResolver: Plugin<PluginProps> = plugins.find(
                (plugin: Plugin<PluginProps>): boolean => {
                    return plugin.resolvesForId(pluginResolverId);
                }
            );

            set(
                mappedData,
                pluginModifiedDataLocation.dataLocation,
                pluginResolver.resolver(
                    get(data, pluginModifiedDataLocation.dataLocation),
                    getChildOptionBySchemaId(
                        pluginModifiedDataLocation.schema.id,
                        childOptions
                    )
                )
            );
        }
    );

    // going from the longest length to shortest, resolve the data with the new child options as createElement
    reactChildrenDataLocations.forEach(
        (reactChildrenDataLocation: string, index: number) => {
            const subSchemaId: string = get(
                mappedData,
                `${reactChildrenDataLocation}.id`
            );
            const subData: any = get(mappedData, reactChildrenDataLocation);
            const isChildString: boolean = typeof subData === "string";
            const subDataNormalized: any = isChildString
                ? subData
                : get(subData, propsKeyword);
            const childOption: ChildOptionItem = getChildOptionBySchemaId(
                subSchemaId,
                childOptions
            );

            if (!isChildString) {
                let value: any;

                if (!childOption) {
                    value = Object.assign(
                        { id: subSchemaId },
                        React.createElement(
                            React.Fragment,
                            { key: `${subSchemaId}-${index}` },
                            subDataNormalized
                        )
                    );
                } else {
                    value = Object.assign(
                        { id: subSchemaId },
                        React.createElement(childOption.component, {
                            key: `${subSchemaId}-${index}`,
                            ...subDataNormalized,
                        })
                    );
                }

                set(mappedData, reactChildrenDataLocation, value);
            }
        }
    );

    return mappedData;
}

/**
 * Finds the child option using the schema id
 */
export function getChildOptionBySchemaId(
    id: string,
    childOptions: ChildOptionItem[]
): ChildOptionItem | undefined {
    return childOptions.find((childOption: ChildOptionItem) => {
        return childOption.schema.id === id;
    });
}

/**
 * Used as a sort compare function
 * see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort
 */
function orderChildrenByDataLocation(
    firstLocation: string,
    secondLocation: string
): number {
    const firstLocationLength: number = firstLocation.split(".").length;
    const secondLocationLength: number = secondLocation.split(".").length;

    if (firstLocationLength > secondLocationLength) {
        return -1;
    } else if (firstLocationLength < secondLocationLength) {
        return 1;
    }

    return 0;
}

export { Plugin, PluginProps };
