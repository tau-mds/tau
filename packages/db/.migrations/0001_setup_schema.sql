CREATE TABLE `interview_rounds` (
	`id` text PRIMARY KEY NOT NULL,
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
CREATE TABLE `interview_slots` (
	`id` text PRIMARY KEY NOT NULL,
	`interview_round_id` text NOT NULL,
	`interviewer_email` text NOT NULL,
	`interviewee_email` text,
	`start_at` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`assigned_at` integer,
	FOREIGN KEY (`interview_round_id`) REFERENCES `interview_rounds`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`interviewer_email`,`interview_round_id`) REFERENCES `interviewers`(`email`,`interview_round_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`interviewee_email`) REFERENCES `interviewees`(`email`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `interviewees` (
	`email` text NOT NULL,
	`interview_round_id` text NOT NULL,
	PRIMARY KEY(`email`, `interview_round_id`),
	FOREIGN KEY (`interview_round_id`) REFERENCES `interview_rounds`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `interviewers` (
	`email` text NOT NULL,
	`interview_round_id` text NOT NULL,
	`interviews_count` integer DEFAULT 1 NOT NULL,
	PRIMARY KEY(`email`, `interview_round_id`),
	FOREIGN KEY (`interview_round_id`) REFERENCES `interview_rounds`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `organizers` (
	`id` text PRIMARY KEY NOT NULL,
	`email` text NOT NULL,
	`password` text NOT NULL,
	`first_name` text NOT NULL,
	`last_name` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `organizers_email_unique` ON `organizers` (`email`);--> statement-breakpoint
DROP TABLE `foo`;