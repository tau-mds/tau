import {
	ErrorComponent,
	type ErrorComponentProps,
	Link,
	rootRouteId,
	useMatch,
	useRouter,
} from "@tanstack/react-router";
import { Button } from "@tau/ui";

export function ErrorBoundary(props: ErrorComponentProps) {
	const router = useRouter();
	const isRoot = useMatch({
		strict: false,
		select: (state) => state.id === rootRouteId,
	});

	console.error(props.error);

	return (
		<div className="min-w-0 flex-1 p-4 flex flex-col items-center justify-center gap-6">
			<ErrorComponent error={props.error} />

			<div className="flex gap-2 items-center flex-wrap">
				<Button
					type="button"
					onClick={() => {
						router.invalidate();
					}}
				>
					Try Again
				</Button>
				<Button variant="link" asChild>
					{isRoot ? (
						<Link to="/">TanStack Home</Link>
					) : (
						<Link
							to="/"
							onClick={(e) => {
								e.preventDefault();
								window.history.back();
							}}
						>
							Go Back
						</Link>
					)}
				</Button>
			</div>
		</div>
	);
}
