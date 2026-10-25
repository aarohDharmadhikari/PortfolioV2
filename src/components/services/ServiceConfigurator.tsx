"use client";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, Check, Loader2 } from "lucide-react";
import { services } from "@/data/services";
import type { Answers, Service, ServiceOption } from "@/types/services";
import { emailError } from "@/lib/validation";
import { DEMO_CODES, submissionAdapter, verificationAdapter } from "@/lib/adapters";
import DemoNotice from "@/components/ui/DemoNotice";

type Step = "select" | "configure" | "contact" | "review" | "done";
type Verify = "idle" | "sending" | "pending" | "checking" | "invalid" | "expired" | "verified" | "error";

const STEPS: { id: Step; label: string }[] = [
  { id: "select", label: "Service" },
  { id: "configure", label: "Details" },
  { id: "contact", label: "Contact" },
  { id: "review", label: "Review" },
];
const input = "w-full rounded-xl border border-ink/25 bg-paper px-4 py-3 text-base focus:border-plum";
const btn = "inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm transition-colors disabled:opacity-50";
const primary = `${btn} bg-ink text-paper hover:bg-plum`;
const ghost = `${btn} border border-ink/25 hover:border-ink`;

const isEmpty = (v?: string | string[]) => !v || (Array.isArray(v) ? v.length === 0 : !v.trim());
const asText = (v?: string | string[]) => (Array.isArray(v) ? v.join(", ") : v ?? "");

