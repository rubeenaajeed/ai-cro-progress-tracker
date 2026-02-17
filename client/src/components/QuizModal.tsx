import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";

interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface QuizModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (passed: boolean) => void;
  questions: Question[];
  taskText: string;
  isLoading?: boolean;
}

export default function QuizModal({
  isOpen,
  onClose,
  onComplete,
  questions,
  taskText,
  isLoading = false,
}: QuizModalProps) {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<number[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [score, setScore] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const isAnswered = selectedAnswers[currentQuestionIndex] !== undefined;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  const handleSelectAnswer = (optionIndex: number) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      // Calculate score
      let correctCount = 0;
      questions.forEach((q, idx) => {
        if (selectedAnswers[idx] === q.correctAnswer) {
          correctCount++;
        }
      });
      setScore(correctCount);
      setShowResults(true);
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleComplete = () => {
    const passed = score >= 2; // 2 out of 3 correct = pass
    onComplete(passed);
    onClose();
  };

  const handleRetry = () => {
    setCurrentQuestionIndex(0);
    setSelectedAnswers([]);
    setShowResults(false);
    setScore(0);
  };

  if (!currentQuestion && !showResults) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-12">
            <Loader2 className="animate-spin mb-4" size={32} />
            <p className="text-muted-foreground">Generating quiz questions...</p>
          </div>
        ) : showResults ? (
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle>Quiz Results</DialogTitle>
              <DialogDescription>
                You answered {score} out of {questions.length} questions correctly
              </DialogDescription>
            </DialogHeader>

            <div className="space-y-4">
              {/* Score Display */}
              <div className="text-center py-8 bg-accent rounded-lg">
                <div className="text-5xl font-bold mb-2">
                  {Math.round((score / questions.length) * 100)}%
                </div>
                <p className="text-lg font-medium text-foreground">
                  {score >= 2 ? "✓ You passed!" : "Try again to master this topic"}
                </p>
              </div>

              {/* Review Answers */}
              <div className="space-y-3 max-h-64 overflow-y-auto">
                {questions.map((q, idx) => {
                  const isCorrect = selectedAnswers[idx] === q.correctAnswer;
                  return (
                    <Card key={idx} className={`p-4 ${isCorrect ? "border-green-200 bg-green-50" : "border-red-200 bg-red-50"}`}>
                      <div className="flex items-start gap-3">
                        {isCorrect ? (
                          <CheckCircle2 className="text-green-600 mt-1 flex-shrink-0" size={20} />
                        ) : (
                          <XCircle className="text-red-600 mt-1 flex-shrink-0" size={20} />
                        )}
                        <div className="flex-1">
                          <p className="font-medium text-sm text-foreground">{q.question}</p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Your answer: <span className="font-medium">{q.options[selectedAnswers[idx]]}</span>
                          </p>
                          {!isCorrect && (
                            <p className="text-xs text-muted-foreground mt-1">
                              Correct answer: <span className="font-medium text-green-700">{q.options[q.correctAnswer]}</span>
                            </p>
                          )}
                          <p className="text-xs text-muted-foreground mt-2 italic">{q.explanation}</p>
                        </div>
                      </div>
                    </Card>
                  );
                })}
              </div>

              {/* Action Buttons */}
              <div className="flex gap-2 pt-4">
                {score >= 2 ? (
                  <Button onClick={handleComplete} className="flex-1">
                    <CheckCircle2 size={16} className="mr-2" />
                    Mark Task Complete
                  </Button>
                ) : (
                  <>
                    <Button onClick={handleRetry} variant="outline" className="flex-1">
                      Try Again
                    </Button>
                    <Button onClick={onClose} variant="ghost" className="flex-1">
                      Skip for Now
                    </Button>
                  </>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <DialogHeader>
              <DialogTitle>Quick Knowledge Check</DialogTitle>
              <DialogDescription>
                Answer 3 questions to verify your understanding of: "{taskText}"
              </DialogDescription>
            </DialogHeader>

            {/* Question */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </p>
                <div className="flex gap-1">
                  {questions.map((_, idx) => (
                    <div
                      key={idx}
                      className={`h-2 w-8 rounded-full ${
                        idx <= currentQuestionIndex ? "bg-blue-500" : "bg-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>

              <p className="text-lg font-medium text-foreground">{currentQuestion.question}</p>

              {/* Options */}
              <div className="space-y-2">
                {currentQuestion.options.map((option, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectAnswer(idx)}
                    className={`w-full text-left p-3 rounded-lg border-2 transition-colors ${
                      selectedAnswers[currentQuestionIndex] === idx
                        ? "border-blue-500 bg-blue-50"
                        : "border-border hover:border-blue-300"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                          selectedAnswers[currentQuestionIndex] === idx
                            ? "border-blue-500 bg-blue-500"
                            : "border-gray-300"
                        }`}
                      >
                        {selectedAnswers[currentQuestionIndex] === idx && (
                          <div className="w-2 h-2 bg-white rounded-full" />
                        )}
                      </div>
                      <span className="text-sm font-medium text-foreground">{option}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Navigation */}
            <div className="flex gap-2 pt-4">
              <Button
                onClick={handlePrevious}
                variant="outline"
                disabled={currentQuestionIndex === 0}
              >
                Previous
              </Button>
              <Button onClick={onClose} variant="ghost" className="flex-1">
                Skip Quiz
              </Button>
              <Button
                onClick={handleNext}
                disabled={!isAnswered}
                className="flex-1"
              >
                {isLastQuestion ? "See Results" : "Next"}
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
