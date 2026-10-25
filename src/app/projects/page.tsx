import type { Metadata } from "next";
import ProjectList from "@/components/projects/ProjectList";
import { projects } from "@/data/projects";

export const metadata: Metadata = { title: "Projects" };

export default function ProjectsPage() {
  return (
    <div className="wrap pb-8 pt-40">
      <p className="label">Index / Projects</p>
      <h1 className="mt-4 max-w-4xl font-display text-6xl leading-[0.98] sm:text-8xl">Selected work</h1>
      <p className="mt-6 max-w-xl text-ink/70">Project details, links and case studies are edited in one file: src/data/projects.ts.</p>
      <div className="mt-16">
        <ProjectList projects={projects} />
      </div>
    </div>
  );
}