export default function ServiceConfigurator() {
  const [step, setStep] = useState<Step>("select");
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [custom, setCustom] = useState("");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [verify, setVerify] = useState<Verify>("idle");
  const [errors, setErrors] = useState<string[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [reference, setReference] = useState("");
  const top = useRef<HTMLHeadingElement>(null);
  const verificationAttempt = useRef(0);

  const service: Service | undefined = services.find((s) => s.id === serviceId);
  const go = (s: Step) => { setErrors([]); setStep(s); setTimeout(() => top.current?.focus(), 0); };

  const setAnswer = (id: string, v: string | string[]) => setAnswers((a) => ({ ...a, [id]: v }));
  const toggle = (o: ServiceOption, value: string) => {
    const cur = (answers[o.id] as string[] | undefined) ?? [];
    setAnswer(o.id, cur.includes(value) ? cur.filter((x) => x !== value) : [...cur, value]);
  };

  const validateConfigure = () => {
    if (!service) return false;
    const errs = service.options.filter((o) => o.required && isEmpty(answers[o.id])).map((o) => `${o.label} is required.`);
    if (service.id === "custom" && !custom.trim()) errs.push("Describe your request.");
    setErrors(errs);
    return errs.length === 0;
  };

  const sendCode = async () => {
    const err = emailError(email);
    if (err) return setErrors([err]);
    const attempt = ++verificationAttempt.current;
    setErrors([]); setVerify("sending"); setCode("");
    try {
      await verificationAdapter.sendCode(email.trim());
      if (attempt === verificationAttempt.current) setVerify("pending");
    } catch {
      if (attempt === verificationAttempt.current) setVerify("error");
    }
  };
  const checkCode = async () => {
    if (!/^\d{6}$/.test(code)) return;
    const attempt = ++verificationAttempt.current;
    setVerify("checking");
    try {
      const result = await verificationAdapter.verifyCode(email.trim(), code);
      if (attempt === verificationAttempt.current) setVerify(result);
    } catch {
      if (attempt === verificationAttempt.current) setVerify("error");
    }
  };
  const submit = async () => {
    if (!service || verify !== "verified" || submitting) return;
    setSubmitting(true); setSubmitError(null);
    try {
      const r = await submissionAdapter.submitRequest({ serviceId: service.id, answers, custom, email: email.trim() });
      setReference(r.reference); go("done");
    } catch { setSubmitError("The simulated submission failed. Please try again."); }
    finally { setSubmitting(false); }
  };

  const stepIndex = STEPS.findIndex((s) => s.id === step);

  return (
    <div>
      <DemoNotice>Nothing is emailed, verified or stored. Verification and submission use mock adapters in src/lib/adapters.</DemoNotice>

      {step !== "done" && (
        <ol className="mt-8 flex flex-wrap gap-x-6 gap-y-2" aria-label="Progress">
          {STEPS.map((s, i) => (
            <li key={s.id} aria-current={s.id === step ? "step" : undefined} className={`label ${i <= stepIndex ? "!text-ink" : ""}`}>
              {String(i + 1).padStart(2, "0")} {s.label}
            </li>
          ))}
        </ol>
      )}

      <div className="mt-10" aria-live="polite">
        {errors.length > 0 && (
          <div role="alert" className="mb-6 rounded-2xl border border-plum/40 bg-plum/10 px-4 py-3 text-sm">
            <ul className="list-disc pl-4">{errors.map((e) => <li key={e}>{e}</li>)}</ul>
          </div>
        )}

        {step === "select" && (
          <>
            <h2 ref={top} tabIndex={-1} className="font-display text-3xl">Choose a service</h2>
            <ul className="mt-6 border-t border-ink/15">
              {services.map((s) => (
                <li key={s.id} className="border-b border-ink/15">
                  <button
                    type="button"
                    disabled={!s.available}
                    onClick={() => { if (s.id !== serviceId) setAnswers({}); setServiceId(s.id); go("configure"); }}
                    className="group grid w-full gap-2 py-6 text-left md:grid-cols-12 md:gap-8"
                  >
                    <span className="font-display text-2xl group-hover:text-plum md:col-span-5">{s.name}</span>
                    <span className="text-ink/70 md:col-span-5">{s.summary}</span>
                    <span className="label md:col-span-2 md:text-right">
                      {s.pricing ? `From ${s.pricing.currency}${s.pricing.from}` : "Quote-based"}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </>
        )}

        {step === "configure" && service && (
          <>
            <h2 ref={top} tabIndex={-1} className="font-display text-3xl">{service.name}</h2>
            <div className="mt-8 max-w-2xl space-y-8">
              {service.options.map((o) => (
                <div key={o.id}>
                  {o.kind === "single" || o.kind === "multi" ? (
                    <fieldset>
                      <legend className="font-medium">{o.label}{o.required && <span aria-hidden> *</span>}</legend>
                      {o.help && <p className="mt-1 text-sm text-ink/60">{o.help}</p>}
                      <div className="mt-3 space-y-2">
                        {o.choices?.map((c) => (
                          <label key={c.value} className="flex cursor-pointer items-center gap-3 rounded-xl border border-ink/20 px-4 py-3 has-[:checked]:border-plum has-[:checked]:bg-plum/5">
                            <input
                              type={o.kind === "single" ? "radio" : "checkbox"}
                              name={o.id}
                              className="accent-[rgb(var(--plum))]"
                              checked={o.kind === "single" ? answers[o.id] === c.value : ((answers[o.id] as string[] | undefined) ?? []).includes(c.value)}
                              onChange={() => (o.kind === "single" ? setAnswer(o.id, c.value) : toggle(o, c.value))}
                            />
                            {c.label}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  ) : (
                    <div>
                      <label htmlFor={o.id} className="font-medium">{o.label}{o.required && <span aria-hidden> *</span>}</label>
                      {o.help && <p className="mt-1 text-sm text-ink/60">{o.help}</p>}
                      {o.kind === "text" ? (
                        <input id={o.id} className={`${input} mt-2`} value={asText(answers[o.id])} onChange={(e) => setAnswer(o.id, e.target.value)} />
                      ) : (
                        <textarea id={o.id} rows={5} className={`${input} mt-2`} value={asText(answers[o.id])} onChange={(e) => setAnswer(o.id, e.target.value)} />
                      )}
                    </div>
                  )}
                </div>
              ))}
              <div>
                <label htmlFor="custom" className="font-medium">
                  {service.id === "custom" ? "Describe your request *" : "Custom requirements (optional)"}
                </label>
                <p className="mt-1 text-sm text-ink/60">Kept if you switch back and forth between steps.</p>
                <textarea id="custom" rows={5} className={`${input} mt-2`} value={custom} onChange={(e) => setCustom(e.target.value)} />
              </div>
            </div>
            <div className="mt-10 flex gap-3">
              <button type="button" className={ghost} onClick={() => go("select")}><ArrowLeft size={16} /> Change service</button>
              <button type="button" className={primary} onClick={() => validateConfigure() && go("contact")}>Continue <ArrowRight size={16} /></button>
            </div>
          </>
        )}

        {step === "contact" && (
          <>
            <h2 ref={top} tabIndex={-1} className="font-display text-3xl">Your email</h2>
            <div className="mt-8 max-w-xl space-y-5">
              <div>
                <label htmlFor="email" className="font-medium">Email address</label>
                <input
                  id="email" type="email" autoComplete="email" className={`${input} mt-2`} value={email}
                  onChange={(e) => { verificationAttempt.current++; setEmail(e.target.value); setVerify("idle"); setCode(""); setErrors([]); }}
                />
              </div>
              {(verify === "idle" || verify === "sending" || verify === "error") && (
                <button type="button" className={ghost} disabled={verify === "sending"} onClick={sendCode}>
                  {verify === "sending" && <Loader2 size={16} className="animate-spin" />} Send verification code
                </button>
              )}
              {verify === "error" && <p role="alert" className="text-sm text-plum">Something went wrong in the simulated flow. Try again.</p>}
              {(verify === "pending" || verify === "checking" || verify === "invalid" || verify === "expired") && (
                <div className="space-y-3 rounded-2xl border border-ink/15 p-5">
                  <p className="text-sm text-ink/70">Simulated: no email was sent. Enter <code className="font-mono">{DEMO_CODES.valid}</code> to verify, or <code className="font-mono">{DEMO_CODES.expired}</code> to see the expired state.</p>
                  <label htmlFor="code" className="font-medium">Verification code</label>
                  <input id="code" inputMode="numeric" autoComplete="one-time-code" maxLength={6} className={input} value={code} disabled={verify === "checking"} onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))} />
                  {verify === "invalid" && <p role="alert" className="text-sm text-plum">That code isn’t right. Check it and try again.</p>}
                  {verify === "expired" && <p role="alert" className="text-sm text-plum">That code has expired. Request a new one.</p>}
                  <div className="flex gap-3">
                    <button type="button" className={primary} disabled={!/^\d{6}$/.test(code) || verify === "checking"} onClick={checkCode}>
                      {verify === "checking" && <Loader2 size={16} className="animate-spin" />} Verify
                    </button>
                    <button type="button" className={ghost} disabled={verify === "checking"} onClick={sendCode}>Resend code</button>
                  </div>
                </div>
              )}
              {verify === "verified" && <p className="flex items-center gap-2 text-sm"><Check size={16} className="text-brass" /> Email verified (simulated).</p>}
            </div>
            <div className="mt-10 flex gap-3">
              <button type="button" className={ghost} onClick={() => go("configure")}><ArrowLeft size={16} /> Back</button>
              <button type="button" className={primary} disabled={verify !== "verified"} onClick={() => go("review")}>Review request <ArrowRight size={16} /></button>
            </div>
          </>
        )}

        {step === "review" && service && (
          <>
            <h2 ref={top} tabIndex={-1} className="font-display text-3xl">Review</h2>
            <dl className="mt-8 max-w-2xl divide-y divide-ink/15 border-y border-ink/15">
              <div className="py-4"><dt className="label">Service</dt><dd className="mt-1">{service.name}</dd></div>
              {service.options.filter((o) => !isEmpty(answers[o.id])).map((o) => (
                <div key={o.id} className="py-4">
                  <dt className="label">{o.label}</dt>
                  <dd className="mt-1">{o.choices ? asText(answers[o.id]).split(", ").map((v) => o.choices?.find((c) => c.value === v)?.label ?? v).join(", ") : asText(answers[o.id])}</dd>
                </div>
              ))}
              {custom.trim() && <div className="py-4"><dt className="label">Custom requirements</dt><dd className="mt-1 whitespace-pre-wrap">{custom}</dd></div>}
              <div className="py-4"><dt className="label">Price</dt><dd className="mt-1">{service.pricing ? `From ${service.pricing.currency}${service.pricing.from}` : "Quote-based, not yet configured"}</dd></div>
              <div className="py-4"><dt className="label">Email</dt><dd className="mt-1">{email}</dd></div>
            </dl>
            {submitError && <p role="alert" className="mt-4 text-sm text-plum">{submitError}</p>}
            <div className="mt-10 flex flex-wrap gap-3">
              <button type="button" className={ghost} disabled={submitting} onClick={() => go("configure")}>Edit details</button>
              <button type="button" className={ghost} disabled={submitting} onClick={() => go("contact")}>Edit email</button>
              <button type="button" className={primary} disabled={submitting} onClick={submit}>
                {submitting && <Loader2 size={16} className="animate-spin" />} Submit (simulated)
              </button>
            </div>
          </>
        )}

        {step === "done" && (
          <div>
            <h2 ref={top} tabIndex={-1} className="font-display text-4xl">Simulated submission complete</h2>
            <p className="mt-4 max-w-xl text-ink/70">
              Demo reference <span className="font-mono">{reference}</span>. This request was <strong>not</strong> sent to anyone; real delivery arrives with the backend.
            </p>
            <button type="button" className={`${ghost} mt-8`} onClick={() => { verificationAttempt.current++; setAnswers({}); setCustom(""); setEmail(""); setCode(""); setVerify("idle"); setSubmitError(null); setReference(""); setServiceId(null); go("select"); }}>
              Start another request
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
