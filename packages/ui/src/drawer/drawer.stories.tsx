import type { Meta, StoryObj } from "@storybook/react";
import { Drawer } from "./index";
import React from "react";
import { Button } from "../button";
import { Bar, BarChart, ResponsiveContainer } from "recharts";

import Dash from "~icons/radix-icons/dash";
import Plus from "~icons/radix-icons/plus";

const data = [
  { goal: 400 },
  { goal: 300 },
  { goal: 200 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 239 },
  { goal: 300 },
  { goal: 200 },
  { goal: 278 },
  { goal: 189 },
  { goal: 349 },
];

const meta = {
  title: "Components / Drawer",
  component: Drawer.Root,
  parameters: { layout: "center" },

  render: () => {
    const [goal, setGoal] = React.useState(350);

    const onClick = (adjustment: number) => {
      setGoal(Math.max(200, Math.min(400, goal + adjustment)));
    };

    return (
      <Drawer.Root>
        <Drawer.Trigger asChild>
          <Button variant="outline">Open Drawer</Button>
        </Drawer.Trigger>
        <Drawer.Content>
          <div className="mx-auto w-full max-w-sm">
            <Drawer.Header>
              <Drawer.Title>Move Goal</Drawer.Title>
              <Drawer.Description>
                Set your daily activity goal.
              </Drawer.Description>
            </Drawer.Header>
            <div className="p-4 pb-0">
              <div className="flex items-center justify-center space-x-2">
                <Button
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => onClick(-10)}
                  disabled={goal <= 200}
                >
                  <Dash />
                  <span className="sr-only">Decrease</span>
                </Button>
                <div className="flex-1 text-center">
                  <div className="text-7xl font-bold tracking-tighter">
                    {goal}
                  </div>
                  <div className="text-[0.70rem] uppercase text-muted-foreground">
                    Calories/day
                  </div>
                </div>
                <Button
                  size="icon"
                  className="h-8 w-8 shrink-0 rounded-full"
                  onClick={() => onClick(10)}
                  disabled={goal >= 400}
                >
                  <Plus />
                  <span className="sr-only">Increase</span>
                </Button>
              </div>
              <div className="mt-3 h-[120px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={data}>
                    <Bar
                      dataKey="goal"
                      style={
                        {
                          fill: "var(--foreground)",
                          opacity: 0.9,
                        } as React.CSSProperties
                      }
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
            <Drawer.Footer>
              <Button>Submit</Button>
              <Drawer.Close asChild>
                <Button variant="ghost">Cancel</Button>
              </Drawer.Close>
            </Drawer.Footer>
          </div>
        </Drawer.Content>
      </Drawer.Root>
    );
  },
} satisfies Meta<typeof Drawer.Root>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};
