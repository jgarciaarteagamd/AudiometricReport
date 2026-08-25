import React, { useState, useMemo, useCallback } from 'react';
import { calculateAllResults } from '../utils/calculations.ts';
import { useTranslations } from '../i18n/LanguageContext.tsx';
import { CalculationStandard } from '../types.ts';

// Frecuencias para el cálculo: 500, 1000, 2000, 4000 Hz.
const CALC_FREQUENCIES = [500, 1000, 2000, 4000];

interface HearingValues {
  [key: number]: number | null;
}

const initialValues: HearingValues = CALC_FREQUENCIES.reduce((acc, freq) => {
  acc[freq] = null;
  return acc;
}, {} as HearingValues);

interface PtaCalculatorProps {
    onBack: () => void;
    backLabelKey?: string;
    isFree?: boolean;
}

const InputGrid: React.FC<{
  ear: 'right' | 'left', 
  values: HearingValues, 
  onChange: (ear: 'right' | 'left', freq: number, value: string) => void,
  t: (key: string) => string
}> = ({ear, values, onChange, t}) => {
    const title = ear === 'right' ? t('ptaCalculator.rightEar') : t('ptaCalculator.leftEar');
    const color = ear === 'right' ? 'text-red-600' : 'text-blue-500';

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, currentIndex: number) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          const nextIndex = currentIndex + 1;
          if (nextIndex < CALC_FREQUENCIES.length) {
              const nextFreq = CALC_FREQUENCIES[nextIndex];
              const nextInput = document.getElementById(`${ear}-${nextFreq}`);
              nextInput?.focus();
          } else if (ear === 'right') {
              const nextFreq = CALC_FREQUENCIES[0];
              const nextInput = document.getElementById(`left-${nextFreq}`);
              nextInput?.focus();
          }
      }
    };
    
    return (
      <div className="bg-slate-100/50 p-3 sm:p-4 rounded-lg border border-slate-200 w-full">
          <h3 className={`text-lg sm:text-xl font-bold mb-4 text-center ${color}`}>{title}</h3>
          <div className="grid grid-cols-2 gap-x-2 sm:gap-x-3 gap-y-2">
          {CALC_FREQUENCIES.map((freq, index) => (
              <div key={`${ear}-${freq}`} className="flex items-center">
                  <label htmlFor={`${ear}-${freq}`} className="text-xs text-slate-600 w-14 shrink-0">
                    {freq >= 1000 ? `${freq / 1000} KHz` : `${freq} Hz`}
                  </label>
                  <input
                      id={`${ear}-${freq}`}
                      type="number"
                      min="-10"
                      max="120"
                      step="5"
                      value={values[freq] ?? ''}
                      onChange={(e) => onChange(ear, freq, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, index)}
                      className="w-full p-1 bg-white border border-slate-300 rounded-md text-center text-xs focus:ring-2 focus:ring-primary-focus focus:border-primary transition"
                      placeholder="dB"
                  />
              </div>
          ))}
          </div>
      </div>
    )
};

const ResultDisplay: React.FC<{title: string, pta: string, loss: string, ptaUnit: string, lossUnit: string}> = ({title, pta, loss, ptaUnit, lossUnit}) => (
  <div className="text-center bg-slate-50 p-4 rounded-lg">
      <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{title}</h4>
      <div className="mt-2">
          <p className="text-lg font-bold text-slate-800">{pta || '---'} <span className="text-sm font-medium text-slate-500">{ptaUnit}</span></p>
          <p className="text-lg font-bold text-slate-800">{loss || '---'} {loss !== '-' && <span className="text-sm font-medium text-slate-500">{lossUnit}</span>}</p>
      </div>
  </div>
);

