import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/_core/hooks/useAuth";
import { getLoginUrl } from "@/const";
import { BookOpen, Pen, ArrowRight } from "lucide-react";
import { useLocation } from "wouter";

export default function Home() {
  const { user, loading } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin">Loading...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center gap-8 p-8 max-w-md w-full">
          <div className="flex flex-col items-center gap-6">
            <h1 className="text-3xl font-bold tracking-tight text-center">
              Learning Trackers
            </h1>
            <p className="text-sm text-muted-foreground text-center max-w-sm">
              Choose your learning path and start tracking your progress today.
            </p>
          </div>
          <Button
            onClick={() => {
              window.location.href = getLoginUrl();
            }}
            size="lg"
            className="w-full shadow-lg hover:shadow-xl transition-all"
          >
            Sign in to continue
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold tracking-tight mb-2">
            Welcome back, {user.name}!
          </h1>
          <p className="text-lg text-muted-foreground">
            Choose a tracker to continue your learning journey
          </p>
        </div>

        {/* Tracker Selection Cards */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* AI+CRO Tracker */}
          <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-blue-500">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <BookOpen className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <CardTitle>AI + CRO Learning</CardTitle>
                  <CardDescription>6-Month Career Upskilling</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Master AI and Conversion Rate Optimization with a structured 24-week roadmap.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>24-week psychology-first roadmap</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Daily check-ins & streak tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Interactive quizzes for each task</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-blue-600">✓</span>
                  <span>Portfolio project tracking</span>
                </li>
              </ul>
              <Button 
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                onClick={() => setLocation("/dashboard")}
              >
                Start Learning <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>

          {/* PTE Tracker */}
          <Card className="hover:shadow-lg transition-all cursor-pointer border-2 hover:border-green-500">
            <CardHeader className="pb-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Pen className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <CardTitle>PTE Exam Prep</CardTitle>
                  <CardDescription>Writing & Speaking Coach</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Prepare for your PTE exam with AI-powered essay grading and speaking feedback.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>AI-powered essay grading</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>PTE scoring (0-90 band)</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Detailed feedback & improvements</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-green-600">✓</span>
                  <span>Daily practice tracking</span>
                </li>
              </ul>
              <Button 
                className="w-full mt-4 bg-green-600 hover:bg-green-700"
                onClick={() => setLocation("/pte")}
              >
                Start Practicing <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
