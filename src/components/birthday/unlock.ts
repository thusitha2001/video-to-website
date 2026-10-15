// Held in memory only, so every full page load (refresh) starts at the passcode screen again.
let unlocked = false;

export function readUnlocked(): boolean {
  return typeof window !== 'undefined' && unlocked;
}

export function markUnlocked(): void {
  unlocked = true;
}
