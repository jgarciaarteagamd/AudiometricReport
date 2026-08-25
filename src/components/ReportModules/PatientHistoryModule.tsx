
import React from 'react';
import { ReportInfo } from '../../types.ts';
import { useTranslations } from '../../i18n/LanguageContext.tsx';

const InputField: React.FC<{id: string, label: React.ReactNode, value: string, onChange: (val: string) => void, type?: string, placeholder?: string, disabled?: boolean}> = 
  ({ id, label, value, onChange, type = 'text', placeholder, disabled = false }) => (
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
);

const TextareaField: React.FC<{id: string, label: React.ReactNode, value: string, onChange: (val: string) => void, rows?: number, disabled?: boolean}> = 
  ({ id, label, value, onChange, rows = 2, disabled = false }) => (
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

interface PatientHistoryModuleProps {
    reportInfo: ReportInfo;
    onChange: (field: keyof ReportInfo, value: string) => void;
    disabled?: boolean;
}

const PatientHistoryModule: React.FC<PatientHistoryModuleProps> = ({ reportInfo, onChange, disabled = false }) => {
    const { t } = useTranslations();

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-base font-bold text-slate-700 uppercase mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                    {t('reportGenerator.patient.sectionPersonal')}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                    <InputField id="apellidos" label={t('reportGenerator.patient.lastName')} value={reportInfo.apellidos} onChange={(v) => onChange('apellidos', v)} disabled={disabled} />
                    <InputField id="nombre" label={t('reportGenerator.patient.firstName')} value={reportInfo.nombre} onChange={(v) => onChange('nombre', v)} disabled={disabled} />
                    <InputField id="id" label={t('reportGenerator.patient.id')} value={reportInfo.id} onChange={(v) => onChange('id', v)} disabled={disabled} />
                    
                    <div className="flex gap-4">
                        <div className="flex-grow">
                            <InputField id="fechaNacimiento" type="date" label={t('reportGenerator.patient.birthDate')} value={reportInfo.fechaNacimiento} onChange={(v) => onChange('fechaNacimiento', v)} disabled={disabled} />
                        </div>
                        <div className="w-32">
                            <label className="block text-sm font-medium text-slate-600">{t('reportGenerator.patient.age')}</label>
                            <div className="mt-1 block w-full px-3 py-2 bg-slate-50 text-slate-800 border border-slate-300 rounded-md shadow-sm sm:text-sm font-bold h-[38px] flex items-center justify-center">
                                {reportInfo.edad || '--'}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-sm border border-slate-200">
                <h3 className="text-base font-bold text-slate-700 uppercase mb-4 border-b border-slate-100 pb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                    {t('reportGenerator.clinicalHistory.title')}
                </h3>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-6">
                    <TextareaField id="motivo" label={t('reportGenerator.clinicalHistory.reason')} value={reportInfo.motivo} onChange={(v) => onChange('motivo', v)} rows={2} disabled={disabled} />
                    <TextareaField id="antecedentes" label={t('reportGenerator.clinicalHistory.antecedentes')} value={reportInfo.antecedentes} onChange={(v) => onChange('antecedentes', v)} disabled={disabled} />
                    <TextareaField id="exploracionFisica" label={t('reportGenerator.clinicalHistory.physicalExam')} value={reportInfo.exploracionFisica} onChange={(v) => onChange('exploracionFisica', v)} disabled={disabled} />
                </div>
            </div>
        </div>
    );
};

export default PatientHistoryModule;

