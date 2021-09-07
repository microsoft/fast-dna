/**
 * This file is generated from build/generate-mdn-data-files.js
 * any modifications will be overwritten.
 *
 * Last modified: 9/3/2021
 */
export const properties = {
    "align-content": {
        "name": "align-content",
        "appliesTo": "multilineFlexContainers",
        "syntax": {
            "mapsToProperty": "align-content",
            "percentages": "no",
            "ref": [
                {
                    "ref": "normal",
                    "type": "value",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "<baseline-position>",
                    "type": "syntax",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "<content-distribution>",
                    "type": "syntax",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": [
                        {
                            "ref": "<overflow-position>",
                            "type": "syntax",
                            "refCombinatorType": "none",
                            "prepend": null,
                            "multiplier": null
                        },
                        {
                            "ref": "<content-position>",
                            "type": "syntax",
                            "refCombinatorType": "none",
                            "prepend": null,
                            "multiplier": null
                        }
                    ],
                    "refCombinatorType": "juxtaposition",
                    "type": "group",
                    "prepend": null,
                    "multiplier": null
                }
            ],
            "refCombinatorType": "exactlyOne",
            "multiplier": null,
            "prepend": null,
            "type": "mixed"
        }
    },
    "align-items": {
        "name": "align-items",
        "appliesTo": "allElements",
        "syntax": {
            "mapsToProperty": "align-items",
            "percentages": "no",
            "ref": [
                {
                    "ref": "normal",
                    "type": "value",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "stretch",
                    "type": "value",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "<baseline-position>",
                    "type": "syntax",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": [
                        {
                            "ref": "<overflow-position>",
                            "type": "syntax",
                            "refCombinatorType": "none",
                            "prepend": null,
                            "multiplier": null
                        },
                        {
                            "ref": "<self-position>",
                            "type": "syntax",
                            "refCombinatorType": "none",
                            "prepend": null,
                            "multiplier": null
                        }
                    ],
                    "refCombinatorType": "juxtaposition",
                    "type": "group",
                    "prepend": null,
                    "multiplier": null
                }
            ],
            "refCombinatorType": "exactlyOne",
            "multiplier": null,
            "prepend": null,
            "type": "mixed"
        }
    },
    "background-color": {
        "name": "background-color",
        "appliesTo": "allElements",
        "syntax": {
            "mapsToProperty": "background-color",
            "percentages": "no",
            "ref": "<color>",
            "type": "syntax",
            "refCombinatorType": "none",
            "prepend": null,
            "multiplier": null
        }
    },
    "column-gap": {
        "name": "column-gap",
        "appliesTo": "multiColumnElementsFlexContainersGridContainers",
        "syntax": {
            "mapsToProperty": "column-gap",
            "percentages": "referToDimensionOfContentArea",
            "ref": [
                {
                    "ref": "normal",
                    "type": "value",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "<length-percentage>",
                    "type": "syntax",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                }
            ],
            "refCombinatorType": "exactlyOne",
            "multiplier": null,
            "prepend": null,
            "type": "syntax"
        }
    },
    "display": {
        "name": "display",
        "appliesTo": "allElements",
        "syntax": {
            "mapsToProperty": "display",
            "percentages": "no",
            "ref": [
                {
                    "ref": [
                        {
                            "ref": "<display-outside>",
                            "type": "syntax",
                            "refCombinatorType": "none",
                            "prepend": null,
                            "multiplier": null
                        },
                        {
                            "ref": "<display-inside>",
                            "type": "syntax",
                            "refCombinatorType": "none",
                            "prepend": null,
                            "multiplier": null
                        }
                    ],
                    "refCombinatorType": "atLeastOneInAnyOrder",
                    "type": "group",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "<display-listitem>",
                    "type": "syntax",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "<display-internal>",
                    "type": "syntax",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "<display-box>",
                    "type": "syntax",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "<display-legacy>",
                    "type": "syntax",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                }
            ],
            "refCombinatorType": "exactlyOne",
            "multiplier": null,
            "prepend": null,
            "type": "mixed"
        }
    },
    "flex-direction": {
        "name": "flex-direction",
        "appliesTo": "flexContainers",
        "syntax": {
            "mapsToProperty": "flex-direction",
            "percentages": "no",
            "ref": [
                {
                    "ref": "row",
                    "type": "value",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "row-reverse",
                    "type": "value",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "column",
                    "type": "value",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "column-reverse",
                    "type": "value",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                }
            ],
            "refCombinatorType": "exactlyOne",
            "multiplier": null,
            "prepend": null,
            "type": "mixed"
        }
    },
    "flex-wrap": {
        "name": "flex-wrap",
        "appliesTo": "flexContainers",
        "syntax": {
            "mapsToProperty": "flex-wrap",
            "percentages": "no",
            "ref": [
                {
                    "ref": "nowrap",
                    "type": "value",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "wrap",
                    "type": "value",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "wrap-reverse",
                    "type": "value",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                }
            ],
            "refCombinatorType": "exactlyOne",
            "multiplier": null,
            "prepend": null,
            "type": "mixed"
        }
    },
    "justify-content": {
        "name": "justify-content",
        "appliesTo": "flexContainers",
        "syntax": {
            "mapsToProperty": "justify-content",
            "percentages": "no",
            "ref": [
                {
                    "ref": "normal",
                    "type": "value",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "<content-distribution>",
                    "type": "syntax",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": [
                        {
                            "ref": "<overflow-position>",
                            "type": "syntax",
                            "refCombinatorType": "none",
                            "prepend": null,
                            "multiplier": {
                                "type": "zeroOrOne"
                            }
                        },
                        {
                            "ref": [
                                {
                                    "ref": "<content-position>",
                                    "type": "syntax",
                                    "refCombinatorType": "none",
                                    "prepend": null,
                                    "multiplier": null
                                },
                                {
                                    "ref": "left",
                                    "type": "value",
                                    "refCombinatorType": "none",
                                    "prepend": null,
                                    "multiplier": null
                                },
                                {
                                    "ref": "right",
                                    "type": "value",
                                    "refCombinatorType": "none",
                                    "prepend": null,
                                    "multiplier": null
                                }
                            ],
                            "refCombinatorType": "juxtaposition",
                            "type": "group",
                            "prepend": null,
                            "multiplier": null
                        }
                    ],
                    "refCombinatorType": "juxtaposition",
                    "type": "group",
                    "prepend": null,
                    "multiplier": null
                }
            ],
            "refCombinatorType": "exactlyOne",
            "multiplier": null,
            "prepend": null,
            "type": "mixed"
        }
    },
    "row-gap": {
        "name": "row-gap",
        "appliesTo": "multiColumnElementsFlexContainersGridContainers",
        "syntax": {
            "mapsToProperty": "row-gap",
            "percentages": "referToDimensionOfContentArea",
            "ref": [
                {
                    "ref": "normal",
                    "type": "value",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "<length-percentage>",
                    "type": "syntax",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                }
            ],
            "refCombinatorType": "exactlyOne",
            "multiplier": null,
            "prepend": null,
            "type": "syntax"
        }
    },
    "width": {
        "name": "width",
        "appliesTo": "allElementsButNonReplacedAndTableRows",
        "syntax": {
            "mapsToProperty": "width",
            "percentages": "referToWidthOfContainingBlock",
            "ref": [
                {
                    "ref": "auto",
                    "type": "value",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "<length>",
                    "type": "type",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "<percentage>",
                    "type": "type",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "min-content",
                    "type": "value",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "max-content",
                    "type": "value",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "fit-content",
                    "type": "value",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                },
                {
                    "ref": "<length-percentage>",
                    "type": "syntax",
                    "refCombinatorType": "none",
                    "prepend": null,
                    "multiplier": null
                }
            ],
            "refCombinatorType": "exactlyOne",
            "multiplier": null,
            "prepend": null,
            "type": "mixed"
        }
    }
}