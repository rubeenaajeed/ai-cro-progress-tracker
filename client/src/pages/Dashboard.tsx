import { useAuth } from "@/_core/hooks/useAuth";
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

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { data: allProgress, isLoading } = trpc.roadmap.getAllProgress.useQuery();
  const { data: recentCheckIns } = trpc.roadmap.getRecentCheckIns.useQuery({ days: 30 });
  const [currentStreak, setCurrentStreak] = useState(0);

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

  // Prepare chart data
  const monthlyData = [
    { month: "Month 1", completed: 0, total: 4 },
    { month: "Month 2", completed: 0, total: 4 },
    { month: "Month 3", completed: 0, total: 4 },
    { month: "Month 4", completed: 0, total: 4 },
    { month: "Month 5", completed: 0, total: 4 },
    { month: "Month 6", completed: 0, total: 4 },
  ];

  if (allProgress) {
    allProgress.forEach(week => {
      const monthIndex = Math.ceil(week.weekNumber / 4) - 1;
      if (monthIndex >= 0 && monthIndex < 6) {
        if (week.completionPercentage === 100) {
          monthlyData[monthIndex].completed++;
        }
      }
    });
  }

  const weeklyProgressData = allProgress?.slice(0, 12).map(week => ({
    week: `W${week.weekNumber}`,
    progress: week.completionPercentage,
  })) || [];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Welcome back, {user?.name?.split(' ')[0]}!</h1>
            <p className="text-muted-foreground mt-2">Your 6-month AI + CRO learning journey</p>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overall Progress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{overallProgress}%</div>
              <Progress value={overallProgress} className="mt-2" />
              <p className="text-xs text-muted-foreground mt-2">{completedWeeks} of 24 weeks completed</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 size={16} /> Completed Weeks
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{completedWeeks}</div>
              <p className="text-xs text-muted-foreground mt-2">of 24 weeks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Flame size={16} className="text-orange-500" /> Current Streak
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-orange-500">{currentStreak}</div>
              <p className="text-xs text-muted-foreground mt-2">days of learning</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <BookOpen size={16} /> Current Phase
              </CardTitle>
            </CardHeader>
            <CardContent>
              {allProgress && allProgress.length > 0 ? (() => {
                const incompleteWeek = allProgress.find(w => w.completionPercentage < 100);
                const currentWeek = incompleteWeek || allProgress[allProgress.length - 1];
                const weekData = roadmapData.find(w => w.weekNumber === currentWeek.weekNumber);
                const phaseWeeks = roadmapData.filter(w => w.phase === weekData?.phase);
                const phaseStart = Math.min(...phaseWeeks.map(w => w.weekNumber));
                const phaseEnd = Math.max(...phaseWeeks.map(w => w.weekNumber));
                return (<><div className="text-sm font-bold text-foreground">{weekData?.phase}</div><p className="text-xs text-muted-foreground mt-2">Weeks {phaseStart}-{phaseEnd}</p></>);
              })() : (<><div className="text-sm font-bold text-foreground">Foundations</div><p className="text-xs text-muted-foreground mt-2">Weeks 1-4</p></>)}
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
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
                  <Legend />
                  <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
                  <Bar dataKey="total" fill="#e5e7eb" name="Total" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Weekly Progress Trend */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Progress Trend</CardTitle>
              <CardDescription>Your completion rate over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={weeklyProgressData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line type="monotone" dataKey="progress" stroke="#3b82f6" strokeWidth={2} />
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
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button
                onClick={() => setLocation("/roadmap")}
                className="w-full"
                variant="outline"
              >
                <BookOpen size={16} className="mr-2" />
                View Roadmap
              </Button>
              <Button
                onClick={() => setLocation("/progress")}
                className="w-full"
                variant="outline"
              >
                <TrendingUp size={16} className="mr-2" />
                Check Progress
              </Button>
              <Button
                onClick={() => setLocation("/portfolio")}
                className="w-full"
                variant="outline"
              >
                <CheckCircle2 size={16} className="mr-2" />
                Portfolio
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Current Week Highlight */}
        {allProgress && allProgress.length > 0 && (() => {
          // Find the first incomplete week or the last completed week
          const incompleteWeek = allProgress.find(w => w.completionPercentage < 100);
          const currentWeek = incompleteWeek || allProgress[allProgress.length - 1];
          const weekData = roadmapData.find(w => w.weekNumber === currentWeek.weekNumber);
          
          return (
            <Card>
              <CardHeader>
                <CardTitle>Current Focus</CardTitle>
                <CardDescription>Week {currentWeek.weekNumber}: {weekData?.title}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-foreground mb-4">
                  {weekData?.goal}
                </p>
                <Button onClick={() => setLocation(`/roadmap?week=${currentWeek.weekNumber}`)}>
                  Go to Week {currentWeek.weekNumber}
                </Button>
              </CardContent>
            </Card>
          );
        })()}
      </div>
    </DashboardLayout>
  );
}
