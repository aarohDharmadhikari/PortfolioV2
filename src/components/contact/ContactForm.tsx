"use client";
import { useState } from "react";
import { Loader2 } from "lucide-react";
import { contactAdapter } from "@/lib/adapters";
import { emailError, requiredError } from "@/lib/validation";

type Status = "idle" | "sending" | "sent" | "error";
type Errs = { name?: string; email?: string; message?: string };
const input = "mt-2 w-full rounded-xl border border-ink/25 bg-paper px-4 py-3 text-base focus:border-plum";

export default function ContactForm() {
  const [v, setV] = useState({ name: "", email: "", message: "" });
  const [errs, setErrs] = useState<Errs>({});
  const [status, setStatus] = useState<Status>("idle");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next: Errs = {
      name: requiredError(v.name, "Name") ?? undefined,
      email: emailError(v.email) ?? undefined,
      message: requiredError(v.message, "Message") ?? undefined,
    };
    setErrs(next);
    if (next.name || next.email || next.message) return;
    setStatus("sending");
    try { await contactAdapter.sendMessage(v); setStatus("sent"); } catch { setStatus("error"); }
  };

  if (status === "sent")
    return (
      <div role="status" className="rounded-2xl border border-ink/15 p-6">
        <p className="font-display text-2xl">Simulated send complete</p>
        <p className="mt-2 text-ink/70">Your message was <strong>not</strong> delivered anywhere. Real sending arrives with the backend.</p>
        <button type="button" className="mt-5 text-sm underline underline-offset-4" onClick={() => { setV({ name: "", email: "", message: "" }); setStatus("idle"); }}>Write another</button>
      </div>
    );

  const field = (id: keyof Errs, label: string, type = "text") => (
    <div>
      <label htmlFor={id} className="font-medium">{label}</label>
      {id === "message" ? (
        <textarea id={id} rows={6} className={input} value={v[id]} aria-invalid={!!errs[id]} aria-describedby={errs[id] ? `${id}-err` : undefined} onChange={(e) => setV({ ...v, [id]: e.target.value })} />
      ) : (
        <input id={id} type={type} autoComplete={id} className={input} value={v[id]} aria-invalid={!!errs[id]} aria-describedby={errs[id] ? `${id}-err` : undefined} onChange={(e) => setV({ ...v, [id]: e.target.value })} />
      )}
      {errs[id] && <p id={`${id}-err`} className="mt-1 text-sm text-plum">{errs[id]}</p>}
    </div>
  );

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      {field("name", "Name")}
      {field("email", "Email", "email")}
      {field("message", "Message")}
      {status === "error" && <p role="alert" className="text-sm text-plum">The simulated send failed. Please try again.</p>}
      <button type="submit" disabled={status === "sending"} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-paper hover:bg-plum disabled:opacity-50">
        {status === "sending" && <Loader2 size={16} className="animate-spin" />} Send message (simulated)
      </button>
    </form>
  );
}
