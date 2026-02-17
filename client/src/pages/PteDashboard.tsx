import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { trpc } from "@/lib/trpc";
import { Pen, Mic, TrendingUp, Zap } from "lucide-react";
import { useLocation } from "wouter";

export default function PteDashboard() {
  const { user, isAuthenticated } = useAuth();
  const [, setLocation] = useLocation();
  const { data: progress } = trpc.pte.getProgress.useQuery({});
  const { data: mockTests } = trpc.pte.getMockTests.useQuery();

  if (!isAuthenticated) {
    return <div>Loading...</div>;
  }

  // Calculate stats for Writing & Speaking only
  const writingProgress = progress?.find(p => p.section === "writing");
  const speakingProgress = progress?.find(p => p.section === "speaking");

  const overallScore = progress && progress.length > 0
    ? Math.round(
        progress.reduce((sum, p) => sum + parseFloat(p.averageScore || "0"), 0) / progress.length
      )
    : 0;

  const totalQuestionsAttempted = progress?.reduce((sum, p) => sum + p.totalQuestions, 0) || 0;
  const totalCorrect = progress?.reduce((sum, p) => sum + p.correctAnswers, 0) || 0;
  const overallAccuracy = totalQuestionsAttempted > 0 
    ? Math.round((totalCorrect / totalQuestionsAttempted) * 100)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 mb-2">PTE Writing & Speaking Coach</h1>
          <p className="text-lg text-slate-600">Welcome back, {user?.name}! Get detailed AI feedback on your essays and speeches</p>
          <p className="text-sm text-slate-500 mt-2">💡 Use ApeUni for Reading & Listening practice. This platform provides expert feedback for Writing & Speaking.</p>
        </div>

        {/* Overall Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Average Score</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-blue-600">{overallScore}</div>
              <p className="text-xs text-slate-500 mt-1">Out of 90</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Submissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-purple-600">{totalQuestionsAttempted}</div>
              <p className="text-xs text-slate-500 mt-1">Total attempts</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium text-slate-600">Feedback Received</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-600">{totalQuestionsAttempted}</div>
              <p className="text-xs text-slate-500 mt-1">AI-powered reviews</p>
            </CardContent>
          </Card>
        </div>

        {/* Section Progress */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Your Sections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Writing */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-green-200" onClick={() => setLocation("/pte/writing")}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Writing</CardTitle>
                  <Pen className="w-5 h-5 text-green-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">{writingProgress?.averageScore || "0"}</div>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${writingProgress?.completionPercentage || 0}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">{writingProgress?.totalQuestions || 0} submissions</p>
                <p className="text-xs text-slate-600 mt-1">Essays & Summaries with AI feedback</p>
              </CardContent>
            </Card>

            {/* Speaking */}
            <Card className="cursor-pointer hover:shadow-lg transition-shadow border-2 border-purple-200" onClick={() => setLocation("/pte/speaking")}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">Speaking</CardTitle>
                  <Mic className="w-5 h-5 text-purple-600" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-purple-600">{speakingProgress?.averageScore || "0"}</div>
                <div className="w-full bg-slate-200 rounded-full h-2 mt-3">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${speakingProgress?.completionPercentage || 0}%` }}
                  ></div>
                </div>
                <p className="text-xs text-slate-500 mt-2">{speakingProgress?.totalQuestions || 0} submissions</p>
                <p className="text-xs text-slate-600 mt-1">Speeches with fluency & pronunciation feedback</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-orange-600" />
                Start Practicing
              </CardTitle>
              <CardDescription>Get instant AI feedback on your writing and speaking</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={() => setLocation("/pte/writing")} className="w-full bg-green-600 hover:bg-green-700">
                <Pen className="w-4 h-4 mr-2" />
                Writing Practice
              </Button>
              <Button onClick={() => setLocation("/pte/speaking")} className="w-full bg-purple-600 hover:bg-purple-700">
                <Mic className="w-4 h-4 mr-2" />
                Speaking Practice (Coming Soon)
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                What You Get
              </CardTitle>
              <CardDescription>Detailed feedback on every submission</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>PTE Score (0-90):</strong> Your estimated band score</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Detailed Analysis:</strong> Grammar, vocabulary, structure</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Improvement Tips:</strong> Specific suggestions to improve</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 font-bold">✓</span>
                <span><strong>Progress Tracking:</strong> See your improvement over time</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Info Section */}
        <Card className="mt-6 bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-blue-900">How to Use This Platform</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-blue-900 space-y-2">
            <p><strong>1. Writing:</strong> Submit your essays or summaries. Get AI-powered feedback on grammar, vocabulary, structure, and task achievement.</p>
            <p><strong>2. Speaking:</strong> Record your speech responses. Get feedback on fluency, pronunciation, vocabulary, and coherence.</p>
            <p><strong>3. Reading & Listening:</strong> Use ApeUni for these sections - they don't provide feedback, so focus your efforts there.</p>
            <p><strong>4. Track Progress:</strong> Monitor your scores and improvement across both sections.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
