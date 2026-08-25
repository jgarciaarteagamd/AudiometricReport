
import React from 'react';
import { ReportInfo } from '../../types.ts';
import { useTranslations } from '../../i18n/LanguageContext.tsx';

const TextareaField: React.FC<{id: string, label: React.ReactNode, value: string, onChange: (val: string) => void, rows?: number, disabled?: boolean}> =
    ({ id, label, value, onChange, rows = 3, disabled = false }) => (
    <div className="sm:col-span-2">
      <label htmlFor={id} className="block text-sm font-medium text-slate-600">{label}</label>
      <textarea
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={rows}
        disabled={disabled}
        className={`mt-1 block w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary-focus focus:border-primary sm:text-sm ${disabled ? 'bg-slate-50 text-slate-500 cursor-not-allowed border-slate-200' : ''}`}
      />
    </div>
);

const InputField: React.FC<{id: string, label: React.ReactNode, value: string, onChange: (val: string) => void, type?: string, placeholder?: string, disabled?: boolean, hidden?: boolean}> = 
  ({ id, label, value, onChange, type = 'text', placeholder, disabled = false, hidden = false }) => {
    if (hidden) return null;
    return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-slate-600">{label}</label>
      <input
        type={type}
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={`mt-1 block w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-primary-focus focus:border-primary sm:text-sm ${disabled ? 'bg-slate-50 text-slate-500 cursor-not-allowed border-slate-200' : ''}`}
      />
    </div>
)};

interface DiagnosisModuleProps {
    reportInfo: ReportInfo;
    onChange: (field: keyof ReportInfo, value: string) => void;
    disabled?: boolean;
    handleLocationChange: (val: string) => void;
}

const DiagnosisModule: React.FC<DiagnosisModuleProps> = (props) => {
    const { t } = useTranslations();
    const { reportInfo, onChange, disabled = false } = props;
    const locationLabel = t('free.editor.signatureLocation');

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-base font-bold text-slate-700 uppercase mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /></svg>
                    {t('reportGenerator.diagnosis.sectionClinical')}
                </h3>
                <div className="grid grid-cols-1 gap-x-6 gap-y-4">
                    <TextareaField id="juicioClinico" label={t('reportGenerator.diagnosis.clinicalJudgment')} value={reportInfo.juicioClinico} onChange={(v) => onChange('juicioClinico', v)} rows={2} disabled={disabled} />
                    <TextareaField id="plan" label={t('reportGenerator.diagnosis.plan')} value={reportInfo.plan} onChange={(v) => onChange('plan', v)} rows={2} disabled={disabled} />
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-base font-bold text-slate-700 uppercase mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" /></svg>
                    {t('reportGenerator.diagnosis.sectionSignature')}
                </h3>
                <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                        <InputField id="lugarFirma" label={locationLabel} value={reportInfo.lugarFirma} onChange={(v) => props.handleLocationChange(v)} disabled={disabled} />
                        <InputField id="fechaFirma" type="date" label={t('reportGenerator.diagnosis.signatureDate')} value={reportInfo.fechaFirma} onChange={(v) => onChange('fechaFirma', v)} disabled={disabled} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DiagnosisModule;
