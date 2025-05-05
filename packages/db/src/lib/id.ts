import { type SQLiteTextBuilderInitial, text } from "drizzle-orm/sqlite-core";
import { ids } from "../ids";
import type { $Type, HasDefault, HasRuntimeDefault } from "drizzle-orm";

export function id<T extends ids.type>(
	id: T,
	config: { generate: false },
): $Type<SQLiteTextBuilderInitial<"", [string, ...string[]], undefined>, ids.Infer<T>>;
export function id<T extends ids.type>(
	id: T,
	config?: { generate: true },
): HasRuntimeDefault<
	HasDefault<
		$Type<SQLiteTextBuilderInitial<"", [string, ...string[]], undefined>, ids.Infer<T>>
	>
>;

export function id<T extends ids.type>(id: T, config?: { generate: boolean }) {
	const col = text().$type<ids.Infer<T>>();
	return (config?.generate ?? true) ? col.$defaultFn(() => ids.generate(id)) : col;
}
