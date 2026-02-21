CREATE TABLE `learning_journal` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`weekNumber` int NOT NULL,
	`track` enum('ai-cro','personal-brand','business') NOT NULL,
	`title` varchar(255),
	`content` text NOT NULL,
	`tags` varchar(500),
	`category` varchar(50),
	`isPinned` int DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `learning_journal_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `quiz_results` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`weekNumber` int NOT NULL,
	`track` enum('ai-cro','personal-brand','business') NOT NULL,
	`questionsAsked` int NOT NULL,
	`questionsCorrect` int NOT NULL,
	`scorePercentage` int NOT NULL,
	`timeSpentSeconds` int DEFAULT 0,
	`attemptNumber` int DEFAULT 1,
	`feedback` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `quiz_results_id` PRIMARY KEY(`id`)
);
