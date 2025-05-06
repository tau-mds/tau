import type { Meta, StoryObj } from "@storybook/react";
import { Toggle } from "./index";

import Bold from "~icons/radix-icons/font-bold";
import Italic from "~icons/radix-icons/font-italic";
import Underline from "~icons/radix-icons/underline";

const meta = {
  title: "Components / Toggle",
  component: Toggle,
} satisfies Meta<typeof Toggle>;
export default meta;

type Story = StoryObj<typeof Toggle>;

export const Default = {
  render: () => (
    <Toggle aria-label="Toggle italic">
      <Bold className="size-4" />
    </Toggle>
  ),
} satisfies Story;

export const Outline = {
  render: () => (
    <Toggle variant="outline" aria-label="Toggle italic">
      <Italic />
    </Toggle>
  ),
} satisfies Story;

export const WithText = {
  render: () => (
    <Toggle aria-label="Toggle italic">
      <Italic />
      Italic
    </Toggle>
  ),
} satisfies Story;

export const Small = {
  render: () => (
    <Toggle size="sm" aria-label="Toggle italic">
      <Italic />
    </Toggle>
  ),
} satisfies Story;

export const Large = {
  render: () => (
    <Toggle size="lg" aria-label="Toggle italic">
      <Italic />
    </Toggle>
  ),
} satisfies Story;

export const Disabled = {
  render: () => (
    <Toggle aria-label="Toggle italic" disabled>
      <Underline className="size-4" />
    </Toggle>
  ),
} satisfies Story;
