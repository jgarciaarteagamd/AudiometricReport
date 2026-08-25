
import React from 'react';
import { useTranslations } from '../i18n/LanguageContext.tsx';
import BrandLogo from './Branding/BrandLogo.tsx';

interface AppFooterProps {
    onNavigate: (view: any) => void;
    onGoHome: () => void;
}

const AppFooter: React.FC<AppFooterProps> = ({ onNavigate, onGoHome }) => {
    const { t } = useTranslations();

    return (
        <footer className="bg-white border-t border-slate-100 py-12 px-8 mt-auto print:hidden font-sans">
            <div className="max-w-7xl mx-auto flex flex-col gap-8">
                <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-10">
                    <div className="flex flex-col items-start gap-3">
                        <div className="cursor-pointer" onClick={onGoHome}>
                            <BrandLogo size="lg" />
                        </div>
                    </div>
                    <div className="flex flex-col items-center justify-center h-full gap-3 text-[11px] font-medium tracking-wide text-slate-500 text-center">
                        <p>© 2026 AudiometricReport — {t('footer.copyrightRights')}</p>
                        <div className="flex items-center justify-center">
                             <a href="https://www.trustedsite.com/verify?host=audiometric.report" target="_blank" rel="noopener noreferrer" className="opacity-90 hover:opacity-100 transition-opacity">
                                <img src="https://cdn.ywxi.net/meter/audiometric.report/102.gif" alt="TrustedSite Certified" loading="lazy" />
                            </a>
                        </div>
                    </div>
                    <div className="flex flex-col items-end gap-1.5 text-[11px] font-medium uppercase tracking-widest text-slate-500">
                        <button onClick={() => onNavigate('legalNotice')} className="hover:text-primary transition-colors duration-300">{t('footer.legalNotice')}</button>
                        <button onClick={() => onNavigate('privacyPolicy')} className="hover:text-primary transition-colors duration-300">{t('footer.privacyPolicy')}</button>
                        <button onClick={() => onNavigate('termsAndConditions')} className="hover:text-primary transition-colors duration-300">{t('footer.termsOfUse')}</button>
                        <button onClick={() => onNavigate('faq')} className="text-primary hover:text-primary-hover transition-colors duration-300 mt-2">{t('free.landing.faq.title')}</button>
                        <button onClick={() => onNavigate('reportIssue')} className="text-slate-400 hover:text-primary transition-colors duration-300 mt-2 pt-2 border-t border-slate-100">{t('footer.reportIssue')}</button>
                    </div>
                </div>

                <div className="border-t border-slate-100 pt-6 text-center">
                    <p className="text-[11px] leading-relaxed text-slate-400 max-w-4xl mx-auto font-normal">
                        {t('footer.disclaimerNotice')}
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default AppFooter;
