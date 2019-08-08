import React from "react";
import ReactDOM from "react-dom";
import { get } from "lodash-es";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import {
    CardHandledProps,
    CardManagedClasses,
    CardProps,
    CardTag,
    CardUnhandledProps,
} from "./card.props";
import {
    CardClassNameContract,
    ManagedClasses,
} from "@microsoft/fast-components-class-name-contracts-base";
import { DisplayNamePrefix } from "../utilities";
import { classNames } from "@microsoft/fast-web-utilities";

class Card extends Foundation<CardHandledProps, CardUnhandledProps, {}> {
    public static displayName: string = `${DisplayNamePrefix}Card`;
    public static defaultProps: Partial<CardProps> = {
        managedClasses: {},
    };

    protected handledProps: HandledProps<CardHandledProps> = {
        children: void 0,
        managedClasses: void 0,
        tag: void 0,
    };

    /**
     * Renders the component
     */
    public render(): React.ReactElement<HTMLDivElement | HTMLElement> {
        return (
            <this.tag {...this.unhandledProps()} className={this.generateClassNames()}>
                {this.props.children}
            </this.tag>
        );
    }

    /**
     * Generates class names
     */
    protected generateClassNames(): string {
        return super.generateClassNames(classNames(this.props.managedClasses.card));
    }

    /**
     * Stores HTML tag for use in render
     */
    private get tag(): any {
        return CardTag[this.props.tag] || CardTag.div;
    }
}

export default Card;
export * from "./card.props";
export { CardClassNameContract };
