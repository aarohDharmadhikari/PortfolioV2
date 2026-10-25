import type { Service } from "@/types/services";

// SAMPLE DATA: every service, option, timeline and budget band below is a
// placeholder to show how the configurator works. Replace with your real catalogue.
const timeline = {
  id: "timeline",
  label: "Desired timeline",
  kind: "single" as const,
  choices: [
    { value: "flexible", label: "Flexible" },
    { value: "soon", label: "As soon as possible" },
    { value: "date", label: "Fixed date (describe in notes)" },
  ],
};

export const services: Service[] = [
  {
    id: "web-app",
    name: "Web application [sample]",
    summary: "Sample entry: a custom web app. Replace this description.",
    category: "Web",
    pricing: null,
    available: true,
    options: [
      {
        id: "scope",
        label: "Scope",
        kind: "single",
        required: true,
        choices: [
          { value: "prototype", label: "Prototype" },
          { value: "mvp", label: "MVP" },
          { value: "full", label: "Full product" },
        ],
      },
      {
        id: "features",
        label: "Features needed",
        kind: "multi",
        help: "Optional. Pick any that apply.",
        choices: [
          { value: "auth", label: "User accounts" },
          { value: "dashboard", label: "Dashboard" },
          { value: "api", label: "API integration" },
          { value: "payments", label: "Payments" },
        ],
      },
      { id: "description", label: "Project description", kind: "textarea", required: true },
      timeline,
    ],
  },
  {
    id: "site",
    name: "Website [sample]",
    summary: "Sample entry: a marketing or portfolio website. Replace this description.",
    category: "Web",
    pricing: null,
    available: true,
    options: [
      {
        id: "pages",
        label: "Approximate number of pages",
        kind: "single",
        required: true,
        choices: [
          { value: "1", label: "One page" },
          { value: "2-5", label: "2–5 pages" },
          { value: "6+", label: "6 or more" },
        ],
      },
      {
        id: "design",
        label: "Design preferences",
        kind: "text",
        help: "Optional. Links, moods, references.",
      },
      timeline,
    ],
  },
  {
    id: "custom",
    name: "Custom request",
    summary: "Something that doesn't fit the packages above? Describe it in your own words.",
    category: "Custom",
    pricing: null,
    available: true,
    options: [],
  },
];
