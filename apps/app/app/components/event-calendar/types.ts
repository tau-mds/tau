export type CalendarEvent = {
  id: string;
  title: string;
  description?: string;
  start: Date;
  duration: number;
  color?: EventColor;
  location?: string;
};

export type EventColor =
  | "sky"
  | "amber"
  | "violet"
  | "rose"
  | "emerald"
  | "orange"
  | string;
