import { useState } from "react";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from "recharts";
import { Flame, TrendingUp, CheckCircle2, Calendar, Target } from "lucide-react";

function ProgressAnalyticsProfessionalContent() {
  const [followerCount, setFollowerCount] = useState(0);
  const [savingMetrics, setSavingMetrics] = useState(false);

  // Get all progress data
  const { data: progressData = [] } = trpc.roadmap.getAllProgress.useQuery();

  // Calculate Professional track metrics (weeks 1-24)
  const professionalProgress = progressData.filter(p => p.weekNumber <= 24);
  const completedWeeks = professionalProgress.filter(p => p.completionPercentage >= 100).length;
  const totalWeeks = 24;
  const completionPercentage = Math.round((completedWeeks / totalWeeks) * 100);

  // Calculate current streak (consecutive completed weeks)
  let currentStreak = 0;
  for (let i = 1; i <= totalWeeks; i++) {
    const week = professionalProgress.find(p => p.weekNumber === i);
    if (week && week.completionPercentage >= 100) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Monthly breakdown
  const monthlyData = [
    { month: "Month 1", weeks: 4, completed: professionalProgress.filter(p => p.weekNumber <= 4 && p.completionPercentage >= 100).length },
    { month: "Month 2", weeks: 4, completed: professionalProgress.filter(p => p.weekNumber > 4 && p.weekNumber <= 8 && p.completionPercentage >= 100).length },
    { month: "Month 3", weeks: 4, completed: professionalProgress.filter(p => p.weekNumber > 8 && p.weekNumber <= 12 && p.completionPercentage >= 100).length },
    { month: "Month 4", weeks: 4, completed: professionalProgress.filter(p => p.weekNumber > 12 && p.weekNumber <= 16 && p.completionPercentage >= 100).length },
    { month: "Month 5", weeks: 4, completed: professionalProgress.filter(p => p.weekNumber > 16 && p.weekNumber <= 20 && p.completionPercentage >= 100).length },
    { month: "Month 6", weeks: 4, completed: professionalProgress.filter(p => p.weekNumber > 20 && p.weekNumber <= 24 && p.completionPercentage >= 100).length },
  ];

  // Week-by-week grid data
  const weekGridData = Array.from({ length: totalWeeks }, (_, i) => {
    const week = i + 1;
    const progress = professionalProgress.find(p => p.weekNumber === week);
    return {
      week,
      completed: progress ? progress.completionPercentage >= 100 : false,
    };
  });

  // Mutation for saving metrics
  const saveMetrics = trpc.roadmap.updateWeekProgress.useMutation();

  const handleSaveMetrics = async () => {
    if (followerCount <= 0) {
      alert("Please enter a valid follower count");
      return;
    }

    setSavingMetrics(true);
    try {
      // Save as a note or metric (you can extend the schema to include custom metrics)
      await saveMetrics.mutateAsync({
        weekNumber: 1,
        tasksCompleted: followerCount,
        totalTasks: 100,
      });
      alert("Metrics saved!");
    } finally {
      setSavingMetrics(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold flex items-center gap-2">
          <TrendingUp className="w-8 h-8 text-blue-500" />
          AI+CRO Progress Analytics
        </h1>
        <p className="text-muted-foreground mt-2">
          Track your learning progress, streak, and key metrics for your professional AI + CRO journey.
        </p>
      </div>

      {/* Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Weeks Completed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completedWeeks}/{totalWeeks}</div>
            <p className="text-xs text-muted-foreground mt-1">{completionPercentage}% complete</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Streak</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2">
              <Flame className="w-6 h-6 text-orange-500" />
              <div className="text-3xl font-bold">{currentStreak}</div>
            </div>
            <p className="text-xs text-muted-foreground mt-1">weeks in a row</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Current Phase</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold">
              {completedWeeks <= 4 ? "Foundations" : completedWeeks <= 8 ? "Intermediate" : "Advanced"}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Week {completedWeeks + 1}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Completion Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{completionPercentage}%</div>
            <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
              <div
                className="bg-blue-500 h-2 rounded-full transition-all"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Key Metrics Input */}
      <Card className="border-blue-200 bg-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="w-5 h-5" />
            Track Your Metrics
          </CardTitle>
          <CardDescription>Update your professional growth metrics</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium">LinkedIn Followers (optional)</label>
            <div className="flex gap-2 mt-2">
              <Input
                type="number"
                placeholder="Enter your current follower count"
                value={followerCount}
                onChange={(e) => setFollowerCount(parseInt(e.target.value) || 0)}
              />
              <Button onClick={handleSaveMetrics} disabled={savingMetrics}>
                {savingMetrics ? "Saving..." : "Save"}
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-1">Track your LinkedIn growth as you build your professional brand</p>
          </div>
        </CardContent>
      </Card>

      {/* Monthly Progress Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Progress Breakdown</CardTitle>
          <CardDescription>Weeks completed per month</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
              <Bar dataKey="weeks" fill="#e5e7eb" name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Week-by-Week Status Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Week-by-Week Completion Status</CardTitle>
          <CardDescription>Your progress across all 24 weeks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-6 gap-2">
            {weekGridData.map(({ week, completed }) => (
              <div
                key={week}
                className={`p-3 rounded-lg text-center font-semibold text-sm transition-all ${
                  completed
                    ? "bg-green-100 text-green-700 border border-green-300"
                    : "bg-gray-100 text-gray-500 border border-gray-300"
                }`}
              >
                {completed && <CheckCircle2 className="w-4 h-4 mx-auto mb-1" />}
                W{week}
              </div>
            ))}
          </div>
          <p className="text-xs text-muted-foreground mt-4">
            Green = Completed | Gray = Pending
          </p>
        </CardContent>
      </Card>

      {/* Progress Timeline */}
      <Card>
        <CardHeader>
          <CardTitle>Cumulative Progress Over Time</CardTitle>
          <CardDescription>Your learning journey progress</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="completed"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={{ fill: "#3b82f6", r: 5 }}
                name="Weeks Completed"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Insights */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-transparent">
        <CardHeader>
          <CardTitle>Your Progress Insights</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex items-start gap-3">
            <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">You're {completionPercentage}% through your AI+CRO journey</p>
              <p className="text-xs text-muted-foreground">{totalWeeks - completedWeeks} weeks remaining</p>
            </div>
          </div>
          {currentStreak > 0 && (
            <div className="flex items-start gap-3">
              <Flame className="w-5 h-5 text-orange-500 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-sm">Amazing streak of {currentStreak} weeks!</p>
                <p className="text-xs text-muted-foreground">Keep the momentum going</p>
              </div>
            </div>
          )}
          <div className="flex items-start gap-3">
            <Calendar className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
            <div>
              <p className="font-medium text-sm">Estimated completion date</p>
              <p className="text-xs text-muted-foreground">
                {completedWeeks === totalWeeks ? "Completed! 🎉" : `In ${totalWeeks - completedWeeks} weeks`}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ProgressAnalyticsProfessional() {
  return (
    <DashboardLayout>
      <ProgressAnalyticsProfessionalContent />
    </DashboardLayout>
  );
}