const PtaCalculator: React.FC<PtaCalculatorProps> = ({ onBack, backLabelKey, isFree = true }) => {
  const { t } = useTranslations();
  const [rightEar, setRightEar] = useState<HearingValues>(initialValues);
  const [leftEar, setLeftEar] = useState<HearingValues>(initialValues);
  const [standard, setStandard] = useState<CalculationStandard>(CalculationStandard.AMA);
  const [copied, setCopied] = useState(false);
  
  const handleDataChange = useCallback((ear: 'right' | 'left', freq: number, value: string) => {
    const setter = ear === 'right' ? setRightEar : setLeftEar;
    const dbValue = value === '' ? null : parseInt(value, 10);
    if (dbValue !== null && (isNaN(dbValue) || dbValue < -10 || dbValue > 120)) return;
    setter(prev => ({ ...prev, [freq]: dbValue }));
  }, []);

  const results = useMemo(() => {
    const mockEar = (values: HearingValues) => ({
      air: values as any,
      airMasked: {} as any,
      bone: {} as any,
      boneMasked: {} as any,
      ucl: {} as any,
      algiacusia: {} as any,
      noResponse: { air: {}, bone: {}, airMasked: {}, boneMasked: {}, ucl: {}, algiacusia: {} } as any
    });
    return calculateAllResults(mockEar(rightEar), mockEar(leftEar), standard);
  }, [rightEar, leftEar, standard]);

  const copyString = t('ptaCalculator.copyTemplate')
    .replace('{{standard}}', standard)
    .replace('{{ptaOd}}', (results.ptaOdVa || '-').toString())
    .replace('{{lossOd}}', (results.pOdVaTotal || '-').toString())
    .replace('{{ptaOi}}', (results.ptaOiVa || '-').toString())
    .replace('{{lossOi}}', (results.pOiVaTotal || '-').toString())
    .replace('{{ptaTotal}}', (results.ptaAoVa || '-').toString())
    .replace('{{lossTotal}}', (results.pAoVaTotal || '-').toString());

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="bg-white text-slate-800 rounded-3xl shadow-xl p-6 sm:p-10 border border-slate-100">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-normal">{t('ptaCalculator.title')}</h2>
          <button onClick={onBack} className="text-[10px] font-black uppercase tracking-widest text-primary hover:text-primary-hover transition-colors flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M10 19l-7-7m0 0l7-7m-7 7h18" /></svg>
            {t(backLabelKey || 'ptaCalculator.backToMenu')}
          </button>
        </div>

        <div className="flex justify-center mb-8">
            <div className="bg-slate-50 p-1.5 rounded-2xl border border-slate-100 flex overflow-x-auto w-full max-w-2xl mx-auto">
                {Object.values(CalculationStandard).map((std) => (
                    <button 
                        key={std} 
                        onClick={() => setStandard(std)} 
                        className={`flex-1 min-w-[70px] px-3 py-2 rounded-xl text-[10px] sm:text-xs font-black uppercase tracking-widest transition-all ${standard === std ? 'bg-white text-primary shadow-sm border border-slate-200' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100'}`}
                    >
                        {std}
                    </button>
                ))}
            </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
          <InputGrid ear="right" values={rightEar} onChange={handleDataChange} t={t} />
          <InputGrid ear="left" values={leftEar} onChange={handleDataChange} t={t} />
        </div>

        <div className="mt-12 border-t border-slate-100 pt-10">
          <h3 className="text-base font-black uppercase tracking-widest text-center text-slate-400 mb-6">{t('ptaCalculator.results')}</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl mx-auto">
              <ResultDisplay title={t('ptaCalculator.rightEar')} pta={results.ptaOdVa} loss={results.pOdVaTotal} ptaUnit={t('ptaCalculator.ptaUnit')} lossUnit={t('ptaCalculator.lossUnit')} />
              <ResultDisplay title={t('ptaCalculator.leftEar')} pta={results.ptaOiVa} loss={results.pOiVaTotal} ptaUnit={t('ptaCalculator.ptaUnit')} lossUnit={t('ptaCalculator.lossUnit')} />
              <ResultDisplay title={t('ptaCalculator.binauralTotal')} pta={results.ptaAoVa} loss={results.pAoVaTotal} ptaUnit={t('ptaCalculator.ptaUnit')} lossUnit={t('ptaCalculator.lossUnit')} />
          </div>

          <div className="mt-12 max-w-4xl mx-auto">
            <div className="relative">
              <textarea 
                readOnly
                value={copyString}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm text-slate-700 min-h-[90px] resize-none focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-mono leading-relaxed"
              />
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(copyString);
                  setCopied(true);
                  setTimeout(() => setCopied(false), 2000);
                }}
                className="absolute right-3 bottom-3 bg-white border border-slate-200 text-slate-500 hover:text-primary hover:border-primary/30 rounded-lg p-2 transition-all shadow-sm flex items-center gap-2 text-xs font-bold"
              >
                {copied ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-500"><polyline points="20 6 9 17 4 12"/></svg>
                    <span className="text-green-600">{t('patientList.copied')}</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="14" height="14" x="8" y="8" rx="2" ry="2"/><path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"/></svg>
                    {t('patientList.copy')}
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PtaCalculator;