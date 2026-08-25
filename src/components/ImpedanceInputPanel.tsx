import React from 'react';
import { Ear, TympanometryEarData, ReflexEarData } from '../types';
import { useTranslations } from '../i18n/LanguageContext';

interface ImpedanceInputPanelProps {
    ear: Ear;
    data: { tymp: TympanometryEarData, reflex: ReflexEarData };
    onTympChange: (ear: Ear, field: keyof TympanometryEarData, value: string) => void;
    onReflexChange: (ear: Ear, type: 'ipsi' | 'contra', freq: number, value: string) => void;
    onReflexAbsentChange: (ear: Ear, type: 'ipsi' | 'contra', freq: number, isAbsent: boolean) => void;
    onReflexPresentChange: (ear: Ear, type: 'ipsi' | 'contra', freq: number, isPresent: boolean) => void;
    onDecayChange: (ear: Ear, freq: number, value: string) => void;
}

const InputWithSuffix: React.FC<{
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    suffix: string;
    step?: string;
}> = ({ value, onChange, suffix, step }) => (
    <div className="relative flex items-center w-full h-9 bg-white border border-slate-200 rounded-md overflow-hidden transition-colors focus-within:border-primary focus-within:ring-1 focus-within:ring-primary">
        <input 
            type="number"
            className="w-full h-full px-3 text-sm text-left bg-transparent outline-none"
            value={value}
            onChange={onChange}
            step={step}
            placeholder="-"
        />
        <span className="px-3 text-xs font-medium text-slate-400 select-none bg-slate-50 flex items-center justify-center border-l border-slate-100 min-w-fit h-full">
            {suffix}
        </span>
    </div>
);

