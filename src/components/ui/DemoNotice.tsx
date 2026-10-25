import { FlaskConical } from "lucide-react";

export default function DemoNotice({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-start gap-3 rounded-2xl border border-brass/40 bg-brass/10 px-4 py-3 text-sm" role="note">
      <FlaskConical size={16} className="mt-0.5 shrink-0 text-brass" aria-hidden />
      <span><strong className="font-medium">Demo mode.</strong> {children}</span>
    </p>
  );
}
