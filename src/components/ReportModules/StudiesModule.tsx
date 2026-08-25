
import React, { useState } from 'react';
import { Ear, Conduction, AudiogramData, CalculatedValues, DataError, SpeechAudiometryData, ImpedanceData, SpeechAudiometryEarData, TympanometryEarData, CalculationStandard } from '../../types';
import DataInputPanel from '../DataInputPanel';
import SpeechInputPanel from '../SpeechInputPanel';
import ImpedanceInputPanel from '../ImpedanceInputPanel';
import CalculatedValuesPanel from '../CalculatedValuesPanel';
import AudiogramChart from '../AudiogramChart';
import SpeechAudiometryChart from '../SpeechAudiometryChart';
import ImpedanceChart from '../ImpedanceChart';
import Legend from '../Legend';
import { useTranslations } from '../../i18n/LanguageContext';

interface StudiesModuleProps {
    audiogramData: AudiogramData;
    speechData: SpeechAudiometryData;
    impedanceData: ImpedanceData;
    onDataChange: (ear: Ear, conduction: Conduction, freq: number, value: string) => void;
    onNrChange?: (ear: Ear, conduction: Conduction, freq: number, isNr: boolean) => void;
    onSpeechDataChange: (ear: Ear, field: keyof SpeechAudiometryEarData, value: any, subfield?: string) => void;
    onImpedanceTympChange: (ear: Ear, field: keyof TympanometryEarData, value: string) => void;
    onImpedanceReflexChange: (ear: Ear, type: 'ipsi' | 'contra', freq: number, value: string) => void;
    onImpedanceReflexAbsentChange: (ear: Ear, type: 'ipsi' | 'contra', freq: number, isAbsent: boolean) => void;
    onImpedanceReflexPresentChange: (ear: Ear, type: 'ipsi' | 'contra', freq: number, isPresent: boolean) => void;
    onImpedanceDecayChange: (ear: Ear, freq: number, value: string) => void;
    calculatedValues: CalculatedValues;
    dataErrors?: DataError[];
    calculationStandard: CalculationStandard;
    onCalculationStandardChange: (standard: CalculationStandard) => void;
}

