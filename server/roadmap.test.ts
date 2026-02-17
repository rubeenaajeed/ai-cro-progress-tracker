import { describe, expect, it, beforeEach, vi } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

type AuthenticatedUser = NonNullable<TrpcContext["user"]>;

function createAuthContext(userId: number = 1): { ctx: TrpcContext } {
  const user: AuthenticatedUser = {
    id: userId,
    openId: `user-${userId}`,
    email: `user${userId}@example.com`,
    name: `Test User ${userId}`,
    loginMethod: "manus",
    role: "user",
    createdAt: new Date(),
    updatedAt: new Date(),
    lastSignedIn: new Date(),
  };

  const ctx: TrpcContext = {
    user,
    req: {
      protocol: "https",
      headers: {},
    } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as TrpcContext["res"],
  };

  return { ctx };
}

describe("roadmap router", () => {
  describe("getAllProgress", () => {
    it("returns empty array for user with no progress", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const result = await caller.roadmap.getAllProgress();

      expect(Array.isArray(result)).toBe(true);
    });
  });

  describe("toggleTask", () => {
    it("should toggle task completion status", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const weekNumber = 1;
      const taskId = "1-1";

      // Toggle on
      await caller.roadmap.toggleTask({
        weekNumber,
        taskId,
        completed: true,
      });

      const tasks = await caller.roadmap.getWeekTasks({ weekNumber });
      const task = tasks.find(t => t.taskId === taskId);

      expect(task).toBeDefined();
      expect(task?.completed).toBe(1);

      // Toggle off
      await caller.roadmap.toggleTask({
        weekNumber,
        taskId,
        completed: false,
      });

      const updatedTasks = await caller.roadmap.getWeekTasks({ weekNumber });
      const updatedTask = updatedTasks.find(t => t.taskId === taskId);

      expect(updatedTask?.completed).toBe(0);
    });
  });

  describe("updateWeekProgress", () => {
    it("should calculate and update completion percentage", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const weekNumber = 1;
      const tasksCompleted = 3;
      const totalTasks = 5;

      await caller.roadmap.updateWeekProgress({
        weekNumber,
        tasksCompleted,
        totalTasks,
      });

      const progress = await caller.roadmap.getWeekProgress({ weekNumber });

      expect(progress).toBeDefined();
      expect(progress?.tasksCompleted).toBe(tasksCompleted);
      expect(progress?.totalTasks).toBe(totalTasks);
      expect(progress?.completionPercentage).toBe(60); // 3/5 = 60%
    });

    it("should handle 100% completion", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const weekNumber = 2;

      await caller.roadmap.updateWeekProgress({
        weekNumber,
        tasksCompleted: 4,
        totalTasks: 4,
      });

      const progress = await caller.roadmap.getWeekProgress({ weekNumber });

      expect(progress?.completionPercentage).toBe(100);
    });
  });

  describe("personal notes", () => {
    it("should save and retrieve personal notes", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const weekNumber = 1;
      const noteContent = "This week I learned about LLMs and their applications.";

      await caller.roadmap.savePersonalNote({
        weekNumber,
        content: noteContent,
      });

      const savedNote = await caller.roadmap.getPersonalNote({ weekNumber });

      expect(savedNote).toBeDefined();
      expect(savedNote?.content).toBe(noteContent);
    });

    it("should update existing notes", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const weekNumber = 3;
      const originalNote = "First note";
      const updatedNote = "Updated note with more insights";

      await caller.roadmap.savePersonalNote({
        weekNumber,
        content: originalNote,
      });

      let savedNote = await caller.roadmap.getPersonalNote({ weekNumber });
      expect(savedNote?.content).toBe(originalNote);

      await caller.roadmap.savePersonalNote({
        weekNumber,
        content: updatedNote,
      });

      savedNote = await caller.roadmap.getPersonalNote({ weekNumber });
      expect(savedNote?.content).toBe(updatedNote);
    });
  });

  describe("daily check-ins", () => {
    it("should create a daily check-in", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const today = new Date().toISOString().split('T')[0];
      const tasks = ["Completed Week 1 objectives", "Watched GenAI course"];
      const notes = "Great progress today!";

      await caller.roadmap.createCheckIn({
        date: today,
        completedTasks: tasks,
        notes,
        streakCount: 1,
      });

      const checkIn = await caller.roadmap.getDailyCheckIn({ date: today });

      expect(checkIn).toBeDefined();
      expect(checkIn?.date).toBe(today);
      expect(checkIn?.notes).toBe(notes);
      expect(checkIn?.streakCount).toBe(1);
    });

    it("should retrieve recent check-ins", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const today = new Date();
      
      // Create check-ins for the last 3 days
      for (let i = 0; i < 3; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toISOString().split('T')[0];

        await caller.roadmap.createCheckIn({
          date: dateStr,
          completedTasks: [`Task ${i}`],
          notes: `Day ${i}`,
          streakCount: i + 1,
        });
      }

      const recentCheckIns = await caller.roadmap.getRecentCheckIns({ days: 7 });

      expect(recentCheckIns.length).toBeGreaterThanOrEqual(3);
    });
  });

  describe("portfolio projects", () => {
    it("should create and retrieve portfolio projects", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const projectName = "AI-driven Content Optimization Case Study";
      const description = "A project showcasing AI content optimization";
      const status = "in_progress" as const;
      const notes = "Currently working on the case study";

      await caller.roadmap.updatePortfolioProject({
        projectName,
        description,
        status,
        notes,
      });

      const projects = await caller.roadmap.getPortfolioProjects();

      expect(projects.length).toBeGreaterThan(0);
      const project = projects.find(p => p.projectName === projectName);
      expect(project).toBeDefined();
      expect(project?.status).toBe(status);
      expect(project?.notes).toBe(notes);
    });

    it("should update portfolio project status", async () => {
      const { ctx } = createAuthContext();
      const caller = appRouter.createCaller(ctx);

      const projectName = "Test Project";

      // Create project
      await caller.roadmap.updatePortfolioProject({
        projectName,
        description: "Test description",
        status: "not_started",
      });

      // Update status
      await caller.roadmap.updatePortfolioProject({
        projectName,
        description: "Test description",
        status: "completed",
      });

      const projects = await caller.roadmap.getPortfolioProjects();
      const project = projects.find(p => p.projectName === projectName);

      expect(project?.status).toBe("completed");
    });
  });
});
