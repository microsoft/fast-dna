import * as ReactDOM from "react-dom";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { ListboxClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import {
    ListboxHandledProps,
    ListboxProps,
    ListboxUnhandledProps,
} from "./listbox.props";
import * as React from "react";
import { KeyCodes } from "@microsoft/fast-web-utilities";
import { get, inRange, isEqual } from "lodash-es";
import { canUseDOM } from "exenv-es6";
import { ListboxContext, ListboxItemData } from "./listbox-context";

export interface ListboxState {
    /**
     * The index of the focusable child
     */
    focusIndex: number;
    focussedItemId: string;
    selectedItems: ListboxItemData[];
}

class Listbox extends Foundation<
    ListboxHandledProps,
    ListboxUnhandledProps,
    ListboxState
> {
    public static displayName: string = "Listbox";
    public static valuePropertyKey: string = "value";
    public static displayStringPropertyKey: string = "displayString";

    public static defaultProps: Partial<ListboxProps> = {
        multiselectable: false,
        defaultSelection: [],
        selectedItems: [],
    };

    protected handledProps: HandledProps<ListboxHandledProps> = {
        children: void 0,
        defaultSelection: void 0,
        labelledBy: void 0,
        managedClasses: void 0,
        multiselectable: void 0,
        onSelectionChange: void 0,
        selectedItems: void 0,
        typeAheadPropertyKey: void 0,
    };

    private rootElement: React.RefObject<HTMLDivElement> = React.createRef<
        HTMLDivElement
    >();

    private typeAheadString: string = "";
    private typeAheadTimer: NodeJS.Timer;
    private shiftRangeSelectStartIndex: number = -1;

    constructor(props: ListboxProps) {
        super(props);

        this.state = {
            focusIndex: -1,
            focussedItemId: "",
            selectedItems: this.props.selectedItems
                ? this.props.defaultSelection
                : this.props.selectedItems,
        };
    }

    /**
     * Renders the component
     */
    public render(): React.ReactElement<HTMLDivElement> {
        return (
            <div
                {...this.unhandledProps()}
                ref={this.rootElement}
                role="listbox"
                aria-multiselectable={this.props.multiselectable || null}
                aria-activedescendant={this.state.focussedItemId}
                aria-labelledby={this.props.labelledBy || null}
                className={this.generateClassNames()}
                onKeyDown={this.handleMenuKeyDown}
            >
                <ListboxContext.Provider
                    value={{
                        selectedItems: this.state.selectedItems,
                        itemFocused: this.listboxItemfocused,
                        itemInvoked: this.listboxItemInvoked,
                    }}
                >
                    {this.renderChildren()}
                </ListboxContext.Provider>
            </div>
        );
    }

    public componentDidMount(): void {
        const children: Element[] = this.domChildren();
        const focusIndex: number = children.findIndex(this.isFocusableElement);

        if (focusIndex !== -1) {
            this.setState({
                focusIndex,
            });
        }
    }

    public componentWillUnmount(): void {
        clearTimeout(this.typeAheadTimer);
    }

    /**
     * Create class names
     */
    protected generateClassNames(): string {
        return super.generateClassNames(get(this.props.managedClasses, "listbox", ""));
    }

    /**
     * Render all child elements
     */
    private renderChildren(): React.ReactChild[] {
        return React.Children.map(this.props.children, this.renderChild);
    }

    /**
     * Render a single child
     */
    private renderChild = (
        child: React.ReactElement<any>,
        index: number
    ): React.ReactChild => {
        return React.cloneElement(child, {
            tabIndex: index === this.state.focusIndex ? 0 : -1,
        });
    };

    /**
     * Determines if a given element should be focusable by the menu
     */
    private isFocusableElement = (element: Element): element is HTMLElement => {
        return (
            element instanceof HTMLElement && element.getAttribute("role") === "option"
        );
    };

    /**
     * Determines if a given element is disabled
     */
    private isDisabledElement = (element: Element): element is HTMLElement => {
        return (
            element instanceof HTMLElement &&
            element.getAttribute("aria-disabled") === "true"
        );
    };

    /**
     * Return an array of all focusabled elements that are children
     * of the context menu
     */
    private domChildren(): Element[] {
        return canUseDOM() && this.rootElement.current instanceof HTMLElement
            ? Array.from(this.rootElement.current.children)
            : [];
    }

    /**
     * Sets focus to the nearest focusable element to the supplied focusIndex.
     * The adjustment controls how the function searches for other focusable elements
     * if the element at the focusIndex is not focusable. A positive number will search
     * towards the end of the children array, whereas a negative number will search towards
     * the beginning of the children array.
     */
    private setFocus(focusIndex: number, adjustment: number): void {
        const children: Element[] = this.domChildren();

        while (inRange(focusIndex, children.length)) {
            const child: Element = children[focusIndex];

            if (this.isFocusableElement(child)) {
                child.focus();

                this.setState({
                    focusIndex,
                    focussedItemId: child.id === undefined ? "" : child.id,
                });

                break;
            }

            focusIndex += adjustment;
        }
    }

    /**
     * Handle the keydown event of the root menu
     */
    private handleMenuKeyDown = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        switch (e.keyCode) {
            case KeyCodes.arrowDown:
            case KeyCodes.arrowRight:
                e.preventDefault();
                this.setFocus(this.state.focusIndex + 1, 1);

                break;

            case KeyCodes.arrowUp:
            case KeyCodes.arrowLeft:
                e.preventDefault();
                this.setFocus(this.state.focusIndex - 1, -1);

                break;

            case KeyCodes.end:
                e.preventDefault();
                this.setFocus(this.domChildren().length - 1, -1);

                break;

            case KeyCodes.home:
                e.preventDefault();
                this.setFocus(0, 1);

                break;

            default:
                if (!e.ctrlKey) {
                    this.processTypeAhead(e);
                }
        }
    };

    /**
     * Sets focus based on characters typed
     */
    private processTypeAhead = (e: React.KeyboardEvent<HTMLDivElement>): void => {
        e.preventDefault();

        clearTimeout(this.typeAheadTimer);

        this.typeAheadString = this.typeAheadString + e.key.toLowerCase();

        let matchIndex: number = -1;

        const children: React.ReactNode[] = React.Children.toArray(this.props.children);

        children.some(
            (child: React.ReactElement<any>, index: number): boolean => {
                if (child.props[this.props.typeAheadPropertyKey] === undefined) {
                    return false;
                }
                if (
                    child.props[this.props.typeAheadPropertyKey]
                        .toLowerCase()
                        .startsWith(this.typeAheadString)
                ) {
                    matchIndex = index;
                    return true;
                }
            }
        );

        if (matchIndex !== -1) {
            this.typeAheadTimer = setTimeout((): void => {
                this.typeAheadTimerExpired();
            }, 1000);
            this.setFocus(matchIndex, 1);
        } else {
            this.typeAheadString = "";
        }
    };

    private typeAheadTimerExpired = (): void => {
        this.typeAheadString = "";
        clearTimeout(this.typeAheadTimer);
    };

    /**
     * Function called by child items when they have been invoked
     */
    private listboxItemInvoked = (
        item: ListboxItemData,
        event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
    ): void => {
        if (this.props.multiselectable) {
            const target: Element = event.currentTarget;
            const itemIndex: number = this.domChildren().indexOf(target);

            if (!event.shiftKey || this.shiftRangeSelectStartIndex === -1) {
                this.shiftRangeSelectStartIndex = itemIndex;
            }

            if (event.ctrlKey) {
                this.processCtrlMultiSelect(item, event);
            } else if (event.shiftKey) {
                this.processShiftMultiSelect(item, event);
            } else {
                this.updateSelection([item]);
            }
        } else {
            this.updateSelection([item]);
        }
    };

    /**
     * Resolves selection when control key is pressed (multi select only)
     */
    private processCtrlMultiSelect = (
        item: ListboxItemData,
        event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
    ): void => {
        if (
            this.state.selectedItems.filter((listboxItem: ListboxItemData) => {
                return listboxItem.id === listboxItem.id;
            }).length === 1
        ) {
            return;
        }

        const newSelectedItems: ListboxItemData[] = [item].concat(
            this.state.selectedItems
        );

        this.updateSelection(newSelectedItems);
    };

    /**
     * Resolves selection when shift key is pressed (multi select only)
     */
    private processShiftMultiSelect = (
        item: ListboxItemData,
        event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>
    ): void => {
        const children: React.ReactNode[] = React.Children.toArray(this.props.children);
        const target: Element = event.currentTarget;
        const itemIndex: number = this.domChildren().indexOf(target);
        const selectedChildren: React.ReactNode[] = children.slice(
            this.shiftRangeSelectStartIndex >= itemIndex
                ? itemIndex
                : this.shiftRangeSelectStartIndex,
            this.shiftRangeSelectStartIndex >= itemIndex
                ? this.shiftRangeSelectStartIndex + 1
                : itemIndex + 1
        );

        const newSelectedItems: ListboxItemData[] = selectedChildren.map(
            (child: React.ReactElement<any>) => {
                let value: string = "";
                let displayString: string = "";

                if (child.props[Listbox.valuePropertyKey] !== undefined) {
                    value = child.props[Listbox.valuePropertyKey];
                }

                if (child.props[Listbox.displayStringPropertyKey] !== undefined) {
                    displayString = child.props[Listbox.displayStringPropertyKey];
                }

                const thisItemData: ListboxItemData = {
                    id: child.props.id,
                    value,
                    displayString,
                };

                return thisItemData;
            }
        );

        this.updateSelection(newSelectedItems);
    };

    /**
     * Function called by child select options when they have been focused
     * Ensure we always validate our internal state on item focus events, otherwise
     * the component can get out of sync from click events
     */
    private listboxItemfocused = (
        item: ListboxItemData,
        event: React.FocusEvent<HTMLDivElement>
    ): void => {
        const target: Element = event.currentTarget;
        const focusIndex: number = this.domChildren().indexOf(target);

        if (this.isDisabledElement(target)) {
            target.blur();
            return;
        }

        this.updateSelection([item]);

        if (focusIndex !== this.state.focusIndex && focusIndex !== -1) {
            this.setFocus(focusIndex, focusIndex > this.state.focusIndex ? 1 : -1);
        }
    };

    /**
     * Updates selection state (should be the only place this is done outside of initialization)
     */
    private updateSelection = (newSelection: ListboxItemData[]): void => {
        if (isEqual(newSelection, this.state.selectedItems)) {
            return;
        }

        if (this.props.selectedItems === undefined) {
            this.setState({
                selectedItems: newSelection,
            });
        }

        if (this.props.onSelectionChange) {
            this.props.onSelectionChange(newSelection);
        }
    };
}

export default Listbox;
export * from "./listbox.props";
export { ListboxClassNameContract };
