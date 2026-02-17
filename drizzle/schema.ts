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