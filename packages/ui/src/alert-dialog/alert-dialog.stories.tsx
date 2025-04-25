import type { Meta, StoryObj } from "@storybook/react";
import { AlertDialog } from "./index";
import { Button } from "../button";

const meta = {
  title: "components / AlertDialog",
  component: AlertDialog.Root,

  render: (args) => (
    <AlertDialog.Root {...args}>
      <AlertDialog.Trigger asChild>
        <Button type="button">Show Dialog</Button>
      </AlertDialog.Trigger>

      <AlertDialog.Content>
        <AlertDialog.Header>
          <AlertDialog.Title>Are you absolutely sure?</AlertDialog.Title>
          <AlertDialog.Description>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Cancel>Cancel</AlertDialog.Cancel>
          <AlertDialog.Action>Continue</AlertDialog.Action>
        </AlertDialog.Footer>
      </AlertDialog.Content>
    </AlertDialog.Root>
  ),
} satisfies Meta<typeof AlertDialog.Root>;
export default meta;

type Story = StoryObj<typeof AlertDialog>;
export const Default: Story = {};
