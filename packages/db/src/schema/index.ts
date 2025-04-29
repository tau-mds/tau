import * as foo from "./foo";
import * as authSchema from "./auth-schema";

export * as foo from "./foo";
export * as authSchema from "./auth-schema";

export const schema = {
	foo: foo.table,
	...authSchema,
};
