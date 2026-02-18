import { useState } from "react";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Lightbulb, Video, Image as ImageIcon } from "lucide-react";

export default function ContentAngle() {
  const [selectedWeek, setSelectedWeek] = useState<string>("1");
  const [generating, setGenerating] = useState(false);

  const weekNumber = parseInt(selectedWeek);

  // Get all content angle suggestions
  const { data: allSuggestions = [], isLoading } = trpc.phase2.getAllContentAngleSuggestions.useQuery();

  // Get suggestion for selected week
  const suggestion = allSuggestions.find(s => s.weekNumber === weekNumber);

  // Mutation
  const createSuggestion = trpc.phase2.createContentAngleSuggestion.useMutation();

  const handleGenerateIdea = async () => {
    setGenerating(true);
    try {
      // Get week topic from roadmap data
      const weekTopics: Record<number, string> = {
        1: "Cialdini's 6 Principles of Persuasion",
        2: "CRO Fundamentals and User Journey Mapping",
        3: "A/B Testing and Experimentation",
        4: "Behavioral Analytics and Heatmaps",
        // Add more as needed
      };

      const topic = weekTopics[weekNumber] || `Week ${weekNumber} topic`;

      // Call LLM to generate content idea
      const response = await fetch("/api/trpc/phase2.createContentAngleSuggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weekNumber,
          suggestion: `AI-generated content idea for ${topic}`,
          platform: "instagram",
          format: "reel",
        }),
      });

      if (response.ok) {
        // Refetch suggestions
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
          <Lightbulb className="w-8 h-8 text-yellow-500" />
          Content Angle Ideas
        </h1>
        <p className="text-muted-foreground mt-2">
          Get AI-generated content ideas for each week. Turn your learning into engaging content for your Personal Brand.
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
              {Array.from({ length: 24 }, (_, i) => i + 1).map(week => (
                <SelectItem key={week} value={week.toString()}>
                  Week {week}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </CardContent>
      </Card>

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
