import { eq, and } from "drizzle-orm";
import { getDb } from "./db";
import { pteQuestions, pteAnswers, pteProgress, pteMockTests, pteUserNotes } from "../drizzle/schema";
import type { InsertPteQuestion, InsertPteAnswer, InsertPteProgress, InsertPteMockTest, InsertPteUserNotes } from "../drizzle/schema";

/**
 * PTE Questions Queries
 */
export async function getPteQuestionsBySection(section: string, weekNumber?: number) {
  const db = await getDb();
  if (!db) return [];

  let query = db.select().from(pteQuestions).where(eq(pteQuestions.section, section as any));
  
  if (weekNumber) {
    query = db.select().from(pteQuestions).where(
      and(eq(pteQuestions.section, section as any), eq(pteQuestions.weekNumber, weekNumber))
    );
  }

  return await query;
}

export async function getPteQuestionById(questionId: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(pteQuestions)
    .where(eq(pteQuestions.questionId, questionId))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function getPteQuestionsByType(section: string, questionType: string, weekNumber?: number) {
  const db = await getDb();
  if (!db) return [];

  let conditions = [
    eq(pteQuestions.section, section as any),
    eq(pteQuestions.questionType, questionType)
  ];

  if (weekNumber) {
    conditions.push(eq(pteQuestions.weekNumber, weekNumber));
  }

  return await db.select().from(pteQuestions).where(and(...conditions));
}

export async function createPteQuestion(question: InsertPteQuestion) {
  const db = await getDb();
  if (!db) return null;

  return await db.insert(pteQuestions).values(question);
}

/**
 * PTE Answers Queries
 */
export async function createPteAnswer(answer: InsertPteAnswer) {
  const db = await getDb();
  if (!db) return null;

  return await db.insert(pteAnswers).values(answer);
}

export async function getUserAnswerForQuestion(userId: number, questionId: string) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(pteAnswers)
    .where(and(eq(pteAnswers.userId, userId), eq(pteAnswers.questionId, questionId)))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function getUserAnswersBySection(userId: number, section: string) {
  const db = await getDb();
  if (!db) return [];

  const answers = await db.select().from(pteAnswers).where(eq(pteAnswers.userId, userId));
  
  const questionIds = answers.map(a => a.questionId);
  if (questionIds.length === 0) return [];

  const questions = await db.select().from(pteQuestions).where(eq(pteQuestions.section, section as any));
  const questionIdSet = new Set(questions.map(q => q.questionId));

  return answers.filter(a => questionIdSet.has(a.questionId));
}

export async function updatePteAnswer(userId: number, questionId: string, updates: Partial<InsertPteAnswer>) {
  const db = await getDb();
  if (!db) return null;

  return await db
    .update(pteAnswers)
    .set(updates)
    .where(and(eq(pteAnswers.userId, userId), eq(pteAnswers.questionId, questionId)));
}

/**
 * PTE Progress Queries
 */
export async function getPteProgress(userId: number, section: string, weekNumber: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(pteProgress)
    .where(
      and(
        eq(pteProgress.userId, userId),
        eq(pteProgress.section, section as any),
        eq(pteProgress.weekNumber, weekNumber)
      )
    )
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

export async function createOrUpdatePteProgress(userId: number, section: string, weekNumber: number, updates: Partial<InsertPteProgress>) {
  const db = await getDb();
  if (!db) return null;

  const existing = await getPteProgress(userId, section, weekNumber);

  if (existing) {
    return await db
      .update(pteProgress)
      .set(updates)
      .where(
        and(
          eq(pteProgress.userId, userId),
          eq(pteProgress.section, section as any),
          eq(pteProgress.weekNumber, weekNumber)
        )
      );
  } else {
    return await db.insert(pteProgress).values({
      userId,
      section: section as any,
      weekNumber,
      ...updates,
    });
  }
}

export async function getUserAllProgress(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(pteProgress).where(eq(pteProgress.userId, userId));
}

/**
 * Mock Test Queries
 */
export async function createMockTestResult(mockTest: InsertPteMockTest) {
  const db = await getDb();
  if (!db) return null;

  return await db.insert(pteMockTests).values(mockTest);
}

export async function getUserMockTests(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(pteMockTests).where(eq(pteMockTests.userId, userId));
}

export async function getMockTestByNumber(userId: number, mockTestNumber: number) {
  const db = await getDb();
  if (!db) return null;

  const result = await db
    .select()
    .from(pteMockTests)
    .where(and(eq(pteMockTests.userId, userId), eq(pteMockTests.mockTestNumber, mockTestNumber)))
    .limit(1);

  return result.length > 0 ? result[0] : null;
}

/**
 * User Notes Queries
 */
export async function createOrUpdateUserNote(userId: number, questionId: string, notes: string, isFlagged: boolean = false) {
  const db = await getDb();
  if (!db) return null;

  const existing = await db
    .select()
    .from(pteUserNotes)
    .where(and(eq(pteUserNotes.userId, userId), eq(pteUserNotes.questionId, questionId)))
    .limit(1);

  if (existing && existing.length > 0) {
    return await db
      .update(pteUserNotes)
      .set({ notes, isFlagged: isFlagged ? 1 : 0 })
      .where(and(eq(pteUserNotes.userId, userId), eq(pteUserNotes.questionId, questionId)));
  } else {
    return await db.insert(pteUserNotes).values({
      userId,
      questionId,
      notes,
      isFlagged: isFlagged ? 1 : 0,
    });
  }
}

export async function getUserNotes(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(pteUserNotes).where(eq(pteUserNotes.userId, userId));
}

export async function getFlaggedQuestions(userId: number) {
  const db = await getDb();
  if (!db) return [];

  return await db.select().from(pteUserNotes).where(
    and(eq(pteUserNotes.userId, userId), eq(pteUserNotes.isFlagged, 1))
  );
}
