import type { Meta, StoryObj } from "@storybook/react";
import { Accordion } from "./index";

const meta = {
  title: "Components / Accordion",
  component: Accordion.Root,
  args: {
    type: "single",
  },

  render: (args) => (
    <Accordion.Root {...args} type="single" collapsible>
      <Accordion.Item value="item-1">
        <Accordion.Trigger>Is it accessible?</Accordion.Trigger>
        <Accordion.Content>
          Yes. It adheres to the WAI-ARIA design pattern.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-2">
        <Accordion.Trigger>Is it styled?</Accordion.Trigger>
        <Accordion.Content>
          Yes. It comes with default styles that matches the other
          components&apos; aesthetic.
        </Accordion.Content>
      </Accordion.Item>
      <Accordion.Item value="item-3">
        <Accordion.Trigger>Is it animated?</Accordion.Trigger>
        <Accordion.Content>
          Yes. It's animated by default, but you can disable it if you prefer.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  ),
} satisfies Meta<typeof Accordion.Root>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};
