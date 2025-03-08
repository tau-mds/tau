export function assert(condition: boolean, message?: string): asserts condition;
export function assert<T>(value: T | null | undefined, message?: string): NonNullable<T>;
export function assert<T>(input: T, message?: string): T {
	if (input === false || input === null) {
		throw new Error(message ?? `Assertion failed: value is ${String(input)}`);
	}

	return input;
}
