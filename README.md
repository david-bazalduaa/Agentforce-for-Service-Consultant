# Salesforce Certified Agentforce Service Consultant Exam Simulator & Question Engine

[![Validation Status](https://img.shields.io/badge/Validation-100%25%20Verified%20(290%2F290)-success?style=flat-square&logo=salesforce)](scripts/validate-questions.js)
[![Passing Score](https://img.shields.io/badge/Passing%20Score-78%25-blue?style=flat-square)](app.js)
[![Exam Time](https://img.shields.io/badge/Exam%20Duration-105%20Minutes-informational?style=flat-square)](app.js)
[![Blueprint Domains](https://img.shields.io/badge/Official%20Domains-8%20Domains-purple?style=flat-square)](src/config/agentforce-domains.ts)

A high-performance, interactive exam simulator and question engine for the **Salesforce Certified Agentforce Service Consultant** credential. Built with verbatim exam scenario questions, rigorous answer key verification against official Agentforce Service and Service Cloud documentation, and the exact neumorphic soft-UI design system cloned from the parent repository ([Data-Cloud-Specialist](https://github.com/david-bazalduaa/Data-Cloud-Specialist)).

---

## 🎯 Exam Blueprint & Question Distribution

All 290 questions from `5_AgentforceServiceConsultant.md` are audited, validated, and mapped across the 8 official exam domains:

| Domain ID | Official Exam Domain Name | Exam Weight | Audited Questions | Actual Distribution |
| :--- | :--- | :---: | :---: | :---: |
| `industry_knowledge` | **Industry Knowledge** | 12% | 35 Qs | 12.1% |
| `implementation_strategies` | **Implementation Strategies** | 12% | 35 Qs | 12.1% |
| `agentforce_service_solution_design` | **Agentforce Service Solution Design** | 15% | 44 Qs | 15.2% |
| `knowledge_management` | **Knowledge Management** | 12% | 35 Qs | 12.1% |
| `intake_and_interaction_channels` | **Intake and Interaction Channels** | 13% | 38 Qs | 13.1% |
| `case_management` | **Case Management** | 13% | 37 Qs | 12.8% |
| `contact_center_analytics` | **Contact Center Analytics** | 13% | 37 Qs | 12.8% |
| `integrations` | **Integrations** | 10% | 29 Qs | 10.0% |
| **TOTAL** | **8 Official Blueprint Domains** | **100%** | **290 Qs** | **100.0%** |

---

## ⚡ Core Engine Features

- **Verbatim Scenario Integrity**: All 290 original scenario prompts preserved verbatim from `5_AgentforceServiceConsultant.md` with zero rewrites, paraphrasing, or truncations.
- **Rigorous Technical Audit**: Audited against official Salesforce Agentforce / Service Cloud documentation. Incorporated 10 technical audit notes clarifying architectural subtleties, legacy feature deprecations (e.g. Live Agent vs modern Service Cloud Voice / Messaging), configuration data migration nuances (Data Loader vs Change Sets), and Agentforce topic instructions / Atlas reasoning engine capabilities.
- **Dual-Shuffle Engine**: Utilizes unbiased Fisher-Yates randomization to shuffle questions and answer option positions per session without altering answer key pointers.
- **Dual Operating Modes**:
  - **Study Mode**: Immediate feedback on answer selection with color-coded results and rich architectural explanations.
  - **Exam Mode**: Simulates the authentic exam experience with a 105-minute live countdown timer, 78% passing threshold, hidden answer reveals, and an end-of-exam performance report with SVG circular score ring and per-domain breakdown table.
- **Neumorphic Soft-UI**: Faithful monochrome slate / soft-gray color palette, tactile pill buttons, and responsive container layout.

---

## 🛠️ Project Structure

```text
├── 5_AgentforceServiceConsultant.md   # Source curriculum & 290-question bank
├── 5_AgentforceServiceConsultant.pdf  # Source study guide reference PDF
├── index.html                         # Primary application entry point & 10 tab panes
├── styles.css                         # Neumorphic soft-UI styling & design system
├── app.js                             # Simulator state machine, timer, scoring & rendering
├── questions.json                     # Structured, typed 290-question bank
├── questions.js                       # Browser & Node.js dual module export
├── package.json                       # Project metadata and test/validation scripts
├── src/
│   └── config/
│       ├── agentforce-domains.ts      # TypeScript domain definitions & weights
│       ├── agentforce-domains.js      # CommonJS runtime domain configuration
│       ├── exam-domains.ts            # Compatibility alias export
│       └── exam-domains.js            # Compatibility alias export
└── scripts/
    ├── parse-and-build.js             # Autonomous markdown parser & builder
    └── validate-questions.js          # Automated integrity and domain validation suite
```

---

## 🚀 Quick Start

### 1. Run Validation Suite
Verify 100% integrity, schema compliance, and domain distribution across all 290 questions:
```bash
npm test
# or
npm run validate
```

### 2. Rebuild Question Bank
Extract and regenerate `questions.json` and `questions.js` from source markdown:
```bash
npm run parse
```

### 3. Launch the Simulator Locally
Serve the application locally using any static web server:
```bash
npm start
# or
python3 -m http.server 8080
```
Open `http://localhost:8080` in your web browser. When prompted by the security gate, use the standard access password (`Salesforce2026`).

---

## 🛡️ License

MIT License. Designed and engineered for Salesforce Certification excellence.
