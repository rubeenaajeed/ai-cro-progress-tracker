import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { roadmapData } from "@shared/roadmapData";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

export default function Progress() {
  const { user } = useAuth();
  const { data: allProgress } = trpc.roadmap.getAllProgress.useQuery();

  // Prepare data for visualizations
  const weeklyData = roadmapData.map(week => {
    const progress = allProgress?.find(p => p.weekNumber === week.weekNumber);
    return {
      week: `W${week.weekNumber}`,
      completion: progress?.completionPercentage || 0,
      month: week.month,
      phase: week.phase,
    };
  });

  const monthlyData = [
    { month: "Month 1", avgCompletion: 0 },
    { month: "Month 2", avgCompletion: 0 },
    { month: "Month 3", avgCompletion: 0 },
    { month: "Month 4", avgCompletion: 0 },
    { month: "Month 5", avgCompletion: 0 },
    { month: "Month 6", avgCompletion: 0 },
  ];

  weeklyData.forEach(week => {
    const monthIndex = week.month - 1;
    if (monthIndex >= 0 && monthIndex < 6) {
      monthlyData[monthIndex].avgCompletion += week.completion;
    }
  });

  monthlyData.forEach(month => {
    month.avgCompletion = Math.round(month.avgCompletion / 4);
  });

  const phaseData = [
    { name: "Foundations", value: 0, color: "#3b82f6" },
    { name: "Content & CRO", value: 0, color: "#8b5cf6" },
    { name: "Analytics & Automation", value: 0, color: "#10b981" },
    { name: "Portfolio", value: 0, color: "#f59e0b" },
    { name: "Positioning", value: 0, color: "#ec4899" },
  ];

  weeklyData.forEach(week => {
    const phaseIndex = phaseData.findIndex(p => p.name === week.phase);
    if (phaseIndex >= 0) {
      phaseData[phaseIndex].value += week.completion;
    }
  });

  phaseData.forEach(phase => {
    const weeksInPhase = weeklyData.filter(w => w.phase === phase.name).length;
    phase.value = weeksInPhase > 0 ? Math.round(phase.value / weeksInPhase) : 0;
  });

  // Calculate stats
  const completedWeeks = allProgress?.filter(w => w.completionPercentage === 100).length || 0;
  const inProgressWeeks = allProgress?.filter(w => w.completionPercentage > 0 && w.completionPercentage < 100).length || 0;
  const notStartedWeeks = allProgress?.filter(w => w.completionPercentage === 0).length || 0;
  const overallCompletion = allProgress ? Math.round(allProgress.reduce((sum, w) => sum + w.completionPercentage, 0) / allProgress.length) : 0;

  const statusData = [
    { name: "Completed", value: completedWeeks, color: "#10b981" },
    { name: "In Progress", value: inProgressWeeks, color: "#3b82f6" },
    { name: "Not Started", value: notStartedWeeks, color: "#e5e7eb" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Progress Analytics</h1>
          <p className="text-muted-foreground mt-2">Detailed insights into your learning progress</p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <CheckCircle2 size={16} className="text-green-600" /> Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{completedWeeks}</div>
              <p className="text-xs text-muted-foreground mt-2">of 24 weeks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Clock size={16} className="text-blue-600" /> In Progress
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{inProgressWeeks}</div>
              <p className="text-xs text-muted-foreground mt-2">actively learning</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <AlertCircle size={16} className="text-gray-600" /> Not Started
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-gray-600">{notStartedWeeks}</div>
              <p className="text-xs text-muted-foreground mt-2">upcoming weeks</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-muted-foreground">Overall</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-foreground">{overallCompletion}%</div>
              <p className="text-xs text-muted-foreground mt-2">completion rate</p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Weekly Progress */}
          <Card>
            <CardHeader>
              <CardTitle>Weekly Completion Rate</CardTitle>
              <CardDescription>Progress across all 24 weeks</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="week" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="completion" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Status Distribution */}
          <Card>
            <CardHeader>
              <CardTitle>Status Distribution</CardTitle>
              <CardDescription>Weeks by completion status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={statusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {statusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Monthly Trend */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Monthly Progress Trend</CardTitle>
              <CardDescription>Average completion rate per month</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="avgCompletion"
                    stroke="#3b82f6"
                    strokeWidth={2}
                    name="Average Completion %"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Phase Progress */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Progress by Phase</CardTitle>
              <CardDescription>Completion rate for each learning phase</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={phaseData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="value" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Week Breakdown */}
        <Card>
          <CardHeader>
            <CardTitle>Detailed Week Breakdown</CardTitle>
            <CardDescription>Completion status for each week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {weeklyData.map((week) => (
                <div key={week.week} className="flex items-center justify-between p-3 rounded-lg border border-border">
                  <div className="flex-1">
                    <p className="font-medium text-sm text-foreground">{week.week}</p>
                    <p className="text-xs text-muted-foreground">{week.phase}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 bg-gray-200 rounded-full h-2">
                      <div
                        className="bg-blue-600 h-2 rounded-full transition-all"
                        style={{ width: `${week.completion}%` }}
                      />
                    </div>
                    <span className="text-sm font-semibold text-foreground w-12 text-right">{week.completion}%</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
