import { Link, useMatches } from "@tanstack/react-router";
import { Breadcrumb, DropdownMenu } from "@tau/ui";
import React from "react";

export function Breadcrumbs() {
	const breadcrumbs = useMatches({
		select: (matches) =>
			matches
				.filter((m) => Boolean(m.staticData.breadcrumb))
				.map((m) => ({
					breadcrumb: m.staticData.breadcrumb,
					href: m.pathname,
				})),
	});

	const visibleItems = breadcrumbs.slice(-2, -1);
	const ellipsed = breadcrumbs.slice(0, -2);
	const current = breadcrumbs.at(-1);

	return (
		<Breadcrumb.Root>
			<Breadcrumb.List>
				<Breadcrumb.Item>
					<Breadcrumb.Link asChild>
						<Link to="/">Home</Link>
					</Breadcrumb.Link>
				</Breadcrumb.Item>

				{!ellipsed.length ? null : (
					<>
						<Breadcrumb.Separator />

						<Breadcrumb.Item>
							<DropdownMenu.Root>
								<DropdownMenu.Trigger className="size-5 grid place-content-center">
									<Breadcrumb.Ellipsis />
								</DropdownMenu.Trigger>

								<DropdownMenu.Content>
									{ellipsed.map((b, idx) => (
										<DropdownMenu.Item key={`${b.href}-${idx}`} asChild>
											<Link to={b.href}>{b.breadcrumb()}</Link>
										</DropdownMenu.Item>
									))}
								</DropdownMenu.Content>
							</DropdownMenu.Root>
						</Breadcrumb.Item>
					</>
				)}

				{visibleItems.map((b, idx) => (
					<React.Fragment key={`${b.href}-${idx}`}>
						<Breadcrumb.Separator />

						<Breadcrumb.Item>
							<Breadcrumb.Link asChild>
								<Link to={b.href}>{b.breadcrumb()}</Link>
							</Breadcrumb.Link>
						</Breadcrumb.Item>
					</React.Fragment>
				))}

				{!current ? null : (
					<>
						<Breadcrumb.Separator />

						<Breadcrumb.Item>
							<Breadcrumb.Page>{current.breadcrumb()}</Breadcrumb.Page>
						</Breadcrumb.Item>
					</>
				)}
			</Breadcrumb.List>
		</Breadcrumb.Root>
	);
}
