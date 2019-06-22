import { ManagedClasses } from "@microsoft/fast-components-class-name-contracts-base";
import { ExplorerClassNameContract } from "./explorer.style";
import { Direction } from "@microsoft/fast-web-utilities";

/**
 * The properties of a component
 */
export interface ComponentProps<T> {
    id: string;
    props: T;
}

/**
 * The view config
 */
export interface ViewConfig {
    direction: Direction;
}

/* tslint:disable-next-line */
export interface ExplorerManagedClasses
    extends ManagedClasses<ExplorerClassNameContract> {}

/* tslint:disable-next-line */
export interface ExplorerHandledProps extends ExplorerManagedClasses {}

/* tslint:disable-next-line */
export interface ExplorerProps extends ExplorerHandledProps {}

/* tslint:disable-next-line */
export interface ExplorerState {
    /**
     * The current data location
     */
    dataLocation: string;

    /**
     * The width of the preview
     */
    width: number;

    /**
     * The height of the preview
     */
    height: number;

    /**
     * The scenario
     */
    scenario: ComponentProps<unknown> | void;

    /**
     * The configuration for the view
     */
    viewConfig: ViewConfig;
}
