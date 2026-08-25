import React from 'react';
    import { useTranslations } from '../../i18n/LanguageContext.tsx';
    
    const TermsAndConditionsPage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
      const { t, t_html } = useTranslations();
      
      return (
        <div className="bg-white text-slate-800 rounded-3xl shadow-xl p-8 sm:p-12 max-w-4xl mx-auto animate-fadeIn border border-slate-100">
          <div className="flex justify-between items-center mb-10 border-b border-slate-50 pb-6">
            <h1 className="text-3xl font-black text-slate-900 tracking-tightest">{t('free.termsAndConditionsPage.title')}</h1>
            <button onClick={onBack} className="text-sm font-black uppercase tracking-widest text-primary hover:text-primary-hover transition-colors flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
              {t('free.termsAndConditionsPage.backToMenu')}
            </button>
          </div>
    
          <div 
            className="prose prose-slate max-w-none text-slate-600"
            dangerouslySetInnerHTML={t_html('free.termsAndConditionsPage.content')}
          />
        </div>
      );
    };
    
    export default TermsAndConditionsPage;