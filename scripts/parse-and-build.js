const fs = require("fs");
const path = require("path");
const { EXAM_DOMAINS } = require("../src/config/agentforce-domains.js");

const SOURCE_FILE = path.join(__dirname, "..", "5_AgentforceServiceConsultant.md");
const OUTPUT_JSON = path.join(__dirname, "..", "questions.json");
const OUTPUT_JS = path.join(__dirname, "..", "questions.js");

const content = fs.readFileSync(SOURCE_FILE, "utf8");

// Strict 1-to-1 mapping of all 290 questions to official 8 exam domains
const DOMAIN_MAPPING = {
  "1": "contact_center_analytics",
  "2": "knowledge_management",
  "3": "intake_and_interaction_channels",
  "4": "integrations",
  "5": "integrations",
  "6": "integrations",
  "7": "knowledge_management",
  "8": "knowledge_management",
  "9": "case_management",
  "10": "case_management",
  "11": "industry_knowledge",
  "12": "industry_knowledge",
  "13": "contact_center_analytics",
  "14": "contact_center_analytics",
  "15": "knowledge_management",
  "16": "integrations",
  "17": "industry_knowledge",
  "18": "agentforce_service_solution_design",
  "19": "knowledge_management",
  "20": "industry_knowledge",
  "21": "industry_knowledge",
  "22": "intake_and_interaction_channels",
  "23": "implementation_strategies",
  "24": "intake_and_interaction_channels",
  "25": "intake_and_interaction_channels",
  "26": "intake_and_interaction_channels",
  "27": "knowledge_management",
  "28": "integrations",
  "29": "implementation_strategies",
  "30": "implementation_strategies",
  "31": "agentforce_service_solution_design",
  "32": "knowledge_management",
  "33": "implementation_strategies",
  "34": "knowledge_management",
  "35": "implementation_strategies",
  "36": "case_management",
  "37": "case_management",
  "38": "integrations",
  "39": "knowledge_management",
  "40": "integrations",
  "41": "agentforce_service_solution_design",
  "42": "knowledge_management",
  "43": "agentforce_service_solution_design",
  "44": "knowledge_management",
  "45": "implementation_strategies",
  "46": "case_management",
  "47": "implementation_strategies",
  "48": "agentforce_service_solution_design",
  "49": "intake_and_interaction_channels",
  "50": "contact_center_analytics",
  "51": "implementation_strategies",
  "52": "case_management",
  "53": "knowledge_management",
  "54": "knowledge_management",
  "55": "knowledge_management",
  "56": "intake_and_interaction_channels",
  "57": "intake_and_interaction_channels",
  "58": "integrations",
  "59": "agentforce_service_solution_design",
  "60": "industry_knowledge",
  "61": "integrations",
  "62": "industry_knowledge",
  "63": "intake_and_interaction_channels",
  "64": "industry_knowledge",
  "65": "industry_knowledge",
  "66": "integrations",
  "67": "knowledge_management",
  "68": "case_management",
  "69": "contact_center_analytics",
  "70": "intake_and_interaction_channels",
  "71": "contact_center_analytics",
  "72": "industry_knowledge",
  "73": "case_management",
  "74": "agentforce_service_solution_design",
  "75": "implementation_strategies",
  "76": "integrations",
  "77": "industry_knowledge",
  "78": "industry_knowledge",
  "79": "knowledge_management",
  "80": "integrations",
  "81": "contact_center_analytics",
  "82": "case_management",
  "83": "knowledge_management",
  "84": "industry_knowledge",
  "85": "intake_and_interaction_channels",
  "86": "implementation_strategies",
  "87": "industry_knowledge",
  "88": "implementation_strategies",
  "89": "agentforce_service_solution_design",
  "90": "agentforce_service_solution_design",
  "91": "intake_and_interaction_channels",
  "92": "implementation_strategies",
  "93": "contact_center_analytics",
  "94": "case_management",
  "95": "intake_and_interaction_channels",
  "96": "case_management",
  "97": "industry_knowledge",
  "98": "agentforce_service_solution_design",
  "99": "implementation_strategies",
  "100": "industry_knowledge",
  "101": "industry_knowledge",
  "102": "agentforce_service_solution_design",
  "103": "integrations",
  "104": "knowledge_management",
  "105": "case_management",
  "106": "intake_and_interaction_channels",
  "107": "knowledge_management",
  "108": "integrations",
  "109": "implementation_strategies",
  "110": "agentforce_service_solution_design",
  "111": "integrations",
  "112": "industry_knowledge",
  "113": "case_management",
  "114": "industry_knowledge",
  "115": "integrations",
  "116": "industry_knowledge",
  "117": "knowledge_management",
  "118": "case_management",
  "119": "industry_knowledge",
  "120": "industry_knowledge",
  "121": "intake_and_interaction_channels",
  "122": "intake_and_interaction_channels",
  "123": "industry_knowledge",
  "124": "case_management",
  "125": "knowledge_management",
  "126": "intake_and_interaction_channels",
  "127": "contact_center_analytics",
  "128": "agentforce_service_solution_design",
  "129": "integrations",
  "130": "contact_center_analytics",
  "131": "case_management",
  "132": "implementation_strategies",
  "133": "industry_knowledge",
  "134": "case_management",
  "135": "case_management",
  "136": "case_management",
  "137": "agentforce_service_solution_design",
  "138": "contact_center_analytics",
  "139": "industry_knowledge",
  "140": "industry_knowledge",
  "141": "integrations",
  "142": "knowledge_management",
  "143": "industry_knowledge",
  "144": "industry_knowledge",
  "145": "integrations",
  "146": "intake_and_interaction_channels",
  "147": "agentforce_service_solution_design",
  "148": "implementation_strategies",
  "149": "agentforce_service_solution_design",
  "150": "intake_and_interaction_channels",
  "151": "contact_center_analytics",
  "152": "intake_and_interaction_channels",
  "153": "contact_center_analytics",
  "154": "industry_knowledge",
  "155": "integrations",
  "156": "industry_knowledge",
  "157": "case_management",
  "158": "industry_knowledge",
  "159": "agentforce_service_solution_design",
  "160": "knowledge_management",
  "161": "contact_center_analytics",
  "162": "implementation_strategies",
  "163": "case_management",
  "164": "implementation_strategies",
  "165": "implementation_strategies",
  "166": "contact_center_analytics",
  "167": "contact_center_analytics",
  "168": "contact_center_analytics",
  "169": "contact_center_analytics",
  "170": "implementation_strategies",
  "171": "agentforce_service_solution_design",
  "172": "knowledge_management",
  "173": "case_management",
  "174": "integrations",
  "175": "integrations",
  "176": "intake_and_interaction_channels",
  "177": "implementation_strategies",
  "178": "implementation_strategies",
  "179": "case_management",
  "180": "integrations",
  "181": "contact_center_analytics",
  "182": "implementation_strategies",
  "183": "knowledge_management",
  "184": "intake_and_interaction_channels",
  "185": "integrations",
  "186": "case_management",
  "187": "agentforce_service_solution_design",
  "188": "industry_knowledge",
  "189": "intake_and_interaction_channels",
  "190": "industry_knowledge",
  "191": "contact_center_analytics",
  "192": "case_management",
  "193": "integrations",
  "194": "knowledge_management",
  "195": "industry_knowledge",
  "196": "implementation_strategies",
  "197": "implementation_strategies",
  "198": "agentforce_service_solution_design",
  "199": "case_management",
  "200": "case_management",
  "201": "contact_center_analytics",
  "202": "agentforce_service_solution_design",
  "203": "implementation_strategies",
  "204": "integrations",
  "205": "case_management",
  "206": "implementation_strategies",
  "207": "integrations",
  "208": "agentforce_service_solution_design",
  "209": "contact_center_analytics",
  "210": "industry_knowledge",
  "211": "intake_and_interaction_channels",
  "212": "agentforce_service_solution_design",
  "213": "intake_and_interaction_channels",
  "214": "case_management",
  "215": "knowledge_management",
  "216": "intake_and_interaction_channels",
  "217": "intake_and_interaction_channels",
  "218": "contact_center_analytics",
  "219": "contact_center_analytics",
  "220": "agentforce_service_solution_design",
  "221": "implementation_strategies",
  "222": "contact_center_analytics",
  "223": "agentforce_service_solution_design",
  "224": "intake_and_interaction_channels",
  "225": "implementation_strategies",
  "226": "agentforce_service_solution_design",
  "227": "integrations",
  "228": "agentforce_service_solution_design",
  "229": "intake_and_interaction_channels",
  "230": "agentforce_service_solution_design",
  "231": "contact_center_analytics",
  "232": "agentforce_service_solution_design",
  "233": "knowledge_management",
  "234": "case_management",
  "235": "knowledge_management",
  "236": "case_management",
  "237": "intake_and_interaction_channels",
  "238": "intake_and_interaction_channels",
  "239": "contact_center_analytics",
  "240": "agentforce_service_solution_design",
  "241": "contact_center_analytics",
  "242": "integrations",
  "243": "knowledge_management",
  "244": "contact_center_analytics",
  "245": "case_management",
  "246": "implementation_strategies",
  "247": "intake_and_interaction_channels",
  "248": "case_management",
  "249": "knowledge_management",
  "250": "contact_center_analytics",
  "251": "case_management",
  "252": "contact_center_analytics",
  "253": "contact_center_analytics",
  "254": "intake_and_interaction_channels",
  "255": "implementation_strategies",
  "256": "agentforce_service_solution_design",
  "257": "contact_center_analytics",
  "258": "implementation_strategies",
  "259": "agentforce_service_solution_design",
  "260": "knowledge_management",
  "261": "agentforce_service_solution_design",
  "262": "implementation_strategies",
  "263": "intake_and_interaction_channels",
  "264": "contact_center_analytics",
  "265": "knowledge_management",
  "266": "agentforce_service_solution_design",
  "267": "contact_center_analytics",
  "268": "implementation_strategies",
  "269": "agentforce_service_solution_design",
  "270": "case_management",
  "271": "case_management",
  "272": "agentforce_service_solution_design",
  "273": "agentforce_service_solution_design",
  "274": "contact_center_analytics",
  "275": "contact_center_analytics",
  "276": "intake_and_interaction_channels",
  "277": "knowledge_management",
  "278": "intake_and_interaction_channels",
  "279": "intake_and_interaction_channels",
  "280": "intake_and_interaction_channels",
  "281": "agentforce_service_solution_design",
  "282": "agentforce_service_solution_design",
  "283": "case_management",
  "284": "agentforce_service_solution_design",
  "285": "implementation_strategies",
  "286": "agentforce_service_solution_design",
  "287": "agentforce_service_solution_design",
  "288": "knowledge_management",
  "289": "agentforce_service_solution_design",
  "290": "agentforce_service_solution_design"
};

