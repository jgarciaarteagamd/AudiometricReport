import React, { useState, useEffect } from 'react';
import { Ear, Conduction, FullReportData, AudiogramData, ReportInfo, CalculatedValues, DataError, SpeechAudiometryData, ImpedanceData, CalculationStandard } from '../../types';
import { INITIAL_HEARING_DATA, INITIAL_NO_RESPONSE_DATA, INITIAL_REPORT_INFO, INITIAL_SPEECH_EAR_DATA, INITIAL_IMPEDANCE_EAR_DATA } from '../../constants';
import { calculateAllResults, analyzeDataQuality } from '../../utils/calculations';
import { useTranslations } from '../../i18n/LanguageContext';
import { trackEvent } from '../../utils/analytics';

import PatientHistoryModule from '../ReportModules/PatientHistoryModule';
import StudiesModule from '../ReportModules/StudiesModule';
import DiagnosisModule from '../ReportModules/DiagnosisModule';

const ReportGenerator: React.FC<{ onBack: () => void }> = ({ onBack }) => {
  const { t, language } = useTranslations();
  const [isAccepted, setIsAccepted] = useState(false);
  const [canEnter, setCanEnter] = useState(false);

  const [profData, setProfData] = useState({ name: '', profession: '', license: '' });
  const [calculationStandard, setCalculationStandard] = useState<CalculationStandard>(CalculationStandard.AMA);

  const [audiogramData, setAudiogramData] = useState<AudiogramData>({
    right: { air: { ...INITIAL_HEARING_DATA }, bone: { ...INITIAL_HEARING_DATA }, airMasked: { ...INITIAL_HEARING_DATA }, boneMasked: { ...INITIAL_HEARING_DATA }, ucl: { ...INITIAL_HEARING_DATA }, algiacusia: { ...INITIAL_HEARING_DATA }, noResponse: { air: { ...INITIAL_NO_RESPONSE_DATA }, bone: { ...INITIAL_NO_RESPONSE_DATA }, airMasked: { ...INITIAL_NO_RESPONSE_DATA }, boneMasked: { ...INITIAL_NO_RESPONSE_DATA }, ucl: { ...INITIAL_NO_RESPONSE_DATA }, algiacusia: { ...INITIAL_NO_RESPONSE_DATA } } },
    left: { air: { ...INITIAL_HEARING_DATA }, bone: { ...INITIAL_HEARING_DATA }, airMasked: { ...INITIAL_HEARING_DATA }, boneMasked: { ...INITIAL_HEARING_DATA }, ucl: { ...INITIAL_HEARING_DATA }, algiacusia: { ...INITIAL_HEARING_DATA }, noResponse: { air: { ...INITIAL_NO_RESPONSE_DATA }, bone: { ...INITIAL_NO_RESPONSE_DATA }, airMasked: { ...INITIAL_NO_RESPONSE_DATA }, boneMasked: { ...INITIAL_NO_RESPONSE_DATA }, ucl: { ...INITIAL_NO_RESPONSE_DATA }, algiacusia: { ...INITIAL_NO_RESPONSE_DATA } } },
  });

  const [speechData, setSpeechData] = useState<SpeechAudiometryData>({
      right: { ...INITIAL_SPEECH_EAR_DATA },
      left: { ...INITIAL_SPEECH_EAR_DATA }
  });

  const [impedanceData, setImpedanceData] = useState<ImpedanceData>({
      right: { ...INITIAL_IMPEDANCE_EAR_DATA },
      left: { ...INITIAL_IMPEDANCE_EAR_DATA }
  });

  const [reportInfo, setReportInfo] = useState<ReportInfo>({ ...INITIAL_REPORT_INFO });
  const [calculatedValues, setCalculatedValues] = useState<CalculatedValues>({ ptaOdVa: '', pOdVaTotal: '', ptaOiVa: '', pOiVaTotal: '', ptaAoVa: '', pAoVaTotal: '', standard: CalculationStandard.AMA });
  const [activeModule, setActiveModule] = useState('PatientHistory');
  const [dataErrors, setDataErrors] = useState<DataError[]>([]);

  useEffect(() => {
    const results = calculateAllResults(audiogramData.right, audiogramData.left, calculationStandard);
    setCalculatedValues(results);
    setDataErrors(analyzeDataQuality(audiogramData));
  }, [audiogramData, calculationStandard]);

  useEffect(() => {
    if (reportInfo.fechaNacimiento) {
        const today = new Date();
        const birthDate = new Date(reportInfo.fechaNacimiento);
        let age = today.getFullYear() - birthDate.getFullYear();
        if (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())) age--;
        if (age >= 0) {
            const ageString = `${age} ${t('common.years')}`;
            if (reportInfo.edad !== ageString) setReportInfo(prev => ({ ...prev, edad: ageString }));
        }
    }
  }, [reportInfo.fechaNacimiento, t]);

  const handleDataChange = (e: Ear, c: Conduction, f: number, v: string) => {
    setAudiogramData(prev => ({
        ...prev, 
        [e]: {
            ...prev[e], 
            [c]: {
                ...prev[e][c], 
                [f]: v === '' ? null : parseInt(v, 10)
            }
        }
    }));
  };

  const handleNrChange = (e: Ear, c: Conduction, f: number, isNr: boolean) => {
    setAudiogramData(prev => {
        const earData = prev[e as keyof AudiogramData];
        const nrSection = earData.noResponse[c as keyof typeof earData.noResponse];
        
        return {
            ...prev,
            [e]: {
                ...earData,
                noResponse: {
                    ...earData.noResponse,
                    [c]: {
                        ...nrSection,
                        [f]: isNr
                    }
                }
            }
        };
    });
  };

  const handleGenerateReport = () => {
    const finalReportInfo = {
        ...reportInfo,
        facultativo: profData.name,
        profesion: profData.profession,
        matricula: profData.license,
        footerText: `Edición Comunidad | ${profData.profession} - ${profData.license}`
    };
    const fullData: FullReportData = { reportInfo: finalReportInfo, calculatedValues, audiogram: audiogramData, speechAudiometry: speechData, impedance: impedanceData };
    const reportId = `rep_${Date.now()}`;
    trackEvent('generate_report', { report_id: reportId });
    sessionStorage.setItem(`report_data_${reportId}`, JSON.stringify(fullData));
    const url = `${window.location.origin}${window.location.pathname}?view=free-report&reportId=${reportId}&lang=${language}`;
    window.open(url, '_blank');
  };

  const isFormValid = profData.name.trim() !== '' && profData.profession.trim() !== '' && profData.license.trim() !== '' && isAccepted;

  if (!canEnter) {
    return (
      <div className="flex flex-col gap-6 animate-fadeIn py-8">
        <div className="max-w-3xl mx-auto bg-white p-10 rounded-[2.5rem] shadow-2xl border border-slate-100">
          <div className="flex items-center gap-4 mb-4">
             <div className="bg-primary/10 p-3 rounded-2xl">
                <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
             </div>
             <h2 className="text-2xl font-bold text-slate-800 tracking-normal">
                {t('free.disclaimer.title')}
             </h2>
          </div>
          
          <p className="text-slate-500 mb-8 leading-relaxed font-medium text-sm">{t('free.disclaimer.intro')}</p>
          
          <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 mb-8 space-y-6">
              <div>
                  <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('free.disclaimer.professionalName')}</label>
                  <input type="text" value={profData.name} onChange={e => setProfData({...profData, name: e.target.value})} className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm text-sm" placeholder={t('free.disclaimer.namePlaceholder')} />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('free.disclaimer.profession')}</label>
                      <input type="text" value={profData.profession} onChange={e => setProfData({...profData, profession: e.target.value})} className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm text-sm" placeholder={t('free.disclaimer.professionPlaceholder')} />
                  </div>
                  <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5">{t('free.disclaimer.license')}</label>
                      <input type="text" value={profData.license} onChange={e => setProfData({...profData, license: e.target.value})} className="w-full px-5 py-3.5 bg-white border border-slate-200 rounded-2xl focus:ring-2 focus:ring-primary outline-none transition-all shadow-sm text-sm" placeholder={t('free.disclaimer.licensePlaceholder')} />
                  </div>
              </div>
          </div>

          <div className="bg-slate-50/50 p-8 rounded-3xl border border-slate-100 mb-8">
              <div className="space-y-6">
                  <div className="flex gap-4">
                      <span className="text-primary font-black text-sm shrink-0">01.</span>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{t('free.disclaimer.point1')}</p>
                  </div>
                  <div className="flex gap-4">
                      <span className="text-primary font-black text-sm shrink-0">02.</span>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{t('free.disclaimer.point2')}</p>
                  </div>
                  <div className="flex gap-4">
                      <span className="text-primary font-black text-sm shrink-0">03.</span>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{t('free.disclaimer.point3')}</p>
                  </div>
                  <div className="flex gap-4">
                      <span className="text-primary font-black text-sm shrink-0">04.</span>
                      <p className="text-xs text-slate-600 font-medium leading-relaxed">{t('free.disclaimer.point4')}</p>
                  </div>
              </div>
              
              <div className="mt-8 pt-8 border-t border-slate-100 flex gap-4 items-start">
                  <div className="bg-primary/5 p-2 rounded-lg shrink-0">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>
                  </div>
                  <p className="text-xs font-black italic text-slate-700 leading-relaxed">
                      {t('free.disclaimer.truthStatement')}
                  </p>
              </div>
          </div>

          <label className="flex items-center gap-4 cursor-pointer group mb-10 p-3 hover:bg-slate-50 rounded-2xl transition-all border border-transparent hover:border-slate-100">
            <div className="relative flex items-center justify-center">
              <input 
                type="checkbox" 
                checked={isAccepted} 
                onChange={(e) => setIsAccepted(e.target.checked)} 
                className="peer h-6 w-6 appearance-none bg-white border-2 border-slate-300 rounded-lg checked:bg-primary checked:border-primary transition-all cursor-pointer shadow-sm focus:ring-2 focus:ring-primary/20" 
              />
              <svg 
                className="absolute h-4 w-4 text-white pointer-events-none hidden peer-checked:block" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor" 
                strokeWidth="4"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <span className="text-sm font-normal text-slate-700 leading-tight">{t('free.disclaimer.checkboxAccept')}</span>
          </label>

          <div className="flex gap-4">
              <button onClick={onBack} className="flex-1 py-4 text-slate-400 text-sm font-black uppercase tracking-widest hover:text-slate-600 transition-all">{t('free.disclaimer.cancelButton')}</button>
              <button 
                onClick={() => isFormValid && setCanEnter(true)} 
                disabled={!isFormValid} 
                className={`flex-[2] py-4 rounded-2xl font-black text-sm uppercase tracking-widest text-white shadow-xl transition-all transform active:scale-[0.98] ${isFormValid ? 'bg-primary hover:bg-primary-hover shadow-purple-200' : 'bg-slate-200 cursor-not-allowed text-slate-400 shadow-none'}`}
              >
                  {t('free.disclaimer.button')}
              </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 animate-fadeIn">
      <div className="bg-white rounded-3xl shadow-xl p-4 md:p-8 lg:p-10 border border-slate-100">
        
        {/* Header container: One row on Desktop (lg), Two rows on Tablet (md), Stacked on Mobile */}
        <div className="flex flex-col mb-8 border-b border-slate-50 pb-6 w-full">
            {/* Top Row: Title and Button */}
            <div className="flex justify-between items-center mb-6 w-full">
                <h2 className="text-2xl lg:text-3xl font-bold text-slate-800 tracking-normal shrink-0">{t('free.editor.title')}</h2>
                <button onClick={handleGenerateReport} className="w-auto bg-primary text-white text-[11px] md:text-xs font-black uppercase tracking-widest px-6 xl:px-8 py-3 rounded-xl shadow-xl shadow-purple-200 hover:bg-primary-hover transform transition-all active:scale-95 text-center shrink-0">
                    {t('reportGenerator.generateReport')}
                </button>
            </div>
            
            {/* Bottom Row: Navigation Menu Centered */}
            <div className="flex justify-center w-full">
                <nav className="flex flex-col md:flex-row bg-slate-50 p-1.5 rounded-2xl w-full md:w-fit border border-slate-100 gap-1 md:gap-0">
                    {['PatientHistory', 'HearingStudies', 'Diagnosis'].map((key) => (
                        <button key={key} onClick={() => setActiveModule(key)} className={`w-full md:w-auto px-4 md:px-6 xl:px-8 py-2.5 rounded-xl text-[10px] md:text-xs font-black uppercase tracking-widest transition-all ${activeModule === key ? 'bg-white text-primary shadow-md border border-slate-100' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-100 md:hover:bg-transparent'}`}>
                            {t(`reportGenerator.moduleTabs.${key === 'PatientHistory' ? 'patient' : key === 'HearingStudies' ? 'studies' : 'diagnosis'}`)}
                        </button>
                    ))}
                </nav>
            </div>
        </div>
        
        {activeModule === 'PatientHistory' && <PatientHistoryModule reportInfo={reportInfo} onChange={(f, v) => setReportInfo(p => ({...p, [f]: v}))} />}
        {activeModule === 'HearingStudies' && (
            <StudiesModule 
                audiogramData={audiogramData} 
                speechData={speechData}
                impedanceData={impedanceData}
                onDataChange={handleDataChange} 
                onNrChange={handleNrChange}
                onSpeechDataChange={(ear, field, value, subfield) => {
                    setSpeechData(prev => {
                        const newEarData = { ...prev[ear] };
                        if (subfield) {
                            (newEarData[field] as any) = { ...(newEarData[field] as any), [subfield]: value };
                        } else {
                            (newEarData[field] as any) = value;
                        }
                        return { ...prev, [ear]: newEarData };
                    });
                }}
                onImpedanceTympChange={(ear, field, value) => {
                    setImpedanceData(prev => ({
                        ...prev, [ear]: { ...prev[ear], tymp: { ...prev[ear].tymp, [field]: value } }
                    }));
                }}
                onImpedanceReflexChange={(ear, type, freq, value) => {
                    setImpedanceData(prev => ({
                        ...prev, [ear]: { ...prev[ear], reflex: { ...prev[ear].reflex, [type]: { ...prev[ear].reflex[type], [freq]: value } } }
                    }));
                }}
                onImpedanceReflexAbsentChange={(ear, type, freq, isAbsent) => {
                    setImpedanceData(prev => ({
                        ...prev, [ear]: { ...prev[ear], reflex: { ...prev[ear].reflex, absent: { ...prev[ear].reflex.absent, [type]: { ...prev[ear].reflex.absent[type], [freq]: isAbsent } } } }
                    }));
                }}
                onImpedanceReflexPresentChange={(ear, type, freq, isPresent) => {
                    setImpedanceData(prev => ({
                        ...prev, [ear]: { ...prev[ear], reflex: { ...prev[ear].reflex, present: { ...prev[ear].reflex.present, [type]: { ...prev[ear].reflex.present[type], [freq]: isPresent } } } }
                    }));
                }}
                onImpedanceDecayChange={(ear, freq, value) => {
                    setImpedanceData(prev => ({
                        ...prev, [ear]: { ...prev[ear], reflex: { ...prev[ear].reflex, decay: { ...prev[ear].reflex.decay, [freq]: value } } }
                    }));
                }}
                calculatedValues={calculatedValues} 
                dataErrors={dataErrors}
                calculationStandard={calculationStandard}
                onCalculationStandardChange={setCalculationStandard}
            />
        )}
        {activeModule === 'Diagnosis' && (
            <div className="space-y-6">
                <DiagnosisModule reportInfo={reportInfo} onChange={(f, v) => setReportInfo(p => ({...p, [f]: v}))} handleLocationChange={(v) => setReportInfo(p => ({...p, lugarFirma: v}))} />
            </div>
        )}
      </div>
    </div>
  );
};

export default ReportGenerator;