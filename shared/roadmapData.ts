export type Phase = "Foundations" | "Content & CRO" | "Analytics & Automation" | "Portfolio" | "Positioning";

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

export const roadmapData: Week[] = [
  // MONTH 1: AI Foundations & Strategic Prompting
  {
    weekNumber: 1,
    month: 1,
    phase: "Foundations",
    title: "What GenAI Actually Is",
    goal: "Understand LLMs, how GenAI works at a high level, its strengths, limitations, and real business use cases.",
    objectives: [
      { id: "1-1", text: "Learn what LLMs are and how they work at a high level" },
      { id: "1-2", text: "Understand AI strengths vs limitations in business" },
      { id: "1-3", text: "Identify real business use cases for GenAI" },
      { id: "1-4", text: "Write a 1-page note: 'Where AI fits in digital, content, and CRO'" },
    ],
    resources: [
      {
        title: "Google – Generative AI for Everyone",
        url: "https://www.cloudskillsboost.google/courses/216",
        type: "course",
      },
      {
        title: "DeepLearning.AI – Generative AI for Everyone",
        url: "https://www.deeplearning.ai/short-courses/generative-ai-for-everyone/",
        type: "course",
      },
    ],
    learningFocus: ["LLM fundamentals", "GenAI capabilities", "Business applications"],
  },
  {
    weekNumber: 2,
    month: 1,
    phase: "Foundations",
    title: "Business Use of AI & Consumer Psychology Basics",
    goal: "Explore AI in marketing, e-commerce, content, and CRO. Understand risks, bias, hallucinations. Learn core consumer psychology principles.",
    objectives: [
      { id: "2-1", text: "Explore AI in marketing, e-commerce, content, and CRO" },
      { id: "2-2", text: "Understand risks, bias, and hallucinations in AI" },
      { id: "2-3", text: "Learn Cialdini's 6 Principles of Persuasion" },
      { id: "2-4", text: "List 10 ways AI could improve your current role and business" },
      { id: "2-5", text: "Identify 3 psychological triggers you can apply to a product page" },
    ],
    resources: [
      {
        title: "HubSpot Academy – AI for Marketing",
        url: "https://academy.hubspot.com/courses/ai-for-marketing",
        type: "course",
      },
      {
        title: "CXL Blog – CRO & Psychology",
        url: "https://cxl.com/blog/",
        type: "article",
      },
      {
        title: "Influence: The Psychology of Persuasion (Cialdini)",
        url: "https://www.influenceatwork.com/",
        type: "book",
      },
    ],
    learningFocus: ["Consumer psychology", "Persuasion principles", "AI risks and ethics"],
  },
  {
    weekNumber: 3,
    month: 1,
    phase: "Foundations",
    title: "Prompting Fundamentals",
    goal: "Learn role prompting, context windows, constraints, iteration, and output evaluation.",
    objectives: [
      { id: "3-1", text: "Master role prompting techniques" },
      { id: "3-2", text: "Understand context windows and constraints" },
      { id: "3-3", text: "Learn iteration and output evaluation methods" },
      { id: "3-4", text: "Practice prompting for content briefs, email copy, and UX microcopy" },
      { id: "3-5", text: "Save 5 reusable prompt templates" },
    ],
    resources: [
      {
        title: "DeepLearning.AI – Prompt Engineering for Developers",
        url: "https://www.deeplearning.ai/short-courses/prompt-engineering-for-developers/",
        type: "course",
      },
      {
        title: "ChatGPT",
        url: "https://chat.openai.com/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Prompt Template Library",
      description: "Create and test 5 reusable prompt templates for your work and business",
      deliverable: "Document with 5 templates saved for future use",
    },
    learningFocus: ["Role prompting", "Constraints and evaluation", "Prompt templates"],
  },
  {
    weekNumber: 4,
    month: 1,
    phase: "Foundations",
    title: "Prompting for Business & CRO Outcomes",
    goal: "Focus on asking for structure, options, and trade-offs from AI. Apply prompting to generate CRO hypotheses and A/B test ideas.",
    objectives: [
      { id: "4-1", text: "Learn to ask for structure from AI" },
      { id: "4-2", text: "Master asking for options and trade-offs" },
      { id: "4-3", text: "Apply prompting to generate CRO hypotheses" },
      { id: "4-4", text: "Create A/B test ideas using AI" },
      { id: "4-5", text: "Use AI to improve one real webpage or campaign end-to-end" },
    ],
    resources: [
      {
        title: "DeepLearning.AI – Prompt Engineering for Developers",
        url: "https://www.deeplearning.ai/short-courses/prompt-engineering-for-developers/",
        type: "course",
      },
      {
        title: "CRO blogs (Optimizely, VWO)",
        url: "https://www.optimizely.com/blog/",
        type: "article",
      },
    ],
    miniProject: {
      title: "AI-Powered Webpage Improvement",
      description: "Use AI to improve one real webpage (SFCC product page or marketing campaign)",
      deliverable: "Before/after comparison with AI-generated improvements",
    },
    learningFocus: ["Structured prompting", "CRO hypothesis generation", "Business outcomes"],
  },

  // MONTH 2: AI for Content & Digital Platforms
  {
    weekNumber: 5,
    month: 2,
    phase: "Content & CRO",
    title: "AI for Content Audits & CRO Opportunities",
    goal: "Learn to identify content gaps, optimize for SEO, and facilitate content reuse and localization using AI. Identify content areas ripe for CRO improvements.",
    objectives: [
      { id: "5-1", text: "Learn content gap analysis techniques" },
      { id: "5-2", text: "Master SEO optimization with AI" },
      { id: "5-3", text: "Understand content reuse and localization" },
      { id: "5-4", text: "Identify CRO opportunities in content" },
      { id: "5-5", text: "Conduct an AI-assisted content audit" },
    ],
    resources: [
      {
        title: "DeepLearning.AI – Building Systems with ChatGPT",
        url: "https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/",
        type: "course",
      },
      {
        title: "Google Analytics (demo accounts)",
        url: "https://analytics.google.com/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "AI-Assisted Content Audit",
      description: "Conduct an AI-assisted content audit for your SFCC site or clothing store",
      deliverable: "Audit report with SEO and CRO optimization suggestions",
    },
    learningFocus: ["Content auditing", "SEO optimization", "CRO opportunities"],
  },
  {
    weekNumber: 6,
    month: 2,
    phase: "Content & CRO",
    title: "AI for Content Operations & CRO Workflows",
    goal: "Understand how AI ensures style consistency, streamlines editorial workflows, and scales content without quality loss. Integrate CRO considerations into content planning.",
    objectives: [
      { id: "6-1", text: "Learn style consistency techniques with AI" },
      { id: "6-2", text: "Understand editorial workflow automation" },
      { id: "6-3", text: "Master content scaling without quality loss" },
      { id: "6-4", text: "Integrate CRO best practices into content planning" },
      { id: "6-5", text: "Design an AI-assisted content workflow" },
    ],
    resources: [
      {
        title: "DeepLearning.AI – Building Systems with ChatGPT",
        url: "https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/",
        type: "course",
      },
      {
        title: "Notion AI",
        url: "https://www.notion.so/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "AI-Assisted Content Workflow Design",
      description: "Design an AI-assisted content workflow for SFCC or your clothing brand",
      deliverable: "Workflow diagram with AI integration points and CRO checkpoints",
    },
    learningFocus: ["Content operations", "Workflow automation", "Quality at scale"],
  },
  {
    weekNumber: 7,
    month: 2,
    phase: "Content & CRO",
    title: "AI + CMS Thinking (SFCC & CRO Integration)",
    goal: "Explore where AI sits within CMS workflows (like SFCC), governance, approvals, and human-in-the-loop models. Focus on how AI can support dynamic content for personalization and testing.",
    objectives: [
      { id: "7-1", text: "Understand AI within CMS workflows" },
      { id: "7-2", text: "Learn governance and approval processes" },
      { id: "7-3", text: "Master human-in-the-loop models" },
      { id: "7-4", text: "Explore AI for dynamic content and personalization" },
      { id: "7-5", text: "Diagram SFCC + AI workflow with CRO integration points" },
    ],
    resources: [
      {
        title: "DeepLearning.AI – Building Systems with ChatGPT",
        url: "https://www.deeplearning.ai/short-courses/building-systems-with-chatgpt/",
        type: "course",
      },
      {
        title: "SFCC Documentation",
        url: "https://documentation.b2c.commercecloud.salesforce.com/",
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
    weekNumber: 8,
    month: 2,
    phase: "Content & CRO",
    title: "Content Performance + AI (GA4, Power BI & CRO)",
    goal: "Learn to use AI to analyze GA4 data, summarize reports, and turn insights into actionable content and CRO decisions.",
    objectives: [
      { id: "8-1", text: "Master GA4 data analysis with AI" },
      { id: "8-2", text: "Learn report summarization techniques" },
      { id: "8-3", text: "Understand content performance metrics" },
      { id: "8-4", text: "Connect performance data to CRO actions" },
      { id: "8-5", text: "Create a GA4 → AI insights → CRO decision flow" },
    ],
    resources: [
      {
        title: "Google Analytics Academy",
        url: "https://analytics.google.com/analytics/academy/",
        type: "course",
      },
      {
        title: "Google Sheets",
        url: "https://sheets.google.com/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "GA4 → AI Insights → CRO Decision",
      description: "Use AI to analyze GA4 data and propose CRO improvements",
      deliverable: "Analysis report with AI-generated insights and recommended CRO tests",
    },
    learningFocus: ["GA4 analysis", "Data storytelling", "CRO decisions"],
  },

  // MONTH 3: AI for CRO & User Experience
  {
    weekNumber: 9,
    month: 3,
    phase: "Content & CRO",
    title: "CRO Fundamentals & User Journey Mapping",
    goal: "Review the CRO process, key metrics, and how to map user journeys. Understand the stages of conversion.",
    objectives: [
      { id: "9-1", text: "Learn the CRO process and methodology" },
      { id: "9-2", text: "Master key CRO metrics (CR, AOV, bounce rate, etc.)" },
      { id: "9-3", text: "Understand conversion stages" },
      { id: "9-4", text: "Learn user journey mapping techniques" },
      { id: "9-5", text: "Map a full e-commerce user journey with friction points" },
    ],
    resources: [
      {
        title: "CXL Institute – CRO Resources",
        url: "https://cxl.com/blog/",
        type: "article",
      },
      {
        title: "Optimizely CRO Blog",
        url: "https://www.optimizely.com/blog/",
        type: "article",
      },
    ],
    miniProject: {
      title: "User Journey Mapping",
      description: "Map a full e-commerce user journey for your clothing business",
      deliverable: "Journey map identifying friction points and conversion opportunities",
    },
    learningFocus: ["CRO fundamentals", "User journeys", "Conversion metrics"],
  },
  {
    weekNumber: 10,
    month: 3,
    phase: "Content & CRO",
    title: "AI-Powered User Segmentation & Personalization",
    goal: "Learn about behavioral clustering, predictive signals, and smart targeting with AI. Apply this to personalize content and offers for CRO.",
    objectives: [
      { id: "10-1", text: "Understand behavioral clustering concepts" },
      { id: "10-2", text: "Learn predictive signals and smart targeting" },
      { id: "10-3", text: "Master personalization strategies" },
      { id: "10-4", text: "Apply segmentation to CRO" },
      { id: "10-5", text: "Design AI-based customer segments" },
    ],
    resources: [
      {
        title: "HubSpot Academy – AI for Marketing",
        url: "https://academy.hubspot.com/courses/ai-for-marketing",
        type: "course",
      },
      {
        title: "CXL Blog – Segmentation",
        url: "https://cxl.com/blog/",
        type: "article",
      },
    ],
    miniProject: {
      title: "AI-Based Customer Segmentation",
      description: "Design AI-based customer segments for your clothing brand",
      deliverable: "Segmentation strategy with personalization recommendations",
    },
    learningFocus: ["Behavioral clustering", "Personalization", "Smart targeting"],
  },
  {
    weekNumber: 11,
    month: 3,
    phase: "Content & CRO",
    title: "AI in A/B Testing & Experimentation",
    goal: "Explore AI's role in generating A/B test hypotheses, analyzing results, and optimizing elements like subject lines, CTAs, and landing page layouts.",
    objectives: [
      { id: "11-1", text: "Learn hypothesis generation for A/B tests" },
      { id: "11-2", text: "Master A/B test design and execution" },
      { id: "11-3", text: "Understand statistical significance" },
      { id: "11-4", text: "Learn AI-powered result analysis" },
      { id: "11-5", text: "Design an AI-enhanced A/B test plan" },
    ],
    resources: [
      {
        title: "Optimizely – A/B Testing Guide",
        url: "https://www.optimizely.com/",
        type: "article",
      },
      {
        title: "VWO – CRO Blog",
        url: "https://vwo.com/blog/",
        type: "article",
      },
    ],
    miniProject: {
      title: "AI-Enhanced A/B Test Plan",
      description: "Design an A/B test for a specific element with AI-generated hypotheses",
      deliverable: "A/B test plan with 3-5 hypotheses and success metrics",
    },
    learningFocus: ["Hypothesis generation", "A/B testing", "Statistical analysis"],
  },
  {
    weekNumber: 12,
    month: 3,
    phase: "Content & CRO",
    title: "CRO Analytics + AI (Heatmaps, Session Replays)",
    goal: "Understand how AI can summarize user behavior data (heatmaps, session replays), provide insights into user friction, and recommend UX improvements.",
    objectives: [
      { id: "12-1", text: "Learn heatmap and session replay analysis" },
      { id: "12-2", text: "Understand user friction identification" },
      { id: "12-3", text: "Master AI-powered UX recommendations" },
      { id: "12-4", text: "Learn to connect behavior data to CRO actions" },
      { id: "12-5", text: "Analyze user behavior and propose UX improvements" },
    ],
    resources: [
      {
        title: "Hotjar – Heatmaps & Session Replays",
        url: "https://www.hotjar.com/",
        type: "tool",
      },
      {
        title: "Microsoft Clarity",
        url: "https://clarity.microsoft.com/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "User Behavior Analysis & UX Improvements",
      description: "Analyze user behavior data and propose AI-driven UX improvements",
      deliverable: "Analysis report with friction points and recommended UX changes",
    },
    learningFocus: ["User behavior analysis", "Heatmaps", "UX optimization"],
  },

  // MONTH 4: Analytics, Automation & Technical Fluency
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
        title: "Google Analytics Academy",
        url: "https://analytics.google.com/analytics/academy/",
        type: "course",
      },
      {
        title: "Google Sheets",
        url: "https://sheets.google.com/",
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
    goal: "Understand what APIs and webhooks are conceptually, and explore no-code automation possibilities for marketing and CRO tasks.",
    objectives: [
      { id: "14-1", text: "Learn API concepts and use cases" },
      { id: "14-2", text: "Understand webhooks and event-driven automation" },
      { id: "14-3", text: "Explore no-code automation tools" },
      { id: "14-4", text: "Design automation flows for CRO" },
      { id: "14-5", text: "Create an AI-assisted automation flow design" },
    ],
    resources: [
      {
        title: "Zapier – Automation Platform",
        url: "https://zapier.com/",
        type: "tool",
      },
      {
        title: "Make – Automation Platform",
        url: "https://www.make.com/",
        type: "tool",
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
    goal: "Learn about Retrieval Augmented Generation (RAG) and its application in internal knowledge assistants for marketing, sales, or customer support.",
    objectives: [
      { id: "15-1", text: "Understand RAG (Retrieval Augmented Generation)" },
      { id: "15-2", text: "Learn internal knowledge assistant use cases" },
      { id: "15-3", text: "Understand AI for customer support" },
      { id: "15-4", text: "Learn personalized recommendation systems" },
      { id: "15-5", text: "Design a conceptual internal AI assistant" },
    ],
    resources: [
      {
        title: "Notion AI",
        url: "https://www.notion.so/",
        type: "tool",
      },
      {
        title: "DeepLearning.AI – RAG Concepts",
        url: "https://www.deeplearning.ai/",
        type: "course",
      },
    ],
    miniProject: {
      title: "Internal AI Assistant Design",
      description: "Design an AI assistant for your marketing team or customer support",
      deliverable: "Conceptual design document with use cases and AI integration points",
    },
    learningFocus: ["RAG systems", "Knowledge assistants", "AI for support"],
  },
  {
    weekNumber: 16,
    month: 4,
    phase: "Analytics & Automation",
    title: "Ethics, Governance & Trust in AI for CRO",
    goal: "Understand data privacy, brand voice control, and the importance of human oversight in AI applications, especially concerning personalized marketing and A/B testing.",
    objectives: [
      { id: "16-1", text: "Learn data privacy and compliance (GDPR, CCPA)" },
      { id: "16-2", text: "Understand brand voice control in AI" },
      { id: "16-3", text: "Master human oversight in AI systems" },
      { id: "16-4", text: "Learn ethical considerations in personalization" },
      { id: "16-5", text: "Draft AI usage guidelines for your organization" },
    ],
    resources: [
      {
        title: "CXL – AI Ethics",
        url: "https://cxl.com/blog/",
        type: "article",
      },
      {
        title: "GDPR & Data Privacy Resources",
        url: "https://gdpr-info.eu/",
        type: "article",
      },
    ],
    miniProject: {
      title: "AI Usage Guidelines",
      description: "Draft AI usage guidelines for content creation and marketing",
      deliverable: "Guidelines document covering ethics, privacy, and governance",
    },
    learningFocus: ["Data privacy", "Ethics", "Governance"],
  },

  // MONTH 5: Portfolio Building
  {
    weekNumber: 17,
    month: 5,
    phase: "Portfolio",
    title: "AI-Driven Content & CRO Optimization Case Study",
    goal: "Detail a project where you used AI to audit and optimize content (e.g., SFCC product pages, blog posts for your clothing business), demonstrating measurable CRO impact.",
    objectives: [
      { id: "17-1", text: "Identify a real content optimization project" },
      { id: "17-2", text: "Document the problem and initial state" },
      { id: "17-3", text: "Explain why AI was used" },
      { id: "17-4", text: "Detail the changes made" },
      { id: "17-5", text: "Measure and document the impact" },
    ],
    resources: [
      {
        title: "Case Study Template",
        url: "https://docs.google.com/document/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Content Optimization Case Study",
      description: "Create a detailed case study of your AI-driven content optimization project",
      deliverable: "Case study document (Google Doc or Notion) with problem, solution, and impact",
    },
    learningFocus: ["Case study writing", "Impact measurement", "Portfolio building"],
  },
  {
    weekNumber: 18,
    month: 5,
    phase: "Portfolio",
    title: "AI-Powered User Experience & Personalization for Conversion",
    goal: "Showcase a project where AI was used to design or enhance a user journey and personalization strategy (e.g., for your online clothing store), leading to improved conversion.",
    objectives: [
      { id: "18-1", text: "Identify a personalization/UX project" },
      { id: "18-2", text: "Document the user journey improvements" },
      { id: "18-3", text: "Explain AI's role in personalization" },
      { id: "18-4", text: "Detail implementation and testing" },
      { id: "18-5", text: "Measure conversion impact" },
    ],
    resources: [
      {
        title: "Figma – Design Documentation",
        url: "https://www.figma.com/",
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
    goal: "Present a project demonstrating how you used AI to extract actionable insights from GA4/Power BI data, leading to a specific, implemented CRO decision and its impact.",
    objectives: [
      { id: "19-1", text: "Identify a data-driven CRO decision" },
      { id: "19-2", text: "Document the data analysis process" },
      { id: "19-3", text: "Explain AI's role in insight generation" },
      { id: "19-4", text: "Detail the CRO decision and implementation" },
      { id: "19-5", text: "Measure and document business impact" },
    ],
    resources: [
      {
        title: "Google Sheets – Data Visualization",
        url: "https://sheets.google.com/",
        type: "tool",
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
    goal: "Refine all projects, clearly articulating the problem, why AI and CRO were used, what changed, and the measurable impact.",
    objectives: [
      { id: "20-1", text: "Review and refine all 3 case studies" },
      { id: "20-2", text: "Ensure consistent formatting and structure" },
      { id: "20-3", text: "Add visuals and supporting materials" },
      { id: "20-4", text: "Create a portfolio index/overview page" },
      { id: "20-5", text: "Consolidate everything into a Notion or Google Doc portfolio" },
    ],
    resources: [
      {
        title: "Notion – Portfolio Template",
        url: "https://www.notion.so/",
        type: "tool",
      },
      {
        title: "Google Docs – Portfolio Template",
        url: "https://docs.google.com/document/",
        type: "tool",
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
    goal: "Update your CV to highlight your new AI, CRO, and growth skills and experiences, shifting from 'content' to 'Growth & Martech Specialist (AI-Powered)' with impact-driven bullets.",
    objectives: [
      { id: "21-1", text: "Review your current CV" },
      { id: "21-2", text: "Reframe content management experience as growth-focused" },
      { id: "21-3", text: "Add AI and CRO skills section" },
      { id: "21-4", text: "Highlight measurable business impact" },
      { id: "21-5", text: "Update professional headline and summary" },
    ],
    resources: [
      {
        title: "CV Template (Google Docs)",
        url: "https://docs.google.com/document/",
        type: "tool",
      },
    ],
    miniProject: {
      title: "Updated CV",
      description: "Reposition your CV to highlight AI and CRO expertise",
      deliverable: "Updated CV emphasizing growth and AI skills",
    },
    learningFocus: ["CV writing", "Impact communication", "Personal branding"],
  },
  {
    weekNumber: 22,
    month: 6,
    phase: "Positioning",
    title: "LinkedIn Positioning",
    goal: "Optimize your LinkedIn profile: headline, about section, and feature your new AI + CRO portfolio projects.",
    objectives: [
      { id: "22-1", text: "Update LinkedIn headline with new role focus" },
      { id: "22-2", text: "Rewrite about section highlighting AI and CRO expertise" },
      { id: "22-3", text: "Add portfolio projects to featured section" },
      { id: "22-4", text: "Update skills section with AI and CRO keywords" },
      { id: "22-5", text: "Optimize for discoverability" },
    ],
    resources: [
      {
        title: "LinkedIn Profile Optimization Guide",
        url: "https://www.linkedin.com/",
        type: "article",
      },
    ],
    miniProject: {
      title: "LinkedIn Profile Optimization",
      description: "Optimize your LinkedIn profile for AI and CRO roles",
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
        title: "LinkedIn Job Search",
        url: "https://www.linkedin.com/jobs/",
        type: "tool",
      },
      {
        title: "Growth Marketing Communities",
        url: "https://www.growthmarketingpro.com/",
        type: "article",
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
    goal: "Practice explaining AI and CRO concepts simply, discussing trade-offs, and demonstrating judgment over hype and a focus on measurable results.",
    objectives: [
      { id: "24-1", text: "Practice explaining AI concepts to non-technical people" },
      { id: "24-2", text: "Prepare answers about AI trade-offs and limitations" },
      { id: "24-3", text: "Develop case study presentations" },
      { id: "24-4", text: "Practice discussing CRO methodology and results" },
      { id: "24-5", text: "Prepare questions to ask interviewers" },
    ],
    resources: [
      {
        title: "Interview Preparation Guide",
        url: "https://www.themuse.com/advice/interview-tips",
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
];
