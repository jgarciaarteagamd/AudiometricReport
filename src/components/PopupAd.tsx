
import React, { useEffect, useState } from 'react';
import { useTranslations } from '../i18n/LanguageContext.tsx';

interface PopupAdProps {
  onClose: () => void;
}

const PopupAd: React.FC<PopupAdProps> = ({ onClose }) => {
  const { t } = useTranslations();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-slate-900/60 backdrop-blur-sm p-4 transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="bg-white rounded-xl shadow-2xl relative max-w-sm w-full overflow-hidden transform transition-all scale-100">
        <div className="bg-slate-100 px-4 py-2 flex justify-between items-center border-b border-slate-200">
            <span className="text-[10px] uppercase tracking-widest font-bold text-slate-400">{t('ads.title')}</span>
            <button onClick={onClose} className="text-slate-400 hover:text-slate-700 transition-colors" aria-label="Cerrar publicidad">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
        </div>
        <div className="p-6 flex flex-col items-center justify-center min-h-[300px] bg-slate-50">
            <div className="w-[300px] h-[250px] bg-white border-2 border-dashed border-slate-300 rounded-lg flex flex-col items-center justify-center text-center p-4">
                <span className="text-4xl mb-2">📢</span>
                <p className="text-slate-500 font-medium text-sm">Anuncio de Google AdSense</p>
                <p className="text-slate-400 text-xs mt-2">({t('ads.placeholder')})</p>
            </div>
        </div>
        <div className="p-3 border-t border-slate-100 bg-white">
            <button onClick={onClose} className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 font-semibold rounded-lg text-sm transition-colors">
                {t('ads.close')}
            </button>
        </div>
      </div>
    </div>
  );
};

export default PopupAd;
