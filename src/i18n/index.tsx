import React, { createContext, useContext, useState } from 'react';
import { en, TranslationKeys } from './en';
import { hi } from './hi';
import { mr } from './mr';

export type Language = 'en' | 'hi' | 'mr';

export const LANGUAGE_NAMES: Record<Language, { nativeName: string; englishName: string }> = {
  en: { nativeName: 'English', englishName: 'English' },
  hi: { nativeName: 'हिन्दी', englishName: 'Hindi' },
  mr: { nativeName: 'मराठी', englishName: 'Marathi' },
};

const translations: Record<Language, TranslationKeys> = {
  en,
  hi,
  mr,
};

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (path: string, fallback?: string) => string;
  currentTranslations: TranslationKeys;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('en');

  const t = (path: string, fallback?: string): string => {
    const keys = path.split('.');
    let current: any = translations[language] || translations.en;

    for (const key of keys) {
      if (current && typeof current === 'object' && key in current) {
        current = current[key];
      } else {
        // Fallback to English dictionary if key is missing in selected language
        let fallbackCurrent: any = translations.en;
        for (const fKey of keys) {
          if (fallbackCurrent && typeof fallbackCurrent === 'object' && fKey in fallbackCurrent) {
            fallbackCurrent = fallbackCurrent[fKey];
          } else {
            return fallback || path;
          }
        }
        return typeof fallbackCurrent === 'string' ? fallbackCurrent : fallback || path;
      }
    }

    return typeof current === 'string' ? current : fallback || path;
  };

  return (
    <LanguageContext.Provider
      value={{
        language,
        setLanguage,
        t,
        currentTranslations: translations[language] || translations.en,
      }}
    >
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslation = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useTranslation must be used within a LanguageProvider');
  }
  return context;
};

export { en, hi, mr };
