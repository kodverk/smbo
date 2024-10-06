CREATE TABLE `home_invitation` (
	`id` text(30) PRIMARY KEY NOT NULL,
	`time_created` integer DEFAULT (unixepoch()) NOT NULL,
	`time_updated` integer DEFAULT (unixepoch()) NOT NULL,
	`token` text NOT NULL,
	`home_id` text(30) NOT NULL,
	`inviter_id` text(30) NOT NULL,
	`invitee_id` text(30) NOT NULL,
	`status` text DEFAULT 'pending' NOT NULL,
	FOREIGN KEY (`home_id`) REFERENCES `home`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`inviter_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`invitee_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `home_member` (
	`home_id` text(30) NOT NULL,
	`user_id` text(30) NOT NULL,
	`joined_at` integer DEFAULT (unixepoch()) NOT NULL,
	PRIMARY KEY(`home_id`, `user_id`),
	FOREIGN KEY (`home_id`) REFERENCES `home`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
ALTER TABLE `home` ADD `owner_id` text(30) NOT NULL REFERENCES users(id);--> statement-breakpoint
ALTER TABLE `home` ADD `description` text;--> statement-breakpoint
ALTER TABLE `home` ADD `color_hex` text(7);--> statement-breakpoint
/*
 SQLite does not support "Creating foreign key on existing column" out of the box, we do not generate automatic migration for that, so it has to be done manually
 Please refer to: https://www.techonthenet.com/sqlite/tables/alter_table.php
                  https://www.sqlite.org/lang_altertable.html

 Due to that we don't generate migration automatically and it has to be done manually
*/