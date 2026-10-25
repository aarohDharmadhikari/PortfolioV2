import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { nav, site } from "@/data/site";

export default function Footer() {
  return (
    <footer className="mt-32 bg-ink text-paper">
      <div className="wrap py-20">
        <p className="font-mono text-[0.7rem] uppercase tracking-[0.14em] text-paper/60">Next step</p>
        <h2 className="mt-4 max-w-3xl font-display text-5xl leading-[1.02] sm:text-7xl">Have something in mind?</h2>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/services" className="inline-flex items-center gap-2 rounded-full bg-paper px-6 py-3 text-sm text-ink transition-colors hover:bg-brass hover:text-paper">
            Configure a request <ArrowUpRight size={16} />
          </Link>
          <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-paper/30 px-6 py-3 text-sm transition-colors hover:border-paper">
            Just say hello
          </Link>
        </div>
        <div className="mt-20 flex flex-col justify-between gap-6 border-t border-paper/15 pt-6 text-sm text-paper/70 sm:flex-row">
          <p>© {new Date().getFullYear()} {site.name}</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {nav.slice(1).map((n) => (
              <li key={n.href}>
                <Link href={n.href} className="hover:text-paper">{n.label}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