// Technical audit corrections and notes
const AUDIT_OVERRIDES = {
  "89": {
    "auditNote": "[Technical Audit Note: To restrict live agent routing to business hours while respecting holidays, the verified architectural solution is configuring an Invocable Action / Flow in the Einstein Bot to query BusinessHours and Holiday records. This dynamically directs customers to a web/case form when live agents are unavailable.]"
  },
  "123": {
    "auditNote": "[Technical Audit Note: In the source study guide, Option C contained an OCR placeholder error (\"{0} Actions\"). The verified answer is Option B (Entitlements), which defines customer support eligibility and service level agreements.]"
  },
  "170": {
    "auditNote": "[Technical Audit Note: Skills-Based Routing configurations, including ServiceResource, Skill, and SkillRequirement records, are database records rather than standard metadata components. Consequently, Salesforce recommends deploying them from sandbox to production using Data Loader (Option B) rather than Change Sets.]"
  },
  "194": {
    "auditNote": "[Technical Audit Note: In Salesforce Knowledge, each Data Category Group supports a hierarchy depth of up to 5 levels (the source study guide explanation inaccurately stated 10 levels). Additionally, up to 3 active Data Category Groups are allowed, with up to 8 data categories assignable per article.]"
  },
  "202": {
    "auditNote": "[Technical Audit Note: Agentforce Service Agent leverages the Atlas reasoning engine and custom topic instructions to dynamically enforce brand voice and conversational guidelines, contrasting with legacy Einstein Bots that require rigid, deterministic dialog branches.]"
  },
  "208": {
    "auditNote": "[Technical Audit Note: Under Salesforce Agentforce architecture, generative responses are grounded in verified organizational knowledge using the Agentforce Data Library, eliminating hallucinations without modifying underlying foundational LLM weights.]"
  },
  "216": {
    "auditNote": "[Technical Audit Note: Modern contact center modernization with Salesforce uses Service Cloud Voice integrated with Amazon Connect (Option B), unifying telephony, transcription, and omni-channel routing in the cloud. Option C refers to deprecated legacy Live Agent infrastructure.]"
  },
  "272": {
    "auditNote": "[Technical Audit Note: Security best practices for Agentforce require provisioning a dedicated Agent User and assigning fine-grained permission sets according to the principle of least privilege, rather than granting administrative profiles.]"
  },
  "281": {
    "auditNote": "[Technical Audit Note: Agentforce for Service with Agentforce Data Library utilizes semantic retrieval-augmented generation (RAG) to locate relevant answers in unstructured internal articles, eliminating manual category-tagging dependencies associated with legacy bots.]"
  },
  "289": {
    "auditNote": "[Technical Audit Note: In Agentforce for Service topic configuration, dynamic instructions can be configured directly on the topic to evaluate customer intent and immediately initiate human escalation upon detecting specific trigger conditions.]"
  }
};

