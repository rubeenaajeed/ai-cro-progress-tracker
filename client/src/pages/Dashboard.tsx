import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { trpc } from "@/lib/trpc";
import { roadmapData } from "@shared/roadmapData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { CheckCircle2, Flame, TrendingUp, BookOpen } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { MetricsInputModal } from "@/components/MetricsInputModal";

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { data: allProgress, isLoading } = trpc.roadmap.getAllProgress.useQuery();
  const { data: recentCheckIns } = trpc.roadmap.getRecentCheckIns.useQuery({ days: 30 });
  const [currentStreak, setCurrentStreak] = useState(0);
  const [metricsModalOpen, setMetricsModalOpen] = useState(false);

  // Calculate overall progress
  const overallProgress = allProgress
    ? Math.round(allProgress.reduce((sum, week) => sum + week.completionPercentage, 0) / allProgress.length)
    : 0;

  // Calculate completed weeks
  const completedWeeks = allProgress?.filter(w => w.completionPercentage === 100).length || 0;

  // Calculate streak
  useEffect(() => {
    if (!recentCheckIns) return;

    let streak = 0;
    const today = new Date();
    
    for (let i = 0; i < 365; i++) {
      const checkDate = new Date(today);
      checkDate.setDate(checkDate.getDate() - i);
      const dateStr = checkDate.toISOString().split('T')[0];
      
      const hasCheckIn = recentCheckIns.some(ci => ci.date === dateStr);
      if (hasCheckIn) {
        streak++;
      } else if (i > 0) {
        break;
      }
    }
    
    setCurrentStreak(streak);
  }, [recentCheckIns]);

  if (isLoading) {
    return (
      <DashboardLayout>
        <div className="space-y-4">
          <div className="h-32 bg-muted animate-pulse rounded-lg" />
          <div className="h-32 bg-muted animate-pulse rounded-lg" />
        </div>
      </DashboardLayout>
    );
  }

  // Prepare monthly data for chart
  const monthlyData = Array.from({ length: 6 }, (_, i) => ({
    month: `Month ${i + 1}`,
    completed: allProgress?.filter(w => w.weekNumber <= (i + 1) * 4 && w.completionPercentage === 100).length || 0,
  }));

  // Prepare weekly trend data
  const weeklyTrend = allProgress?.slice(0, Math.min(allProgress.length, 10)).map(w => ({
    week: w.weekNumber,
    completion: w.completionPercentage,
  })) || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground mt-2">Your 6-month AI + CRO learning journey</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Overall Progress */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{overallProgress}%</div>
              <Progress value={overallProgress} className="mt-3" />
              <p className="text-xs text-muted-foreground mt-2">{completedWeeks} of 24 weeks completed</p>
            </CardContent>
          </Card>

          {/* Completed Weeks */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Completed Weeks</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{completedWeeks}</div>
              <p className="text-xs text-muted-foreground mt-2">of 24 weeks</p>
            </CardContent>
          </Card>

          {/* Current Streak */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Flame className="w-4 h-4 text-orange-500" />
                Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500">{currentStreak}</div>
              <p className="text-xs text-muted-foreground mt-2">days of learning</p>
            </CardContent>
          </Card>

          {/* Current Phase */}
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Current Phase</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-lg font-bold text-foreground">Foundations</div>
              <p className="text-xs text-muted-foreground mt-2">Weeks 1-4</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Monthly Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Progress</CardTitle>
              <CardDescription>Weeks completed per month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress Trend</CardTitle>
              <CardDescription>Your completion rate over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="completion" stroke="#3b82f6" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with your learning</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={() => setLocation("/roadmap")} className="w-full">
              <BookOpen className="w-4 h-4 mr-2" />
              View Roadmap
            </Button>
            <Button onClick={() => setLocation("/progress")} variant="outline" className="w-full">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Check Progress
            </Button>
            <Button onClick={() => setLocation("/portfolio")} variant="outline" className="w-full">
              <TrendingUp className="w-4 h-4 mr-2" />
              Portfolio
            </Button>
          </CardContent>
        </Card>

        {/* Current Week Highlight */}
        {allProgress && allProgress.length > 0 && (() => {
          const currentWeek = allProgress.find(w => w.completionPercentage < 100) || allProgress[0];
          const weekData = roadmapData.find(w => w.weekNumber === currentWeek.weekNumber);
          return (
            <Card>
              <CardHeader>
                <CardTitle>Current Focus</CardTitle>
                <CardDescription>Week {currentWeek.weekNumber}: {weekData?.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground mb-4">
                  {weekData?.objectives?.[0]?.text}
                </p>
                <div className="flex gap-2">
                  <Button onClick={() => setLocation("/roadmap")} className="flex-1">
                    Go to Week {currentWeek.weekNumber}
                  </Button>
                  <Button onClick={() => setMetricsModalOpen(true)} variant="outline">
                    Add Metrics
                  </Button>
                </div>
              </CardContent>
            </Card>
          );
        })()}
      </div>

      <MetricsInputModal
        open={metricsModalOpen}
        onOpenChange={setMetricsModalOpen}
        onSuccess={() => {
          // Optionally refresh data after adding metrics
        }}
      />
    </DashboardLayout>
  );
}
