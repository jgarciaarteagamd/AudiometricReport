
import React from 'react';
import { useTranslations } from '../i18n/LanguageContext.tsx';

const AdBanner: React.FC = () => {
  const { t } = useTranslations();
  
  return (
    <div className="w-full py-6 flex justify-center items-center print:hidden">
        <div className="w-full max-w-[728px] h-[90px] bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-slate-400 select-none">
            <span className="font-bold text-xs uppercase tracking-widest text-slate-500 mb-1">{t('ads.title')}</span>
            <span className="text-[10px]">{t('ads.placeholder')}</span>
        </div>
    </div>
  );
};

export default AdBanner;
