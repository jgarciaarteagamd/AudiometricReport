import React, { useState, useEffect } from 'react';
import { useTranslations } from '../i18n/LanguageContext';
import { motion, AnimatePresence } from 'motion/react';

const CookieConsent: React.FC = () => {
    const { t } = useTranslations();
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const consent = localStorage.getItem('cookie-consent');
        if (!consent) {
            const timer = setTimeout(() => setIsVisible(true), 1500);
            return () => clearTimeout(timer);
        }
    }, []);

    const handleAccept = () => {
        localStorage.setItem('cookie-consent', 'accepted');
        setIsVisible(false);
    };

    const handleDecline = () => {
        localStorage.setItem('cookie-consent', 'declined');
        setIsVisible(false);
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div 
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: 100, opacity: 0 }}
                    className="fixed bottom-4 left-4 right-4 md:left-auto md:right-8 md:max-w-md z-[100]"
                >
                    <div className="bg-white/95 backdrop-blur-md border border-slate-200 shadow-2xl rounded-2xl p-6 overflow-hidden relative">
                        {/* Decorative background accent */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 blur-3xl pointer-events-none"></div>
                        
                        <div className="relative">
                            <h3 className="text-sm font-black text-slate-900 uppercase tracking-widest mb-2 flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-primary rounded-full"></span>
                                {t('cookies.title')}
                            </h3>
                            <p className="text-xs text-slate-600 leading-relaxed mb-6 font-medium">
                                {t('cookies.description')}
                            </p>
                            <div className="flex gap-3">
                                <button 
                                    onClick={handleAccept}
                                    className="flex-1 bg-slate-900 hover:bg-black text-white text-[10px] font-black uppercase tracking-widest py-3 rounded-xl transition-all active:scale-95 whitespace-nowrap"
                                >
                                    {t('cookies.accept')}
                                </button>
                                <button 
                                    onClick={handleDecline}
                                    className="px-6 hover:bg-slate-100 text-slate-500 text-[10px] font-bold uppercase tracking-widest py-3 rounded-xl transition-all active:scale-95"
                                >
                                    {t('cookies.decline')}
                                </button>
                            </div>
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CookieConsent;
