import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Sparkles, Target } from "lucide-react";
import { roadmapData } from "@shared/roadmapData";

function WeeklyReflectionPersonalContent() {
  const [selectedWeek, setSelectedWeek] = useState<string>("1");
  const [surprised, setSurprised] = useState("");
  const [applicationToPersonal, setApplicationToPersonal] = useState("");
  const [nextWeekTest, setNextWeekTest] = useState("");
  const [saving, setSaving] = useState(false);

  const weekNumber = parseInt(selectedWeek);
  const weekData = roadmapData.find(w => w.weekNumber === weekNumber);

  // Get reflection
  const { data: reflection, isLoading } = trpc.phase2.getReflection.useQuery(
    { weekNumber },
    { enabled: !!weekNumber }
  );

  // Mutation
  const saveReflection = trpc.phase2.createOrUpdateReflection.useMutation();

  const handleSave = async () => {
    if (!surprised.trim() || !applicationToPersonal.trim() || !nextWeekTest.trim()) {
      alert("Please fill in all reflection prompts");
      return;
    }

    setSaving(true);
    try {
      await saveReflection.mutateAsync({
        weekNumber,
        surprised,
        applicationToFashion: applicationToPersonal,
        nextWeekTest,
      });
      alert("Reflection saved!");
    } finally {
      setSaving(false);
    }
  };

  // Load existing reflection
  if (reflection && !surprised) {
    setSurprised(reflection.surprised || "");
    setApplicationToPersonal(reflection.applicationToFashion || "");
    setNextWeekTest(reflection.nextWeekTest || "");
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Sparkles className="w-8 h-8 text-purple-500" />
          Weekly Reflection - Personal Track
        </h1>
        <p className="text-muted-foreground mt-2">
          Answer these guided reflection prompts to deepen your learning for your personal ventures. This is your manifestation space for your fitness brand & clothing business.
        </p>
      </div>

      {/* Week Selector */}
      <Card>
        <CardHeader>
          <CardTitle>Select Week</CardTitle>
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

      {/* Reflection Cards */}
      <div className="grid gap-6">
        {/* Card 1: What Surprised You */}
        <Card className="border-pink-200 bg-gradient-to-br from-pink-50 to-transparent">
          <CardHeader>
            <CardTitle className="text-lg">✨ What Surprised You This Week?</CardTitle>
            <CardDescription>
              Share something unexpected you learned or discovered
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write your reflection here..."
              value={surprised}
              onChange={(e) => setSurprised(e.target.value)}
              className="min-h-32 bg-white"
            />
          </CardContent>
        </Card>

        {/* Card 2: Application to Personal Ventures */}
        <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-transparent">
          <CardHeader>
            <CardTitle className="text-lg">🎯 How Does This Apply to Your Personal Ventures?</CardTitle>
            <CardDescription>
              Connect this week's learning to your fitness brand or clothing business
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write your reflection here..."
              value={applicationToPersonal}
              onChange={(e) => setApplicationToPersonal(e.target.value)}
              className="min-h-32 bg-white"
            />
          </CardContent>
        </Card>

        {/* Card 3: Next Week Test */}
        <Card className="border-green-200 bg-gradient-to-br from-green-50 to-transparent">
          <CardHeader>
            <CardTitle className="text-lg">🚀 What Will You Test Next Week?</CardTitle>
            <CardDescription>
              Plan your next action or experiment
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Textarea
              placeholder="Write your reflection here..."
              value={nextWeekTest}
              onChange={(e) => setNextWeekTest(e.target.value)}
              className="min-h-32 bg-white"
            />
          </CardContent>
        </Card>
      </div>

      {/* Save Button */}
      <Button
        onClick={handleSave}
        disabled={saving || isLoading}
        size="lg"
        className="w-full"
      >
        {saving ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
        Save Reflection
      </Button>

      {/* Confirmation */}
      {reflection && (
        <Card className="border-green-200 bg-green-50">
          <CardHeader>
            <CardTitle className="text-green-700">✓ Reflection Saved</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-green-700">
              Your week {weekNumber} personal reflection has been saved. Keep manifesting! 🌟
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function WeeklyReflectionPersonal() {
  return (
    <DashboardLayout>
      <WeeklyReflectionPersonalContent />
    </DashboardLayout>
  );
}