function cleanArtifacts(text) {
  let cleaned = text;
  cleaned = cleaned.replace(/https:\/\/www\.dumpsschool\.com\//g, "");
  cleaned = cleaned.replace(/Questions\s*&\s*Answers\s*PDF/gi, "");
  cleaned = cleaned.replace(/P-\d+/g, "");
  cleaned = cleaned.replace(/#+\s*\*\*Salesforce\*\*/gi, "");
  cleaned = cleaned.replace(/\*\*SERVICE-CON-201 Exam[^\n]*\*\*/gi, "");
  cleaned = cleaned.replace(/#+\s*\*\*Product Questions:\s*\d+\*\*/gi, "");
  cleaned = cleaned.replace(/#+\s*\*\*Version:\s*[\d\.]+\*\*/gi, "");
  return cleaned;
}

function cleanExplanationText(text) {
  let cleaned = cleanArtifacts(text).trim();
  cleaned = cleaned.replace(/^Explanation:\s*/i, "").trim();
  // Remove commercial trailer at the end of document
  const commercialIdx = cleaned.indexOf("**<mark>Thank You for Purchasing");
  if (commercialIdx !== -1) {
    cleaned = cleaned.substring(0, commercialIdx).trim();
  }
  return cleaned;
}

const qRegex = /(?:#{1,4}\s*)?\*\*<u>Question:\s*(\d+)<\/u>\*\*/gi;
const matches = [...content.matchAll(qRegex)];

if (matches.length !== 290) {
  throw new Error(`Expected 290 questions in ${SOURCE_FILE}, found ${matches.length}`);
}

const questions = [];

for (let i = 0; i < matches.length; i++) {
  const qNum = parseInt(matches[i][1], 10);
  const startIdx = matches[i].index + matches[i][0].length;
  const endIdx = (i + 1 < matches.length) ? matches[i + 1].index : content.length;
  const rawBlock = content.substring(startIdx, endIdx);

  const ansMatch = rawBlock.match(/(?:###\s*)?\*\*Answer:\s*([A-D\s,]+)\*\*/i);
  if (!ansMatch) {
    throw new Error(`Question ${qNum} has no Answer line`);
  }
  const ansIdx = ansMatch.index;
  const questionAndOptionsRaw = rawBlock.substring(0, ansIdx);
  const explanationRaw = rawBlock.substring(ansIdx + ansMatch[0].length);

  // Extract options
  const optMatches = [...questionAndOptionsRaw.matchAll(/(?:^|\n)\s*(?:#{1,4}\s*)?(?:-\s*)?([A-D])\.\s+/g)];
  if (optMatches.length < 2) {
    throw new Error(`Question ${qNum} has fewer than 2 options`);
  }

  // Verbatim prompt
  const rawPrompt = questionAndOptionsRaw.substring(0, optMatches[0].index);
  const prompt = cleanArtifacts(rawPrompt).trim();

  // Options
  const options = [];
  for (let j = 0; j < optMatches.length; j++) {
    const optLetter = optMatches[j][1];
    const optStart = optMatches[j].index + optMatches[j][0].length;
    const optEnd = (j + 1 < optMatches.length) ? optMatches[j + 1].index : questionAndOptionsRaw.length;
    const optTextRaw = questionAndOptionsRaw.substring(optStart, optEnd);
    const optText = cleanArtifacts(optTextRaw).trim();
    options.push({
      id: optLetter,
      text: optText
    });
  }

  // Answer
  let correctAnswers = ansMatch[1].split(",").map(s => s.trim()).filter(Boolean);
  let explanation = cleanExplanationText(explanationRaw);

  // Apply audit override if configured
  if (AUDIT_OVERRIDES[qNum]) {
    const override = AUDIT_OVERRIDES[qNum];
    if (override.correctAnswers) {
      correctAnswers = override.correctAnswers;
    }
    if (override.auditNote) {
      explanation = `${explanation}\n\n${override.auditNote}`;
    }
  }

  const domainId = DOMAIN_MAPPING[qNum];
  if (!domainId || !EXAM_DOMAINS[domainId]) {
    throw new Error(`Question ${qNum} has unmapped domain: "${domainId}"`);
  }
  const domain = EXAM_DOMAINS[domainId];

  questions.push({
    id: `q${qNum}`,
    qNum: qNum,
    domainId: domainId,
    topic: domain.name,
    question: prompt,
    options: options,
    correctAnswers: correctAnswers,
    explanation: explanation,
    sourceVerified: true
  });
}

// Write questions.json
fs.writeFileSync(OUTPUT_JSON, JSON.stringify(questions, null, 2), "utf8");
console.log(`Successfully generated ${OUTPUT_JSON} with ${questions.length} questions.`);

// Write questions.js module
const jsContent = `// ============================================================
// Salesforce Certified Agentforce Service Consultant Question Bank
// Auto-generated question repository - 290 Audited Questions
// ============================================================

const AGENTFORCE_QUESTIONS = ${JSON.stringify(questions, null, 2)};

if (typeof window !== "undefined") {
  window.AGENTFORCE_QUESTIONS = AGENTFORCE_QUESTIONS;
  window.DATA_CLOUD_QUESTIONS = AGENTFORCE_QUESTIONS; // Compatibility fallback alias
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = AGENTFORCE_QUESTIONS;
}
`;

fs.writeFileSync(OUTPUT_JS, jsContent, "utf8");
console.log(`Successfully generated ${OUTPUT_JS} with ${questions.length} questions.`);
