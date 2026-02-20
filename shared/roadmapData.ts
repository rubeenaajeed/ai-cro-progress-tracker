export type Phase = "Foundations" | "Content & CRO" | "Analytics & Automation" | "Portfolio" | "Positioning" | "Personal Brand" | "Business Brand";

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
  difficulty?: "Beginner" | "Intermediate" | "Advanced";
  priority?: "High" | "Medium" | "Low";
}

export const roadmapData: Week[] = [
  // MONTH 1: Consumer Psychology & CRO Foundations
  {
    weekNumber: 1,
    month: 1,
    phase: "Foundations",
    title: "Consumer Psychology Fundamentals",
    goal: "Understand the core principles that drive human behavior and purchasing decisions. Learn Cialdini's 6 Principles of Persuasion.",
    difficulty: "Beginner",
    priority: "High",
    objectives: [
      { id: "1-1", text: "Learn Cialdini's 6 Principles of Persuasion (Reciprocity, Commitment, Social Proof, Authority, Liking, Scarcity)" },
      { id: "1-2", text: "Understand psychological triggers in e-commerce" },
      { id: "1-3", text: "Learn how emotions drive purchasing decisions" },
      { id: "1-4", text: "Identify psychological principles in 3 successful brands" },
    ],
    resources: [
      {
        title: "Cialdini's 6 Principles Explained (YouTube - 30 min)",
        url: "https://www.youtube.com/watch?v=eCNeOga965U",
        type: "article",
      },
      {
        title: "CXL – Persuasion Psychology for Marketers (Free Course)",
        url: "https://cxl.com/institute/programs/digital-psychology-persuasion-training/",
        type: "course",
      },
      {
        title: "Hooked: How to Build Habit-Forming Products (Summary & Key Insights)",
        url: "https://www.blinkist.com/books/hooked-en",
        type: "article",
      },
      {
        title: "Neil Patel – Cialdini's Principles in E-commerce",
        url: "https://neilpatel.com/blog/how-to-use-cialdinis-principles-of-persuasion-to-improve-your-content-marketing-strategy/",
        type: "article",
      },
      {
        title: "Predictably Irrational by Dan Ariely (Summary - Blinkist)",
        url: "https://www.blinkist.com/books/predictably-irrational-en",
        type: "article",
      },
      {
        title: "The Psychology of Selling by Brian Tracy (YouTube - Full Audiobook)",
        url: "https://www.youtube.com/watch?v=1IGdMLTG9YQ",
        type: "article",
      },
      {
        title: "Derren Brown – Psychology of Persuasion (YouTube)",
        url: "https://www.youtube.com/watch?v=kgF8xQc-Pu0",
        type: "article",
      },
      {
        title: "Thinking, Fast and Slow by Daniel Kahneman (Summary - Blinkist)",
        url: "https://www.blinkist.com/books/thinking-fast-and-slow-en",
        type: "article",
      },
      {
        title: "Neuroscience of Persuasion (YouTube Animated - 15 min)",
        url: "https://www.youtube.com/watch?v=UBVV8pch1dM",
        type: "article",
      },
    ],
    miniProject: {
      title: "Psychology Audit of Your Clothing Brand",
      description: "Analyze your clothing brand's website and identify which psychological principles are already in use",
      deliverable: "Document showing which Cialdini principles are present and where they could be strengthened",
    },
    learningFocus: ["Persuasion principles", "Psychological triggers", "Consumer behavior"],
  },
  {
    weekNumber: 2,
    month: 1,
    phase: "Foundations",
    title: "CRO Fundamentals & User Journey Mapping",
    goal: "Learn the CRO process, key metrics, and how to map user journeys to identify friction points and conversion opportunities.",
    difficulty: "Beginner",
    priority: "High",
    objectives: [
      { id: "2-1", text: "Learn the CRO process and methodology" },
      { id: "2-2", text: "Master key CRO metrics (Conversion Rate, AOV, Bounce Rate, CTR)" },
      { id: "2-3", text: "Understand conversion stages (Awareness → Interest → Decision → Action)" },
      { id: "2-4", text: "Learn user journey mapping techniques" },
      { id: "2-5", text: "Map a full e-commerce user journey with friction points" },
    ],
    resources: [
      {
        title: "CXL – CRO Fundamentals (Free Course)",
        url: "https://cxl.com/conversion-optimization/",
        type: "course",
      },
      {
        title: "Optimizely – User Journey Mapping Guide",
        url: "https://www.optimizely.com/blog/user-journey-mapping/",
        type: "article",
      },
      {
        title: "YouTube – E-commerce User Journey Mapping (15 min)",
        url: "https://www.youtube.com/watch?v=Ys9ydVVJXmQ",
        type: "article",
      },
      {
        title: "Figma – User Journey Template",
        url: "https://www.figma.com/community/search?resource_type=file&q=user+journey",
        type: "tool",
      },
      {
        title: "YouTube – Conversion Rate Optimization Metrics (20 min)",
        url: "https://www.youtube.com/watch?v=2Uw-4vPqJzQ",
        type: "article",
      },
      {
        title: "Miro – User Journey Mapping Whiteboard",
        url: "https://miro.com/",
        type: "tool",
      },
      {
        title: "Google Analytics – Conversion Tracking Guide",
        url: "https://www.google.com/analytics/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "User Journey Mapping",
      description: "Map a full e-commerce user journey for your clothing business with friction points identified",
      deliverable: "Journey map identifying friction points, drop-off stages, and conversion opportunities",
    },
    learningFocus: ["CRO fundamentals", "User journeys", "Conversion metrics"],
  },
  {
    weekNumber: 3,
    month: 1,
    phase: "Foundations",
    title: "Psychology in Action: A/B Testing & Experimentation",
    goal: "Learn how to design A/B tests based on psychological principles. Understand hypothesis generation, test design, and statistical significance.",
    difficulty: "Intermediate",
    priority: "High",
    objectives: [
      { id: "3-1", text: "Learn hypothesis generation based on psychology" },
      { id: "3-2", text: "Master A/B test design and execution" },
      { id: "3-3", text: "Understand statistical significance and sample size" },
      { id: "3-4", text: "Learn common A/B testing mistakes to avoid" },
      { id: "3-5", text: "Design 3 psychology-based A/B test hypotheses for your business" },
    ],
    resources: [
      {
        title: "CXL - A/B Testing Fundamentals (Free Course)",
        url: "https://cxl.com/institute/online-course/a-b-testing-foundations/",
        type: "course",
      },
      {
        title: "Optimizely - A/B Testing Best Practices",
        url: "https://www.optimizely.com/blog/ab-testing-best-practices/",
        type: "article",
      },
      {
        title: "VWO - Statistical Significance Calculator",
        url: "https://vwo.com/tools/ab-test-calculator/",
        type: "tool",
      },
      {
        title: "YouTube - A/B Testing Explained (20 min)",
        url: "https://www.youtube.com/watch?v=a5mRe0CPLMk",
        type: "article",
      },
      {
        title: "YouTube - Hypothesis Generation for A/B Tests (20 min)",
        url: "https://www.youtube.com/watch?v=xJ-Yw0u3Qgk",
        type: "article",
      },
      {
        title: "Shopify - A/B Testing Guide",
        url: "https://www.shopify.com/blog/ab-testing",
        type: "article",
      },
      {
        title: "Convert - A/B Testing Platform",
        url: "https://www.convert.com/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Psychology-Based A/B Test Plan",
      description: "Design 3 A/B tests for your clothing brand based on psychological principles",
      deliverable: "A/B test plan with 3 hypotheses, expected outcomes, and success metrics",
    },
    learningFocus: ["Hypothesis generation", "A/B testing", "Statistical analysis"],
  },
  {
    weekNumber: 4,
    month: 1,
    phase: "Foundations",
    title: "Behavioral Data & User Friction Analysis",
    goal: "Learn to analyze user behavior data (heatmaps, session replays) to identify friction points and apply psychology to improve UX.",
    objectives: [
      { id: "4-1", text: "Learn heatmap and session replay analysis" },
      { id: "4-2", text: "Understand user friction identification techniques" },
      { id: "4-3", text: "Learn to connect behavior data to psychological principles" },
      { id: "4-4", text: "Master UX improvement recommendations based on behavior" },
      { id: "4-5", text: "Analyze your clothing brand's user behavior and propose improvements" },
    ],
    resources: [
      {
        title: "Hotjar – Heatmaps & Session Replays (Free Tier)",
        url: "https://www.hotjar.com/",
        type: "tool",
      },
      {
        title: "Microsoft Clarity (Free Tool)",
        url: "https://clarity.microsoft.com/",
        type: "tool",
      },
      {
        title: "CXL – Behavioral Analytics Guide",
        url: "https://cxl.com/conversion-optimization/how-to-use-psychology-in-cro/",
        type: "article",
      },
      {
        title: "YouTube - Heatmap Analysis for UX (15 min)",
        url: "https://www.youtube.com/watch?v=xjbIaHqMKzw",
        type: "article",
      },
      {
        title: "YouTube - Session Recording Analysis (20 min)",
        url: "https://www.youtube.com/watch?v=6dCHzrfnsKI",
        type: "article",
      },
      {
        title: "Crazy Egg - Heatmap & Scroll Map Tool",
        url: "https://www.crazyegg.com/",
        type: "tool",
      },
      {
        title: "Mouseflow - Session Replay & Analytics",
        url: "https://mouseflow.com/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "User Behavior Analysis & UX Improvements",
      description: "Analyze user behavior data and propose psychology-driven UX improvements",
      deliverable: "Analysis report with friction points, behavioral insights, and recommended UX changes",
    },
    learningFocus: ["User behavior analysis", "Heatmaps", "UX optimization"],
  },

  // MONTH 2: AI Fundamentals & Prompting
  {
    weekNumber: 5,
    month: 2,
    phase: "Content & CRO",
    title: "What GenAI Actually Is",
    goal: "Understand LLMs, how GenAI works at a high level, its strengths, limitations, and real business use cases.",
    objectives: [
      { id: "5-1", text: "Learn what LLMs are and how they work at a high level" },
      { id: "5-2", text: "Understand AI strengths vs limitations in business" },
      { id: "5-3", text: "Identify real business use cases for GenAI" },
      { id: "5-4", text: "Write a 1-page note: 'How AI Amplifies Psychology & CRO'" },
    ],
    resources: [
      {
        title: "DeepLearning.AI - Generative AI for Everyone (30 min)",
        url: "https://www.deeplearning.ai/short-courses/generative-ai-for-everyone/",
        type: "course",
      },
      {
        title: "Google - Generative AI for Everyone (2 hours)",
        url: "https://www.cloudskillsboost.google/courses/216",
        type: "course",
      },
      {
        title: "OpenAI - How LLMs Work (YouTube - 15 min)",
        url: "https://www.youtube.com/watch?v=bZQun8Y4L2A",
        type: "article",
      },
      {
        title: "3Blue1Brown - Neural Networks (YouTube - 15 min)",
        url: "https://www.youtube.com/watch?v=aircAruvnKk",
        type: "article",
      },
      {
        title: "McKinsey - The State of AI in 2024",
        url: "https://www.mckinsey.com/capabilities/quantumblack/our-insights/the-state-of-ai-in-2024-generative-ais-breakout-year",
        type: "article",
      },
      {
        title: "Andreessen Horowitz - AI Playbook",
        url: "https://a16z.com/ai/",
        type: "article",
      },
      {
        title: "YouTube - LLMs Explained for Business (20 min)",
        url: "https://www.youtube.com/watch?v=kLQJh7Vr5Uw",
        type: "article",
      },
      {
        title: "Hugging Face - Introduction to Transformers",
        url: "https://huggingface.co/course/chapter1/1",
        type: "course",
      },
      {
        title: "ChatGPT - Explore AI Capabilities",
        url: "https://chat.openai.com/",
        type: "tool",
      },
      {
        title: "Claude AI - Alternative LLM",
        url: "https://claude.ai/",
        type: "tool",
      },
    ],
    learningFocus: ["LLM fundamentals", "GenAI capabilities", "Business applications"],
  },
  {
    weekNumber: 6,
    month: 2,
    phase: "Content & CRO",
    title: "Prompting Fundamentals",
    goal: "Learn role prompting, context windows, constraints, iteration, and output evaluation. Apply to CRO and psychology-based tasks.",
    objectives: [
      { id: "6-1", text: "Master role prompting techniques" },
      { id: "6-2", text: "Understand context windows and constraints" },
      { id: "6-3", text: "Learn iteration and output evaluation methods" },
      { id: "6-4", text: "Practice prompting for psychology-based content and CRO hypotheses" },
      { id: "6-5", text: "Save 5 reusable prompt templates for CRO tasks" },
    ],
    resources: [
      {
        title: "DeepLearning.AI - Prompt Engineering for Developers (1 hour)",
        url: "https://www.deeplearning.ai/short-courses/prompt-engineering-for-developers/",
        type: "course",
      },
      {
        title: "OpenAI - Prompt Engineering Best Practices",
        url: "https://platform.openai.com/docs/guides/prompt-engineering",
        type: "article",
      },
      {
        title: "Anthropic - Prompt Engineering Guide",
        url: "https://docs.anthropic.com/claude/docs/prompt-engineering",
        type: "article",
      },
      {
        title: "YouTube - Prompt Engineering Masterclass (30 min)",
        url: "https://www.youtube.com/watch?v=dOxUroR57xs",
        type: "article",
      },
      {
        title: "PromptBase - Prompt Templates & Examples",
        url: "https://promptbase.com/",
        type: "tool",
      },
      {
        title: "ChatGPT",
        url: "https://chat.openai.com/",
        type: "tool",
      },
      {
        title: "YouTube - Advanced Prompting Techniques (25 min)",
        url: "https://www.youtube.com/watch?v=L_Guz73e6fw",
        type: "article",
      },
      {
        title: "Claude AI - Prompt Optimization",
        url: "https://claude.ai/",
        type: "tool",
      },
      {
        title: "Notion - Prompt Template Library",
        url: "https://www.notion.so/",
        type: "tool",
      },
      {
        title: "YouTube - Role Prompting Techniques (20 min)",
        url: "https://www.youtube.com/watch?v=xJ-Yw0u3Qgk",
        type: "article",
      },
    ],
    miniProject: {
      title: "CRO-Focused Prompt Template Library",
      description: "Create and test 5 reusable prompt templates for CRO and psychology-based tasks",
      deliverable: "Document with 5 templates for hypothesis generation, content optimization, and UX analysis",
    },
    learningFocus: ["Role prompting", "Constraints and evaluation", "Prompt templates"],
  },
  {
    weekNumber: 7,
    month: 2,
    phase: "Content & CRO",
    title: "AI for CRO Hypothesis Generation & Testing",
    goal: "Learn to use AI to generate CRO hypotheses based on psychology, create A/B test variations, and analyze results.",
    objectives: [
      { id: "7-1", text: "Use AI to generate psychology-based CRO hypotheses" },
      { id: "7-2", text: "Create A/B test variations using AI" },
      { id: "7-3", text: "Use AI to analyze test results and recommend next steps" },
      { id: "7-4", text: "Apply psychology principles when prompting AI for CRO" },
      { id: "7-5", text: "Design an AI-enhanced A/B test plan for your business" },
    ],
    resources: [
      {
        title: "CXL - A/B Testing Masterclass (3 hours)",
        url: "https://cxl.com/institute/programs/ab-testing-training/",
        type: "course",
      },
      {
        title: "Optimizely - CRO Blog & Case Studies",
        url: "https://www.optimizely.com/blog/",
        type: "article",
      },
      {
        title: "VWO - A/B Testing Guide",
        url: "https://vwo.com/ab-testing/",
        type: "article",
      },
      {
        title: "YouTube - AI for A/B Testing (20 min)",
        url: "https://www.youtube.com/watch?v=p7nGcY2r3qs",
        type: "article",
      },
      {
        title: "Statsig - Experimentation Platform",
        url: "https://www.statsig.com/",
        type: "tool",
      },
      {
        title: "Convert - A/B Testing Platform",
        url: "https://www.convert.com/",
        type: "tool",
      },
      {
        title: "YouTube - Psychology-Based Hypothesis Generation (20 min)",
        url: "https://www.youtube.com/watch?v=xJ-Yw0u3Qgk",
        type: "article",
      },
      {
        title: "Shopify - A/B Testing & Experimentation Guide",
        url: "https://www.shopify.com/blog/ab-testing",
        type: "article",
      },
      {
        title: "VWO - Statistical Significance Calculator",
        url: "https://vwo.com/tools/ab-test-calculator/",
        type: "tool",
      },
      {
        title: "YouTube - AI Prompt for Test Variations (20 min)",
        url: "https://www.youtube.com/watch?v=kLQJh7Vr5Uw",
        type: "article",
      },
    ],
    miniProject: {
      title: "AI-Enhanced A/B Test Plan",
      description: "Design an A/B test using AI to generate psychology-based hypotheses",
      deliverable: "A/B test plan with 3-5 AI-generated hypotheses and success metrics",
    },
    learningFocus: ["Hypothesis generation", "A/B testing", "AI for CRO"],
  },
  {
    weekNumber: 8,
    month: 2,
    phase: "Content & CRO",
    title: "AI for Content Audits & CRO Opportunities",
    goal: "Learn to use AI to identify content gaps, optimize for psychology triggers, and find CRO opportunities.",
    objectives: [
      { id: "8-1", text: "Learn content gap analysis techniques with AI" },
      { id: "8-2", text: "Use AI to identify missing psychology triggers in content" },
      { id: "8-3", text: "Master content optimization for conversion" },
      { id: "8-4", text: "Identify CRO opportunities using AI analysis" },
      { id: "8-5", text: "Conduct an AI-assisted content audit for CRO" },
    ],
    resources: [
      {
        title: "DeepLearning.AI - Building Systems with ChatGPT (1.5 hours)",
        url: "https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/",
        type: "course",
      },
      {
        title: "Semrush - Content Audit Guide",
        url: "https://www.semrush.com/blog/content-audit/",
        type: "article",
      },
      {
        title: "Ahrefs - Content Gap Analysis",
        url: "https://ahrefs.com/blog/content-gap-analysis/",
        type: "article",
      },
      {
        title: "YouTube - AI Content Audit Framework (25 min)",
        url: "https://www.youtube.com/watch?v=tYzMGcUty6s",
        type: "article",
      },
      {
        title: "Google Analytics",
        url: "https://analytics.google.com/",
        type: "tool",
      },
      {
        title: "Screaming Frog - SEO Spider (Content Analysis)",
        url: "https://www.screamingfrog.co.uk/seo-spider/",
        type: "tool",
      },
      {
        title: "YouTube - Content Optimization for Conversion (20 min)",
        url: "https://www.youtube.com/watch?v=2Uw-4vPqJzQ",
        type: "article",
      },
      {
        title: "Moz - Content Optimization Best Practices",
        url: "https://moz.com/blog/content-optimization",
        type: "article",
      },
      {
        title: "ChatGPT - Content Gap Analysis Prompt",
        url: "https://chat.openai.com/",
        type: "tool",
      },
      {
        title: "YouTube - Psychology Triggers in Content (20 min)",
        url: "https://www.youtube.com/watch?v=5pUYHCL6Rvs",
        type: "article",
      },
    ],
    miniProject: {
      title: "AI-Assisted Content Audit for CRO",
      description: "Conduct an AI-assisted content audit for your clothing store focusing on psychology and conversion",
      deliverable: "Audit report with psychology trigger analysis and CRO optimization suggestions",
    },
    learningFocus: ["Content auditing", "Psychology optimization", "CRO opportunities"],
  },

  // MONTH 3: AI for Content Operations & CRO Workflows
  {
    weekNumber: 9,
    month: 3,
    phase: "Content & CRO",
    title: "AI for Content Operations & CRO Workflows",
    goal: "Understand how AI ensures style consistency, streamlines editorial workflows, and scales content while maintaining psychology and CRO best practices.",
    objectives: [
      { id: "9-1", text: "Learn style consistency techniques with AI" },
      { id: "9-2", text: "Understand editorial workflow automation" },
      { id: "9-3", text: "Master content scaling without quality loss" },
      { id: "9-4", text: "Integrate CRO and psychology best practices into content planning" },
      { id: "9-5", text: "Design an AI-assisted content workflow with CRO checkpoints" },
    ],
    resources: [
      {
        title: "DeepLearning.AI – Building Systems with ChatGPT (1.5 hours)",
        url: "https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/",
        type: "course",
      },
      {
        title: "Zapier – AI Workflow Automation Guide",
        url: "https://zapier.com/blog/ai-automation/",
        type: "article",
      },
      {
        title: "Make.com – Content Workflow Templates",
        url: "https://www.make.com/en/templates",
        type: "tool",
      },
      {
        title: "Notion AI – Content Templates",
        url: "https://www.notion.so/",
        type: "tool",
      },
      {
        title: "YouTube – Content Workflow Automation (20 min)",
        url: "https://www.youtube.com/watch?v=7_3nnpL9Kxc",
        type: "article",
      },
      {
        title: "Buffer – Content Calendar & Scheduling",
        url: "https://buffer.com/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "AI-Assisted Content Workflow Design",
      description: "Design an AI-assisted content workflow with CRO and psychology checkpoints",
      deliverable: "Workflow diagram showing AI integration points and CRO quality gates",
    },
    learningFocus: ["Content operations", "Workflow automation", "Quality at scale"],
  },
  {
    weekNumber: 10,
    month: 3,
    phase: "Content & CRO",
    title: "AI-Powered User Segmentation & Personalization",
    goal: "Learn about behavioral clustering and smart targeting with AI. Apply this to personalize content and offers based on psychology for CRO.",
    objectives: [
      { id: "10-1", text: "Understand behavioral clustering concepts" },
      { id: "10-2", text: "Learn predictive signals and smart targeting" },
      { id: "10-3", text: "Master personalization strategies based on psychology" },
      { id: "10-4", text: "Apply segmentation to CRO" },
      { id: "10-5", text: "Design AI-based customer segments with psychology in mind" },
    ],
    resources: [
      {
        title: "HubSpot Academy – AI for Marketing (2 hours)",
        url: "https://academy.hubspot.com/courses/ai-for-marketing",
        type: "course",
      },
      {
        title: "CXL – Segmentation & Personalization",
        url: "https://cxl.com/blog/segmentation/",
        type: "article",
      },
      {
        title: "YouTube – AI Personalization Strategies (25 min)",
        url: "https://www.youtube.com/watch?v=HZ1fIj0z8Zw",
        type: "article",
      },
      {
        title: "Segment – Customer Data Platform",
        url: "https://segment.com/",
        type: "tool",
      },
      {
        title: "Klaviyo – Email Segmentation & Personalization",
        url: "https://www.klaviyo.com/",
        type: "tool",
      },
      {
        title: "McKinsey – The Power of Personalization",
        url: "https://www.mckinsey.com/capabilities/growth-marketing-and-sales/our-insights/the-power-of-personalization",
        type: "article",
      },
    ],
    miniProject: {
      title: "AI-Based Customer Segmentation",
      description: "Design AI-based customer segments for your clothing brand with psychology-driven personalization",
      deliverable: "Segmentation strategy with personalized messaging for each segment",
    },
    learningFocus: ["Behavioral clustering", "Personalization", "Smart targeting"],
  },
  {
    weekNumber: 11,
    month: 3,
    phase: "Content & CRO",
    title: "AI + CMS Thinking (SFCC & CRO Integration)",
    goal: "Explore where AI sits within CMS workflows, governance, and human-in-the-loop models. Focus on dynamic content for personalization and testing.",
    objectives: [
      { id: "11-1", text: "Understand AI within CMS workflows" },
      { id: "11-2", text: "Learn governance and approval processes" },
      { id: "11-3", text: "Master human-in-the-loop models" },
      { id: "11-4", text: "Explore AI for dynamic content and personalization" },
      { id: "11-5", text: "Diagram SFCC + AI workflow with CRO integration points" },
    ],
    resources: [
      {
        title: "DeepLearning.AI – Building Systems with ChatGPT (1.5 hours)",
        url: "https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/",
        type: "course",
      },
      {
        title: "Salesforce SFCC Documentation",
        url: "https://documentation.b2c.commercecloud.salesforce.com/",
        type: "article",
      },
      {
        title: "Contentful – Headless CMS & AI",
        url: "https://www.contentful.com/",
        type: "tool",
      },
      {
        title: "YouTube – CMS + AI Integration (20 min)",
        url: "https://www.youtube.com/watch?v=mJxQYWwNCEU",
        type: "article",
      },
      {
        title: "Strapi – Open Source Headless CMS",
        url: "https://strapi.io/",
        type: "tool",
      },
      {
        title: "Gartner – CMS & AI Report",
        url: "https://www.gartner.com/en/documents/4017899",
        type: "article",
      },
    ],
    miniProject: {
      title: "SFCC + AI Workflow Diagram",
      description: "Create a conceptual diagram of SFCC + AI workflow with CRO integration",
      deliverable: "Visual diagram showing AI touchpoints and CRO optimization opportunities",
    },
    learningFocus: ["CMS integration", "Governance", "Dynamic content"],
  },
  {
    weekNumber: 12,
    month: 3,
    phase: "Content & CRO",
    title: "Content Performance + AI (GA4, Power BI & CRO)",
    goal: "Learn to use AI to analyze GA4 data, summarize reports, and turn insights into actionable CRO decisions.",
    objectives: [
      { id: "12-1", text: "Master GA4 data analysis with AI" },
      { id: "12-2", text: "Learn report summarization techniques" },
      { id: "12-3", text: "Understand content performance metrics for CRO" },
      { id: "12-4", text: "Connect performance data to CRO actions" },
      { id: "12-5", text: "Create a GA4 → AI insights → CRO decision flow" },
    ],
    resources: [
      {
        title: "Google Analytics Academy – GA4 Fundamentals (3 hours)",
        url: "https://analytics.google.com/analytics/academy/",
        type: "course",
      },
      {
        title: "YouTube – GA4 + AI Analysis (30 min)",
        url: "https://www.youtube.com/watch?v=fvNjPCjKqKs",
        type: "article",
      },
      {
        title: "Looker Studio – Data Visualization",
        url: "https://lookerstudio.google.com/",
        type: "tool",
      },
      {
        title: "Power BI – Analytics & Reporting",
        url: "https://www.microsoft.com/en-us/power-platform/products/power-bi",
        type: "tool",
      },
      {
        title: "Google Sheets – Data Analysis",
        url: "https://sheets.google.com/",
        type: "tool",
      },
      {
        title: "Ahrefs – GA4 Guide for Content Performance",
        url: "https://ahrefs.com/blog/ga4-guide/",
        type: "article",
      },
    ],
    miniProject: {
      title: "GA4 → AI Insights → CRO Decision",
      description: "Use AI to analyze GA4 data and propose CRO improvements",
      deliverable: "Analysis report with AI-generated insights and recommended CRO tests",
    },
    learningFocus: ["GA4 analysis", "Data storytelling", "CRO decisions"],
  },

  // MONTH 4: Advanced AI & Automation for CRO
  {
    weekNumber: 13,
    month: 4,
    phase: "Analytics & Automation",
    title: "AI + Analytics Storytelling for CRO (GA4 & Power BI)",
    goal: "Focus on asking the right questions, avoiding vanity metrics, and delivering decision-focused insights using AI to drive CRO.",
    objectives: [
      { id: "13-1", text: "Learn to ask the right analytical questions" },
      { id: "13-2", text: "Understand vanity metrics vs actionable metrics" },
      { id: "13-3", text: "Master data storytelling for CRO" },
      { id: "13-4", text: "Learn AI-powered insight generation" },
      { id: "13-5", text: "Create an AI-generated insight report with CRO recommendations" },
    ],
    resources: [
      {
        title: "Google Analytics Academy - GA4 Fundamentals (3 hours)",
        url: "https://analytics.google.com/analytics/academy/",
        type: "course",
      },
      {
        title: "YouTube - Data Storytelling for CRO (25 min)",
        url: "https://www.youtube.com/watch?v=6dCHzrfnsKI",
        type: "article",
      },
      {
        title: "CXL - Actionable Metrics for CRO",
        url: "https://cxl.com/blog/actionable-metrics/",
        type: "article",
      },
      {
        title: "Power BI - Analytics & Reporting",
        url: "https://www.microsoft.com/en-us/power-platform/products/power-bi",
        type: "tool",
      },
      {
        title: "Google Sheets - Data Analysis",
        url: "https://sheets.google.com/",
        type: "tool",
      },
      {
        title: "Looker Studio - Data Visualization",
        url: "https://lookerstudio.google.com/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "AI-Generated CRO Insight Report",
      description: "Create an insight report based on GA4/Power BI data with CRO focus",
      deliverable: "Report with AI-generated insights and actionable recommendations",
    },
    learningFocus: ["Data storytelling", "Actionable metrics", "CRO insights"],
  },
  {
    weekNumber: 14,
    month: 4,
    phase: "Analytics & Automation",
    title: "Automation Basics (APIs & Webhooks) for CRO",
    goal: "Understand what APIs and webhooks are conceptually, and explore no-code automation possibilities for CRO and marketing tasks.",
    objectives: [
      { id: "14-1", text: "Learn API concepts and use cases" },
      { id: "14-2", text: "Understand webhooks and event-driven automation" },
      { id: "14-3", text: "Explore no-code automation tools" },
      { id: "14-4", text: "Design automation flows for CRO" },
      { id: "14-5", text: "Create an AI-assisted automation flow design" },
    ],
    resources: [
      {
        title: "Zapier - No-Code Automation Platform",
        url: "https://zapier.com/",
        type: "tool",
      },
      {
        title: "Make - Workflow Automation",
        url: "https://www.make.com/",
        type: "tool",
      },
      {
        title: "YouTube - APIs & Webhooks Explained (20 min)",
        url: "https://www.youtube.com/watch?v=s7wmiS2mSXY",
        type: "article",
      },
      {
        title: "Postman - API Development & Testing",
        url: "https://www.postman.com/",
        type: "tool",
      },
      {
        title: "REST API Best Practices Guide",
        url: "https://restfulapi.net/",
        type: "article",
      },
      {
        title: "YouTube - No-Code Automation for Marketing (25 min)",
        url: "https://www.youtube.com/watch?v=2Uw-4vPqJzQ",
        type: "article",
      },
    ],
    miniProject: {
      title: "AI-Assisted Automation Flow Design",
      description: "Design an automation flow for SFCC or your clothing business",
      deliverable: "Flow diagram with automation steps and CRO integration points",
    },
    learningFocus: ["APIs", "Webhooks", "No-code automation"],
  },
  {
    weekNumber: 15,
    month: 4,
    phase: "Analytics & Automation",
    title: "RAG & Internal AI Tools for Growth",
    goal: "Learn about Retrieval Augmented Generation (RAG) and its application in internal knowledge assistants for marketing and CRO.",
    objectives: [
      { id: "15-1", text: "Understand RAG (Retrieval Augmented Generation)" },
      { id: "15-2", text: "Learn internal knowledge assistant use cases" },
      { id: "15-3", text: "Understand AI for customer support and personalization" },
      { id: "15-4", text: "Learn recommendation systems for CRO" },
      { id: "15-5", text: "Design a conceptual internal AI assistant for CRO" },
    ],
    resources: [
      {
        title: "DeepLearning.AI - RAG Systems (1 hour)",
        url: "https://www.deeplearning.ai/short-courses/retrieval-augmented-generation-rag/",
        type: "course",
      },
      {
        title: "YouTube - RAG Explained (20 min)",
        url: "https://www.youtube.com/watch?v=T-D1OfcDW1M",
        type: "article",
      },
      {
        title: "Notion AI - Knowledge Base",
        url: "https://www.notion.so/",
        type: "tool",
      },
      {
        title: "Langchain - RAG Framework",
        url: "https://www.langchain.com/",
        type: "tool",
      },
      {
        title: "OpenAI - Assistants API",
        url: "https://platform.openai.com/docs/assistants/overview",
        type: "article",
      },
      {
        title: "Anthropic - Claude API for Knowledge Systems",
        url: "https://docs.anthropic.com/claude/reference/getting-started-with-the-api",
        type: "article",
      },
    ],
    miniProject: {
      title: "Internal AI Assistant Design",
      description: "Design an AI assistant for your marketing team or CRO optimization",
      deliverable: "Conceptual design document with use cases and AI integration points",
    },
    learningFocus: ["RAG systems", "Knowledge assistants", "AI for support"],
  },
  {
    weekNumber: 16,
    month: 4,
    phase: "Analytics & Automation",
    title: "Ethics, Governance & Trust in AI for CRO",
    goal: "Understand data privacy, brand voice control, and the importance of human oversight in AI applications, especially in personalized marketing.",
    objectives: [
      { id: "16-1", text: "Learn data privacy and compliance (GDPR, CCPA)" },
      { id: "16-2", text: "Understand brand voice control in AI" },
      { id: "16-3", text: "Master human oversight in AI systems" },
      { id: "16-4", text: "Learn ethical considerations in personalization" },
      { id: "16-5", text: "Draft AI usage guidelines for your organization" },
    ],
    resources: [
      {
        title: "CXL - AI Ethics & Responsible AI",
        url: "https://cxl.com/blog/ai-ethics/",
        type: "article",
      },
      {
        title: "GDPR Official Documentation",
        url: "https://gdpr-info.eu/",
        type: "article",
      },
      {
        title: "YouTube - AI Ethics & Governance (25 min)",
        url: "https://www.youtube.com/watch?v=SZX9DM_qelI",
        type: "article",
      },
      {
        title: "Harvard - Responsible AI Framework",
        url: "https://www.harvard.edu/ai-responsible-use/",
        type: "article",
      },
      {
        title: "FTC - AI & Consumer Privacy Guidelines",
        url: "https://www.ftc.gov/business-guidance/blog/2023/02/keep-your-ai-honest",
        type: "article",
      },
      {
        title: "EU AI Act - Compliance Guide",
        url: "https://www.europarl.europa.eu/topics/en/article/20230601PRE93019/eu-ai-act-passed-by-parliament",
        type: "article",
      },
    ],
    miniProject: {
      title: "AI Usage Guidelines",
      description: "Draft AI usage guidelines for content creation and CRO",
      deliverable: "Guidelines document covering ethics, privacy, and governance",
    },
    learningFocus: ["Data privacy", "Ethics", "Governance"],
  },

  // MONTH 5: Portfolio Building
  {
    weekNumber: 17,
    month: 5,
    phase: "Portfolio",
    title: "Psychology-Driven CRO Case Study",
    goal: "Detail a project where you applied psychology principles to improve conversion (e.g., adding social proof, scarcity, or urgency to your clothing brand).",
    objectives: [
      { id: "17-1", text: "Identify a real CRO project based on psychology" },
      { id: "17-2", text: "Document the problem and initial state" },
      { id: "17-3", text: "Explain which psychology principles you applied" },
      { id: "17-4", text: "Detail the changes made" },
      { id: "17-5", text: "Measure and document the conversion impact" },
    ],
    resources: [
      {
        title: "Google Docs - Case Study Template",
        url: "https://docs.google.com/document/",
        type: "tool",
      },
      {
        title: "HubSpot - Case Study Writing Guide",
        url: "https://blog.hubspot.com/marketing/case-study-examples",
        type: "article",
      },
      {
        title: "YouTube - How to Write a Case Study (20 min)",
        url: "https://www.youtube.com/watch?v=UtAqVvOYcAk",
        type: "article",
      },
      {
        title: "Figma - Case Study Design Template",
        url: "https://www.figma.com/community/search?resource_type=file&q=case+study",
        type: "tool",
      },
      {
        title: "Notion - Portfolio & Case Study Template",
        url: "https://www.notion.so/",
        type: "tool",
      },
      {
        title: "Coda - Collaborative Case Study Template",
        url: "https://coda.io/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Psychology-Driven CRO Case Study",
      description: "Create a detailed case study of your psychology-based CRO project",
      deliverable: "Case study document with problem, psychology principles applied, and measured impact",
    },
    learningFocus: ["Case study writing", "Impact measurement", "Portfolio building"],
  },
  {
    weekNumber: 18,
    month: 5,
    phase: "Portfolio",
    title: "AI-Powered User Experience & Personalization for Conversion",
    goal: "Showcase a project where AI was used to design or enhance a user journey and personalization strategy, leading to improved conversion.",
    objectives: [
      { id: "18-1", text: "Identify a personalization/UX project" },
      { id: "18-2", text: "Document the user journey improvements" },
      { id: "18-3", text: "Explain AI's role in personalization" },
      { id: "18-4", text: "Detail implementation and testing" },
      { id: "18-5", text: "Measure conversion impact" },
    ],
    resources: [
      {
        title: "Figma - Design Documentation & Prototyping",
        url: "https://www.figma.com/",
        type: "tool",
      },
      {
        title: "YouTube - UX Case Study Presentation (25 min)",
        url: "https://www.youtube.com/watch?v=MkJZrRfXEtQ",
        type: "article",
      },
      {
        title: "Nielsen Norman - UX Case Study Best Practices",
        url: "https://www.nngroup.com/articles/case-studies/",
        type: "article",
      },
      {
        title: "Miro - User Journey Mapping & Collaboration",
        url: "https://miro.com/",
        type: "tool",
      },
      {
        title: "Adobe XD - Prototyping & Design",
        url: "https://www.adobe.com/products/xd.html",
        type: "tool",
      },
      {
        title: "Maze - User Testing & Feedback",
        url: "https://maze.co/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Personalization & UX Case Study",
      description: "Create a case study of your AI-powered personalization project",
      deliverable: "Case study with journey maps, design changes, and conversion metrics",
    },
    learningFocus: ["UX design", "Personalization", "Conversion optimization"],
  },
  {
    weekNumber: 19,
    month: 5,
    phase: "Portfolio",
    title: "Analytics → AI Insights → CRO Business Decision",
    goal: "Present a project demonstrating how you used AI to extract actionable insights from GA4/Power BI data, leading to a specific, implemented CRO decision.",
    objectives: [
      { id: "19-1", text: "Identify a data-driven CRO decision" },
      { id: "19-2", text: "Document the data analysis process" },
      { id: "19-3", text: "Explain AI's role in insight generation" },
      { id: "19-4", text: "Detail the CRO decision and implementation" },
      { id: "19-5", text: "Measure and document business impact" },
    ],
    resources: [
      {
        title: "Google Sheets - Data Visualization & Analysis",
        url: "https://sheets.google.com/",
        type: "tool",
      },
      {
        title: "YouTube - Data-Driven Decision Making (25 min)",
        url: "https://www.youtube.com/watch?v=zHcQPKp5e8A",
        type: "article",
      },
      {
        title: "Looker Studio - Interactive Dashboards",
        url: "https://lookerstudio.google.com/",
        type: "tool",
      },
      {
        title: "Power BI - Advanced Analytics & Reporting",
        url: "https://www.microsoft.com/en-us/power-platform/products/power-bi",
        type: "tool",
      },
      {
        title: "Tableau - Data Storytelling",
        url: "https://www.tableau.com/",
        type: "tool",
      },
      {
        title: "CXL - Data-Driven CRO Decision Framework",
        url: "https://cxl.com/blog/data-driven-cro/",
        type: "article",
      },
    ],
    miniProject: {
      title: "Analytics-Driven CRO Case Study",
      description: "Create a case study of your data-driven CRO decision",
      deliverable: "Case study with data analysis, AI insights, and measured impact",
    },
    learningFocus: ["Data analysis", "Decision making", "Impact measurement"],
  },
  {
    weekNumber: 20,
    month: 5,
    phase: "Portfolio",
    title: "Polish & Document Portfolio",
    goal: "Refine all projects, clearly articulating the problem, why psychology/AI and CRO were used, what changed, and the measurable impact.",
    objectives: [
      { id: "20-1", text: "Review and refine all 3 case studies" },
      { id: "20-2", text: "Ensure consistent formatting and structure" },
      { id: "20-3", text: "Add visuals and supporting materials" },
      { id: "20-4", text: "Create a portfolio index/overview page" },
      { id: "20-5", text: "Consolidate everything into a Notion or Google Doc portfolio" },
    ],
    resources: [
      {
        title: "Notion - Portfolio & Case Study Templates",
        url: "https://www.notion.so/",
        type: "tool",
      },
      {
        title: "Google Docs - Professional Portfolio Template",
        url: "https://docs.google.com/document/",
        type: "tool",
      },
      {
        title: "YouTube - Portfolio Presentation Tips (20 min)",
        url: "https://www.youtube.com/watch?v=qwKjHWMCVKs",
        type: "article",
      },
      {
        title: "Webflow - Portfolio Website Builder",
        url: "https://webflow.com/",
        type: "tool",
      },
      {
        title: "Carrd - Simple Portfolio Site",
        url: "https://carrd.co/",
        type: "tool",
      },
      {
        title: "Dribbble - Design Portfolio Inspiration",
        url: "https://dribbble.com/",
        type: "article",
      },
    ],
    miniProject: {
      title: "Complete Portfolio Documentation",
      description: "Polish and consolidate all portfolio projects into a cohesive portfolio",
      deliverable: "Final portfolio (Notion or Google Doc) with all 3 case studies and overview",
    },
    learningFocus: ["Portfolio presentation", "Documentation", "Professional writing"],
  },

  // MONTH 6: Positioning & Job Readiness
  {
    weekNumber: 21,
    month: 6,
    phase: "Positioning",
    title: "CV Repositioning",
    goal: "Update your CV to highlight your new psychology, CRO, and AI skills, shifting from 'content' to 'Growth & CRO Specialist (AI-Powered)' with impact-driven bullets.",
    objectives: [
      { id: "21-1", text: "Review your current CV" },
      { id: "21-2", text: "Reframe content management experience as growth-focused" },
      { id: "21-3", text: "Add psychology, CRO, and AI skills section" },
      { id: "21-4", text: "Highlight measurable business impact" },
      { id: "21-5", text: "Update professional headline and summary" },
    ],
    resources: [
      {
        title: "Google Docs - CV Template",
        url: "https://docs.google.com/document/",
        type: "tool",
      },
      {
        title: "YouTube - How to Write an Impactful CV (20 min)",
        url: "https://www.youtube.com/watch?v=Tt08KYy5bPw",
        type: "article",
      },
      {
        title: "The Muse - CV Writing Tips",
        url: "https://www.themuse.com/advice/how-to-write-a-resume",
        type: "article",
      },
      {
        title: "LinkedIn - CV Best Practices",
        url: "https://www.linkedin.com/help/linkedin/answer/a1342",
        type: "article",
      },
      {
        title: "Canva - CV Design Templates",
        url: "https://www.canva.com/templates/resumes/",
        type: "tool",
      },
      {
        title: "Novoresume - AI CV Builder",
        url: "https://www.novoresume.com/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Updated CV",
      description: "Reposition your CV to highlight psychology, CRO, and AI expertise",
      deliverable: "Updated CV emphasizing growth, psychology, and AI skills",
    },
    learningFocus: ["CV writing", "Impact communication", "Personal branding"],
  },
  {
    weekNumber: 22,
    month: 6,
    phase: "Positioning",
    title: "LinkedIn Positioning",
    goal: "Optimize your LinkedIn profile: headline, about section, and feature your new psychology + CRO + AI portfolio projects.",
    objectives: [
      { id: "22-1", text: "Update LinkedIn headline with new role focus" },
      { id: "22-2", text: "Rewrite about section highlighting psychology, CRO, and AI expertise" },
      { id: "22-3", text: "Add portfolio projects to featured section" },
      { id: "22-4", text: "Update skills section with psychology, CRO, and AI keywords" },
      { id: "22-5", text: "Optimize for discoverability" },
    ],
    resources: [
      {
        title: "LinkedIn - Profile Optimization Guide",
        url: "https://www.linkedin.com/help/linkedin/answer/a541981",
        type: "article",
      },
      {
        title: "YouTube - LinkedIn Profile Optimization (25 min)",
        url: "https://www.youtube.com/watch?v=TYzHJzVeIZo",
        type: "article",
      },
      {
        title: "The Muse - LinkedIn Profile Tips",
        url: "https://www.themuse.com/advice/how-to-optimize-your-linkedin-profile",
        type: "article",
      },
      {
        title: "LinkedIn - Featured Section Guide",
        url: "https://www.linkedin.com/help/linkedin/answer/a541981",
        type: "article",
      },
      {
        title: "Hootsuite - LinkedIn SEO Keywords",
        url: "https://blog.hootsuite.com/linkedin-keywords/",
        type: "article",
      },
      {
        title: "LinkedIn - Headline Best Practices",
        url: "https://www.linkedin.com/help/linkedin/answer/a541981",
        type: "article",
      },
    ],
    miniProject: {
      title: "LinkedIn Profile Optimization",
      description: "Optimize your LinkedIn profile for psychology, CRO, and AI roles",
      deliverable: "Updated LinkedIn profile with new headline, about, and featured projects",
    },
    learningFocus: ["Personal branding", "LinkedIn optimization", "Visibility"],
  },
  {
    weekNumber: 23,
    month: 6,
    phase: "Positioning",
    title: "Job Targeting & Networking",
    goal: "Actively search for roles like Growth Marketing Manager, CRO Specialist, Martech Specialist (AI), E-commerce Optimization Specialist. Network with professionals in these fields.",
    objectives: [
      { id: "23-1", text: "Identify target job titles and companies" },
      { id: "23-2", text: "Research growth and CRO roles in your industry" },
      { id: "23-3", text: "Build a networking list of professionals" },
      { id: "23-4", text: "Engage with industry content and communities" },
      { id: "23-5", text: "Apply to 5-10 relevant positions" },
    ],
    resources: [
      {
        title: "LinkedIn - Job Search",
        url: "https://www.linkedin.com/jobs/",
        type: "tool",
      },
      {
        title: "YouTube - Job Search Strategy (20 min)",
        url: "https://www.youtube.com/watch?v=EqhYHKAMqFE",
        type: "article",
      },
      {
        title: "Growth Marketing Pro - Community & Resources",
        url: "https://www.growthmarketingpro.com/",
        type: "article",
      },
      {
        title: "CRO Collective - Industry Community",
        url: "https://www.crocollective.com/",
        type: "article",
      },
      {
        title: "Indeed - Job Board",
        url: "https://www.indeed.com/",
        type: "tool",
      },
      {
        title: "AngelList - Startup Jobs",
        url: "https://angel.co/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Job Search & Networking Plan",
      description: "Create a strategic job search and networking plan",
      deliverable: "List of target roles, companies, and networking contacts",
    },
    learningFocus: ["Job search strategy", "Networking", "Career planning"],
  },
  {
    weekNumber: 24,
    month: 6,
    phase: "Positioning",
    title: "Interview Preparation",
    goal: "Practice explaining psychology, CRO, and AI concepts simply, discussing trade-offs, and demonstrating judgment over hype and a focus on measurable results.",
    objectives: [
      { id: "24-1", text: "Practice explaining psychology and CRO concepts to non-technical people" },
      { id: "24-2", text: "Prepare answers about AI trade-offs and limitations" },
      { id: "24-3", text: "Develop case study presentations" },
      { id: "24-4", text: "Practice discussing CRO methodology and results" },
      { id: "24-5", text: "Prepare questions to ask interviewers" },
    ],
    resources: [
      {
        title: "The Muse - Interview Tips & Preparation",
        url: "https://www.themuse.com/advice/interview-tips",
        type: "article",
      },
      {
        title: "YouTube - STAR Method for Interviews (20 min)",
        url: "https://www.youtube.com/watch?v=ADJ72Rw5yVE",
        type: "article",
      },
      {
        title: "Glassdoor - Company Interview Reviews",
        url: "https://www.glassdoor.com/",
        type: "tool",
      },
      {
        title: "YouTube - Case Study Presentation (25 min)",
        url: "https://www.youtube.com/watch?v=MkJZrRfXEtQ",
        type: "article",
      },
      {
        title: "HubSpot - Interview Preparation Checklist",
        url: "https://blog.hubspot.com/hiring/job-interview-tips",
        type: "article",
      },
      {
        title: "LinkedIn - Interview Tips",
        url: "https://www.linkedin.com/advice/0/how-can-you-prepare-interview",
        type: "article",
      },
    ],
    miniProject: {
      title: "Interview Preparation Materials",
      description: "Create materials and practice for interviews",
      deliverable: "Interview prep notes with key talking points and case study presentations",
    },
    learningFocus: ["Communication skills", "Interview technique", "Storytelling"],
  },
  // MONTH 1: Foundation & Positioning
  {
    weekNumber: 25,
    month: 7,
    phase: "Personal Brand",
    title: "Define Your Brand Voice & Narrative",
    goal: "Establish your authentic personal brand voice and craft your core narrative around your 5-year weight loss journey - the struggle, cycles, and resilience.",
    objectives: [
      { id: "25-1", text: "Document your weight loss journey story (why, struggles, current state)" },
      { id: "25-2", text: "Define your brand voice (raw, authentic, relatable, honest)" },
      { id: "25-3", text: "Create 3-5 core narrative angles (struggle, resilience, body confidence)" },
      { id: "25-4", text: "Write your About Me section for Instagram" },
      { id: "25-5", text: "Identify your target audience (women on fitness journeys, plus-size community)" },
    ],
    resources: [
      {
        title: "YouTube - Personal Brand Storytelling Framework (20 min)",
        url: "https://www.youtube.com/watch?v=Kc0lmrNkBFI",
        type: "article",
      },
      {
        title: "Brene Brown - The Power of Vulnerability (TED Talk)",
        url: "https://www.youtube.com/watch?v=iCvmsMzlF7o",
        type: "article",
      },
      {
        title: "Later - Instagram Bio Best Practices",
        url: "https://later.com/blog/instagram-bio/",
        type: "article",
      },
      {
        title: "YouTube - How to Write an Engaging Instagram Bio (15 min)",
        url: "https://www.youtube.com/watch?v=gqCMxL6P0Aw",
        type: "article",
      },
      {
        title: "Canva - Brand Kit & Templates",
        url: "https://www.canva.com/",
        type: "tool",
      },
      {
        title: "Google Docs - Personal Brand Guide Template",
        url: "https://docs.google.com/document/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Personal Brand Foundation Document",
      description: "Create a comprehensive brand guide for your personal brand",
      deliverable: "1-page brand guide with story, voice, audience, and core narratives",
    },
    learningFocus: ["Personal branding", "Storytelling", "Audience definition"],
  },
  {
    weekNumber: 25,
    month: 7,
    phase: "Business Brand",
    title: "Refine Your Business Positioning & India Launch Strategy",
    goal: "Solidify your clothing brand positioning around quality + confidence for plus-size women. Plan your India market entry strategy.",
    objectives: [
      { id: "25-B1", text: "Document your brand story (why you started, quality obsession, plus-size focus)" },
      { id: "25-B2", text: "Define your unique value proposition (quality fabrics, affordable luxury, body confidence)" },
      { id: "25-B3", text: "Research India market (competitors, pricing, preferences, platforms)" },
      { id: "25-B4", text: "Plan India launch strategy (pricing, inventory, marketing channels)" },
      { id: "25-B5", text: "Audit your current Shopify and Instagram (what's working, what needs improvement)" },
    ],
    resources: [
      {
        title: "YouTube - India E-commerce Market 2024 (25 min)",
        url: "https://www.youtube.com/watch?v=kHQF5xTZkKs",
        type: "article",
      },
      {
        title: "Shopify - India Store Setup Guide",
        url: "https://www.shopify.com/en-in",
        type: "tool",
      },
      {
        title: "YouTube - Fashion Brand Positioning Strategy (20 min)",
        url: "https://www.youtube.com/watch?v=5pUYHCL6Rvs",
        type: "article",
      },
      {
        title: "Statista - India Fashion Market Report",
        url: "https://www.statista.com/outlook/cmo/fashion/india",
        type: "article",
      },
      {
        title: "YouTube - Plus-Size Fashion Market Trends (20 min)",
        url: "https://www.youtube.com/watch?v=jHXvlvXFHQk",
        type: "article",
      },
      {
        title: "Notion - Business Plan Template",
        url: "https://www.notion.so/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "India Launch Strategy Document",
      description: "Create a comprehensive India market entry plan",
      deliverable: "India launch strategy with market research, pricing, inventory, and marketing plan",
    },
    learningFocus: ["Market research", "Business strategy", "International expansion"],
  },

  // MONTH 2: Content Creation System
  {
    weekNumber: 26,
    month: 7,
    phase: "Personal Brand",
    title: "Build Your Content Creation System (AI-Powered)",
    goal: "Create a sustainable content machine using AI for ideation, scheduling, and analytics. Plan 4 weeks of content in advance.",
    objectives: [
      { id: "26-1", text: "Set up content calendar (4 weeks planned in advance)" },
      { id: "26-2", text: "Learn to use AI for content ideation (ChatGPT, Claude for caption ideas)" },
      { id: "26-3", text: "Set up content scheduling tool (Buffer, Later, or Meta Business Suite)" },
      { id: "26-4", text: "Define content pillars (4-5 themes: struggle, wins, tips, community, raw moments)" },
      { id: "26-5", text: "Create content templates (carousel, Reel, Stories, captions)" },
    ],
    resources: [
      {
        title: "YouTube - ChatGPT for Instagram Content Ideas (20 min)",
        url: "https://www.youtube.com/watch?v=kLQJh7Vr5Uw",
        type: "article",
      },
      {
        title: "Buffer - Content Scheduling Tool",
        url: "https://buffer.com/",
        type: "tool",
      },
      {
        title: "YouTube - Instagram Content Pillars Strategy (20 min)",
        url: "https://www.youtube.com/watch?v=Yt0Ky_0fBfM",
        type: "article",
      },
      {
        title: "Later - Content Calendar & Planner",
        url: "https://later.com/",
        type: "tool",
      },
      {
        title: "Hootsuite - Social Media Content Calendar Template",
        url: "https://hootsuite.com/resources/templates/social-media-content-calendar",
        type: "tool",
      },
      {
        title: "Claude AI - Content Brainstorming",
        url: "https://claude.ai/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "4-Week Content Calendar",
      description: "Plan and schedule 4 weeks of authentic personal brand content",
      deliverable: "Content calendar with 20+ posts scheduled (mix of Reels, Stories, Carousels, captions)",
    },
    learningFocus: ["Content strategy", "AI tools", "Scheduling"],
  },
  {
    weekNumber: 26,
    month: 7,
    phase: "Business Brand",
    title: "Optimize Shopify & Instagram for Conversions (CRO Principles)",
    goal: "Apply psychology + CRO principles from Phase 1 to your Shopify and Instagram. Improve product pages and conversion funnel.",
    objectives: [
      { id: "26-B1", text: "Audit product pages for psychological triggers (social proof, scarcity, authority)" },
      { id: "26-B2", text: "Rewrite product descriptions using emotional language + fabric benefits" },
      { id: "26-B3", text: "Add customer testimonials and before/after confidence stories" },
      { id: "26-B4", text: "Optimize Instagram bio and link (clear value prop, CTA)" },
      { id: "26-B5", text: "Set up analytics tracking (Google Analytics, Shopify insights)" },
    ],
    resources: [
      {
        title: "Shopify - Product Page Optimization Guide",
        url: "https://www.shopify.com/blog/product-page-optimization",
        type: "article",
      },
      {
        title: "YouTube - E-commerce Copywriting Psychology (25 min)",
        url: "https://www.youtube.com/watch?v=xJsKT7bVBFc",
        type: "article",
      },
      {
        title: "Google Analytics for Shopify",
        url: "https://www.google.com/analytics/",
        type: "tool",
      },
      {
        title: "YouTube - Conversion Rate Optimization for E-commerce (20 min)",
        url: "https://www.youtube.com/watch?v=2Uw-4vPqJzQ",
        type: "article",
      },
      {
        title: "Trustpilot - Customer Reviews & Social Proof",
        url: "https://www.trustpilot.com/",
        type: "tool",
      },
      {
        title: "Shopify - A/B Testing Guide",
        url: "https://www.shopify.com/blog/ab-testing",
        type: "article",
      },
    ],
    miniProject: {
      title: "Optimized Product Pages & Funnel",
      description: "Rewrite and optimize all product pages using CRO + psychology principles",
      deliverable: "Updated product pages with emotional copy, social proof, and optimized funnel",
    },
    learningFocus: ["CRO application", "Copywriting", "Conversion optimization"],
  },

  // MONTH 3: Community Building & Growth
  {
    weekNumber: 27,
    month: 8,
    phase: "Personal Brand",
    title: "Launch Consistent Content & Build Community",
    goal: "Start posting consistently (3-4x per week). Engage authentically with your audience. Build your first community of followers.",
    objectives: [
      { id: "27-1", text: "Post 3-4 times per week (mix of Reels, Stories, Carousels)" },
      { id: "27-2", text: "Respond to every comment and DM within 24 hours" },
      { id: "27-3", text: "Engage with 20+ similar accounts daily (like, comment, follow)" },
      { id: "27-4", text: "Share 2-3 raw, vulnerable moments (the struggle, not just wins)" },
      { id: "27-5", text: "Track engagement metrics (reach, saves, shares, comments)" },
    ],
    resources: [
      {
        title: "YouTube - Instagram Algorithm Explained 2024 (20 min)",
        url: "https://www.youtube.com/watch?v=6dCHzrfnsKI",
        type: "article",
      },
      {
        title: "YouTube - Authentic Engagement Strategy (20 min)",
        url: "https://www.youtube.com/watch?v=xJ-Yw0u3Qgk",
        type: "article",
      },
      {
        title: "YouTube - Instagram Reel Ideas for Fitness (25 min)",
        url: "https://www.youtube.com/watch?v=LQvVWKwqvPE",
        type: "article",
      },
      {
        title: "Meta Business Suite - Analytics & Insights",
        url: "https://business.facebook.com/",
        type: "tool",
      },
      {
        title: "Later - Instagram Analytics & Reporting",
        url: "https://later.com/analytics/",
        type: "tool",
      },
      {
        title: "Sprout Social - Community Engagement Tools",
        url: "https://sproutsocial.com/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Community Engagement Report",
      description: "Document your engagement efforts and community growth",
      deliverable: "Monthly report: follower growth, engagement rate, top-performing content, feedback",
    },
    learningFocus: ["Community building", "Engagement", "Content consistency"],
  },
  {
    weekNumber: 27,
    month: 8,
    phase: "Business Brand",
    title: "Launch Content Marketing & Customer Stories",
    goal: "Create content that showcases your products through customer stories and confidence journeys. Build trust and social proof.",
    objectives: [
      { id: "27-B1", text: "Reach out to 10 customers for testimonials and confidence stories" },
      { id: "27-B2", text: "Create 5 customer feature posts (Instagram posts/Reels)" },
      { id: "27-B3", text: "Post 2-3 times per week (product features, customer stories, behind-the-scenes)" },
      { id: "27-B4", text: "Create educational content (fabric care, durability, sustainability)" },
      { id: "27-B5", text: "Set up email list (Shopify newsletter or Mailchimp)" },
    ],
    resources: [
      {
        title: "YouTube - User-Generated Content Strategy (20 min)",
        url: "https://www.youtube.com/watch?v=kQlSVJGQqXQ",
        type: "article",
      },
      {
        title: "Mailchimp - Email Marketing Platform",
        url: "https://mailchimp.com/",
        type: "tool",
      },
      {
        title: "YouTube - Behind-the-Scenes Content for Brands (20 min)",
        url: "https://www.youtube.com/watch?v=xQmzXqzBQXI",
        type: "article",
      },
      {
        title: "Shopify - Email Marketing Integration",
        url: "https://www.shopify.com/apps/email-marketing",
        type: "tool",
      },
      {
        title: "Zapier - Automate Customer Testimonials",
        url: "https://zapier.com/",
        type: "tool",
      },
      {
        title: "YouTube - How to Get Customer Testimonials (20 min)",
        url: "https://www.youtube.com/watch?v=5pUYHCL6Rvs",
        type: "article",
      },
    ],
    miniProject: {
      title: "Customer Stories & Content Library",
      description: "Build a library of customer testimonials and feature content",
      deliverable: "5 customer feature posts + email newsletter setup + content calendar",
    },
    learningFocus: ["Content marketing", "Social proof", "Customer engagement"],
  },

  // MONTH 4: Scaling & India Launch
  {
    weekNumber: 28,
    month: 8,
    phase: "Personal Brand",
    title: "Deepen Vulnerability & Build Micro-Community",
    goal: "Share deeper, more vulnerable moments. Start building a micro-community of engaged followers who feel connected to your journey.",
    objectives: [
      { id: "28-1", text: "Share 2-3 raw, unfiltered moments (struggles, setbacks, real body moments)" },
      { id: "28-2", text: "Start a weekly Real Talk series (honest conversations about weight, body image)" },
      { id: "28-3", text: "Engage with followers stories (ask questions, build relationships)" },
      { id: "28-4", text: "Create a simple email list or WhatsApp group for close followers" },
      { id: "28-5", text: "Analyze what content resonates most (saves, shares, comments)" },
    ],
    resources: [
      {
        title: "YouTube - Building Parasocial Relationships (20 min)",
        url: "https://www.youtube.com/watch?v=5pUYHCL6Rvs",
        type: "article",
      },
      {
        title: "YouTube - Vulnerability in Content Creation (20 min)",
        url: "https://www.youtube.com/watch?v=iCvmsMzlF7o",
        type: "article",
      },
      {
        title: "YouTube - Building Email List from Instagram (20 min)",
        url: "https://www.youtube.com/watch?v=kLQJh7Vr5Uw",
        type: "article",
      },
      {
        title: "Mailchimp - Email List Building Guide",
        url: "https://mailchimp.com/resources/email-marketing-guide/",
        type: "article",
      },
      {
        title: "Zapier - Instagram to Email Automation",
        url: "https://zapier.com/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Vulnerability & Community Building Series",
      description: "Create a 4-week series of vulnerable, authentic content",
      deliverable: "4-week content series + email list with 100+ subscribers + engagement metrics",
    },
    learningFocus: ["Vulnerability", "Community building", "Authenticity"],
  },
  {
    weekNumber: 28,
    month: 8,
    phase: "Business Brand",
    title: "India Market Soft Launch & Pricing Strategy",
    goal: "Launch in India with a soft launch strategy. Test pricing, inventory, and marketing channels. Build initial customer base.",
    objectives: [
      { id: "28-B1", text: "Set up Shopify for India (INR pricing, shipping, payment methods)" },
      { id: "28-B2", text: "Determine India pricing strategy (cost + market research)" },
      { id: "28-B3", text: "Create India-specific product listings and descriptions" },
      { id: "28-B4", text: "Launch soft beta with 50-100 India customers" },
      { id: "28-B5", text: "Gather feedback and optimize based on India customer needs" },
    ],
    resources: [
      {
        title: "Shopify Multi-Currency Setup",
        url: "https://www.shopify.com/blog/multi-currency",
        type: "article",
      },
      {
        title: "YouTube - India Ecommerce Shipping & Logistics (20 min)",
        url: "https://www.youtube.com/watch?v=kHQF5xTZkKs",
        type: "article",
      },
      {
        title: "YouTube - International Pricing Strategy (20 min)",
        url: "https://www.youtube.com/watch?v=2Uw-4vPqJzQ",
        type: "article",
      },
      {
        title: "Shiprocket - India Shipping Platform",
        url: "https://www.shiprocket.in/",
        type: "tool",
      },
      {
        title: "Razorpay - India Payment Gateway",
        url: "https://razorpay.com/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "India Soft Launch Report",
      description: "Execute and document your India market soft launch",
      deliverable: "India Shopify setup + 50+ first customers + feedback report + pricing analysis",
    },
    learningFocus: ["International expansion", "Market testing", "Pricing strategy"],
  },

  // MONTH 5: Scaling & Monetization
  {
    weekNumber: 29,
    month: 9,
    phase: "Personal Brand",
    title: "Grow to 5K+ Followers & Explore Monetization",
    goal: "Scale your personal brand to 5K+ followers. Explore early monetization opportunities (affiliate, sponsorships, courses).",
    objectives: [
      { id: "29-1", text: "Reach 5K followers milestone" },
      { id: "29-2", text: "Apply for Instagram Partner Program (monetization)" },
      { id: "29-3", text: "Identify 3-5 affiliate opportunities (fitness products, apps, books)" },
      { id: "29-4", text: "Pitch 5 micro-brands for sponsorships (fitness, fashion, wellness)" },
      { id: "29-5", text: "Create a Recommended Products page (affiliate links)" },
    ],
    resources: [
      {
        title: "Instagram Monetization Program",
        url: "https://www.instagram.com/",
        type: "tool",
      },
      {
        title: "YouTube - Affiliate Marketing for Creators (20 min)",
        url: "https://www.youtube.com/watch?v=xJ-Yw0u3Qgk",
        type: "article",
      },
      {
        title: "YouTube - Sponsorship Pitch Template (20 min)",
        url: "https://www.youtube.com/watch?v=5pUYHCL6Rvs",
        type: "article",
      },
      {
        title: "ShareASale - Affiliate Network",
        url: "https://www.shareasale.com/",
        type: "tool",
      },
      {
        title: "Impact - Affiliate Marketing Platform",
        url: "https://impact.com/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Monetization Strategy & Partnerships",
      description: "Develop and execute your personal brand monetization strategy",
      deliverable: "5K+ followers + 3 affiliate partnerships + 2 brand sponsorship deals",
    },
    learningFocus: ["Monetization", "Partnerships", "Business development"],
  },
  {
    weekNumber: 29,
    month: 9,
    phase: "Business Brand",
    title: "Scale UAE Operations & India Growth",
    goal: "Grow from 1 order/month to 10+ orders/month in UAE. Scale India to 5+ orders/month. Optimize based on data.",
    objectives: [
      { id: "29-B1", text: "Analyze UAE sales data (top products, demographics, repeat rate)" },
      { id: "29-B2", text: "Run targeted Instagram/TikTok ads (UAE + India)" },
      { id: "29-B3", text: "Reach out to UAE fashion influencers for collaborations" },
      { id: "29-B4", text: "Optimize India product listings based on feedback" },
      { id: "29-B5", text: "Track metrics: CAC, LTV, conversion rate, repeat customer rate" },
    ],
    resources: [
      {
        title: "Instagram Ads for E-commerce",
        url: "https://www.facebook.com/business/ads/",
        type: "tool",
      },
      {
        title: "YouTube - E-commerce Metrics & KPIs (20 min)",
        url: "https://www.youtube.com/watch?v=2Uw-4vPqJzQ",
        type: "article",
      },
      {
        title: "YouTube - Influencer Collaboration Strategy (20 min)",
        url: "https://www.youtube.com/watch?v=xJ-Yw0u3Qgk",
        type: "article",
      },
      {
        title: "Shopify - Analytics & Reporting",
        url: "https://www.shopify.com/blog/analytics",
        type: "article",
      },
      {
        title: "HubSpot - Influencer Marketing Guide",
        url: "https://blog.hubspot.com/marketing/influencer-marketing",
        type: "article",
      },
    ],
    miniProject: {
      title: "Growth & Scaling Report",
      description: "Document your UAE and India growth metrics and strategies",
      deliverable: "Sales analysis + ad performance report + influencer partnerships + growth projections",
    },
    learningFocus: ["Growth hacking", "Paid advertising", "Analytics"],
  },

  // MONTH 6: Integration & Future Planning
  {
    weekNumber: 30,
    month: 9,
    phase: "Personal Brand",
    title: "Document Your Journey & Plan Phase 3",
    goal: "Consolidate your learnings, document your journey, and plan the next phase (courses, community, bigger projects).",
    objectives: [
      { id: "30-1", text: "Create a My Journey video or carousel (5-year transformation)" },
      { id: "30-2", text: "Document key learnings and insights from Phase 2" },
      { id: "30-3", text: "Analyze what content performed best and why" },
      { id: "30-4", text: "Plan Phase 3 (course, community, bigger monetization)" },
      { id: "30-5", text: "Set goals for next 6 months" },
    ],
    resources: [
      {
        title: "YouTube - Creating Transformation Content (20 min)",
        url: "https://www.youtube.com/watch?v=5pUYHCL6Rvs",
        type: "article",
      },
      {
        title: "YouTube - Content Creator Business Planning (20 min)",
        url: "https://www.youtube.com/watch?v=xJ-Yw0u3Qgk",
        type: "article",
      },
      {
        title: "Notion - Business Planning Template",
        url: "https://www.notion.so/",
        type: "tool",
      },
      {
        title: "Canva - Transformation Content Templates",
        url: "https://www.canva.com/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Phase 2 Reflection & Phase 3 Planning",
      description: "Document your Phase 2 journey and plan your next steps",
      deliverable: "Transformation video + Phase 2 learnings document + Phase 3 strategic plan",
    },
    learningFocus: ["Reflection", "Strategic planning", "Future vision"],
  },
  {
    weekNumber: 30,
    month: 9,
    phase: "Business Brand",
    title: "Consolidate India Launch & Plan Year 2 Growth",
    goal: "Consolidate your India market position. Document learnings from both markets. Plan aggressive Year 2 growth strategy.",
    objectives: [
      { id: "30-B1", text: "Analyze India vs UAE market differences and preferences" },
      { id: "30-B2", text: "Document what worked and what didn't in Phase 2" },
      { id: "30-B3", text: "Create a Year 2 growth plan (revenue targets, product expansion, new markets)" },
      { id: "30-B4", text: "Plan product line expansion (new styles, sizes, fabrics)" },
      { id: "30-B5", text: "Build a team/outsourcing plan (if scaling beyond 50+ orders/month)" },
    ],
    resources: [
      {
        title: "YouTube - E-commerce Business Planning & Forecasting (20 min)",
        url: "https://www.youtube.com/watch?v=2Uw-4vPqJzQ",
        type: "article",
      },
      {
        title: "YouTube - Product Line Expansion Strategy (20 min)",
        url: "https://www.youtube.com/watch?v=xJ-Yw0u3Qgk",
        type: "article",
      },
      {
        title: "Shopify - Product Line Expansion Guide",
        url: "https://www.shopify.com/blog/product-expansion",
        type: "article",
      },
      {
        title: "Excel - Financial Forecasting Template",
        url: "https://templates.office.com/en-us/templates/excel",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Year 2 Strategic Growth Plan",
      description: "Create a comprehensive Year 2 business growth strategy",
      deliverable: "Market analysis + Year 2 revenue projections + product expansion plan + team strategy",
    },
    learningFocus: ["Strategic planning", "Business scaling", "Market analysis"],
  },
];
