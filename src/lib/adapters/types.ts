import type { ServiceRequest } from "@/types/services";

export type VerifyResult = "verified" | "invalid" | "expired";

/** Replace the mock with a real implementation next week; the UI only uses this interface. */
export interface VerificationAdapter {
  sendCode(email: string): Promise<{ expiresInSec: number }>;
  verifyCode(email: string, code: string): Promise<VerifyResult>;
}

export interface SubmissionAdapter {
  submitRequest(req: ServiceRequest): Promise<{ reference: string }>;
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface ContactAdapter {
  sendMessage(msg: ContactMessage): Promise<void>;
}
