
import React from 'react';
import { CalculatedValues, CalculationStandard } from '../types.ts';
import { useTranslations } from '../i18n/LanguageContext.tsx';

interface CalculatedValuesPanelProps {
  data: CalculatedValues;
  hideGrade?: boolean;
}

const CalculatedValuesPanel: React.FC<CalculatedValuesPanelProps> = ({ data, hideGrade = false }) => {
  const { t } = useTranslations();

  const parsePta = (val: string) => val ? parseFloat(val) : null;
  
  const ptaR = parsePta(data.ptaOdVa);
  const ptaL = parsePta(data.ptaOiVa);
  const ptaBin = parsePta(data.ptaAoVa);

  const lossLabel = data.standard === CalculationStandard.AAOO 
    ? t('classificationTable.lossAaoo')
    : data.standard === CalculationStandard.AMA
      ? t('classificationTable.lossAma')
      : t('classificationTable.lossAaoHns');

  const unit = "%";

  return (
    <div className="bg-white rounded-lg border border-slate-200 overflow-hidden mb-6 shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-left">
            <thead className="text-xs text-slate-500 uppercase bg-slate-50 border-b border-slate-100">
                <tr>
                    <th className="px-4 py-3 font-bold w-1/4">{t('classificationTable.parameter')}</th>
                    <th className="px-4 py-3 font-bold text-red-600 w-1/4">{t('classificationTable.rightEar')}</th>
                    <th className="px-4 py-3 font-bold text-blue-600 w-1/4">{t('classificationTable.leftEar')}</th>
                    <th className="px-4 py-3 font-bold text-slate-700 w-1/4">{t('classificationTable.binaural')}</th>
                </tr>
            </thead>
            <tbody>
                <tr className="bg-white border-b border-slate-100 hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{t('classificationTable.pta')}</td>
                    <td className="px-4 py-3 font-bold text-slate-700">{data.ptaOdVa || '-'} <span className="text-xs font-normal text-slate-400">dB</span></td>
                    <td className="px-4 py-3 font-bold text-slate-700">{data.ptaOiVa || '-'} <span className="text-xs font-normal text-slate-400">dB</span></td>
                    <td className="px-4 py-3 font-bold text-slate-700">{data.ptaAoVa || '-'} <span className="text-xs font-normal text-slate-400">dB</span></td>
                </tr>
                
                {data.hasBoneData && (
                    <tr className="bg-white border-b border-slate-100 hover:bg-slate-50">
                        <td className="px-4 py-3 font-medium text-slate-900">{t('classificationTable.ptaBone')}</td>
                        <td className="px-4 py-3 font-bold text-slate-700">{data.ptaOdBone || '-'} <span className="text-xs font-normal text-slate-400">dB</span></td>
                        <td className="px-4 py-3 font-bold text-slate-700">{data.ptaOiBone || '-'} <span className="text-xs font-normal text-slate-400">dB</span></td>
                        <td className="px-4 py-3 font-bold text-slate-700">-</td>
                    </tr>
                )}

                <tr className="bg-white hover:bg-slate-50">
                    <td className="px-4 py-3 font-medium text-slate-900">{lossLabel}</td>
                    <td className="px-4 py-3 font-bold text-slate-700">{data.pOdVaTotal || '-'} {data.pOdVaTotal && data.pOdVaTotal !== '-' && <span className="text-xs font-normal text-slate-400">{unit}</span>}</td>
                    <td className="px-4 py-3 font-bold text-slate-700">{data.pOiVaTotal || '-'} {data.pOiVaTotal && data.pOiVaTotal !== '-' && <span className="text-xs font-normal text-slate-400">{unit}</span>}</td>
                    <td className="px-4 py-3 font-bold text-slate-700">{data.pAoVaTotal || '-'} {data.pAoVaTotal && data.pAoVaTotal !== '-' && <span className="text-xs font-normal text-slate-400">{unit}</span>}</td>
                </tr>
            </tbody>
        </table>
      </div>
      <div className="bg-slate-50/80 px-4 py-2 text-center border-t border-slate-100">
          <span className="text-xs text-slate-500 italic">
              {t('classificationTable.methodologyNotice').replace('{{standard}}', data.standard)}
          </span>
      </div>
    </div>
  );
};

export default CalculatedValuesPanel;
