import { command } from "@drizzle-team/brocli";
import { exec } from "node:child_process";
import path from "node:path";

export const dbCmd = command({
	name: "db",
	handler: () => {
		const cwd = path.join("../../packages/db");
		const p = exec("pnpm drizzle push", {
			env: {
				DATABASE_CONN_TYPE: "local",
				...process.env,
			},
			cwd,
		});

		p.stdout?.on("data", console.log);
		p.on("message", console.log);
		p.on("error", console.error);
		p.on("exit", (c) => console.log(`Exited with code ${c}`));
	},
});
