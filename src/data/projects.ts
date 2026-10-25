
import type { Project, ProjectStatus } from "@/types";

export const statusLabel: Record<ProjectStatus, string> = {
  completed: "Completed",
  "in-progress": "In progress",
  planned: "Planned",
  tbc: "Status to confirm",
};

export const projects: Project[] = [
  {
    slug: "repograph",
    title: "REPOGRAPH",
    summary:
      "A Git repository intelligence application with a dashboard frontend.",
    category: "Web",
    stack: ["Next.js"],
    status: "tbc",
  },
  {
    slug: "max-ai-operating-system",
    title: "MAX AI Operating System",
    summary:
      "An AI operating-layer project exploring assistance, memory, and automation across devices.",
    category: "AI / Systems",
    stack: [],
    status: "tbc",
  },
  {
    slug: "ahirani-speech-to-text",
    title: "Ahirani Speech-to-Text",
    summary:
      "A speech-to-text and dialect-normalization project for Ahirani, associated with an internship at Vishwakarma University.",
    category: "AI / ML",
    stack: ["Python", "Whisper"],
    status: "tbc",
  },
  {
    slug: "ai-bhavishya-patrika",
    title: "AI Bhavishya Patrika",
    summary:
      "An AI-focused project exploring a digital Bhavishya Patrika experience.",
    category: "AI / ML",
    stack: [],
    status: "tbc",
  },
  {
    slug: "resume-analyzer",
    title: "Resume Analyzer",
    summary:
      "A project focused on analyzing resume content.",
    category: "AI / ML",
    stack: [],
    status: "tbc",
  },
  {
    slug: "ai-plagiarism-detection",
    title: "AI Plagiarism Detection",
    summary:
      "A project focused on detecting potential plagiarism in submitted content.",
    category: "AI / ML",
    stack: [],
    status: "tbc",
  },
  {
    slug: "energy-aware-orchestrator",
    title: "Energy-Aware Workload Migration Orchestrator",
    summary:
      "A two-person project involving a data engine and a telemetry-driven machine-learning logic engine for data-center power efficiency.",
    category: "AI / ML",
    stack: [],
    status: "tbc",
  },
];

export const getProject = (slug: string) =>
  projects.find((project) => project.slug === slug);
