export type ProjectStatus = "completed" | "in-progress" | "planned" | "tbc";

export interface CaseStudy {
  problem?: string;
  goals?: string[];
  approach?: string;
  implementation?: string;
  outcomes?: string;
}

export interface Project {
  slug: string;
  title: string;
  summary: string;
  category: string;
  stack: string[];
  status: ProjectStatus;
  year?: string;
  image?: { src: string; alt: string };
  repoUrl?: string; // link renders only when set
  liveUrl?: string; // link renders only when set
  caseStudy?: CaseStudy;
}

export interface NavItem {
  href: string;
  label: string;
}
