import type { Project, ProjectStatus } from "@/types";

export const statusLabel: Record<ProjectStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  planned: "Planned",
  tbc: "Status to confirm",
};

// Titles/summaries come from your own project notes; statuses, years, links and
// case-study text are intentionally unset. Fill them in here only.
export const projects: Project[] = [
  {
    slug: "repograph",
    title: "REPOGRAPH",
    summary: "Git repository intelligence web app with a dashboard frontend.",
    category: "Web",
    stack: ["Next.js"],
    status: "tbc",
  },
  {
    slug: "energy-aware-orchestrator",
    title: "Energy-Aware Workload Migration Orchestrator",
    summary:
      "Two-person project: a data engine plus a telemetry-driven ML logic engine for datacenter power efficiency.",
    category: "AI / ML",
    stack: [],
    status: "tbc",
  },
  {
    slug: "ahirani-speech-to-text",
    title: "Ahirani Speech-to-Text",
    summary:
      "Internship project at the Equal Opportunity Cell, Vishwakarma University: speech-to-text and dialect normalization for Ahirani.",
    category: "AI / ML",
    stack: [],
    status: "tbc",
  },
];

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);
