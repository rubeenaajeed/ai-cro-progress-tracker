/**
 * Metrics database helpers for tracking historical data
 * Tracks Instagram/YouTube/TikTok followers and business metrics
 */

import { getDb } from "./db";
import { historicalMetrics, InsertHistoricalMetric } from "../drizzle/schema";
import { eq, and } from "drizzle-orm";

export async function saveMetrics(userId: number, metrics: InsertHistoricalMetric) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db.insert(historicalMetrics).values({
      ...metrics,
      userId,
    });
    return result;
  } catch (error) {
    console.error("[Database] Failed to save metrics:", error);
    throw error;
  }
}

export async function getMetricsForDate(userId: number, recordDate: string, brand: "personal" | "business") {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db
      .select()
      .from(historicalMetrics)
      .where(and(eq(historicalMetrics.userId, userId), eq(historicalMetrics.recordDate, recordDate), eq(historicalMetrics.brand, brand)));
    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get metrics:", error);
    throw error;
  }
}

export async function getMetricsHistory(userId: number, brand: "personal" | "business", days: number = 90) {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - days);
    const startDateStr = startDate.toISOString().split("T")[0];

    const result = await db
      .select()
      .from(historicalMetrics)
      .where(and(eq(historicalMetrics.userId, userId), eq(historicalMetrics.brand, brand)))
      .orderBy(historicalMetrics.recordDate);

    return result;
  } catch (error) {
    console.error("[Database] Failed to get metrics history:", error);
    throw error;
  }
}

export async function getLatestMetrics(userId: number, brand: "personal" | "business") {
  const db = await getDb();
  if (!db) {
    throw new Error("Database not available");
  }

  try {
    const result = await db
      .select()
      .from(historicalMetrics)
      .where(and(eq(historicalMetrics.userId, userId), eq(historicalMetrics.brand, brand)))
      .orderBy(historicalMetrics.recordDate)
      .limit(1);

    return result.length > 0 ? result[0] : null;
  } catch (error) {
    console.error("[Database] Failed to get latest metrics:", error);
    throw error;
  }
}
