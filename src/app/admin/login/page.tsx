import type { Metadata } from "next";
import LoginForm from "@/components/admin/LoginForm";
import DemoNotice from "@/components/ui/DemoNotice";

export const metadata: Metadata = { title: "Admin login", robots: { index: false } };

export default function AdminLoginPage() {
  return (
    <div className="wrap grid gap-12 pt-40 lg:grid-cols-12">
      <div className="lg:col-span-6">
        <p className="label">Admin</p>
        <h1 className="mt-4 font-display text-6xl leading-[0.98] sm:text-7xl">Sign in</h1>
      </div>
      <div className="space-y-6 lg:col-span-5 lg:col-start-8">
        <DemoNotice>This is a prototype, not real authentication. Any email or username with a password of 8+ characters opens the demo dashboard; nothing is checked or stored on a server.</DemoNotice>
        <LoginForm />
      </div>
    </div>
  );
}
