"use client";
import { useEffect, useRef, useState } from "react";
import { Pencil, Plus, Search, Trash2 } from "lucide-react";

export interface Item { id: string; title: string; meta: string; status: string }
interface Props { label: string; metaLabel: string; statuses: string[]; initial: Item[] }

const input = "mt-2 w-full rounded-xl border border-ink/25 bg-paper px-4 py-2.5 text-base focus:border-plum";
const empty = (statuses: string[]): Item => ({ id: "", title: "", meta: "", status: statuses[0] ?? "" });

export default function EntityPanel({ label, metaLabel, statuses, initial }: Props) {
  const [items, setItems] = useState(initial);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("All");
  const [draft, setDraft] = useState<Item | null>(null);
  const [titleErr, setTitleErr] = useState<string | null>(null);
  const [deleting, setDeleting] = useState<Item | null>(null);
  const [toast, setToast] = useState("");
  const editRef = useRef<HTMLDialogElement>(null);
  const delRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = editRef.current; if (!d) return;
    if (draft && !d.open) d.showModal(); else if (!draft && d.open) d.close();
  }, [draft]);
  useEffect(() => {
    const d = delRef.current; if (!d) return;
    if (deleting && !d.open) d.showModal(); else if (!deleting && d.open) d.close();
  }, [deleting]);

  const shown = items.filter((i) => (filter === "All" || i.status === filter) && `${i.title} ${i.meta}`.toLowerCase().includes(q.toLowerCase()));

  const save = (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    if (!draft.title.trim()) return setTitleErr("Title is required.");
    const isNew = !draft.id;
    setItems((cur) => (isNew ? [...cur, { ...draft, id: `demo-${Date.now()}` }] : cur.map((i) => (i.id === draft.id ? draft : i))));
    setToast(isNew ? "Added (demo data, not saved anywhere)." : "Updated (demo data, not saved anywhere).");
    setDraft(null); setTitleErr(null);
  };
  const confirmDelete = () => {
    if (!deleting) return;
    setItems((cur) => cur.filter((i) => i.id !== deleting.id));
    setToast("Deleted from demo data."); setDeleting(null);
  };

  return (
    <section aria-label={label}>
      <div className="flex flex-wrap items-end gap-3">
        <div className="relative min-w-[12rem] flex-1">
          <label htmlFor={`q-${label}`} className="sr-only">Search {label}</label>
          <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink/50" aria-hidden />
          <input id={`q-${label}`} type="search" placeholder={`Search ${label.toLowerCase()}`} className="w-full rounded-full border border-ink/25 bg-paper py-2.5 pl-10 pr-4" value={q} onChange={(e) => setQ(e.target.value)} />
        </div>
        <label className="sr-only" htmlFor={`f-${label}`}>Filter by status</label>
        <select id={`f-${label}`} className="rounded-full border border-ink/25 bg-paper px-4 py-2.5" value={filter} onChange={(e) => setFilter(e.target.value)}>
          {["All", ...statuses].map((s) => <option key={s}>{s}</option>)}
        </select>
        <button type="button" onClick={() => { setTitleErr(null); setDraft(empty(statuses)); }} className="inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 text-sm text-paper hover:bg-plum">
          <Plus size={16} /> New
        </button>
      </div>
      <p role="status" className="mt-3 min-h-5 text-sm text-ink/60">{toast}</p>

      {shown.length === 0 ? (
        <p className="mt-6 rounded-2xl border border-dashed border-ink/25 p-8 text-center text-ink/60">{items.length === 0 ? `No ${label.toLowerCase()} yet.` : "Nothing matches your search."}</p>
      ) : (
        <ul className="mt-4 border-t border-ink/15">
          {shown.map((i) => (
            <li key={i.id} className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b border-ink/15 py-4">
              <div className="min-w-[12rem] flex-1">
                <p className="font-medium">{i.title}</p>
                <p className="text-sm text-ink/60">{i.meta}</p>
              </div>
              <span className="label">{i.status}</span>
              <div className="flex gap-1">
                <button type="button" aria-label={`Edit ${i.title}`} onClick={() => { setTitleErr(null); setDraft(i); }} className="rounded-full p-2 hover:bg-ink/5"><Pencil size={16} /></button>
                <button type="button" aria-label={`Delete ${i.title}`} onClick={() => setDeleting(i)} className="rounded-full p-2 hover:bg-ink/5"><Trash2 size={16} /></button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <dialog ref={editRef} onClose={() => setDraft(null)} aria-labelledby={`dt-${label}`} className="w-[min(32rem,92vw)] rounded-3xl bg-paper p-6 text-ink backdrop:bg-ink/40">
        {draft && (
          <form onSubmit={save} noValidate className="space-y-4">
            <h3 id={`dt-${label}`} className="font-display text-2xl">{draft.id ? "Edit" : "New"} {label.toLowerCase().replace(/s$/, "")}</h3>
            <div>
              <label htmlFor="d-title" className="font-medium">Title</label>
              <input id="d-title" className={input} value={draft.title} aria-invalid={!!titleErr} onChange={(e) => setDraft({ ...draft, title: e.target.value })} />
              {titleErr && <p role="alert" className="mt-1 text-sm text-plum">{titleErr}</p>}
            </div>
            <div>
              <label htmlFor="d-meta" className="font-medium">{metaLabel}</label>
              <input id="d-meta" className={input} value={draft.meta} onChange={(e) => setDraft({ ...draft, meta: e.target.value })} />
            </div>
            <div>
              <label htmlFor="d-status" className="font-medium">Status</label>
              <select id="d-status" className={input} value={draft.status} onChange={(e) => setDraft({ ...draft, status: e.target.value })}>
                {statuses.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>
            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setDraft(null)} className="rounded-full border border-ink/25 px-5 py-2.5 text-sm">Cancel</button>
              <button type="submit" className="rounded-full bg-ink px-5 py-2.5 text-sm text-paper hover:bg-plum">Save</button>
            </div>
          </form>
        )}
      </dialog>

      <dialog ref={delRef} onClose={() => setDeleting(null)} aria-labelledby={`del-${label}`} className="w-[min(28rem,92vw)] rounded-3xl bg-paper p-6 text-ink backdrop:bg-ink/40">
        <h3 id={`del-${label}`} className="font-display text-2xl">Delete this entry?</h3>
        <p className="mt-2 text-ink/70">“{deleting?.title}” will be removed from the demo data for this session.</p>
        <div className="mt-6 flex justify-end gap-3">
          <button type="button" onClick={() => setDeleting(null)} className="rounded-full border border-ink/25 px-5 py-2.5 text-sm">Cancel</button>
          <button type="button" onClick={confirmDelete} className="rounded-full bg-plum px-5 py-2.5 text-sm text-paper">Delete</button>
        </div>
      </dialog>
    </section>
  );
}
