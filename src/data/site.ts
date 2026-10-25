
import type { NavItem } from "@/types";

export const site = {
  name: "Aaroh Dharmadhikari",
  role: "Software Developer · AI & Web Development",
  headline: "Building thoughtful digital experiences.",
  intro:
    "I build web applications and explore practical applications of artificial intelligence, with a focus on useful features, clean interfaces, and maintainable software.",
  location: "Pune, India",
  availability: "Contact me to discuss a project",
  email: "say2aaroh@gmail.com",
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/aarohDharmadhikari",
    },
  ],
};

export const nav: NavItem[] = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];
