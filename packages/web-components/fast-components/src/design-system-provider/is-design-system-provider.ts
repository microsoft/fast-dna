import { DesignSystemProvider } from "./design-system-provider";

/**
 * Type-safe checking for if an HTMLElement is a DesignSystemProvider.
 * @param el The element to test
 */
export function isDesignSystemProvider(
    el: HTMLElement | DesignSystemProvider
): el is DesignSystemProvider {
    return (
        (el as DesignSystemProvider).isDesignSystemProvider ||
        el instanceof DesignSystemProvider
    );
}
