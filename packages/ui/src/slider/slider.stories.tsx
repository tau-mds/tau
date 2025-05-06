import type { Meta, StoryObj } from "@storybook/react";
import { Slider } from "./slider";

const meta = {
  title: "Components / Slider",
  component: Slider,

  render: () => <Slider defaultValue={[50]} max={100} step={1} className="w-[60%]" />,
} satisfies Meta<typeof Slider>;
export default meta;

type Story = StoryObj<typeof Slider>;
export const Default = {} satisfies Story;
