import { Week } from "./roadmapData";

// PHASE 2: Personal Brand + Business Growth (6 Months)
// TRACK A: Personal Brand (Fitness/Weight Loss Journey)
// TRACK B: Business Brand (Clothing - UAE + India Launch)

export const phase2RoadmapData: Week[] = [
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
        title: "Storytelling Framework for Personal Brands (YouTube - 20 min)",
        url: "https://www.youtube.com/results?search_query=personal+brand+storytelling+framework",
        type: "article",
      },
      {
        title: "Brene Brown - The Power of Vulnerability (TED Talk)",
        url: "https://www.youtube.com/results?search_query=brene+brown+vulnerability+ted+talk",
        type: "article",
      },
      {
        title: "Instagram Bio Best Practices",
        url: "https://www.instagram.com/",
        type: "article",
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
        title: "India E-commerce Market Research 2024",
        url: "https://www.youtube.com/results?search_query=india+ecommerce+market+2024",
        type: "article",
      },
      {
        title: "Shopify India Setup Guide",
        url: "https://www.shopify.com/",
        type: "tool",
      },
      {
        title: "Fashion Brand Positioning Guide",
        url: "https://www.youtube.com/results?search_query=fashion+brand+positioning+strategy",
        type: "article",
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
        title: "ChatGPT for Instagram Content (YouTube - 20 min)",
        url: "https://www.youtube.com/results?search_query=chatgpt+instagram+content+ideas",
        type: "article",
      },
      {
        title: "Buffer - Content Scheduling Tool",
        url: "https://buffer.com/",
        type: "tool",
      },
      {
        title: "Instagram Content Pillars Framework",
        url: "https://www.youtube.com/results?search_query=instagram+content+pillars+strategy",
        type: "article",
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
        title: "Shopify Product Page Optimization",
        url: "https://www.shopify.com/blog/",
        type: "article",
      },
      {
        title: "Copywriting for E-commerce (Using Psychology)",
        url: "https://www.youtube.com/results?search_query=ecommerce+copywriting+psychology",
        type: "article",
      },
      {
        title: "Google Analytics for Shopify",
        url: "https://www.google.com/analytics/",
        type: "tool",
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
        title: "Instagram Algorithm Explained (2024)",
        url: "https://www.youtube.com/results?search_query=instagram+algorithm+2024+how+to+grow",
        type: "article",
      },
      {
        title: "Authentic Engagement Strategy",
        url: "https://www.youtube.com/results?search_query=instagram+authentic+engagement+strategy",
        type: "article",
      },
      {
        title: "Reel Ideas for Fitness Content",
        url: "https://www.youtube.com/results?search_query=instagram+reel+ideas+fitness+weight+loss",
        type: "article",
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
        title: "User-Generated Content Strategy",
        url: "https://www.youtube.com/results?search_query=user+generated+content+strategy+ecommerce",
        type: "article",
      },
      {
        title: "Mailchimp Email Marketing",
        url: "https://mailchimp.com/",
        type: "tool",
      },
      {
        title: "Behind-the-Scenes Content for Brands",
        url: "https://www.youtube.com/results?search_query=behind+the+scenes+content+brand+building",
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
        title: "Building Parasocial Relationships (Authenticity)",
        url: "https://www.youtube.com/results?search_query=parasocial+relationships+authentic+content",
        type: "article",
      },
      {
        title: "Vulnerability in Content Creation",
        url: "https://www.youtube.com/results?search_query=vulnerability+content+creation+authenticity",
        type: "article",
      },
      {
        title: "Building Email List with Instagram",
        url: "https://www.youtube.com/results?search_query=grow+email+list+from+instagram",
        type: "article",
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
        title: "India Shipping & Logistics Options",
        url: "https://www.youtube.com/results?search_query=india+ecommerce+shipping+logistics",
        type: "article",
      },
      {
        title: "Pricing Strategy for International Markets",
        url: "https://www.youtube.com/results?search_query=ecommerce+pricing+strategy+international",
        type: "article",
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
        title: "Affiliate Marketing for Creators",
        url: "https://www.youtube.com/results?search_query=affiliate+marketing+content+creators",
        type: "article",
      },
      {
        title: "Sponsorship Pitch Template",
        url: "https://www.youtube.com/results?search_query=brand+sponsorship+pitch+template+creators",
        type: "article",
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
        title: "E-commerce Metrics & KPIs",
        url: "https://www.youtube.com/results?search_query=ecommerce+metrics+kpi+tracking",
        type: "article",
      },
      {
        title: "Influencer Collaboration Strategy",
        url: "https://www.youtube.com/results?search_query=influencer+collaboration+strategy+ecommerce",
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
        title: "Creating Transformation Content",
        url: "https://www.youtube.com/results?search_query=transformation+content+before+after+storytelling",
        type: "article",
      },
      {
        title: "Content Creator Business Planning",
        url: "https://www.youtube.com/results?search_query=content+creator+business+planning+growth",
        type: "article",
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
        title: "E-commerce Business Planning & Forecasting",
        url: "https://www.youtube.com/results?search_query=ecommerce+business+plan+forecasting+growth",
        type: "article",
      },
      {
        title: "Product Line Expansion Strategy",
        url: "https://www.youtube.com/results?search_query=product+line+expansion+strategy+ecommerce",
        type: "article",
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
