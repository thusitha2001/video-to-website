import { useEffect } from 'react';

const OPENED_KEY = 'birthday-gifts-opened';
const GALLERY_KEY = 'birthday-gallery-seen';

export const GIFT_IDS = ['letter', 'flowers', 'music'] as const;
export type GiftId = (typeof GIFT_IDS)[number];

function readList(): GiftId[] {
  try {
    const raw = window.localStorage.getItem(OPENED_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter((id): id is GiftId => GIFT_IDS.includes(id as GiftId));
  } catch {
    return [];
  }
}

export function readOpenedGifts(): GiftId[] {
  return readList();
}

export function markGiftOpened(id: GiftId): GiftId[] {
  const opened = readList();
  if (!opened.includes(id)) {
    opened.push(id);
    try {
      window.localStorage.setItem(OPENED_KEY, JSON.stringify(opened));
    } catch {
      /* storage unavailable — the gallery simply waits */
    }
  }
  return opened;
}

export function allGiftsOpened(opened: GiftId[] = readList()): boolean {
  return GIFT_IDS.every((id) => opened.includes(id));
}

export function readGallerySeen(): boolean {
  try {
    return window.localStorage.getItem(GALLERY_KEY) === 'yes';
  } catch {
    return false;
  }
}

export function markGallerySeen(): void {
  try {
    window.localStorage.setItem(GALLERY_KEY, 'yes');
  } catch {
    /* storage unavailable */
  }
}

export function useOpenedGift(id: GiftId) {
  useEffect(() => {
    markGiftOpened(id);
  }, [id]);
}
