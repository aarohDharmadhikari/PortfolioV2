"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { mockAuth } from "@/lib/adapters/auth";
import DemoNotice from "@/components/ui/DemoNotice";
import EntityPanel, { type Item } from "./EntityPanel";
import { projects, statusLabel } from "@/data/projects";
import { experience, kindLabel } from "@/data/experience";
import { services } from "@/data/services";

const projectItems: Item[] = projects.map((p) => ({ id: p.slug, title: p.title, meta: p.category, status: statusLabel[p.status] }));
const experienceItems: Item[] = experience.map((e) => ({ id: e.id, title: e.title, meta: `${kindLabel[e.kind]} · ${e.org}`, status: "Published" }));
const serviceItems: Item[] = services.map((s) => ({ id: s.id, title: s.name, meta: s.category, status: s.available ? "Available" : "Unavailable" }));
// Sample rows so the requests view has something to manage. Not real submissions.
const requestItems: Item[] = [
  { id: "r1", title: "Sample request A", meta: "Web application [sample]", status: "New" },
  { id: "r2", title: "Sample request B", meta: "Custom request [sample]", status: "In review" },
];

const TABS = [
  { id: "projects", label: "Projects", meta: "Category", statuses: Object.values(statusLabel), items: projectItems },
  { id: "experience", label: "Experience", meta: "Type · organisation", statuses: ["Published", "Draft"], items: experienceItems },
  { id: "services", label: "Services", meta: "Category", statuses: ["Available", "Unavailable"], items: serviceItems },
  { id: "requests", label: "Requests", meta: "Service", statuses: ["New", "In review", "Replied", "Closed"], items: requestItems },
] as const;

export default function Dashboard() {
  const router = useRouter();
  const [ready, setReady] = useState<"checking" | "in" | "out">("checking");
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("projects");

  useEffect(() => setReady(mockAuth.hasSession() ? "in" : "out"), []);

  if (ready === "checking") return <p className="wrap pt-40 text-ink/60">Loading…</p>;
  if (ready === "out")
    return (
      <div className="wrap pt-40">
        <h1 className="font-display text-5xl">Demo session not found</h1>
        <Link href="/admin/login" className="mt-6 inline-block underline underline-offset-4">Go to admin login</Link>
      </div>
    );

  const active = TABS.find((t) => t.id === tab) ?? TABS[0];

  return (
    <div className="wrap pt-40">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="label">Admin / Dashboard</p>
          <h1 className="mt-4 font-display text-5xl sm:text-7xl">Dashboard</h1>
        </div>
        <button type="button" onClick={() => { mockAuth.signOut(); router.push("/admin/login"); }} className="inline-flex items-center gap-2 rounded-full border border-ink/25 px-5 py-2.5 text-sm hover:border-ink">
          <LogOut size={16} /> Sign out
        </button>
      </div>
      <div className="mt-8"><DemoNotice>Prototype data. Changes live in this page only and reset on reload; nothing is saved to a database.</DemoNotice></div>

      <div role="tablist" aria-label="Sections" className="mt-10 flex flex-wrap gap-2 border-b border-ink/15 pb-4">
        {TABS.map((t) => (
          <button key={t.id} role="tab" id={`tab-${t.id}`} aria-selected={tab === t.id} aria-controls={`panel-${t.id}`} onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-1.5 text-sm ${tab === t.id ? "bg-ink text-paper" : "border border-ink/20 hover:border-ink"}`}>
            {t.label}
          </button>
        ))}
      </div>
      <div role="tabpanel" id={`panel-${active.id}`} aria-labelledby={`tab-${active.id}`} className="mt-8">
        <EntityPanel key={active.id} label={active.label} metaLabel={active.meta} statuses={[...active.statuses]} initial={active.items} />
      </div>
    </div>
  );
}
