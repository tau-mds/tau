import { Editable } from "@ark-ui/react";
import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Label } from "../label";

const meta = {
  title: "Components / Editable",
  component: Editable.Root,
  parameters: { layout: "centered" },

  render: () => {
    const [value, setValue] = React.useState("Hello world");

    return (
      <>
        <pre>{JSON.stringify(value)}</pre>
        <Editable.Root
          defaultValue={value}
          // defaultValue={value}
          // onValueCommit={(d) => {
          // 	console.debug("changed", d);
          // 	setValue(d.value);
          // }}
          autoResize
          selectOnFocus={false}
        >
          {/* <Editable.Label asChild>
						<Label>Label</Label>
					</Editable.Label> */}
          <Editable.Area>
            <Editable.Input className="outline-none" />
            <Editable.Preview />
          </Editable.Area>
        </Editable.Root>
      </>
    );
  },
} satisfies Meta<typeof Editable>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default = {} satisfies Story;
