export interface Role {
  title: string;
  company: string;
  date: string;
  bullets: string[];
  tags: string[];
}

export const experience: Role[] = [
  {
    title: "Technical Consultant",
    company: "KPMG Nederland",
    date: "Mar 2026 — Present",
    bullets: [
      "Advise clients on AI-enabled solutions and how to operationalize ML inside their organizations.",
      "Bridge technical delivery and stakeholder strategy across cloud and data workstreams.",
    ],
    tags: ["Azure", "AWS", "Kubernetes", "Docker", "Stakeholder Mgmt"],
  },
  {
    title: "AI Engineer",
    company: "EXIN",
    date: "Nov 2024 — Feb 2026",
    bullets: [
      "Built AI tools that made data-driven decisions across the org faster and cheaper.",
      "Led organization-wide AI initiatives and strategy.",
      "Designed and deployed an end-to-end RAG pipeline that generated complete examinations — cutting cost ~65% while improving turnaround.",
      "Worked in agile ceremonies and sprint planning alongside delivery teams.",
    ],
    tags: ["RAG", "AI/ML", "Azure", "Kubernetes", "Docker", "IAM", "Agile"],
  },
  {
    title: "Teaching Assistant",
    company: "TU Delft",
    date: "Nov 2023 — Jul 2024",
    bullets: [
      "Designed and maintained ML MOOC content for 200+ students.",
      "Gave personalized feedback to 150+ students, lifting participation and engagement.",
      "Taught ~80 students to work with LLMs for information retrieval, and ~85 more on RAG for response generation in conversational agents.",
      "Contributed technical documentation to make assignments learnable for future cohorts.",
    ],
    tags: ["NLP", "RAG", "Agentic AI", "MongoDB", "Teaching", "Docs"],
  },
  {
    title: "Research Assistant",
    company: "TU Delft",
    date: "Jan 2023 — Jul 2023",
    bullets: [
      "Scraped the web for public opinion on environment-sensitive topics.",
      "Experimented with SLMs and LLMs for translation and sentiment analysis.",
      "Trained custom models for topic classification and opinion mining.",
      "Recorded and analyzed experimental results to improve model performance.",
    ],
    tags: [
      "Sentiment Analysis",
      "Topic Classification",
      "Opinion Mining",
      "Web Scraping",
      "APIs",
    ],
  },
];
