import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import { Switch } from "../switch";
import { Card } from "./index";

import BellRing from "~icons/radix-icons/bell";
import Check from "~icons/radix-icons/check";

const notifications = [
  {
    title: "Your call has been confirmed.",
    description: "1 hour ago",
  },
  {
    title: "You have a new message!",
    description: "1 hour ago",
  },
  {
    title: "Your subscription is expiring soon!",
    description: "2 hours ago",
  },
];

const meta = {
  title: "components / Card",
  component: Card.Root,
  parameters: {
    layout: "centered",
  },

  render: (args) => (
    <Card.Root className="w-[380px]" {...args}>
      <Card.Header>
        <Card.Title>Notifications</Card.Title>
        <Card.Description>You have 3 unread messages.</Card.Description>
      </Card.Header>
      <Card.Content className="grid gap-4">
        <div className=" flex items-center space-x-4 rounded-md border p-4">
          <BellRing />
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">Push Notifications</p>
            <p className="text-sm text-muted-foreground">Send notifications to device.</p>
          </div>
          <Switch />
        </div>
        <div>
          {notifications.map((notification, index) => (
            <div
              key={index}
              className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
            >
              <span className="flex h-2 w-2 translate-y-1 rounded-full bg-accent-9" />
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{notification.title}</p>
                <p className="text-sm text-muted-foreground">
                  {notification.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </Card.Content>
      <Card.Footer>
        <Button className="w-full">
          <Check /> Mark all as read
        </Button>
      </Card.Footer>
    </Card.Root>
  ),
} satisfies Meta<typeof Card.Root>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};
