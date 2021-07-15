import { directionByIsDark } from "../utilities/direction-by-is-dark";
/**
 * The neutralStrokeDivider color recipe
 * @param palette - The palette to operate on
 * @param reference - The reference color
 * @param delta - The offset from the reference
 *
 * @internal
 */
export function neutralStrokeDivider(palette, reference, delta) {
    return palette.get(
        palette.closestIndexOf(reference) + directionByIsDark(reference) * delta
    );
}
