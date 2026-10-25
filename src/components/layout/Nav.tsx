"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { nav, site } from "@/data/site";

export default function Nav() {
  const path = usePathname();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const isActive = (href: string) => (href === "/" ? path === "/" : path.startsWith(href));

  return (
    <header className="fixed inset-x-0 top-3 z-50 px-3 sm:px-6">
      {/* Glass is used here only: the floating navigation bar. */}
      <div className="mx-auto flex max-w-[1280px] items-center justify-between rounded-full border border-ink/10 bg-paper/75 px-5 py-2.5 backdrop-blur-md">
        <Link href="/" className="font-display text-lg tracking-tight">
          {site.name}
        </Link>
        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`relative rounded-full px-3.5 py-1.5 text-sm transition-colors hover:text-plum ${isActive(n.href) ? "text-ink" : "text-ink/60"}`}
                >
                  {n.label}
                  {isActive(n.href) && <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-brass" aria-hidden />}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="rounded-full p-2 md:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((o) => !o)}
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      {open && (
        <nav id="mobile-menu" aria-label="Mobile" className="mx-auto mt-2 max-w-[1280px] rounded-3xl border border-ink/10 bg-paper p-3 md:hidden">
          <ul>
            {nav.map((n) => (
              <li key={n.href}>
                <Link
                  href={n.href}
                  aria-current={isActive(n.href) ? "page" : undefined}
                  className={`flex items-center justify-between rounded-2xl px-4 py-3.5 font-display text-2xl ${isActive(n.href) ? "text-plum" : ""}`}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
