import type { Meta, StoryObj } from "@storybook/react";
import { Pagination } from "./index";

const meta = {
  title: "Components / Pagination",
  component: Pagination.Root,

  // subcomponents: { PaginationContent: Pagination.Content },

  render: () => (
    <Pagination.Root>
      <Pagination.Content>
        <Pagination.Item>
          <Pagination.Previous href="#" />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">1</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#" isActive>
            2
          </Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Link href="#">3</Pagination.Link>
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Ellipsis />
        </Pagination.Item>
        <Pagination.Item>
          <Pagination.Next href="#" />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination.Root>
  ),
} satisfies Meta<typeof Pagination.Root>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Default: Story = {};
