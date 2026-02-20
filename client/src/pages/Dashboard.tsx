import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { trpc } from "@/lib/trpc";
import { roadmapData } from "@shared/roadmapData";
import { personalRoadmapData } from "@shared/personalRoadmapData";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { CheckCircle2, Flame, TrendingUp, BookOpen } from "lucide-react";
import { useLocation } from "wouter";
import { useEffect, useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";
import { MetricsInputModal } from "@/components/MetricsInputModal";
import { BadgesDisplay } from "@/components/BadgesDisplay";
import { RecommendedNextWeek } from "@/components/RecommendedNextWeek";

export default function Dashboard() {
  const { user } = useAuth();
  const [, setLocation] = useLocation();
  const { data: allProgress, isLoading } = trpc.roadmap.getAllProgress.useQuery();
  const { data: recentCheckIns } = trpc.roadmap.getRecentCheckIns.useQuery({ days: 30 });
  const { data: badges = [] } = trpc.roadmap.getUserBadges.useQuery();
  const { data: aiCroMetrics = [] } = (trpc.roadmap as any).getAiCroMetrics.useQuery();
  const { data: personalBrandMetrics = [] } = (trpc.roadmap as any).getHistoricalMetrics.useQuery({ brand: "personal" });
  const { data: businessMetrics = [] } = (trpc.roadmap as any).getHistoricalMetrics.useQuery({ brand: "business" });
  
  const [currentStreak, setCurrentStreak] = useState(0);
  const [metricsModalOpen, setMetricsModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("ai-cro");

  // Calculate overall progress
  const overallProgress = allProgress
    ? Math.round(allProgress.reduce((sum, week) => sum + week.completionPercentage, 0) / allProgress.length)
    : 0;

  // Calculate completed weeks
  const completedWeeks = allProgress?.filter(w => w.completionPercentage === 100).length || 0;

  // Calculate AI+CRO track metrics (weeks 1-24)
  const aiCroProgress = allProgress?.filter(w => w.weekNumber <= 24) || [];
  const aiCroCompleted = aiCroProgress.filter(w => w.completionPercentage === 100).length;
  const aiCroPercentage = aiCroProgress.length > 0 ? Math.round((aiCroCompleted / aiCroProgress.length) * 100) : 0;

  // Calculate Personal+Business track metrics (weeks 25-54, but stored as 1-30 in separate tracking)
  const personalProgress = allProgress?.filter(w => w.weekNumber > 24) || [];
  const personalCompleted = personalProgress.filter(w => w.completionPercentage === 100).length;
  const personalPercentage = personalProgress.length > 0 ? Math.round((personalCompleted / personalProgress.length) * 100) : 0;

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

  // Prepare monthly data for AI+CRO chart
  const aiCroMonthlyData = Array.from({ length: 6 }, (_, i) => ({
    month: `Month ${i + 1}`,
    completed: aiCroProgress?.filter(w => w.weekNumber <= (i + 1) * 4 && w.completionPercentage === 100).length || 0,
  }));

  // Prepare monthly data for Personal+Business chart
  const personalMonthlyData = Array.from({ length: 6 }, (_, i) => ({
    month: `Month ${i + 1}`,
    completed: personalProgress?.filter(w => w.weekNumber <= 24 + (i + 1) * 5 && w.completionPercentage === 100).length || 0,
  }));

  // Prepare weekly trend data for AI+CRO
  const aiCroWeeklyTrend = aiCroProgress?.slice(0, Math.min(aiCroProgress.length, 10)).map(w => ({
    week: w.weekNumber,
    completion: w.completionPercentage,
  })) || [];

  // Prepare weekly trend data for Personal+Business
  const personalWeeklyTrend = personalProgress?.slice(0, Math.min(personalProgress.length, 10)).map(w => ({
    week: w.weekNumber - 24,
    completion: w.completionPercentage,
  })) || [];

  // Get current week for each track
  const currentAiCroWeek = aiCroProgress.find(w => w.completionPercentage < 100) || aiCroProgress[0];
  const currentPersonalWeek = personalProgress.find(w => w.completionPercentage < 100) || personalProgress[0];

  const currentAiCroWeekData = roadmapData.find(w => w.weekNumber === currentAiCroWeek?.weekNumber);
  const currentPersonalWeekData = personalRoadmapData.find(w => w.weekNumber === currentPersonalWeek?.weekNumber - 24);

  // Get recommended next week (high priority, based on difficulty)
  const getRecommendedWeek = (roadmap: typeof roadmapData, currentWeekNum: number) => {
    // Find incomplete weeks
    const incompleteWeeks = roadmap.filter(w => w.weekNumber > currentWeekNum);
    // Sort by priority (High first) then by difficulty (Beginner first)
    const priorityOrder = { "High": 0, "Medium": 1, "Low": 2 };
    const difficultyOrder = { "Beginner": 0, "Intermediate": 1, "Advanced": 2 };
    
    return incompleteWeeks.sort((a, b) => {
      const priorityDiff = (priorityOrder[a.priority as keyof typeof priorityOrder] ?? 3) - (priorityOrder[b.priority as keyof typeof priorityOrder] ?? 3);
      if (priorityDiff !== 0) return priorityDiff;
      return (difficultyOrder[a.difficulty as keyof typeof difficultyOrder] ?? 3) - (difficultyOrder[b.difficulty as keyof typeof difficultyOrder] ?? 3);
    })[0];
  };

  const recommendedAiCroWeek = getRecommendedWeek(roadmapData, currentAiCroWeek?.weekNumber || 0);
  const recommendedPersonalWeek = getRecommendedWeek(personalRoadmapData, currentPersonalWeek?.weekNumber - 24 || 0);

  // Get latest metrics for each program
  const latestAiCroMetric = aiCroMetrics && aiCroMetrics.length > 0 ? aiCroMetrics[aiCroMetrics.length - 1] : null;
  const latestPersonalMetric = personalBrandMetrics && personalBrandMetrics.length > 0 ? personalBrandMetrics[personalBrandMetrics.length - 1] : null;
  const latestBusinessMetric = businessMetrics && businessMetrics.length > 0 ? businessMetrics[businessMetrics.length - 1] : null;

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">Welcome back, {user?.name}!</h1>
          <p className="text-muted-foreground mt-2">Your unified learning dashboard across all programs</p>
        </div>

        {/* Unified Program Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ai-cro">AI + CRO Track</TabsTrigger>
            <TabsTrigger value="personal">Personal Brand</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
          </TabsList>

          {/* AI+CRO Track Tab */}
          <TabsContent value="ai-cro" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Overall Progress */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Track Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{aiCroPercentage}%</div>
                  <Progress value={aiCroPercentage} className="mt-3" />
                  <p className="text-xs text-muted-foreground mt-2">{aiCroCompleted} of 24 weeks completed</p>
                </CardContent>
              </Card>

              {/* Completed Weeks */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Completed Weeks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{aiCroCompleted}</div>
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
                  <div className="text-lg font-bold text-foreground">
                    {aiCroCompleted <= 4 ? "Foundations" : aiCroCompleted <= 8 ? "Content & CRO" : aiCroCompleted <= 12 ? "Analytics" : "Portfolio"}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Week {currentAiCroWeek?.weekNumber || 1}</p>
                </CardContent>
              </Card>
            </div>

            {/* AI+CRO Metrics Cards */}
            {latestAiCroMetric && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Course Completion</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{latestAiCroMetric.courseCompletionPercentage || 0}%</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Skills Acquired</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{latestAiCroMetric.skillsAcquired || 0}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">LinkedIn Connections</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{latestAiCroMetric.linkedinConnections || 0}</div>
                  </CardContent>
                </Card>
              </div>
            )}

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
                    <BarChart data={aiCroMonthlyData}>
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
                    <LineChart data={aiCroWeeklyTrend}>
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

            {/* Recommended Next Week */}
            <RecommendedNextWeek
              currentWeek={currentAiCroWeekData}
              nextHighPriorityWeek={recommendedAiCroWeek}
              onNavigate={(weekNum) => setLocation("/roadmap")}
              track="ai-cro"
            />

            {/* Current Week Highlight */}
            {currentAiCroWeek && (
              <Card>
                <CardHeader>
                  <CardTitle>Current Focus</CardTitle>
                  <CardDescription>Week {currentAiCroWeek.weekNumber}: {currentAiCroWeekData?.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground mb-4">
                    {currentAiCroWeekData?.objectives?.[0]?.text}
                  </p>
                  <div className="flex gap-2">
                    <Button onClick={() => setLocation("/roadmap")} className="flex-1">
                      Go to Week {currentAiCroWeek.weekNumber}
                    </Button>
                    <Button onClick={() => setMetricsModalOpen(true)} variant="outline">
                      Add Metrics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Personal Brand Tab */}
          <TabsContent value="personal" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Track Progress */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Track Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{personalPercentage}%</div>
                  <Progress value={personalPercentage} className="mt-3" />
                  <p className="text-xs text-muted-foreground mt-2">{personalCompleted} of 30 weeks completed</p>
                </CardContent>
              </Card>

              {/* Completed Weeks */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Completed Weeks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{personalCompleted}</div>
                  <p className="text-xs text-muted-foreground mt-2">of 30 weeks</p>
                </CardContent>
              </Card>

              {/* Current Streak */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Flame className="w-4 h-4 text-purple-500" />
                    Current Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-purple-500">{currentStreak}</div>
                  <p className="text-xs text-muted-foreground mt-2">days of learning</p>
                </CardContent>
              </Card>

              {/* Current Phase */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Current Phase</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-foreground">
                    {personalCompleted <= 4 ? "Psychology" : personalCompleted <= 8 ? "Storytelling" : personalCompleted <= 12 ? "Content" : "Growth"}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Week {currentPersonalWeek?.weekNumber - 24 || 1}</p>
                </CardContent>
              </Card>
            </div>

            {/* Personal Brand Metrics */}
            {latestPersonalMetric && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Followers</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(latestPersonalMetric.instagramFollowers || 0) + 
                       (latestPersonalMetric.youtubeFollowers || 0) + 
                       (latestPersonalMetric.tiktokFollowers || 0)}
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Avg Engagement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(
                        (parseFloat(latestPersonalMetric.instagramEngagement || "0") +
                         parseFloat(latestPersonalMetric.youtubeEngagement || "0") +
                         parseFloat(latestPersonalMetric.tiktokEngagement || "0")) / 3
                      ).toFixed(1)}%
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Views</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">
                      {(latestPersonalMetric.instagramViews || 0) + 
                       (latestPersonalMetric.youtubeViews || 0) + 
                       (latestPersonalMetric.tiktokViews || 0)}
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

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
                    <BarChart data={personalMonthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completed" fill="#a855f7" name="Completed" />
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
                    <LineChart data={personalWeeklyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="completion" stroke="#a855f7" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recommended Next Week */}
            <RecommendedNextWeek
              currentWeek={currentPersonalWeekData}
              nextHighPriorityWeek={recommendedPersonalWeek}
              onNavigate={(weekNum) => setLocation("/roadmap-personal")}
              track="personal"
            />

            {/* Current Week Highlight */}
            {currentPersonalWeek && (
              <Card>
                <CardHeader>
                  <CardTitle>Current Focus</CardTitle>
                  <CardDescription>Week {currentPersonalWeek.weekNumber - 24}: {currentPersonalWeekData?.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground mb-4">
                    {currentPersonalWeekData?.objectives?.[0]?.text}
                  </p>
                  <div className="flex gap-2">
                    <Button onClick={() => setLocation("/roadmap-personal")} className="flex-1">
                      Go to Week {currentPersonalWeek.weekNumber - 24}
                    </Button>
                    <Button onClick={() => setMetricsModalOpen(true)} variant="outline">
                      Add Metrics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Business Tab */}
          <TabsContent value="business" className="space-y-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Track Progress */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Track Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{personalPercentage}%</div>
                  <Progress value={personalPercentage} className="mt-3" />
                  <p className="text-xs text-muted-foreground mt-2">{personalCompleted} of 30 weeks completed</p>
                </CardContent>
              </Card>

              {/* Completed Weeks */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Completed Weeks</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground">{personalCompleted}</div>
                  <p className="text-xs text-muted-foreground mt-2">of 30 weeks</p>
                </CardContent>
              </Card>

              {/* Current Streak */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                    <Flame className="w-4 h-4 text-green-500" />
                    Current Streak
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-green-500">{currentStreak}</div>
                  <p className="text-xs text-muted-foreground mt-2">days of learning</p>
                </CardContent>
              </Card>

              {/* Current Phase */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Current Phase</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-lg font-bold text-foreground">
                    {personalCompleted <= 4 ? "Psychology" : personalCompleted <= 8 ? "Storytelling" : personalCompleted <= 12 ? "Content" : "Growth"}
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Week {currentPersonalWeek?.weekNumber - 24 || 1}</p>
                </CardContent>
              </Card>
            </div>

            {/* Business Metrics */}
            {latestBusinessMetric && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Orders/Month</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{latestBusinessMetric.ordersPerMonth || 0}</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Conversion Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{latestBusinessMetric.conversionRate || "0"}%</div>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Estimated Revenue</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${latestBusinessMetric.estimatedRevenue || "0"}</div>
                  </CardContent>
                </Card>
              </div>
            )}

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
                    <BarChart data={personalMonthlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completed" fill="#10b981" name="Completed" />
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
                    <LineChart data={personalWeeklyTrend}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="week" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="completion" stroke="#10b981" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recommended Next Week */}
            <RecommendedNextWeek
              currentWeek={currentPersonalWeekData}
              nextHighPriorityWeek={recommendedPersonalWeek}
              onNavigate={(weekNum) => setLocation("/roadmap-personal")}
              track="personal"
            />

            {/* Current Week Highlight */}
            {currentPersonalWeek && (
              <Card>
                <CardHeader>
                  <CardTitle>Current Focus</CardTitle>
                  <CardDescription>Week {currentPersonalWeek.weekNumber - 24}: {currentPersonalWeekData?.title}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-foreground mb-4">
                    {currentPersonalWeekData?.objectives?.[0]?.text}
                  </p>
                  <div className="flex gap-2">
                    <Button onClick={() => setLocation("/roadmap-personal")} className="flex-1">
                      Go to Week {currentPersonalWeek.weekNumber - 24}
                    </Button>
                    <Button onClick={() => setMetricsModalOpen(true)} variant="outline">
                      Add Metrics
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Get started with your learning</CardDescription>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button onClick={() => setLocation("/roadmap")} className="w-full">
              <BookOpen className="w-4 h-4 mr-2" />
              AI + CRO Roadmap
            </Button>
            <Button onClick={() => setLocation("/roadmap-personal")} variant="outline" className="w-full">
              <CheckCircle2 className="w-4 h-4 mr-2" />
              Personal + Business
            </Button>
            <Button onClick={() => setMetricsModalOpen(true)} variant="outline" className="w-full">
              <TrendingUp className="w-4 h-4 mr-2" />
              Add Metrics
            </Button>
          </CardContent>
        </Card>

        {/* Achievements Section */}
        <BadgesDisplay badges={badges} title="Your Achievements" />

        <MetricsInputModal
          open={metricsModalOpen}
          onOpenChange={setMetricsModalOpen}
          onSuccess={() => {
            // Optionally refresh data after adding metrics
          }}
        />
      </div>
    </DashboardLayout>
  );
}
