import { int, mysqlEnum, mysqlTable, text, timestamp, varchar } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Weekly progress tracking table
 */
export const weeklyProgress = mysqlTable("weekly_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  weekNumber: int("weekNumber").notNull(),
  completionPercentage: int("completionPercentage").default(0).notNull(),
  tasksCompleted: int("tasksCompleted").default(0).notNull(),
  totalTasks: int("totalTasks").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type WeeklyProgress = typeof weeklyProgress.$inferSelect;
export type InsertWeeklyProgress = typeof weeklyProgress.$inferInsert;

/**
 * Daily check-ins table
 */
export const dailyCheckIns = mysqlTable("daily_check_ins", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  date: varchar("date", { length: 10 }).notNull(), // YYYY-MM-DD format
  completedTasks: text("completedTasks"), // JSON array of task descriptions
  notes: text("notes"),
  streakCount: int("streakCount").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type DailyCheckIn = typeof dailyCheckIns.$inferSelect;
export type InsertDailyCheckIn = typeof dailyCheckIns.$inferInsert;

/**
 * Portfolio projects table
 */
export const portfolioProjects = mysqlTable("portfolio_projects", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  projectName: varchar("projectName", { length: 255 }).notNull(),
  description: text("description"),
  status: mysqlEnum("status", ["not_started", "in_progress", "completed"]).default("not_started").notNull(),
  weekNumber: int("weekNumber"),
  links: text("links"), // JSON array of links
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PortfolioProject = typeof portfolioProjects.$inferSelect;
export type InsertPortfolioProject = typeof portfolioProjects.$inferInsert;

/**
 * Personal notes table
 */
export const personalNotes = mysqlTable("personal_notes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  weekNumber: int("weekNumber").notNull(),
  content: text("content"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PersonalNote = typeof personalNotes.$inferSelect;
export type InsertPersonalNote = typeof personalNotes.$inferInsert;

/**
 * Task completion table
 */
export const taskCompletions = mysqlTable("task_completions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  weekNumber: int("weekNumber").notNull(),
  taskId: varchar("taskId", { length: 255 }).notNull(),
  completed: int("completed").default(0).notNull(), // 0 or 1 for boolean
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type TaskCompletion = typeof taskCompletions.$inferSelect;
export type InsertTaskCompletion = typeof taskCompletions.$inferInsert;

/**
 * PTE Practice Questions Table
 * Stores all practice questions for Reading, Writing, Speaking, Listening
 */
export const pteQuestions = mysqlTable("pte_questions", {
  id: int("id").autoincrement().primaryKey(),
  questionId: varchar("questionId", { length: 64 }).notNull().unique(),
  section: mysqlEnum("section", ["reading", "writing", "speaking", "listening"]).notNull(),
  questionType: varchar("questionType", { length: 100 }).notNull(),
  difficulty: mysqlEnum("difficulty", ["easy", "medium", "hard"]).default("medium").notNull(),
  weekNumber: int("weekNumber").notNull(),
  content: text("content").notNull(),
  audioUrl: varchar("audioUrl", { length: 500 }),
  options: text("options"), // JSON string
  correctAnswer: text("correctAnswer"),
  correctAnswerExplanation: text("correctAnswerExplanation"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PteQuestion = typeof pteQuestions.$inferSelect;
export type InsertPteQuestion = typeof pteQuestions.$inferInsert;

/**
 * User Answers Table
 * Stores all user responses to practice questions
 */
export const pteAnswers = mysqlTable("pte_answers", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  questionId: varchar("questionId", { length: 64 }).notNull(),
  userAnswer: text("userAnswer").notNull(),
  isCorrect: int("isCorrect").default(0).notNull(), // 0 or 1
  score: varchar("score", { length: 10 }), // PTE band score (0-90)
  feedback: text("feedback"),
  feedbackDetails: text("feedbackDetails"), // JSON string
  attemptNumber: int("attemptNumber").default(1).notNull(),
  timeSpentSeconds: int("timeSpentSeconds"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PteAnswer = typeof pteAnswers.$inferSelect;
export type InsertPteAnswer = typeof pteAnswers.$inferInsert;

/**
 * User Progress Table
 * Tracks overall progress across sections and question types
 */
export const pteProgress = mysqlTable("pte_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  section: mysqlEnum("section", ["reading", "writing", "speaking", "listening"]).notNull(),
  weekNumber: int("weekNumber").notNull(),
  totalQuestions: int("totalQuestions").default(0).notNull(),
  correctAnswers: int("correctAnswers").default(0).notNull(),
  averageScore: varchar("averageScore", { length: 10 }).default("0.00"),
  completionPercentage: int("completionPercentage").default(0).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PteProgress = typeof pteProgress.$inferSelect;
export type InsertPteProgress = typeof pteProgress.$inferInsert;

/**
 * Mock Test Results Table
 * Stores results from full mock tests (Weeks 4, 8, 12)
 */
export const pteMockTests = mysqlTable("pte_mock_tests", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  mockTestNumber: int("mockTestNumber").notNull(),
  weekNumber: int("weekNumber").notNull(),
  readingScore: varchar("readingScore", { length: 10 }),
  writingScore: varchar("writingScore", { length: 10 }),
  speakingScore: varchar("speakingScore", { length: 10 }),
  listeningScore: varchar("listeningScore", { length: 10 }),
  overallScore: varchar("overallScore", { length: 10 }),
  totalQuestions: int("totalQuestions").notNull(),
  correctAnswers: int("correctAnswers").notNull(),
  completionTime: int("completionTime").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PteMockTest = typeof pteMockTests.$inferSelect;
export type InsertPteMockTest = typeof pteMockTests.$inferInsert;

/**
 * User Notes Table
 * Stores user notes on difficult questions
 */
export const pteUserNotes = mysqlTable("pte_user_notes", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  questionId: varchar("questionId", { length: 64 }).notNull(),
  notes: text("notes"),
  isFlagged: int("isFlagged").default(0).notNull(), // 0 or 1
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type PteUserNotes = typeof pteUserNotes.$inferSelect;
export type InsertPteUserNotes = typeof pteUserNotes.$inferInsert;
