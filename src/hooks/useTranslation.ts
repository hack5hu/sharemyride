import { useLocale } from '@/constants/localization';

export const useTranslation = () => {
  const translations = useLocale();

  const t = (path: string, params?: Record<string, string | number>) => {
    const keys = path.split('.');
    let result: any = translations;
    
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        return path;
      }
    }
    
    let text = result as string;
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        text = text.replace(`{${key}}`, String(value));
      });
    }
    
    return text;
  };

  return { t, translations };
};
