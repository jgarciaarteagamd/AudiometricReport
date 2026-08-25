import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from '../i18n/LanguageContext.tsx';
import BrandLogo from './Branding/BrandLogo.tsx';

export const CircularFlag: React.FC<{ lang: string, size?: number }> = ({ lang, size = 20 }) => {
    const renderFlagContent = () => {
        switch (lang.toLowerCase()) {
            case 'es': return (<><rect width="20" height="20" fill="#AA151B"/><rect width="20" height="10" y="5" fill="#F1BF00"/></>);
            case 'en': return (<><rect width="20" height="20" fill="#012169"/><path d="M0,0 L20,20 M20,0 L0,20" stroke="#fff" strokeWidth="3"/><path d="M0,0 L20,20 M20,0 L0,20" stroke="#C8102E" strokeWidth="2"/><path d="M10,0 V20 M0,10 H20" stroke="#fff" strokeWidth="5"/><path d="M10,0 V20 M0,10 H20" stroke="#C8102E" strokeWidth="3"/></>);
            case 'de': return (<><rect width="20" height="6.6" fill="#000"/><rect width="20" height="6.6" y="6.6" fill="#D00"/><rect width="20" height="6.8" y="13.2" fill="#FFCE00"/></>);
            case 'fr': return (<><rect width="6.6" height="20" fill="#002395"/><rect width="6.6" height="20" x="6.6" fill="#fff"/><rect width="6.8" height="20" x="13.2" fill="#ED2939"/></>);
            case 'it': return (<><rect width="6.6" height="20" fill="#008C45"/><rect width="6.6" height="20" x="6.6" fill="#fff"/><rect width="6.8" height="20" x="13.2" fill="#CD212A"/></>);
            case 'pt': return (<><rect width="8" height="20" fill="#006600"/><rect width="12" height="20" x="8" fill="#FF0000"/></>);
            default: return <circle cx="10" cy="10" r="10" fill="#e2e8f0" />;
        }
    };

    return (
        <svg width={size} height={size} viewBox="0 0 20 20" className="rounded-full shadow-sm border border-slate-100 overflow-hidden shrink-0 block">
            {renderFlagContent()}
        </svg>
    );
};

interface SharedHeaderProps {
    onGoHome: () => void;
    currentLang: string;
    onSetLanguage: (lang: string) => void;
}

const SharedHeader: React.FC<SharedHeaderProps> = ({ onGoHome, currentLang, onSetLanguage }) => {
    const [isLangOpen, setIsLangOpen] = useState(false);
    const langMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
                setIsLangOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const languages = [
        { code: 'de', label: 'DE' },
        { code: 'en', label: 'EN' },
        { code: 'es', label: 'ES' },
        { code: 'fr', label: 'FR' },
        { code: 'it', label: 'IT' },
        { code: 'pt', label: 'PT' }
    ];

    const handleLanguageChange = (langCode: string) => {
        try {
            const url = new URL(window.location.href);
            url.searchParams.set('lang', langCode);
            window.history.replaceState({}, '', url.toString());
        } catch (e) {
            console.warn("Error sincronizando idioma en URL:", e);
        }
        onSetLanguage(langCode);
        setIsLangOpen(false);
    };

    return (
        <nav className="fixed top-0 w-full z-40 bg-white/90 backdrop-blur-lg border-b border-slate-100 h-20 flex items-center px-6 justify-between shadow-sm">
            <div className="flex items-center cursor-pointer group" onClick={onGoHome}>
                <BrandLogo className="transition-transform group-hover:scale-[1.02]" />
            </div>
            <div className="relative" ref={langMenuRef}>
                <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl hover:bg-slate-100 transition-all duration-200 shadow-sm">
                    <CircularFlag lang={currentLang} />
                    <span className="text-xs font-black text-slate-600 uppercase tracking-widest">{currentLang}</span>
                    <svg className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${isLangOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
                {isLangOpen && (
                    <div className="absolute right-0 mt-2 w-32 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-[60] animate-slideIn">
                        {languages.map((lang) => (
                            <button key={lang.code} onClick={() => handleLanguageChange(lang.code)} className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm ${currentLang === lang.code ? 'bg-purple-50 text-primary font-bold' : 'text-slate-600 hover:bg-slate-50'}`}>
                                <CircularFlag lang={lang.code} />
                                <span className="flex-grow text-left font-black uppercase tracking-widest">{lang.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </nav>
    );
};

export default SharedHeader;