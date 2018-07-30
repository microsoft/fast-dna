import * as React from "react";
import { ISnapshotTestSuite } from "@microsoft/fast-jest-snapshots-react";
import { IManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";
import HorizontalOverflow, {
    IHorizontalOverflowHandledProps,
    IHorizontalOverflowManagedClasses,
    IHorizontalOverflowUnhandledProps
} from "./horizontal-overflow";
import schema from "./horizontal-overflow.schema.json";
import Documentation from "./.tmp/documentation";
import Button from "../button";
import Image from "../image";

const examples: ISnapshotTestSuite<IHorizontalOverflowHandledProps & IHorizontalOverflowManagedClasses> = {
    name: "Horizontal overflow",
    component: HorizontalOverflow,
    schema: schema as any,
    documentation: <Documentation />,
    detailData: {
        managedClasses: {
            horizontalOverflow: "horizonta-overflow",
            horizontalOverflow_items: "horizontal-overflow_items",
            horizontalOverflow_next: "horizontal-overflow_next",
            horizontalOverflow_previous: "horizontal-overflow_previous"
        },
        children: [
            (<Button managedClasses={{button: "button"}} slot="previous">previous</Button>),
            (<Button managedClasses={{button: "button"}} slot="next">next</Button>),
            (<Image managedClasses={{image: "image"}} src="https://placehold.it/120x100/414141/?text=1" alt="placeholder image" />),
            (<Image managedClasses={{image: "image"}} src="https://placehold.it/180x100?text=2" alt="placeholder image" />),
            (<Image managedClasses={{image: "image"}} src="https://placehold.it/240x100/414141/?text=3" alt="placeholder image" />),
            (<Image managedClasses={{image: "image"}} src="https://placehold.it/120x100?text=4" alt="placeholder image" />),
            (<Image managedClasses={{image: "image"}} src="https://placehold.it/140x100/414141/?text=5" alt="placeholder image" />),
            (<Image managedClasses={{image: "image"}} src="https://placehold.it/200x100?text=6" alt="placeholder image" />),
            (<Image managedClasses={{image: "image"}} src="https://placehold.it/220x100/414141/?text=7" alt="placeholder image" />),
            (<Image managedClasses={{image: "image"}} src="https://placehold.it/170x100?text=8" alt="placeholder image" />),
            (<Image managedClasses={{image: "image"}} src="https://placehold.it/160x100/414141/?text=9" alt="placeholder image" />),
            (<Image managedClasses={{image: "image"}} src="https://placehold.it/240x100?text=10" alt="placeholder image" />),
            (<Image managedClasses={{image: "image"}} src="https://placehold.it/110x100/414141/?text=11" alt="placeholder image" />),
            (<Image managedClasses={{image: "image"}} src="https://placehold.it/270x100?text=12" alt="placeholder image" />)
        ]
    },
    data: [
        {
            managedClasses: {
                horizontalOverflow: "horizonta-overflow",
                horizontalOverflow_items: "horizontal-overflow_items",
                horizontalOverflow_next: "horizontal-overflow_next",
                horizontalOverflow_previous: "horizontal-overflow_previous"
            },
            children: [
                (<Button managedClasses={{button: "button"}} slot="previous">previous</Button>),
                (<Button managedClasses={{button: "button"}} slot="next">next</Button>),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/120x100/414141/?text=1" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/180x100?text=2" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/240x100/414141/?text=3" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/120x100?text=4" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/140x100/414141/?text=5" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/200x100?text=6" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/220x100/414141/?text=7" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/170x100?text=8" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/160x100/414141/?text=9" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/240x100?text=10" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/110x100/414141/?text=11" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/270x100?text=12" alt="placeholder image" />)
            ]
        },
        {
            managedClasses: {
                horizontalOverflow: "horizonta-overflow",
                horizontalOverflow_items: "horizontal-overflow_items",
                horizontalOverflow_next: "horizontal-overflow_next",
                horizontalOverflow_previous: "horizontal-overflow_previous"
            },
            children: [
                (<Button managedClasses={{button: "button"}} slot="next">next</Button>),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/120x100/414141/?text=1" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/180x100?text=2" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/240x100/414141/?text=3" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/120x100?text=4" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/140x100/414141/?text=5" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/200x100?text=6" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/220x100/414141/?text=7" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/170x100?text=8" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/160x100/414141/?text=9" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/240x100?text=10" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/110x100/414141/?text=11" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/270x100?text=12" alt="placeholder image" />)
            ]
        },
        {
            managedClasses: {
                horizontalOverflow: "horizonta-overflow",
                horizontalOverflow_items: "horizontal-overflow_items",
                horizontalOverflow_next: "horizontal-overflow_next",
                horizontalOverflow_previous: "horizontal-overflow_previous"
            },
            children: [
                (<Button managedClasses={{button: "button"}} slot="previous">previous</Button>),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/120x100/414141/?text=1" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/180x100?text=2" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/240x100/414141/?text=3" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/120x100?text=4" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/140x100/414141/?text=5" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/200x100?text=6" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/220x100/414141/?text=7" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/170x100?text=8" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/160x100/414141/?text=9" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/240x100?text=10" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/110x100/414141/?text=11" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/270x100?text=12" alt="placeholder image" />)
            ]
        },
        {
            managedClasses: {
                horizontalOverflow: "horizonta-overflow",
                horizontalOverflow_items: "horizontal-overflow_items",
                horizontalOverflow_next: "horizontal-overflow_next",
                horizontalOverflow_previous: "horizontal-overflow_previous"
            },
            children: [
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/120x100/414141/?text=1" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/180x100?text=2" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/240x100/414141/?text=3" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/120x100?text=4" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/140x100/414141/?text=5" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/200x100?text=6" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/220x100/414141/?text=7" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/170x100?text=8" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/160x100/414141/?text=9" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/240x100?text=10" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/110x100/414141/?text=11" alt="placeholder image" />),
                (<Image managedClasses={{image: "image"}} src="https://placehold.it/270x100?text=12" alt="placeholder image" />)
            ]
        },
        {
            managedClasses: {
                horizontalOverflow: "horizonta-overflow",
                horizontalOverflow_items: "horizontal-overflow_items",
                horizontalOverflow_next: "horizontal-overflow_next",
                horizontalOverflow_previous: "horizontal-overflow_previous"
            }
        }
    ]
};

export default examples;
