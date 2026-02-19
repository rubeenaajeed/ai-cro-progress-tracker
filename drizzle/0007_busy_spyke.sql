CREATE TABLE `badge_definitions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`badgeType` varchar(50) NOT NULL,
	`badgeName` varchar(100) NOT NULL,
	`description` text,
	`icon` varchar(50),
	`requiredWeek` int,
	`track` enum('ai-cro','personal-brand','business'),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `badge_definitions_id` PRIMARY KEY(`id`),
	CONSTRAINT `badge_definitions_badgeType_unique` UNIQUE(`badgeType`)
);
--> statement-breakpoint
CREATE TABLE `badges` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`badgeType` varchar(50) NOT NULL,
	`badgeName` varchar(100) NOT NULL,
	`description` text,
	`icon` varchar(50),
	`earnedAt` timestamp NOT NULL DEFAULT (now()),
	`weekNumber` int,
	`track` enum('ai-cro','personal-brand','business'),
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `badges_id` PRIMARY KEY(`id`)
);
