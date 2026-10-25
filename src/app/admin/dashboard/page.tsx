import type { Metadata } from "next";
import Dashboard from "@/components/admin/Dashboard";

export const metadata: Metadata = { title: "Admin dashboard", robots: { index: false } };

export default function DashboardPage() {
  return <Dashboard />;
}
