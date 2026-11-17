// ============================================================
// Official Salesforce Certified Agentforce Service Consultant Exam Domains
// Category Definition & Domain Metadata Configuration (CommonJS)
// ============================================================

const EXAM_DOMAINS = {
  industry_knowledge: {
    id: "industry_knowledge",
    name: "Industry Knowledge",
    weight: 12,
    colorToken: "slate",
    topics: [
      "Contact Center Metrics & KPIs (FCR, CSAT, NPS, AHT, SLA)",
      "Contact Center Operations & Sourcing Models",
      "Customer Experience & Omni-Channel Strategy",
      "Industry Standards, Security & Regulatory Compliance"
    ]
  },
  implementation_strategies: {
    id: "implementation_strategies",
    name: "Implementation Strategies",
    weight: 12,
    colorToken: "slate",
    topics: [
      "Project Lifecycle & Delivery Methodologies (Agile, Scrum, Waterfall)",
      "Discovery, Scoping & Requirements Gathering",
      "Change Management, Enablement & User Adoption",
      "Release Management, Sandboxes & Data Migration Tooling"
    ]
  },
  agentforce_service_solution_design: {
    id: "agentforce_service_solution_design",
    name: "Agentforce Service Solution Design",
    weight: 15,
    colorToken: "slate",
    topics: [
      "Agentforce Service Agent & Atlas Reasoning Engine",
      "Standard & Custom Topics, Actions, and Instructions",
      "Einstein for Service (Bots, Copilot, Classification & Summaries)",
      "Prompt Builder, Einstein Trust Layer & Human Handoffs"
    ]
  },
  knowledge_management: {
    id: "knowledge_management",
    name: "Knowledge Management",
    weight: 12,
    colorToken: "slate",
    topics: [
      "Knowledge Lifecycle, Authoring & Approval Workflows",
      "Data Categories, Hierarchy & Article Visibility",
      "Knowledge-Centered Service (KCS) Methodology",
      "Knowledge Search, Multi-Language & Console Integration"
    ]
  },
  intake_and_interaction_channels: {
    id: "intake_and_interaction_channels",
    name: "Intake and Interaction Channels",
    weight: 13,
    colorToken: "slate",
    topics: [
      "Service Cloud Voice, Amazon Connect & Telephony",
      "Messaging for Web & In-App, SMS & Social Channels",
      "Omni-Channel Routing, Capacity & Presence Configuration",
      "Experience Cloud Self-Service, Web-to-Case & Email-to-Case"
    ]
  },
  case_management: {
    id: "case_management",
    name: "Case Management",
    weight: 13,
    colorToken: "slate",
    topics: [
      "Case Lifecycle, Assignment & Escalation Automation",
      "Entitlements, Service Contracts & Milestone Tracking",
      "Service Console, Macros, Quick Text & Recommendations",
      "Incident Management, Slack Swarming & Case Collaboration"
    ]
  },
  contact_center_analytics: {
    id: "contact_center_analytics",
    name: "Contact Center Analytics",
    weight: 13,
    colorToken: "slate",
    topics: [
      "Reports, Custom Report Types & Historical Trend Reporting",
      "Dynamic Dashboards, Component Matrix & Wallboards",
      "CRM Analytics (Tableau CRM) for Service Cloud",
      "Omni-Channel Supervisor Real-Time Monitoring & Metrics"
    ]
  },
  integrations: {
    id: "integrations",
    name: "Integrations",
    weight: 10,
    colorToken: "slate",
    topics: [
      "Integration Architecture & Enterprise Messaging Patterns",
      "MuleSoft & Anypoint Integration Connectors",
      "Salesforce Connect, External Objects & REST/SOAP APIs",
      "CTI Integration Architecture & External System Orchestration"
    ]
  }
};

module.exports = { EXAM_DOMAINS };
