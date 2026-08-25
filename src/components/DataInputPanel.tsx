import React, { useState, useEffect } from 'react';
import { Ear, Conduction, AudiogramEarData } from '../types';
import { AIR_FREQUENCIES, BONE_FREQUENCIES, MAX_OUTPUT_LEVELS } from '../constants';
import { useTranslations } from '../i18n/LanguageContext';

interface DataInputPanelProps {
  ear: Ear;
  data: AudiogramEarData;
  onDataChange: (ear: Ear, conduction: Conduction, freq: number, value: string) => void;
  onNrChange?: (ear: Ear, conduction: Conduction, freq: number, isNr: boolean) => void;
  isFreeUser?: boolean;
  disabled?: boolean;
  errors?: import('../types').DataError[];
}

const AudiometricInput: React.FC<{
    id: string;
    value: number | null;
    onChange: (val: string) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
    disabled: boolean;
    warning: boolean;
    t: (key: string) => string;
}> = ({ id, value, onChange, onKeyDown, disabled, warning, t }) => {
    const safeValue = (value !== null && value !== undefined) ? value.toString() : '';
    const [localValue, setLocalValue] = useState(safeValue);
    const [isFocused, setIsFocused] = useState(false);

    useEffect(() => {
        if (!isFocused) {
            if (value === null || value === undefined) { setLocalValue(''); } else { setLocalValue(value.toString()); }
        }
    }, [value, isFocused]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => { const newVal = e.target.value; setLocalValue(newVal); onChange(newVal); };
    const handleFocus = () => setIsFocused(true);
    const handleBlur = () => setIsFocused(false);
    const handleKeyDownInternal = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (!disabled) {
            if (e.key === 'ArrowUp') {
                e.preventDefault();
                let base = parseInt(localValue || '0', 10);
                if (isNaN(base)) base = 0;
                const nextVal = base + 5;
                if (nextVal <= 120) { const strVal = nextVal.toString(); setLocalValue(strVal); onChange(strVal); }
            }
            if (e.key === 'ArrowDown') {
                e.preventDefault();
                let base = parseInt(localValue || '0', 10);
                if (isNaN(base)) base = 0;
                const nextVal = base - 5;
                if (nextVal >= -10) { const strVal = nextVal.toString(); setLocalValue(strVal); onChange(strVal); }
            }
        }
        onKeyDown(e);
    };

    return (
        <input
            id={id}
            type="text" 
            inputMode="decimal"
            autoComplete="off"
            value={localValue}
            disabled={disabled}
            onChange={handleChange}
            onFocus={handleFocus}
            onBlur={handleBlur}
            onKeyDown={handleKeyDownInternal}
            className={`w-full p-1 pr-6 border rounded-md text-center text-sm focus:ring-2 focus:outline-none transition
                ${warning 
                    ? 'bg-white border-amber-500 focus:ring-amber-200 focus:border-amber-500 text-amber-600 font-bold' 
                    : 'bg-white text-slate-900 border-slate-300 focus:ring-primary-focus focus:border-primary'
                }
                ${disabled ? 'bg-slate-50 text-slate-400 cursor-not-allowed border-slate-200' : ''}
            `}
            placeholder="dB"
            title={warning ? t('dataInputPanel.limitWarning') : ''}
        />
    );
};

const StyledInputContainer: React.FC<{ 
    title: string; 
    children: React.ReactNode; 
    t: (key: string) => string;
}> = ({ title, children, t }) => (
    <div className="bg-slate-50 p-3 rounded-lg border border-slate-200 shadow-sm mb-4 animate-fadeIn">
        <div className="text-xs font-bold mb-3 border-b border-slate-200 pb-1 flex justify-between items-center text-slate-600">
            <span>{title}</span>
        </div>
        {children}
    </div>
);

