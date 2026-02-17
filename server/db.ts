import { eq, and } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, weeklyProgress, dailyCheckIns, portfolioProjects, personalNotes, taskCompletions } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

// Weekly Progress Queries
export async function getWeeklyProgress(userId: number, weekNumber: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(weeklyProgress)
    .where(and(eq(weeklyProgress.userId, userId), eq(weeklyProgress.weekNumber, weekNumber)))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getAllWeeklyProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(weeklyProgress).where(eq(weeklyProgress.userId, userId));
}

export async function updateWeeklyProgress(userId: number, weekNumber: number, tasksCompleted: number, totalTasks: number) {
  const db = await getDb();
  if (!db) return undefined;

  const completionPercentage = totalTasks > 0 ? Math.round((tasksCompleted / totalTasks) * 100) : 0;

  const existing = await getWeeklyProgress(userId, weekNumber);

  if (existing) {
    return await db
      .update(weeklyProgress)
      .set({ tasksCompleted, totalTasks, completionPercentage })
      .where(and(eq(weeklyProgress.userId, userId), eq(weeklyProgress.weekNumber, weekNumber)));
  } else {
    return await db.insert(weeklyProgress).values({
      userId,
      weekNumber,
      tasksCompleted,
      totalTasks,
      completionPercentage,
    });
  }
}

// Daily Check-in Queries
export async function getDailyCheckIn(userId: number, date: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(dailyCheckIns)
    .where(and(eq(dailyCheckIns.userId, userId), eq(dailyCheckIns.date, date)))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createOrUpdateCheckIn(userId: number, date: string, completedTasks: string[], notes: string, streakCount: number) {
  const db = await getDb();
  if (!db) return undefined;

  const existing = await getDailyCheckIn(userId, date);

  if (existing) {
    return await db
      .update(dailyCheckIns)
      .set({ completedTasks: JSON.stringify(completedTasks), notes, streakCount })
      .where(and(eq(dailyCheckIns.userId, userId), eq(dailyCheckIns.date, date)));
  } else {
    return await db.insert(dailyCheckIns).values({
      userId,
      date,
      completedTasks: JSON.stringify(completedTasks),
      notes,
      streakCount,
    });
  }
}

export async function getRecentCheckIns(userId: number, days: number = 30) {
  const db = await getDb();
  if (!db) return [];

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  const startDateStr = startDate.toISOString().split('T')[0];

  return await db
    .select()
    .from(dailyCheckIns)
    .where(and(eq(dailyCheckIns.userId, userId)))
    .orderBy(dailyCheckIns.date);
}

// Portfolio Project Queries
export async function getPortfolioProjects(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(portfolioProjects).where(eq(portfolioProjects.userId, userId));
}

export async function createOrUpdatePortfolioProject(userId: number, projectName: string, description: string, status: "not_started" | "in_progress" | "completed", weekNumber?: number, links?: string[], notes?: string) {
  const db = await getDb();
  if (!db) return undefined;

  const existing = await db
    .select()
    .from(portfolioProjects)
    .where(and(eq(portfolioProjects.userId, userId), eq(portfolioProjects.projectName, projectName)))
    .limit(1);

  if (existing && existing.length > 0) {
    return await db
      .update(portfolioProjects)
      .set({
        description,
        status,
        weekNumber,
        links: links ? JSON.stringify(links) : undefined,
        notes,
      })
      .where(and(eq(portfolioProjects.userId, userId), eq(portfolioProjects.projectName, projectName)));
  } else {
    return await db.insert(portfolioProjects).values({
      userId,
      projectName,
      description,
      status,
      weekNumber,
      links: links ? JSON.stringify(links) : undefined,
      notes,
    });
  }
}

// Personal Notes Queries
export async function getPersonalNote(userId: number, weekNumber: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(personalNotes)
    .where(and(eq(personalNotes.userId, userId), eq(personalNotes.weekNumber, weekNumber)))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function createOrUpdatePersonalNote(userId: number, weekNumber: number, content: string) {
  const db = await getDb();
  if (!db) return undefined;

  const existing = await getPersonalNote(userId, weekNumber);

  if (existing) {
    return await db
      .update(personalNotes)
      .set({ content })
      .where(and(eq(personalNotes.userId, userId), eq(personalNotes.weekNumber, weekNumber)));
  } else {
    return await db.insert(personalNotes).values({
      userId,
      weekNumber,
      content,
    });
  }
}

// Task Completion Queries
export async function getTaskCompletion(userId: number, weekNumber: number, taskId: string) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db
    .select()
    .from(taskCompletions)
    .where(and(eq(taskCompletions.userId, userId), eq(taskCompletions.weekNumber, weekNumber), eq(taskCompletions.taskId, taskId)))
    .limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function toggleTaskCompletion(userId: number, weekNumber: number, taskId: string, completed: boolean) {
  const db = await getDb();
  if (!db) return undefined;

  const existing = await getTaskCompletion(userId, weekNumber, taskId);

  if (existing) {
    return await db
      .update(taskCompletions)
      .set({ completed: completed ? 1 : 0 })
      .where(and(eq(taskCompletions.userId, userId), eq(taskCompletions.weekNumber, weekNumber), eq(taskCompletions.taskId, taskId)));
  } else {
    return await db.insert(taskCompletions).values({
      userId,
      weekNumber,
      taskId,
      completed: completed ? 1 : 0,
    });
  }
}

export async function getWeekTasks(userId: number, weekNumber: number) {
  const db = await getDb();
  if (!db) return [];

  return await db
    .select()
    .from(taskCompletions)
    .where(and(eq(taskCompletions.userId, userId), eq(taskCompletions.weekNumber, weekNumber)));
}
