#!/usr/bin/env node

/**
 * Resource Link Validator
 * 
 * This script validates all resource links in the roadmap data files:
 * - Checks HTTP status codes for accessibility
 * - Identifies broken links (404, 500, etc.)
 * - Generates a detailed report with categorization
 * - Exports results to JSON for tracking
 * 
 * Usage: node scripts/validate-resource-links.mjs
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, '..');

// Import roadmap data
const roadmapDataPath = path.join(projectRoot, 'shared', 'roadmapData.ts');
const personalRoadmapDataPath = path.join(projectRoot, 'shared', 'personalRoadmapData.ts');

// Parse TypeScript files to extract data
function extractResourcesFromFile(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const resources = [];
  
  // Extract all resource objects from the file
  const resourceMatches = content.matchAll(/title:\s*"([^"]+)",\s*url:\s*"([^"]+)",\s*type:\s*"([^"]+)"/g);
  
  for (const match of resourceMatches) {
    resources.push({
      title: match[1],
      url: match[2],
      type: match[3],
    });
  }
  
  return resources;
}

// Validate a single URL
async function validateUrl(url, timeout = 10000) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeout);
    
    const response = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow',
      signal: controller.signal,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
      },
    });
    
    clearTimeout(timeoutId);
    
    return {
      status: response.status,
      statusText: response.statusText,
      isValid: response.status >= 200 && response.status < 400,
      redirectUrl: response.url !== url ? response.url : null,
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      return {
        status: null,
        statusText: 'Timeout',
        isValid: false,
        error: 'Request timeout after 10 seconds',
      };
    }
    
    return {
      status: null,
      statusText: error.message,
      isValid: false,
      error: error.message,
    };
  }
}

// Main validation function
async function validateAllResources() {
  console.log('🔍 Starting resource link validation...\n');
  
  // Extract resources from both files
  console.log('📂 Extracting resources from roadmap data files...');
  const professionalResources = extractResourcesFromFile(roadmapDataPath);
  const personalResources = extractResourcesFromFile(personalRoadmapDataPath);
  
  console.log(`   ✓ Professional track: ${professionalResources.length} resources`);
  console.log(`   ✓ Personal track: ${personalResources.length} resources\n`);
  
  const allResources = [
    ...professionalResources.map(r => ({ ...r, track: 'Professional' })),
    ...personalResources.map(r => ({ ...r, track: 'Personal' })),
  ];
  
  // Remove duplicates by URL
  const uniqueResources = [];
  const seenUrls = new Set();
  
  for (const resource of allResources) {
    if (!seenUrls.has(resource.url)) {
      seenUrls.add(resource.url);
      uniqueResources.push(resource);
    }
  }
  
  console.log(`📊 Total unique resources to validate: ${uniqueResources.length}\n`);
  
  // Validate each resource
  const results = {
    valid: [],
    broken: [],
    timeout: [],
    redirected: [],
    errors: [],
  };
  
  console.log('🌐 Validating URLs...\n');
  
  for (let i = 0; i < uniqueResources.length; i++) {
    const resource = uniqueResources[i];
    const progress = `[${i + 1}/${uniqueResources.length}]`;
    
    process.stdout.write(`${progress} Checking: ${resource.url.substring(0, 60)}...`);
    
    const validation = await validateUrl(resource.url);
    
    const result = {
      ...resource,
      validation,
      checkedAt: new Date().toISOString(),
    };
    
    if (validation.error === 'Request timeout after 10 seconds') {
      results.timeout.push(result);
      console.log(' ⏱️  TIMEOUT');
    } else if (!validation.isValid && validation.status) {
      results.broken.push(result);
      console.log(` ❌ ${validation.status} ${validation.statusText}`);
    } else if (validation.redirectUrl) {
      results.redirected.push(result);
      console.log(` ↪️  REDIRECTED to ${validation.redirectUrl.substring(0, 40)}...`);
    } else if (validation.isValid) {
      results.valid.push(result);
      console.log(` ✅ ${validation.status} OK`);
    } else {
      results.errors.push(result);
      console.log(` ⚠️  ERROR: ${validation.error}`);
    }
    
    // Add a small delay to avoid rate limiting
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  // Generate report
  console.log('\n' + '='.repeat(70));
  console.log('📋 VALIDATION REPORT');
  console.log('='.repeat(70) + '\n');
  
  console.log(`✅ Valid Links:        ${results.valid.length}`);
  console.log(`❌ Broken Links:       ${results.broken.length}`);
  console.log(`⏱️  Timeout Links:      ${results.timeout.length}`);
  console.log(`↪️  Redirected Links:   ${results.redirected.length}`);
  console.log(`⚠️  Error Links:        ${results.errors.length}`);
  console.log(`📊 Success Rate:       ${((results.valid.length / uniqueResources.length) * 100).toFixed(1)}%\n`);
  
  // Show broken links details
  if (results.broken.length > 0) {
    console.log('🔴 BROKEN LINKS DETAILS:');
    console.log('-'.repeat(70));
    results.broken.forEach((result, idx) => {
      console.log(`\n${idx + 1}. ${result.title}`);
      console.log(`   URL: ${result.url}`);
      console.log(`   Status: ${result.validation.status} ${result.validation.statusText}`);
      console.log(`   Track: ${result.track}`);
      console.log(`   Type: ${result.type}`);
    });
  }
  
  // Show timeout links details
  if (results.timeout.length > 0) {
    console.log('\n⏱️  TIMEOUT LINKS (may need retry):');
    console.log('-'.repeat(70));
    results.timeout.forEach((result, idx) => {
      console.log(`\n${idx + 1}. ${result.title}`);
      console.log(`   URL: ${result.url}`);
      console.log(`   Track: ${result.track}`);
      console.log(`   Type: ${result.type}`);
    });
  }
  
  // Show redirected links details
  if (results.redirected.length > 0) {
    console.log('\n↪️  REDIRECTED LINKS (consider updating):');
    console.log('-'.repeat(70));
    results.redirected.forEach((result, idx) => {
      console.log(`\n${idx + 1}. ${result.title}`);
      console.log(`   Original: ${result.url}`);
      console.log(`   Redirected to: ${result.validation.redirectUrl}`);
      console.log(`   Track: ${result.track}`);
      console.log(`   Type: ${result.type}`);
    });
  }
  
  // Save detailed report to JSON
  const reportPath = path.join(projectRoot, 'resource-validation-report.json');
  const report = {
    generatedAt: new Date().toISOString(),
    summary: {
      total: uniqueResources.length,
      valid: results.valid.length,
      broken: results.broken.length,
      timeout: results.timeout.length,
      redirected: results.redirected.length,
      errors: results.errors.length,
      successRate: ((results.valid.length / uniqueResources.length) * 100).toFixed(1),
    },
    results,
  };
  
  fs.writeFileSync(reportPath, JSON.stringify(report, null, 2));
  console.log(`\n\n📁 Detailed report saved to: resource-validation-report.json`);
  
  // Return summary
  return report.summary;
}

// Run validation
validateAllResources().catch(error => {
  console.error('❌ Validation failed:', error);
  process.exit(1);
});
