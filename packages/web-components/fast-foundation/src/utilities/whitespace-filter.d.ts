/**
 * a method to filter out any whitespace _only_ nodes, to be used inside a template
 * @param value - The Node that is being inspected
 * @param index - The index of the node within the array
 * @param array - The Node array that is being filtered
 *
 * @public
 */
export declare function whitespaceFilter(
    value: Node,
    index: number,
    array: Node[]
): boolean;
