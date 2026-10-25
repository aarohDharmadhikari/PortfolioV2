// DEMO ONLY. This is NOT authentication. Any identifier with a password of 8+
// characters is accepted, and a flag in sessionStorage unlocks the demo dashboard.
// Replace AuthAdapter with real server-side auth (httpOnly sessions) in the backend phase.
export interface AuthAdapter {
  signIn(identifier: string, password: string): Promise<void>;
  signOut(): void;
  hasSession(): boolean;
}

const KEY = "demo-admin-session";
const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

export const mockAuth: AuthAdapter = {
  async signIn(_identifier, password) {
    await wait(800);
    if (password.length < 8) throw new Error("Invalid credentials (demo rule: password needs 8+ characters).");
    try { sessionStorage.setItem(KEY, "1"); } catch { /* storage unavailable */ }
  },
  signOut() {
    try { sessionStorage.removeItem(KEY); } catch { /* ignore */ }
  },
  hasSession() {
    try { return sessionStorage.getItem(KEY) === "1"; } catch { return false; }
  },
};
