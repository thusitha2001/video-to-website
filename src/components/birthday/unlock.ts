const KEY = 'birthday-unlocked';

export function readUnlocked(): boolean {
  try {
    return window.localStorage.getItem(KEY) === 'yes';
  } catch {
    return false;
  }
}

export function markUnlocked(): void {
  try {
    window.localStorage.setItem(KEY, 'yes');
  } catch {
    /* storage unavailable — the passcode screen simply stays put */
  }
}
