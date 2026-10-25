export type OptionKind = "single" | "multi" | "text" | "textarea";

export interface ServiceOption {
  id: string;
  label: string;
  kind: OptionKind;
  required?: boolean;
  help?: string;
  choices?: { value: string; label: string }[];
}

export interface Service {
  id: string;
  name: string;
  summary: string;
  category: string;
  /** null = not configured: the UI shows "Quote-based", never an invented price. */
  pricing: { from: number; currency: string } | null;
  available: boolean;
  options: ServiceOption[];
}

export type Answers = Record<string, string | string[]>;

export interface ServiceRequest {
  serviceId: string;
  answers: Answers;
  custom: string;
  email: string;
}
