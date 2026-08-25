
import React from 'react';
import { COLORS } from '../constants.ts';
import { useTranslations } from '../i18n/LanguageContext.tsx';

const LegendIcon: React.FC<{ type: string; color: string; ear: 'right' | 'left' }> = ({ type, color, ear }) => {
  const size = 14;
  const strokeWidth = 2.5;
  const half = size / 2;
  const center = 12; // Center of 24x24 viewbox

  const getPath = () => {
    switch (type) {
      case 'circle': return <circle cx={center} cy={center} r={half} fill="none" stroke={color} strokeWidth={strokeWidth} />;
      case 'cross': return <path d={`M${center - half},${center - half} L${center + half},${center + half} M${center + half},${center - half} L${center - half},${center + half}`} stroke={color} strokeWidth={strokeWidth} />;
      case 'lt': return <path d={`M${center + half},${center - half} L${center - half},${center} L${center + half},${center + half}`} fill="none" stroke={color} strokeWidth={strokeWidth} />;
      case 'gt': return <path d={`M${center - half},${center - half} L${center + half},${center} L${center - half},${center + half}`} fill="none" stroke={color} strokeWidth={strokeWidth} />;
      case 'triangle': return <path d={`M${center},${center - half} L${center + half},${center + half} L${center - half},${center + half} Z`} fill="none" stroke={color} strokeWidth={strokeWidth} />;
      case 'square': return <rect x={center - half} y={center - half} width={size} height={size} fill="none" stroke={color} strokeWidth={strokeWidth} />;
      case 'bracket-left': return <path d={`M${center + half},${center - half} L${center - half},${center - half} L${center - half},${center + half} L${center + half},${center + half}`} fill="none" stroke={color} strokeWidth={strokeWidth} />;
      case 'bracket-right': return <path d={`M${center - half},${center - half} L${center + half},${center - half} L${center + half},${center + half} L${center - half},${center + half}`} fill="none" stroke={color} strokeWidth={strokeWidth} />;
      case 'ucl': {
        const d = ear === 'right' ? `M ${center - half},${center + half} L ${center + half},${center + half} L ${center + half},${center - half} Z` : `M ${center + half},${center + half} L ${center - half},${center + half} L ${center - half},${center - half} Z`;
        return <path d={d} fill="none" stroke={color} strokeWidth={strokeWidth} />;
      }
      case 'alg': {
        const d = ear === 'right' ? `M ${center - half},${center + half} L ${center + half},${center + half} L ${center + half},${center - half} Z` : `M ${center + half},${center + half} L ${center - half},${center + half} L ${center - half},${center - half} Z`;
        return <path d={d} fill={color} stroke={color} strokeWidth={strokeWidth} />;
      }
      default: return null;
    }
  };

  return (
    <svg width="24" height="24" viewBox="0 0 24 24">
      {getPath()}
    </svg>
  );
};

const LegendItem: React.FC<{ symbol: React.ReactNode; label: string; }> = ({ symbol, label }) => (
  <div className="flex items-center space-x-2">
    <div className="w-8 h-8 flex items-center justify-center">
      {symbol}
    </div>
    <span className="text-xs text-slate-600 leading-tight flex-1">{label}</span>
  </div>
);

const Legend: React.FC<{ isMinimal?: boolean }> = ({ isMinimal = false }) => {
  const { t } = useTranslations();
  
  return (
    <div className="p-3 bg-slate-100/50 rounded-lg border border-slate-200">
      <h4 className="font-bold text-center mb-2 text-slate-700 text-sm italic uppercase tracking-wider">{t('legend.title')}</h4>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <LegendItem symbol={<LegendIcon type="circle" color={COLORS.right} ear="right" />} label={t('legend.rightAir')} />
        <LegendItem symbol={<LegendIcon type="cross" color={COLORS.left} ear="left" />} label={t('legend.leftAir')} />
        <LegendItem symbol={<LegendIcon type="lt" color={COLORS.right} ear="right" />} label={t('legend.rightBone')} />
        <LegendItem symbol={<LegendIcon type="gt" color={COLORS.left} ear="left" />} label={t('legend.leftBone')} />
        
        {!isMinimal && (
            <>
                <LegendItem symbol={<LegendIcon type="triangle" color={COLORS.right} ear="right" />} label={t('legend.rightAirMasked')} />
                <LegendItem symbol={<LegendIcon type="square" color={COLORS.left} ear="left" />} label={t('legend.leftAirMasked')} />
                <LegendItem symbol={<LegendIcon type="bracket-left" color={COLORS.right} ear="right" />} label={t('legend.rightBoneMasked') || 'V. Ósea Enmascarada (OD)'} />
                <LegendItem symbol={<LegendIcon type="bracket-right" color={COLORS.left} ear="left" />} label={t('legend.leftBoneMasked') || 'V. Ósea Enmascarada (OI)'} />
                
                <LegendItem symbol={<LegendIcon type="ucl" color={COLORS.right} ear="right" />} label={t('legend.uclRight') || 'Umbrales de Disconfort Derecho'} />
                <LegendItem symbol={<LegendIcon type="ucl" color={COLORS.left} ear="left" />} label={t('legend.uclLeft') || 'Umbrales de Disconfort Izquierdo'} />
                <LegendItem symbol={<LegendIcon type="alg" color={COLORS.right} ear="right" />} label={t('legend.algiacusiaRight') || 'Umbrales de Algiacusia Derecha'} />
                <LegendItem symbol={<LegendIcon type="alg" color={COLORS.left} ear="left" />} label={t('legend.algiacusiaLeft') || 'Umbrales de Algiacusia Izquierda'} />
            </>
        )}
      </div>
    </div>
  );
};

export default Legend;
