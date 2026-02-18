import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Lightbulb, Copy, Check, Target } from "lucide-react";
import { roadmapData } from "@shared/roadmapData";

function ContentCreationProfessionalContent() {
  const [selectedWeek, setSelectedWeek] = useState<string>("1");
  const [generating, setGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const weekNumber = parseInt(selectedWeek);
  const weekData = roadmapData.find(w => w.weekNumber === weekNumber);

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

      // Call LLM to generate LinkedIn post
      const response = await fetch("/api/trpc/phase2.createContentAngleSuggestion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          weekNumber,
          suggestion: `LinkedIn post about ${topic}`,
          platform: "linkedin",
          format: "post",
        }),
      });

      if (response.ok) {
        await trpc.useUtils().phase2.getAllContentAngleSuggestions.invalidate();
      }
    } finally {
      setGenerating(false);
    }
  };

  const handleCopyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <Lightbulb className="w-8 h-8 text-blue-500" />
          Content Creation - Professional Track
        </h1>
        <p className="text-muted-foreground mt-2">
          Generate LinkedIn posts about what you learned each week at IQOS/in CRO. Turn your professional insights into shareable content that showcases your expertise and builds your professional brand.
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
        <Card className="border-blue-200 bg-blue-50">
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
                    <span className="text-blue-600 font-bold">•</span>
                    {obj.text}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white p-3 rounded-lg border border-blue-200 text-xs">
              <p className="font-medium text-gray-700">
                💡 <span className="font-semibold">LinkedIn Post Tip:</span> Share a specific insight or lesson learned this week. Make it actionable and relevant to CRO professionals. Include a call-to-action like "What's your experience with this?" to encourage engagement.
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
        <Card className="border-blue-200 bg-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              📝 Week {weekNumber} LinkedIn Post
            </CardTitle>
            <CardDescription>
              Platform: LinkedIn • Format: Post
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-white rounded-lg border border-blue-200">
              <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{suggestion.suggestion}</p>
            </div>
            <div className="flex gap-2">
              <Button 
                onClick={() => handleCopyToClipboard(suggestion.suggestion)}
                variant="outline"
                className="flex-1"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 mr-2" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 mr-2" />
                    Copy to Clipboard
                  </>
                )}
              </Button>
              <Button variant="outline" className="flex-1">
                Regenerate
              </Button>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardHeader>
            <CardTitle>No LinkedIn Post Yet</CardTitle>
            <CardDescription>
              Generate an AI-powered LinkedIn post for this week's learning
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
              Generate LinkedIn Post
            </Button>
          </CardContent>
        </Card>
      )}

      {/* All Posts Overview */}
      {allSuggestions.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Your LinkedIn Posts</CardTitle>
            <CardDescription>{allSuggestions.length} posts generated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-3">
              {allSuggestions.map(post => (
                <div key={post.id} className="p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <p className="font-semibold text-sm">Week {post.weekNumber}</p>
                  <p className="text-xs text-gray-600 mt-1">{post.platform} • {post.format}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default function ContentCreationProfessional() {
  return (
    <DashboardLayout>
      <ContentCreationProfessionalContent />
    </DashboardLayout>
  );
}
