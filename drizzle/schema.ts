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

/**
 * Content Calendar Table for Phase 2
 * Stores post ideas for Personal Brand and Business Brand
 */
export const contentCalendar = mysqlTable("content_calendar", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  brand: mysqlEnum("brand", ["personal", "business"]).notNull(), // personal or business
  platform: mysqlEnum("platform", ["instagram", "tiktok", "both"]).notNull(),
  scheduledDate: varchar("scheduledDate", { length: 10 }).notNull(), // YYYY-MM-DD
  postIdea: text("postIdea").notNull(),
  contentType: varchar("contentType", { length: 50 }), // video, carousel, reel, story, etc
  status: mysqlEnum("status", ["draft", "scheduled", "published", "archived"]).default("draft").notNull(),
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContentCalendar = typeof contentCalendar.$inferSelect;
export type InsertContentCalendar = typeof contentCalendar.$inferInsert;

/**
 * Phase 2 Metrics Table
 * Tracks weekly KPIs for Personal Brand and Business Brand
 */
export const phase2Metrics = mysqlTable("phase2_metrics", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  weekNumber: int("weekNumber").notNull(),
  brand: mysqlEnum("brand", ["personal", "business"]).notNull(),
  // Personal Brand metrics
  followersGained: int("followersGained").default(0),
  engagementRate: varchar("engagementRate", { length: 10 }), // percentage
  postsPublished: int("postsPublished").default(0),
  // Business Brand metrics
  ordersReceived: int("ordersReceived").default(0),
  revenue: varchar("revenue", { length: 20 }), // decimal as string
  conversionRate: varchar("conversionRate", { length: 10 }), // percentage
  customerAcquisitionCost: varchar("customerAcquisitionCost", { length: 20 }), // CAC
  // Common metrics
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Phase2Metrics = typeof phase2Metrics.$inferSelect;
export type InsertPhase2Metrics = typeof phase2Metrics.$inferInsert;

/**
 * Phase 2 Progress Table
 * Tracks cumulative progress for Personal Brand and Business Brand
 */
export const phase2Progress = mysqlTable("phase2_progress", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  brand: mysqlEnum("brand", ["personal", "business"]).notNull(),
  // Personal Brand cumulative
  totalFollowers: int("totalFollowers").default(0),
  totalPostsPublished: int("totalPostsPublished").default(0),
  averageEngagementRate: varchar("averageEngagementRate", { length: 10 }),
  // Business Brand cumulative
  totalOrders: int("totalOrders").default(0),
  totalRevenue: varchar("totalRevenue", { length: 20 }),
  averageConversionRate: varchar("averageConversionRate", { length: 10 }),
  // Tracking
  lastUpdatedWeek: int("lastUpdatedWeek"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Phase2Progress = typeof phase2Progress.$inferSelect;
export type InsertPhase2Progress = typeof phase2Progress.$inferInsert;

/**
 * AI+CRO Track Metrics Table
 * Tracks metrics for AI+CRO learning progress track
 */
export const aiCroMetrics = mysqlTable("ai_cro_metrics", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  recordDate: varchar("recordDate", { length: 10 }).notNull(), // YYYY-MM-DD format
  courseCompletionPercentage: int("courseCompletionPercentage").default(0), // 0-100
  skillsAcquired: int("skillsAcquired").default(0), // count of skills learned
  linkedinVisibility: varchar("linkedinVisibility", { length: 20 }), // low, medium, high
  linkedinConnections: int("linkedinConnections").default(0),
  linkedinEngagement: varchar("linkedinEngagement", { length: 10 }), // percentage
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type AiCroMetric = typeof aiCroMetrics.$inferSelect;
export type InsertAiCroMetric = typeof aiCroMetrics.$inferInsert;

/**
 * Historical Metrics Table
 * Tracks historical data points for Personal Brand and Clothing Business
 */
export const historicalMetrics = mysqlTable("historical_metrics", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  recordDate: varchar("recordDate", { length: 10 }).notNull(), // YYYY-MM-DD format
  brand: mysqlEnum("brand", ["personal", "business"]).notNull(),
  // Personal Brand metrics (per platform)
  instagramFollowers: int("instagramFollowers").default(0),
  instagramEngagement: varchar("instagramEngagement", { length: 10 }), // percentage
  instagramViews: int("instagramViews").default(0),
  youtubeFollowers: int("youtubeFollowers").default(0),
  youtubeEngagement: varchar("youtubeEngagement", { length: 10 }), // percentage
  youtubeViews: int("youtubeViews").default(0),
  tiktokFollowers: int("tiktokFollowers").default(0),
  tiktokEngagement: varchar("tiktokEngagement", { length: 10 }), // percentage
  tiktokViews: int("tiktokViews").default(0),
  // Business metrics
  ordersPerMonth: int("ordersPerMonth").default(0),
  conversionRate: varchar("conversionRate", { length: 10 }), // percentage
  estimatedRevenue: varchar("estimatedRevenue", { length: 20 }), // decimal as string
  notes: text("notes"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type HistoricalMetric = typeof historicalMetrics.$inferSelect;
export type InsertHistoricalMetric = typeof historicalMetrics.$inferInsert;


/**
 * Learning Proof Table
 * Stores evidence of learning for each completed task
 */
export const learningProofs = mysqlTable("learning_proofs", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  weekNumber: int("weekNumber").notNull(),
  taskId: varchar("taskId", { length: 64 }).notNull(),
  proof: text("proof").notNull(), // Longer form text about what was learned
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type LearningProof = typeof learningProofs.$inferSelect;
export type InsertLearningProof = typeof learningProofs.$inferInsert;

/**
 * Weekly Reflection Prompts Table
 * Stores answers to guided reflection questions
 */
export const weeklyReflections = mysqlTable("weekly_reflections", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  weekNumber: int("weekNumber").notNull(),
  surprised: text("surprised"), // What surprised you this week?
  applicationToFashion: text("applicationToFashion"), // How does this apply to your clothing brand?
  nextWeekTest: text("nextWeekTest"), // What will you test next week?
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type WeeklyReflection = typeof weeklyReflections.$inferSelect;
export type InsertWeeklyReflection = typeof weeklyReflections.$inferInsert;

/**
 * Content Angle Suggestions Table
 * Stores AI-generated content ideas for each Phase 1 week
 */
export const contentAngleSuggestions = mysqlTable("content_angle_suggestions", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  weekNumber: int("weekNumber").notNull(),
  suggestion: text("suggestion").notNull(), // The content idea
  platform: mysqlEnum("platform", ["instagram", "tiktok", "youtube", "blog"]).notNull(),
  format: varchar("format", { length: 50 }), // video, carousel, reel, post, etc
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type ContentAngleSuggestion = typeof contentAngleSuggestions.$inferSelect;
export type InsertContentAngleSuggestion = typeof contentAngleSuggestions.$inferInsert;

/**
 * AI Feedback on Post Ideas Table
 * Stores AI feedback for content calendar posts
 */
export const postFeedback = mysqlTable("post_feedback", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  postId: int("postId").notNull(),
  hookStrength: varchar("hookStrength", { length: 20 }), // strong, medium, weak
  audienceAppeal: varchar("audienceAppeal", { length: 20 }), // high, medium, low
  platformFit: varchar("platformFit", { length: 20 }), // excellent, good, fair
  suggestions: text("suggestions"), // AI suggestions for improvement
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type PostFeedback = typeof postFeedback.$inferSelect;
export type InsertPostFeedback = typeof postFeedback.$inferInsert;


/**
 * Badges and Achievements Table
 * Tracks user achievements and badges earned
 */
export const badges = mysqlTable("badges", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(),
  badgeType: varchar("badgeType", { length: 50 }).notNull(), // psychology-master, ai-expert, etc
  badgeName: varchar("badgeName", { length: 100 }).notNull(), // Display name
  description: text("description"), // Badge description
  icon: varchar("icon", { length: 50 }), // Icon name or emoji
  earnedAt: timestamp("earnedAt").defaultNow().notNull(),
  weekNumber: int("weekNumber"), // Week when badge was earned
  track: mysqlEnum("track", ["ai-cro", "personal-brand", "business"]), // Which track
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Badge = typeof badges.$inferSelect;
export type InsertBadge = typeof badges.$inferInsert;

/**
 * Badge Definitions (Reference table)
 */
export const badgeDefinitions = mysqlTable("badge_definitions", {
  id: int("id").autoincrement().primaryKey(),
  badgeType: varchar("badgeType", { length: 50 }).notNull().unique(),
  badgeName: varchar("badgeName", { length: 100 }).notNull(),
  description: text("description"),
  icon: varchar("icon", { length: 50 }),
  requiredWeek: int("requiredWeek"), // Week number to earn this badge
  track: mysqlEnum("track", ["ai-cro", "personal-brand", "business"]),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type BadgeDefinition = typeof badgeDefinitions.$inferSelect;
export type InsertBadgeDefinition = typeof badgeDefinitions.$inferInsert;
