import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap } from "lucide-react";
import { Week } from "@shared/roadmapData";

interface RecommendedNextWeekProps {
  currentWeek: Week | undefined;
  nextHighPriorityWeek: Week | undefined;
  onNavigate: (weekNumber: number) => void;
  track: "ai-cro" | "personal";
}

export function RecommendedNextWeek({
  currentWeek,
  nextHighPriorityWeek,
  onNavigate,
  track,
}: RecommendedNextWeekProps) {
  if (!nextHighPriorityWeek) return null;

  const getDifficultyColor = (difficulty?: string) => {
    switch (difficulty) {
      case "Beginner":
        return "bg-green-100 text-green-800";
      case "Intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "Advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-orange-100 text-orange-800";
      case "Low":
        return "bg-blue-100 text-blue-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <Card className="border-2 border-blue-200 bg-gradient-to-br from-blue-50 to-transparent">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Zap className="w-5 h-5 text-blue-600" />
          <CardTitle>Recommended Next Week</CardTitle>
        </div>
        <CardDescription>
          High-priority week to maximize your learning impact
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-lg">
              Week {nextHighPriorityWeek.weekNumber}: {nextHighPriorityWeek.title}
            </h3>
          </div>
          <p className="text-sm text-muted-foreground mb-3">
            {nextHighPriorityWeek.goal}
          </p>

          {/* Badges for difficulty and priority */}
          <div className="flex gap-2 mb-4 flex-wrap">
            {nextHighPriorityWeek.difficulty && (
              <Badge className={getDifficultyColor(nextHighPriorityWeek.difficulty)}>
                {nextHighPriorityWeek.difficulty}
              </Badge>
            )}
            {nextHighPriorityWeek.priority && (
              <Badge className={getPriorityColor(nextHighPriorityWeek.priority)}>
                {nextHighPriorityWeek.priority} Priority
              </Badge>
            )}
            <Badge variant="outline">
              {nextHighPriorityWeek.learningFocus?.[0] || "Learning"}
            </Badge>
          </div>

          {/* Key objectives preview */}
          <div className="bg-white rounded-md p-3 mb-4 border border-gray-200">
            <p className="text-xs font-semibold text-gray-700 mb-2">Key Objectives:</p>
            <ul className="space-y-1">
              {nextHighPriorityWeek.objectives.slice(0, 2).map((obj) => (
                <li key={obj.id} className="text-sm text-gray-600 flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>{obj.text}</span>
                </li>
              ))}
              {nextHighPriorityWeek.objectives.length > 2 && (
                <li className="text-xs text-gray-500 italic">
                  +{nextHighPriorityWeek.objectives.length - 2} more objectives
                </li>
              )}
            </ul>
          </div>

          {/* Resources count */}
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            <span>📚 {nextHighPriorityWeek.resources.length} resources</span>
            {nextHighPriorityWeek.miniProject && (
              <span>🎯 Mini project included</span>
            )}
          </div>

          {/* CTA Button */}
          <Button
            onClick={() => onNavigate(nextHighPriorityWeek.weekNumber)}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            <ArrowRight className="w-4 h-4 mr-2" />
            Start Week {nextHighPriorityWeek.weekNumber}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
