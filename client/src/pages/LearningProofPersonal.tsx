import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle2, BookOpen, Target } from "lucide-react";
import { roadmapData } from "@shared/roadmapData";

function LearningProofPersonalContent() {
  const [selectedWeek, setSelectedWeek] = useState<string>("1");
  const [proofs, setProofs] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const weekNumber = parseInt(selectedWeek);
  const weekData = roadmapData.find(w => w.weekNumber === weekNumber);

  // Get weekly proofs
  const { data: weeklyProofs = [], isLoading } = trpc.phase2.getWeeklyProofs.useQuery(
    { weekNumber },
    { enabled: !!weekNumber }
  );

  // Mutations
  const createProof = trpc.phase2.createLearningProof.useMutation();
  const updateProof = trpc.phase2.updateLearningProof.useMutation();

  const handleSaveProof = async (taskId: string, proof: string) => {
    if (!proof.trim()) return;

    setSaving(true);
    try {
      const existing = weeklyProofs.find(p => p.taskId === taskId);
      
      if (existing) {
        await updateProof.mutateAsync({ weekNumber, taskId, proof });
      } else {
        await createProof.mutateAsync({ weekNumber, taskId, proof });
      }

      // Refetch
      await trpc.useUtils().phase2.getWeeklyProofs.invalidate();
      setProofs(prev => ({ ...prev, [taskId]: "" }));
    } finally {
      setSaving(false);
    }
  };

  const taskIds = [
    "task-1-1", "task-1-2", "task-1-3", "task-1-4", "task-1-5"
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Learning Proof - Personal Track</h1>
        <p className="text-muted-foreground mt-2">
          Document what you learned each week for your personal ventures (fitness brand & clothing business). These proofs become your content and business insights.
        </p>
      </div>

      {/* Week Selector */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookOpen className="w-5 h-5" />
            Select Week
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Select value={selectedWeek} onValueChange={setSelectedWeek}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 24 }, (_, i) => i + 1).map(week => {
                const wd = roadmapData.find(w => w.weekNumber === week);
                return (
                  <SelectItem key={week} value={week.toString()}>
                    Week {week}: {wd?.title || ""}
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

      {/* Week Context */}
      {weekData && (
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="text-lg">Week {weekNumber}: {weekData.title}</CardTitle>
            <CardDescription>{weekData.goal}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <h4 className="font-semibold text-sm mb-2 flex items-center gap-2">
                <Target className="w-4 h-4" />
                Key Learning Objectives
              </h4>
              <ul className="space-y-2">
                {weekData.objectives.map(obj => (
                  <li key={obj.id} className="text-sm text-gray-700 flex gap-2">
                    <span className="text-purple-600 font-bold">•</span>
                    {obj.text}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs font-medium text-gray-600 mb-2">Learning Focus:</p>
              <div className="flex flex-wrap gap-2">
                {weekData.learningFocus.map(focus => (
                  <span key={focus} className="text-xs bg-white px-2 py-1 rounded border border-purple-200">
                    {focus}
                  </span>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Learning Proofs */}
      <div className="space-y-4">
        {isLoading ? (
          <div className="flex items-center justify-center p-8">
            <Loader2 className="w-6 h-6 animate-spin" />
          </div>
        ) : (
          <>
            {taskIds.map((taskId, idx) => {
              const proof = weeklyProofs.find(p => p.taskId === taskId);
              const currentText = proofs[taskId] || proof?.proof || "";

              return (
                <Card key={taskId}>
                  <CardHeader>
                    <CardTitle className="text-lg">Task {idx + 1}</CardTitle>
                    {proof && (
                      <div className="flex items-center gap-2 text-green-600 text-sm mt-2">
                        <CheckCircle2 className="w-4 h-4" />
                        Learning proof recorded
                      </div>
                    )}
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div>
                        <label className="text-sm font-medium text-foreground">What did you learn?</label>
                        <Textarea
                          placeholder="Describe the key concepts, insights, or skills you gained from this task..."
                          value={currentText}
                          onChange={(e) => setProofs(prev => ({ ...prev, [taskId]: e.target.value }))}
                          className="min-h-32 mt-2"
                        />
                      </div>
                      <div className="text-xs text-muted-foreground bg-purple-50 p-3 rounded-lg border border-purple-200">
                        <p className="font-medium mb-1">🎯 How Will You Use This for Your Personal Ventures?</p>
                        <p>Optional: Add notes about how this applies to your fitness brand or clothing business. Which venture benefits most?</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => handleSaveProof(taskId, currentText)}
                      disabled={saving || !currentText.trim()}
                      className="w-full"
                    >
                      {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
                      Save Learning Proof
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </>
        )}
      </div>

      {/* Weekly Summary */}
      {weeklyProofs.length > 0 && (
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle>Week {weekNumber} Summary</CardTitle>
            <CardDescription>{weeklyProofs.length} learning proofs recorded</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {weeklyProofs.map((proof, idx) => (
              <div key={proof.id} className="p-4 bg-white rounded-lg border">
                <p className="font-semibold text-sm mb-2">Task {idx + 1}</p>
                <p className="text-sm text-gray-700">{proof.proof}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function LearningProofPersonal() {
  return (
    <DashboardLayout>
      <LearningProofPersonalContent />
    </DashboardLayout>
  );
}
