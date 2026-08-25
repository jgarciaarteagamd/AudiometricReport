
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

    // Dynamic SEO Update based on view
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
        
        // Update canonical link dynamically
        let canonicalLink = document.querySelector('link[rel="canonical"]');
        if (!canonicalLink) {
            canonicalLink = document.createElement('link');
            canonicalLink.setAttribute('rel', 'canonical');
            document.head.appendChild(canonicalLink);
        }
        
        try {
            const currentUrl = new URL(window.location.href);
            // Ensure no tracking params are in canonical, but keep 'view' parameter.
            const searchParams = new URLSearchParams();
            if (view !== 'menu') {
                searchParams.set('view', view);
            }
            // Add 'lang' param if it's currently present or needed
            const urlLang = new URLSearchParams(currentUrl.search).get('lang');
            if (urlLang) searchParams.set('lang', urlLang);
            
            const cleanQuery = searchParams.toString();
            const cleanUrl = currentUrl.origin + currentUrl.pathname + (cleanQuery ? '?' + cleanQuery : '');
            canonicalLink.setAttribute('href', cleanUrl);
        } catch(e) {
            console.warn("Could not update canonical url", e);
        }
    }, [view, translations]);

    const syncViewFromUrl = useCallback(() => {
        const p = new URLSearchParams(window.location.search);
        const v = p.get('view');
        const rid = p.get('reportId');
        const langUrl = p.get('lang');

        // Sincronizar idioma solo la primera vez o si viene en URL
        if (langUrl && langUrl !== language) {
            setLanguage(langUrl);
        }

        if (v === 'calculator' || v === 'reportGenerator' || v === 'legalNotice' || v === 'privacyPolicy' || v === 'termsAndConditions' || v === 'faq' || v === 'reportIssue' || (v === 'free-report' && !!rid)) {
            setIsStarted(true);
            setView(v as any);
            
            if (v === 'free-report' && rid) {
                const stored = sessionStorage.getItem(`report_data_${rid}`);
                if (stored) setReportData(JSON.parse(stored));
            }
        } else {
            setIsStarted(false);
            setView('menu');
        }
    }, [setLanguage]); // Eliminado language de las dependencias

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
                const url = new URL(window.location.href);
                if (targetView === 'menu') {
                    url.searchParams.delete('view');
                    url.searchParams.delete('reportId');
                } else {
                    url.searchParams.set('view', targetView);
                }
                window.history.pushState({}, '', url.toString());
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
                const url = new URL(window.location.href);
                url.searchParams.delete('view');
                url.searchParams.delete('reportId');
                window.history.pushState({}, '', url.toString());
            }
        } catch (e) {
            console.warn("Error en navegación:", e);
        }
    };

    if (view === 'free-report' && reportData) return <Report data={reportData} />;
    
    if (!isStarted) return (
        <LandingPage 
            onNavigate={navigateTo} 
            onGoHome={goHome}
        />
    );

    return (
        <div className="bg-slate-50 min-h-screen font-sans text-slate-900 flex flex-col">
            <SharedHeader 
                onGoHome={goHome} 
                currentLang={language} 
                onSetLanguage={setLanguage}
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
