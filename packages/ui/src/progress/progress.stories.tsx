import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { Progress } from "./progress";

const meta = {
  title: "Components / Progress",
  component: Progress,

  render: () => {
    const [progress, setProgress] = React.useState(13);

    React.useEffect(() => {
      const timer = setTimeout(() => setProgress(66), 500);
      return () => clearTimeout(timer);
    }, []);

    return <Progress value={progress} className="w-[60%]" />;
  },
} satisfies Meta<typeof Progress>;
export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
