import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@tau/auth-client";
import { Avatar, Button, Input, Label, Separator } from "@tau/ui";
import React from "react";

export const Route = createFileRoute("/app/settings/account/profile")({
	component: RouteComponent,
	staticData: {
		breadcrumb: () => "Profile",
	},
});

function RouteComponent() {
	const { data, isPending } = authClient.useSession();

	const [firstName, setFirstName] = React.useState("");
	const [lastName, setLastName] = React.useState("");
	const [email, setEmail] = React.useState("");

	React.useEffect(() => {
		if (data?.user) {
			const [first, ...rest] = (data.user.name || "").split(" ");
			setFirstName(first || "");
			setLastName(rest.join(" ") || "");
			setEmail(data.user.email || "");
		}
	}, [data?.user]);

	// Placeholder for save handler
	const handleSave = async (e: React.FormEvent) => {
		e.preventDefault();
		await authClient.updateUser({ name: `${firstName} ${lastName}` });
	};

	if (isPending) {
		return <div>Loading...</div>;
	}

	return (
		<div className="flex flex-col gap-8">
			<section className="grid gap-x-8 gap-y-6 items-center sm:grid-cols-2">
				<div className="flex gap-4 items-center">
					<Avatar.Root className="border size-20">
						<Avatar.Image
							src={
								data?.user.image ?? "https://avatars.githubusercontent.com/u/73390323?v=4"
							}
						/>
					</Avatar.Root>

					<div className="flex flex-col gap-2">
						<div className="flex gap-2">
							<Button>Upload picture</Button>
							<Button variant="ghost">Remove</Button>
						</div>
						<p className="text-sm">Recommended size 1:1, upto 2MB</p>
					</div>
				</div>
			</section>

			<Separator />

			<form onSubmit={handleSave}>
				<section className="grid gap-x-8 gap-y-6 items-center sm:grid-cols-2">
					<div className="space-y-1">
						<h3 className="font-medium">Name</h3>
						<p className="max-w-[30ch] text-balance text-sm">
							{data?.user ? data.user.name : "No name set"}
						</p>
					</div>

					<div className="space-y-4 max-w-sm min-w-[30ch]">
						<div className="space-y-2">
							<Label htmlFor="firstName">First name</Label>
							<Input
								id="firstName"
								value={firstName}
								onChange={(e) => setFirstName(e.target.value)}
								autoComplete="given-name"
							/>
						</div>
						<div className="space-y-2">
							<Label htmlFor="lastName">Last name</Label>
							<Input
								id="lastName"
								value={lastName}
								onChange={(e) => setLastName(e.target.value)}
								autoComplete="family-name"
							/>
						</div>
						<Button type="submit" className="mt-2">
							Save
						</Button>
					</div>
				</section>
			</form>

			<Separator />

			<section className="grid gap-x-8 gap-y-6 items-center sm:grid-cols-2">
				<div className="space-y-1">
					<h3 className="font-medium">Email</h3>
					<p className="max-w-[30ch] text-balance text-sm">{email || "No email set"}</p>
				</div>
			</section>

			<Separator />
		</div>
	);
}
