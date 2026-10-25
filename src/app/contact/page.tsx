import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import DemoNotice from "@/components/ui/DemoNotice";
import { site } from "@/data/site";

export const metadata: Metadata = { title: "Contact" };

export default function ContactPage() {
  return (
    <div className="wrap pt-40">
      <p className="label">Index / Contact</p>
      <h1 className="mt-4 max-w-4xl font-display text-6xl leading-[0.98] sm:text-8xl">Say hello</h1>
      <div className="mt-16 grid gap-16 lg:grid-cols-12">
        <aside className="space-y-8 lg:col-span-4">
          <dl className="space-y-5">
            <div><dt className="label">Email</dt><dd className="mt-1">{site.email ? <a className="underline underline-offset-4" href={`mailto:${site.email}`}>{site.email}</a> : "[Email not set]"}</dd></div>
            <div><dt className="label">Availability</dt><dd className="mt-1">{site.availability}</dd></div>
            <div>
              <dt className="label">Elsewhere</dt>
              <dd className="mt-1">
                {site.socials.length ? (
                  <ul className="space-y-1">{site.socials.map((s) => <li key={s.href}><a className="underline underline-offset-4" href={s.href} target="_blank" rel="noreferrer">{s.label}</a></li>)}</ul>
                ) : "[Social links not set]"}
              </dd>
            </div>
          </dl>
          <Link href="/services" className="group flex items-center justify-between border-y border-ink/15 py-5 font-display text-2xl hover:text-plum">
            Have a project? Configure a request <ArrowUpRight size={20} className="text-brass" aria-hidden />
          </Link>
        </aside>
        <div className="space-y-6 lg:col-span-8">
          <DemoNotice>This form does not send email. It runs through a mock adapter.</DemoNotice>
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
