CREATE TABLE `email-verifications` (
	`id` text(30) PRIMARY KEY NOT NULL,
	`time_created` integer DEFAULT (unixepoch()) NOT NULL,
	`time_updated` integer DEFAULT (unixepoch()) NOT NULL,
	`code` text(6) NOT NULL,
	`user_id` text(30) NOT NULL,
	`email` text NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
--> statement-breakpoint
CREATE TABLE `home` (
	`id` text(30) PRIMARY KEY NOT NULL,
	`time_created` integer DEFAULT (unixepoch()) NOT NULL,
	`time_updated` integer DEFAULT (unixepoch()) NOT NULL,
	`name` text NOT NULL
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text(30) PRIMARY KEY NOT NULL,
	`user_id` text(30) NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` text(30) PRIMARY KEY NOT NULL,
	`time_created` integer DEFAULT (unixepoch()) NOT NULL,
	`time_updated` integer DEFAULT (unixepoch()) NOT NULL,
	`email_verified` integer DEFAULT false NOT NULL,
	`email` text NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `users_email_unique` ON `users` (`email`);