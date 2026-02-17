import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  roadmap: router({
    getAllProgress: protectedProcedure.query(async ({ ctx }) => {
      return await db.getAllWeeklyProgress(ctx.user.id);
    }),

    getWeekProgress: protectedProcedure
      .input(z.object({ weekNumber: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getWeeklyProgress(ctx.user.id, input.weekNumber);
      }),

    updateWeekProgress: protectedProcedure
      .input(z.object({ weekNumber: z.number(), tasksCompleted: z.number(), totalTasks: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return await db.updateWeeklyProgress(ctx.user.id, input.weekNumber, input.tasksCompleted, input.totalTasks);
      }),

    getDailyCheckIn: protectedProcedure
      .input(z.object({ date: z.string() }))
      .query(async ({ ctx, input }) => {
        return await db.getDailyCheckIn(ctx.user.id, input.date);
      }),

    createCheckIn: protectedProcedure
      .input(z.object({ date: z.string(), completedTasks: z.array(z.string()), notes: z.string().optional(), streakCount: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return await db.createOrUpdateCheckIn(ctx.user.id, input.date, input.completedTasks, input.notes || "", input.streakCount);
      }),

    getRecentCheckIns: protectedProcedure
      .input(z.object({ days: z.number().optional() }))
      .query(async ({ ctx, input }) => {
        return await db.getRecentCheckIns(ctx.user.id, input.days || 30);
      }),

    toggleTask: protectedProcedure
      .input(z.object({ weekNumber: z.number(), taskId: z.string(), completed: z.boolean() }))
      .mutation(async ({ ctx, input }) => {
        return await db.toggleTaskCompletion(ctx.user.id, input.weekNumber, input.taskId, input.completed);
      }),

    getWeekTasks: protectedProcedure
      .input(z.object({ weekNumber: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getWeekTasks(ctx.user.id, input.weekNumber);
      }),

    getPersonalNote: protectedProcedure
      .input(z.object({ weekNumber: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getPersonalNote(ctx.user.id, input.weekNumber);
      }),

    savePersonalNote: protectedProcedure
      .input(z.object({ weekNumber: z.number(), content: z.string() }))
      .mutation(async ({ ctx, input }) => {
        return await db.createOrUpdatePersonalNote(ctx.user.id, input.weekNumber, input.content);
      }),

    getPortfolioProjects: protectedProcedure.query(async ({ ctx }) => {
      return await db.getPortfolioProjects(ctx.user.id);
    }),

    updatePortfolioProject: protectedProcedure
      .input(z.object({
        projectName: z.string(),
        description: z.string().optional(),
        status: z.enum(["not_started", "in_progress", "completed"]),
        weekNumber: z.number().optional(),
        links: z.array(z.string()).optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createOrUpdatePortfolioProject(
          ctx.user.id,
          input.projectName,
          input.description || "",
          input.status,
          input.weekNumber,
          input.links,
          input.notes
        );
      }),
  }),
});

export type AppRouter = typeof appRouter;
