import { useState, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, CheckCircle2, BookOpen } from "lucide-react";

export default function LearningProof() {
  const [selectedWeek, setSelectedWeek] = useState<string>("1");
  const [proofs, setProofs] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  const weekNumber = parseInt(selectedWeek);

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
        <h1 className="text-3xl font-bold">Learning Proof</h1>
        <p className="text-muted-foreground mt-2">
          Document what you learned each week. These proofs become your evidence of learning and can be shared as content.
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
              {Array.from({ length: 24 }, (_, i) => i + 1).map(week => (
                <SelectItem key={week} value={week.toString()}>
                  Week {week}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

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
                    <Textarea
                      placeholder="What did you learn from this task? How does it apply to your clothing brand? What surprised you?"
                      value={currentText}
                      onChange={(e) => setProofs(prev => ({ ...prev, [taskId]: e.target.value }))}
                      className="min-h-32"
                    />
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
        <Card className="border-blue-200 bg-blue-50">
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
