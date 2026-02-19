import { useState } from "react";
import { MetricsInputModal } from "@/components/MetricsInputModal";
import DashboardLayout from "@/components/DashboardLayout";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Flame, TrendingUp, CheckCircle2, Calendar, Target, Instagram, Youtube, Music } from "lucide-react";

function ProgressAnalyticsPersonalContent() {
  const [personalBrandMetrics, setPersonalBrandMetrics] = useState({
    instagram: { followers: 0, engagement: 0, views: 0 },
    youtube: { followers: 0, engagement: 0, views: 0 },
    tiktok: { followers: 0, engagement: 0, views: 0 },
  });

  const [clothingMetrics, setClothingMetrics] = useState({
    ordersPerMonth: 0,
    conversionRate: 0,
  });

  const [savingMetrics, setSavingMetrics] = useState(false);
  const [metricsModalOpen, setMetricsModalOpen] = useState(false);
  const { data: historicalMetrics = [] } = (trpc.roadmap as any).getHistoricalMetrics.useQuery({ brand: "personal" });
  const { data: businessMetrics = [] } = (trpc.roadmap as any).getHistoricalMetrics.useQuery({ brand: "business" });

  // Get all progress data
  const { data: progressData = [] } = trpc.roadmap.getAllProgress.useQuery();

  // Calculate Personal track metrics (weeks 1-30)
  const personalProgress = progressData.filter(p => p.weekNumber > 24 || p.weekNumber <= 30);
  const completedWeeks = personalProgress.filter(p => p.completionPercentage >= 100).length;
  const totalWeeks = 30;
  const completionPercentage = Math.round((completedWeeks / totalWeeks) * 100);

  // Calculate current streak
  let currentStreak = 0;
  for (let i = 1; i <= totalWeeks; i++) {
    const week = personalProgress.find(p => p.weekNumber === i);
    if (week && week.completionPercentage >= 100) {
      currentStreak++;
    } else {
      break;
    }
  }

  // Monthly breakdown
  const monthlyData = [
    { month: "Month 1", weeks: 4, completed: personalProgress.filter(p => p.weekNumber <= 4 && p.completionPercentage >= 100).length },
    { month: "Month 2", weeks: 4, completed: personalProgress.filter(p => p.weekNumber > 4 && p.weekNumber <= 8 && p.completionPercentage >= 100).length },
    { month: "Month 3", weeks: 4, completed: personalProgress.filter(p => p.weekNumber > 8 && p.weekNumber <= 12 && p.completionPercentage >= 100).length },
    { month: "Month 4", weeks: 4, completed: personalProgress.filter(p => p.weekNumber > 12 && p.weekNumber <= 16 && p.completionPercentage >= 100).length },
    { month: "Month 5", weeks: 4, completed: personalProgress.filter(p => p.weekNumber > 16 && p.weekNumber <= 20 && p.completionPercentage >= 100).length },
    { month: "Month 6", weeks: 4, completed: personalProgress.filter(p => p.weekNumber > 20 && p.weekNumber <= 24 && p.completionPercentage >= 100).length },
  ];

  // Week-by-week grid
  const weekGridData = Array.from({ length: totalWeeks }, (_, i) => {
    const week = i + 1;
    const progress = personalProgress.find(p => p.weekNumber === week);
    return {
      week,
      completed: progress ? progress.completionPercentage >= 100 : false,
    };
  });

  // Calculate combined Personal Brand metrics
  const totalFollowers = personalBrandMetrics.instagram.followers + personalBrandMetrics.youtube.followers + personalBrandMetrics.tiktok.followers;
  const avgEngagement = (personalBrandMetrics.instagram.engagement + personalBrandMetrics.youtube.engagement + personalBrandMetrics.tiktok.engagement) / 3;
  const totalViews = personalBrandMetrics.instagram.views + personalBrandMetrics.youtube.views + personalBrandMetrics.tiktok.views;

  // Calculate estimated revenue
  const estimatedRevenue = clothingMetrics.ordersPerMonth * 50; // Assuming ~$50 per order

  const saveMetrics = trpc.roadmap.updateWeekProgress.useMutation();

  const handleSavePersonalBrandMetrics = async () => {
    setSavingMetrics(true);
    try {
      // Save metrics (extend schema as needed)
      await saveMetrics.mutateAsync({
        weekNumber: 25,
        tasksCompleted: totalFollowers,
        totalTasks: 10000,
      });
      alert("Personal Brand metrics saved!");
    } finally {
      setSavingMetrics(false);
    }
  };

  const handleSaveClothingMetrics = async () => {
    setSavingMetrics(true);
    try {
      await saveMetrics.mutateAsync({
        weekNumber: 25,
        tasksCompleted: clothingMetrics.ordersPerMonth,
        totalTasks: 100,
      });
      alert("Clothing Business metrics saved!");
    } finally {
      setSavingMetrics(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <TrendingUp className="w-8 h-8 text-purple-500" />
            Personal + Business Progress Analytics
          </h1>
          <p className="text-muted-foreground mt-2">
            Track your learning progress and personal brand + business growth metrics.
          </p>
        </div>
        <Button onClick={() => setMetricsModalOpen(true)} className="mt-2">
          Add Historical Data
        </Button>
      </div>

      {/* Learning Progress Cards */}
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
              {completedWeeks <= 4 ? "Psychology" : completedWeeks <= 8 ? "Storytelling" : completedWeeks <= 12 ? "Content" : completedWeeks <= 24 ? "Community" : "Growth"}
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
                className="bg-purple-500 h-2 rounded-full transition-all"
                style={{ width: `${completionPercentage}%` }}
              ></div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Personal Brand & Business Metrics Tabs */}
      <Tabs defaultValue="personal-brand" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="personal-brand">Personal Brand (Rubeena)</TabsTrigger>
          <TabsTrigger value="clothing-business">Clothing Business</TabsTrigger>
        </TabsList>

        {/* Personal Brand Tab */}
        <TabsContent value="personal-brand" className="space-y-6">
          {/* Combined Metrics */}
          <Card className="border-purple-200 bg-gradient-to-r from-purple-50 to-transparent">
            <CardHeader>
              <CardTitle>Personal Brand Overview (Rubeena)</CardTitle>
              <CardDescription>Combined metrics across all platforms</CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-white rounded-lg border">
                <p className="text-sm text-muted-foreground mb-1">Total Followers</p>
                <p className="text-3xl font-bold">{totalFollowers.toLocaleString()}</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <p className="text-sm text-muted-foreground mb-1">Avg Engagement Rate</p>
                <p className="text-3xl font-bold">{avgEngagement.toFixed(1)}%</p>
              </div>
              <div className="p-4 bg-white rounded-lg border">
                <p className="text-sm text-muted-foreground mb-1">Total Views</p>
                <p className="text-3xl font-bold">{totalViews.toLocaleString()}</p>
              </div>
            </CardContent>
          </Card>

          {/* Platform-Specific Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Instagram */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Instagram className="w-5 h-5 text-pink-500" />
                  Instagram
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Followers</label>
                  <Input
                    type="number"
                    value={personalBrandMetrics.instagram.followers}
                    onChange={(e) => setPersonalBrandMetrics(prev => ({
                      ...prev,
                      instagram: { ...prev.instagram, followers: parseInt(e.target.value) || 0 }
                    }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Engagement Rate (%)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={personalBrandMetrics.instagram.engagement}
                    onChange={(e) => setPersonalBrandMetrics(prev => ({
                      ...prev,
                      instagram: { ...prev.instagram, engagement: parseFloat(e.target.value) || 0 }
                    }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Views</label>
                  <Input
                    type="number"
                    value={personalBrandMetrics.instagram.views}
                    onChange={(e) => setPersonalBrandMetrics(prev => ({
                      ...prev,
                      instagram: { ...prev.instagram, views: parseInt(e.target.value) || 0 }
                    }))}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* YouTube */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Youtube className="w-5 h-5 text-red-500" />
                  YouTube
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Followers</label>
                  <Input
                    type="number"
                    value={personalBrandMetrics.youtube.followers}
                    onChange={(e) => setPersonalBrandMetrics(prev => ({
                      ...prev,
                      youtube: { ...prev.youtube, followers: parseInt(e.target.value) || 0 }
                    }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Engagement Rate (%)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={personalBrandMetrics.youtube.engagement}
                    onChange={(e) => setPersonalBrandMetrics(prev => ({
                      ...prev,
                      youtube: { ...prev.youtube, engagement: parseFloat(e.target.value) || 0 }
                    }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Views</label>
                  <Input
                    type="number"
                    value={personalBrandMetrics.youtube.views}
                    onChange={(e) => setPersonalBrandMetrics(prev => ({
                      ...prev,
                      youtube: { ...prev.youtube, views: parseInt(e.target.value) || 0 }
                    }))}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            {/* TikTok */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Music className="w-5 h-5 text-black" />
                  TikTok
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Followers</label>
                  <Input
                    type="number"
                    value={personalBrandMetrics.tiktok.followers}
                    onChange={(e) => setPersonalBrandMetrics(prev => ({
                      ...prev,
                      tiktok: { ...prev.tiktok, followers: parseInt(e.target.value) || 0 }
                    }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Engagement Rate (%)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={personalBrandMetrics.tiktok.engagement}
                    onChange={(e) => setPersonalBrandMetrics(prev => ({
                      ...prev,
                      tiktok: { ...prev.tiktok, engagement: parseFloat(e.target.value) || 0 }
                    }))}
                    className="mt-1"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Views</label>
                  <Input
                    type="number"
                    value={personalBrandMetrics.tiktok.views}
                    onChange={(e) => setPersonalBrandMetrics(prev => ({
                      ...prev,
                      tiktok: { ...prev.tiktok, views: parseInt(e.target.value) || 0 }
                    }))}
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          <Button onClick={handleSavePersonalBrandMetrics} disabled={savingMetrics} size="lg" className="w-full">
            {savingMetrics ? "Saving..." : "Save Personal Brand Metrics"}
          </Button>
        </TabsContent>

        {/* Clothing Business Tab */}
        <TabsContent value="clothing-business" className="space-y-6">
          <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-transparent">
            <CardHeader>
              <CardTitle>Clothing Business Metrics</CardTitle>
              <CardDescription>Track your business performance</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="p-4 bg-white rounded-lg border">
                  <p className="text-sm text-muted-foreground mb-1">Orders/Month</p>
                  <p className="text-3xl font-bold">{clothingMetrics.ordersPerMonth}</p>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <p className="text-sm text-muted-foreground mb-1">Conversion Rate</p>
                  <p className="text-3xl font-bold">{clothingMetrics.conversionRate.toFixed(2)}%</p>
                </div>
                <div className="p-4 bg-white rounded-lg border">
                  <p className="text-sm text-muted-foreground mb-1">Est. Revenue/Month</p>
                  <p className="text-3xl font-bold">${estimatedRevenue.toLocaleString()}</p>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Orders per Month</label>
                  <Input
                    type="number"
                    value={clothingMetrics.ordersPerMonth}
                    onChange={(e) => setClothingMetrics(prev => ({
                      ...prev,
                      ordersPerMonth: parseInt(e.target.value) || 0
                    }))}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">Total orders you're getting per month</p>
                </div>

                <div>
                  <label className="text-sm font-medium">Conversion Rate (%)</label>
                  <Input
                    type="number"
                    step="0.1"
                    value={clothingMetrics.conversionRate}
                    onChange={(e) => setClothingMetrics(prev => ({
                      ...prev,
                      conversionRate: parseFloat(e.target.value) || 0
                    }))}
                    className="mt-1"
                  />
                  <p className="text-xs text-muted-foreground mt-1">% of visitors who become customers</p>
                </div>
              </div>

              <Button onClick={handleSaveClothingMetrics} disabled={savingMetrics} size="lg" className="w-full">
                {savingMetrics ? "Saving..." : "Save Clothing Business Metrics"}
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Monthly Progress */}
      <Card>
        <CardHeader>
          <CardTitle>Monthly Learning Progress</CardTitle>
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
              <Bar dataKey="completed" fill="#a855f7" name="Completed" />
              <Bar dataKey="weeks" fill="#e5e7eb" name="Total" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Week-by-Week Grid */}
      <Card>
        <CardHeader>
          <CardTitle>Week-by-Week Completion Status</CardTitle>
          <CardDescription>Your progress across all 30 weeks</CardDescription>
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

      <MetricsInputModal
        open={metricsModalOpen}
        onOpenChange={setMetricsModalOpen}
        onSuccess={() => {
          // Refresh metrics data
          window.location.reload();
        }}
      />
    </div>
  );
}

export default function ProgressAnalyticsPersonal() {
  return (
    <DashboardLayout>
      <ProgressAnalyticsPersonalContent />
    </DashboardLayout>
  );
}
