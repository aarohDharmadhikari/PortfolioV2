import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = { title: "Experience" };

export default function ExperiencePage() {
  return (
    <div className="wrap pt-40">
      <p className="label">Index / Experience</p>
      <h1 className="mt-4 max-w-4xl font-display text-6xl leading-[0.98] sm:text-8xl">Experience</h1>
      <section className="mt-16 grid gap-6 border-y border-ink/15 py-8 md:grid-cols-12" aria-labelledby="internship">
        <p className="label md:col-span-3">Internship</p>
        <div className="md:col-span-9">
          <h2 id="internship" className="font-display text-3xl">Equal Opportunity Cell, Vishwakarma University</h2>
          <p className="mt-4 max-w-prose text-ink/70">Worked on speech-to-text and dialect normalization for Ahirani.</p>
          <Link href="/projects/ahirani-speech-to-text" className="mt-6 inline-flex items-center gap-2 text-sm underline underline-offset-4 hover:text-plum">
            View project <ArrowUpRight size={16} aria-hidden />
          </Link>
        </div>
      </section>
    </div>
  );
}
