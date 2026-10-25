"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import { mockAuth } from "@/lib/adapters/auth";
import { requiredError } from "@/lib/validation";

const input = "mt-2 w-full rounded-xl border border-ink/25 bg-paper px-4 py-3 text-base focus:border-plum";

export default function LoginForm() {
  const router = useRouter();
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");
  const [show, setShow] = useState(false);
  const [errs, setErrs] = useState<{ id?: string; pw?: string }>({});
  const [failure, setFailure] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const next = { id: requiredError(id, "Email or username") ?? undefined, pw: requiredError(pw, "Password") ?? undefined };
    setErrs(next); setFailure(null);
    if (next.id || next.pw) return;
    setBusy(true);
    try { await mockAuth.signIn(id, pw); router.push("/admin/dashboard"); }
    catch (err) { setFailure(err instanceof Error ? err.message : "Sign-in failed."); setBusy(false); }
  };

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div>
        <label htmlFor="id" className="font-medium">Email or username</label>
        <input id="id" autoComplete="username" className={input} value={id} aria-invalid={!!errs.id} aria-describedby={errs.id ? "id-err" : undefined} onChange={(e) => setId(e.target.value)} />
        {errs.id && <p id="id-err" className="mt-1 text-sm text-plum">{errs.id}</p>}
      </div>
      <div>
        <label htmlFor="pw" className="font-medium">Password</label>
        <div className="relative">
          <input id="pw" type={show ? "text" : "password"} autoComplete="current-password" className={`${input} pr-12`} value={pw} aria-invalid={!!errs.pw} aria-describedby={errs.pw ? "pw-err" : undefined} onChange={(e) => setPw(e.target.value)} />
          <button type="button" onClick={() => setShow((s) => !s)} aria-label={show ? "Hide password" : "Show password"} aria-pressed={show} className="absolute right-2 top-[calc(0.5rem+2px)] rounded-full p-2.5">
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        {errs.pw && <p id="pw-err" className="mt-1 text-sm text-plum">{errs.pw}</p>}
      </div>
      {failure && <p role="alert" className="text-sm text-plum">{failure}</p>}
      <button type="submit" disabled={busy} className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm text-paper hover:bg-plum disabled:opacity-50">
        {busy && <Loader2 size={16} className="animate-spin" />} Enter demo dashboard
      </button>
    </form>
  );
}
