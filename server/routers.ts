import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as db from "./db";
import { invokeLLM } from "./_core/llm";


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

    // Quiz generation
    generateQuiz: protectedProcedure
      .input(z.object({ taskText: z.string(), weekNumber: z.number() }))
      .mutation(async ({ ctx, input }) => {
        try {
          const response = await invokeLLM({
            messages: [
              {
                role: "system",
                content: "You are an educational quiz generator. Generate exactly 3 multiple-choice questions to test understanding of the given topic. Return ONLY valid JSON with no additional text.",
              },
              {
                role: "user",
                content: `Generate 3 multiple-choice questions to verify understanding of this learning objective: "${input.taskText}". 
                
Return as JSON array with this exact structure (no markdown, no extra text):
[
  {
    "question": "Question text?",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "correctAnswer": 0,
    "explanation": "Why this is correct"
  }
]`,
              },
            ],
            response_format: {
              type: "json_schema",
              json_schema: {
                name: "quiz_questions",
                strict: true,
                schema: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      question: { type: "string" },
                      options: { type: "array", items: { type: "string" } },
                      correctAnswer: { type: "number" },
                      explanation: { type: "string" },
                    },
                    required: ["question", "options", "correctAnswer", "explanation"],
                    additionalProperties: false,
                  },
                },
              },
            },
          });

          const messageContent = response.choices[0]?.message.content;
          if (!messageContent) {
            throw new Error("No content in response");
          }

          const content = typeof messageContent === 'string' ? messageContent : JSON.stringify(messageContent);
          const questions = JSON.parse(content);
          return {
            success: true,
            questions,
            taskText: input.taskText,
            weekNumber: input.weekNumber,
          };
        } catch (error) {
          console.error("Quiz generation error:", error);
          return {
            success: false,
            error: "Failed to generate quiz. Please try again.",
          };
        }
      }),

    // Historical Metrics & AI+CRO Metrics procedures
    createHistoricalMetric: protectedProcedure
      .input(z.object({
        recordDate: z.string(),
        brand: z.enum(["personal", "business"]),
        instagramFollowers: z.number().optional(),
        instagramEngagement: z.string().optional(),
        instagramViews: z.number().optional(),
        youtubeFollowers: z.number().optional(),
        youtubeEngagement: z.string().optional(),
        youtubeViews: z.number().optional(),
        tiktokFollowers: z.number().optional(),
        tiktokEngagement: z.string().optional(),
        tiktokViews: z.number().optional(),
        ordersPerMonth: z.number().optional(),
        conversionRate: z.string().optional(),
        estimatedRevenue: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createHistoricalMetric(ctx.user.id, input as any);
      }),

    getHistoricalMetrics: protectedProcedure
      .input(z.object({ brand: z.enum(["personal", "business"]) }))
      .query(async ({ ctx, input }) => {
        return await db.getHistoricalMetrics(ctx.user.id, input.brand);
      }),

    deleteHistoricalMetric: protectedProcedure
      .input(z.object({ metricId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return await db.deleteHistoricalMetric(ctx.user.id, input.metricId);
      }),

    createAiCroMetric: protectedProcedure
      .input(z.object({
        recordDate: z.string(),
        courseCompletionPercentage: z.number().optional(),
        skillsAcquired: z.number().optional(),
        linkedinVisibility: z.string().optional(),
        linkedinConnections: z.number().optional(),
        linkedinEngagement: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createAiCroMetric(ctx.user.id, input as any);
      }),

    getAiCroMetrics: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getAiCroMetrics(ctx.user.id);
      }),

    getAiCroMetricByDate: protectedProcedure
      .input(z.object({ recordDate: z.string() }))
      .query(async ({ ctx, input }) => {
        return await db.getAiCroMetricByDate(ctx.user.id, input.recordDate);
      }),

    updateAiCroMetric: protectedProcedure
      .input(z.object({
        metricId: z.number(),
        courseCompletionPercentage: z.number().optional(),
        skillsAcquired: z.number().optional(),
        linkedinVisibility: z.string().optional(),
        linkedinConnections: z.number().optional(),
        linkedinEngagement: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const { metricId, ...data } = input;
        return await db.updateAiCroMetric(ctx.user.id, metricId, data as any);
      }),

    deleteAiCroMetric: protectedProcedure
      .input(z.object({ metricId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return await db.deleteAiCroMetric(ctx.user.id, input.metricId);
      }),

    getUserBadges: protectedProcedure.query(async ({ ctx }) => {
      return await db.getUserBadges(ctx.user.id);
    }),

    getBadgesByTrack: protectedProcedure
      .input(z.object({ track: z.enum(["ai-cro", "personal-brand", "business"]) }))
      .query(async ({ ctx, input }) => {
        return await db.getBadgesByTrack(ctx.user.id, input.track);
      }),

    earnBadge: protectedProcedure
      .input(z.object({
        badgeType: z.string(),
        badgeName: z.string(),
        description: z.string().optional(),
        icon: z.string().optional(),
        weekNumber: z.number().optional(),
        track: z.enum(["ai-cro", "personal-brand", "business"]).optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const exists = await db.checkBadgeExists(ctx.user.id, input.badgeType);
        if (exists) {
          return { success: false, message: "Badge already earned" };
        }
        await db.createBadge(ctx.user.id, {
          badgeType: input.badgeType,
          badgeName: input.badgeName,
          description: input.description || null,
          icon: input.icon || null,
          weekNumber: input.weekNumber || null,
          track: input.track || null,
        } as any);
        return { success: true, message: "Badge earned!" };
      }),
  }),


  phase2: router({
    // Content Calendar procedures
    createContentPost: protectedProcedure
      .input(z.object({
        brand: z.enum(["personal", "business"]),
        platform: z.enum(["instagram", "tiktok", "both"]),
        scheduledDate: z.string(),
        postIdea: z.string(),
        contentType: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const data: any = {
          brand: input.brand,
          platform: input.platform,
          scheduledDate: input.scheduledDate,
          postIdea: input.postIdea,
          status: "draft",
        };
        if (input.contentType) data.contentType = input.contentType;
        if (input.notes) data.notes = input.notes;
        return await db.createContentPost(ctx.user.id, data);
      }),

    getContentCalendar: protectedProcedure
      .input(z.object({ brand: z.enum(["personal", "business"]).optional() }))
      .query(async ({ ctx, input }) => {
        return await db.getContentCalendar(ctx.user.id, input.brand);
      }),

    updateContentPost: protectedProcedure
      .input(z.object({
        postId: z.number(),
        status: z.enum(["draft", "scheduled", "published", "archived"]).optional(),
        postIdea: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const data: any = {};
        if (input.status) data.status = input.status;
        if (input.postIdea) data.postIdea = input.postIdea;
        if (input.notes) data.notes = input.notes;
        return await db.updateContentPost(ctx.user.id, input.postId, data);
      }),

    deleteContentPost: protectedProcedure
      .input(z.object({ postId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return await db.deleteContentPost(ctx.user.id, input.postId);
      }),


    // Learning Proof procedures
    createLearningProof: protectedProcedure
      .input(z.object({
        weekNumber: z.number(),
        taskId: z.string(),
        proof: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createLearningProof(ctx.user.id, input.weekNumber, input.taskId, input.proof);
      }),

    getLearningProof: protectedProcedure
      .input(z.object({
        weekNumber: z.number(),
        taskId: z.string(),
      }))
      .query(async ({ ctx, input }) => {
        return await db.getLearningProof(ctx.user.id, input.weekNumber, input.taskId);
      }),

    getWeeklyProofs: protectedProcedure
      .input(z.object({ weekNumber: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getWeeklyProofs(ctx.user.id, input.weekNumber);
      }),

    updateLearningProof: protectedProcedure
      .input(z.object({
        weekNumber: z.number(),
        taskId: z.string(),
        proof: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.updateLearningProof(ctx.user.id, input.weekNumber, input.taskId, input.proof);
      }),

    // Weekly Reflection procedures
    createOrUpdateReflection: protectedProcedure
      .input(z.object({
        weekNumber: z.number(),
        surprised: z.string(),
        applicationToFashion: z.string(),
        nextWeekTest: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createOrUpdateReflection(
          ctx.user.id,
          input.weekNumber,
          input.surprised,
          input.applicationToFashion,
          input.nextWeekTest
        );
      }),

    getReflection: protectedProcedure
      .input(z.object({ weekNumber: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getReflection(ctx.user.id, input.weekNumber);
      }),

    // Content Angle procedures
    createContentAngleSuggestion: protectedProcedure
      .input(z.object({
        weekNumber: z.number(),
        suggestion: z.string(),
        platform: z.string(),
        format: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createContentAngleSuggestion(
          ctx.user.id,
          input.weekNumber,
          input.suggestion,
          input.platform,
          input.format
        );
      }),

    getContentAngleSuggestion: protectedProcedure
      .input(z.object({ weekNumber: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getContentAngleSuggestion(ctx.user.id, input.weekNumber);
      }),

    getAllContentAngleSuggestions: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getAllContentAngleSuggestions(ctx.user.id);
      }),

    // Post Feedback procedures
    createPostFeedback: protectedProcedure
      .input(z.object({
        postId: z.number(),
        hookStrength: z.string(),
        audienceAppeal: z.string(),
        platformFit: z.string(),
        suggestions: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createPostFeedback(
          ctx.user.id,
          input.postId,
          input.hookStrength,
          input.audienceAppeal,
          input.platformFit,
          input.suggestions
        );
      }),

    getPostFeedback: protectedProcedure
      .input(z.object({ postId: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getPostFeedback(ctx.user.id, input.postId);
      }),
  }),


    // Content Calendar procedures
    createContentPost: protectedProcedure
      .input(z.object({
        brand: z.enum(["personal", "business"]),
        platform: z.enum(["instagram", "tiktok", "both"]),
        scheduledDate: z.string(),
        postIdea: z.string(),
        contentType: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const data: any = {
          brand: input.brand,
          platform: input.platform,
          scheduledDate: input.scheduledDate,
          postIdea: input.postIdea,
          status: "draft",
        };
        if (input.contentType) data.contentType = input.contentType;
        if (input.notes) data.notes = input.notes;
        return await db.createContentPost(ctx.user.id, data);
      }),

    getContentCalendar: protectedProcedure
      .input(z.object({ brand: z.enum(["personal", "business"]).optional() }))
      .query(async ({ ctx, input }) => {
        return await db.getContentCalendar(ctx.user.id, input.brand);
      }),

    updateContentPost: protectedProcedure
      .input(z.object({
        postId: z.number(),
        status: z.enum(["draft", "scheduled", "published", "archived"]).optional(),
        postIdea: z.string().optional(),
        notes: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        const data: any = {};
        if (input.status) data.status = input.status;
        if (input.postIdea) data.postIdea = input.postIdea;
        if (input.notes) data.notes = input.notes;
        return await db.updateContentPost(ctx.user.id, input.postId, data);
      }),

    deleteContentPost: protectedProcedure
      .input(z.object({ postId: z.number() }))
      .mutation(async ({ ctx, input }) => {
        return await db.deleteContentPost(ctx.user.id, input.postId);
      }),


    // Learning Proof procedures
    createLearningProof: protectedProcedure
      .input(z.object({
        weekNumber: z.number(),
        taskId: z.string(),
        proof: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createLearningProof(ctx.user.id, input.weekNumber, input.taskId, input.proof);
      }),

    getLearningProof: protectedProcedure
      .input(z.object({
        weekNumber: z.number(),
        taskId: z.string(),
      }))
      .query(async ({ ctx, input }) => {
        return await db.getLearningProof(ctx.user.id, input.weekNumber, input.taskId);
      }),

    getWeeklyProofs: protectedProcedure
      .input(z.object({ weekNumber: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getWeeklyProofs(ctx.user.id, input.weekNumber);
      }),

    updateLearningProof: protectedProcedure
      .input(z.object({
        weekNumber: z.number(),
        taskId: z.string(),
        proof: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.updateLearningProof(ctx.user.id, input.weekNumber, input.taskId, input.proof);
      }),

    // Weekly Reflection procedures
    createOrUpdateReflection: protectedProcedure
      .input(z.object({
        weekNumber: z.number(),
        surprised: z.string(),
        applicationToFashion: z.string(),
        nextWeekTest: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createOrUpdateReflection(
          ctx.user.id,
          input.weekNumber,
          input.surprised,
          input.applicationToFashion,
          input.nextWeekTest
        );
      }),

    getReflection: protectedProcedure
      .input(z.object({ weekNumber: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getReflection(ctx.user.id, input.weekNumber);
      }),

    // Content Angle procedures
    createContentAngleSuggestion: protectedProcedure
      .input(z.object({
        weekNumber: z.number(),
        suggestion: z.string(),
        platform: z.string(),
        format: z.string().optional(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createContentAngleSuggestion(
          ctx.user.id,
          input.weekNumber,
          input.suggestion,
          input.platform,
          input.format
        );
      }),

    getContentAngleSuggestion: protectedProcedure
      .input(z.object({ weekNumber: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getContentAngleSuggestion(ctx.user.id, input.weekNumber);
      }),

    getAllContentAngleSuggestions: protectedProcedure
      .query(async ({ ctx }) => {
        return await db.getAllContentAngleSuggestions(ctx.user.id);
      }),

    // Post Feedback procedures
    createPostFeedback: protectedProcedure
      .input(z.object({
        postId: z.number(),
        hookStrength: z.string(),
        audienceAppeal: z.string(),
        platformFit: z.string(),
        suggestions: z.string(),
      }))
      .mutation(async ({ ctx, input }) => {
        return await db.createPostFeedback(
          ctx.user.id,
          input.postId,
          input.hookStrength,
          input.audienceAppeal,
          input.platformFit,
          input.suggestions
        );
      }),

    getPostFeedback: protectedProcedure
      .input(z.object({ postId: z.number() }))
      .query(async ({ ctx, input }) => {
        return await db.getPostFeedback(ctx.user.id, input.postId);
      }),


});

export type AppRouter = typeof appRouter;
