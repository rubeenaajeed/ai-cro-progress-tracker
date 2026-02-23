import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, BookOpen, TrendingUp, Zap, Users, Target, Calendar, Award } from "lucide-react";
import { useLocation } from "wouter";
import DashboardLayout from "@/components/DashboardLayout";

export default function Overview() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  const features = [
    {
      icon: <BookOpen className="w-6 h-6" />,
      title: "Structured Learning Paths",
      description: "24-week AI+CRO track and 30-week Personal+Business track with psychology-first approach"
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Progress Analytics",
      description: "Real-time metrics tracking across all three programs with trend visualization"
    },
    {
      icon: <Zap className="w-6 h-6" />,
      title: "Interactive Quizzes",
      description: "LLM-powered quizzes with instant feedback and performance analytics"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Achievement Badges",
      description: "Earn badges for completing phases and milestones"
    },
    {
      icon: <Target className="w-6 h-6" />,
      title: "Smart Recommendations",
      description: "Get recommended next weeks based on priority and difficulty"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Resource Library",
      description: "Curated resources with search, filters, and bookmarking"
    }
  ];

  const aiCroPhases = [
    { name: "Foundations", weeks: "1-4", focus: "Consumer Psychology & Behavioral Economics" },
    { name: "Content & CRO", weeks: "5-12", focus: "Content Strategy & Conversion Optimization" },
    { name: "Analytics", weeks: "13-20", focus: "Data Analysis & Performance Metrics" },
    { name: "Portfolio", weeks: "21-24", focus: "Real-world Projects & Case Studies" }
  ];

  const personalBusinessPhases = [
    { name: "Psychology", weeks: "1-4", focus: "Personal Brand Psychology & Positioning" },
    { name: "Content", weeks: "5-12", focus: "Content Creation & Distribution" },
    { name: "Growth", weeks: "13-24", focus: "Audience Growth & Engagement" },
    { name: "Monetization", weeks: "25-30", focus: "Business Models & Revenue Streams" }
  ];

  const timeline = [
    { phase: "Week 1-4", milestone: "Foundation Complete", description: "Master core concepts and psychology principles" },
    { phase: "Week 5-8", milestone: "First Skills Acquired", description: "Apply learning to real-world scenarios" },
    { phase: "Week 9-12", milestone: "Mid-Point Review", description: "Assess progress and adjust strategy" },
    { phase: "Week 13-16", milestone: "Advanced Topics", description: "Dive into analytics and optimization" },
    { phase: "Week 17-20", milestone: "Portfolio Building", description: "Create case studies and projects" },
    { phase: "Week 21-24", milestone: "Mastery Achieved", description: "Complete capstone projects and earn badges" }
  ];

  const content = (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">AI + CRO Learning Progress Tracker</h1>
          <p className="text-xl text-muted-foreground mb-6">
            Master AI, CRO, Personal Branding, and Business Growth through structured learning and real-time progress tracking
          </p>
          {user ? (
            <Button onClick={() => navigate("/dashboard")} size="lg">
              Go to Dashboard
            </Button>
          ) : (
            <Button onClick={() => navigate("/")} size="lg">
              Get Started
            </Button>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-center gap-3">
                    <div className="text-blue-600 dark:text-blue-400">{feature.icon}</div>
                    <CardTitle className="text-lg">{feature.title}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Tracks Section */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Learning Tracks</h2>
          <Tabs defaultValue="ai-cro" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2">
              <TabsTrigger value="ai-cro">AI + CRO (24 weeks)</TabsTrigger>
              <TabsTrigger value="personal-business">Personal + Business (30 weeks)</TabsTrigger>
            </TabsList>

            <TabsContent value="ai-cro" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Track Overview</CardTitle>
                    <CardDescription>Master AI and Conversion Rate Optimization</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Duration</h4>
                      <p className="text-muted-foreground">24 weeks (~6 months)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Topics Covered</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Consumer Psychology</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Content Strategy</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> CRO Fundamentals</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> AI & LLM Applications</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Analytics & Data</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Phases</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {aiCroPhases.map((phase, idx) => (
                      <div key={idx} className="border-l-4 border-blue-500 pl-3">
                        <h4 className="font-semibold">{phase.name}</h4>
                        <p className="text-sm text-muted-foreground">Weeks {phase.weeks}</p>
                        <p className="text-sm text-muted-foreground">{phase.focus}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="personal-business" className="mt-8">
              <div className="grid md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Track Overview</CardTitle>
                    <CardDescription>Build Personal Brand & Business</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Duration</h4>
                      <p className="text-muted-foreground">30 weeks (~7.5 months)</p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Topics Covered</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Personal Branding</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Content Creation</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Social Media Growth</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Business Fundamentals</li>
                        <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Monetization Strategies</li>
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Phases</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    {personalBusinessPhases.map((phase, idx) => (
                      <div key={idx} className="border-l-4 border-purple-500 pl-3">
                        <h4 className="font-semibold">{phase.name}</h4>
                        <p className="text-sm text-muted-foreground">Weeks {phase.weeks}</p>
                        <p className="text-sm text-muted-foreground">{phase.focus}</p>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Learning Timeline & Milestones</h2>
          <div className="space-y-6">
            {timeline.map((item, idx) => (
              <Card key={idx}>
                <CardHeader>
                  <div className="flex items-start gap-4">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-10 w-10 rounded-full bg-blue-600 text-white">
                        <Calendar className="w-5 h-5" />
                      </div>
                    </div>
                    <div className="flex-grow">
                      <CardTitle className="text-lg">{item.milestone}</CardTitle>
                      <CardDescription>{item.phase}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Getting Started Section */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">How to Get Started</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
                    1
                  </div>
                  <CardTitle>Sign In</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Log in with your Manus account to access your personalized dashboard
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
                    2
                  </div>
                  <CardTitle>Choose Your Track</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Select between AI+CRO (24 weeks) or Personal+Business (30 weeks) learning path
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-600 text-white font-bold">
                    3
                  </div>
                  <CardTitle>Start Learning</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Follow the weekly roadmap, complete tasks, track progress, and earn badges
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Learning?</h2>
          <p className="text-lg mb-8 opacity-90">
            Join thousands of learners mastering AI, CRO, and business growth
          </p>
          {user ? (
            <Button 
              onClick={() => navigate("/dashboard")} 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Go to Dashboard
            </Button>
          ) : (
            <Button 
              onClick={() => navigate("/")} 
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100"
            >
              Get Started Now
            </Button>
          )}
        </div>
      </section>
    </div>
  );

  if (!user) {
    return null;
  }

  return (
    <DashboardLayout>
      {content}
    </DashboardLayout>
  );
}
