import { AppView } from '../types';

export const SUPPORTED_LANGUAGES = ['es', 'en', 'de', 'fr', 'it', 'pt'] as const;
export type SupportedLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const SEO_VIEWS = ['home', 'calculator', 'reportGenerator', 'legalNotice', 'privacyPolicy', 'faq'] as const;
export type SeoView = (typeof SEO_VIEWS)[number];

export const VIEW_TO_SLUG: Record<SeoView, string> = {
  home: '',
  calculator: 'calculator',
  reportGenerator: 'report-generator',
  legalNotice: 'legal-notice',
  privacyPolicy: 'privacy-policy',
  faq: 'faq',
};

export const SLUG_TO_VIEW: Record<string, SeoView> = {
  '': 'home',
  'calculator': 'calculator',
  'report-generator': 'reportGenerator',
  'legal-notice': 'legalNotice',
  'privacy-policy': 'privacyPolicy',
  'faq': 'faq',
};

/**
 * Returns the clean path for a given view and language.
 * Examples:
 *  - ('home', 'es') -> '/'
 *  - ('calculator', 'es') -> '/calculator'
 *  - ('home', 'en') -> '/en/'
 *  - ('calculator', 'en') -> '/en/calculator'
 *  - ('faq', 'fr') -> '/fr/faq'
 */
export function getCleanPath(view: AppView | 'home', lang: string = 'es'): string {
  const normalizedView: SeoView = view === 'menu' ? 'home' : (view as SeoView);
  const slug = VIEW_TO_SLUG[normalizedView] !== undefined ? VIEW_TO_SLUG[normalizedView] : '';
  const isDefaultLang = !lang || lang === 'es';

  if (isDefaultLang) {
    return slug ? `/${slug}` : '/';
  }

  return slug ? `/${lang}/${slug}` : `/${lang}/`;
}

/**
 * Returns the full canonical URL.
 */
export function getCanonicalUrl(view: AppView | 'home', lang: string = 'es'): string {
  const cleanPath = getCleanPath(view, lang);
  return `https://audiometric.report${cleanPath}`;
}

/**
 * Parses window.location.pathname into view + lang.
 * Returns null if the pathname does not match any known clean route.
 */
export function parsePathname(pathname: string): { view: AppView; lang: string } | null {
  if (!pathname) return null;

  // Remove query or hash if present
  let clean = pathname.split('?')[0].split('#')[0].trim();
  clean = clean.replace(/\/+/g, '/');

  if (clean === '' || clean === '/') {
    return { view: 'menu', lang: 'es' };
  }

  const segments = clean.replace(/^\/+|\/+$/g, '').split('/');

  if (segments.length === 1) {
    const segment = segments[0];
    if (SUPPORTED_LANGUAGES.includes(segment as SupportedLanguage) && segment !== 'es') {
      return { view: 'menu', lang: segment };
    }
    if (SLUG_TO_VIEW[segment] !== undefined) {
      const v = SLUG_TO_VIEW[segment];
      return { view: v === 'home' ? 'menu' : v, lang: 'es' };
    }
  } else if (segments.length === 2) {
    const [langSegment, slugSegment] = segments;
    if (SUPPORTED_LANGUAGES.includes(langSegment as SupportedLanguage) && SLUG_TO_VIEW[slugSegment] !== undefined) {
      const v = SLUG_TO_VIEW[slugSegment];
      return { view: v === 'home' ? 'menu' : v, lang: langSegment };
    }
  }

  return null;
}
