
import React from 'react';
import { useTranslations } from '../i18n/LanguageContext.tsx';
import BrandLogo from './Branding/BrandLogo.tsx';

interface HomePageProps {
  onNavigate: (page: string) => void;
  isFree?: boolean;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const { t } = useTranslations();
  
  return (
    <div className="max-w-6xl mx-auto animate-fadeIn pb-12 text-center">
      <div className="mb-16 pt-8">
        <div className="flex justify-center mb-8">
            <BrandLogo isPremium={false} size="xl" />
        </div>
        <h1 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tightest leading-tight mb-6">
            {t('free.landing.tagline')}
        </h1>
        <p className="text-lg text-slate-500 font-medium max-w-2xl mx-auto">{t('free.landing.description')}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <button onClick={() => onNavigate('calculator')} className="bg-white p-10 rounded-[40px] border-2 border-slate-100 hover:border-primary/30 transition-all text-left shadow-xl hover:shadow-2xl group">
            <div className="w-16 h-16 bg-purple-50 text-primary rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
            </div>
            <h3 className="text-2xl font-black text-slate-800 mb-2">{t('free.landing.ctaCalculatorTitle')}</h3>
            <p className="text-slate-500 text-sm">{t('free.landing.ctaCalculatorDesc')}</p>
        </button>

        <button onClick={() => onNavigate('reportGenerator')} className="bg-slate-900 p-10 rounded-[40px] text-white hover:shadow-2xl transition-all text-left group">
            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"/></svg>
            </div>
            <h3 className="text-2xl font-black mb-2">{t('free.landing.ctaGeneratorTitle')}</h3>
            <p className="text-slate-400 text-sm">{t('free.landing.ctaGeneratorDesc')}</p>
        </button>
      </div>
    </div>
  );
};

export default HomePage;
