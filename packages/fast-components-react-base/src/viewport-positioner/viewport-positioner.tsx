import React from "react";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { get, isNil } from "lodash-es";
import { ViewportPositionerClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import {
    AxisPositioningMode,
    ViewportPositionerHandledProps,
    ViewportPositionerHorizontalPosition,
    ViewportPositionerProps,
    ViewportPositionerUnhandledProps,
    ViewportPositionerVerticalPosition,
} from "./viewport-positioner.props";
import {
    IntersectionObserverEntry,
    ResizeObserverClassDefinition,
    ResizeObserverEntry,
} from "../utilities";
import { DisplayNamePrefix } from "../utilities";
import { canUseDOM } from "exenv-es6";

export interface ViewportPositionerState {
    disabled: boolean;

    /**
     * Indicates that the component is unable to react to viewport changes and only places the
     * positioner in the default position on mount.
     */
    noOberverMode: boolean;

    /**
     * values to be applied to the component's transform origin attribute on render
     */
    xTransformOrigin: string;
    yTransformOrigin: string;

    /**
     * values to be applied to the component's translate transform attribute on render
     */
    xTranslate: number;
    yTranslate: number;

    /**
     * values to be applied to the component's positioning attributes on render
     */
    top: number;
    right: number;
    bottom: number;
    left: number;

    /**
     * the positions currently being applied to layout
     */
    currentVerticalPosition: ViewportPositionerVerticalPositionLabel;
    currentHorizontalPosition: ViewportPositionerHorizontalPositionLabel;

    /**
     * the default positions based on default position and positioning mode props
     */
    defaultVerticalPosition: ViewportPositionerVerticalPositionLabel;
    defaultHorizontalPosition: ViewportPositionerHorizontalPositionLabel;

    /**
     * indicates that an initial positioning pass on layout has completed
     */
    initialLayoutComplete: boolean;
}

export enum ViewportPositionerHorizontalPositionLabel {
    left = "left",
    insetLeft = "insetLeft",
    insetRight = "insetRight",
    right = "right",
    undefined = "undefined",
}

export enum ViewportPositionerVerticalPositionLabel {
    top = "top",
    insetTop = "insetTop",
    insetBottom = "insetBottom",
    bottom = "bottom",
    undefined = "undefined",
}

/**
 * location enum for transform origin settings
 */
export enum Location {
    top = "top",
    left = "left",
    right = "right",
    bottom = "bottom",
}

class ViewportPositioner extends Foundation<
    ViewportPositionerHandledProps,
    ViewportPositionerUnhandledProps,
    ViewportPositionerState
> {
    public static displayName: string = `${DisplayNamePrefix}ViewportPositioner`;

    public static defaultProps: Partial<ViewportPositionerProps> = {
        horizontalPositioningMode: AxisPositioningMode.uncontrolled,
        defaultHorizontalPosition: ViewportPositionerHorizontalPosition.uncontrolled,
        verticalPositioningMode: AxisPositioningMode.adjacent,
        defaultVerticalPosition: ViewportPositionerVerticalPosition.bottom,
        horizontalAlwaysInView: false,
        verticalAlwaysInView: false,
        fixedAfterInitialPlacement: false,
    };

    protected handledProps: HandledProps<ViewportPositionerHandledProps> = {
        managedClasses: void 0,
        anchor: void 0,
        viewport: void 0,
        horizontalPositioningMode: void 0,
        defaultHorizontalPosition: void 0,
        horizontalThreshold: void 0,
        horizontalAlwaysInView: void 0,
        verticalPositioningMode: void 0,
        defaultVerticalPosition: void 0,
        verticalThreshold: void 0,
        verticalAlwaysInView: void 0,
        fixedAfterInitialPlacement: void 0,
        disabled: void 0,
    };

    private rootElement: React.RefObject<HTMLDivElement> = React.createRef<
        HTMLDivElement
    >();

    private openRequestAnimationFrame: number = null;

    private collisionDetector: IntersectionObserver;
    private resizeDetector: ResizeObserverClassDefinition;

    private viewportRect: ClientRect | DOMRect;
    private positionerRect: ClientRect | DOMRect;
    private anchorTop: number = 0;
    private anchorRight: number = 0;
    private anchorBottom: number = 0;
    private anchorLeft: number = 0;
    private anchorHeight: number = 0;
    private anchorWidth: number = 0;

    private scrollTop: number = 0;
    private scrollLeft: number = 0;

    /**
     * constructor
     */
    constructor(props: ViewportPositionerProps) {
        super(props);

        this.state = {
            disabled: true,
            noOberverMode: false,
            xTransformOrigin: Location.left,
            yTransformOrigin: Location.top,
            xTranslate: 0,
            yTranslate: 0,
            top: null,
            right: null,
            bottom: null,
            left: null,
            currentHorizontalPosition:
                ViewportPositionerHorizontalPositionLabel.undefined,
            currentVerticalPosition: ViewportPositionerVerticalPositionLabel.undefined,
            defaultHorizontalPosition: this.getHorizontalPositionToLabel(
                this.props.horizontalPositioningMode,
                this.props.defaultHorizontalPosition
            ),
            defaultVerticalPosition: this.getVerticalPositionToLabel(
                this.props.verticalPositioningMode,
                this.props.defaultVerticalPosition
            ),
            initialLayoutComplete: false,
        };
    }

    public componentDidMount(): void {
        this.updateDisabledState();
        this.requestFrame();
    }

    public componentWillUnmount(): void {
        this.disable();
    }

    public componentDidUpdate(prevProps: ViewportPositionerProps): void {
        if (
            prevProps.viewport !== this.props.viewport ||
            prevProps.anchor !== this.props.anchor ||
            prevProps.disabled !== this.props.disabled
        ) {
            this.updateDisabledState();
        }
    }

    /**
     * Renders the component
     */
    public render(): React.ReactElement<HTMLDivElement> {
        return (
            <div
                ref={this.rootElement}
                className={this.generateClassNames()}
                style={this.getPositioningStyles()}
                {...this.unhandledProps()}
            >
                {this.props.children}
            </div>
        );
    }

    /**
     * Create class-names
     */
    protected generateClassNames(): string {
        let classNames: string = get(this.props, "managedClasses.viewportPositioner", "");

        switch (this.state.currentHorizontalPosition) {
            case ViewportPositionerHorizontalPositionLabel.left:
                classNames = classNames.concat(
                    " ",
                    get(this.props.managedClasses, "viewportPositioner__left", "")
                );
                break;

            case ViewportPositionerHorizontalPositionLabel.insetLeft:
                classNames = classNames.concat(
                    " ",
                    get(this.props.managedClasses, "viewportPositioner__left", "")
                );
                classNames = classNames.concat(
                    " ",
                    get(
                        this.props.managedClasses,
                        "viewportPositioner__horizontalInset",
                        ""
                    )
                );
                break;

            case ViewportPositionerHorizontalPositionLabel.insetRight:
                classNames = classNames.concat(
                    " ",
                    get(this.props.managedClasses, "viewportPositioner__right", "")
                );
                classNames = classNames.concat(
                    " ",
                    get(
                        this.props.managedClasses,
                        "viewportPositioner__horizontalInset",
                        ""
                    )
                );
                break;

            case ViewportPositionerHorizontalPositionLabel.right:
                classNames = classNames.concat(
                    " ",
                    get(this.props.managedClasses, "viewportPositioner__right", "")
                );
                break;
        }

        switch (this.state.currentVerticalPosition) {
            case ViewportPositionerVerticalPositionLabel.top:
                classNames = classNames.concat(
                    " ",
                    get(this.props.managedClasses, "viewportPositioner__top", "")
                );
                break;

            case ViewportPositionerVerticalPositionLabel.insetTop:
                classNames = classNames.concat(
                    " ",
                    get(this.props.managedClasses, "viewportPositioner__top", "")
                );
                classNames = classNames.concat(
                    " ",
                    get(
                        this.props.managedClasses,
                        "viewportPositioner__verticalInset",
                        ""
                    )
                );
                break;

            case ViewportPositionerVerticalPositionLabel.insetBottom:
                classNames = classNames.concat(
                    " ",
                    get(this.props.managedClasses, "viewportPositioner__bottom", "")
                );
                classNames = classNames.concat(
                    " ",
                    get(
                        this.props.managedClasses,
                        "viewportPositioner__verticalInset",
                        ""
                    )
                );
                break;

            case ViewportPositionerVerticalPositionLabel.bottom:
                classNames = classNames.concat(
                    " ",
                    get(this.props.managedClasses, "viewportPositioner__bottom", "")
                );
                break;
        }

        return super.generateClassNames(classNames);
    }

    /**
     *  gets the CSS classes to be programmatically applied to the component
     */
    private getPositioningStyles = (): React.CSSProperties => {
        // determine if we should hide the positioner because we don't have data to position it yet
        // (avoiding flicker)
        const shouldHide: boolean =
            (this.state.disabled &&
                ((this.props.disabled === undefined || this.props.disabled === false) &&
                    isNil(this.positionerRect) &&
                    this.getAnchorElement() !== null)) ||
            (isNil(this.positionerRect) && !this.state.noOberverMode);

        return {
            opacity: shouldHide ? 0 : undefined,
            position: "relative",
            transformOrigin: `${this.state.xTransformOrigin} ${
                this.state.yTransformOrigin
            }`,
            transform: `translate(
                ${Math.floor(this.state.xTranslate)}px, 
                ${Math.floor(this.state.yTranslate)}px
            )`,
            top: this.state.top === null ? null : `${this.state.top}px`,
            right: this.state.right === null ? null : `${this.state.right}px`,
            bottom: this.state.bottom === null ? null : `${this.state.bottom}px`,
            left: this.state.left === null ? null : `${this.state.left}px`,
        };
    };

    /**
     *  Checks whether component should be disabled or not
     */
    private updateDisabledState = (): void => {
        if (
            !canUseDOM() ||
            this.props.disabled === true ||
            this.getAnchorElement() === null
        ) {
            this.disable();
            return;
        }
        this.enableComponent();
    };

    /**
     *  Enable the component
     */
    private enableComponent = (): void => {
        if (
            !this.state.disabled ||
            this.props.disabled ||
            this.getAnchorElement() === null ||
            isNil(this.rootElement.current)
        ) {
            return;
        }

        if (
            !(window as WindowWithIntersectionObserver).IntersectionObserver ||
            !(window as WindowWithResizeObserver).ResizeObserver
        ) {
            this.setNoObserverMode();
            return;
        }

        this.setState({
            disabled: false,
            noOberverMode: false,
        });

        this.collisionDetector = new (window as WindowWithIntersectionObserver).IntersectionObserver(
            this.handleCollision,
            {
                root: this.getViewportElement(),
                rootMargin: "0px",
                threshold: [0, 1],
            }
        );
        this.collisionDetector.observe(this.rootElement.current);
        this.collisionDetector.observe(this.getAnchorElement());

        this.resizeDetector = new (window as WindowWithResizeObserver).ResizeObserver(
            this.handleAnchorResize
        );
        this.resizeDetector.observe(this.getAnchorElement());

        this.getViewportElement().addEventListener("scroll", this.handleScroll);
    };

    /**
     *  Disable the component
     */
    private setNoObserverMode = (): void => {
        // observers not supported so the best we do is try to set the default position if there is one
        this.positionerRect = {
            top: 0,
            right: this.rootElement.current.clientHeight,
            bottom: this.rootElement.current.clientHeight,
            left: 0,
            height: this.rootElement.current.clientHeight,
            width: this.rootElement.current.clientHeight,
        };

        let desiredHorizontalPosition: ViewportPositionerHorizontalPositionLabel = this
            .state.defaultHorizontalPosition;

        if (
            this.props.horizontalPositioningMode !== AxisPositioningMode.uncontrolled &&
            this.state.defaultHorizontalPosition ===
                ViewportPositionerHorizontalPositionLabel.undefined
        ) {
            desiredHorizontalPosition = this.getHorizontalPositioningOptions()[0];
        }

        let desiredVerticalPosition: ViewportPositionerVerticalPositionLabel = this.state
            .defaultVerticalPosition;

        if (
            this.props.verticalPositioningMode !== AxisPositioningMode.uncontrolled &&
            this.state.defaultVerticalPosition ===
                ViewportPositionerVerticalPositionLabel.undefined
        ) {
            desiredVerticalPosition = this.getVerticalPositioningOptions()[0];
        }

        this.setState(Object.assign(
            {
                disabled: false,
                noOberverMode: true,
            },
            this.getHorizontalPositioningState(desiredHorizontalPosition),
            this.getVerticalPositioningState(desiredVerticalPosition)
        ) as ViewportPositionerState);
    };

    /**
     *  Disable the component
     */
    private disable = (): void => {
        if (this.state.disabled) {
            return;
        }
        this.setState({
            disabled: true,
        });

        if (!this.state.noOberverMode) {
            if (
                this.collisionDetector &&
                typeof this.collisionDetector.disconnect === "function"
            ) {
                this.collisionDetector.unobserve(this.rootElement.current);
                this.collisionDetector.unobserve(this.getAnchorElement());
                this.collisionDetector.disconnect();
                this.collisionDetector = null;
            }

            // TODO #1142 https://github.com/Microsoft/fast-dna/issues/1142
            // Full browser support imminent
            // Revisit usage once Safari and Firefox adapt
            // https://bugzilla.mozilla.org/show_bug.cgi?id=1272409
            // https://bugs.webkit.org/show_bug.cgi?id=157743
            if (
                this.resizeDetector &&
                typeof this.resizeDetector.disconnect === "function"
            ) {
                this.resizeDetector.unobserve(this.getAnchorElement());
                this.resizeDetector.disconnect();
                this.resizeDetector = null;
            }

            this.getViewportElement().addEventListener("scroll", this.handleScroll);
        }
    };

    /**
     *  Get available Horizontal positions based on positioning mode
     */
    private getHorizontalPositioningOptions = (): ViewportPositionerHorizontalPositionLabel[] => {
        switch (this.props.horizontalPositioningMode) {
            case AxisPositioningMode.inset:
                return [
                    ViewportPositionerHorizontalPositionLabel.insetLeft,
                    ViewportPositionerHorizontalPositionLabel.insetRight,
                ];

            case AxisPositioningMode.adjacent:
                return [
                    ViewportPositionerHorizontalPositionLabel.left,
                    ViewportPositionerHorizontalPositionLabel.right,
                ];
        }
    };

    /**
     * Get available Vertical positions based on positioning mode
     */
    private getVerticalPositioningOptions = (): ViewportPositionerVerticalPositionLabel[] => {
        switch (this.props.verticalPositioningMode) {
            case AxisPositioningMode.inset:
                return [
                    ViewportPositionerVerticalPositionLabel.insetTop,
                    ViewportPositionerVerticalPositionLabel.insetBottom,
                ];

            case AxisPositioningMode.adjacent:
                return [
                    ViewportPositionerVerticalPositionLabel.top,
                    ViewportPositionerVerticalPositionLabel.bottom,
                ];
        }
    };

    /**
     *  Get the width available for a particular horizontal position
     */
    private getHorizontalPositionAvailableWidth = (
        positionOption: ViewportPositionerHorizontalPositionLabel
    ): number => {
        const spaceLeft: number = this.anchorLeft - this.viewportRect.left;
        const spaceRight: number =
            this.viewportRect.right - (this.anchorLeft + this.anchorWidth);

        switch (positionOption) {
            case ViewportPositionerHorizontalPositionLabel.left:
                return spaceLeft;
            case ViewportPositionerHorizontalPositionLabel.insetLeft:
                return spaceLeft + this.anchorWidth;
            case ViewportPositionerHorizontalPositionLabel.insetRight:
                return spaceRight + this.anchorWidth;
            case ViewportPositionerHorizontalPositionLabel.right:
                return spaceRight;
        }
    };

    /**
     *  Get the height available for a particular vertical position
     */
    private getVerticalPositionAvailableHeight = (
        positionOption: ViewportPositionerVerticalPositionLabel
    ): number => {
        const spaceAbove: number = this.anchorTop - this.viewportRect.top;
        const spaceBelow: number =
            this.viewportRect.bottom - (this.anchorTop + this.anchorHeight);

        switch (positionOption) {
            case ViewportPositionerVerticalPositionLabel.top:
                return spaceAbove;
            case ViewportPositionerVerticalPositionLabel.insetTop:
                return spaceAbove + this.anchorHeight;
            case ViewportPositionerVerticalPositionLabel.insetBottom:
                return spaceBelow + this.anchorHeight;
            case ViewportPositionerVerticalPositionLabel.bottom:
                return spaceBelow;
        }
    };

    /**
     *  Handle scroll events
     */
    private handleScroll = (): void => {
        this.requestFrame();
    };

    /**
     *  Handle anchor resize events
     */
    private handleAnchorResize = (entries: ResizeObserverEntry[]): void => {
        const entry: ResizeObserverEntry = entries[0];
        this.anchorHeight = entry.contentRect.height;
        this.anchorWidth = entry.contentRect.width;

        if (
            this.state.currentVerticalPosition ===
            ViewportPositionerVerticalPositionLabel.top
        ) {
            this.anchorBottom = this.anchorTop + this.anchorHeight;
        } else {
            this.anchorTop = this.anchorBottom - this.anchorHeight;
        }

        if (
            this.state.currentHorizontalPosition ===
            ViewportPositionerHorizontalPositionLabel.left
        ) {
            this.anchorRight = this.anchorLeft + this.anchorWidth;
        } else {
            this.anchorLeft = this.anchorRight - this.anchorWidth;
        }

        this.requestFrame();
    };

    /**
     *  Handle collisions
     */
    private handleCollision = (
        entries: IntersectionObserverEntry[],
        observer: IntersectionObserver
    ): void => {
        entries.forEach((entry: IntersectionObserverEntry) => {
            if (entry.target === this.rootElement.current) {
                this.handlePositionerCollision(entry);
            } else {
                this.handleAnchorCollision(entry);
            }
        });

        this.scrollTop = this.getViewportElement().scrollTop;

        this.scrollLeft = this.getViewportElement().scrollLeft;

        this.requestFrame();
    };

    /**
     *  Update data based on anchor collisions
     */
    private handleAnchorCollision = (anchorEntry: IntersectionObserverEntry): void => {
        this.viewportRect = anchorEntry.rootBounds;
        this.anchorTop = anchorEntry.boundingClientRect.top;
        this.anchorRight = anchorEntry.boundingClientRect.right;
        this.anchorBottom = anchorEntry.boundingClientRect.bottom;
        this.anchorHeight = anchorEntry.boundingClientRect.height;
        this.anchorWidth = anchorEntry.boundingClientRect.width;
    };

    /**
     *  Update data based on positioner collisions
     */
    private handlePositionerCollision = (
        positionerEntry: IntersectionObserverEntry
    ): void => {
        this.viewportRect = positionerEntry.rootBounds;
        this.positionerRect = positionerEntry.boundingClientRect;

        switch (this.state.currentVerticalPosition) {
            case ViewportPositionerVerticalPositionLabel.top:
                this.anchorTop = this.positionerRect.bottom - this.state.yTranslate;
                this.anchorBottom = this.anchorTop + this.anchorHeight;
                break;

            case ViewportPositionerVerticalPositionLabel.insetTop:
                this.anchorBottom = this.positionerRect.bottom - this.state.yTranslate;
                this.anchorTop = this.anchorBottom - this.anchorHeight;
                break;

            case ViewportPositionerVerticalPositionLabel.insetBottom:
                this.anchorTop = this.positionerRect.top - this.state.yTranslate;
                this.anchorBottom = this.anchorTop + this.anchorHeight;
                break;

            case ViewportPositionerVerticalPositionLabel.bottom:
                this.anchorBottom = this.positionerRect.top - this.state.yTranslate;
                this.anchorTop = this.anchorBottom - this.anchorHeight;
                break;
        }

        switch (this.state.currentHorizontalPosition) {
            case ViewportPositionerHorizontalPositionLabel.left:
                this.anchorLeft = this.positionerRect.right - this.state.xTranslate;
                this.anchorRight = this.anchorLeft + this.anchorWidth;
                break;

            case ViewportPositionerHorizontalPositionLabel.insetLeft:
                this.anchorRight = this.positionerRect.right - this.state.xTranslate;
                this.anchorLeft = this.anchorRight - this.anchorWidth;
                break;

            case ViewportPositionerHorizontalPositionLabel.insetRight:
                this.anchorLeft = this.positionerRect.left - this.state.xTranslate;
                this.anchorRight = this.anchorLeft + this.anchorWidth;
                break;

            case ViewportPositionerHorizontalPositionLabel.right:
                this.anchorRight = this.positionerRect.left - this.state.xTranslate;
                this.anchorLeft = this.anchorRight - this.anchorWidth;
                break;
        }
    };

    /**
     * Check for scroll changes in viewport and adjust position data
     */
    private updateForScrolling = (): void => {
        const scrollingContainer: Element = this.getViewportElement();

        if (isNil(scrollingContainer) || isNaN(scrollingContainer.scrollTop)) {
            return;
        }

        const scrollTop: number = scrollingContainer.scrollTop;
        const scrollLeft: number = scrollingContainer.scrollLeft;

        if (this.scrollTop !== scrollTop) {
            const verticalScrollDelta: number = this.scrollTop - scrollTop;
            this.scrollTop = scrollTop;
            this.anchorTop = this.anchorTop + verticalScrollDelta;
            this.anchorBottom = this.anchorBottom + verticalScrollDelta;
        }

        if (this.scrollLeft !== scrollLeft) {
            const horizontalScrollDelta: number = this.scrollLeft - scrollLeft;
            this.scrollLeft = scrollLeft;
            this.anchorLeft = this.anchorLeft + horizontalScrollDelta;
            this.anchorRight = this.anchorRight + horizontalScrollDelta;
        }
    };

    /**
     *  Recalculate layout related state values
     */
    private updateLayout = (): void => {
        this.openRequestAnimationFrame = null;
        if (
            this.state.disabled ||
            isNil(this.viewportRect) ||
            isNil(this.positionerRect) ||
            (this.props.fixedAfterInitialPlacement && this.state.initialLayoutComplete)
        ) {
            return;
        }

        this.updateForScrolling();

        let desiredVerticalPosition: ViewportPositionerVerticalPositionLabel =
            ViewportPositionerVerticalPositionLabel.undefined;
        let desiredHorizontalPosition: ViewportPositionerHorizontalPositionLabel =
            ViewportPositionerHorizontalPositionLabel.undefined;

        if (this.props.horizontalPositioningMode !== AxisPositioningMode.uncontrolled) {
            const horizontalOptions: ViewportPositionerHorizontalPositionLabel[] = this.getHorizontalPositioningOptions();
            desiredHorizontalPosition = this.state.defaultHorizontalPosition;

            const horizontalThreshold: number =
                this.props.horizontalThreshold !== undefined
                    ? this.props.horizontalThreshold
                    : this.positionerRect.width;

            if (
                desiredHorizontalPosition ===
                    ViewportPositionerHorizontalPositionLabel.undefined ||
                this.getHorizontalPositionAvailableWidth(desiredHorizontalPosition) <
                    horizontalThreshold
            ) {
                desiredHorizontalPosition =
                    this.getHorizontalPositionAvailableWidth(horizontalOptions[0]) >
                    this.getHorizontalPositionAvailableWidth(horizontalOptions[1])
                        ? horizontalOptions[0]
                        : horizontalOptions[1];
            }
        }

        if (this.props.verticalPositioningMode !== AxisPositioningMode.uncontrolled) {
            const verticalOptions: ViewportPositionerVerticalPositionLabel[] = this.getVerticalPositioningOptions();
            desiredVerticalPosition = this.state.defaultVerticalPosition;

            const verticalThreshold: number =
                this.props.verticalThreshold !== undefined
                    ? this.props.verticalThreshold
                    : this.positionerRect.height;

            if (
                desiredVerticalPosition ===
                    ViewportPositionerVerticalPositionLabel.undefined ||
                this.getVerticalPositionAvailableHeight(desiredVerticalPosition) <
                    verticalThreshold
            ) {
                desiredVerticalPosition =
                    this.getVerticalPositionAvailableHeight(verticalOptions[0]) >
                    this.getVerticalPositionAvailableHeight(verticalOptions[1])
                        ? verticalOptions[0]
                        : verticalOptions[1];
            }
        }

        this.setState(Object.assign(
            {
                xTranslate: this.getHorizontalTranslate(desiredHorizontalPosition),
                yTranslate: this.getVerticalTranslate(desiredVerticalPosition),
                initialLayoutComplete: true,
            },
            this.getHorizontalPositioningState(desiredHorizontalPosition),
            this.getVerticalPositioningState(desiredVerticalPosition)
        ) as ViewportPositionerState);
    };

    /**
     * Get horizontal positioning state based on desired position
     */
    private getHorizontalPositioningState = (
        desiredHorizontalPosition: ViewportPositionerHorizontalPositionLabel
    ): Partial<ViewportPositionerState> => {
        let right: number = null;
        let left: number = null;
        let xTransformOrigin: string = Location.left;

        switch (desiredHorizontalPosition) {
            case ViewportPositionerHorizontalPositionLabel.left:
                xTransformOrigin = Location.right;
                right = this.positionerRect.width;
                break;

            case ViewportPositionerHorizontalPositionLabel.insetLeft:
                xTransformOrigin = Location.right;
                right = 0;
                break;

            case ViewportPositionerHorizontalPositionLabel.insetRight:
                xTransformOrigin = Location.left;
                left = 0;
                break;

            case ViewportPositionerHorizontalPositionLabel.right:
                xTransformOrigin = Location.left;
                left = this.anchorWidth;
                break;
        }

        return {
            xTransformOrigin,
            right,
            left,
            currentHorizontalPosition: desiredHorizontalPosition,
        };
    };

    /**
     * Get vertical positioning state based on desired position
     */
    private getVerticalPositioningState = (
        desiredVerticalPosition: ViewportPositionerVerticalPositionLabel
    ): Partial<ViewportPositionerState> => {
        let top: number = null;
        let bottom: number = null;
        let yTransformOrigin: string = Location.top;

        switch (desiredVerticalPosition) {
            case ViewportPositionerVerticalPositionLabel.top:
                yTransformOrigin = Location.bottom;
                bottom = this.positionerRect.height + this.anchorHeight;
                break;

            case ViewportPositionerVerticalPositionLabel.insetTop:
                yTransformOrigin = Location.bottom;
                bottom = this.positionerRect.height;
                break;

            case ViewportPositionerVerticalPositionLabel.insetBottom:
                yTransformOrigin = Location.top;
                top = -this.anchorHeight;
                break;

            case ViewportPositionerVerticalPositionLabel.bottom:
                yTransformOrigin = Location.top;
                top = 0;
                break;
        }
        return {
            yTransformOrigin,
            top,
            bottom,
            currentVerticalPosition: desiredVerticalPosition,
        };
    };

    /**
     *  Calculate horizontal translation to keep positioner in view
     */
    private getHorizontalTranslate = (
        horizontalPosition: ViewportPositionerHorizontalPositionLabel
    ): number => {
        if (!this.props.horizontalAlwaysInView) {
            return 0;
        }

        let translate: number = 0;

        switch (horizontalPosition) {
            case ViewportPositionerHorizontalPositionLabel.left:
                translate = this.viewportRect.right - this.anchorLeft;
                translate = translate < 0 ? translate - 1 : 0;
                break;

            case ViewportPositionerHorizontalPositionLabel.insetLeft:
                translate = this.viewportRect.right - this.anchorRight;
                translate = translate < 0 ? translate - 1 : 0;
                break;

            case ViewportPositionerHorizontalPositionLabel.insetRight:
                translate = this.viewportRect.left - this.anchorLeft;
                translate = translate > 0 ? translate + 1 : 0;
                break;

            case ViewportPositionerHorizontalPositionLabel.right:
                translate = this.viewportRect.left - this.anchorRight;
                translate = translate > 0 ? translate + 1 : 0;
                break;
        }
        return translate;
    };

    /**
     *  Calculate vertical translation to keep positioner in view
     */
    private getVerticalTranslate = (
        verticalPosition: ViewportPositionerVerticalPositionLabel
    ): number => {
        if (!this.props.verticalAlwaysInView) {
            return 0;
        }

        let translate: number = 0;

        switch (verticalPosition) {
            case ViewportPositionerVerticalPositionLabel.top:
                translate = this.viewportRect.bottom - this.anchorTop;
                translate = translate < 0 ? translate - 1 : 0;
                break;

            case ViewportPositionerVerticalPositionLabel.insetTop:
                translate = this.viewportRect.bottom - this.anchorBottom;
                translate = translate < 0 ? translate - 1 : 0;
                break;

            case ViewportPositionerVerticalPositionLabel.insetBottom:
                translate = this.viewportRect.top - this.anchorTop;
                translate = translate < 0 ? 0 : translate + 1;
                break;

            case ViewportPositionerVerticalPositionLabel.bottom:
                translate = this.viewportRect.top - this.anchorBottom;
                translate = translate < 0 ? 0 : translate + 1;
                break;
        }

        return translate;
    };

    /**
     * Request's an animation frame if there are currently no open animation frame requests
     */
    private requestFrame = (): void => {
        if (this.openRequestAnimationFrame === null && !this.state.disabled) {
            this.openRequestAnimationFrame = window.requestAnimationFrame(
                this.updateLayout
            );
        }
    };

    /**
     * get the anchor element
     */
    private getAnchorElement = (): HTMLElement => {
        if (isNil(this.props.anchor)) {
            return null;
        }

        if (this.props.anchor instanceof HTMLElement) {
            return this.props.anchor;
        } else {
            return this.props.anchor.current;
        }
    };

    /**
     * get the viewport element
     */
    private getViewportElement = (): HTMLElement => {
        if (isNil(this.props.viewport)) {
            return document.scrollingElement as HTMLElement;
        }

        if (this.props.viewport instanceof HTMLElement) {
            return this.props.viewport;
        } else {
            return this.props.viewport.current;
        }
    };

    /**
     * Converts simple horizontal position to a position label based on AxisPositioningMode
     */
    private getHorizontalPositionToLabel = (
        positioningMode: AxisPositioningMode,
        position: ViewportPositionerHorizontalPosition
    ): ViewportPositionerHorizontalPositionLabel => {
        switch (positioningMode) {
            case AxisPositioningMode.inset:
                if (position === ViewportPositionerHorizontalPosition.left) {
                    return ViewportPositionerHorizontalPositionLabel.insetLeft;
                } else if (position === ViewportPositionerHorizontalPosition.right) {
                    return ViewportPositionerHorizontalPositionLabel.insetRight;
                }

            case AxisPositioningMode.adjacent:
                if (position === ViewportPositionerHorizontalPosition.left) {
                    return ViewportPositionerHorizontalPositionLabel.left;
                } else if (position === ViewportPositionerHorizontalPosition.right) {
                    return ViewportPositionerHorizontalPositionLabel.right;
                }
            case AxisPositioningMode.uncontrolled:
                return ViewportPositionerHorizontalPositionLabel.undefined;
        }
    };

    /**
     * Converts simple vertical position to a position label based on AxisPositioningMode
     */
    private getVerticalPositionToLabel = (
        positioningMode: AxisPositioningMode,
        position: ViewportPositionerVerticalPosition
    ): ViewportPositionerVerticalPositionLabel => {
        switch (positioningMode) {
            case AxisPositioningMode.inset:
                if (position === ViewportPositionerVerticalPosition.top) {
                    return ViewportPositionerVerticalPositionLabel.insetTop;
                } else if (position === ViewportPositionerVerticalPosition.bottom) {
                    return ViewportPositionerVerticalPositionLabel.insetBottom;
                }

            case AxisPositioningMode.adjacent:
                if (position === ViewportPositionerVerticalPosition.top) {
                    return ViewportPositionerVerticalPositionLabel.top;
                } else if (position === ViewportPositionerVerticalPosition.bottom) {
                    return ViewportPositionerVerticalPositionLabel.bottom;
                }
            case AxisPositioningMode.uncontrolled:
                return ViewportPositionerVerticalPositionLabel.undefined;
        }
    };
}

export default ViewportPositioner;
export * from "./viewport-positioner.props";
export { ViewportPositionerClassNameContract };
