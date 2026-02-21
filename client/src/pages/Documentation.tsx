import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen, BarChart3, Zap, Award, Search, Bookmark, TrendingUp, CheckCircle2, Flame, Target } from "lucide-react";
import { useLocation } from "wouter";

export default function Documentation() {
  const { user } = useAuth();
  const [, navigate] = useLocation();

  const features = [
    {
      icon: <BarChart3 className="w-6 h-6" />,
      name: "Unified Dashboard",
      where: "Main dashboard page",
      why: "Provides a single view of progress across all three learning programs (AI+CRO, Personal Brand, Business) so you can see your overall learning journey at a glance",
      uses: [
        "Track progress across multiple programs simultaneously",
        "Monitor current phase and completed weeks",
        "View streak count and learning consistency",
        "See metrics for each program side-by-side"
      ]
    },
    {
      icon: <Target className="w-6 h-6" />,
      name: "Recommended Next Week",
      where: "Dashboard and Roadmap pages",
      why: "Intelligently suggests the next high-priority week based on difficulty level and your progress, helping you focus on the most impactful learning",
      uses: [
        "Get personalized week recommendations",
        "Understand priority levels (High/Medium/Low)",
        "See difficulty indicators (Beginner/Intermediate/Advanced)",
        "Plan your learning week effectively"
      ]
    },
    {
      icon: <Search className="w-6 h-6" />,
      name: "Search Functionality",
      where: "Roadmap pages (AI+CRO and Personal+Business)",
      why: "Allows you to quickly find specific weeks, topics, or learning objectives without scrolling through the entire roadmap",
      uses: [
        "Search by week title or number",
        "Find topics by learning focus area",
        "Search objectives and goals",
        "Locate specific resources quickly"
      ]
    },
    {
      icon: <Zap className="w-6 h-6" />,
      name: "Resource Filters",
      where: "Roadmap pages",
      why: "Filters resources by type (Course, Article, Tool, Book) and difficulty level, so you can learn in your preferred format and at your comfort level",
      uses: [
        "Filter by resource type (Course, Article, Tool, Book)",
        "Filter by difficulty (Beginner, Intermediate, Advanced)",
        "Combine multiple filters",
        "Find resources matching your learning style"
      ]
    },
    {
      icon: <Bookmark className="w-6 h-6" />,
      name: "Bookmark/Favorites",
      where: "Roadmap pages",
      why: "Save your favorite resources for quick access later, creating a personalized learning library without losing important references",
      uses: [
        "Click bookmark icon on any resource to save",
        "View all bookmarked resources in dedicated card",
        "Access bookmarks from any roadmap page",
        "Remove bookmarks when no longer needed"
      ]
    },
    {
      icon: <TrendingUp className="w-6 h-6" />,
      name: "Progress Analytics",
      where: "Progress Analytics pages for each track",
      why: "Visualizes your learning metrics and trends over time, helping you identify patterns and optimize your learning strategy",
      uses: [
        "View monthly progress charts",
        "Track weekly completion trends",
        "Monitor metrics for Personal Brand (followers, engagement)",
        "Track Business metrics (orders, revenue)",
        "Add historical data to backfill progress"
      ]
    },
    {
      icon: <Award className="w-6 h-6" />,
      name: "Achievement Badges",
      where: "Dashboard",
      why: "Gamifies your learning journey by rewarding phase completion, keeping you motivated and providing visual proof of your progress",
      uses: [
        "Earn badges for completing phases",
        "View all earned badges on dashboard",
        "See badge descriptions and requirements",
        "Share achievements with others"
      ]
    },
    {
      icon: <CheckCircle2 className="w-6 h-6" />,
      name: "Weekly Roadmap",
      where: "Roadmap pages",
      why: "Breaks down your learning into manageable weekly chunks with clear objectives, resources, and mini-projects to keep you on track",
      uses: [
        "View week-by-week learning objectives",
        "Access curated resources for each week",
        "Complete weekly tasks and checkboxes",
        "Take notes on your learning",
        "Track mini-projects"
      ]
    },
    {
      icon: <Flame className="w-6 h-6" />,
      name: "Streak Tracking",
      where: "Streak page and Dashboard",
      why: "Maintains your learning consistency by tracking consecutive days of engagement, building momentum and accountability",
      uses: [
        "View current streak count",
        "See streak history",
        "Maintain daily learning habit",
        "Get motivation from streak milestones"
      ]
    }
  ];

  const userGuideSteps = [
    {
      section: "Getting Started",
      steps: [
        {
          title: "1. Sign In",
          description: "Log in with your Manus account. You'll be taken to the Dashboard automatically."
        },
        {
          title: "2. Explore the Dashboard",
          description: "The Dashboard shows your unified progress across all three programs. You can see track progress, completed weeks, current streak, and current phase."
        },
        {
          title: "3. Navigate Using the Sidebar",
          description: "Use the left sidebar to navigate between different sections. Click on 'Trackers' to expand and see AI+CRO and Personal+Business options."
        }
      ]
    },
    {
      section: "Using the Roadmap",
      steps: [
        {
          title: "1. Access Your Roadmap",
          description: "Click 'Trackers' → 'AI+CRO' or 'Personal+Business' → 'Learning Plan' to view your roadmap."
        },
        {
          title: "2. Search for Weeks",
          description: "Use the search bar at the top to find specific weeks by title, topic, or learning focus. Type keywords to filter results."
        },
        {
          title: "3. Apply Filters",
          description: "Click the 'Filters' button to filter by resource type (Course, Article, Tool, Book) or difficulty level (Beginner, Intermediate, Advanced)."
        },
        {
          title: "4. Bookmark Resources",
          description: "Click the bookmark icon on any resource to save it. Your bookmarked resources appear in the 'Bookmarked Resources' card at the top."
        },
        {
          title: "5. View Week Details",
          description: "Click on any week to see objectives, learning goals, resources, and mini-projects. Complete tasks by checking the checkboxes."
        }
      ]
    },
    {
      section: "Tracking Progress",
      steps: [
        {
          title: "1. View Dashboard Metrics",
          description: "The Dashboard shows track progress %, completed weeks, current streak, and current phase for each program."
        },
        {
          title: "2. Check Analytics",
          description: "Click on 'Progress Analytics' under your track to see detailed charts and trends for your learning metrics."
        },
        {
          title: "3. Add Historical Data",
          description: "In Progress Analytics, you can add past metrics to backfill your data. Click 'Add Past Data' to enter previous progress."
        },
        {
          title: "4. Monitor Trends",
          description: "View monthly progress charts and weekly trends to understand your learning patterns and optimize your strategy."
        }
      ]
    },
    {
      section: "Managing Bookmarks",
      steps: [
        {
          title: "1. Bookmark a Resource",
          description: "On any Roadmap page, click the bookmark icon next to a resource to save it."
        },
        {
          title: "2. View Bookmarks",
          description: "Scroll to the 'Bookmarked Resources' card at the top of the Roadmap page to see all your saved resources."
        },
        {
          title: "3. Access Bookmarked Resources",
          description: "Click on any bookmarked resource to open it. You can also remove bookmarks by clicking the trash icon."
        },
        {
          title: "4. Organize Your Learning",
          description: "Use bookmarks to create a personalized learning library of your favorite courses, articles, and tools."
        }
      ]
    },
    {
      section: "Using Filters & Search",
      steps: [
        {
          title: "1. Search by Keyword",
          description: "Use the search bar to find weeks by title, topic, or learning focus. Results update in real-time as you type."
        },
        {
          title: "2. Filter by Resource Type",
          description: "Click 'Filters' and select resource types (Course, Article, Tool, Book) to show only resources you prefer."
        },
        {
          title: "3. Filter by Difficulty",
          description: "In the Filters panel, select difficulty levels (Beginner, Intermediate, Advanced) to match your learning pace."
        },
        {
          title: "4. Combine Filters",
          description: "Use multiple filters together. For example, filter for 'Course' resources at 'Intermediate' difficulty level."
        },
        {
          title: "5. Clear Filters",
          description: "Click 'Clear Filters' to reset and see all resources again."
        }
      ]
    },
    {
      section: "Earning Badges",
      steps: [
        {
          title: "1. Complete Phases",
          description: "Earn badges by completing entire phases. For AI+CRO, complete 4 weeks per phase to earn phase badges."
        },
        {
          title: "2. View Badges",
          description: "Go to the Dashboard to see all your earned badges displayed in the 'Achievements' section."
        },
        {
          title: "3. Understand Badge Requirements",
          description: "Each badge has a description showing what you need to do to earn it. Hover over badges to see details."
        },
        {
          title: "4. Share Your Progress",
          description: "Badges are visible on your Dashboard, showing your learning achievements at a glance."
        }
      ]
    },
    {
      section: "Maintaining Your Streak",
      steps: [
        {
          title: "1. Check Your Streak",
          description: "View your current streak count on the Dashboard under 'Current Streak' for each program."
        },
        {
          title: "2. Keep Learning Daily",
          description: "Engage with the platform daily to maintain your streak. Complete tasks, view resources, or add notes."
        },
        {
          title: "3. View Streak History",
          description: "Click on 'Streak' in the sidebar to see your streak history and milestones."
        },
        {
          title: "4. Stay Motivated",
          description: "Use your streak as motivation to maintain consistent learning habits and build momentum."
        }
      ]
    },
    {
      section: "Tips & Best Practices",
      steps: [
        {
          title: "1. Start with Recommended Weeks",
          description: "Use the 'Recommended Next Week' feature to focus on high-priority, high-impact weeks first."
        },
        {
          title: "2. Use Bookmarks Strategically",
          description: "Bookmark resources you plan to use frequently or want to revisit later. This creates a personal learning library."
        },
        {
          title: "3. Filter by Your Learning Style",
          description: "If you prefer videos, filter for 'Course' resources. If you like reading, filter for 'Article' resources."
        },
        {
          title: "4. Track Metrics Regularly",
          description: "Check your Progress Analytics weekly to monitor trends and adjust your learning strategy as needed."
        },
        {
          title: "5. Maintain Daily Consistency",
          description: "Engage with the platform daily to build streaks and maintain momentum in your learning journey."
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <section className="border-b bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">User Manual & Documentation</h1>
          <p className="text-xl text-muted-foreground">
            Complete guide to all features and how to use them effectively
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full max-w-md grid-cols-2">
              <TabsTrigger value="features">Features Built</TabsTrigger>
              <TabsTrigger value="guide">User Guide</TabsTrigger>
            </TabsList>

            {/* Features Section */}
            <TabsContent value="features" className="mt-8">
              <div className="space-y-6">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Features Built & How to Use Them</h2>
                  <p className="text-muted-foreground mb-6">
                    Here's a comprehensive overview of all features we've built, where to use them, why we built them, and their practical applications.
                  </p>
                </div>

                <div className="grid gap-6">
                  {features.map((feature, idx) => (
                    <Card key={idx}>
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="text-blue-600 dark:text-blue-400 flex-shrink-0">{feature.icon}</div>
                          <div className="flex-grow">
                            <CardTitle className="text-xl">{feature.name}</CardTitle>
                            <CardDescription className="mt-2">
                              <strong>Where:</strong> {feature.where}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div>
                          <h4 className="font-semibold mb-2">Why We Built It</h4>
                          <p className="text-muted-foreground">{feature.why}</p>
                        </div>
                        <div>
                          <h4 className="font-semibold mb-2">How to Use It</h4>
                          <ul className="space-y-2">
                            {feature.uses.map((use, useIdx) => (
                              <li key={useIdx} className="flex items-start gap-2 text-muted-foreground">
                                <CheckCircle2 className="w-4 h-4 mt-1 flex-shrink-0 text-green-600" />
                                <span>{use}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            {/* User Guide Section */}
            <TabsContent value="guide" className="mt-8">
              <div className="space-y-8">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">Step-by-Step User Guide</h2>
                  <p className="text-muted-foreground mb-6">
                    Follow these sections to learn how to use each feature of the AI+CRO Progress Tracker.
                  </p>
                </div>

                {userGuideSteps.map((section, sectionIdx) => (
                  <Card key={sectionIdx}>
                    <CardHeader>
                      <CardTitle className="text-xl">{section.section}</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {section.steps.map((step, stepIdx) => (
                        <div key={stepIdx} className="border-l-4 border-blue-500 pl-4">
                          <h4 className="font-semibold mb-2">{step.title}</h4>
                          <p className="text-muted-foreground">{step.description}</p>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-slate-50 dark:bg-slate-900">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-12 text-center">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>How do I start using the tracker?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Simply sign in with your Manus account. You'll be taken to the Dashboard where you can see your progress across all three programs. Then navigate to the Roadmap to start learning.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Can I switch between different learning tracks?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Yes! Use the sidebar to navigate between AI+CRO and Personal+Business tracks. Each track has its own roadmap, progress analytics, and learning materials.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How do bookmarks work?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Click the bookmark icon on any resource to save it. Your bookmarked resources appear in the "Bookmarked Resources" card at the top of the Roadmap page. You can access them anytime and remove them when no longer needed.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What do the difficulty indicators mean?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  <strong>Beginner:</strong> Foundational concepts, great for starting out. <strong>Intermediate:</strong> Building on basics, requires some prior knowledge. <strong>Advanced:</strong> Complex topics, best after completing intermediate content.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>How can I track my progress?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Use the Dashboard to see overall progress, and visit Progress Analytics for detailed charts and trends. You can also add historical data to backfill your progress from previous weeks.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>What are achievement badges?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Badges are earned when you complete entire phases. They're displayed on your Dashboard as visual proof of your learning achievements and help keep you motivated.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Use this documentation as a reference while exploring the tracker. Don't hesitate to experiment with different features!
          </p>
          {user && (
            <Button onClick={() => navigate("/dashboard")} size="lg">
              Go to Dashboard
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}
