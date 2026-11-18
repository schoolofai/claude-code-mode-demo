// Simulates slow integration work (a database, a network call) so each suite takes ~10 s.
export const slow = (ms: number) => new Promise((r) => setTimeout(r, ms));
