import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Trophy, Star, Zap, Award, BookOpen, TrendingUp } from "lucide-react";

interface Badge {
  id: number;
  badgeType: string;
  badgeName: string;
  description?: string | null;
  icon?: string | null;
  earnedAt: string | Date;
  weekNumber?: number | null;
  track?: string | null;
}

interface BadgesDisplayProps {
  badges: Badge[];
  title?: string;
  showEmpty?: boolean;
}

const BADGE_ICONS: Record<string, React.ReactNode> = {
  "psychology-master": <BookOpen className="w-8 h-8 text-purple-500" />,
  "ai-expert": <Zap className="w-8 h-8 text-yellow-500" />,
  "cro-specialist": <TrendingUp className="w-8 h-8 text-blue-500" />,
  "brand-builder": <Star className="w-8 h-8 text-pink-500" />,
  "business-pro": <Award className="w-8 h-8 text-green-500" />,
  "consistent-learner": <Trophy className="w-8 h-8 text-orange-500" />,
};

export function BadgesDisplay({ badges, title = "Achievements", showEmpty = true }: BadgesDisplayProps) {
  if (badges.length === 0 && !showEmpty) {
    return null;
  }

  return (
    <Card className="border-amber-200 bg-gradient-to-r from-amber-50 to-transparent">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trophy className="w-5 h-5 text-amber-600" />
          {title}
        </CardTitle>
        <CardDescription>
          {badges.length === 0
            ? "Complete weeks to earn badges and achievements"
            : `You've earned ${badges.length} badge${badges.length !== 1 ? "s" : ""}`}
        </CardDescription>
      </CardHeader>
      <CardContent>
        {badges.length === 0 ? (
          <div className="text-center py-8">
            <Trophy className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-muted-foreground">No badges earned yet. Keep learning!</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className="flex flex-col items-center p-4 bg-white rounded-lg border border-amber-100 hover:shadow-md transition-shadow"
              >
                <div className="mb-2">
                  {BADGE_ICONS[badge.badgeType] || <Trophy className="w-8 h-8 text-gray-400" />}
                </div>
                <h3 className="text-sm font-semibold text-center">{badge.badgeName}</h3>
                {badge.description && (
                  <p className="text-xs text-muted-foreground text-center mt-1">{badge.description}</p>
                )}
                {badge.weekNumber && (
                  <p className="text-xs text-gray-500 mt-2">Week {badge.weekNumber}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