const ImpedanceInputPanel: React.FC<ImpedanceInputPanelProps> = ({ ear, data, onTympChange, onReflexChange, onReflexAbsentChange, onReflexPresentChange, onDecayChange }) => {
    const { t } = useTranslations();
    
    const isLeft = ear === Ear.Left;
    const earTitleKey = isLeft ? 'dataInputPanel.leftEar' : 'dataInputPanel.rightEar';
    const earTitle = t(earTitleKey);
    const borderColor = isLeft ? 'border-blue-200' : 'border-red-200';
    const textColor = isLeft ? 'text-blue-600' : 'text-red-600';
    const bgHeader = isLeft ? 'bg-blue-50/30' : 'bg-red-50/30';

    const handleTympChange = (field: keyof TympanometryEarData, e: React.ChangeEvent<HTMLInputElement>) => {
        onTympChange(ear, field, e.target.value);
    };

    const freqs = [500, 1000, 2000, 4000];

    const renderReflexRow = (type: 'ipsi' | 'contra', title: string) => {
        return (
            <div className="grid grid-cols-[45px_1fr_1fr_1fr_1fr] sm:grid-cols-[80px_1fr_1fr_1fr_1fr] gap-1 sm:gap-2 items-start mt-3">
                <div className="text-[10px] sm:text-sm font-bold text-slate-700 pt-2 break-words">{title}</div>
                {freqs.map(freq => {
                    const absentMap = data.reflex.absent?.[type] || {};
                    const presentMap = data.reflex.present?.[type] || {};
                    const isAbsent = absentMap[freq] || false;
                    const hasValue = data.reflex[type][freq] !== '' && data.reflex[type][freq] !== undefined;
                    const isPresent = presentMap[freq] || hasValue;
                    const showDecay = type === 'contra' && (freq === 500 || freq === 1000) && isPresent;

                    return (
                        <div key={`${type}-${freq}`} className="flex flex-col gap-1 items-center">
                            <div className={`relative flex w-full items-stretch h-8 overflow-hidden border rounded transition-colors ${isAbsent ? 'bg-slate-50 border-slate-200' : 'bg-white border-slate-300 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary'}`}>
                                <input 
                                    type="number" 
                                    className={`w-full min-w-0 pr-5 sm:pr-6 pl-1 text-center text-[10px] sm:text-xs outline-none bg-transparent ${isAbsent ? 'text-slate-400' : 'text-slate-900'}`}
                                    value={data.reflex[type][freq] || ''} 
                                    onChange={e => {
                                        const val = e.target.value;
                                        onReflexChange(ear, type, freq, val);
                                        if (val !== '') {
                                            if (isAbsent) onReflexAbsentChange(ear, type, freq, false);
                                            if (!presentMap[freq]) onReflexPresentChange(ear, type, freq, true);
                                        } else {
                                            onReflexPresentChange(ear, type, freq, false);
                                        }
                                    }} 
                                    disabled={isAbsent}
                                    placeholder="-"
                                />
                                <div className="absolute top-0 right-0 h-full flex flex-col w-5 sm:w-6 shrink-0 bg-slate-50 border-l border-slate-200">
                                    <button
                                        type="button"
                                        className={`w-full flex-1 flex items-center justify-center text-[8px] sm:text-[9px] font-bold border-b border-slate-200 transition-colors ${isPresent ? 'bg-green-100 text-green-700 shadow-inner' : 'bg-transparent text-slate-400 hover:bg-slate-100'}`}
                                        onClick={() => {
                                            if (hasValue) return; // Cannot disable P if there's a value
                                            const newState = !presentMap[freq];
                                            onReflexPresentChange(ear, type, freq, newState);
                                            if (newState && isAbsent) {
                                                onReflexAbsentChange(ear, type, freq, false);
                                            }
                                        }}
                                        title="Presente"
                                    >
                                        P
                                    </button>
                                    <button
                                        type="button"
                                        className={`w-full flex-1 flex items-center justify-center text-[8px] sm:text-[9px] font-bold transition-colors ${isAbsent ? 'bg-orange-100 text-orange-600 shadow-inner' : 'bg-transparent text-slate-400 hover:bg-slate-100'}`}
                                        onClick={() => {
                                            const newState = !isAbsent;
                                            onReflexAbsentChange(ear, type, freq, newState);
                                            if (newState) {
                                                if (presentMap[freq]) onReflexPresentChange(ear, type, freq, false);
                                                if (hasValue) onReflexChange(ear, type, freq, '');
                                            }
                                        }}
                                        title="Ausente"
                                    >
                                        A
                                    </button>
                                </div>
                            </div>
                            {showDecay && (
                                <div className="w-full mt-1">
                                    <input 
                                        type="number" 
                                        placeholder="Decay(s)"
                                        className="w-full h-7 px-1 text-center text-[10px] border border-primary/40 bg-primary/5 text-primary placeholder:text-primary/40 rounded focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-colors" 
                                        value={data.reflex.decay[freq] || ''} 
                                        onChange={e => onDecayChange(ear, freq, e.target.value)} 
                                        step="0.1"
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className={`bg-white rounded-xl border ${borderColor} shadow-sm overflow-hidden flex flex-col h-full`}>
             <div className={`py-4 ${bgHeader} border-b ${borderColor}`}>
                 <h3 className={`text-lg font-bold text-center ${textColor}`}>
                     {earTitle}
                 </h3>
             </div>

             <div className="p-4 sm:p-6 flex flex-col gap-6">
                 {/* Timpanometría */}
                 <div className="flex flex-col p-4 bg-slate-50/50 border border-slate-100 rounded-lg">
                    <span className="text-sm font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">{t('studies.tympanometry.title')}</span>
                    <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-slate-500">{t('studies.tympanometry.pressure')}</label>
                            <InputWithSuffix value={data.tymp.pom} onChange={e => handleTympChange('pom', e)} step="0.01" suffix="daPa" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-slate-500">{t('studies.tympanometry.compliance')}</label>
                            <InputWithSuffix value={data.tymp.cac} onChange={e => handleTympChange('cac', e)} step="0.01" suffix="mL" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-slate-500">{t('studies.tympanometry.volume')}</label>
                            <InputWithSuffix value={data.tymp.veq} onChange={e => handleTympChange('veq', e)} step="0.01" suffix="mL" />
                        </div>
                        <div className="flex flex-col gap-1">
                            <label className="text-xs font-bold text-slate-500">{t('studies.tympanometry.gradient')}</label>
                            <InputWithSuffix value={data.tymp.gradient} onChange={e => handleTympChange('gradient', e)} step="0.01" suffix="daPa" />
                        </div>
                    </div>
                 </div>

                 {/* Reflejos Estapediales */}
                 <div className="flex flex-col p-2 sm:p-4 bg-slate-50/50 border border-slate-100 rounded-lg">
                    <span className="text-sm font-bold text-slate-700 mb-4 border-b border-slate-200 pb-2">{t('studies.reflexes.title')}</span>
                    <div className="flex flex-col">
                        {/* Headers */}
                        <div className="grid grid-cols-[45px_1fr_1fr_1fr_1fr] sm:grid-cols-[80px_1fr_1fr_1fr_1fr] gap-1 sm:gap-2 mb-2">
                            <div></div>
                            {freqs.map(f => <div key={f} className="text-[10px] sm:text-xs font-bold text-center text-slate-500">{f} Hz</div>)}
                        </div>
                        {renderReflexRow('ipsi', t('studies.reflexes.ipsi'))}
                        <div className="h-px bg-slate-100 my-3"></div>
                        {renderReflexRow('contra', t('studies.reflexes.contra'))}
                    </div>
                 </div>
             </div>
        </div>
    );
};

export default ImpedanceInputPanel;
