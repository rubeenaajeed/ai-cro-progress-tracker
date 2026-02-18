CREATE TABLE `content_calendar` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`brand` enum('personal','business') NOT NULL,
	`platform` enum('instagram','tiktok','both') NOT NULL,
	`scheduledDate` varchar(10) NOT NULL,
	`postIdea` text NOT NULL,
	`contentType` varchar(50),
	`status` enum('draft','scheduled','published','archived') NOT NULL DEFAULT 'draft',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `content_calendar_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `phase2_metrics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`weekNumber` int NOT NULL,
	`brand` enum('personal','business') NOT NULL,
	`followersGained` int DEFAULT 0,
	`engagementRate` varchar(10),
	`postsPublished` int DEFAULT 0,
	`ordersReceived` int DEFAULT 0,
	`revenue` varchar(20),
	`conversionRate` varchar(10),
	`customerAcquisitionCost` varchar(20),
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `phase2_metrics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `phase2_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`brand` enum('personal','business') NOT NULL,
	`totalFollowers` int DEFAULT 0,
	`totalPostsPublished` int DEFAULT 0,
	`averageEngagementRate` varchar(10),
	`totalOrders` int DEFAULT 0,
	`totalRevenue` varchar(20),
	`averageConversionRate` varchar(10),
	`lastUpdatedWeek` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `phase2_progress_id` PRIMARY KEY(`id`)
);
