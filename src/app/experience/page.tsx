import type { Metadata } from "next";
import { experience, capabilities, kindLabel } from "@/data/experience";
import type { ExperienceKind } from "@/types/experience";

export const metadata: Metadata = { title: "Experience" };

const order: ExperienceKind[] = ["employment", "internship", "education", "certification"];

export default function ExperiencePage() {
  return (
    <div className="wrap pt-40">
      <p className="label">Index / Experience</p>
      <h1 className="mt-4 max-w-4xl font-display text-6xl leading-[0.98] sm:text-8xl">Chronology</h1>
      <p className="mt-6 max-w-xl text-ink/70">Entries live in src/data/experience.ts. Sections with nothing yet say so rather than inventing history.</p>

      <div className="mt-16 space-y-16">
        {order.map((kind) => {
          const items = experience.filter((e) => e.kind === kind);
          return (
            <section key={kind} aria-labelledby={`h-${kind}`} className="grid gap-6 border-t border-ink/15 pt-6 md:grid-cols-12 md:gap-8">
              <h2 id={`h-${kind}`} className="font-display text-3xl md:col-span-3">{kindLabel[kind]}</h2>
              <div className="md:col-span-9">
                {items.length === 0 ? (
                  <p className="text-ink/45">[Placeholder] Nothing added yet.</p>
                ) : (
                  <ul className="space-y-8">
                    {items.map((e) => (
                      <li key={e.id} className="grid gap-2 sm:grid-cols-[10rem_1fr] sm:gap-8">
                        <p className="label pt-1.5">{e.start ?? "[start]"} – {e.end ?? "Present"}</p>
                        <div>
                          <h3 className="text-xl font-medium">{e.title}</h3>
                          <p className="text-ink/60">{e.org}</p>
                          {e.description && <p className="mt-3 max-w-prose text-ink/80">{e.description}</p>}
                          {e.link && <a href={e.link} target="_blank" rel="noreferrer" className="mt-3 inline-block text-sm underline underline-offset-4">Link</a>}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>
          );
        })}
        <section aria-labelledby="h-cap" className="grid gap-6 border-t border-ink/15 pt-6 md:grid-cols-12 md:gap-8">
          <h2 id="h-cap" className="font-display text-3xl md:col-span-3">Capabilities</h2>
          <div className="md:col-span-9">
            {capabilities.length === 0 ? (
              <p className="text-ink/45">[Placeholder] Nothing added yet.</p>
            ) : (
              <ul className="flex flex-wrap gap-2">{capabilities.map((c) => <li key={c} className="rounded-full border border-ink/20 px-4 py-1.5 text-sm">{c}</li>)}</ul>
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
