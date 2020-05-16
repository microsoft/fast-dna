import React, { ReactText } from "react";
import { DataGridClassNameContract } from "@microsoft/fast-components-class-name-contracts-base";
import { get, isNil } from "lodash-es";
import Foundation, { HandledProps } from "@microsoft/fast-components-foundation-react";
import { classNames, Direction, KeyCodes } from "@microsoft/fast-web-utilities";
import throttle from "raf-throttle";
import StackPanel from "../stack-panel";
import {
    DataGridColumnDefinition,
    DataGridHandledProps,
    DataGridProps,
    DataGridUnhandledProps,
} from "./data-grid.props";
import DataGridRow from "./data-grid-row";
import { DataGridCellProps } from "./data-grid-cell.props";
import { DataGridContext, DataGridContextType } from "./data-grid-context";

export interface DataGridState {
    focusRowIndex: number;
    focusRowKey: ReactText | null;
    focusColumnKey: ReactText | null;
    scrollBarWidth: number;
    currentDataPageStartIndex: number;
    currentDataPageEndIndex: number;
    rowPositions: RowPosition[];
    estimatedTotalHeight: number;
    desiredVisibleRowIndex: number | null;
    desiredFocusRowKey: ReactText | null;
    desiredFocusColumnKey: ReactText | null;
}

/**
 * Used to store the pixel coordinates and span of items
 */
interface RowPosition {
    start: number;
    span: number;
    end: number;
}

class DataGrid extends Foundation<
    DataGridHandledProps,
    DataGridUnhandledProps,
    DataGridState
