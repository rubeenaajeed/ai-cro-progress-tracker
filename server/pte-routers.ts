import { router, protectedProcedure } from "./_core/trpc";
import { z } from "zod";
import * as pteDb from "./pte-db";
import { invokeLLM } from "./_core/llm";

export const pteRouter = router({
  /**
   * Get questions by section and week
   */
  getQuestionsBySection: protectedProcedure
    .input(z.object({ section: z.enum(["reading", "writing", "speaking", "listening"]), weekNumber: z.number().optional() }))
    .query(async ({ input }) => {
      return await pteDb.getPteQuestionsBySection(input.section, input.weekNumber);
    }),

  /**
   * Get a specific question
   */
  getQuestion: protectedProcedure
    .input(z.object({ questionId: z.string() }))
    .query(async ({ input }) => {
      return await pteDb.getPteQuestionById(input.questionId);
    }),

  /**
   * Submit answer and get feedback
   */
  submitAnswer: protectedProcedure
    .input(z.object({
      questionId: z.string(),
      userAnswer: z.string(),
      timeSpentSeconds: z.number().optional(),
    }))
    .mutation(async ({ ctx, input }) => {
      const question = await pteDb.getPteQuestionById(input.questionId);
      if (!question) {
        throw new Error("Question not found");
      }

      // Determine if answer is correct
      let isCorrect = false;
      let feedback = "";
      let score = "0";
      let feedbackDetails: any = {};

      if (question.questionType === "multiple-choice-single" || question.questionType === "multiple-choice-multiple") {
        // For multiple choice, check if answer matches
        if (question.questionType === "multiple-choice-multiple") {
          const userAnswers = input.userAnswer.split(",").map(a => a.trim());
          const correctAnswers = Array.isArray(question.correctAnswer) 
            ? question.correctAnswer 
            : [question.correctAnswer];
          isCorrect = JSON.stringify(userAnswers.sort()) === JSON.stringify(correctAnswers.sort());
        } else {
          isCorrect = input.userAnswer.trim() === question.correctAnswer;
        }
        
        score = isCorrect ? "90" : "0";
        feedback = isCorrect 
          ? `Correct! ${question.correctAnswerExplanation}`
          : `Incorrect. ${question.correctAnswerExplanation}`;
      } else if (question.questionType === "summarize-written-text") {
        // Use LLM to grade summary
        const llmFeedback = await invokeLLM({
          messages: [
            {
              role: "system",
              content: "You are a PTE exam grader. Grade the user's summary on a scale of 0-90 based on: accuracy (does it capture key points?), conciseness (is it under 75 words?), grammar, and vocabulary. Provide a score and detailed feedback."
            },
            {
              role: "user",
              content: `Original passage: ${question.content}\n\nUser's summary: ${input.userAnswer}\n\nProvide feedback in JSON format: {score: number, feedback: string, details: {accuracy: string, conciseness: string, grammar: string, vocabulary: string}}`
            }
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "summary_feedback",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  score: { type: "number" },
                  feedback: { type: "string" },
                  details: {
                    type: "object",
                    properties: {
                      accuracy: { type: "string" },
                      conciseness: { type: "string" },
                      grammar: { type: "string" },
                      vocabulary: { type: "string" }
                    }
                  }
                },
                required: ["score", "feedback", "details"]
              }
            }
          }
        });

        try {
          const content = llmFeedback.choices[0].message.content;
          const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
          const parsed = JSON.parse(contentStr);
          score = parsed.score.toString();
          feedback = parsed.feedback;
          feedbackDetails = parsed.details;
          isCorrect = parsed.score >= 70;
        } catch (e) {
          score = "50";
          feedback = "Unable to grade. Please try again.";
        }
      } else if (question.questionType === "essay") {
        // Use LLM to grade essay
        const llmFeedback = await invokeLLM({
          messages: [
            {
              role: "system",
              content: "You are a PTE exam grader. Grade the user's essay on a scale of 0-90 based on: task achievement (does it address the prompt?), coherence and cohesion (is it well-organized?), vocabulary range, grammatical accuracy. Provide a score and detailed feedback."
            },
            {
              role: "user",
              content: `Essay prompt: ${question.content}\n\nUser's essay: ${input.userAnswer}\n\nProvide feedback in JSON format: {score: number, feedback: string, details: {taskAchievement: string, coherence: string, vocabulary: string, grammar: string}}`
            }
          ],
          response_format: {
            type: "json_schema",
            json_schema: {
              name: "essay_feedback",
              strict: true,
              schema: {
                type: "object",
                properties: {
                  score: { type: "number" },
                  feedback: { type: "string" },
                  details: {
                    type: "object",
                    properties: {
                      taskAchievement: { type: "string" },
                      coherence: { type: "string" },
                      vocabulary: { type: "string" },
                      grammar: { type: "string" }
                    }
                  }
                },
                required: ["score", "feedback", "details"]
              }
            }
          }
        });

        try {
          const content = llmFeedback.choices[0].message.content;
          const contentStr = typeof content === 'string' ? content : JSON.stringify(content);
          const parsed = JSON.parse(contentStr);
          score = parsed.score.toString();
          feedback = parsed.feedback;
          feedbackDetails = parsed.details;
          isCorrect = parsed.score >= 70;
        } catch (e) {
          score = "50";
          feedback = "Unable to grade. Please try again.";
        }
      } else if (question.questionType === "reorder-paragraphs" || question.questionType === "fill-in-blanks") {
        isCorrect = input.userAnswer.trim() === question.correctAnswer;
        score = isCorrect ? "90" : "0";
        feedback = isCorrect 
          ? `Correct! ${question.correctAnswerExplanation}`
          : `Incorrect. ${question.correctAnswerExplanation}`;
      }

      // Save answer to database
      await pteDb.createPteAnswer({
        userId: ctx.user.id,
        questionId: input.questionId,
        userAnswer: input.userAnswer,
        isCorrect: isCorrect ? 1 : 0,
        score,
        feedback,
        feedbackDetails: JSON.stringify(feedbackDetails),
        timeSpentSeconds: input.timeSpentSeconds,
      });

      // Update progress
      const section = question.section;
      const weekNumber = question.weekNumber;
      const progress = await pteDb.getPteProgress(ctx.user.id, section, weekNumber);
      
      const newCorrectCount = (progress?.correctAnswers || 0) + (isCorrect ? 1 : 0);
      const newTotalCount = (progress?.totalQuestions || 0) + 1;
      const completionPercentage = Math.round((newCorrectCount / newTotalCount) * 100);
      const averageScore = ((parseFloat(progress?.averageScore || "0") * (newTotalCount - 1)) + parseFloat(score)) / newTotalCount;

      await pteDb.createOrUpdatePteProgress(ctx.user.id, section, weekNumber, {
        totalQuestions: newTotalCount,
        correctAnswers: newCorrectCount,
        completionPercentage,
        averageScore: averageScore.toFixed(2),
      });

      return {
        isCorrect,
        score,
        feedback,
        feedbackDetails,
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
