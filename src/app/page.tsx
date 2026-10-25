import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Reveal from "@/components/ui/Reveal";
import { site } from "@/data/site";
import { projects, statusLabel } from "@/data/projects";

export default function HomePage() {
  return (
    <>
      <section className="wrap grid gap-10 pb-24 pt-40 lg:grid-cols-12 lg:pt-52">
        <div className="lg:col-span-9">
          <p className="label">{site.role}</p>
          <h1 className="mt-6 font-display text-[clamp(3.25rem,10vw,9rem)] leading-[0.92] tracking-tight">{site.headline}</h1>
          <p className="mt-10 max-w-xl text-lg text-ink/70">{site.intro}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link href="/projects" className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-paper transition-colors hover:bg-plum">
              View projects <ArrowUpRight size={16} />
            </Link>
            <Link href="/services" className="rounded-full border border-ink/25 px-6 py-3 text-sm transition-colors hover:border-ink">
              Request a service
            </Link>
          </div>
        </div>
        <dl className="space-y-5 border-t border-ink/15 pt-5 lg:col-span-3 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
          <div><dt className="label">Name</dt><dd className="mt-1">{site.name}</dd></div>
          <div><dt className="label">Based in</dt><dd className="mt-1">{site.location}</dd></div>
          <div><dt className="label">Availability</dt><dd className="mt-1">{site.availability}</dd></div>
        </dl>
      </section>

      <section className="wrap">
        <div className="flex items-end justify-between border-t border-ink/15 pt-6">
          <h2 className="font-display text-3xl sm:text-4xl">Selected work</h2>
          <Link href="/projects" className="text-sm underline underline-offset-4 hover:text-plum">All projects</Link>
        </div>
        <ul>
          {projects.slice(0, 3).map((p, i) => (
            <li key={p.slug}>
              <Reveal>
                <Link href={`/projects/${p.slug}`} className="group grid items-baseline gap-2 border-b border-ink/15 py-8 transition-colors hover:bg-ink/[0.03] md:grid-cols-12 md:gap-8">
                  <span className="label md:col-span-1">{String(i + 1).padStart(2, "0")}</span>
                  <span className="font-display text-3xl transition-colors group-hover:text-plum sm:text-4xl md:col-span-7">{p.title}</span>
                  <span className="text-sm text-ink/60 md:col-span-3">{p.category} · {statusLabel[p.status]}</span>
                  <ArrowUpRight size={20} aria-hidden className="hidden text-brass md:col-span-1 md:block md:justify-self-end" />
                </Link>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
