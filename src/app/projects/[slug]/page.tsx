import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { getProject, projects, statusLabel } from "@/data/projects";

type Props = { params: Promise<{ slug: string }> };

export const generateStaticParams = () => projects.map((p) => ({ slug: p.slug }));
export const generateMetadata = async ({ params }: Props): Promise<Metadata> => ({ title: getProject((await params).slug)?.title ?? "Project" });

function Block({ label, children }: { label: string; children?: React.ReactNode }) {
  return (
    <section className="grid gap-4 border-t border-ink/15 py-8 md:grid-cols-12">
      <h2 className="label md:col-span-3">{label}</h2>
      <div className="md:col-span-9">
        {children ?? <p className="text-ink/45">[Placeholder] Not written yet — add it in src/data/projects.ts.</p>}
      </div>
    </section>
  );
}

export default async function ProjectPage({ params }: Props) {
  const p = getProject((await params).slug);
  if (!p) notFound();
  const cs = p.caseStudy;

  return (
    <article className="wrap pt-40">
      <Link href="/projects" className="inline-flex items-center gap-2 text-sm text-ink/60 hover:text-ink">
        <ArrowLeft size={16} /> All projects
      </Link>
      <h1 className="mt-8 max-w-5xl font-display text-5xl leading-[1] sm:text-7xl">{p.title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-ink/70">{p.summary}</p>
      <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-ink/15 pt-6 sm:grid-cols-4">
        <div><dt className="label">Category</dt><dd className="mt-1">{p.category}</dd></div>
        <div><dt className="label">Status</dt><dd className="mt-1">{statusLabel[p.status]}</dd></div>
        <div><dt className="label">Stack</dt><dd className="mt-1">{p.stack.length ? p.stack.join(", ") : "[Placeholder]"}</dd></div>
        <div>
          <dt className="label">Links</dt>
          <dd className="mt-1 flex gap-4">
            {p.repoUrl && <a className="underline underline-offset-4" href={p.repoUrl} target="_blank" rel="noreferrer">Repository</a>}
            {p.liveUrl && <a className="underline underline-offset-4" href={p.liveUrl} target="_blank" rel="noreferrer">Live demo</a>}
            {!p.repoUrl && !p.liveUrl && <span className="text-ink/45">None supplied</span>}
          </dd>
        </div>
      </dl>
      <div className="mt-16">
        <Block label="Problem">{cs?.problem && <p className="max-w-prose">{cs.problem}</p>}</Block>
        <Block label="Goals">{cs?.goals?.length ? <ul className="list-disc space-y-2 pl-5">{cs.goals.map((g) => <li key={g}>{g}</li>)}</ul> : undefined}</Block>
        <Block label="Approach">{cs?.approach && <p className="max-w-prose">{cs.approach}</p>}</Block>
        <Block label="Implementation">{cs?.implementation && <p className="max-w-prose">{cs.implementation}</p>}</Block>
        <Block label="Outcomes">{cs?.outcomes && <p className="max-w-prose">{cs.outcomes}</p>}</Block>
      </div>
    </article>
  );
}
