import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { trpc } from "@/lib/trpc";
import { roadmapData, Week } from "@shared/roadmapData";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { useState, useEffect } from "react";

export default function Roadmap() {
  const { user } = useAuth();
  const [currentWeekNumber, setCurrentWeekNumber] = useState(1);
  const [personalNote, setPersonalNote] = useState("");
  const [completedTasks, setCompletedTasks] = useState<Set<string>>(new Set());

  const currentWeek = roadmapData.find(w => w.weekNumber === currentWeekNumber);

  // Queries
  const { data: weekProgress } = trpc.roadmap.getWeekProgress.useQuery({ weekNumber: currentWeekNumber });
  const { data: weekTasks } = trpc.roadmap.getWeekTasks.useQuery({ weekNumber: currentWeekNumber });
  const { data: savedNote } = trpc.roadmap.getPersonalNote.useQuery({ weekNumber: currentWeekNumber });

  // Mutations
  const toggleTaskMutation = trpc.roadmap.toggleTask.useMutation();
  const saveNoteMutation = trpc.roadmap.savePersonalNote.useMutation();
  const updateProgressMutation = trpc.roadmap.updateWeekProgress.useMutation();

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

  const handleTaskToggle = async (taskId: string) => {
    const newCompleted = new Set(completedTasks);
    if (newCompleted.has(taskId)) {
      newCompleted.delete(taskId);
    } else {
      newCompleted.add(taskId);
    }
    setCompletedTasks(newCompleted);

    await toggleTaskMutation.mutateAsync({
      weekNumber: currentWeekNumber,
      taskId,
      completed: newCompleted.has(taskId),
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
      <div className="space-y-6">
        {/* Week Navigation */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Week {currentWeekNumber}</h1>
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
                <CardTitle className="text-2xl">{currentWeek.title}</CardTitle>
                <CardDescription className="mt-2">{currentWeek.goal}</CardDescription>
              </div>
              <Badge className={phaseColors[currentWeek.phase]}>
                {currentWeek.phase}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Progress</span>
                <span className="text-sm font-bold">{progressPercentage}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all"
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Learning Focus */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Learning Focus</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {currentWeek.learningFocus.map((focus, idx) => (
                <Badge key={idx} variant="secondary">
                  {focus}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Objectives */}
        <Card>
          <CardHeader>
            <CardTitle>Weekly Objectives</CardTitle>
            <CardDescription>{completedTasks.size} of {currentWeek.objectives.length} completed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentWeek.objectives.map((objective) => (
                <div key={objective.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-accent transition-colors">
                  <Checkbox
                    checked={completedTasks.has(objective.id)}
                    onCheckedChange={() => handleTaskToggle(objective.id)}
                    className="mt-1"
                  />
                  <label className={`flex-1 text-sm cursor-pointer ${completedTasks.has(objective.id) ? "line-through text-muted-foreground" : ""}`}>
                    {objective.text}
                  </label>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Resources */}
        <Card>
          <CardHeader>
            <CardTitle>Resources</CardTitle>
            <CardDescription>Recommended learning materials for this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {currentWeek.resources.map((resource, idx) => (
                <a
                  key={idx}
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-accent transition-colors"
                >
                  <div>
                    <p className="font-medium text-sm text-foreground">{resource.title}</p>
                    <p className="text-xs text-muted-foreground mt-1">{resource.type}</p>
                  </div>
                  <ExternalLink size={16} className="text-muted-foreground" />
                </a>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Mini Project */}
        {currentWeek.miniProject && (
          <Card>
            <CardHeader>
              <CardTitle>Mini Project</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <h3 className="font-semibold text-foreground">{currentWeek.miniProject.title}</h3>
                <p className="text-sm text-muted-foreground mt-2">{currentWeek.miniProject.description}</p>
              </div>
              <div className="bg-accent p-3 rounded-lg">
                <p className="text-xs font-medium text-muted-foreground">Deliverable</p>
                <p className="text-sm text-foreground mt-1">{currentWeek.miniProject.deliverable}</p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Personal Notes */}
        <Card>
          <CardHeader>
            <CardTitle>Personal Notes & Reflections</CardTitle>
            <CardDescription>Capture your learnings and insights for this week</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Textarea
              placeholder="Write your notes, reflections, or key takeaways from this week..."
              value={personalNote}
              onChange={(e) => setPersonalNote(e.target.value)}
              className="min-h-32"
            />
            <Button onClick={handleSaveNote} disabled={saveNoteMutation.isPending}>
              {saveNoteMutation.isPending ? "Saving..." : "Save Notes"}
            </Button>
          </CardContent>
        </Card>

        {/* Week Selector */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Jump to Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-6 gap-2">
              {Array.from({ length: 24 }, (_, i) => i + 1).map((week) => (
                <Button
                  key={week}
                  variant={currentWeekNumber === week ? "default" : "outline"}
                  size="sm"
                  onClick={() => setCurrentWeekNumber(week)}
                  className="w-full"
                >
                  W{week}
                </Button>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
