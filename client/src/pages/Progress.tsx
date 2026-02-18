import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { roadmapData } from "@shared/roadmapData";
import { personalRoadmapData } from "@shared/personalRoadmapData";
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { CheckCircle2, AlertCircle, Clock } from "lucide-react";

export default function Progress() {
  const { user } = useAuth();
  const { data: allProgress } = trpc.roadmap.getAllProgress.useQuery();

  // Prepare data for Professional track (weeks 1-24)
  const professionalWeeklyData = roadmapData.map(week => {
    const progress = allProgress?.find(p => p.weekNumber === week.weekNumber);
    return {
      week: `W${week.weekNumber}`,
      completion: progress?.completionPercentage || 0,
      month: week.month,
      phase: week.phase,
    };
  });

  // Prepare data for Personal track (weeks 1-30)
  const personalWeeklyData = personalRoadmapData.map(week => {
    const progress = allProgress?.find(p => p.weekNumber === week.weekNumber);
    return {
      week: `W${week.weekNumber}`,
      completion: progress?.completionPercentage || 0,
      month: week.month,
      phase: week.phase,
    };
  });

  // Calculate stats for Professional track
  const professionalProgress = allProgress?.slice(0, 24) || [];
  const professionalCompletedWeeks = professionalProgress.filter(w => w.completionPercentage === 100).length;
  const professionalInProgressWeeks = professionalProgress.filter(w => w.completionPercentage > 0 && w.completionPercentage < 100).length;
  const professionalNotStartedWeeks = professionalProgress.filter(w => w.completionPercentage === 0).length;
  const professionalOverallCompletion = professionalProgress.length > 0 ? Math.round(professionalProgress.reduce((sum, w) => sum + w.completionPercentage, 0) / professionalProgress.length) : 0;

  // Calculate stats for Personal track
  const personalProgress = allProgress?.slice(24) || [];
  const personalCompletedWeeks = personalProgress.filter(w => w.completionPercentage === 100).length;
  const personalInProgressWeeks = personalProgress.filter(w => w.completionPercentage > 0 && w.completionPercentage < 100).length;
  const personalNotStartedWeeks = personalProgress.filter(w => w.completionPercentage === 0).length;
  const personalOverallCompletion = personalProgress.length > 0 ? Math.round(personalProgress.reduce((sum, w) => sum + w.completionPercentage, 0) / personalProgress.length) : 0;

  const professionalStatusData = [
    { name: "Completed", value: professionalCompletedWeeks, color: "#10b981" },
    { name: "In Progress", value: professionalInProgressWeeks, color: "#3b82f6" },
    { name: "Not Started", value: professionalNotStartedWeeks, color: "#e5e7eb" },
  ];

  const personalStatusData = [
    { name: "Completed", value: personalCompletedWeeks, color: "#10b981" },
    { name: "In Progress", value: personalInProgressWeeks, color: "#3b82f6" },
    { name: "Not Started", value: personalNotStartedWeeks, color: "#e5e7eb" },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Overall Progress</h1>
          <p className="text-muted-foreground mt-2">Track your learning journey across both Professional and Personal tracks</p>
        </div>

        {/* Professional Track Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">AI+CRO (Professional)</h2>
          
          {/* Professional Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-600" /> Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{professionalCompletedWeeks}</div>
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
                <div className="text-3xl font-bold text-blue-600">{professionalInProgressWeeks}</div>
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
                <div className="text-3xl font-bold text-gray-600">{professionalNotStartedWeeks}</div>
                <p className="text-xs text-muted-foreground mt-2">upcoming weeks</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Overall</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{professionalOverallCompletion}%</div>
                <p className="text-xs text-muted-foreground mt-2">completion rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Professional Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Completion Rate</CardTitle>
                <CardDescription>Progress across 24 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={professionalWeeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="completion" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
                <CardDescription>Weeks by completion status</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={professionalStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {professionalStatusData.map((entry, index) => (
                        <Cell key={`prof-cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Professional Week Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Week Breakdown</CardTitle>
              <CardDescription>Completion status for each week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {professionalWeeklyData.map((week, index) => (
                  <div key={`prof-week-${index}`} className="flex items-center justify-between p-3 rounded-lg border border-border">
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

        {/* Personal Track Section */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-foreground">Personal + Business</h2>
          
          {/* Personal Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-green-600" /> Completed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-green-600">{personalCompletedWeeks}</div>
                <p className="text-xs text-muted-foreground mt-2">of 30 weeks</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <Clock size={16} className="text-blue-600" /> In Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-blue-600">{personalInProgressWeeks}</div>
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
                <div className="text-3xl font-bold text-gray-600">{personalNotStartedWeeks}</div>
                <p className="text-xs text-muted-foreground mt-2">upcoming weeks</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-muted-foreground">Overall</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-foreground">{personalOverallCompletion}%</div>
                <p className="text-xs text-muted-foreground mt-2">completion rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Personal Charts */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Weekly Completion Rate</CardTitle>
                <CardDescription>Progress across 30 weeks</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={personalWeeklyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Bar dataKey="completion" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Status Distribution</CardTitle>
                <CardDescription>Weeks by completion status</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={personalStatusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, value }) => `${name}: ${value}`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {personalStatusData.map((entry, index) => (
                        <Cell key={`pers-cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Personal Week Breakdown */}
          <Card>
            <CardHeader>
              <CardTitle>Week Breakdown</CardTitle>
              <CardDescription>Completion status for each week</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {personalWeeklyData.map((week, index) => (
                  <div key={`pers-week-${index}`} className="flex items-center justify-between p-3 rounded-lg border border-border">
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
      </div>
    </DashboardLayout>
  );
}
