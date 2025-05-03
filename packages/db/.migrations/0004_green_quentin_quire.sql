PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_interview_slots` (
	`id` text PRIMARY KEY NOT NULL,
	`interview_round_id` text NOT NULL,
	`interviewer_email` text NOT NULL,
	`interviewee_email` text,
	`start_at` integer NOT NULL,
	`created_at` integer DEFAULT (unixepoch()) NOT NULL,
	`assigned_at` integer,
	FOREIGN KEY (`interview_round_id`) REFERENCES `interview_rounds`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`interviewer_email`,`interview_round_id`) REFERENCES `interviewers`(`email`,`interview_round_id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`interviewee_email`,`interview_round_id`) REFERENCES `interviewees`(`email`,`interview_round_id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
INSERT INTO `__new_interview_slots`("id", "interview_round_id", "interviewer_email", "interviewee_email", "start_at", "created_at", "assigned_at") SELECT "id", "interview_round_id", "interviewer_email", "interviewee_email", "start_at", "created_at", "assigned_at" FROM `interview_slots`;--> statement-breakpoint
DROP TABLE `interview_slots`;--> statement-breakpoint
ALTER TABLE `__new_interview_slots` RENAME TO `interview_slots`;--> statement-breakpoint
PRAGMA foreign_keys=ON;--> statement-breakpoint
ALTER TABLE `interview_rounds` ALTER COLUMN "organizer_id" TO "organizer_id" text NOT NULL REFERENCES organizer(id) ON DELETE no action ON UPDATE no action;