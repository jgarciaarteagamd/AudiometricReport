import React from 'react';
import {ArrowLeft} from 'lucide-react';
import { useTranslations } from '../../i18n/LanguageContext';

interface FAQPageProps {
  onBack: () => void;
}

const FAQPage: React.FC<FAQPageProps> = ({ onBack }) => {
  const { t } = useTranslations();

  const faqItems = [
      { q: t('free.landing.faq.q1'), a: t('free.landing.faq.a1') },
      { q: t('free.landing.faq.q2'), a: t('free.landing.faq.a2') },
      { q: t('free.landing.faq.q3'), a: t('free.landing.faq.a3') },
      { q: t('free.landing.faq.q4'), a: t('free.landing.faq.a4') },
      { q: t('free.landing.faq.q5'), a: t('free.landing.faq.a5') },
      { q: t('free.landing.faq.q6'), a: t('free.landing.faq.a6') },
      { q: t('free.landing.faq.q7'), a: t('free.landing.faq.a7') },
      { q: t('free.landing.faq.q8'), a: t('free.landing.faq.a8') },
  ];

  return (
    <div className="flex flex-col gap-6 animate-fadeIn py-8 max-w-4xl mx-auto w-full">
      <div className="bg-white rounded-3xl shadow-xl p-8 border border-slate-100 min-h-[50vh]">
        <button 
          onClick={onBack}
          className="flex items-center text-slate-500 hover:text-slate-800 transition-colors mb-8 text-sm font-medium"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          {t('free.legalNoticePage.backToMenu')}
        </button>

        <h1 className="text-3xl font-black text-slate-800 tracking-tight mb-10">
          {t('free.landing.faq.title')}
        </h1>

        <div className="space-y-8">
            {faqItems.map((item, index) => (
                <div key={index} className="space-y-3">
                    <h3 className="font-black text-slate-800 text-base uppercase tracking-tight flex gap-3">
                        <span className="text-primary italic">Q.</span>
                        {item.q}
                    </h3>
                    <p className="text-base text-slate-600 leading-relaxed pl-7">
                        {item.a}
                    </p>
                </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default FAQPage;
