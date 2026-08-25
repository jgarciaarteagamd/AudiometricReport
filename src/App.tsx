import React, { useState, useEffect, useCallback, useRef } from 'react';
import { LanguageProvider, useTranslations } from './i18n/LanguageContext';
import LandingPage from './components/LandingPage';
import PtaCalculator from './components/PtaCalculator';
import ReportGenerator from './components/App/ReportGenerator';
import Report from './components/App/Report';
import AppFooter from './components/AppFooter';
import SharedHeader from './components/SharedHeader';
import LegalNoticePage from './components/Legal/LegalNoticePage';
import PrivacyPolicyPage from './components/Legal/PrivacyPolicyPage';
import TermsAndConditionsPage from './components/Legal/TermsAndConditionsPage';
import FAQPage from './components/Legal/FAQPage';
import ReportIssuePage from './components/Support/ReportIssuePage';
import CookieConsent from './components/CookieConsent';
import { FullReportData } from './types';
import { AppView } from './types';
import { trackEvent } from './utils/analytics';
import { getCleanPath, getCanonicalUrl, parsePathname } from './utils/routes';

const AudiometricReportContent: React.FC = () => {
    const { language, setLanguage, translations } = useTranslations();
    const [isStarted, setIsStarted] = useState(false);
    const [view, setView] = useState<AppView>('menu');
    const [reportData, setReportData] = useState<FullReportData | null>(null);
    const initialSyncDone = useRef(false);

    // Track views in Google Analytics
    useEffect(() => {
        if (view) {
            trackEvent(`view_${view}`, { view_name: view });
        }
    }, [view]);

    // Dynamic SEO Update based on view and language
    useEffect(() => {
        if (!translations || !translations.seo) return;
        
        // Find the right SEO data based on the current view
        const currentView = view === 'menu' ? 'home' : view;
        const seoData = translations.seo[currentView] || translations.seo.home || translations.seo;

        if (seoData) {
            // Update Title
            if (seoData.title) {
                document.title = seoData.title;
            }
            
            // Update Description
            if (seoData.description) {
                let metaDescription = document.querySelector('meta[name="description"]');
                if (!metaDescription) {
                    metaDescription = document.createElement('meta');
                    metaDescription.setAttribute('name', 'description');
                    document.head.appendChild(metaDescription);
                }
                metaDescription.setAttribute('content', seoData.description);
            }
        }
        
        // Update canonical link dynamically (exclude private free-report)
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        
        try {
            if (view === 'free-report') {
                canonicalLink.removeAttribute('href');
            } else {
                const canonicalUrl = getCanonicalUrl(currentView, language);
                canonicalLink.setAttribute('href', canonicalUrl);
            }
        } catch(e) {
            console.warn("Could not update canonical url", e);
        }
    }, [view, language, translations]);

    const syncViewFromUrl = useCallback(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const queryView = searchParams.get('view');
        const queryReportId = searchParams.get('reportId');
        const queryLang = searchParams.get('lang');

        // Check if this is a private free-report view (query params)
        if (queryView === 'free-report' && queryReportId) {
            if (queryLang && queryLang !== language) {
                setLanguage(queryLang);
            }
            setIsStarted(true);
            setView('free-report');
            const stored = sessionStorage.getItem(`report_data_${queryReportId}`);
            if (stored) setReportData(JSON.parse(stored));
            return;
        }

        // 1. Try parsing clean pathname
        const parsed = parsePathname(window.location.pathname);

        if (parsed) {
            if (parsed.lang && parsed.lang !== language) {
                setLanguage(parsed.lang);
            }
            const activeLang = parsed.lang || language;

            if (parsed.view === 'menu') {
                setIsStarted(false);
                setView('menu');
            } else {
                setIsStarted(true);
                setView(parsed.view);
            }

            // If there were legacy query parameters on a clean path, clean them up
            if (queryView || queryLang) {
                try {
                    if (window.location.protocol !== 'blob:') {
                        const cleanUrl = getCleanPath(parsed.view, activeLang);
                        window.history.replaceState({}, '', cleanUrl);
                    }
                } catch (e) {
                    console.warn("Could not replace state for legacy query params", e);
                }
            }
            return;
        }

        // 2. Legacy query params fallback (e.g. /?view=calculator&lang=en)
        const activeLang = queryLang || language;
        if (queryLang && queryLang !== language) {
            setLanguage(queryLang);
        }

        if (queryView && ['calculator', 'reportGenerator', 'legalNotice', 'privacyPolicy', 'termsAndConditions', 'faq', 'reportIssue'].includes(queryView)) {
            setIsStarted(true);
            setView(queryView as AppView);
            try {
                if (window.location.protocol !== 'blob:') {
                    const cleanUrl = getCleanPath(queryView as AppView, activeLang);
                    window.history.replaceState({}, '', cleanUrl);
                }
            } catch (e) {
                console.warn("Could not replace state for legacy query params", e);
            }
        } else {
            setIsStarted(false);
            setView('menu');
            try {
                if (window.location.protocol !== 'blob:') {
                    const cleanUrl = getCleanPath('home', activeLang);
                    if (window.location.pathname !== cleanUrl || window.location.search) {
                        window.history.replaceState({}, '', cleanUrl);
                    }
                }
            } catch (e) {
                console.warn("Could not replace state for home url", e);
            }
        }
    }, [language, setLanguage]);

    useEffect(() => {
        if (!initialSyncDone.current) {
            syncViewFromUrl();
            initialSyncDone.current = true;
        }
        window.addEventListener('popstate', syncViewFromUrl);
        return () => window.removeEventListener('popstate', syncViewFromUrl);
    }, [syncViewFromUrl]);

    const navigateTo = (targetView: AppView) => {
        if (targetView === 'menu') {
            setIsStarted(false);
            setView('menu');
        } else {
            setIsStarted(true);
            setView(targetView);
        }

        try {
            if (window.location.protocol !== 'blob:') {
                const cleanPath = getCleanPath(targetView === 'menu' ? 'home' : targetView, language);
                window.history.pushState({}, '', cleanPath);
            }
        } catch (e) {
            console.warn("Error en navegación:", e);
        }
    };

    const goHome = () => {
        setIsStarted(false);
        setView('menu');
        try {
            if (window.location.protocol !== 'blob:') {
                const cleanPath = getCleanPath('home', language);
                window.history.pushState({}, '', cleanPath);
            }
        } catch (e) {
            console.warn("Error en navegación:", e);
        }
    };

    const handleLanguageChange = (newLang: string) => {
        setLanguage(newLang);
        try {
            if (window.location.protocol !== 'blob:' && view !== 'free-report') {
                const cleanPath = getCleanPath(view === 'menu' ? 'home' : view, newLang);
                window.history.replaceState({}, '', cleanPath);
            }
        } catch (e) {
            console.warn("Error sincronizando idioma en URL:", e);
        }
    };

    if (view === 'free-report' && reportData) return <Report data={reportData} />;
    
    if (!isStarted) return (
        <LandingPage 
            onNavigate={navigateTo} 
            onGoHome={goHome}
            onSetLanguage={handleLanguageChange}
        />
    );

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900 flex flex-col">
            <SharedHeader 
                onGoHome={goHome} 
                currentLang={language} 
                onSetLanguage={handleLanguageChange}
            />
            <div className="flex-grow max-w-7xl mx-auto px-4 w-full pt-28 pb-6">
                {view === 'calculator' && <PtaCalculator onBack={goHome} isFree={true} />}
                {view === 'reportGenerator' && <ReportGenerator onBack={goHome} />}
                {view === 'legalNotice' && <LegalNoticePage onBack={goHome} />}
                {view === 'privacyPolicy' && <PrivacyPolicyPage onBack={goHome} />}
                {view === 'termsAndConditions' && <TermsAndConditionsPage onBack={goHome} />}
                {view === 'faq' && <FAQPage onBack={goHome} />}
                {view === 'reportIssue' && <ReportIssuePage onBack={goHome} />}
            </div>
            <AppFooter 
                onNavigate={navigateTo} 
                onGoHome={goHome} 
            />
            <CookieConsent />
        </div>
    );
};

const AudiometricReport: React.FC = () => (
    <LanguageProvider>
        <AudiometricReportContent />
    </LanguageProvider>
);

export default AudiometricReport;
