import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";

export default function QuizResults() {
  const { user } = useAuth();
  const [activeTrack, setActiveTrack] = useState<'ai-cro' | 'personal-brand' | 'business'>('ai-cro');

  const { data: aiCroResults } = trpc.quiz.getResultsByTrack.useQuery({ track: 'ai-cro' });
  const { data: personalResults } = trpc.quiz.getResultsByTrack.useQuery({ track: 'personal-brand' });
  const { data: businessResults } = trpc.quiz.getResultsByTrack.useQuery({ track: 'business' });

  const { data: aiCroAnalytics } = trpc.quiz.getAnalytics.useQuery({ track: 'ai-cro' });
  const { data: personalAnalytics } = trpc.quiz.getAnalytics.useQuery({ track: 'personal-brand' });
  const { data: businessAnalytics } = trpc.quiz.getAnalytics.useQuery({ track: 'business' });

  const getResultsForTrack = () => {
    switch (activeTrack) {
      case 'personal-brand':
        return personalResults || [];
      case 'business':
        return businessResults || [];
      default:
        return aiCroResults || [];
    }
  };

  const getAnalyticsForTrack = () => {
    switch (activeTrack) {
      case 'personal-brand':
        return personalAnalytics;
      case 'business':
        return businessAnalytics;
      default:
        return aiCroAnalytics;
    }
  };

  const results = getResultsForTrack();
  const analytics = getAnalyticsForTrack();

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold text-foreground">Quiz Results & Analytics</h1>
          <p className="text-muted-foreground mt-2">Track your quiz performance and learning progress</p>
        </div>

        {/* Track Tabs */}
        <Tabs value={activeTrack} onValueChange={(value) => setActiveTrack(value as any)} className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="ai-cro">AI + CRO</TabsTrigger>
            <TabsTrigger value="personal-brand">Personal Brand</TabsTrigger>
            <TabsTrigger value="business">Business</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTrack} className="space-y-6 mt-6">
            {/* Analytics Summary Cards */}
            {analytics && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Total Attempts</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.totalAttempts}</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Average Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.averageScore}%</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Best Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">{analytics.bestScore}%</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Latest Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analytics.latestScore}%</div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">Improvement</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className={`text-2xl font-bold ${analytics.improvementTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {analytics.improvementTrend >= 0 ? '+' : ''}{analytics.improvementTrend}%
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}

            {/* Recent Results Table */}
            {results.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Recent Quiz Attempts</CardTitle>
                  <CardDescription>Your latest quiz results and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 px-4">Week</th>
                          <th className="text-left py-2 px-4">Score</th>
                          <th className="text-left py-2 px-4">Correct/Total</th>
                          <th className="text-left py-2 px-4">Time Spent</th>
                          <th className="text-left py-2 px-4">Attempt</th>
                          <th className="text-left py-2 px-4">Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {results.map((result: any) => (
                          <tr key={result.id} className="border-b hover:bg-muted/50">
                            <td className="py-2 px-4">Week {result.weekNumber}</td>
                            <td className="py-2 px-4">
                              <Badge variant={result.scorePercentage >= 80 ? 'default' : result.scorePercentage >= 60 ? 'secondary' : 'destructive'}>
                                {result.scorePercentage}%
                              </Badge>
                            </td>
                            <td className="py-2 px-4">{result.questionsCorrect}/{result.questionsAsked}</td>
                            <td className="py-2 px-4">{Math.round(result.timeSpentSeconds / 60)} min</td>
                            <td className="py-2 px-4">#{result.attemptNumber}</td>
                            <td className="py-2 px-4">{new Date(result.createdAt).toLocaleDateString()}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Empty State */}
            {results.length === 0 && (
              <Card>
                <CardContent className="py-12">
                  <div className="text-center">
                    <p className="text-muted-foreground">No quiz results yet for this track.</p>
                    <p className="text-sm text-muted-foreground mt-2">Complete quizzes to see your performance analytics here.</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}
