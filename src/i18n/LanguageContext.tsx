
import React, { createContext, useContext, useState, ReactNode, useMemo, useEffect } from 'react';
import { parsePathname } from '../utils/routes';
import es from './es';
import en from './en';
import de from './de';
import fr from './fr';
import it from './it';
import pt from './pt';

interface LanguageContextType {
  language: string;
  translations: any;
  setLanguage: (lang: string) => void;
}

const translationsData: { [key: string]: any } = { es, en, de, fr, it, pt };

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<string>(() => {
    // 1. Try to sync with pathname first (e.g. /en/calculator, /fr/)
    try {
      const parsed = parsePathname(window.location.pathname);
      if (parsed?.lang && translationsData[parsed.lang]) {
        return parsed.lang;
      }
    } catch (e) {
      console.warn("Error parsing pathname for language:", e);
    }

    // 2. Try to sync with legacy query param (?lang=)
    const params = new URLSearchParams(window.location.search);
    const urlLang = params.get('lang');
    if (urlLang && translationsData[urlLang]) return urlLang;

    // Detect browser language
    try {
      // 1. Check exact language preferences (navigator.languages)
      if (navigator.languages && navigator.languages.length > 0) {
        for (const lang of navigator.languages) {
          const l = lang.split('-')[0].toLowerCase();
          if (translationsData[l]) return l;
        }
      }

      // 2. Check navigator.language
      if (navigator.language) {
          const browserLang = navigator.language.split('-')[0].toLowerCase();
          if (translationsData[browserLang]) return browserLang;
      }
      
      // 3. Fallback based on timezone to detect the country visited
      const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const tzMap: Record<string, string> = {
        'Europe/Lisbon': 'pt',
        'Europe/Vienna': 'de',
        'Europe/Berlin': 'de',
        'Europe/Busingen': 'de',
        'Europe/Zurich': 'de', // Switzerland (German part as primary)
        'Europe/Paris': 'fr',
        'Europe/Rome': 'it',
        'Europe/San_Marino': 'it',
        'Europe/Vatican': 'it',
        'Europe/Madrid': 'es',
        'America/Guatemala': 'es',
        'America/Mexico_City': 'es',
        'America/Bogota': 'es',
        'America/Lima': 'es',
        'America/Caracas': 'es',
        'America/Santiago': 'es',
        'America/Buenos_Aires': 'es',
        'America/Montevideo': 'es',
      };
      
      if (tz) {
        // Direct match
        if (tzMap[tz] && translationsData[tzMap[tz]]) {
            return tzMap[tz];
        }
        
        // Match Brazil timezones for Portuguese
        if (tz.startsWith('America/Sao_Paulo') || tz.startsWith('America/Bahia') || tz.startsWith('America/Belem') || tz.startsWith('America/Fortaleza') || tz.startsWith('America/Recife') || tz.startsWith('America/Maceio') || tz.startsWith('America/Manaus') || tz.startsWith('America/Cuiaba') || tz.startsWith('America/Campo_Grande') || tz.startsWith('America/Boa_Vista') || tz.startsWith('America/Rio_Branco') || tz.startsWith('America/Araguaina') || tz.startsWith('America/Santarem') || tz.startsWith('America/Porto_Velho')) {
            return 'pt';
        }
        
        // Match other Hispanic America timezones dynamically
        if (tz.startsWith('America/') && !tz.includes('New_York') && !tz.includes('Los_Angeles') && !tz.includes('Chicago') && !tz.includes('Denver') && !tz.includes('Toronto') && !tz.includes('Vancouver')) {
            // Very rough fallback for Latin America excluding US/Canada and Brazil (handled above).
            // Timezones like America/Costa_Rica, America/Havana, America/Santo_Domingo, etc.
            const tzCountriesEs = ['Tijuana', 'Hermosillo', 'Mazatlan', 'Chihuahua', 'Monterrey', 'Matamoros', 'Tegucigalpa', 'Managua', 'Costa_Rica', 'Panama', 'Havana', 'Santo_Domingo', 'Puerto_Rico', 'Bogota', 'Guayaquil', 'Lima', 'La_Paz', 'Caracas', 'Asuncion', 'Santiago', 'Punta_Arenas', 'Buenos_Aires', 'Cordoba', 'Mendoza', 'Montevideo'];
            if (tzCountriesEs.some(city => tz.includes(city))) {
                return 'es';
            }
        }
      }

    } catch (e) {
      console.warn("Error detecting browser language:", e);
    }

    // Default language is English (en)
    return 'en';
  });

  const selectedTranslations = useMemo(() => {
    let trans = translationsData[language] || translationsData['en'];
    // Handle cases where ESM import might wrap the object in a .default property
    if (trans && trans.default) {
        return trans.default;
    }
    return trans;
  }, [language]);

  // Dynamic language attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, translations: selectedTranslations, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useTranslations = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) throw new Error('useTranslations must be used within a LanguageProvider');

  const t = (key: string): string => {
    if (!key) return '';
    const keys = key.split('.');
    let result = context.translations;
    
    // Safety check: if translations object is not found or empty
    if (!result) return key;

    for (const k of keys) {
      if (result && typeof result === 'object' && k in result) {
        result = result[k];
      } else {
        // Fallback to English if current language fails
        let fallback = translationsData['en'];
        if (fallback && fallback.default) fallback = fallback.default;
        
        let fbResult = fallback;
        for (const fbk of keys) {
            fbResult = fbResult?.[fbk];
        }
        
        if (typeof fbResult === 'string') return fbResult;
        return key; // Return key if both current and fallback fail
      }
    }
    
    return typeof result === 'string' ? result : key;
  };

  const t_html = (key: string): { __html: string } => ({ __html: t(key) });
  
  return { 
    t, 
    t_html, 
    language: context.language,
    setLanguage: context.setLanguage,
    translations: context.translations
  };
};
