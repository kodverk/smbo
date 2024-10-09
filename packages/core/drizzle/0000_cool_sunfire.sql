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
CREATE TABLE `events` (
	`id` text(30) PRIMARY KEY NOT NULL,
	`time_created` integer DEFAULT (unixepoch()) NOT NULL,
	`time_updated` integer DEFAULT (unixepoch()) NOT NULL,
	`title` text(255) NOT NULL,
	`description` text NOT NULL,
	`start_time` integer NOT NULL,
	`end_time` integer,
	`created_by` text(30) NOT NULL,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
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
CREATE TABLE `home` (
	`id` text(30) PRIMARY KEY NOT NULL,
	`time_created` integer DEFAULT (unixepoch()) NOT NULL,
	`time_updated` integer DEFAULT (unixepoch()) NOT NULL,
	`name` text NOT NULL,
	`owner_id` text(30) NOT NULL,
	`description` text,
	`color_hex` text(7),
	FOREIGN KEY (`owner_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `list_items` (
	`id` text(30) PRIMARY KEY NOT NULL,
	`time_created` integer DEFAULT (unixepoch()) NOT NULL,
	`time_updated` integer DEFAULT (unixepoch()) NOT NULL,
	`list_id` text(30) NOT NULL,
	`name` text NOT NULL,
	`is_completed` integer,
	`quantity` integer,
	FOREIGN KEY (`list_id`) REFERENCES `lists`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `lists` (
	`id` text(30) PRIMARY KEY NOT NULL,
	`time_created` integer DEFAULT (unixepoch()) NOT NULL,
	`time_updated` integer DEFAULT (unixepoch()) NOT NULL,
	`home_id` text NOT NULL,
	`type` text NOT NULL,
	`name` text NOT NULL,
	`created_by` text(30) NOT NULL,
	FOREIGN KEY (`home_id`) REFERENCES `home`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`created_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text(30) PRIMARY KEY NOT NULL,
	`user_id` text(30) NOT NULL,
	`expires_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `shared_expenses` (
	`id` text(30) PRIMARY KEY NOT NULL,
	`time_created` integer DEFAULT (unixepoch()) NOT NULL,
	`time_updated` integer DEFAULT (unixepoch()) NOT NULL,
	`transaction_id` text(30) NOT NULL,
	`user_id` text(30) NOT NULL,
	`amount_owed` real NOT NULL,
	`settled` integer DEFAULT false NOT NULL,
	FOREIGN KEY (`transaction_id`) REFERENCES `transactions`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transaction_categories` (
	`id` text(30) PRIMARY KEY NOT NULL,
	`time_created` integer DEFAULT (unixepoch()) NOT NULL,
	`time_updated` integer DEFAULT (unixepoch()) NOT NULL,
	`emoji` text,
	`color_hex` text,
	`home_id` text(30) NOT NULL,
	`name` text NOT NULL,
	FOREIGN KEY (`home_id`) REFERENCES `home`(`id`) ON UPDATE no action ON DELETE no action
);
--> statement-breakpoint
CREATE TABLE `transactions` (
	`id` text(30) PRIMARY KEY NOT NULL,
	`time_created` integer DEFAULT (unixepoch()) NOT NULL,
	`time_updated` integer DEFAULT (unixepoch()) NOT NULL,
	`amount` real NOT NULL,
	`description` text NOT NULL,
	`category_id` text(30),
	`home_id` text(30) NOT NULL,
	`paid_by` text(30) NOT NULL,
	`transaction_date` integer NOT NULL,
	FOREIGN KEY (`category_id`) REFERENCES `transaction_categories`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`home_id`) REFERENCES `home`(`id`) ON UPDATE no action ON DELETE no action,
	FOREIGN KEY (`paid_by`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE no action
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