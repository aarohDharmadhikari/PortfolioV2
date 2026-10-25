import type { ExperienceEntry, ExperienceKind } from "@/types/experience";

export const kindLabel: Record<ExperienceKind, string> = {
  employment: "Employment",
  internship: "Internships",
  education: "Education",
  certification: "Certifications",
};

// Only items you have told me about are listed. Dates are placeholders.
export const experience: ExperienceEntry[] = [
  {
    id: "eoc-internship",
    kind: "internship",
    title: "Speech-to-text internship (Ahirani)",
    org: "Equal Opportunity Cell, Vishwakarma University",
    start: "[start date]",
    end: "[end date]",
    description: "Building a speech-to-text and dialect normalization system for Ahirani.",
  },
];

// Add technical capabilities here, e.g. ["TypeScript", "Next.js"]. Empty on purpose.
export const capabilities: string[] = [];
