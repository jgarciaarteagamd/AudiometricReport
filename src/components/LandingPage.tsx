import React, { useState, useRef, useEffect } from 'react';
import { useTranslations } from '../i18n/LanguageContext';
import BrandLogo from './Branding/BrandLogo';
import { CircularFlag } from './SharedHeader';
import AppFooter from './AppFooter';
import CookieConsent from './CookieConsent';
import { AppView } from '../types';

interface LandingPageProps {
  onNavigate: (page: AppView) => void;
  onGoHome: () => void;
  onSetLanguage?: (lang: string) => void;
}

const ActionCard: React.FC<{ title: string; desc: string; onClick: () => void; icon: React.ReactNode; primary?: boolean }> = ({ title, desc, onClick, icon, primary }) => {
    const { t } = useTranslations();
    return (
        <button
            onClick={onClick}
            className={`group relative p-8 rounded-[40px] transition-all duration-500 text-left border-2 overflow-hidden flex flex-col justify-between h-full ${
                primary 
                ? 'bg-slate-900 border-slate-900 text-white hover:shadow-2xl hover:shadow-primary/20' 
                : 'bg-white border-slate-100 text-slate-900 hover:border-primary/30 hover:shadow-xl'
            }`}
        >
            <div className="relative z-10">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${primary ? 'bg-primary text-white shadow-lg shadow-primary/40' : 'bg-slate-50 text-primary'}`}>
                    {icon}
                </div>
                <h3 className="text-2xl font-black mb-3 tracking-tight">{title}</h3>
                <p className={`text-sm leading-relaxed ${primary ? 'text-white/70' : 'text-slate-500'}`}>{desc}</p>
            </div>
            <div className={`mt-8 flex items-center gap-2 font-black text-[10px] uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-all transform translate-x-[-10px] group-hover:translate-x-0 ${primary ? 'text-white/80' : 'text-primary'}`}>
                <span>{t('free.landing.startTool')}</span>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </div>
        </button>
    );
};

const LandingPage: React.FC<LandingPageProps> = ({ onNavigate, onGoHome, onSetLanguage }) => {
  const { t, language, setLanguage } = useTranslations();
  const [isLangOpen, setIsLangOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);

  const handleSelectLanguage = (code: string) => {
    if (onSetLanguage) {
      onSetLanguage(code);
    } else {
      setLanguage(code);
    }
    setIsLangOpen(false);
  };

  useEffect(() => {
    const click = (e: any) => { if (langMenuRef.current && !langMenuRef.current.contains(e.target)) setIsLangOpen(false); };
    document.addEventListener('mousedown', click); return () => document.removeEventListener('mousedown', click);
  }, []);

  const languages = [
    { code: 'de', label: 'DE' },
    { code: 'en', label: 'EN' },
    { code: 'es', label: 'ES' },
    { code: 'fr', label: 'FR' },
    { code: 'it', label: 'IT' },
    { code: 'pt', label: 'PT' }
  ];
  
  return (
    <div className="min-h-screen bg-white font-sans selection:bg-primary selection:text-white flex flex-col">
      <nav className="h-20 flex items-center justify-between px-6 border-b border-slate-100">
        <BrandLogo size="md" />
        <div className="flex items-center gap-4">
            <div className="relative" ref={langMenuRef}>
              <button onClick={() => setIsLangOpen(!isLangOpen)} className="flex items-center gap-2 px-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-100 transition-all shadow-sm">
                <CircularFlag lang={language} />
                <span className="uppercase text-slate-600">{language}</span>
                <svg className={`w-3 h-3 text-slate-400 transition-transform duration-300 ${isLangOpen?'rotate-180':''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M19 9l-7 7-7-7"/></svg>
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-2xl shadow-2xl border border-slate-100 py-2 z-50 animate-slideIn">
                  {languages.map(l => (
                    <button key={l.code} onClick={() => handleSelectLanguage(l.code)} className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm ${language === l.code ? 'bg-purple-50 text-primary font-black' : 'text-slate-600 hover:bg-slate-50'}`}>
                      <CircularFlag lang={l.code} />
                      <span className="font-black uppercase tracking-widest">{l.label}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
        </div>
      </nav>
      <main className="flex-grow flex flex-col items-center w-full">
        <div className="animate-fadeIn w-full flex flex-col items-center px-6 py-12 max-w-7xl mx-auto">
            <div className="flex justify-center mb-10">
                <BrandLogo size="xl" />
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-slate-900 tracking-tightest leading-tight mb-8 text-center max-w-4xl">
                {t('free.landing.tagline')}
            </h1>
            <p className="text-xl text-slate-500 font-medium mb-16 max-w-2xl mx-auto leading-relaxed text-center">
                {t('free.landing.description')}
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-24 w-full max-w-5xl">
                <ActionCard title={t('free.landing.ctaCalculatorTitle')} desc={t('free.landing.ctaCalculatorDesc')} onClick={() => onNavigate('calculator')} icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>} />
                <ActionCard title={t('free.landing.ctaGeneratorTitle')} desc={t('free.landing.ctaGeneratorDesc')} onClick={() => onNavigate('reportGenerator')} icon={<svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>} />
            </div>
        </div>

        <div className="w-full">
            {/* Purple Section: Studies */}
                <div className="bg-[#a855f7] py-24 px-6 mb-2">
                    <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-16 items-center">
                        <div className="text-white">
                            <h2 className="text-4xl md:text-5xl font-black mb-6 tracking-tight leading-tight">{t('free.landing.sections.studies.title')}</h2>
                            <p className="text-xl text-purple-100 font-medium leading-relaxed mb-12">{t('free.landing.sections.studies.subtitle')}</p>
                            
                            <ul className="space-y-8">
                                <li className="flex gap-6">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-white text-[#a855f7] flex items-center justify-center mt-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">{t('free.landing.sections.studies.impedance.title')}</h4>
                                        <p className="text-purple-100 leading-relaxed">{t('free.landing.sections.studies.impedance.desc')}</p>
                                    </div>
                                </li>
                                <li className="flex gap-6">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-white text-[#a855f7] flex items-center justify-center mt-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">{t('free.landing.sections.studies.tonal.title')}</h4>
                                        <p className="text-purple-100 leading-relaxed">{t('free.landing.sections.studies.tonal.desc')}</p>
                                    </div>
                                </li>
                                <li className="flex gap-6">
                                    <div className="shrink-0 w-10 h-10 rounded-full bg-white text-[#a855f7] flex items-center justify-center mt-1">
                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7"/></svg>
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">{t('free.landing.sections.studies.speech.title')}</h4>
                                        <p className="text-purple-100 leading-relaxed">{t('free.landing.sections.studies.speech.desc')}</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        <div className="flex justify-center lg:justify-end">
                            <div className="bg-white p-8 rounded-[32px] shadow-2xl transform lg:rotate-3 max-w-md w-full">
                                <div className="h-6 w-32 bg-slate-100 rounded-lg mb-8"></div>
                                <div className="border-2 border-dashed border-purple-200 rounded-2xl h-64 flex flex-col items-center justify-center text-center p-6 bg-purple-50">
                                    <svg className="w-12 h-12 text-[#a855f7] mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
                                    <span className="font-black text-[#a855f7] uppercase tracking-widest text-sm">Clinical Standards Verified</span>
                                </div>
                                <div className="mt-8 flex justify-center space-x-3">
                                    <div className="h-2 w-16 bg-slate-200 rounded-full"></div>
                                    <div className="h-2 w-32 bg-purple-200 rounded-full"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Dark Section: Reports */}
                <div className="bg-[#0f172a] py-32 px-6 mb-2">
                    <div className="max-w-7xl mx-auto">
                        <div className="mb-20 max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight leading-tight">{t('free.landing.sections.reports.title')}</h2>
                            <p className="text-xl text-slate-400 font-medium leading-relaxed">{t('free.landing.sections.reports.subtitle')}</p>
                        </div>
                        <div className="grid md:grid-cols-3 lg:grid-cols-3 gap-6">
                            <div className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-[32px] hover:bg-slate-800 transition-colors">
                                <div className="w-14 h-14 bg-purple-500/20 text-[#a855f7] rounded-2xl flex items-center justify-center mb-8">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"/></svg>
                                </div>
                                <h4 className="text-xl text-white font-bold mb-3">{t('free.landing.sections.reports.integration.title')}</h4>
                                <p className="text-slate-400 leading-relaxed font-medium">{t('free.landing.sections.reports.integration.desc')}</p>
                            </div>
                            <div className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-[32px] hover:bg-slate-800 transition-colors">
                                <div className="w-14 h-14 bg-purple-500/20 text-[#a855f7] rounded-2xl flex items-center justify-center mb-8">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"/></svg>
                                </div>
                                <h4 className="text-xl text-white font-bold mb-3">{t('free.landing.sections.reports.design.title')}</h4>
                                <p className="text-slate-400 leading-relaxed font-medium">{t('free.landing.sections.reports.design.desc')}</p>
                            </div>
                            <div className="bg-slate-800/50 border border-slate-700/50 p-8 rounded-[32px] hover:bg-slate-800 transition-colors">
                                <div className="w-14 h-14 bg-purple-500/20 text-[#a855f7] rounded-2xl flex items-center justify-center mb-8">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"/></svg>
                                </div>
                                <h4 className="text-xl text-white font-bold mb-3">{t('free.landing.sections.reports.tables.title')}</h4>
                                <p className="text-slate-400 leading-relaxed font-medium">{t('free.landing.sections.reports.tables.desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Light Section: Workflow */}
                <div className="bg-white py-32 px-6">
                    <div className="max-w-7xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-20 gap-8">
                            <div className="max-w-2xl">
                                <h2 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight leading-tight">{t('free.landing.sections.workflow.title')}</h2>
                                <p className="text-xl text-slate-500 font-medium leading-relaxed">{t('free.landing.sections.workflow.subtitle')}</p>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            <div className="bg-slate-50 border border-slate-100 p-8 rounded-[32px] hover:shadow-xl hover:border-purple-100 transition-all">
                                <div className="w-14 h-14 bg-purple-100 text-[#a855f7] rounded-2xl flex items-center justify-center mb-8">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">{t('free.landing.sections.workflow.calculator.title')}</h4>
                                <p className="text-slate-500 leading-relaxed font-medium">{t('free.landing.sections.workflow.calculator.desc')}</p>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 p-8 rounded-[32px] hover:shadow-xl hover:border-purple-100 transition-all">
                                <div className="w-14 h-14 bg-purple-100 text-[#a855f7] rounded-2xl flex items-center justify-center mb-8">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3"/></svg>
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">{t('free.landing.sections.workflow.clipboard.title')}</h4>
                                <p className="text-slate-500 leading-relaxed font-medium">{t('free.landing.sections.workflow.clipboard.desc')}</p>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 p-8 rounded-[32px] hover:shadow-xl hover:border-purple-100 transition-all">
                                <div className="w-14 h-14 bg-purple-100 text-[#a855f7] rounded-2xl flex items-center justify-center mb-8">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"/></svg>
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">{t('free.landing.sections.workflow.languages.title')}</h4>
                                <p className="text-slate-500 leading-relaxed font-medium">{t('free.landing.sections.workflow.languages.desc')}</p>
                            </div>
                            <div className="bg-slate-50 border border-slate-100 p-8 rounded-[32px] hover:shadow-xl hover:border-purple-100 transition-all">
                                <div className="w-14 h-14 bg-purple-100 text-[#a855f7] rounded-2xl flex items-center justify-center mb-8">
                                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                                </div>
                                <h4 className="text-xl font-bold text-slate-900 mb-3">{t('free.landing.sections.workflow.privacy.title')}</h4>
                                <p className="text-slate-500 leading-relaxed font-medium">{t('free.landing.sections.workflow.privacy.desc')}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
      </main>
      <AppFooter onNavigate={onNavigate} onGoHome={onGoHome} />
      <CookieConsent />
    </div>
  );
};

export default LandingPage;