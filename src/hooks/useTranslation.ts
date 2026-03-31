import { useLocale } from '@/constants/localization';

export const useTranslation = () => {
  const translations = useLocale();

  const t = (path: string) => {
    const keys = path.split('.');
    let result: any = translations;
    
    for (const key of keys) {
      if (result && result[key]) {
        result = result[key];
      } else {
        return path;
      }
    }
    
    return result as string;
  };

  return { t, translations };
};
