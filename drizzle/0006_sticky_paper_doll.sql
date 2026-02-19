CREATE TABLE `ai_cro_metrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`recordDate` varchar(10) NOT NULL,
	`courseCompletionPercentage` int DEFAULT 0,
	`skillsAcquired` int DEFAULT 0,
	`linkedinVisibility` varchar(20),
	`linkedinConnections` int DEFAULT 0,
	`linkedinEngagement` varchar(10),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `ai_cro_metrics_id` PRIMARY KEY(`id`)
);
