
import React from 'react';
import type { FullReportData } from '../../types';
import AudiogramChart from '../AudiogramChart';
import SpeechAudiometryChart from '../SpeechAudiometryChart';
import ImpedanceChart from '../ImpedanceChart';
import { Ear } from '../../types';
import { useTranslations } from '../../i18n/LanguageContext';
import BrandLogo from '../Branding/BrandLogo';
import { trackEvent } from '../../utils/analytics';

const Report: React.FC<{ data: FullReportData }> = ({ data }) => {
  const { t, language } = useTranslations();
  const { reportInfo, calculatedValues, audiogram } = data;

  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const localeMap: { [key: string]: string } = { 'es': 'es-ES', 'en': 'en-US', 'de': 'de-DE', 'fr': 'fr-FR', 'it': 'it-IT', 'pt': 'pt-PT' };
    const locale = localeMap[language] || 'en-US';
    const date = new Date(dateString);
    let formatted = date.toLocaleDateString(locale, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    return formatted.charAt(0).toUpperCase() + formatted.slice(1);
  };

  const city = reportInfo.lugarFirma || '';
  const dateStr = formatDate(reportInfo.fechaFirma);
  const fullSignatureLine = city ? `${city}, ${dateStr}` : dateStr;

  const hasAnySpeechData = () => {
      if (!data.speechAudiometry) return false;
      const { right, left } = data.speechAudiometry;
      return !!(right.srt || right.sdt || right.wrs.db || left.srt || left.sdt || left.wrs.db);
  };

  const hasEarImpedanceData = (ear: Ear) => {
      if (!data.impedance) return false;
      const earData = ear === Ear.Right ? data.impedance.right : data.impedance.left;
      const hasTymp = !!(earData.tymp.pom || earData.tymp.cac || earData.tymp.veq);
      const hasReflex = Object.values(earData.reflex.ipsi).some(v => !!v) || 
                        Object.values(earData.reflex.contra).some(v => !!v) || 
                        Object.values(earData.reflex.absent.ipsi).some(v => v) || 
                        Object.values(earData.reflex.absent.contra).some(v => v) ||
                        Object.values(earData.reflex.present?.ipsi || {}).some(v => v) ||
                        Object.values(earData.reflex.present?.contra || {}).some(v => v);
      return hasTymp || hasReflex;
  };

  const hasEarReflexData = (ear: Ear) => {
      if (!data.impedance) return false;
      const earData = ear === Ear.Right ? data.impedance.right : data.impedance.left;
      return Object.values(earData.reflex.ipsi).some(v => !!v) || 
             Object.values(earData.reflex.contra).some(v => !!v) || 
             Object.values(earData.reflex.absent.ipsi).some(v => v) || 
             Object.values(earData.reflex.absent.contra).some(v => v) ||
             Object.values(earData.reflex.present?.ipsi || {}).some(v => v) ||
             Object.values(earData.reflex.present?.contra || {}).some(v => v);
  };

  const hasEarAudiogramData = (ear: Ear) => {
      const earData = ear === Ear.Right ? data.audiogram.right : data.audiogram.left;
      if (!earData) return false;
      return Object.values(earData.air).some(v => v !== null && v !== undefined) ||
             Object.values(earData.bone).some(v => v !== null && v !== undefined) ||
             Object.values(earData.airMasked).some(v => v !== null && v !== undefined) ||
             Object.values(earData.boneMasked).some(v => v !== null && v !== undefined) ||
             Object.values(earData.ucl).some(v => v !== null && v !== undefined) ||
             Object.values(earData.algiacusia).some(v => v !== null && v !== undefined);
  };

  const hasAnyImpedanceData = () => hasEarImpedanceData(Ear.Right) || hasEarImpedanceData(Ear.Left);
  const hasAnyReflexData = () => hasEarReflexData(Ear.Right) || hasEarReflexData(Ear.Left);
  const hasAnyAudiogramData = () => hasEarAudiogramData(Ear.Right) || hasEarAudiogramData(Ear.Left);

  const getReflexValue = (earData: any, type: 'ipsi' | 'contra', freq: number) => {
      const isAbsent = earData.reflex.absent[type][freq];
      if (isAbsent) return <span className="font-bold text-orange-600">A</span>;
      const val = earData.reflex[type][freq];
      if (val) return <span>{val} dB</span>;
      const isPresent = earData.reflex.present?.[type]?.[freq];
      if (isPresent) return <span className="font-bold text-green-600">P</span>;
      return <span>-</span>;
  };

  const getDecayValue = (earData: any, freq: number) => {
      const val = earData.reflex.decay[freq];
      return val ? `${val} s` : '-';
  };

  const renderReflexTable = (ear: Ear) => {
      const earData = ear === Ear.Right ? data.impedance!.right : data.impedance!.left;
      const freqs = [500, 1000, 2000, 4000];
      return (
          <div className="mt-2 text-[9px] border border-slate-100 rounded">
              <table className="w-full text-center border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-100 uppercase tracking-tighter text-slate-500">
                      <tr>
                          <th className="py-0.5 px-1 border-r border-slate-100 text-left font-normal border-b">Reflejos</th>
                          {freqs.map(f => <th key={f} className="py-0.5 px-1 font-normal border-b">{f} Hz</th>)}
                      </tr>
                  </thead>
                  <tbody>
                      <tr className="border-b border-slate-100">
                          <td className="py-0.5 px-1 border-r border-slate-100 text-left font-bold text-slate-400">Ipsilateral</td>
                          {freqs.map(f => <td key={`ipsi-${f}`} className="py-0.5 px-1">{getReflexValue(earData, 'ipsi', f)}</td>)}
                      </tr>
                      <tr className="border-b border-slate-100">
                          <td className="py-0.5 px-1 border-r border-slate-100 text-left font-bold text-slate-400">Contralateral</td>
                          {freqs.map(f => <td key={`contra-${f}`} className="py-0.5 px-1">{getReflexValue(earData, 'contra', f)}</td>)}
                      </tr>
                      <tr>
                          <td className="py-0.5 px-1 border-r border-slate-100 text-left font-bold text-slate-400">Decay</td>
                          {freqs.map(f => <td key={`decay-${f}`} className="py-0.5 px-1">{(f === 500 || f === 1000) ? getDecayValue(earData, f) : '-'}</td>)}
                      </tr>
                  </tbody>
              </table>
          </div>
      );
  };

  return (
    <div className="bg-white font-sans text-[11px] text-slate-900 max-w-[210mm] min-h-[297mm] mx-auto shadow-2xl print:shadow-none print:bg-transparent relative flex flex-col">
        <style>{`
            @media print {
                @page { margin: 10mm; }
                body { background: white; -webkit-print-color-adjust: exact; }
                .no-print { display: none !important; }
            }
        `}</style>
        <div className="no-print fixed top-4 right-4 z-50">
            <button onClick={() => { trackEvent('print_report', { report_id: reportInfo.id }); window.print(); }} className="bg-primary text-white font-bold px-6 py-2 rounded-lg shadow-lg">Imprimir / PDF</button>
        </div>

        <table className="w-full">
            <thead className="print:table-header-group">
                <tr><td><div className="h-4 sm:h-8 print:h-0"></div></td></tr>
            </thead>
            <tbody>
                <tr><td className="px-6 sm:px-10 print:px-0 align-top">
                    
                    <header className="flex justify-between items-center border-b-2 border-slate-100 pb-2 mb-3">
                        <div className="flex items-center"><BrandLogo isPremium={false} size="sm" /></div>
                        <div className="text-right"><h1 className="text-sm font-black text-slate-800 uppercase tracking-widest">{t('reportPage.reportTitle')}</h1></div>
                    </header>

                    <section className="bg-white p-3 border border-slate-200 rounded-2xl mb-4 print:break-inside-avoid">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between items-end border-b border-slate-200/50 pb-1.5">
                    <div className="flex gap-2 items-baseline">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight">{t('reportGenerator.patient.id')}:</span>
                        <span className="font-bold text-sm tracking-tight">{reportInfo.id}</span>
                    </div>
                    <div className="flex gap-2 items-baseline">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight">{t('reportGenerator.patient.age')}:</span>
                        <span className="font-bold text-sm tracking-tight">{reportInfo.edad}</span>
                    </div>
                </div>
                <div className="flex gap-12 items-baseline pb-0.5">
                    <div className="flex gap-2 items-baseline">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight whitespace-nowrap">{t('reportPage.lastName')}:</span>
                        <span className="font-bold text-sm tracking-tight">{reportInfo.apellidos}</span>
                    </div>
                    <div className="flex gap-2 items-baseline">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight whitespace-nowrap">{t('reportPage.firstName')}:</span>
                        <span className="font-bold text-sm tracking-tight">{reportInfo.nombre}</span>
                    </div>
                </div>
                <div className="mt-0.5 pt-1.5 border-t border-slate-200/50">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight block mb-0.5">{t('reportGenerator.clinicalHistory.reason')}</span>
                    <p className="text-slate-700 leading-tight whitespace-pre-wrap line-clamp-2">{reportInfo.motivo}</p>
                </div>
                {reportInfo.antecedentes?.trim() && (
                    <div className="mt-0.5 pt-1.5 border-t border-slate-200/50">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight block mb-0.5">{t('reportGenerator.clinicalHistory.antecedentes')}</span>
                        <p className="text-slate-700 leading-tight whitespace-pre-wrap line-clamp-2">{reportInfo.antecedentes}</p>
                    </div>
                )}
                {reportInfo.exploracionFisica?.trim() && (
                    <div className="mt-0.5 pt-1.5 border-t border-slate-200/50">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight block mb-0.5">{t('reportGenerator.clinicalHistory.physicalExam')}</span>
                        <p className="text-slate-700 leading-tight whitespace-pre-wrap line-clamp-2">{reportInfo.exploracionFisica}</p>
                    </div>
                )}
            </div>
        </section>
        <div className="flex flex-col gap-4 mb-4">
            {hasAnyImpedanceData() && (
                <div className="border border-slate-200 rounded-2xl bg-white p-3 print:break-inside-avoid">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-center items-center">
                                <ImpedanceChart ear={Ear.Right} data={data.impedance!.right.tymp} isPrintVersion={true} />
                            </div>
                            {hasAnyReflexData() && renderReflexTable(Ear.Right)}
                        </div>
                        <div className="flex flex-col gap-2">
                            <div className="flex justify-center items-center">
                                <ImpedanceChart ear={Ear.Left} data={data.impedance!.left.tymp} isPrintVersion={true} />
                            </div>
                            {hasAnyReflexData() && renderReflexTable(Ear.Left)}
                        </div>
                    </div>
                </div>
            )}

            {hasAnyAudiogramData() && (
                <div className="border border-slate-200 rounded-2xl bg-white p-3 flex flex-col gap-4 print:break-inside-avoid">
                    <div className="grid grid-cols-2 gap-6">
                        <div className="flex justify-center items-center">
                            <AudiogramChart ear={Ear.Right} data={audiogram.right} isPrintVersion={true} />
                        </div>
                        <div className="flex justify-center items-center">
                            <AudiogramChart ear={Ear.Left} data={audiogram.left} isPrintVersion={true} />
                        </div>
                    </div>
                    
                    <div className="flex flex-col gap-1">
                        <div className="text-[9px] border border-slate-100 rounded">
                            <table className="w-full text-center border-collapse">
                                <thead className="bg-slate-50 border-b border-slate-100 uppercase tracking-tighter text-slate-500">
                                    <tr>
                                        <th className="py-0.5 px-2 border-r border-slate-100 text-left font-normal border-b">{t('classificationTable.parameter')}</th>
                                        <th className="py-0.5 px-2 text-red-600 font-bold border-b">{t('classificationTable.rightEar')}</th>
                                        <th className="py-0.5 px-2 text-blue-600 font-bold border-b">{t('classificationTable.leftEar')}</th>
                                        <th className="py-0.5 px-2 font-normal border-b">{t('classificationTable.binaural')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b border-slate-100">
                                        <td className="py-0.5 px-2 border-r border-slate-100 text-left font-bold text-slate-500">{t('classificationTable.pta')}</td>
                                        <td className="py-0.5 px-2 font-bold text-[10px] text-slate-800">{calculatedValues.ptaOdVa} dB</td>
                                        <td className="py-0.5 px-2 font-bold text-[10px] text-slate-800">{calculatedValues.ptaOiVa} dB</td>
                                        <td className="py-0.5 px-2 font-bold text-[10px] text-slate-800">{calculatedValues.ptaAoVa} dB</td>
                                    </tr>
                                    <tr>
                                        <td className="py-0.5 px-2 border-r border-slate-100 text-left font-bold text-slate-500">{t('classificationTable.loss')}</td>
                                        <td className="py-0.5 px-2 font-bold text-[10px] text-slate-800">{calculatedValues.pOdVaTotal || '-'} {calculatedValues.pOdVaTotal && calculatedValues.pOdVaTotal !== '-' && (calculatedValues.standard === 'BIAP' ? 'dB' : '%')}</td>
                                        <td className="py-0.5 px-2 font-bold text-[10px] text-slate-800">{calculatedValues.pOiVaTotal || '-'} {calculatedValues.pOiVaTotal && calculatedValues.pOiVaTotal !== '-' && (calculatedValues.standard === 'BIAP' ? 'dB' : '%')}</td>
                                        <td className="py-0.5 px-2 font-bold text-[10px] text-slate-800">{calculatedValues.pAoVaTotal || '-'} {calculatedValues.pAoVaTotal && calculatedValues.pAoVaTotal !== '-' && (calculatedValues.standard === 'BIAP' ? 'dB' : '%')}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="text-[9px] text-slate-400 italic text-center font-medium mt-1">
                            {t('classificationTable.methodologyNotice').replace('{{standard}}', calculatedValues.standard)}
                        </div>
                    </div>
                </div>
            )}

            {hasAnySpeechData() && (
                <div className="border border-slate-200 rounded-2xl bg-white p-3 flex justify-center print:break-inside-avoid">
                    <SpeechAudiometryChart data={data.speechAudiometry!} isPrintVersion={true} />
                </div>
            )}
        </div>

        <section className="bg-white p-3 border border-slate-200 rounded-2xl mb-4 print:break-inside-avoid">
            <div className="flex flex-col gap-2">
                <div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight block mb-0.5">{t('reportPage.diagnosticImpression')}</span>
                    <p className="text-slate-700 leading-tight whitespace-pre-wrap line-clamp-2">{reportInfo.juicioClinico}</p>
                </div>
                {reportInfo.plan?.trim() && (
                    <div className="mt-0.5 pt-1.5 border-t border-slate-200/50">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tight block mb-0.5">{t('reportGenerator.diagnosis.plan')}</span>
                        <p className="text-slate-700 leading-tight whitespace-pre-wrap line-clamp-2">{reportInfo.plan}</p>
                    </div>
                )}
            </div>
        </section>

        <section className="flex justify-between items-start mt-4 mb-4 print:break-inside-avoid">
            <div className="text-[10px] text-slate-600 font-bold tracking-tight mt-2"><p>{fullSignatureLine}</p></div>
            <div className="w-56 text-center">
                <div className="flex flex-col items-center">
                    <div className="w-full h-[50px] flex items-end justify-center mb-2">
                        {/* Placeholder for real signature */}
                    </div>
                    <div className="w-full h-px bg-slate-200 mb-1"></div>
                    <p className="text-[8px] text-slate-300 font-black uppercase tracking-[0.2em] mb-2">{t('reportPage.signatureLabel')}</p>
                    <p className="font-bold text-sm text-slate-800">{reportInfo.facultativo}</p>
                    {reportInfo.profesion && <p className="text-[11px] text-slate-600 font-medium leading-tight">{reportInfo.profesion}</p>}
                    {reportInfo.matricula && <p className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter mt-1">{reportInfo.matricula}</p>}
                </div>
            </div>
        </section>

                </td></tr>
            </tbody>
            <tfoot className="print:table-footer-group">
                <tr><td>
                    {/* Add spacer to ensure content doesn't overlap the fixed footer when printing */}
                    <div className="h-10 print:h-[40px]"></div>
                </td></tr>
            </tfoot>
        </table>

        {/* Legal footer fixed for print to repeat on each page at the very bottom */}
        <div className="mt-auto px-6 sm:px-10 print:px-10 print:fixed print:bottom-0 print:left-0 print:w-full print:bg-white grid grid-cols-3 items-center bg-white z-50 border-t border-slate-100 uppercase tracking-widest text-slate-400 font-bold mb-2 print:mb-0">
            <div className="flex flex-col items-start pt-2 pb-2">
                {/* <span className="text-[7px] mb-1">{t('footer.supportedBy')}</span>
                <div className="h-6 w-16 bg-slate-100 rounded border border-slate-200 flex items-center justify-center text-[6px] transition-all duration-300 hover:shadow-md cursor-pointer">[LOGO]</div> */}
            </div>
            <div className="pt-2 pb-2 text-center">
                <p className="text-[7px] leading-tight italic max-w-2xl mx-auto normal-case tracking-normal">{t('free.report.legalFooter')}</p>
            </div>
            <div className="pt-2 pb-2 text-right text-[9px] flex justify-end">
                {/* Custom page numbers are removed due to browser print limitations */}
            </div>
        </div>
    </div>
  );
};

export default Report;
