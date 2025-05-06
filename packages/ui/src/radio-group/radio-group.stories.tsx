import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from ".";
import { Label } from "../label";

const meta = {
  title: "Components / Radio Group",
  component: RadioGroup.Root,

  render: () => (
    <RadioGroup.Root defaultValue="comfortable">
      <div className="flex items-center space-x-2">
        <RadioGroup.Item value="default" id="r1" />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroup.Item value="comfortable" id="r2" />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroup.Item value="compact" id="r3" />
        <Label htmlFor="r3">Compact</Label>
      </div>
    </RadioGroup.Root>
  ),
} satisfies Meta<typeof RadioGroup.Root>;
export default meta;

type Story = StoryObj<typeof RadioGroup.Root>;
export const Default = {} satisfies Story;
