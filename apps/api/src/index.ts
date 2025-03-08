import { serve } from "@hono/node-server";
import { Hono } from "hono";
import { openAPISpecs } from "hono-openapi";

import { DocumentsApi } from "./routes/docs";
import { HTTPException } from "hono/http-exception";
import { ValiError } from "valibot";
import { EchoApi } from "./routes/v1/echo";

const app = new Hono();

const routes = app
	.route("/v1", new Hono().route("/echo", EchoApi.register))
	.onError((err, c) => {
		console.error(err);

		if (err instanceof ValiError) {
			return c.json({ code: err.name, message: err.message }, 400);
		}

		if (err instanceof HTTPException) {
			return c.json({ code: "request", message: "Invalid request" }, 400);
		}

		return c.json({ code: "internal", message: "Internal server error" }, 500);
	});

export type routes = typeof routes;

app.route("/docs", DocumentsApi.route);
app.get(
	"/openapi.json",
	openAPISpecs(routes, {
		documentation: {
			info: {
				title: "Tau API",
				description: "",
				version: "0.1.0",
			},
			servers: [
				{ url: "http://localhost:8788", description: "Local Server" },
				{ url: "https://api.tau.com", description: "Production" },
			],
			components: {
				securitySchemes: {
					Bearer: {
						type: "http",
						scheme: "bearer",
						bearerFormat: "JWT",
					},
				},
			},
			security: [{ Bearer: [] }],
		},
	}),
);

serve(
	{
		fetch: app.fetch,
		port: 8788,
	},
	(info) => {
		console.log(`Server is running on http://localhost:${info.port}`);
	},
);
