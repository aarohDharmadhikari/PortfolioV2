"use client";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ArrowUpRight, Github, ExternalLink } from "lucide-react";
import type { Project } from "@/types";
import { statusLabel } from "@/data/projects";

export default function ProjectList({ projects }: { projects: Project[] }) {
  const categories = useMemo(() => ["All", ...Array.from(new Set(projects.map((p) => p.category)))], [projects]);
  const [active, setActive] = useState("All");
  const shown = active === "All" ? projects : projects.filter((p) => p.category === active);

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c}
            type="button"
            aria-pressed={active === c}
            onClick={() => setActive(c)}
            className={`rounded-full border px-4 py-1.5 text-sm transition-colors ${active === c ? "border-ink bg-ink text-paper" : "border-ink/20 hover:border-ink"}`}
          >
            {c}
          </button>
        ))}
      </div>

      <ul className="mt-10 border-t border-ink/15" aria-live="polite">
        {shown.length === 0 && <li className="py-10 text-ink/60">No projects in this category yet.</li>}
        {shown.map((p, i) => (
          <li key={p.slug} className="group relative border-b border-ink/15">
            <div className="grid gap-4 py-8 md:grid-cols-12 md:gap-8">
              <span className="label md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
              <div className="md:col-span-6">
                <h2 className="font-display text-3xl leading-tight sm:text-4xl">
                  <Link href={`/projects/${p.slug}`} className="transition-colors after:absolute after:inset-0 group-hover:text-plum">
                    {p.title}
                  </Link>
                </h2>
                <p className="mt-3 max-w-prose text-ink/70">{p.summary}</p>
              </div>
              <div className="relative z-10 flex flex-col gap-3 md:col-span-3">
                <span className="label">{p.category}</span>
                <span className="text-sm">{statusLabel[p.status]}</span>
                {p.stack.length > 0 && <span className="text-sm text-ink/60">{p.stack.join(" · ")}</span>}
              </div>
              <div className="relative z-10 flex items-start gap-3 md:col-span-2 md:justify-end">
                {p.repoUrl && (
                  <a href={p.repoUrl} target="_blank" rel="noreferrer" aria-label={`${p.title} repository`} className="rounded-full border border-ink/20 p-2 hover:border-ink">
                    <Github size={16} />
                  </a>
                )}
                {p.liveUrl && (
                  <a href={p.liveUrl} target="_blank" rel="noreferrer" aria-label={`${p.title} live demo`} className="rounded-full border border-ink/20 p-2 hover:border-ink">
                    <ExternalLink size={16} />
                  </a>
                )}
                <ArrowUpRight size={20} aria-hidden className="mt-1.5 text-brass transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