> {
    public static defaultProps: Partial<DataGridProps> = {
        itemHeight: 60,
        stableRangeEndIndex: 0,
        pageSize: 1000,
        itemHeightCallback: (
            rowData: object,
            rowIndex: number,
            defaultItemHeight: number
        ) => {
            return defaultItemHeight;
        },
        virtualizeItems: true,
        managedClasses: {},
    };

    public static displayName: string = "DataGrid";

    protected handledProps: HandledProps<DataGridHandledProps> = {
        dataRowKey: void 0,
        gridData: void 0,
        columnDefinitions: void 0,
        itemHeight: void 0,
        itemHeightCallback: void 0,
        managedClasses: void 0,
        defaultFocusColumnKey: void 0,
        defaultFocusRowKey: void 0,
        stableRangeEndIndex: void 0,
        pageSize: void 0,
        virtualizeItems: void 0,
    };

    private currentTemplateColumns: string = "";
    private rootElement: React.RefObject<HTMLDivElement> = React.createRef<
        HTMLDivElement
    >();

    private direction: Direction = Direction.ltr;
    private isFocused: boolean = false;
    private throttledScroll: throttle;
    private lastReportedScrollPosition: number = 0;
    private lastReportedViewportSpan: number = 0;

    /**
     * constructor
     */
    constructor(props: DataGridProps) {
        super(props);

        let initialFocusRowIndex: number = -1;
        let focusRowKey: React.ReactText = null;
        let focusColumnKey: React.ReactText = null;
        let currentDataPageStartIndex: number = -1;
        let currentDataPageEndIndex: number = -1;
        this.throttledScroll = throttle(this.handleScrollChange);
        const rowPositions: RowPosition[] = [];

        if (this.props.gridData.length > 0) {
            if (!isNil(this.props.defaultFocusRowKey)) {
                focusRowKey = this.props.defaultFocusRowKey;
                initialFocusRowIndex = this.getRowIndexByKey(focusRowKey);
            }

            if (initialFocusRowIndex === -1) {
                initialFocusRowIndex = 0;
                focusRowKey = this.props.gridData[0][this.props.dataRowKey];
            }

            currentDataPageStartIndex =
                initialFocusRowIndex - Math.floor(this.props.pageSize / 2);

            currentDataPageStartIndex =
                currentDataPageStartIndex < 0 ? 0 : currentDataPageStartIndex;

            currentDataPageEndIndex = currentDataPageStartIndex + this.props.pageSize;

            currentDataPageEndIndex =
                currentDataPageEndIndex > this.props.gridData.length - 1
                    ? this.props.gridData.length - 1
                    : currentDataPageEndIndex;

            this.sizeRowsToIndex(currentDataPageEndIndex, rowPositions);
        }

        if (this.props.columnDefinitions.length > 0) {
            focusColumnKey =
                !isNil(this.props.defaultFocusColumnKey) &&
                this.getColumnIndexByKey(this.props.defaultFocusColumnKey) !== -1
                    ? this.props.defaultFocusColumnKey
                    : this.props.columnDefinitions[0].columnDataKey;
        }

        this.state = {
            scrollBarWidth: 0,
            currentDataPageStartIndex: currentDataPageStartIndex,
            currentDataPageEndIndex: currentDataPageEndIndex,
            focusColumnKey,
            focusRowKey,
            focusRowIndex: initialFocusRowIndex,
            rowPositions,
            estimatedTotalHeight: this.getEstimatedTotalHeight(rowPositions),
            desiredVisibleRowIndex: initialFocusRowIndex,
            desiredFocusColumnKey: null,
            desiredFocusRowKey: null,
        };
    }

    /**
     * Renders the component
     */
    public render(): React.ReactElement<HTMLDivElement> {
        this.currentTemplateColumns = this.getGridTemplateColumns();

        const itemSpans: number[] = [];

        if (this.state.rowPositions.length > 0) {
            itemSpans.push(
                this.state.rowPositions[this.state.currentDataPageStartIndex].start
            );

            if (typeof this.props.itemHeightCallback === "function") {
                for (
                    let i: number = this.state.currentDataPageStartIndex;
                    i <= this.state.currentDataPageEndIndex;
                    i++
                ) {
                    itemSpans.push(this.state.rowPositions[i].span);
                }
            }
            itemSpans.push(
                this.state.estimatedTotalHeight -
                    this.state.rowPositions[this.state.currentDataPageEndIndex].end
            );
        }

        const stackPanelVisibleItemIndex: number | null =
            this.state.desiredVisibleRowIndex !== null
                ? this.convertGridDataIndexToStackPanelIndex(
                      this.state.desiredVisibleRowIndex,
                      this.state.currentDataPageStartIndex,
                      this.state.currentDataPageEndIndex
                  )
                : null;

        return (
            <DataGridContext.Provider
                value={{
                    onCellFocused: this.handleCellFocus,
                    onCellKeyDown: this.handleCellKeyDown,
                    focusRowKey: this.state.focusRowKey,
                    focusColumnKey: this.state.focusColumnKey,
                    desiredFocusColumnKey: this.state.desiredFocusColumnKey,
                    desiredFocusRowKey: this.state.desiredFocusRowKey,
                    desiredVisibleRowIndex: this.state.desiredVisibleRowIndex,
                    dataGridProps: this.props,
                }}
            >
                <div
                    {...this.unhandledProps()}
                    className={this.generateClassNames()}
                    role="grid"
                    tabIndex={-1}
                    onFocus={this.handleGridFocus}
                    onBlur={this.handleGridBlur}
                    ref={this.rootElement}
                >
                    {this.renderGridHeader()}
                    <StackPanel
                        initiallyVisibleItemIndex={stackPanelVisibleItemIndex}
                        onScrollChange={this.throttledScroll}
                        itemSpan={itemSpans}
                        virtualize={this.props.virtualizeItems}
                        style={{
                            height: "100%",
                            overflowY: "scroll",
                        }}
                        managedClasses={{
                            stackPanel: get(
                                this.props.managedClasses,
                                "dataGrid_scrollingPanel",
                                ""
                            ),
                            stackPanel_items: get(
                                this.props.managedClasses,
                                "dataGrid_scrollingPanel_items",
                                ""
                            ),
                            stackPanel__scrollable: get(
                                this.props.managedClasses,
                                "dataGrid_scrollingPanel__scrollable",
                                ""
                            ),
                        }}
                    >
                        {this.renderRows()}
                    </StackPanel>
                </div>
            </DataGridContext.Provider>
        );
    }

    /**
     * React life-cycle method
     */
    public componentDidMount(): void {
        this.setState({
            desiredVisibleRowIndex: null,
        });
    }

    /**
     * React life-cycle method
     */
    public componentDidUpdate(prevProps: DataGridProps): void {
        let shouldUpdateState: boolean = false;

        let rowPositions: RowPosition[] = this.state.rowPositions;
        let currentDataPageStartIndex: number = this.state.currentDataPageStartIndex;
        let currentDataPageEndIndex: number = this.state.currentDataPageEndIndex;
        let estimatedTotalHeight: number = this.state.estimatedTotalHeight;
        let focusRowKey: ReactText | null = this.state.focusRowKey;
        let focusColumnKey: ReactText | null = this.state.focusColumnKey;
        let focusRowIndex: number = this.state.focusRowIndex;
        let desiredFocusRowKey: ReactText | null = this.state.desiredFocusRowKey;
        let desiredFocusColumnKey: ReactText | null = this.state.desiredFocusColumnKey;
        let desiredVisibleRowIndex: number | null = null;

        if (this.state.desiredVisibleRowIndex !== null) {
            // this would have been applied on the last update, so apply state change to null it out
            shouldUpdateState = true;
        }

        // apply a new focus columnkey if one is provided and it exists
        if (
            this.props.defaultFocusColumnKey !== prevProps.defaultFocusColumnKey &&
            !isNil(this.props.defaultFocusColumnKey) &&
            this.getColumnIndexByKey(this.props.defaultFocusColumnKey) !== -1
        ) {
            shouldUpdateState = true;
            focusColumnKey = this.props.defaultFocusColumnKey;
        }

        // apply a new focus rowkey if one is provided and it exists
        if (
            this.props.defaultFocusRowKey !== prevProps.defaultFocusRowKey &&
            !isNil(this.props.defaultFocusRowKey)
        ) {
            const newFocusRowIndex: number = this.getRowIndexByKey(
                this.props.defaultFocusRowKey
            );

            if (newFocusRowIndex !== -1) {
                shouldUpdateState = true;
                focusRowKey = this.props.defaultFocusRowKey;
                desiredVisibleRowIndex = newFocusRowIndex;
                focusRowIndex = newFocusRowIndex;
                currentDataPageStartIndex =
                    newFocusRowIndex - Math.floor(this.props.pageSize / 2);
                if (currentDataPageStartIndex < 0) {
                    currentDataPageStartIndex = 0;
                }
                currentDataPageEndIndex = Math.min(
                    currentDataPageStartIndex + this.props.pageSize,
                    this.props.gridData.length - 1
                );
            }
        }

        // revalidate when there is new data
        if (this.props.gridData !== prevProps.gridData) {
            shouldUpdateState = true;

            if (this.props.gridData.length === 0) {
                rowPositions = [];
                currentDataPageStartIndex = -1;
                currentDataPageEndIndex = -1;
                estimatedTotalHeight = 0;
                focusRowKey = null;
                focusColumnKey = null;
                focusRowIndex = -1;
            } else {
                // if an author tells us nothing has changed before a certain point we keep position data
                // up to that point.
                rowPositions = rowPositions.slice(0, this.props.stableRangeEndIndex);

                // ensure focus is still valid
                const newFocusRowIndex: number = this.getRowIndexByKey(focusRowKey);
                if (newFocusRowIndex === -1) {
                    // our focus row no longer exists, assign a new one based on previous focus row index
                    focusRowIndex = Math.min(
                        Math.max(focusRowIndex, 0),
                        this.props.gridData.length - 1
                    );
                    focusRowKey = this.props.gridData[focusRowIndex][
                        this.props.dataRowKey
                    ];
                } else {
                    focusRowIndex = newFocusRowIndex;
                }

                // ensure data page conforms to new data length
                currentDataPageStartIndex =
                    focusRowIndex - Math.floor(this.props.pageSize / 2);

                currentDataPageStartIndex =
                    currentDataPageStartIndex < 0 ? 0 : currentDataPageStartIndex;

                currentDataPageEndIndex = currentDataPageStartIndex + this.props.pageSize;

                currentDataPageEndIndex =
                    currentDataPageEndIndex > this.props.gridData.length - 1
                        ? this.props.gridData.length - 1
                        : currentDataPageEndIndex;

                this.sizeRowsToIndex(currentDataPageEndIndex, rowPositions);
                estimatedTotalHeight = this.getEstimatedTotalHeight(rowPositions);

                // move focus to the new element if necessary
                if (
                    (this.isFocused && this.state.focusRowKey !== focusRowKey) ||
                    this.state.focusColumnKey !== focusColumnKey
                ) {
                    const rowElement: Element = this.getRowElementByKey(focusRowKey);
                    if (rowElement !== null) {
                        // next focus element already exists, focus on it
                        (rowElement as HTMLElement).focus();
                        desiredFocusRowKey = null;
                        desiredFocusColumnKey = null;
                    } else {
                        // next focus element not in the dom,
                        // focus on it after when it mounts
                        desiredFocusRowKey = focusRowKey;
                        desiredFocusColumnKey = focusColumnKey;

                        // let the default behavior scroll into view on focus
                        desiredVisibleRowIndex = null;
                    }
                }
            }
        }

        if (shouldUpdateState) {
            this.setState({
                rowPositions,
                currentDataPageStartIndex,
                currentDataPageEndIndex,
                estimatedTotalHeight,
                focusRowKey,
                focusColumnKey,
                focusRowIndex,
                desiredFocusRowKey,
                desiredFocusColumnKey,
                desiredVisibleRowIndex,
            });
        }
    }

    /**
     * Generates class names
     */
    protected generateClassNames(): string {
        const { dataGrid }: DataGridClassNameContract = this.props.managedClasses;

        return super.generateClassNames(classNames(dataGrid));
    }

    /**
     *  render the header
     */
    private renderGridHeader(): React.ReactElement<HTMLDivElement> {
        return (
            <div
                className={classNames(this.props.managedClasses.dataGrid_header)}
                role="row"
                style={{
                    marginRight: this.state.scrollBarWidth,
                    display: "grid",
                    gridTemplateColumns: this.currentTemplateColumns,
                }}
            >
                {this.props.columnDefinitions.map(this.renderColumnHeader)}
            </div>
        );
    }

    /**
     *  render the data rows
     */
    private renderRows = (): React.ReactChild[] => {
        const rowsToRender: React.ReactChild[] = [];
        rowsToRender.push(<div key="frontSpacer" />);
        for (
            let i: number = this.state.currentDataPageStartIndex;
            i <= this.state.currentDataPageEndIndex;
            i++
        ) {
            rowsToRender.push(this.renderRow(this.props.gridData[i], i));
        }
        rowsToRender.push(<div key="backSpacer" />);
        return rowsToRender;
    };

    /**
     *  render each column header
     */
    private renderColumnHeader = (
        column: DataGridColumnDefinition,
        index: number
    ): React.ReactNode => {
        if (!isNil(column.header)) {
            return column.header(
                column.title,
                column.columnDataKey,
                index,
                get(this.props.managedClasses, "dataGrid_columnHeader", "")
            );
        } else {
            return this.renderDefaultColumnHeader(
                column.title,
                column.columnDataKey,
                index,
                get(this.props.managedClasses, "dataGrid_columnHeader", "")
            );
        }
    };

    /**
     *  default column render function
     */
    private renderDefaultColumnHeader = (
        columnTitle: React.ReactFragment,
        key: React.ReactText,
        columnIndex: number,
        className: string
    ): React.ReactNode => {
        return (
            <div
                className={className}
                role="columnheader"
                key={key}
                style={{
                    gridColumn: columnIndex + 1,
                }}
            >
                {columnTitle}
            </div>
        );
    };

    /**
     * Render a single data row
     */
    private renderRow = (rowData: object, index: number): React.ReactChild => {
        if (isNil(rowData)) {
            return;
        }
        const rowKey: React.ReactText = !isNil(rowData[this.props.dataRowKey])
            ? rowData[this.props.dataRowKey]
            : index;
        const {
            dataGrid_row,
            dataGrid_row__focusWithin,
            dataGrid_cell,
        }: DataGridClassNameContract = this.props.managedClasses;

        return (
            <DataGridRow
                key={rowKey}
                rowIndex={index}
                rowData={rowData}
                gridTemplateColumns={this.currentTemplateColumns}
                managedClasses={{
                    dataGridRow: dataGrid_row,
                    dataGridRow__focusWithin: dataGrid_row__focusWithin,
                    dataGridRow_cell: dataGrid_cell,
                }}
            />
        );
    };

    /**
     *  Generates the grid template column css string
     */
    private getGridTemplateColumns = (): string => {
        let templateColumns: string = "";

        this.props.columnDefinitions.forEach(
            (columnDefinition: DataGridColumnDefinition) => {
                templateColumns = `${templateColumns} ${columnDefinition.columnWidth}`;
            }
        );

        return templateColumns;
    };

    /**
     *  Handle grid focus
     */
    private handleGridFocus = (): void => {
        this.isFocused = true;
    };

    /**
     *  Handle grid blur by setting focused state
     */
    private handleGridBlur = (e: React.FocusEvent<HTMLElement>): void => {
        const root: HTMLDivElement = this.rootElement.current;
        // If we focus outside of the data grid
        if (!!root && !root.contains(e.relatedTarget as HTMLElement)) {
            this.isFocused = false;
        }
    };

    /**
     * Handle the keydown event of the item
     */
    private handleCellKeyDown = (
        cell: DataGridCellProps,
        e: React.KeyboardEvent<HTMLElement>
    ): void => {
        if (e.defaultPrevented) {
            return;
        }

        switch (e.keyCode) {
            case KeyCodes.arrowDown:
                e.preventDefault();
                this.incrementFocusRow(1);
                break;

            case KeyCodes.arrowRight:
                this.incrementFocusColumn(1);
                e.preventDefault();
                break;

            case KeyCodes.arrowUp:
                this.incrementFocusRow(-1);
                e.preventDefault();
                break;

            case KeyCodes.arrowLeft:
                this.incrementFocusColumn(-1);
                e.preventDefault();
                break;

            case KeyCodes.pageDown:
                this.incrementFocusPage(1);
                e.preventDefault();
                break;

            case KeyCodes.pageUp:
                this.incrementFocusPage(-1);
                e.preventDefault();
                break;

            case KeyCodes.home:
                if (e.ctrlKey) {
                    this.incrementFocusRow(-this.props.gridData.length);
                } else {
                    this.incrementFocusColumn(-this.props.columnDefinitions.length);
                }
                e.preventDefault();
                break;

            case KeyCodes.end:
                if (e.ctrlKey) {
                    this.incrementFocusRow(this.props.gridData.length);
                } else {
                    this.incrementFocusColumn(this.props.columnDefinitions.length);
                }
                e.preventDefault();
                break;
        }
    };

    /**
     * get the estimated total height of the datagrid based on row heights calculated so far
     */
    private getEstimatedTotalHeight = (rowPositions: RowPosition[]): number => {
        if (rowPositions.length === 0) {
            return 0;
        }
        const estimatedTotalHeight: number =
            rowPositions[rowPositions.length - 1].end +
            (this.props.gridData.length - rowPositions.length) * this.props.itemHeight;

        return estimatedTotalHeight;
    };

    /**
     * calculate total height of rows to target index
     * note: this modifies the provided rowposition array directly
     */
    private sizeRowsToIndex = (
        targetIndex: number,
        rowPositions: RowPosition[]
    ): void => {
        if (rowPositions.length - 1 < targetIndex) {
            const startIndex: number = rowPositions.length;
            const endIndex: number =
                targetIndex > this.props.gridData.length - 1
                    ? this.props.gridData.length - 1
                    : targetIndex;
            for (let i: number = startIndex; i <= endIndex; i++) {
                const thisRowStart: number = i === 0 ? 0 : rowPositions[i - 1].end;
                const thisRowHeight: number = this.props.itemHeightCallback(
                    this.props.gridData[i],
                    i,
                    this.props.itemHeight
                );
                rowPositions.push({
                    start: thisRowStart,
                    span: thisRowHeight,
                    end: thisRowStart + thisRowHeight,
                });
            }
        }
    };

    /**
     * size rows to target scroll value
     * appends rowposition data until the bottom of the last item
     * is greater than target scroll value.
     * note: this modifies the provided rowposition array directly
     */
    private sizeRowsToScrollValue = (
        targetScrollValue: number,
        rowPositions: RowPosition[]
    ): void => {
        if (rowPositions[rowPositions.length - 1].end < targetScrollValue) {
            const startIndex: number = rowPositions.length;
            const endIndex: number = this.props.gridData.length - 1;
            for (let i: number = startIndex; i <= endIndex; i++) {
                const thisRowStart: number = i === 0 ? 0 : rowPositions[i - 1].end;
                const thisRowHeight: number = this.props.itemHeightCallback(
                    this.props.gridData[i],
                    i,
                    this.props.itemHeight
                );
                const thisRowEnd: number = thisRowStart + thisRowHeight;
                rowPositions.push({
                    start: thisRowStart,
                    span: thisRowHeight,
                    end: thisRowEnd,
                });
                if (thisRowEnd >= targetScrollValue) {
                    break;
                }
            }
        }
    };

    /**
     * handle scroll events from the stackpanel
     */
    private handleScrollChange = (
        newScrollValue: number,
        scrollMaxValue: number,
        viewportSpan: number
    ): void => {
        const currentPageTop: number = this.state.rowPositions[
            this.state.currentDataPageStartIndex
        ].start;
        const currentPageBottom: number = this.state.rowPositions[
            this.state.currentDataPageEndIndex
        ].end;
        const currentViewportBottom: number = newScrollValue + viewportSpan;

        this.lastReportedScrollPosition = newScrollValue;
        this.lastReportedViewportSpan = viewportSpan;

        if (
            this.state.rowPositions[this.state.focusRowIndex].start >
                currentViewportBottom ||
            this.state.rowPositions[this.state.focusRowIndex].end < newScrollValue
        ) {
            const topVisibleElementIndex: number = this.getIndexOfItemAtScrollPosition(
                newScrollValue,
                this.state.rowPositions
            );
            if (topVisibleElementIndex === -1) {
                this.setState({
                    focusRowKey: "",
                });
            } else {
                this.setState({
                    focusRowKey: this.props.gridData[topVisibleElementIndex][
                        this.props.dataRowKey
                    ],
                });
            }
        }

        if (
            newScrollValue < currentPageTop ||
            currentViewportBottom > currentPageBottom
        ) {
            const newRowPositions: RowPosition[] = this.state.rowPositions.slice(0);

            const middleViewportPosition: number = Math.floor(
                newScrollValue + viewportSpan / 2
            );
            const middleItemIndex: number = this.getIndexOfItemAtScrollPosition(
                middleViewportPosition,
                newRowPositions
            );

            let newDataPageStartIndex: number =
                middleItemIndex - Math.floor(this.props.pageSize / 2);
            if (newDataPageStartIndex < 0) {
                newDataPageStartIndex = 0;
            }

            let newDataPageEndIndex: number =
                newDataPageStartIndex + this.props.pageSize - 1;
            if (newDataPageEndIndex > this.props.gridData.length - 1) {
                newDataPageEndIndex = this.props.gridData.length - 1;
            }

            this.sizeRowsToIndex(newDataPageEndIndex, newRowPositions);

            this.setState({
                currentDataPageStartIndex: newDataPageStartIndex,
                currentDataPageEndIndex: newDataPageEndIndex,
                rowPositions: newRowPositions,
                estimatedTotalHeight: this.getEstimatedTotalHeight(newRowPositions),
            });
        }
    };

    /**
     * returns the index of row item at a particular scroll position
     */
    private getIndexOfItemAtScrollPosition = (
        scrollPosition: number,
        rowPositions: RowPosition[]
    ): number => {
        if (rowPositions.length === 0) {
            return -1;
        }

        scrollPosition = Math.max(0, scrollPosition);

        this.sizeRowsToScrollValue(scrollPosition, rowPositions);
        const maxIndex = Math.min(rowPositions.length - 1);

        const estimatedItemIndex: number = Math.min(
            maxIndex,
            Math.floor(scrollPosition / this.props.itemHeight)
        );

        if (scrollPosition < rowPositions[estimatedItemIndex].start) {
            for (let i: number = estimatedItemIndex; i >= 0; i--) {
                if (rowPositions[i].start < scrollPosition) {
                    return i;
                }
            }
            return 0;
        } else if (scrollPosition > rowPositions[estimatedItemIndex].end) {
            let maxRowpositionSizedIndex: number = rowPositions.length - 1;
            for (let i: number = estimatedItemIndex; i <= maxIndex; i++) {
                if (i > maxRowpositionSizedIndex) {
                    this.sizeRowsToIndex(i, rowPositions);
                    maxRowpositionSizedIndex++;
                }
                if (rowPositions[i].end > scrollPosition) {
                    return i;
                }
            }
            return maxIndex;
        }

        return estimatedItemIndex;
    };

    /**
     * move focus up/down one viewport's worth of items
     */
    private incrementFocusPage = (direction: number): void => {
        const newRowPositions = this.state.rowPositions.slice(0);

        const nextItemScrollPosition: number =
            direction > 0
                ? this.lastReportedScrollPosition + this.lastReportedViewportSpan + 1
                : this.lastReportedScrollPosition - this.lastReportedViewportSpan + 1;

        let nextItemIndex: number = this.getIndexOfItemAtScrollPosition(
            nextItemScrollPosition,
            newRowPositions
        );

        // don't get stuck on items that span the viewport
        if (nextItemIndex === this.state.focusRowIndex) {
            if (direction > 0 && nextItemIndex < this.props.gridData.length - 1) {
                nextItemIndex++;
            } else if (direction < 0 && nextItemIndex > 0) {
                nextItemIndex;
            }
        }

        this.focusOnCell(
            this.props.gridData[nextItemIndex][this.props.dataRowKey],
            this.state.focusColumnKey,
            newRowPositions,
            true
        );
    };

    /**
     * move focus to another row
     */
    private incrementFocusRow = (direction: number): void => {
        let currentFocusRowIndex: number = this.getRowIndexByKey(this.state.focusRowKey);

        if (currentFocusRowIndex === -1) {
            currentFocusRowIndex =
                this.state.focusRowIndex < this.props.gridData.length
                    ? this.state.focusRowIndex
                    : this.props.gridData.length - 1;
        }

        let newFocusRowIndex: number = currentFocusRowIndex + direction;
        if (newFocusRowIndex < 0) {
            newFocusRowIndex = 0;
        } else if (newFocusRowIndex >= this.props.gridData.length) {
            newFocusRowIndex = this.props.gridData.length - 1;
        }
        const newFocusRowKey: React.ReactText = this.props.gridData[newFocusRowIndex][
            this.props.dataRowKey
        ];

        const focusRowElement: Element = this.getRowElementByKey(newFocusRowKey);
        const focusCell: Element = this.getCellElementByKey(
            this.state.focusColumnKey,
            focusRowElement
        );

        if (isNil(focusCell)) {
            return;
        }
        (focusCell as HTMLElement).focus();
    };

    /**
     *  move focus to another column
     */
    private incrementFocusColumn = (direction: number): void => {
        this.updateDirection();

        const directionMod: number = this.direction === Direction.ltr ? 1 : -1;

        let currentFocusColumnIndex: number = this.getColumnIndexByKey(
            this.state.focusColumnKey
        );

        if (currentFocusColumnIndex === -1) {
            currentFocusColumnIndex = 0;
        }

        let newFocusColumnIndex: number =
            currentFocusColumnIndex + direction * directionMod;

        if (newFocusColumnIndex < 0) {
            newFocusColumnIndex = 0;
        } else if (newFocusColumnIndex >= this.props.columnDefinitions.length) {
            newFocusColumnIndex = this.props.columnDefinitions.length - 1;
        }

        const newFocusColumnKey: React.ReactText = this.props.columnDefinitions[
            newFocusColumnIndex
        ].columnDataKey;

        const rowElement: Element = this.getRowElementByKey(this.state.focusRowKey);

        if (isNil(rowElement)) {
            return;
        }

        const cellElement: Element = this.getCellElementByKey(
            newFocusColumnKey,
            rowElement
        );

        if (cellElement instanceof HTMLElement) {
            cellElement.focus();
        }
    };

    /**
     *  Get row element by key
     */
    private getRowElementByKey = (rowId: React.ReactText): Element => {
        if (isNil(this.rootElement.current)) {
            return null;
        }
        return this.rootElement.current.querySelector(`[data-rowid=${rowId}]`);
    };

    /**
     *  Get cell element by key
     */
    private getCellElementByKey = (
        columnKey: React.ReactText,
        rowElement: Element
    ): Element => {
        if (isNil(rowElement)) {
            return null;
        }

        return rowElement.querySelector(`[data-cellid=${columnKey}]`);
    };

    /**
     *  Move focus to a cell in the whole dataset based on row and cell id
     */
    private focusOnCell = (
        rowId: React.ReactText,
        cellId: React.ReactText,
        rowPositions: RowPosition[],
        forceScrollRowToTop: boolean
    ): void => {
        const rowIndex: number = this.getRowIndexByKey(rowId);

        if (rowIndex === -1) {
            //no such row id
            return;
        }

        if (
            rowIndex >= this.state.currentDataPageStartIndex &&
            rowIndex <= this.state.currentDataPageEndIndex
        ) {
            // see if the element is in the dom and focus it, otherwise falls back to setting desired focus
            const rowElement: Element = this.getRowElementByKey(rowId);
            if (rowElement !== null) {
                const cellElement: Element = this.getCellElementByKey(cellId, rowElement);
                this.setState({
                    desiredVisibleRowIndex: forceScrollRowToTop ? rowIndex : null,
                });
                if (cellElement !== null) {
                    (cellElement as HTMLElement).focus();
                    return;
                }
            }
        } else {
            // shift the items passed to the stack panel to include the desired row indexes
            let newDataPageStartIndex: number =
                rowIndex - Math.floor(this.props.pageSize / 2);
            if (newDataPageStartIndex < 0) {
                newDataPageStartIndex = 0;
            }

            let newDataPageEndIndex: number =
                newDataPageStartIndex + this.props.pageSize - 1;
            if (newDataPageEndIndex > this.props.gridData.length - 1) {
                newDataPageEndIndex = this.props.gridData.length - 1;
            }

            this.sizeRowsToIndex(newDataPageEndIndex, rowPositions);

            this.setState({
                currentDataPageStartIndex: newDataPageStartIndex,
                currentDataPageEndIndex: newDataPageEndIndex,
                rowPositions: rowPositions,
                estimatedTotalHeight: this.getEstimatedTotalHeight(rowPositions),
            });
        }

        this.setState({
            desiredVisibleRowIndex: forceScrollRowToTop ? rowIndex : null,
            desiredFocusRowKey: rowId,
            desiredFocusColumnKey: cellId,
        });
    };

    /**
     *  Get column index by key
     */
    private getColumnIndexByKey = (columnKey: React.ReactText): number => {
        return this.props.columnDefinitions.findIndex(
            (columnDefinition: DataGridColumnDefinition) => {
                return columnDefinition.columnDataKey === columnKey;
            }
        );
    };

    /**
     * Get row index by key
     */
    private getRowIndexByKey = (rowKey: ReactText): number => {
        const rowIndex: number = this.props.gridData.findIndex((dataRow: object) => {
            return dataRow[this.props.dataRowKey] === rowKey;
        });
        return rowIndex;
    };

    /**
     * Handle focus event
     */
    private handleCellFocus = (
        cell: DataGridCellProps,
        e: React.FocusEvent<HTMLElement>
    ): void => {
        if (e.defaultPrevented) {
            return;
        }

        const focusRowKey: ReactText = cell.rowData[this.props.dataRowKey];

        this.setState({
            focusRowKey,
            focusColumnKey: cell.columnDefinition.columnDataKey,
            focusRowIndex: this.getRowIndexByKey(focusRowKey),
            desiredFocusRowKey: null,
            desiredFocusColumnKey: null,
        });
    };

    /**
     *  Updates the direction
     */
    private updateDirection = (): void => {
        if (this.rootElement.current === null) {
            return;
        }

        const closest: Element = this.rootElement.current.closest(`[dir]`);

        if (closest === null) {
            this.direction = Direction.ltr;
            return;
        }

        this.direction =
            closest.getAttribute("dir").toLowerCase() === "rtl"
                ? Direction.rtl
                : Direction.ltr;
    };

    /**
     * Converts a row index in the base dataset to an index in the current data page
     * passed to the stack panel.  Returns -1 if outside that range.
     */
    private convertGridDataIndexToStackPanelIndex = (
        gridDataIndex: number,
        dataPageStartIndex: number,
        dataPageEndIndex: number
    ): number => {
        if (gridDataIndex < dataPageStartIndex || gridDataIndex > dataPageEndIndex) {
            return -1;
        }

        return gridDataIndex - dataPageStartIndex + 1;
    };
}

export default DataGrid;
export * from "./data-grid.props";
export { DataGridContext, DataGridContextType, DataGridClassNameContract };
