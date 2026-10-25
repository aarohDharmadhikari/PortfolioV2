export type ExperienceKind = "employment" | "internship" | "education" | "certification";

export interface ExperienceEntry {
  id: string;
  kind: ExperienceKind;
  title: string;
  org: string;
  start?: string;
  end?: string; // omit for ongoing
  description?: string;
  link?: string; // renders only when set
}
