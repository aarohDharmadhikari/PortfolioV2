import type { NavItem } from "@/types";

// PLACEHOLDERS: replace every "[...]" value. Components render these as-is.
export const site = {
  name: "[Your Name]",
  role: "[Your role, e.g. Software Developer]",
  headline: "Software built with precision and care.",
  intro: "[Placeholder] One or two sentences about what you build and who you build it for.",
  location: "[City, Country]",
  availability: "[Availability status]",
  email: null as string | null,
  socials: [] as { label: string; href: string }[],
};

export const nav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];
