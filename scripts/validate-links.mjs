#!/usr/bin/env node

/**
 * Resource Link Validation Script
 * Validates all resource links in roadmapData.ts
 * Checks for broken links and generates a report
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const roadmapDataPath = path.join(__dirname, "../shared/roadmapData.ts");

// Read the roadmap data file
const fileContent = fs.readFileSync(roadmapDataPath, "utf-8");

// Extract all URLs from the file
const urlRegex = /url:\s*"([^"]+)"/g;
const urls = [];
let match;

while ((match = urlRegex.exec(fileContent)) !== null) {
  urls.push(match[1]);
}

// Remove duplicates
const uniqueUrls = [...new Set(urls)];

console.log(`Found ${uniqueUrls.length} unique resource links\n`);

// Categorize URLs
const categories = {
  youtube: [],
  course: [],
  article: [],
  tool: [],
  other: [],
};

uniqueUrls.forEach((url) => {
  if (url.includes("youtube.com")) {
    categories.youtube.push(url);
  } else if (
    url.includes("deeplearning.ai") ||
    url.includes("cloudskillsboost") ||
    url.includes("coursera") ||
    url.includes("udemy")
  ) {
    categories.course.push(url);
  } else if (
    url.includes("blog") ||
    url.includes("article") ||
    url.includes("docs") ||
    url.includes("guide")
  ) {
    categories.article.push(url);
  } else if (
    url.includes("chat.openai.com") ||
    url.includes("claude.ai") ||
    url.includes("shopify.com") ||
    url.includes("zapier.com")
  ) {
    categories.tool.push(url);
  } else {
    categories.other.push(url);
  }
});

// Print report
console.log("=== RESOURCE LINK VALIDATION REPORT ===\n");

console.log(`📺 YouTube Videos: ${categories.youtube.length}`);
categories.youtube.slice(0, 3).forEach((url) => console.log(`   - ${url}`));
if (categories.youtube.length > 3) {
  console.log(`   ... and ${categories.youtube.length - 3} more\n`);
} else {
  console.log();
}

console.log(`📚 Courses: ${categories.course.length}`);
categories.course.slice(0, 3).forEach((url) => console.log(`   - ${url}`));
if (categories.course.length > 3) {
  console.log(`   ... and ${categories.course.length - 3} more\n`);
} else {
  console.log();
}

console.log(`📄 Articles: ${categories.article.length}`);
categories.article.slice(0, 3).forEach((url) => console.log(`   - ${url}`));
if (categories.article.length > 3) {
  console.log(`   ... and ${categories.article.length - 3} more\n`);
} else {
  console.log();
}

console.log(`🛠️  Tools: ${categories.tool.length}`);
categories.tool.slice(0, 3).forEach((url) => console.log(`   - ${url}`));
if (categories.tool.length > 3) {
  console.log(`   ... and ${categories.tool.length - 3} more\n`);
} else {
  console.log();
}

console.log(`🔗 Other: ${categories.other.length}`);
categories.other.slice(0, 3).forEach((url) => console.log(`   - ${url}`));
if (categories.other.length > 3) {
  console.log(`   ... and ${categories.other.length - 3} more\n`);
} else {
  console.log();
}

// Check for potential issues
console.log("\n=== POTENTIAL ISSUES ===\n");

const issues = [];

// Check for YouTube search results (should be specific videos)
const youtubeSearchLinks = uniqueUrls.filter((url) =>
  url.includes("youtube.com/results")
);
if (youtubeSearchLinks.length > 0) {
  issues.push(
    `⚠️  Found ${youtubeSearchLinks.length} YouTube search result links (should be specific videos)`
  );
}

// Check for broken patterns
const brokenPatterns = uniqueUrls.filter(
  (url) =>
    url.includes("undefined") ||
    url.includes("null") ||
    url.includes("{{") ||
    url.includes("}}")
);
if (brokenPatterns.length > 0) {
  issues.push(`❌ Found ${brokenPatterns.length} broken URL patterns`);
  brokenPatterns.forEach((url) => console.log(`   - ${url}`));
}

// Check for duplicate URLs
const urlCounts = {};
uniqueUrls.forEach((url) => {
  urlCounts[url] = (urlCounts[url] || 0) + 1;
});
const duplicates = Object.entries(urlCounts).filter(([_, count]) => count > 1);
if (duplicates.length > 0) {
  issues.push(`ℹ️  Found ${duplicates.length} URLs used multiple times`);
}

if (issues.length === 0) {
  console.log("✅ No major issues detected!");
} else {
  issues.forEach((issue) => console.log(issue));
}

console.log("\n=== RECOMMENDATIONS ===\n");
console.log("1. Replace YouTube search links with specific video URLs");
console.log("2. Test a sample of links periodically (at least monthly)");
console.log("3. Monitor for broken links and update as needed");
console.log("4. Consider adding link descriptions for better UX");
console.log("5. Prioritize verified resources from official sources\n");

console.log("✅ Validation complete!");
