
import React, { useState } from 'react';
import { useTranslations } from '../../i18n/LanguageContext.tsx';

const ReportIssuePage: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t } = useTranslations();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    description: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const subject = `[SUPPORT] ${formData.subject}`;
    const body = `
Name: ${formData.name}
Email: ${formData.email}

Description:
${formData.description}

--------------------------------------------------
App Version: Community Edition (v2.1)
Browser: ${navigator.userAgent}
    `;

    const mailtoLink = `mailto:info@audiometric.report?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoLink;
  };

  return (
    <div className="bg-white text-slate-800 rounded-3xl shadow-xl p-8 sm:p-12 max-w-2xl mx-auto animate-fadeIn border border-slate-100">
      <div className="flex justify-between items-center mb-8 border-b border-slate-50 pb-6">
        <h1 className="text-2xl font-bold text-slate-900">{t('free.reportIssuePage.title')}</h1>
        <button onClick={onBack} className="text-sm font-black uppercase tracking-widest text-primary hover:text-primary-hover transition-colors flex items-center gap-2">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
          {t('free.reportIssuePage.backToMenu')}
        </button>
      </div>

      <p className="text-slate-500 mb-8">{t('free.reportIssuePage.intro')}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 mb-1">{t('free.reportIssuePage.nameLabel')}</label>
            <input 
                type="text" 
                id="name" 
                value={formData.name} 
                onChange={(e) => setFormData({...formData, name: e.target.value})} 
                className="w-full px-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
        </div>

        <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 mb-1">{t('free.reportIssuePage.emailLabel')} <span className="text-red-500">*</span></label>
            <input 
                type="email" 
                id="email" 
                required
                value={formData.email} 
                onChange={(e) => setFormData({...formData, email: e.target.value})} 
                className="w-full px-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
        </div>

        <div>
            <label htmlFor="subject" className="block text-sm font-medium text-slate-700 mb-1">{t('free.reportIssuePage.subjectLabel')} <span className="text-red-500">*</span></label>
            <input 
                type="text" 
                id="subject" 
                required
                placeholder={t('free.reportIssuePage.subjectPlaceholder')}
                value={formData.subject} 
                onChange={(e) => setFormData({...formData, subject: e.target.value})} 
                className="w-full px-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
        </div>

        <div>
            <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-1">{t('free.reportIssuePage.descriptionLabel')} <span className="text-red-500">*</span></label>
            <textarea 
                id="description" 
                required
                rows={5}
                placeholder={t('free.reportIssuePage.descriptionPlaceholder')}
                value={formData.description} 
                onChange={(e) => setFormData({...formData, description: e.target.value})} 
                className="w-full px-4 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
            />
        </div>

        <div className="bg-amber-50 border border-amber-100 p-4 rounded-lg flex gap-3">
             <svg className="w-5 h-5 text-amber-500 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
             <p className="text-xs text-amber-800 font-medium">
                {t('free.reportIssuePage.privacyNote')}
             </p>
        </div>

        <button 
            type="submit" 
            className="w-full py-3 bg-slate-900 text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-all flex items-center justify-center gap-2"
        >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            {t('free.reportIssuePage.sendButton')}
        </button>
      </form>
    </div>
  );
};

export default ReportIssuePage;
