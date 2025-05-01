import { createFileRoute } from "@tanstack/react-router";
import { authClient } from "@tau/auth-client";
import { Avatar, Button, Input, Label, Separator } from "@tau/ui";

export const Route = createFileRoute("/app/settings/account/profile")({
  component: RouteComponent,
  staticData: {
    breadcrumb: () => "Profile",
  },
});

function RouteComponent() {
  const { data } = authClient.useSession();

  return (
    <div className="flex flex-col gap-8">
      <section className="grid gap-x-8 gap-y-6 items-center sm:grid-cols-2">
        <div className="flex gap-4 items-center">
          <Avatar.Root className="border size-20">
            <Avatar.Image src="https://avatars.githubusercontent.com/u/73390323?v=4" />
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

      <section className="grid gap-x-8 gap-y-6 items-center sm:grid-cols-2">
        <div className="space-y-1">
          <h3 className="font-medium">Name</h3>
          <p className="max-w-[30ch] text-balance text-sm">
            {data?.user
              ? data.user.name
              : "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"}
          </p>
        </div>

        <div className="space-y-4 max-w-sm min-w-[30ch]">
          <div className="space-y-2">
            <Label>First name</Label>
            <Input />
          </div>
          <div className="space-y-2">
            <Label>Last name</Label>
            <Input />
          </div>
        </div>
      </section>

      <Separator />

      <section className="grid gap-x-8 gap-y-6 items-center sm:grid-cols-2">
        <div className="space-y-1">
          <h3 className="font-medium">Email</h3>
          <p className="max-w-[30ch] text-balance text-sm">
            {data?.user
              ? data.user.email
              : "Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet Lorem ipsum dolor sit amet"}
          </p>
        </div>
      </section>

      <Separator />
    </div>
  );
}
