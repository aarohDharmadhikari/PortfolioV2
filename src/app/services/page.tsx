import type { Metadata } from "next";
import ServiceConfigurator from "@/components/services/ServiceConfigurator";

export const metadata: Metadata = { title: "Services" };

export default function ServicesPage() {
  return (
    <div className="wrap pt-40">
      <p className="label">Index / Services</p>
      <h1 className="mt-4 max-w-4xl font-display text-6xl leading-[0.98] sm:text-8xl">Start a request</h1>
      <p className="mt-6 max-w-xl text-ink/70">Pick a service, set the options, verify your email and review. The catalogue below is sample data from src/data/services.ts.</p>
      <div className="mt-12"><ServiceConfigurator /></div>
    </div>
  );
}
