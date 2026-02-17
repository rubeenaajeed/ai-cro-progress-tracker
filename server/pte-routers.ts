import { protectedProcedure, router } from "./_core/trpc";
import { invokeLLM } from "./_core/llm";
import { z } from "zod";
import * as pteDb from "./pte-db";

export const pteRouter = router({
  /**
   * Get questions by section
   */
  getQuestionsBySection: protectedProcedure
    .input(z.object({
      section: z.enum(["reading", "writing", "speaking", "listening"]),
      weekNumber: z.number().optional(),
    }))
    .query(async ({ input }) => {
      return await pteDb.getPteQuestionsBySection(input.section, input.weekNumber);
    }),

  /**
   * Submit answer and get feedback
   */
  submitAnswer: protectedProcedure
    .input(z.object({
      questionId: z.string(),
      userAnswer: z.string(),
      timeSpentSeconds: z.number(),
    }))
    .mutation(async ({ ctx, input }) => {
      const question = await pteDb.getPteQuestionById(input.questionId);
      if (!question) {
        throw new Error("Question not found");
      }

      // Get AI feedback
      const messages: any[] = [
        {
          role: "system",
          content: "You are a PTE exam expert. Evaluate the user's answer and provide detailed feedback."
        },
        {
          role: "user",
          content: `Question: ${question.content}\n\nUser Answer: ${input.userAnswer}\n\nExpected Answer Guidance: ${question.correctAnswerExplanation}\n\nProvide feedback in JSON format: { "score": 0-90, "isCorrect": boolean, "feedback": "brief feedback", "feedbackDetails": { "grammar": "...", "vocabulary": "...", "structure": "...", "fluency": "..." } }`
        }
      ];

      const response = await invokeLLM({
        messages,
        response_format: {
          type: "json_schema",
          json_schema: {
            name: "pte_feedback",
            strict: true,
            schema: {
              type: "object",
              properties: {
                score: { type: "number", description: "PTE score 0-90" },
                isCorrect: { type: "boolean" },
                feedback: { type: "string" },
                feedbackDetails: {
                  type: "object",
                  properties: {
                    grammar: { type: "string" },
                    vocabulary: { type: "string" },
                    structure: { type: "string" },
                    fluency: { type: "string" }
                  }
                }
              },
              required: ["score", "isCorrect", "feedback", "feedbackDetails"]
            }
          }
        }
      });

      const feedbackText = typeof response.choices[0].message.content === 'string' 
        ? response.choices[0].message.content 
        : '';
      const feedback = JSON.parse(feedbackText);

      // Update progress
      const score = feedback.score || 0;
      const isCorrect = score >= 65;
      
      return {
        isCorrect,
        score,
        feedback: feedback.feedback,
        feedbackDetails: feedback.feedbackDetails,
      };
    }),

  /**
   * Get user progress
   */
  getProgress: protectedProcedure
    .input(z.object({ section: z.enum(["reading", "writing", "speaking", "listening"]).optional() }))
    .query(async ({ ctx, input }) => {
      const allProgress = await pteDb.getUserAllProgress(ctx.user.id);
      
      if (input?.section) {
        return allProgress.filter(p => p.section === input.section);
      }
      
      return allProgress;
    }),

  /**
   * Get mock test results
   */
  getMockTests: protectedProcedure
    .query(async ({ ctx }) => {
      return await pteDb.getUserMockTests(ctx.user.id);
    }),

  /**
   * Save notes for a question
   */
  saveNotes: protectedProcedure
    .input(z.object({
      questionId: z.string(),
      notes: z.string(),
      isFlagged: z.boolean().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      return await pteDb.createOrUpdateUserNote(
        ctx.user.id,
        input.questionId,
        input.notes,
        input.isFlagged || false
      );
    }),

  /**
   * Get user notes
   */
  getNotes: protectedProcedure
    .query(async ({ ctx }) => {
      return await pteDb.getUserNotes(ctx.user.id);
    }),

  /**
   * Get flagged questions
   */
  getFlaggedQuestions: protectedProcedure
    .query(async ({ ctx }) => {
      return await pteDb.getFlaggedQuestions(ctx.user.id);
    }),
});
