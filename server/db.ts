import { eq, and, desc } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, weeklyProgress, dailyCheckIns, portfolioProjects, personalNotes, taskCompletions, contentCalendar, phase2Metrics, phase2Progress, learningProofs, weeklyReflections, contentAngleSuggestions, postFeedback, InsertContentCalendar, InsertPhase2Metrics, InsertPhase2Progress, InsertLearningProof, InsertWeeklyReflection, InsertContentAngleSuggestion, InsertPostFeedback } from "../drizzle/schema";
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
  if (!db) return null;

  const result = await db
    .select()
    .from(personalNotes)
    .where(and(eq(personalNotes.userId, userId), eq(personalNotes.weekNumber, weekNumber)))
    .limit(1);

  return result.length > 0 ? result[0] : null;
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


// ===== PHASE 2 CONTENT CALENDAR QUERIES =====

export async function createContentPost(userId: number, data: InsertContentCalendar) {
  const db = await getDb();
  if (!db) return undefined;
  
  return await db.insert(contentCalendar).values({
    ...data,
    userId,
  });
}

export async function getContentCalendar(userId: number, brand?: string) {
  const db = await getDb();
  if (!db) return [];
  
  const conditions = [eq(contentCalendar.userId, userId)];
  if (brand) {
    conditions.push(eq(contentCalendar.brand, brand as any));
  }
  
  return await db.select().from(contentCalendar)
    .where(and(...conditions))
    .orderBy(desc(contentCalendar.scheduledDate));
}

export async function updateContentPost(userId: number, postId: number, data: Partial<InsertContentCalendar>) {
  const db = await getDb();
  if (!db) return undefined;
  
  return await db.update(contentCalendar)
    .set(data)
    .where(and(
      eq(contentCalendar.id, postId),
      eq(contentCalendar.userId, userId)
    ));
}

export async function deleteContentPost(userId: number, postId: number) {
  const db = await getDb();
  if (!db) return undefined;
  
  return await db.delete(contentCalendar)
    .where(and(
      eq(contentCalendar.id, postId),
      eq(contentCalendar.userId, userId)
    ));
}

// ===== PHASE 2 METRICS QUERIES =====

export async function createPhase2Metric(userId: number, data: InsertPhase2Metrics) {
  const db = await getDb();
  if (!db) return undefined;
  
  return await db.insert(phase2Metrics).values({
    ...data,
    userId,
  });
}

export async function getPhase2Metrics(userId: number, weekNumber: number, brand: string) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(phase2Metrics)
    .where(and(
      eq(phase2Metrics.userId, userId),
      eq(phase2Metrics.weekNumber, weekNumber),
      eq(phase2Metrics.brand, brand as any)
    ))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}

export async function updatePhase2Metric(userId: number, metricId: number, data: Partial<InsertPhase2Metrics>) {
  const db = await getDb();
  if (!db) return undefined;
  
  return await db.update(phase2Metrics)
    .set(data)
    .where(and(
      eq(phase2Metrics.id, metricId),
      eq(phase2Metrics.userId, userId)
    ));
}

export async function getPhase2MetricsByWeek(userId: number, weekNumber: number) {
  const db = await getDb();
  if (!db) return [];
  
  return await db.select().from(phase2Metrics)
    .where(and(
      eq(phase2Metrics.userId, userId),
      eq(phase2Metrics.weekNumber, weekNumber)
    ));
}

// ===== PHASE 2 PROGRESS QUERIES =====

export async function getOrCreatePhase2Progress(userId: number, brand: string) {
  const db = await getDb();
  if (!db) return undefined;
  
  const existing = await db.select().from(phase2Progress)
    .where(and(
      eq(phase2Progress.userId, userId),
      eq(phase2Progress.brand, brand as any)
    ))
    .limit(1);
  
  if (existing.length > 0) {
    return existing[0];
  }
  
  // Create new progress record
  await db.insert(phase2Progress).values({
    userId,
    brand: brand as any,
    totalFollowers: 0,
    totalPostsPublished: 0,
    totalOrders: 0,
  });
  
  const newRecord = await db.select().from(phase2Progress)
    .where(and(
      eq(phase2Progress.userId, userId),
      eq(phase2Progress.brand, brand as any)
    ))
    .limit(1);
  
  return newRecord.length > 0 ? newRecord[0] : undefined;
}

