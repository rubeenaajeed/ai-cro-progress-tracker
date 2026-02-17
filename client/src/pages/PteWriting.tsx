import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, Check, X, Lightbulb } from "lucide-react";
import { toast } from "sonner";

export default function PteWriting() {
  const { isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswer, setUserAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [feedback, setFeedback] = useState<any>(null);
  const [timeSpent, setTimeSpent] = useState(0);
  const [wordCount, setWordCount] = useState(0);

  const { data: questions, isLoading } = trpc.pte.getQuestionsBySection.useQuery({
    section: "writing",
    weekNumber: 2,
  });

  const submitAnswerMutation = trpc.pte.submitAnswer.useMutation();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeSpent(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    setWordCount(userAnswer.trim().split(/\s+/).filter(w => w.length > 0).length);
  }, [userAnswer]);

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  if (isLoading) {
    return <div className="flex items-center justify-center min-h-screen">Loading questions...</div>;
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card>
          <CardHeader>
            <CardTitle>No Writing Questions Available</CardTitle>
            <CardDescription>Check back soon for more practice questions</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => setLocation("/pte")}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const isSummarizeQuestion = currentQuestion.questionType === "summarize-written-text";
  const maxWords = isSummarizeQuestion ? 75 : 300;
  const minWords = isSummarizeQuestion ? 1 : 200;

  const handleSubmit = async () => {
    if (!currentQuestion) return;

    if (!userAnswer.trim()) {
      toast.error("Please write your answer");
      return;
    }

    if (wordCount < minWords) {
      toast.error(`Minimum ${minWords} words required. You have ${wordCount} words.`);
      return;
    }

    if (isSummarizeQuestion && wordCount > maxWords) {
      toast.error(`Maximum ${maxWords} words allowed. You have ${wordCount} words.`);
      return;
    }

    try {
      const result = await submitAnswerMutation.mutateAsync({
        questionId: currentQuestion.questionId,
        userAnswer: userAnswer,
        timeSpentSeconds: timeSpent,
      });

      setFeedback(result);
      setSubmitted(true);
    } catch (error) {
      toast.error("Failed to submit answer");
    }
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setLocation("/pte");
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
      setUserAnswer("");
      setSubmitted(false);
      setFeedback(null);
      setTimeSpent(0);
      setWordCount(0);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button variant="ghost" onClick={() => setLocation("/pte")} className="gap-2">
            <ChevronLeft className="w-4 h-4" />
            Back
          </Button>
          <div className="text-right">
            <p className="text-sm text-slate-600">Question {currentQuestionIndex + 1} of {questions.length}</p>
            <p className="text-sm text-slate-600">Time: {formatTime(timeSpent)}</p>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-slate-200 rounded-full h-2 mb-6">
          <div
            className="bg-green-600 h-2 rounded-full transition-all"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        {/* Question Card */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">{currentQuestion.questionType.replace(/-/g, " ").toUpperCase()}</CardTitle>
            <CardDescription>Week {currentQuestion.weekNumber}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Question Content */}
            <div className="bg-slate-50 p-4 rounded-lg">
              <p className="text-slate-900 whitespace-pre-wrap text-sm">{currentQuestion.content}</p>
            </div>

            {/* Tips */}
            {isSummarizeQuestion && (
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex gap-3">
                <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold">Tips for summarizing:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Capture the main idea in one sentence</li>
                    <li>Keep it under 75 words</li>
                    <li>Use your own words</li>
                    <li>Include key information</li>
                  </ul>
                </div>
              </div>
            )}

            {!isSummarizeQuestion && (
              <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex gap-3">
                <Lightbulb className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <div className="text-sm text-blue-900">
                  <p className="font-semibold">Essay structure:</p>
                  <ul className="list-disc list-inside mt-1 space-y-1">
                    <li>Introduction: State your position</li>
                    <li>Body: Support with examples</li>
                    <li>Conclusion: Summarize your view</li>
                    <li>200-300 words recommended</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Text Area */}
            <div className="space-y-2">
              <Textarea
                placeholder="Write your answer here..."
                value={userAnswer}
                onChange={(e) => setUserAnswer(e.target.value)}
                disabled={submitted}
                className="min-h-64 resize-none"
              />
              <div className="flex justify-between text-sm text-slate-600">
                <span>Words: {wordCount}</span>
                <span>
                  {isSummarizeQuestion ? `Max: ${maxWords}` : `Min: ${minWords}`}
                </span>
              </div>
            </div>

            {/* Feedback */}
            {submitted && feedback && (
              <div className={`p-4 rounded-lg ${feedback.isCorrect ? "bg-green-50 border border-green-200" : "bg-amber-50 border border-amber-200"}`}>
                <div className="flex items-start gap-3">
                  {feedback.isCorrect ? (
                    <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  ) : (
                    <X className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <p className={`font-semibold ${feedback.isCorrect ? "text-green-900" : "text-amber-900"}`}>
                      Score: {feedback.score}/90
                    </p>
                    <p className={`text-sm mt-1 ${feedback.isCorrect ? "text-green-800" : "text-amber-800"}`}>
                      {feedback.feedback}
                    </p>
                    {feedback.feedbackDetails && Object.keys(feedback.feedbackDetails).length > 0 && (
                      <div className="mt-3 text-sm space-y-2">
                        {Object.entries(feedback.feedbackDetails).map(([key, value]: [string, any]) => (
                          <div key={key}>
                            <p className={`font-semibold ${feedback.isCorrect ? "text-green-700" : "text-amber-700"}`}>
                              {key.replace(/([A-Z])/g, " $1").trim()}:
                            </p>
                            <p className={feedback.isCorrect ? "text-green-700" : "text-amber-700"}>
                              {value}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex gap-3 justify-end">
          {!submitted ? (
            <Button
              onClick={handleSubmit}
              disabled={submitAnswerMutation.isPending}
              className="px-6"
            >
              {submitAnswerMutation.isPending ? "Submitting..." : "Submit Answer"}
            </Button>
          ) : (
            <Button onClick={handleNext} className="px-6">
              {isLastQuestion ? "Finish" : "Next Question"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
