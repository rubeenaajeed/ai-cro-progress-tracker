import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { roadmapData, Week } from "@shared/roadmapData";
import { ChevronLeft, ChevronRight, ExternalLink, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";
import QuizModal from "@/components/QuizModal";

export default function RoadmapProfessional() {
  const { user } = useAuth();
  const [currentWeekNumber, setCurrentWeekNumber] = useState(1);
  const [personalNote, setPersonalNote] = useState("");
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());
  const [quizOpen, setQuizOpen] = useState(false);
  const [quizData, setQuizData] = useState<any>(null);
  const [pendingTaskId, setPendingTaskId] = useState<string | null>(null);
  const [quizLoading, setQuizLoading] = useState(false);

  // Only show weeks 1-24 for Professional track
  const currentWeek = roadmapData.find(w => w.weekNumber === currentWeekNumber && w.weekNumber <= 24);
  
  // Queries
  const { data: weekProgress } = trpc.roadmap.getWeekProgress.useQuery({ weekNumber: currentWeekNumber });
  const { data: weekTasks } = trpc.roadmap.getWeekTasks.useQuery({ weekNumber: currentWeekNumber });
  const { data: savedNote } = trpc.roadmap.getPersonalNote.useQuery({ weekNumber: currentWeekNumber });

  // Mutations
  const toggleTaskMutation = trpc.roadmap.toggleTask.useMutation();
  const saveNoteMutation = trpc.roadmap.savePersonalNote.useMutation();
  const updateProgressMutation = trpc.roadmap.updateWeekProgress.useMutation();
  const generateQuizMutation = trpc.roadmap.generateQuiz.useMutation();

  // Initialize data
  useEffect(() => {
    if (savedNote) {
      setPersonalNote(savedNote.content || "");
    }
  }, [savedNote]);

  useEffect(() => {
    if (weekTasks) {
      const completed = new Set(
        weekTasks.filter(t => t.completed === 1).map(t => t.taskId)
      );
      setCompletedTasks(completed);
    }
  }, [weekTasks]);

  const handleTaskToggle = async (taskId: string, taskText: string) => {
    const newCompleted = new Set(completedTasks);
    const isMarking = !newCompleted.has(taskId);

    if (isMarking) {
      // Show quiz before marking complete
      setPendingTaskId(taskId);
      setQuizLoading(true);
      setQuizOpen(true);

      try {
        const result = await generateQuizMutation.mutateAsync({
          taskText,
          weekNumber: currentWeekNumber,
        });
        setQuizData(result);
      } catch (error) {
        console.error("Failed to generate quiz:", error);
        // If quiz generation fails, allow manual completion
        setQuizOpen(false);
        completeTask(taskId, newCompleted);
      } finally {
        setQuizLoading(false);
      }
    } else {
      // Unchecking - just remove
      newCompleted.delete(taskId);
      setCompletedTasks(newCompleted);
      await toggleTaskMutation.mutateAsync({
        weekNumber: currentWeekNumber,
        taskId,
        completed: false,
      });
    }
  };

  const completeTask = async (taskId: string, newCompleted: Set<string>) => {
    newCompleted.add(taskId);
    setCompletedTasks(newCompleted);

    await toggleTaskMutation.mutateAsync({
      weekNumber: currentWeekNumber,
      taskId,
      completed: true,
    });

    // Update progress
    if (currentWeek) {
      const totalTasks = currentWeek.objectives.length;
      await updateProgressMutation.mutateAsync({
        weekNumber: currentWeekNumber,
        tasksCompleted: newCompleted.size,
        totalTasks,
      });
    }
  };

  const handleQuizComplete = async (passed: boolean) => {
    if (passed && pendingTaskId) {
      const newCompleted = new Set(completedTasks);
      await completeTask(pendingTaskId, newCompleted);
    }
    setQuizOpen(false);
    setQuizData(null);
    setPendingTaskId(null);
  };

  const handleSaveNote = async () => {
    await saveNoteMutation.mutateAsync({
      weekNumber: currentWeekNumber,
      content: personalNote,
    });
  };

  const phaseColors: Record<string, string> = {
    "Foundations": "bg-blue-100 text-blue-800",
    "Content & CRO": "bg-purple-100 text-purple-800",
    "Analytics & Automation": "bg-green-100 text-green-800",
    "Portfolio": "bg-orange-100 text-orange-800",
    "Positioning": "bg-pink-100 text-pink-800",
    "Personal Brand": "bg-rose-100 text-rose-800",
    "Business Brand": "bg-amber-100 text-amber-800",
  };

  if (!currentWeek) {
    return (
      <DashboardLayout>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Week not found</p>
        </div>
      </DashboardLayout>
    );
  }

  const progressPercentage = currentWeek.objectives.length > 0
    ? Math.round((completedTasks.size / currentWeek.objectives.length) * 100)
    : 0;

  return (
    <DashboardLayout>
      {/* Quiz Modal */}
      {quizOpen && (
        <QuizModal
          isOpen={quizOpen}
          onClose={() => {
            setQuizOpen(false);
            setQuizData(null);
            setPendingTaskId(null);
          }}
          onComplete={handleQuizComplete}
          questions={quizData?.questions || []}
          taskText={quizData?.taskText || ""}
          isLoading={quizLoading}
        />
      )}

      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">AI+CRO Roadmap</h1>
          <p className="text-muted-foreground mt-2">Your 24-week professional learning journey</p>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-foreground">Week {currentWeekNumber}</h2>
            <p className="text-muted-foreground mt-1">Month {currentWeek.month}</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeekNumber(Math.max(1, currentWeekNumber - 1))}
              disabled={currentWeekNumber === 1}
            >
              <ChevronLeft size={16} className="mr-1" />
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentWeekNumber(Math.min(24, currentWeekNumber + 1))}
              disabled={currentWeekNumber === 24}
            >
              Next
              <ChevronRight size={16} className="ml-1" />
            </Button>
          </div>
        </div>

        {/* Week Overview */}
        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle>{currentWeek.title}</CardTitle>
                <CardDescription className="mt-2">{currentWeek.goal}</CardDescription>
              </div>
              <Badge className={phaseColors[currentWeek.phase] || "bg-gray-100 text-gray-800"}>
                {currentWeek.phase}
              </Badge>
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Progress */}
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm text-muted-foreground">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>

            {/* Learning Focus */}
            {currentWeek.learningFocus && (
              <div>
                <h4 className="text-sm font-medium mb-2">Learning Focus</h4>
                <div className="flex flex-wrap gap-2">
                  {currentWeek.learningFocus.map((focus, idx) => (
                    <Badge key={idx} variant="secondary">
                      {focus}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {/* Objectives */}
            <div>
              <h4 className="text-sm font-medium mb-3">Tasks</h4>
              <div className="space-y-2">
                {currentWeek.objectives.map((objective) => (
                  <div key={objective.id} className="flex items-start gap-3 p-2 rounded hover:bg-muted/50">
                    <Checkbox
                      id={objective.id}
                      checked={completedTasks.has(objective.id)}
                      onCheckedChange={() => handleTaskToggle(objective.id, objective.text)}
                      className="mt-1"
                    />
                    <label
                      htmlFor={objective.id}
                      className={`text-sm cursor-pointer flex-1 ${
                        completedTasks.has(objective.id)
                          ? "line-through text-muted-foreground"
                          : "text-foreground"
                      }`}
                    >
                      {objective.text}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            {currentWeek.resources && currentWeek.resources.length > 0 && (
              <div>
                <h4 className="text-sm font-medium mb-3">Resources</h4>
                <div className="space-y-2">
                  {currentWeek.resources.map((resource, idx) => (
                    <a
                      key={idx}
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 p-2 rounded hover:bg-muted/50 text-primary hover:underline text-sm"
                    >
                      <ExternalLink size={14} />
                      {resource.title}
                    </a>
                  ))}
                </div>
              </div>
            )}

            {/* Mini Project */}
            {currentWeek.miniProject && (
              <div className="p-3 bg-muted/50 rounded">
                <h4 className="font-medium text-sm mb-1">{currentWeek.miniProject.title}</h4>
                <p className="text-sm text-muted-foreground mb-2">{currentWeek.miniProject.description}</p>
                <p className="text-xs text-muted-foreground">
                  <strong>Deliverable:</strong> {currentWeek.miniProject.deliverable}
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Personal Notes */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Personal Notes</CardTitle>
            <CardDescription>Reflect on your learning this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              value={personalNote}
              onChange={(e) => setPersonalNote(e.target.value)}
              placeholder="What did you learn? What was challenging? What will you apply?"
              className="min-h-[120px]"
            />
            <Button onClick={handleSaveNote} size="sm">
              Save Note
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
