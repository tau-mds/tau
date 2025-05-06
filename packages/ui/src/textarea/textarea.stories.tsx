import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "../button";
import { Label } from "../label";
import { Textarea } from "./textarea";

const meta = {
  title: "Components / Textarea",
  component: Textarea,
} satisfies Meta<typeof Textarea>;
export default meta;

type Story = StoryObj<typeof Textarea>;

export const Default = {
  render: () => <Textarea placeholder="Type your message here." />,
} satisfies Story;

export const Disabled = {
  render: () => <Textarea placeholder="Type your message here." disabled />,
} satisfies Story;

export const WithLabel = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message">Your message</Label>
      <Textarea placeholder="Type your message here." id="message" />
    </div>
  ),
} satisfies Story;

export const WithText = {
  render: () => (
    <div className="grid w-full gap-1.5">
      <Label htmlFor="message-2">Your Message</Label>
      <Textarea placeholder="Type your message here." id="message-2" />
      <p className="text-sm text-muted-foreground">
        Your message will be copied to the support team.
      </p>
    </div>
  ),
} satisfies Story;

export const WithButton = {
  render: () => (
    <div className="grid w-full gap-2">
      <Textarea placeholder="Type your message here." />
      <Button>Send message</Button>
    </div>
  ),
} satisfies Story;
