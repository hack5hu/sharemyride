import { create } from 'zustand';
import { en } from './en';
import { hi } from './hi';
import { type Locale, type Translations } from './types';

// ─── Translation Map ──────────────────────────────────────────────────────────

const translations: Record<Locale, Translations> = { en, hi };

import { useSettingsStore } from '../../store/settings';

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useLocale = (): Translations => {
  const locale = useSettingsStore(state => state.language);

  return translations[locale];
};

// ─── Re-exports ───────────────────────────────────────────────────────────────

export type { Locale, Translations };
export type { LoginTranslations } from './types';
