import { createFileRoute } from "@tanstack/react-router";
import { Button, Heading, Text } from "@tau/ui";
import React from "react";

export const Route = createFileRoute("/")({
	component: Component,
});

function Component() {
	const [count, setCount] = React.useState(0);

	return (
		<main className="m-8">
			<Heading size="lg">Proj. Tau</Heading>
			<div className="inline-flex items-center justify-between gap-3">
				<Button square onClick={() => setCount((prev) => prev - 1)}>
					<span className="size-5 grid place-content-center">-</span>
				</Button>
				<Text font="mono">{count}</Text>
				<Button square onClick={() => setCount((prev) => prev + 1)}>
					<span className="size-5 grid place-content-center">+</span>
				</Button>
			</div>
		</main>
	);
}
