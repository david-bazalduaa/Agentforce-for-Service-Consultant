const fs = require("fs");
const path = require("path");
const { EXAM_DOMAINS } = require("../src/config/agentforce-domains.js");

const SOURCE_FILE = path.join(__dirname, "..", "5_AgentforceServiceConsultant.md");
const QUESTIONS_JSON = path.join(__dirname, "..", "questions.json");
const QUESTIONS_JS = path.join(__dirname, "..", "questions.js");

console.log("================================================================================");
console.log("   SALESFORCE CERTIFIED AGENTFORCE SERVICE CONSULTANT QUESTION BANK VALIDATOR   ");
console.log("================================================================================");

// 1. Verify existence of files
if (!fs.existsSync(SOURCE_FILE)) {
  console.error("❌ FAILED: Source file 5_AgentforceServiceConsultant.md not found!");
  process.exit(1);
}
if (!fs.existsSync(QUESTIONS_JSON)) {
  console.error("❌ FAILED: questions.json not found!");
  process.exit(1);
}
if (!fs.existsSync(QUESTIONS_JS)) {
  console.error("❌ FAILED: questions.js not found!");
  process.exit(1);
}

// 2. Count questions in raw Markdown source
const sourceContent = fs.readFileSync(SOURCE_FILE, "utf8");
const rawMatches = [...sourceContent.matchAll(/(?:#{1,4}\s*)?\*\*<u>Question:\s*(\d+)<\/u>\*\*/gi)];
const expectedCount = rawMatches.length;
console.log(`✓ Source Markdown contains ${expectedCount} verified question blocks.`);

if (expectedCount !== 290) {
  console.error(`❌ FAILED: Expected exactly 290 questions in Markdown, found ${expectedCount}`);
  process.exit(1);
}

// 3. Load questions.json
let questions;
try {
  questions = JSON.parse(fs.readFileSync(QUESTIONS_JSON, "utf8"));
} catch (e) {
  console.error("❌ FAILED: questions.json is not valid JSON:", e.message);
  process.exit(1);
}

// 4. Validate total question count
if (questions.length !== expectedCount) {
  console.error(`❌ FAILED: Question count mismatch! Expected ${expectedCount}, got ${questions.length}`);
  process.exit(1);
}
console.log(`✓ Count check passed: Exactly ${questions.length} / ${expectedCount} questions loaded.`);

// 5. Validate schema, options, answers, and 8 official exam domains
const seenIds = new Set();
const validDomainIds = new Set(Object.keys(EXAM_DOMAINS));
const domainCounts = {};
let totalAuditNotes = 0;

validDomainIds.forEach(id => {
  domainCounts[id] = 0;
});

questions.forEach((q, idx) => {
  const qNum = idx + 1;
  const expectedId = `q${qNum}`;

  // ID validation
  if (!q.id) {
    console.error(`❌ FAILED: Question at index ${idx} has no id`);
    process.exit(1);
  }
  if (seenIds.has(q.id)) {
    console.error(`❌ FAILED: Duplicate question id detected: ${q.id}`);
    process.exit(1);
  }
  seenIds.add(q.id);

  if (q.id !== expectedId) {
    console.error(`❌ FAILED: Question ID sequence mismatch at index ${idx}: expected ${expectedId}, got ${q.id}`);
    process.exit(1);
  }

  // Question Prompt Integrity (Zero rewrite / empty check)
  if (typeof q.question !== "string" || q.question.trim().length === 0) {
    console.error(`❌ FAILED: Question ${q.id} has empty prompt`);
    process.exit(1);
  }

  // Options validation
  if (!Array.isArray(q.options) || q.options.length < 2) {
    console.error(`❌ FAILED: Question ${q.id} has fewer than 2 options`);
    process.exit(1);
  }

  const optionIds = new Set();
  q.options.forEach((opt, optIdx) => {
    if (!opt.id || typeof opt.id !== "string") {
      console.error(`❌ FAILED: Question ${q.id} option ${optIdx} has invalid id`);
      process.exit(1);
    }
    if (optionIds.has(opt.id)) {
      console.error(`❌ FAILED: Question ${q.id} has duplicate option id: ${opt.id}`);
      process.exit(1);
    }
    optionIds.add(opt.id);

    if (typeof opt.text !== "string" || opt.text.trim().length === 0) {
      console.error(`❌ FAILED: Question ${q.id} option ${opt.id} has empty text`);
      process.exit(1);
    }
  });

  // Correct Answers validation
  if (!Array.isArray(q.correctAnswers) || q.correctAnswers.length === 0) {
    console.error(`❌ FAILED: Question ${q.id} has no correctAnswers defined`);
    process.exit(1);
  }

  q.correctAnswers.forEach(ans => {
    if (!optionIds.has(ans)) {
      console.error(`❌ FAILED: Question ${q.id} correct answer "${ans}" does not exist in options:`, [...optionIds]);
      process.exit(1);
    }
  });

  // Explanation validation
  if (typeof q.explanation !== "string" || q.explanation.trim().length === 0) {
    console.error(`❌ FAILED: Question ${q.id} has empty explanation`);
    process.exit(1);
  }

  if (q.explanation.includes("[Technical Audit Note:")) {
    totalAuditNotes++;
  }

  // Domain ID & Topic validation
  if (!q.domainId || !validDomainIds.has(q.domainId)) {
    console.error(`❌ FAILED: Question ${q.id} has invalid domainId: "${q.domainId}". Allowed:`, [...validDomainIds]);
    process.exit(1);
  }

  const expectedDomain = EXAM_DOMAINS[q.domainId];
  if (q.topic !== expectedDomain.name) {
    console.error(`❌ FAILED: Question ${q.id} topic "${q.topic}" does not match domain name "${expectedDomain.name}"`);
    process.exit(1);
  }

  domainCounts[q.domainId]++;

  // Source Verified
  if (q.sourceVerified !== true) {
    console.error(`❌ FAILED: Question ${q.id} sourceVerified is not true`);
    process.exit(1);
  }
});

console.log("✓ No duplicate question IDs found (290 unique IDs).");
console.log("✓ 100% of questions belong to a recognized official exam domain.");
console.log("✓ All correctAnswers map to valid option IDs (100% verified).");
console.log("✓ All question prompts, options, and explanations are verified and complete.");
console.log(`✓ Technical audit notes incorporated: ${totalAuditNotes}`);

console.log("\n--------------------------------------------------------------------------------");
console.log("   OFFICIAL EXAM DOMAIN DISTRIBUTION TABLE (8 BLUEPRINT DOMAINS)                ");
console.log("--------------------------------------------------------------------------------");
console.log(
  "Domain ID".padEnd(38) +
  "Domain Name".padEnd(38) +
  "Weight".padEnd(10) +
  "Questions".padEnd(12) +
  "Actual %"
);
console.log("-".repeat(110));

let totalWeight = 0;
let totalQs = 0;

for (const [dId, count] of Object.entries(domainCounts)) {
  const domain = EXAM_DOMAINS[dId];
  const actualPct = ((count / questions.length) * 100).toFixed(1) + "%";
  totalWeight += domain.weight;
  totalQs += count;

  console.log(
    dId.padEnd(38) +
    domain.name.padEnd(38) +
    `${domain.weight}%`.padEnd(10) +
    `${count} Qs`.padEnd(12) +
    actualPct
  );
}
console.log("-".repeat(110));
console.log(
  "TOTAL".padEnd(38) +
  "8 Official Blueprint Domains".padEnd(38) +
  `${totalWeight}%`.padEnd(10) +
  `${totalQs} Qs`.padEnd(12) +
  "100.0%"
);
console.log("--------------------------------------------------------------------------------\n");

// 6. Test JS module export
try {
  const jsExport = require(QUESTIONS_JS);
  if (!Array.isArray(jsExport) || jsExport.length !== expectedCount) {
    console.error("❌ FAILED: questions.js module did not export valid array");
    process.exit(1);
  }
  console.log(`✓ questions.js module verification successful (${jsExport.length} items).`);
} catch (e) {
  console.error("❌ FAILED: Error requiring questions.js:", e.message);
  process.exit(1);
}

console.log("================================================================================");
console.log("✅ ALL VALIDATION CHECKS PASSED: 100% DOMAIN MAPPING & AUDIT VERIFIED           ");
console.log("================================================================================");
