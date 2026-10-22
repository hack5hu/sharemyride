import { useSettingsStore } from '@/store/settings';
import { en } from './en';
import { hi } from './hi';
import { en as trackingEn } from './tracking/en';
import { hi as trackingHi } from './tracking/hi';
import type { Locale, Translations as BaseTranslations } from './types';
type Translations = BaseTranslations & { tracking: typeof trackingEn };

// ─── Translation Map ──────────────────────────────────────────────────────────

const translations: Record<Locale, Translations> = {
  en: { ...en, tracking: trackingEn }, hi: { ...hi, tracking: trackingHi },
};



// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useLocale = (): Translations => {
  const locale = useSettingsStore(state => state.language);

  return translations[locale];
};

export const getTranslations = (locale?: Locale): Translations => {
  const currentLocale = locale || useSettingsStore.getState().language || 'en';

  return translations[currentLocale] || translations.en;
};

// ─── Re-exports ───────────────────────────────────────────────────────────────

export type { Locale, Translations };
export type { LoginTranslations } from './types';
