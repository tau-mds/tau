import type { Meta, StoryObj } from "@storybook/react";
import { Label } from "../label";
import { Switch } from "./switch";

const meta = {
  title: "Components / Switch",
  component: Switch,

  render: () => (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Airplane Mode</Label>
    </div>
  ),
} satisfies Meta<typeof Switch>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default = {} satisfies Story;
