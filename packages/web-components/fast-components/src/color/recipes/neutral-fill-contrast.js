import { directionByIsDark } from "../utilities/direction-by-is-dark";
/**
 * @internal
 */
export function neutralFillContrast(
    palette,
    reference,
    restDelta,
    hoverDelta,
    activeDelta,
    focusDelta
) {
    const direction = directionByIsDark(reference);
    const accessibleIndex = palette.closestIndexOf(palette.colorContrast(reference, 4.5));
    const accessibleIndex2 =
        accessibleIndex + direction * Math.abs(restDelta - hoverDelta);
    const indexOneIsRest =
        direction === 1
            ? restDelta < hoverDelta
            : direction * restDelta > direction * hoverDelta;
    let restIndex;
    let hoverIndex;
    if (indexOneIsRest) {
        restIndex = accessibleIndex;
        hoverIndex = accessibleIndex2;
    } else {
        restIndex = accessibleIndex2;
        hoverIndex = accessibleIndex;
    }
    return {
        rest: palette.get(restIndex),
        hover: palette.get(hoverIndex),
        active: palette.get(restIndex + direction * activeDelta),
        focus: palette.get(restIndex + direction * focusDelta),
    };
}
