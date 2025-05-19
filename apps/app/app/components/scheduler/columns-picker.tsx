import { Select } from "@tau/ui";

export const COLUMNS = [1, 2, 3, 7] as const;

export function ColumnsPicker(props: { onValueChange: (cols: number) => void }) {
  return (
    <Select.Root
      defaultValue={COLUMNS.at(-1)?.toString()}
      onValueChange={(val) => props.onValueChange(Number(val))}
    >
      <Select.Trigger>
        <Select.Value />
      </Select.Trigger>

      <Select.Content>
        {COLUMNS.map((days) => (
          <Select.Item key={days} value={days.toString()}>
            {days} {days === 1 ? "day" : "days"}
          </Select.Item>
        ))}
      </Select.Content>
    </Select.Root>
  );
}
