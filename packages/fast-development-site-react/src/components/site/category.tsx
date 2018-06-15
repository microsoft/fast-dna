import * as React from "react";
import { Link } from "react-router-dom";

export interface ISiteCategoryProps {
    slot: string;
    name: string;
    component?: any;
    schema?: any;
    status?: Status;
}

export enum Status {
    complete = "Complete",
    inProgress = "In Progress",
    underConsideration = "Under Consideration"
}

class SiteCategory extends React.Component<ISiteCategoryProps, {}> {
    public render(): JSX.Element {
        return (
            <React.Fragment>
                {this.props.children}
            </React.Fragment>
        );
    }
}

export default SiteCategory;
