import { Collapsible, DropdownMenu } from "@tau/ui";
import type React from "react";

import { useIsMobile } from "~/lib/use-media-query";

import { ThemeSwitcher } from "../theme-switcher";
import { Sidebar } from "./index";
import { SidebarLogo } from "./logo";
import { SidebarUserMenu } from "./user-menu";

import ChevronRight from "~icons/radix-icons/chevron-right";
import DotsHorizontal from "~icons/radix-icons/dots-horizontal";

const navMain = [
	{
		title: "Playground",
		url: "#",
		isActive: true,
		items: [
			{ title: "History", url: "#" },
			{ title: "Starred", url: "#" },
			{ title: "Settings", url: "#" },
		],
	},
	{
		title: "Models",
		url: "#",
		items: [
			{ title: "Genesis", url: "#" },
			{ title: "Explorer", url: "#" },
			{ title: "Quantum", url: "#" },
		],
	},
	{
		title: "Documentation",
		url: "#",
		items: [
			{ title: "Introduction", url: "#" },
			{ title: "Get Started", url: "#" },
			{ title: "Tutorials", url: "#" },
			{ title: "Changelog", url: "#" },
		],
	},
	{
		title: "Settings",
		url: "#",
		items: [
			{ title: "General", url: "#" },
			{ title: "Team", url: "#" },
			{ title: "Billing", url: "#" },
			{ title: "Limits", url: "#" },
		],
	},
];

const projects = [
	{ name: "Design Engineering", url: "#" },
	{ name: "Sales & Marketing", url: "#" },
	{ name: "Travel", url: "#" },
];

const navSecondary = [
	{ title: "Support", url: "#" },
	{ title: "Feedback", url: "#" },
];

export function AppSidebar(props: { children: React.ReactNode }) {
	const isMobile = useIsMobile();

	return (
		<Sidebar.Layout>
			<Sidebar.Root>
				<SidebarLogo />

				<Sidebar.Content>
					<Sidebar.Group>
						<Sidebar.GroupLabel>Platform</Sidebar.GroupLabel>
						<Sidebar.Menu>
							{navMain.map((it) => (
								<Collapsible.Root
									key={it.title}
									asChild
									defaultOpen={it.isActive ?? false}
								>
									<Sidebar.MenuItem>
										<Sidebar.MenuButton asChild>
											<a href={it.url}>
												<span>{it.title}</span>
											</a>
										</Sidebar.MenuButton>
										{it.items?.length ? (
											<>
												<Collapsible.Trigger asChild>
													<Sidebar.MenuAction className="data-[state=open]:rotate-90">
														<ChevronRight />
														<span className="sr-only">Toggle</span>
													</Sidebar.MenuAction>
												</Collapsible.Trigger>

												<Collapsible.Content>
													<Sidebar.MenuSub>
														{it.items?.map((subItem) => (
															<Sidebar.MenuSubItem key={subItem.title}>
																<Sidebar.MenuSubButton asChild>
																	<a href={subItem.url}>
																		<span>{subItem.title}</span>
																	</a>
																</Sidebar.MenuSubButton>
															</Sidebar.MenuSubItem>
														))}
													</Sidebar.MenuSub>
												</Collapsible.Content>
											</>
										) : null}
									</Sidebar.MenuItem>
								</Collapsible.Root>
							))}
						</Sidebar.Menu>
					</Sidebar.Group>

					<Sidebar.Group>
						<Sidebar.GroupLabel>Projects</Sidebar.GroupLabel>

						<Sidebar.Menu>
							{projects.map((it) => (
								<Sidebar.MenuItem key={it.name}>
									<Sidebar.MenuButton asChild>
										<a href={it.url}>
											<span>{it.name}</span>
										</a>
									</Sidebar.MenuButton>
									<DropdownMenu.Root>
										<DropdownMenu.Trigger asChild>
											<Sidebar.MenuAction>
												<DotsHorizontal />
												<span className="sr-only">More</span>
											</Sidebar.MenuAction>
										</DropdownMenu.Trigger>

										<DropdownMenu.Content
											className="w-48"
											side={isMobile ? "bottom" : "right"}
											align={isMobile ? "end" : "start"}
										>
											<DropdownMenu.Item>
												<span>View Project</span>
											</DropdownMenu.Item>
											<DropdownMenu.Item>
												<span>Share Project</span>
											</DropdownMenu.Item>
											<DropdownMenu.Separator />
											<DropdownMenu.Item>
												<span>Delete Project</span>
											</DropdownMenu.Item>
										</DropdownMenu.Content>
									</DropdownMenu.Root>
								</Sidebar.MenuItem>
							))}

							<Sidebar.MenuItem>
								<Sidebar.MenuButton asChild>
									<span>More</span>
								</Sidebar.MenuButton>
							</Sidebar.MenuItem>
						</Sidebar.Menu>
					</Sidebar.Group>

					<Sidebar.Group className="mt-auto">
						<Sidebar.GroupContent>
							<Sidebar.Menu>
								{navSecondary.map((item) => (
									<Sidebar.MenuItem key={item.title}>
										<Sidebar.MenuButton asChild>
											<a href={item.url}>
												<span>{item.title}</span>
											</a>
										</Sidebar.MenuButton>
									</Sidebar.MenuItem>
								))}
							</Sidebar.Menu>
						</Sidebar.GroupContent>
					</Sidebar.Group>
				</Sidebar.Content>

				<Sidebar.Footer>
					<ThemeSwitcher />

					<SidebarUserMenu />
				</Sidebar.Footer>
			</Sidebar.Root>

			<Sidebar.Handle />

			<Sidebar.Main>{props.children}</Sidebar.Main>
		</Sidebar.Layout>
	);
}
