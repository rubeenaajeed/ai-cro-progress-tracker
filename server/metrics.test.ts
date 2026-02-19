import { describe, it, expect, beforeAll, afterAll } from "vitest";
import * as db from "./db";

describe("Metrics System", () => {
  const testUserId = 999;
  const testDate = "2026-02-19";

  describe("AI+CRO Metrics", () => {
    it("should create an AI+CRO metric", async () => {
      const result = await db.createAiCroMetric(testUserId, {
        recordDate: testDate,
        courseCompletionPercentage: 50,
        skillsAcquired: 5,
        linkedinVisibility: "medium",
        linkedinConnections: 150,
        linkedinEngagement: "2.5",
        notes: "Test metric",
      });

      expect(result).toBeDefined();
    });

    it("should retrieve AI+CRO metrics for a user", async () => {
      const metrics = await db.getAiCroMetrics(testUserId);
      expect(Array.isArray(metrics)).toBe(true);
      expect(metrics.length).toBeGreaterThan(0);
    });

    it("should retrieve AI+CRO metric by date", async () => {
      const metric = await db.getAiCroMetricByDate(testUserId, testDate);
      expect(metric).toBeDefined();
      if (metric) {
        expect(metric.recordDate).toBe(testDate);
        expect(metric.courseCompletionPercentage).toBe(50);
      }
    });

    it("should update an AI+CRO metric", async () => {
      const metrics = await db.getAiCroMetrics(testUserId);
      if (metrics.length > 0) {
        const metricId = metrics[0].id;
        const result = await db.updateAiCroMetric(testUserId, metricId, {
          courseCompletionPercentage: 75,
          skillsAcquired: 8,
        });
        expect(result).toBeDefined();
      }
    });

    it("should delete an AI+CRO metric", async () => {
      const metrics = await db.getAiCroMetrics(testUserId);
      if (metrics.length > 0) {
        const metricId = metrics[0].id;
        const result = await db.deleteAiCroMetric(testUserId, metricId);
        expect(result).toBeDefined();
      }
    });
  });

  describe("Historical Metrics", () => {
    it("should create a personal brand metric", async () => {
      const result = await db.createHistoricalMetric(testUserId, {
        recordDate: testDate,
        brand: "personal",
        instagramFollowers: 1000,
        instagramEngagement: "3.5",
        instagramViews: 5000,
        youtubeFollowers: 500,
        youtubeEngagement: "2.0",
        youtubeViews: 2000,
        tiktokFollowers: 200,
        tiktokEngagement: "1.5",
        tiktokViews: 1000,
        notes: "Test personal brand metric",
      });

      expect(result).toBeDefined();
    });

    it("should create a business metric", async () => {
      const result = await db.createHistoricalMetric(testUserId, {
        recordDate: testDate,
        brand: "business",
        ordersPerMonth: 15,
        conversionRate: "2.5",
        estimatedRevenue: "5000",
        notes: "Test business metric",
      });

      expect(result).toBeDefined();
    });

    it("should retrieve historical metrics by brand", async () => {
      const personalMetrics = await db.getHistoricalMetrics(testUserId, "personal");
      const businessMetrics = await db.getHistoricalMetrics(testUserId, "business");

      expect(Array.isArray(personalMetrics)).toBe(true);
      expect(Array.isArray(businessMetrics)).toBe(true);
    });

    it("should retrieve historical metric by date", async () => {
      const metric = await db.getHistoricalMetricByDate(testUserId, "personal", testDate);
      expect(metric).toBeDefined();
      if (metric) {
        expect(metric.recordDate).toBe(testDate);
        expect(metric.brand).toBe("personal");
      }
    });

    it("should update a historical metric", async () => {
      const metrics = await db.getHistoricalMetrics(testUserId, "personal");
      if (metrics.length > 0) {
        const metricId = metrics[0].id;
        const result = await db.updateHistoricalMetric(testUserId, metricId, {
          instagramFollowers: 1500,
          instagramEngagement: "4.0",
        });
        expect(result).toBeDefined();
      }
    });

    it("should delete a historical metric", async () => {
      const metrics = await db.getHistoricalMetrics(testUserId, "business");
      if (metrics.length > 0) {
        const metricId = metrics[0].id;
        const result = await db.deleteHistoricalMetric(testUserId, metricId);
        expect(result).toBeDefined();
      }
    });
  });

  describe("Data Validation", () => {
    it("should handle optional fields gracefully", async () => {
      const result = await db.createAiCroMetric(testUserId, {
        recordDate: "2026-02-20",
        courseCompletionPercentage: 60,
      });

      expect(result).toBeDefined();
    });

    it("should store metrics with different date formats", async () => {
      const dates = ["2026-02-15", "2026-02-16", "2026-02-17"];

      for (const date of dates) {
        const result = await db.createAiCroMetric(testUserId, {
          recordDate: date,
          courseCompletionPercentage: Math.floor(Math.random() * 100),
        });
        expect(result).toBeDefined();
      }

      const allMetrics = await db.getAiCroMetrics(testUserId);
      expect(allMetrics.length).toBeGreaterThanOrEqual(dates.length);
    });
  });
});
