CREATE TABLE `pte_answers` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`questionId` varchar(64) NOT NULL,
	`userAnswer` text NOT NULL,
	`isCorrect` int NOT NULL DEFAULT 0,
	`score` varchar(10),
	`feedback` text,
	`feedbackDetails` text,
	`attemptNumber` int NOT NULL DEFAULT 1,
	`timeSpentSeconds` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pte_answers_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pte_mock_tests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`mockTestNumber` int NOT NULL,
	`weekNumber` int NOT NULL,
	`readingScore` varchar(10),
	`writingScore` varchar(10),
	`speakingScore` varchar(10),
	`listeningScore` varchar(10),
	`overallScore` varchar(10),
	`totalQuestions` int NOT NULL,
	`correctAnswers` int NOT NULL,
	`completionTime` int NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `pte_mock_tests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pte_progress` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`section` enum('reading','writing','speaking','listening') NOT NULL,
	`weekNumber` int NOT NULL,
	`totalQuestions` int NOT NULL DEFAULT 0,
	`correctAnswers` int NOT NULL DEFAULT 0,
	`averageScore` varchar(10) DEFAULT '0.00',
	`completionPercentage` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pte_progress_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `pte_questions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`questionId` varchar(64) NOT NULL,
	`section` enum('reading','writing','speaking','listening') NOT NULL,
	`questionType` varchar(100) NOT NULL,
	`difficulty` enum('easy','medium','hard') NOT NULL DEFAULT 'medium',
	`weekNumber` int NOT NULL,
	`content` text NOT NULL,
	`audioUrl` varchar(500),
	`options` text,
	`correctAnswer` text,
	`correctAnswerExplanation` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pte_questions_id` PRIMARY KEY(`id`),
	CONSTRAINT `pte_questions_questionId_unique` UNIQUE(`questionId`)
);
--> statement-breakpoint
CREATE TABLE `pte_user_notes` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`questionId` varchar(64) NOT NULL,
	`notes` text,
	`isFlagged` int NOT NULL DEFAULT 0,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `pte_user_notes_id` PRIMARY KEY(`id`)
);
