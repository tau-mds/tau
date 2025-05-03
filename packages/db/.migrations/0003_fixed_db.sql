PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_interview_rounds` (
	`id` text PRIMARY KEY NOT NULL,
	`organizer_id` text NOT NULL,
	`title` text NOT NULL,
	`description` text,
	`interview_duration` integer,
	`status` text NOT NULL,
	`start_date` integer NOT NULL,
	`end_date` integer,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`updated_at` integer DEFAULT (unixepoch()) NOT NULL
);
--> statement-breakpoint
DROP TABLE `interview_rounds`;--> statement-breakpoint
ALTER TABLE `__new_interview_rounds` RENAME TO `interview_rounds`;--> statement-breakpoint
PRAGMA foreign_keys=ON;