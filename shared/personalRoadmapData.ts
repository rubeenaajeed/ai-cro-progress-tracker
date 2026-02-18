export type Phase = "Foundations" | "Storytelling" | "Content" | "Community" | "Growth";

export interface Resource {
  title: string;
  url: string;
  type: "course" | "article" | "tool" | "book";
}

export interface WeekObjective {
  id: string;
  text: string;
  completed?: boolean;
}

export interface MiniProject {
  title: string;
  description: string;
  deliverable: string;
}

export interface Week {
  weekNumber: number;
  month: number;
  phase: Phase;
  title: string;
  goal: string;
  objectives: WeekObjective[];
  resources: Resource[];
  miniProject?: MiniProject;
  learningFocus: string[];
}

export const personalRoadmapData: Week[] = [
  // WEEKS 1-4: Consumer Psychology (Shared Foundation)
  {
    weekNumber: 1,
    month: 1,
    phase: "Foundations",
    title: "Consumer Psychology Fundamentals",
    goal: "Understand what motivates people to follow you and buy from you. Learn Cialdini's 6 Principles applied to personal brands.",
    objectives: [
      { id: "p1-1", text: "Learn Cialdini's 6 Principles (Reciprocity, Commitment, Social Proof, Authority, Liking, Scarcity)" },
      { id: "p1-2", text: "Understand how people decide to follow a personal brand" },
      { id: "p1-3", text: "Learn how emotions drive purchasing decisions for fitness & fashion" },
      { id: "p1-4", text: "Identify which principles your fitness brand and clothing brand already use" },
    ],
    resources: [
      {
        title: "Cialdini's 6 Principles Explained (YouTube - 30 min)",
        url: "https://www.youtube.com/watch?v=eCNeOga965U",
        type: "article",
      },
      {
        title: "Psychology of Personal Branding (Article)",
        url: "https://www.forbes.com/sites/williamarruda/2013/10/21/the-science-of-personal-branding/",
        type: "article",
      },
      {
        title: "Why People Follow Influencers (Psychology Today)",
        url: "https://www.psychologytoday.com/us/basics/social-media",
        type: "article",
      },
      {
        title: "CXL - Persuasion Psychology for Marketers (Free Course)",
        url: "https://cxl.com/institute/programs/digital-psychology-persuasion-training/",
        type: "course",
      },
      {
        title: "Hooked: How to Build Habit-Forming Products (Blinkist Summary)",
        url: "https://www.blinkist.com/books/hooked-en",
        type: "article",
      },
    ],
    miniProject: {
      title: "Psychology Audit of Your Brands",
      description: "Analyze your fitness brand and clothing brand to see which psychological principles you're already using",
      deliverable: "Document showing which Cialdini principles are present in your current content and marketing",
    },
    learningFocus: ["Persuasion principles", "Audience psychology", "Personal brand appeal"],
  },
  {
    weekNumber: 2,
    month: 1,
    phase: "Foundations",
    title: "Understanding Your Audience",
    goal: "Learn who your ideal followers are and what they want from your fitness brand and clothing business.",
    objectives: [
      { id: "p2-1", text: "Define your ideal audience for fitness brand" },
      { id: "p2-2", text: "Define your ideal audience for clothing brand" },
      { id: "p2-3", text: "Understand their pain points and desires" },
      { id: "p2-4", text: "Learn how to speak directly to their needs" },
    ],
    resources: [
      {
        title: "Audience Avatar Template (Free Tool)",
        url: "https://www.hubspot.com/make-my-persona",
        type: "tool",
      },
      {
        title: "Understanding Your Target Market (YouTube - 20 min)",
        url: "https://www.youtube.com/watch?v=oCO5xvJlJIw",
        type: "article",
      },
      {
        title: "Customer Persona Development Guide (Neil Patel)",
        url: "https://neilpatel.com/blog/buyer-personas/",
        type: "article",
      },
      {
        title: "Market Research for Personal Brands (YouTube - 18 min)",
        url: "https://www.youtube.com/watch?v=qvHvjUTgzKQ",
        type: "article",
      },
      {
        title: "Miro - Audience Analysis Whiteboard Template",
        url: "https://miro.com/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Create Your Audience Avatars",
      description: "Create detailed profiles of your ideal customers for both brands",
      deliverable: "2 audience avatars (one for fitness, one for clothing) with demographics, desires, and pain points",
    },
    learningFocus: ["Audience research", "Customer personas", "Market understanding"],
  },
  {
    weekNumber: 3,
    month: 1,
    phase: "Foundations",
    title: "Building Trust & Authority",
    goal: "Learn how to establish yourself as a credible, trustworthy voice in your niche.",
    objectives: [
      { id: "p3-1", text: "Understand what builds trust online" },
      { id: "p3-2", text: "Learn how to establish authority in fitness and fashion" },
      { id: "p3-3", text: "Understand social proof and how to use it" },
      { id: "p3-4", text: "Create your authority positioning statement" },
    ],
    resources: [
      {
        title: "Building Authority as a Personal Brand (Article)",
        url: "https://www.forbes.com/",
        type: "article",
      },
      {
        title: "The Trust Factor in Personal Branding (YouTube - 15 min)",
        url: "https://www.youtube.com/watch?v=2m2rWlNvHM8",
        type: "article",
      },
      {
        title: "Building Authority & Credibility (YouTube - 18 min)",
        url: "https://www.youtube.com/watch?v=qvHvjUTgzKQ",
        type: "article",
      },
    ],
    miniProject: {
      title: "Authority Positioning",
      description: "Define what makes you unique and trustworthy in your niches",
      deliverable: "Your unique positioning statement for both fitness and clothing brands",
    },
    learningFocus: ["Trust building", "Authority positioning", "Credibility signals"],
  },
  {
    weekNumber: 4,
    month: 1,
    phase: "Foundations",
    title: "Psychology in Action: Your First Campaign",
    goal: "Apply consumer psychology principles to plan your first brand campaign.",
    objectives: [
      { id: "p4-1", text: "Choose one psychological principle to focus on" },
      { id: "p4-2", text: "Design a campaign using that principle" },
      { id: "p4-3", text: "Plan how to measure success" },
      { id: "p4-4", text: "Launch and observe results" },
    ],
    resources: [
      {
        title: "Campaign Planning Template (Free)",
        url: "https://www.asana.com/templates/marketing-campaign",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Launch Your First Psychology-Based Campaign",
      description: "Create and launch a small campaign using one psychological principle",
      deliverable: "Campaign plan, content created, and initial results/observations",
    },
    learningFocus: ["Campaign strategy", "Psychology application", "Measurement"],
  },

  // WEEKS 5-8: Storytelling Strategy
  {
    weekNumber: 5,
    month: 2,
    phase: "Storytelling",
    title: "The Power of Your Story",
    goal: "Learn why storytelling matters and how to craft your personal brand story.",
    objectives: [
      { id: "p5-1", text: "Understand why stories are more powerful than facts" },
      { id: "p5-2", text: "Learn the basic structure of a compelling story" },
      { id: "p5-3", text: "Identify your origin story (why you started your brands)" },
      { id: "p5-4", text: "Practice telling your story in 60 seconds" },
    ],
    resources: [
      {
        title: "Storytelling Basics (YouTube - 20 min)",
        url: "https://www.youtube.com/watch?v=Nj-uxc3Mvsw",
        type: "article",
      },
      {
        title: "The Hero's Journey (Article)",
        url: "https://www.masterclass.com/articles/what-is-the-heros-journey",
        type: "article",
      },
      {
        title: "Personal Brand Storytelling (YouTube - 22 min)",
        url: "https://www.youtube.com/watch?v=_O1hM-Is_35",
        type: "article",
      },
    ],
    miniProject: {
      title: "Write Your Origin Story",
      description: "Write the story of why you started your fitness brand and clothing business",
      deliverable: "Your origin story (500-1000 words) that you can share with your audience",
    },
    learningFocus: ["Storytelling fundamentals", "Personal narrative", "Emotional connection"],
  },
  {
    weekNumber: 6,
    month: 2,
    phase: "Storytelling",
    title: "Storytelling for Fitness & Fashion",
    goal: "Learn how to tell stories specific to fitness and fashion that resonate with your audience.",
    objectives: [
      { id: "p6-1", text: "Learn transformation stories (before/after narratives)" },
      { id: "p6-2", text: "Understand vulnerability and authenticity in storytelling" },
      { id: "p6-3", text: "Create a transformation story from your fitness journey" },
      { id: "p6-4", text: "Create a story about your clothing brand philosophy" },
    ],
    resources: [
      {
        title: "Transformation Story Framework (Article)",
        url: "https://www.copyblogger.com/storytelling/",
        type: "article",
      },
    ],
    miniProject: {
      title: "Create Your Transformation Stories",
      description: "Write 2 transformation stories - one from fitness, one from fashion",
      deliverable: "2 detailed transformation stories ready to share",
    },
    learningFocus: ["Transformation narratives", "Vulnerability", "Authenticity"],
  },
  {
    weekNumber: 7,
    month: 2,
    phase: "Storytelling",
    title: "Stories That Sell",
    goal: "Learn how to tell stories that inspire people to take action (follow, buy, engage).",
    objectives: [
      { id: "p7-1", text: "Understand the psychology of persuasive storytelling" },
      { id: "p7-2", text: "Learn the problem-solution-benefit story structure" },
      { id: "p7-3", text: "Create a story that showcases your product/service benefits" },
      { id: "p7-4", text: "Practice telling stories that inspire action" },
    ],
    resources: [
      {
        title: "Persuasive Storytelling (Article)",
        url: "https://www.linkedin.com/pulse/persuasive-storytelling-marketing/",
        type: "article",
      },
    ],
    miniProject: {
      title: "Create Sales Stories",
      description: "Write stories that showcase why people should buy from you",
      deliverable: "3-5 short stories (one for each main product/service) that inspire action",
    },
    learningFocus: ["Persuasive storytelling", "Action-oriented narratives", "Product stories"],
  },
  {
    weekNumber: 8,
    month: 2,
    phase: "Storytelling",
    title: "Storytelling Across Platforms",
    goal: "Learn how to adapt your stories for different platforms (Instagram, TikTok, LinkedIn, etc).",
    objectives: [
      { id: "p8-1", text: "Understand platform-specific storytelling" },
      { id: "p8-2", text: "Learn short-form vs long-form storytelling" },
      { id: "p8-3", text: "Create stories for Instagram, TikTok, and YouTube" },
      { id: "p8-4", text: "Practice repurposing one story across multiple platforms" },
    ],
    resources: [
      {
        title: "Platform-Specific Content Strategy (Article)",
        url: "https://www.hootsuite.com/blog/social-media-content-strategy",
        type: "article",
      },
    ],
    miniProject: {
      title: "Multi-Platform Story Campaign",
      description: "Take one story and adapt it for 3 different platforms",
      deliverable: "Same story adapted for Instagram, TikTok, and YouTube with platform-specific formatting",
    },
    learningFocus: ["Platform adaptation", "Short-form content", "Cross-platform strategy"],
  },

  // WEEKS 9-12: Content Strategy
  {
    weekNumber: 9,
    month: 3,
    phase: "Content",
    title: "Content Strategy Fundamentals",
    goal: "Learn how to plan content that keeps your audience engaged and coming back.",
    objectives: [
      { id: "p9-1", text: "Understand the content pillars for your brands" },
      { id: "p9-2", text: "Learn the 80/20 rule of content (80% value, 20% sales)" },
      { id: "p9-3", text: "Create your content pillars for fitness and fashion" },
      { id: "p9-4", text: "Plan your first month of content" },
    ],
    resources: [
      {
        title: "Content Pillars Framework (Article)",
        url: "https://www.semrush.com/blog/content-pillars/",
        type: "article",
      },
      {
        title: "Content Strategy Template (Free Tool)",
        url: "https://www.notion.so/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Create Your Content Strategy",
      description: "Define your content pillars and plan 4 weeks of content",
      deliverable: "Content pillars document + 4-week content calendar",
    },
    learningFocus: ["Content pillars", "Content mix", "Strategic planning"],
  },
  {
    weekNumber: 10,
    month: 3,
    phase: "Content",
    title: "Content Types That Work",
    goal: "Learn which content types get the most engagement for fitness and fashion brands.",
    objectives: [
      { id: "p10-1", text: "Understand different content types (carousel, Reels, Stories, etc)" },
      { id: "p10-2", text: "Learn what content performs best for fitness" },
      { id: "p10-3", text: "Learn what content performs best for fashion" },
      { id: "p10-4", text: "Create one piece of each top-performing content type" },
    ],
    resources: [
      {
        title: "Best Performing Content Types (Article)",
        url: "https://www.hootsuite.com/blog/instagram-content-types",
        type: "article",
      },
    ],
    miniProject: {
      title: "Content Type Experiments",
      description: "Create and test different content types",
      deliverable: "5 pieces of content (different types) with performance predictions",
    },
    learningFocus: ["Content formats", "Platform algorithms", "Engagement tactics"],
  },
  {
    weekNumber: 11,
    month: 3,
    phase: "Content",
    title: "Creating Valuable Content",
    goal: "Learn how to create content that provides real value to your audience.",
    objectives: [
      { id: "p11-1", text: "Understand what 'valuable content' means" },
      { id: "p11-2", text: "Learn to create educational content" },
      { id: "p11-3", text: "Learn to create entertaining content" },
      { id: "p11-4", text: "Learn to create inspiring content" },
    ],
    resources: [
      {
        title: "Creating Valuable Content (Article)",
        url: "https://www.forbes.com/sites/forbesagencycouncil/2020/07/15/how-to-create-valuable-content/",
        type: "article",
      },
    ],
    miniProject: {
      title: "Value-Focused Content Series",
      description: "Create a 5-part content series providing value to your audience",
      deliverable: "5 pieces of educational/inspiring/entertaining content",
    },
    learningFocus: ["Value creation", "Educational content", "Audience benefit"],
  },
  {
    weekNumber: 12,
    month: 3,
    phase: "Content",
    title: "Content Calendar & Consistency",
    goal: "Learn how to plan and maintain a consistent content schedule.",
    objectives: [
      { id: "p12-1", text: "Understand the importance of consistency" },
      { id: "p12-2", text: "Learn how to create a content calendar" },
      { id: "p12-3", text: "Understand batching and planning content in advance" },
      { id: "p12-4", text: "Create your 12-week content calendar" },
    ],
    resources: [
      {
        title: "Content Calendar Template (Free)",
        url: "https://www.asana.com/templates/content-calendar",
        type: "tool",
      },
    ],
    miniProject: {
      title: "12-Week Content Calendar",
      description: "Plan 12 weeks of consistent content for both brands",
      deliverable: "Detailed 12-week content calendar with themes, topics, and posting schedule",
    },
    learningFocus: ["Planning", "Consistency", "Scheduling"],
  },

  // WEEKS 13-24: Community & Monetization
  {
    weekNumber: 13,
    month: 4,
    phase: "Community",
    title: "Building Community Foundations",
    goal: "Learn how to create a loyal community around your brands.",
    objectives: [
      { id: "p13-1", text: "Understand the difference between followers and community" },
      { id: "p13-2", text: "Learn engagement strategies" },
      { id: "p13-3", text: "Understand how to respond to comments and messages" },
      { id: "p13-4", text: "Create your community engagement plan" },
    ],
    resources: [
      {
        title: "Building Community (Article)",
        url: "https://www.forbes.com/sites/forbesagencycouncil/2021/07/20/how-to-build-community-on-social-media/",
        type: "article",
      },
    ],
    miniProject: {
      title: "Community Engagement Strategy",
      description: "Create a plan for building and engaging your community",
      deliverable: "Community engagement plan with daily/weekly engagement tactics",
    },
    learningFocus: ["Community building", "Engagement", "Relationship building"],
  },
  {
    weekNumber: 14,
    month: 4,
    phase: "Community",
    title: "Collaborations & Partnerships",
    goal: "Learn how to grow through strategic collaborations with other creators and brands.",
    objectives: [
      { id: "p14-1", text: "Understand collaboration opportunities" },
      { id: "p14-2", text: "Learn how to approach potential collaborators" },
      { id: "p14-3", text: "Understand co-marketing benefits" },
      { id: "p14-4", text: "Plan your first collaboration" },
    ],
    resources: [
      {
        title: "Influencer Collaborations (Article)",
        url: "https://www.hootsuite.com/blog/influencer-marketing",
        type: "article",
      },
    ],
    miniProject: {
      title: "Plan Your First Collaboration",
      description: "Identify and plan a collaboration with a complementary creator or brand",
      deliverable: "Collaboration proposal and outreach plan",
    },
    learningFocus: ["Partnerships", "Growth hacking", "Network building"],
  },
  {
    weekNumber: 15,
    month: 4,
    phase: "Community",
    title: "Email & Direct Communication",
    goal: "Learn how to build a direct relationship with your audience through email and DMs.",
    objectives: [
      { id: "p15-1", text: "Understand the value of email lists" },
      { id: "p15-2", text: "Learn email marketing basics" },
      { id: "p15-3", text: "Create your email strategy" },
      { id: "p15-4", text: "Set up your first email sequence" },
    ],
    resources: [
      {
        title: "Email Marketing for Personal Brands (Article)",
        url: "https://www.mailchimp.com/resources/",
        type: "article",
      },
      {
        title: "Email Marketing Tools (Mailchimp, ConvertKit)",
        url: "https://mailchimp.com",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Email Marketing Setup",
      description: "Set up email collection and create your first email sequence",
      deliverable: "Email signup page + 5-email welcome sequence",
    },
    learningFocus: ["Email marketing", "Direct communication", "List building"],
  },
  {
    weekNumber: 16,
    month: 4,
    phase: "Community",
    title: "Monetization Basics",
    goal: "Learn different ways to make money from your personal brands.",
    objectives: [
      { id: "p16-1", text: "Understand monetization models (affiliate, sponsorships, products)" },
      { id: "p16-2", text: "Learn which models fit your brands" },
      { id: "p16-3", text: "Understand FTC guidelines and disclosure" },
      { id: "p16-4", text: "Plan your monetization strategy" },
    ],
    resources: [
      {
        title: "Monetization Strategies (Article)",
        url: "https://www.forbes.com/sites/forbesagencycouncil/2020/02/24/how-influencers-make-money/",
        type: "article",
      },
    ],
    miniProject: {
      title: "Monetization Strategy Plan",
      description: "Identify 3 monetization opportunities for your brands",
      deliverable: "Monetization plan with timeline and revenue projections",
    },
    learningFocus: ["Revenue models", "Monetization", "Business strategy"],
  },
  {
    weekNumber: 17,
    month: 5,
    phase: "Community",
    title: "Affiliate Marketing",
    goal: "Learn how to earn money through affiliate partnerships.",
    objectives: [
      { id: "p17-1", text: "Understand affiliate marketing" },
      { id: "p17-2", text: "Find affiliate programs in fitness and fashion" },
      { id: "p17-3", text: "Create authentic affiliate recommendations" },
      { id: "p17-4", text: "Track your affiliate earnings" },
    ],
    resources: [
      {
        title: "Affiliate Marketing Guide (Article)",
        url: "https://www.shopify.com/blog/affiliate-marketing",
        type: "article",
      },
    ],
    miniProject: {
      title: "Affiliate Program Setup",
      description: "Join 3-5 affiliate programs and create your first affiliate content",
      deliverable: "List of affiliate programs + 3 affiliate-focused content pieces",
    },
    learningFocus: ["Affiliate marketing", "Partnerships", "Revenue generation"],
  },
  {
    weekNumber: 18,
    month: 5,
    phase: "Community",
    title: "Sponsorships & Brand Deals",
    goal: "Learn how to attract and negotiate brand sponsorships.",
    objectives: [
      { id: "p18-1", text: "Understand what brands look for in creators" },
      { id: "p18-2", text: "Learn how to pitch yourself to brands" },
      { id: "p18-3", text: "Understand sponsorship rates and negotiation" },
      { id: "p18-4", text: "Create your media kit" },
    ],
    resources: [
      {
        title: "How to Get Brand Sponsorships (Article)",
        url: "https://www.forbes.com/sites/forbesagencycouncil/2019/12/17/how-to-land-brand-sponsorships/",
        type: "article",
      },
      {
        title: "Media Kit Template (Free)",
        url: "https://www.canva.com/templates/media-kits/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Create Your Media Kit",
      description: "Create a professional media kit to attract brand partnerships",
      deliverable: "Professional media kit with your stats, audience, and rates",
    },
    learningFocus: ["Brand partnerships", "Negotiation", "Professional positioning"],
  },
  {
    weekNumber: 19,
    month: 5,
    phase: "Community",
    title: "Selling Your Own Products",
    goal: "Learn how to create and sell your own products (digital or physical).",
    objectives: [
      { id: "p19-1", text: "Understand product ideas for your audience" },
      { id: "p19-2", text: "Learn about digital products (courses, guides, templates)" },
      { id: "p19-3", text: "Learn about physical products (merchandise, clothing)" },
      { id: "p19-4", text: "Plan your first product launch" },
    ],
    resources: [
      {
        title: "Creating Digital Products (Article)",
        url: "https://www.shopify.com/blog/digital-products",
        type: "article",
      },
      {
        title: "E-commerce Platform Comparison (Shopify, WooCommerce, etc)",
        url: "https://www.shopify.com",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Product Launch Plan",
      description: "Plan and launch your first digital or physical product",
      deliverable: "Product idea, pricing strategy, and launch plan",
    },
    learningFocus: ["Product development", "E-commerce", "Sales"],
  },
  {
    weekNumber: 20,
    month: 5,
    phase: "Community",
    title: "Customer Service & Retention",
    goal: "Learn how to keep customers happy and coming back.",
    objectives: [
      { id: "p20-1", text: "Understand customer service best practices" },
      { id: "p20-2", text: "Learn how to handle complaints and feedback" },
      { id: "p20-3", text: "Understand customer retention strategies" },
      { id: "p20-4", text: "Create your customer service plan" },
    ],
    resources: [
      {
        title: "Customer Service Excellence (Article)",
        url: "https://www.forbes.com/sites/forbesagencycouncil/2020/03/23/customer-service-excellence/",
        type: "article",
      },
    ],
    miniProject: {
      title: "Customer Service Strategy",
      description: "Create a plan for excellent customer service and retention",
      deliverable: "Customer service guidelines and retention strategy",
    },
    learningFocus: ["Customer service", "Retention", "Loyalty"],
  },
  {
    weekNumber: 21,
    month: 6,
    phase: "Community",
    title: "Analytics & Metrics",
    goal: "Learn how to track what's working and optimize your strategy.",
    objectives: [
      { id: "p21-1", text: "Understand key metrics for your brands" },
      { id: "p21-2", text: "Learn how to use platform analytics" },
      { id: "p21-3", text: "Understand ROI and profitability" },
      { id: "p21-4", text: "Create your analytics dashboard" },
    ],
    resources: [
      {
        title: "Social Media Analytics Guide (Article)",
        url: "https://www.hootsuite.com/blog/social-media-analytics",
        type: "article",
      },
      {
        title: "Google Analytics for Creators (YouTube - 20 min)",
        url: "https://www.youtube.com/watch?v=gSiUB0mUi8s",
        type: "article",
      },
      {
        title: "YouTube Analytics Masterclass (YouTube - 25 min)",
        url: "https://www.youtube.com/watch?v=1eFKHCnIJ3w",
        type: "article",
      },
    ],
    miniProject: {
      title: "Analytics Dashboard Setup",
      description: "Set up tracking for your key metrics",
      deliverable: "Analytics dashboard showing your key metrics and trends",
    },
    learningFocus: ["Analytics", "Data-driven decisions", "Performance tracking"],
  },
  {
    weekNumber: 22,
    month: 6,
    phase: "Community",
    title: "Community Challenges & Engagement",
    goal: "Learn how to create campaigns that deepen community engagement.",
    objectives: [
      { id: "p22-1", text: "Understand challenge mechanics" },
      { id: "p22-2", text: "Learn how to create viral challenges" },
      { id: "p22-3", text: "Understand user-generated content" },
      { id: "p22-4", text: "Plan and launch your first community challenge" },
    ],
    resources: [
      {
        title: "Creating Viral Challenges (Article)",
        url: "https://www.forbes.com/sites/forbesagencycouncil/2021/10/04/how-to-create-a-viral-social-media-challenge/",
        type: "article",
      },
    ],
    miniProject: {
      title: "Launch a Community Challenge",
      description: "Create and launch a challenge that engages your community",
      deliverable: "Challenge concept, rules, promotion plan, and results",
    },
    learningFocus: ["Engagement campaigns", "Viral mechanics", "Community participation"],
  },
  {
    weekNumber: 23,
    month: 6,
    phase: "Community",
    title: "Building Your Tribe",
    goal: "Learn how to create a loyal, engaged community that supports your mission.",
    objectives: [
      { id: "p23-1", text: "Understand tribe vs audience" },
      { id: "p23-2", text: "Learn how to create exclusive communities" },
      { id: "p23-3", text: "Understand membership and subscription models" },
      { id: "p23-4", text: "Plan your exclusive community" },
    ],
    resources: [
      {
        title: "Building a Loyal Tribe (Article)",
        url: "https://www.forbes.com/sites/forbesagencycouncil/2020/09/28/how-to-build-a-loyal-community-around-your-brand/",
        type: "article",
      },
    ],
    miniProject: {
      title: "Exclusive Community Plan",
      description: "Plan an exclusive community or membership for your most loyal followers",
      deliverable: "Community structure, benefits, pricing, and launch plan",
    },
    learningFocus: ["Community building", "Loyalty", "Exclusivity"],
  },
  {
    weekNumber: 24,
    month: 6,
    phase: "Community",
    title: "Monetization Optimization",
    goal: "Learn how to maximize revenue from your existing audience.",
    objectives: [
      { id: "p24-1", text: "Analyze your current revenue streams" },
      { id: "p24-2", text: "Identify optimization opportunities" },
      { id: "p24-3", text: "Learn pricing strategies" },
      { id: "p24-4", text: "Create your revenue optimization plan" },
    ],
    resources: [
      {
        title: "Pricing Strategies (Article)",
        url: "https://www.forbes.com/sites/forbesagencycouncil/2020/08/24/pricing-strategies/",
        type: "article",
      },
    ],
    miniProject: {
      title: "Revenue Optimization Plan",
      description: "Analyze and optimize your revenue streams",
      deliverable: "Revenue analysis + optimization plan with projected increases",
    },
    learningFocus: ["Revenue optimization", "Pricing", "Business growth"],
  },

  // WEEKS 25-30: Business Growth
  {
    weekNumber: 25,
    month: 7,
    phase: "Growth",
    title: "Scaling Your Fitness Brand",
    goal: "Learn strategies to grow your fitness brand from 0 to 5K followers and beyond.",
    objectives: [
      { id: "p25-1", text: "Analyze your fitness brand's current position" },
      { id: "p25-2", text: "Identify growth opportunities" },
      { id: "p25-3", text: "Create a 6-month growth plan" },
      { id: "p25-4", text: "Set specific follower and engagement targets" },
    ],
    resources: [
      {
        title: "Fitness Influencer Growth Strategies (Article)",
        url: "https://www.forbes.com/sites/forbesagencycouncil/2021/03/15/fitness-influencer-marketing/",
        type: "article",
      },
    ],
    miniProject: {
      title: "Fitness Brand Growth Plan",
      description: "Create a detailed 6-month growth strategy for your fitness brand",
      deliverable: "Growth plan with tactics, timeline, and KPIs",
    },
    learningFocus: ["Growth strategy", "Fitness marketing", "Audience building"],
  },
  {
    weekNumber: 26,
    month: 7,
    phase: "Growth",
    title: "Scaling Your Clothing Business",
    goal: "Learn strategies to grow your clothing business from 1 to 10+ orders per month and expand to India.",
    objectives: [
      { id: "p26-1", text: "Analyze your clothing business's current position" },
      { id: "p26-2", text: "Identify growth opportunities for orders" },
      { id: "p26-3", text: "Research India market opportunities" },
      { id: "p26-4", text: "Create a 6-month growth and expansion plan" },
    ],
    resources: [
      {
        title: "E-commerce Growth Strategies (Article)",
        url: "https://www.shopify.com/blog/ecommerce-growth-strategies",
        type: "article",
      },
      {
        title: "International Expansion Guide (Article)",
        url: "https://www.shopify.com/blog/international-expansion",
        type: "article",
      },
    ],
    miniProject: {
      title: "Clothing Business Growth & Expansion Plan",
      description: "Create a plan to grow orders and expand to India",
      deliverable: "Growth plan with sales targets, India market analysis, and expansion strategy",
    },
    learningFocus: ["E-commerce growth", "International expansion", "Business scaling"],
  },
  {
    weekNumber: 27,
    month: 7,
    phase: "Growth",
    title: "Paid Advertising & Growth Hacking",
    goal: "Learn how to use paid ads to accelerate growth on both brands.",
    objectives: [
      { id: "p27-1", text: "Understand different advertising platforms (Instagram, TikTok, Google)" },
      { id: "p27-2", text: "Learn ad targeting and audience segmentation" },
      { id: "p27-3", text: "Understand ROI and cost per acquisition" },
      { id: "p27-4", text: "Plan your first paid ad campaign" },
    ],
    resources: [
      {
        title: "Paid Advertising Guide (Article)",
        url: "https://www.facebook.com/business/learn/lessons/paid-advertising",
        type: "article",
      },
      {
        title: "Google Ads for Beginners (YouTube - 30 min)",
        url: "https://www.youtube.com/watch?v=xKVc67MYYkA",
        type: "article",
      },
      {
        title: "Google Ads Complete Guide (YouTube - 35 min)",
        url: "https://www.youtube.com/watch?v=Kn-YyVpZNBo",
        type: "article",
      },
    ],
    miniProject: {
      title: "Paid Ad Campaign Launch",
      description: "Plan and launch your first paid advertising campaign",
      deliverable: "Ad strategy, creative assets, targeting plan, and budget allocation",
    },
    learningFocus: ["Paid advertising", "Growth hacking", "ROI optimization"],
  },
  {
    weekNumber: 28,
    month: 8,
    phase: "Growth",
    title: "Product Expansion & Diversification",
    goal: "Learn how to expand your product lines and diversify revenue.",
    objectives: [
      { id: "p28-1", text: "Analyze customer feedback for new product ideas" },
      { id: "p28-2", text: "Understand product bundling and upselling" },
      { id: "p28-3", text: "Learn about complementary products" },
      { id: "p28-4", text: "Plan 2-3 new products to launch" },
    ],
    resources: [
      {
        title: "Product Expansion Strategy (Article)",
        url: "https://www.shopify.com/blog/product-expansion",
        type: "article",
      },
    ],
    miniProject: {
      title: "Product Expansion Plan",
      description: "Identify and plan 2-3 new products for your brands",
      deliverable: "Product ideas, market research, and launch plan",
    },
    learningFocus: ["Product development", "Diversification", "Revenue growth"],
  },
  {
    weekNumber: 29,
    month: 8,
    phase: "Growth",
    title: "Building Systems & Delegation",
    goal: "Learn how to scale by building systems and delegating tasks.",
    objectives: [
      { id: "p29-1", text: "Understand what can be automated" },
      { id: "p29-2", text: "Learn about outsourcing and hiring" },
      { id: "p29-3", text: "Understand content batching and scheduling" },
      { id: "p29-4", text: "Create your systems and delegation plan" },
    ],
    resources: [
      {
        title: "Business Systems & Automation (Article)",
        url: "https://www.forbes.com/sites/forbesagencycouncil/2020/11/02/business-automation/",
        type: "article",
      },
    ],
    miniProject: {
      title: "Systems & Delegation Plan",
      description: "Create a plan to automate and delegate tasks",
      deliverable: "List of automatable tasks, outsourcing plan, and timeline",
    },
    learningFocus: ["Systems thinking", "Delegation", "Scalability"],
  },
  {
    weekNumber: 30,
    month: 8,
    phase: "Growth",
    title: "Your 6-Month Reflection & Next Steps",
    goal: "Reflect on your journey and plan your next phase of growth.",
    objectives: [
      { id: "p30-1", text: "Review your progress on both brands" },
      { id: "p30-2", text: "Celebrate your wins and learnings" },
      { id: "p30-3", text: "Identify what worked and what didn't" },
      { id: "p30-4", text: "Plan your next 6-month goals" },
    ],
    resources: [
      {
        title: "Goal Setting Framework (Article)",
        url: "https://www.forbes.com/sites/forbesagencycouncil/2020/01/20/goal-setting-framework/",
        type: "article",
      },
    ],
    miniProject: {
      title: "6-Month Reflection & Future Planning",
      description: "Reflect on your journey and plan your next phase",
      deliverable: "Reflection document + 6-month goals for both brands",
    },
    learningFocus: ["Reflection", "Goal setting", "Continuous improvement"],
  },
];
