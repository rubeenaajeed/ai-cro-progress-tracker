import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Lightbulb, Video, Image as ImageIcon, Target } from "lucide-react";
import { personalRoadmapData } from "@shared/personalRoadmapData";

function ContentCreationPersonalContent() {
  const [selectedWeek, setSelectedWeek] = useState<string>("1");
  const [generating, setGenerating] = useState(false);

  const weekNumber = parseInt(selectedWeek);
  const weekData = personalRoadmapData.find(w => w.weekNumber === weekNumber);

  // Get all content suggestions
  const { data: allSuggestions = [], isLoading } = trpc.phase2.getAllContentAngleSuggestions.useQuery();

  // Get suggestion for selected week
  const suggestion = allSuggestions.find(s => s.weekNumber === weekNumber);

  // Mutation
  const createSuggestion = trpc.phase2.createContentAngleSuggestion.useMutation();

  const handleGenerateIdea = async () => {
    setGenerating(true);
    try {
      const topic = weekData?.title || `Week ${weekNumber} topic`;

      // Call LLM to generate content idea
      const response = await fetch("/api/trpc/phase2.createContentAngleSuggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weekNumber,
          suggestion: `Content idea for ${topic}`,
          platform: "instagram",
          format: "reel",
        }),
      });

      if (response.ok) {
        await trpc.useUtils().phase2.getAllContentAngleSuggestions.invalidate();
      }
    } finally {
      setGenerating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Lightbulb className="w-8 h-8 text-purple-500" />
          Content Creation - Personal Track
        </h1>
        <p className="text-muted-foreground mt-2">
          Get AI-generated content ideas for each week. Turn your learning into engaging content for your fitness brand and clothing business. These suggestions help you create posts that showcase your knowledge while building your audience.
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
              {Array.from({ length: 30 }, (_, i) => i + 1).map(week => {
                const wd = personalRoadmapData.find(w => w.weekNumber === week);
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
            <div className="bg-white p-3 rounded-lg border border-purple-200 text-xs">
              <p className="font-medium text-gray-700">
                💡 <span className="font-semibold">Content Idea Tip:</span> Use these learning objectives to create educational content for your fitness journey or clothing business. For example, if you're learning about psychological triggers, you could create a post about how understanding motivation psychology helped you stay consistent with workouts.
              </p>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Current Suggestion */}
      {isLoading ? (
        <div className="flex items-center justify-center p-8">
          <Loader2 className="w-6 h-6 animate-spin" />
        </div>
      ) : suggestion ? (
        <Card className="border-purple-200 bg-purple-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              {suggestion.format === "reel" ? (
                <Video className="w-5 h-5" />
              ) : (
                <ImageIcon className="w-5 h-5" />
              )}
              Week {weekNumber} Content Idea
            </CardTitle>
            <CardDescription>
              Platform: {suggestion.platform} • Format: {suggestion.format}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-gray-700 leading-relaxed">{suggestion.suggestion}</p>
            <Button className="mt-4" variant="outline">
              Use This Idea
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No Content Idea Yet</CardTitle>
            <CardDescription>
              Generate an AI-powered content idea for this week's learning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button
              onClick={handleGenerateIdea}
              disabled={generating}
              size="lg"
              className="w-full"
            >
              {generating ? <Loader2 className="w-4 h-4 mr-2 animate-spin" /> : null}
              Generate Content Idea
            </Button>
          </CardContent>
        </Card>
      )}

      {/* All Ideas Overview */}
      {allSuggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your Content Ideas</CardTitle>
            <CardDescription>{allSuggestions.length} ideas generated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {allSuggestions.map(idea => (
                <div key={idea.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <p className="font-semibold text-sm">Week {idea.weekNumber}</p>
                  <p className="text-xs text-gray-600 mt-1">{idea.format} • {idea.platform}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function ContentCreationPersonal() {
  return (
    <DashboardLayout>
      <ContentCreationPersonalContent />
    </DashboardLayout>
  );
}