const DataInputPanel: React.FC<DataInputPanelProps> = ({ ear, data, onDataChange, onNrChange, isFreeUser = false, disabled = false, errors = [] }) => {
  const { t } = useTranslations();
  const [activeTab, setActiveTab] = useState<Conduction | null>(null);

  const earTitleKey = ear === Ear.Left ? 'dataInputPanel.leftEar' : 'dataInputPanel.rightEar';
  const earTitle = t(earTitleKey);
  const earColor = ear === Ear.Left ? 'text-blue-600' : 'text-red-600'; 
  const borderColor = ear === Ear.Left ? 'border-blue-200' : 'border-red-200';
  
  const qualityErrors = errors.filter(e => e.type === 'limit');

  const renderInputGrid = (conduction: Conduction, conductionDisabled: boolean = false) => {
    let currentData = data.air;
    let nrData: { [key: number]: boolean } | undefined;
    let validFreqs = AIR_FREQUENCIES; 
    let limitKey = 'air';

    switch (conduction) {
        case Conduction.Air: currentData = data.air; nrData = data.noResponse?.air; validFreqs = AIR_FREQUENCIES; limitKey = 'air'; break;
        case Conduction.Bone: currentData = data.bone; nrData = data.noResponse?.bone; validFreqs = BONE_FREQUENCIES; limitKey = 'bone'; break;
        case Conduction.AirMasked: currentData = data.airMasked; nrData = data.noResponse?.airMasked; validFreqs = AIR_FREQUENCIES; limitKey = 'air'; break;
        case Conduction.BoneMasked: currentData = data.boneMasked; nrData = data.noResponse?.boneMasked; validFreqs = BONE_FREQUENCIES; limitKey = 'bone'; break;
        case Conduction.UCL: currentData = data.ucl; nrData = data.noResponse?.ucl; validFreqs = AIR_FREQUENCIES; limitKey = 'ucl'; break;
        case Conduction.Algiacusia: currentData = data.algiacusia; nrData = data.noResponse?.algiacusia; validFreqs = AIR_FREQUENCIES; limitKey = 'algiacusia'; break;
        default: return null;
    }

    const restrictedFreqs = [750, 1500, 6000];
    const displayFreqs = isFreeUser 
        ? AIR_FREQUENCIES.filter(f => !restrictedFreqs.includes(f))
        : AIR_FREQUENCIES;

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, currentIndex: number) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          const freqs = displayFreqs;
          let nextIndex = currentIndex + 1;
          while (nextIndex < freqs.length) {
              const nextFreq = freqs[nextIndex];
              if (validFreqs.includes(nextFreq)) {
                  const nextInput = document.getElementById(`${ear}-${conduction}-${nextFreq}`);
                  if (nextInput) { nextInput.focus(); return; }
              }
              nextIndex++;
          }
      }
    };

    const isOverLimit = (freq: number, val: number | null) => { if (val === null) return false; const limitMap = MAX_OUTPUT_LEVELS[limitKey as keyof typeof MAX_OUTPUT_LEVELS]; const limit = limitMap ? limitMap[freq] : undefined; return limit !== undefined && val > limit; };

    return (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {displayFreqs.map((freq, index) => {
            const isValidFreq = validFreqs.includes(freq);
            if (!isValidFreq) return <div key={`${ear}-${conduction}-${freq}`} className="flex flex-col items-center opacity-0 pointer-events-none" aria-hidden="true"><label className="text-[10px] mb-0.5">{freq}</label><div className="w-full p-1 pr-6 border border-transparent"></div></div>;
            const val = currentData[freq];
            const isNr = nrData ? nrData[freq] : false;
            const limitWarning = isOverLimit(freq, val);
            const warning = limitWarning;
            
            const isDisabled = disabled || conductionDisabled;
            
            return (
            <div key={`${ear}-${conduction}-${freq}`} className="flex flex-col items-center">
              <label htmlFor={`${ear}-${conduction}-${freq}`} className="text-[10px] mb-0.5 text-slate-500">{freq}</label>
              <div className="relative w-full flex items-center">
                  <AudiometricInput id={`${ear}-${conduction}-${freq}`} value={val} onChange={(val) => onDataChange(ear, conduction, freq, val)} onKeyDown={(e) => handleKeyDown(e, index)} disabled={isDisabled} warning={warning} t={t} />
                  {!disabled && (
                      <button 
                        onClick={() => { if (val === null || val === undefined) { const limitMap = MAX_OUTPUT_LEVELS[limitKey as keyof typeof MAX_OUTPUT_LEVELS]; const maxVal = limitMap ? limitMap[freq] : 120; if (maxVal !== undefined) { onDataChange(ear, conduction, freq, maxVal.toString()); } if (onNrChange) onNrChange(ear, conduction, freq, true); } else { if (onNrChange) onNrChange(ear, conduction, freq, !isNr); } }}
                        disabled={isDisabled}
                        className={`absolute right-1 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-100 transition-colors ${isNr ? 'text-primary' : 'text-slate-300'} ${isDisabled ? 'cursor-not-allowed opacity-50' : ''}`}
                        title={t('dataInputPanel.nrTooltip')} tabIndex={-1}
                      ><svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3"><path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg></button>
                  )}
                  {warning && !isNr && (
                      <div 
                        className="absolute -top-1 -right-1 w-2 h-2 bg-amber-500 rounded-full" 
                        title={t('dataInputPanel.limitWarning')}
                      ></div>
                  )}
              </div>
            </div>
          )})}
        </div>
    );
  };

  const hasData = (conduction: Conduction) => {
      let dataObj;
      switch(conduction) {
          case Conduction.Bone: dataObj = data.bone; break;
          case Conduction.AirMasked: dataObj = data.airMasked; break;
          case Conduction.BoneMasked: dataObj = data.boneMasked; break;
          case Conduction.UCL: dataObj = data.ucl; break;
          case Conduction.Algiacusia: dataObj = data.algiacusia; break;
          default: return false;
      }
      return Object.values(dataObj).some(val => val !== null && val !== undefined);
  };

  const renderTabButton = (type: Conduction, label: string) => {
      const isActive = activeTab === type; const hasValues = hasData(type);
      return (
        <button key={type} type="button" onClick={() => setActiveTab(isActive ? null : type)} className={`flex-1 py-2 px-1 text-[10px] sm:text-xs font-medium rounded-t-lg border-b-2 transition-colors relative flex items-center justify-center gap-1 ${isActive ? `${earColor} border-${ear === Ear.Left ? 'blue' : 'red'}-200 bg-slate-50 border-current` : 'text-slate-500 border-transparent hover:bg-slate-50 hover:text-slate-700'}`}>
            <span>{label}</span>
            {hasValues && !isActive && (<span className={`absolute top-1 right-1 h-1.5 w-1.5 rounded-full ${ear === Ear.Left ? 'bg-blue-400' : 'bg-red-400'}`}></span>)}
        </button>
      );
  };

  const tabs = [
      { key: Conduction.Bone, label: t('dataInputPanel.boneConduction') }
  ];

  if (!isFreeUser) {
      tabs.push(
          { key: Conduction.AirMasked, label: t('dataInputPanel.airMaskedConduction') },
          { key: Conduction.BoneMasked, label: t('dataInputPanel.boneMaskedConduction') },
          { key: Conduction.UCL, label: t('dataInputPanel.ucl') },
          { key: Conduction.Algiacusia, label: t('dataInputPanel.algiacusia') }
      );
  }

  return (
    <div className={`bg-white rounded-xl border ${borderColor} shadow-sm h-full flex flex-col overflow-hidden ${disabled ? 'bg-slate-50/50' : ''}`}>
      <div className={`py-4 ${ear === Ear.Left ? 'bg-blue-50/30' : 'bg-red-50/30'} border-b ${borderColor}`}>
        <h3 className={`text-lg font-bold text-center ${earColor}`}>
          {earTitle}
        </h3>
      </div>
      
      <div className="p-4 flex flex-col gap-4">
        <StyledInputContainer title={t('dataInputPanel.airConduction')} t={t}>{renderInputGrid(Conduction.Air)}</StyledInputContainer>
        <div className="flex space-x-1 border-b border-slate-200 mb-0 overflow-x-auto">
            {tabs.map(tab => renderTabButton(tab.key, tab.label))}
        </div>
        <div className="flex-1 min-h-[40px]">
            {activeTab !== null && (
                <StyledInputContainer title={tabs.find(t => t.key === activeTab)?.label || ''} t={t}>
                    {renderInputGrid(activeTab)}
                </StyledInputContainer>
            )}
            {activeTab === null && (<div className="h-full flex items-center justify-center text-xs text-slate-400 italic py-2">{t('dataInputPanel.tabSelectionNotice')}</div>)}
        </div>

        {qualityErrors.length > 0 && (
            <div className="mt-0 p-3 bg-amber-50 border border-amber-200 rounded-lg animate-fadeIn">
              <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                  <span className="text-xs font-black text-amber-800 uppercase tracking-tight">{t('dataInputPanel.qualityAlert')}</span>
              </div>
              <ul className="space-y-1">
                  {qualityErrors.map((err, idx) => (
                      <li key={idx} className="text-[10px] text-amber-700 font-medium leading-tight">
                        <span className="font-black mr-1">{err.freq} Hz:</span>
                        {t(err.messageKey)}
                      </li>
                  ))}
              </ul>
          </div>
      )}
      </div>
    </div>
  );
};

export default DataInputPanel;