export async function updatePhase2Progress(userId: number, brand: string, data: Partial<InsertPhase2Progress>) {
  const db = await getDb();
  if (!db) return undefined;
  
  return await db.update(phase2Progress)
    .set(data)
    .where(and(
      eq(phase2Progress.userId, userId),
      eq(phase2Progress.brand, brand as any)
    ));
}

export async function getPhase2ProgressByBrand(userId: number, brand: string) {
  const db = await getDb();
  if (!db) return null;
  
  const result = await db.select().from(phase2Progress)
    .where(and(
      eq(phase2Progress.userId, userId),
      eq(phase2Progress.brand, brand as any)
    ))
    .limit(1);
  
  return result.length > 0 ? result[0] : null;
}


// ===== LEARNING PROOF QUERIES =====

export async function createLearningProof(userId: number, weekNumber: number, taskId: string, proof: string) {
  const db = await getDb();
  if (!db) return undefined;

  return await db.insert(learningProofs).values({
    userId,
    weekNumber,
    taskId,
    proof,
  });
}

export async function getLearningProof(userId: number, weekNumber: number, taskId: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(learningProofs)
    .where(and(
      eq(learningProofs.userId, userId),
      eq(learningProofs.weekNumber, weekNumber),
      eq(learningProofs.taskId, taskId)
    ))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function getWeeklyProofs(userId: number, weekNumber: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(learningProofs)
    .where(and(
      eq(learningProofs.userId, userId),
      eq(learningProofs.weekNumber, weekNumber)
    ));
}

export async function updateLearningProof(userId: number, weekNumber: number, taskId: string, proof: string) {
  const db = await getDb();
  if (!db) return undefined;

  return await db.update(learningProofs)
    .set({ proof })
    .where(and(
      eq(learningProofs.userId, userId),
      eq(learningProofs.weekNumber, weekNumber),
      eq(learningProofs.taskId, taskId)
    ));
}

// ===== WEEKLY REFLECTION QUERIES =====

export async function createOrUpdateReflection(userId: number, weekNumber: number, surprised: string, applicationToFashion: string, nextWeekTest: string) {
  const db = await getDb();
  if (!db) return undefined;

  const existing = await db.select().from(weeklyReflections)
    .where(and(
      eq(weeklyReflections.userId, userId),
      eq(weeklyReflections.weekNumber, weekNumber)
    ))
    .limit(1);

  if (existing.length > 0) {
    return await db.update(weeklyReflections)
      .set({ surprised, applicationToFashion, nextWeekTest })
      .where(and(
        eq(weeklyReflections.userId, userId),
        eq(weeklyReflections.weekNumber, weekNumber)
      ));
  } else {
    return await db.insert(weeklyReflections).values({
      userId,
      weekNumber,
      surprised,
      applicationToFashion,
      nextWeekTest,
    });
  }
}

export async function getReflection(userId: number, weekNumber: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(weeklyReflections)
    .where(and(
      eq(weeklyReflections.userId, userId),
      eq(weeklyReflections.weekNumber, weekNumber)
    ))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

// ===== CONTENT ANGLE SUGGESTIONS QUERIES =====

export async function createContentAngleSuggestion(userId: number, weekNumber: number, suggestion: string, platform: string, format?: string) {
  const db = await getDb();
  if (!db) return undefined;

  return await db.insert(contentAngleSuggestions).values({
    userId,
    weekNumber,
    suggestion,
    platform: platform as any,
    format: format || null,
  });
}

export async function getContentAngleSuggestion(userId: number, weekNumber: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(contentAngleSuggestions)
    .where(and(
      eq(contentAngleSuggestions.userId, userId),
      eq(contentAngleSuggestions.weekNumber, weekNumber)
    ))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function getAllContentAngleSuggestions(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(contentAngleSuggestions)
    .where(eq(contentAngleSuggestions.userId, userId))
    .orderBy(contentAngleSuggestions.weekNumber);
}

// ===== POST FEEDBACK QUERIES =====

export async function createPostFeedback(userId: number, postId: number, hookStrength: string, audienceAppeal: string, platformFit: string, suggestions: string) {
  const db = await getDb();
  if (!db) return undefined;

  return await db.insert(postFeedback).values({
    userId,
    postId,
    hookStrength,
    audienceAppeal,
    platformFit,
    suggestions,
  });
}

export async function getPostFeedback(userId: number, postId: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db.select().from(postFeedback)
    .where(and(
      eq(postFeedback.userId, userId),
      eq(postFeedback.postId, postId)
    ))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}
