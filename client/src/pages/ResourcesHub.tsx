import { useAuth } from "@/_core/hooks/useAuth";
import DashboardLayout from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, BookOpen, Zap, BarChart3, Share2 } from "lucide-react";

interface Resource {
  title: string;
  description: string;
  url: string;
  category: "content-creation" | "analytics" | "email" | "ads" | "design" | "seo";
  phase: "phase1" | "phase2" | "both";
  icon: React.ReactNode;
}

const resources: Resource[] = [
  // Content Creation & Social Media
  {
    title: "Buffer",
    description: "Schedule and manage social media posts across Instagram, TikTok, LinkedIn, and more. Analytics included.",
    url: "https://buffer.com",
    category: "content-creation",
    phase: "phase2",
    icon: <Share2 size={20} />,
  },
  {
    title: "Canva",
    description: "Design beautiful graphics, videos, and content for social media without design skills.",
    url: "https://canva.com",
    category: "design",
    phase: "phase2",
    icon: <Zap size={20} />,
  },
  {
    title: "CapCut",
    description: "Free video editing tool perfect for TikTok and Instagram Reels. Easy to use with built-in effects.",
    url: "https://www.capcut.com",
    category: "content-creation",
    phase: "phase2",
    icon: <Share2 size={20} />,
  },
  {
    title: "Adobe Premiere Rush",
    description: "Professional video editing for content creators. Simpler than Premiere Pro but powerful.",
    url: "https://www.adobe.com/products/premiere/rush.html",
    category: "content-creation",
    phase: "phase2",
    icon: <Share2 size={20} />,
  },

  // Email Marketing
  {
    title: "Mailchimp",
    description: "Email marketing platform with free tier. Build email lists and send campaigns to your audience.",
    url: "https://mailchimp.com",
    category: "email",
    phase: "phase2",
    icon: <BookOpen size={20} />,
  },
  {
    title: "ConvertKit",
    description: "Email platform built for creators. Great for building audience and monetization.",
    url: "https://convertkit.com",
    category: "email",
    phase: "phase2",
    icon: <BookOpen size={20} />,
  },
  {
    title: "Substack",
    description: "Newsletter platform. Build audience and monetize through paid subscriptions.",
    url: "https://substack.com",
    category: "email",
    phase: "phase2",
    icon: <BookOpen size={20} />,
  },

  // Analytics & Insights
  {
    title: "Google Analytics",
    description: "Track website traffic, user behavior, and conversion metrics. Essential for understanding your audience.",
    url: "https://analytics.google.com",
    category: "analytics",
    phase: "both",
    icon: <BarChart3 size={20} />,
  },
  {
    title: "Instagram Insights",
    description: "Built-in analytics for Instagram. Track followers, engagement, reach, and audience demographics.",
    url: "https://instagram.com",
    category: "analytics",
    phase: "phase2",
    icon: <BarChart3 size={20} />,
  },
  {
    title: "TikTok Analytics",
    description: "Track video performance, audience growth, and engagement on TikTok.",
    url: "https://www.tiktok.com",
    category: "analytics",
    phase: "phase2",
    icon: <BarChart3 size={20} />,
  },
  {
    title: "Shopify Analytics",
    description: "Track sales, customer behavior, and conversion rates on your Shopify store.",
    url: "https://www.shopify.com",
    category: "analytics",
    phase: "phase2",
    icon: <BarChart3 size={20} />,
  },

  // Ads & Promotion
  {
    title: "Instagram Ads Manager",
    description: "Create and manage paid ads on Instagram, Facebook, and Messenger. Target specific audiences.",
    url: "https://business.facebook.com",
    category: "ads",
    phase: "phase2",
    icon: <Zap size={20} />,
  },
  {
    title: "TikTok Ads Manager",
    description: "Run paid ads on TikTok. Great for reaching younger audiences with short-form video content.",
    url: "https://ads.tiktok.com",
    category: "ads",
    phase: "phase2",
    icon: <Zap size={20} />,
  },
  {
    title: "Google Ads",
    description: "Run search ads, display ads, and shopping ads. Drive traffic and sales through Google.",
    url: "https://ads.google.com",
    category: "ads",
    phase: "phase2",
    icon: <Zap size={20} />,
  },

  // SEO & Discovery
  {
    title: "Ahrefs",
    description: "SEO tool for keyword research, competitor analysis, and backlink tracking.",
    url: "https://ahrefs.com",
    category: "seo",
    phase: "phase2",
    icon: <BookOpen size={20} />,
  },
  {
    title: "SEMrush",
    description: "All-in-one SEO and marketing toolkit. Keyword research, site audit, competitor analysis.",
    url: "https://semrush.com",
    category: "seo",
    phase: "phase2",
    icon: <BookOpen size={20} />,
  },
  {
    title: "Ubersuggest",
    description: "Affordable SEO tool for keyword research and content ideas.",
    url: "https://ubersuggest.com",
    category: "seo",
    phase: "phase2",
    icon: <BookOpen size={20} />,
  },
];

