import { create } from 'zustand';
import { Locale, Translations } from './types';
import { en } from './en';
import { hi } from './hi';

// ─── Translation Map ──────────────────────────────────────────────────────────

const translations: Record<Locale, Translations> = { en, hi };

import { useSettingsStore } from '../../store/settings';

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useLocale = (): Translations => {
  const locale = useSettingsStore(state => state.language);
  return translations[locale];
};

export const getTranslations = (locale?: Locale): Translations => {
  const currentLocale = locale || useSettingsStore.getState().language || 'en';
  return translations[currentLocale] || en;
};

// ─── Re-exports ───────────────────────────────────────────────────────────────

export type { Locale, Translations };
export type { LoginTranslations } from './types';