const StudiesModule: React.FC<StudiesModuleProps> = ({ 
    audiogramData, 
    speechData,
    impedanceData,
    onDataChange, 
    onNrChange,
    onSpeechDataChange,
    onImpedanceTympChange,
    onImpedanceReflexChange,
    onImpedanceReflexAbsentChange,
    onImpedanceReflexPresentChange,
    onImpedanceDecayChange,
    calculatedValues,
    dataErrors = [],
    calculationStandard,
    onCalculationStandardChange
}) => {
    const { t } = useTranslations();
    const [activeTab, setActiveTab] = useState<'audiometry' | 'speech' | 'impedance'>('audiometry');

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-center mb-6">
                <div className="flex flex-col md:flex-row bg-slate-50 p-1.5 rounded-2xl border border-slate-100 w-full md:w-fit gap-1 md:gap-0">
                    <button
                        className={`w-full md:w-auto px-4 md:px-6 xl:px-8 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'impedance' ? 'bg-white text-primary shadow-md border border-slate-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 md:hover:bg-transparent'}`}
                        onClick={() => setActiveTab('impedance')}
                    >
                        {t('studies.tympanometry.title')}
                    </button>
                    <button
                        className={`w-full md:w-auto px-4 md:px-6 xl:px-8 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'audiometry' ? 'bg-white text-primary shadow-md border border-slate-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 md:hover:bg-transparent'}`}
                        onClick={() => setActiveTab('audiometry')}
                    >
                        {t('studies.audiometryTitle')}
                    </button>
                    <button
                        className={`w-full md:w-auto px-4 md:px-6 xl:px-8 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'speech' ? 'bg-white text-primary shadow-md border border-slate-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 md:hover:bg-transparent'}`}
                        onClick={() => setActiveTab('speech')}
                    >
                        {t('studies.speechTitle')}
                    </button>
                </div>
            </div>

            {activeTab === 'audiometry' && (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <DataInputPanel 
                            ear={Ear.Right} 
                            data={audiogramData.right} 
                            onDataChange={onDataChange} 
                            onNrChange={onNrChange}
                            errors={dataErrors.filter(e => e.ear === Ear.Right)}
                        />
                        <DataInputPanel 
                            ear={Ear.Left} 
                            data={audiogramData.left} 
                            onDataChange={onDataChange} 
                            onNrChange={onNrChange}
                            errors={dataErrors.filter(e => e.ear === Ear.Left)}
                        />
                    </div>
                    
                    <div className="mt-8 mb-4 border-t border-slate-200 pt-8 pb-2">
                        <div className="flex justify-center mb-6">
                            <div className="bg-slate-50 p-1.5 rounded-2xl border border-slate-100 flex overflow-x-auto w-full max-w-2xl px-1">
                                {Object.values(CalculationStandard).map((std) => (
                                    <button 
                                        key={std} 
                                        onClick={() => onCalculationStandardChange(std)} 
                                        className={`flex-1 min-w-[80px] px-4 py-2.5 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${calculationStandard === std ? 'bg-white text-primary shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                                    >
                                        {std}
                                    </button>
                                ))}
                            </div>
                        </div>
                        <CalculatedValuesPanel data={calculatedValues} hideGrade={true} />
                    </div>
                    
                    <div className="border-t border-slate-200 mt-8 pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="aspect-[4/3] sm:aspect-auto sm:h-[360px] border border-red-200 rounded-xl overflow-hidden shadow-sm bg-white">
                                <AudiogramChart ear={Ear.Right} data={audiogramData.right} />
                            </div>
                            <div className="aspect-[4/3] sm:aspect-auto sm:h-[360px] border border-blue-200 rounded-xl overflow-hidden shadow-sm bg-white">
                                <AudiogramChart ear={Ear.Left} data={audiogramData.left} />
                            </div>
                        </div>
                        <div className="mt-8 flex justify-center">
                            <Legend isMinimal={false} />
                        </div>
                    </div>
                </>
            )}

            {activeTab === 'speech' && (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <SpeechInputPanel ear={Ear.Right} data={speechData.right} onChange={onSpeechDataChange} />
                        <SpeechInputPanel ear={Ear.Left} data={speechData.left} onChange={onSpeechDataChange} />
                    </div>
                    <div className="border-t border-slate-200 mt-8 pt-6">
                        <SpeechAudiometryChart data={speechData} />
                    </div>
                </>
            )}

            {activeTab === 'impedance' && (
                <>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <ImpedanceInputPanel 
                            ear={Ear.Right} 
                            data={impedanceData.right} 
                            onTympChange={onImpedanceTympChange} 
                            onReflexChange={onImpedanceReflexChange}
                            onReflexAbsentChange={onImpedanceReflexAbsentChange}
                            onReflexPresentChange={onImpedanceReflexPresentChange}
                            onDecayChange={onImpedanceDecayChange}
                        />
                        <ImpedanceInputPanel 
                            ear={Ear.Left} 
                            data={impedanceData.left} 
                            onTympChange={onImpedanceTympChange} 
                            onReflexChange={onImpedanceReflexChange}
                            onReflexAbsentChange={onImpedanceReflexAbsentChange}
                            onReflexPresentChange={onImpedanceReflexPresentChange}
                            onDecayChange={onImpedanceDecayChange}
                        />
                    </div>
                    <div className="border-t border-slate-200 mt-8 pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="aspect-[4/3] sm:aspect-auto sm:h-[400px] border border-red-200 rounded-xl overflow-hidden shadow-sm bg-white">
                                <ImpedanceChart ear={Ear.Right} data={impedanceData.right.tymp} />
                            </div>
                            <div className="aspect-[4/3] sm:aspect-auto sm:h-[400px] border border-blue-200 rounded-xl overflow-hidden shadow-sm bg-white">
                                <ImpedanceChart ear={Ear.Left} data={impedanceData.left.tymp} />
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default StudiesModule;
