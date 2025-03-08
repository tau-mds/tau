import type { BaseMetadata } from "valibot";

/**
 * Description action interface.
 */
export interface ExampleAction<TInput, TExample extends TInput>
	extends BaseMetadata<TInput> {
	/**
	 * The action type.
	 */
	readonly type: "example";
	/**
	 * The action reference.
	 */
	readonly reference: typeof example;
	/**
	 * The description text.
	 */
	readonly example: TExample;
}

// @__NO_SIDE_EFFECTS__
export function example<TInput, TExample extends TInput>(
	example_: TExample,
): ExampleAction<TInput, TExample> {
	return {
		kind: "metadata",
		type: "example",
		reference: example,
		example: example_,
	};
}
