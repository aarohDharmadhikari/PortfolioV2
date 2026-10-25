// Single swap point: point these at real implementations in the backend phase.
import { mockContact, mockSubmission, mockVerification } from "./mock";

export const verificationAdapter = mockVerification;
export const submissionAdapter = mockSubmission;
export const contactAdapter = mockContact;
export const IS_DEMO = true;
export { DEMO_CODES } from "./mock";
