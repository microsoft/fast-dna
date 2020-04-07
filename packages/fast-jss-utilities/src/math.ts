function performOperation<T>(
    operation: (a: number, b: number) => number
): (...args: (number | ((designSystem: T) => number))[]) => (designSystem?: T) => number {
    return (
        ...args: (number | ((designSystem: T) => number))[]
    ): ((designSystem?: T) => number) => {
        return (designSystem?: T): number => {
            const firstArg: number | ((designSystem: T) => number) = args[0];
            let value: number =
                typeof firstArg === "function" ? firstArg(designSystem) : firstArg;

            for (let i: number = 1; i < args.length; i++) {
                const currentValue: number | ((designSystem: T) => number) = args[i];
                value = operation(
                    value,
                    typeof currentValue === "function"
                        ? currentValue(designSystem)
                        : currentValue
                );
            }

            return value;
        };
    };
}

const _add: (
    ...args: (number | ((designSystem: any) => number))[]
) => (designSystem?: any) => number = performOperation(
    (a: number, b: number): number => a + b
);
const _subtract: (
    ...args: (number | ((designSystem: any) => number))[]
) => (designSystem?: any) => number = performOperation(
    (a: number, b: number): number => a - b
);
const _multiply: (
    ...args: (number | ((designSystem: any) => number))[]
) => (designSystem?: any) => number = performOperation(
    (a: number, b: number): number => a * b
);
const _divide: (
    ...args: (number | ((designSystem: any) => number))[]
) => (designSystem?: any) => number = performOperation(
    (a: number, b: number): number => a / b
);
/**
 * Adds numbers or functions that accept a design system and return a number.
 */
export function add<T>(
    ...args: (number | ((designSystem: T) => number))[]
): (designSystem?: T) => number {
    return _add.apply(this, args);
}

/**
 * Subtract numbers or functions that accept a design system and return a number.
 */
export function subtract<T>(
    ...args: (number | ((designSystem: T) => number))[]
): (designSystem?: T) => number {
    return _subtract.apply(this, args);
}

/**
 * Multiplies numbers or functions that accept a design system and return a number.
 */
export function multiply<T>(
    ...args: (number | ((designSystem: T) => number))[]
): (designSystem?: T) => number {
    return _multiply.apply(this, args);
}

/**
 * Divides numbers or functions that accept a design system and return a number.
 */
export function divide<T>(
    ...args: (number | ((designSystem: T) => number))[]
): (designSystem?: T) => number {
    return _divide.apply(this, args);
}
