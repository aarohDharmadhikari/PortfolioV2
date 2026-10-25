export const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());

export const emailError = (v: string): string | null =>
  !v.trim() ? "Enter your email address." : isEmail(v) ? null : "Enter a valid email, like name@example.com.";

export const requiredError = (v: string, label: string): string | null =>
  v.trim() ? null : `${label} is required.`;
