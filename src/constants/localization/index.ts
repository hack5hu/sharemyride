import { create } from 'zustand';
import { Locale, Translations } from './types';
import { en } from './en';
import { hi } from './hi';

// ─── Translation Map ──────────────────────────────────────────────────────────

const translations: Record<Locale, Translations> = { en, hi };

// ─── Locale Store (Zustand) ───────────────────────────────────────────────────

interface LocaleState {
  locale: Locale;
  setLocale: (locale: Locale) => void;
}

export const useLocaleStore = create<LocaleState>(set => ({
  locale: 'en',
  setLocale: locale => set({ locale }),
}));

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useLocale = (): Translations => {
  const locale = useLocaleStore(state => state.locale);
  return translations[locale];
};

// ─── Re-exports ───────────────────────────────────────────────────────────────

export type { Locale, Translations };
export type { LoginTranslations } from './types';