const categoryConfig = {
  "content-creation": { label: "Content Creation", color: "bg-blue-100 text-blue-800" },
  analytics: { label: "Analytics", color: "bg-green-100 text-green-800" },
  email: { label: "Email Marketing", color: "bg-purple-100 text-purple-800" },
  ads: { label: "Ads & Promotion", color: "bg-orange-100 text-orange-800" },
  design: { label: "Design", color: "bg-pink-100 text-pink-800" },
  seo: { label: "SEO & Discovery", color: "bg-amber-100 text-amber-800" },
};

export default function ResourcesHub() {
  const { user } = useAuth();

  const groupedResources = resources.reduce((acc, resource) => {
    if (!acc[resource.category]) {
      acc[resource.category] = [];
    }
    acc[resource.category].push(resource);
    return acc;
  }, {} as Record<string, Resource[]>);

  return (
    <DashboardLayout>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Resources Hub</h1>
          <p className="text-muted-foreground mt-2">
            All the tools and platforms you need for Phase 1 & Phase 2. Click any tool to learn more.
          </p>
        </div>

        {/* Resources by Category */}
        {Object.entries(groupedResources).map(([category, categoryResources]) => {
          const config = categoryConfig[category as keyof typeof categoryConfig];
          return (
            <div key={category}>
              <h2 className="text-2xl font-bold text-foreground mb-4">{config.label}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {categoryResources.map((resource) => (
                  <Card key={resource.title} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-start gap-3 flex-1">
                          <div className="text-primary mt-1">{resource.icon}</div>
                          <div className="flex-1">
                            <CardTitle className="text-lg">{resource.title}</CardTitle>
                            <Badge className={`mt-2 ${config.color}`}>
                              {config.label}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-sm text-muted-foreground">{resource.description}</p>
                      <Button
                        asChild
                        className="w-full"
                        variant="outline"
                      >
                        <a href={resource.url} target="_blank" rel="noopener noreferrer">
                          <ExternalLink size={16} className="mr-2" />
                          Visit Website
                        </a>
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}

        {/* Quick Tips */}
        <Card className="bg-blue-50 border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg">💡 Quick Tips</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="font-medium text-sm text-foreground">Start with free tiers</p>
              <p className="text-sm text-muted-foreground">Most tools offer free versions. Test them out before paying.</p>
            </div>
            <div>
              <p className="font-medium text-sm text-foreground">Integrate your tools</p>
              <p className="text-sm text-muted-foreground">Connect Buffer to your Instagram, Mailchimp to your website, Google Analytics to your Shopify store.</p>
            </div>
            <div>
              <p className="font-medium text-sm text-foreground">Track everything</p>
              <p className="text-sm text-muted-foreground">Use analytics to understand what content works, what drives sales, and what your audience wants.</p>
            </div>
            <div>
              <p className="font-medium text-sm text-foreground">Automate where possible</p>
              <p className="text-sm text-muted-foreground">Use scheduling tools (Buffer, Mailchimp) to save time and stay consistent.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}
