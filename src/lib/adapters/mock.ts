import type { ContactAdapter, SubmissionAdapter, VerificationAdapter } from "./types";

const wait = (ms = 700) => new Promise((r) => setTimeout(r, ms));

// DEMO ONLY. No email is sent and nothing is stored. Test codes:
// 123456 = verified, 000000 = expired, anything else = invalid.
export const DEMO_CODES = { valid: "123456", expired: "000000" } as const;

export const mockVerification: VerificationAdapter = {
  async sendCode() {
    await wait();
    return { expiresInSec: 600 };
  },
  async verifyCode(_email, code) {
    await wait();
    if (code === DEMO_CODES.valid) return "verified";
    if (code === DEMO_CODES.expired) return "expired";
    return "invalid";
  },
};

export const mockSubmission: SubmissionAdapter = {
  async submitRequest() {
    await wait(900);
    return { reference: `DEMO-${Date.now().toString(36).toUpperCase()}` };
  },
};

export const mockContact: ContactAdapter = {
  async sendMessage() {
    await wait(900);
  },
};
