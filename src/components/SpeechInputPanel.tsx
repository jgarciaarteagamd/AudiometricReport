import React from 'react';
import { Ear, SpeechAudiometryEarData } from '../types';
import { useTranslations } from '../i18n/LanguageContext';

interface SpeechInputPanelProps {
    ear: Ear;
    data: SpeechAudiometryEarData;
    onChange: (ear: Ear, field: keyof SpeechAudiometryEarData, value: any, subfield?: string) => void;
}

const InputWithSuffix: React.FC<{
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    suffix: string;
    disabled?: boolean;
}> = ({ value, onChange, suffix, disabled }) => (
    <div className={`relative flex items-center w-full min-w-[80px] h-9 bg-white border border-slate-200 rounded-md overflow-hidden transition-colors ${disabled ? 'bg-slate-50 opacity-60' : 'focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'}`}>
        <input 
            type="number"
            className="w-full h-full px-3 text-sm text-right bg-transparent outline-none disabled:cursor-not-allowed"
            value={value}
            onChange={onChange}
            disabled={disabled}
        />
        <span className="px-3 text-xs font-medium text-slate-400 select-none bg-slate-50 flex items-center justify-center border-l border-slate-100 min-w-fit h-full">
            {suffix}
        </span>
    </div>
);

const SpeechInputPanel: React.FC<SpeechInputPanelProps> = ({ ear, data, onChange }) => {
    const { t } = useTranslations();
    
    const isLeft = ear === Ear.Left;
    const earTitleKey = isLeft ? 'dataInputPanel.leftEar' : 'dataInputPanel.rightEar';
    const earTitle = t(earTitleKey);
    const borderColor = isLeft ? 'border-blue-200' : 'border-red-200';
    const textColor = isLeft ? 'text-blue-600' : 'text-red-600';
    const bgHeader = isLeft ? 'bg-blue-50/30' : 'bg-red-50/30';

    const handleInputChange = (field: keyof SpeechAudiometryEarData, e: React.ChangeEvent<HTMLInputElement>, subfield?: string) => {
        onChange(ear, field, e.target.value, subfield);
    };

    return (
        <div className={`bg-white rounded-xl border ${borderColor} shadow-sm overflow-hidden flex flex-col`}>
             <div className={`py-4 ${bgHeader} border-b ${borderColor}`}>
                 <h3 className={`text-lg font-bold text-center ${textColor}`}>
                     {earTitle}
                 </h3>
             </div>
             
             <div className="p-4 sm:p-6 flex flex-col gap-4">
                 
                 {/* SDT Row */}
                 <div className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-lg">
                    <span className="text-sm font-bold text-slate-700">{t('studies.speech.sdt')}</span>
                    <div className="w-24 sm:w-32"><InputWithSuffix value={data.sdt} onChange={e => handleInputChange('sdt', e)} suffix="dB" /></div>
                 </div>

                 {/* SRT Row */}
                 <div className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-lg">
                    <div className="flex flex-col">
                        <span className="text-sm font-bold text-slate-700">{t('studies.speech.srt')}</span>
                        <label className="flex items-center gap-2 mt-1 text-xs font-medium text-slate-500 cursor-pointer w-fit p-1 -ml-1 rounded hover:bg-slate-100 transition-colors hover:text-primary">
                            <input 
                                type="checkbox" 
                                className="rounded text-primary focus:ring-primary focus:ring-offset-0 w-4 h-4 border-slate-300 accent-primary cursor-pointer hover:border-primary transition-colors"
                                checked={data.srtNotObtained} 
                                onChange={e => onChange(ear, 'srtNotObtained', e.target.checked)} 
                            />
                            {t('studies.speech.noResponse')}
                        </label>
                    </div>
                    <div className="w-24 sm:w-32"><InputWithSuffix value={data.srt} onChange={e => handleInputChange('srt', e)} suffix="dB" disabled={data.srtNotObtained} /></div>
                 </div>

                 {/* WRS 1 Row */}
                 <div className="flex flex-col p-4 bg-slate-50/50 border border-slate-100 rounded-lg">
                    <span className="text-sm font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">{t('studies.speech.wrs')}</span>
                    <div className="flex items-center gap-4 sm:gap-8">
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-xs font-bold text-slate-500">{t('studies.speech.percentage')}</label>
                            <InputWithSuffix value={data.wrs.percentage} onChange={e => handleInputChange('wrs', e, 'percentage')} suffix="%" />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-xs font-bold text-slate-500">{t('studies.speech.intensity')}</label>
                            <InputWithSuffix value={data.wrs.db} onChange={e => handleInputChange('wrs', e, 'db')} suffix="dB" />
                        </div>
                    </div>
                 </div>

                 {/* WRS 2 Row */}
                 <div className="flex flex-col p-4 bg-slate-50/50 border border-slate-100 rounded-lg">
                    <span className="text-sm font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">{t('studies.speech.wrs2')}</span>
                    <div className="flex items-center gap-4 sm:gap-8">
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-xs font-bold text-slate-500">{t('studies.speech.percentage')}</label>
                            <InputWithSuffix value={data.wrs2.percentage} onChange={e => handleInputChange('wrs2', e, 'percentage')} suffix="%" />
                        </div>
                        <div className="flex flex-col gap-1 flex-1">
                            <label className="text-xs font-bold text-slate-500">{t('studies.speech.intensity')}</label>
                            <InputWithSuffix value={data.wrs2.db} onChange={e => handleInputChange('wrs2', e, 'db')} suffix="dB" />
                        </div>
                    </div>
                 </div>

                 {/* UCL Row */}
                 <div className="flex items-center justify-between p-4 bg-slate-50/50 border border-slate-100 rounded-lg">
                    <span className="text-sm font-bold text-slate-700">{t('studies.speech.ucl')}</span>
                    <div className="w-24 sm:w-32"><InputWithSuffix value={data.ucl} onChange={e => handleInputChange('ucl', e)} suffix="dB" /></div>
                 </div>

             </div>
        </div>
    );
};

export default SpeechInputPanel;
