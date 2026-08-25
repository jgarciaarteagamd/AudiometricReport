
import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, Scatter, ReferenceArea, ReferenceLine, Area, Customized } from 'recharts';
import { Ear, AudiogramEarData } from '../types';
import { AIR_FREQUENCIES, COLORS, MAX_OUTPUT_LEVELS, BONE_FREQUENCIES } from '../constants';
import { useTranslations } from '../i18n/LanguageContext';

import { useViewportSize } from '../utils/useViewportSize';

interface AudiogramChartProps {
  ear: Ear;
  data: AudiogramEarData;
  isPrintVersion?: boolean;
  isFreeVersion?: boolean;
}

const getFreqPosition = (freq: number) => {
    switch (freq) {
        case 125: return 1;
        case 250: return 2;
        case 500: return 3;
        case 750: return 3.5;
        case 1000: return 4;
        case 1500: return 4.5;
        case 2000: return 5;
        case 3000: return 5.5; 
        case 4000: return 6;
        case 6000: return 6.5; 
        case 8000: return 7;
        default: return freq;
    }
};

const CHART_TICKS = [1, 2, 3, 3.5, 4, 4.5, 5, 5.5, 6, 6.5, 7];
const FREE_TICKS = [1, 2, 3, 4, 5, 6, 7]; 

const formatDataForChart = (data: AudiogramEarData) => {
  const mainData = AIR_FREQUENCIES.map(freq => {
    const isNr_air = data.noResponse?.air?.[freq] || false;
    const isNr_bone = data.noResponse?.bone?.[freq] || false;
    const isNr_airMasked = data.noResponse?.airMasked?.[freq] || false;
    const isNr_boneMasked = data.noResponse?.boneMasked?.[freq] || false;
    const isNr_ucl = data.noResponse?.ucl?.[freq] || false;
    const isNr_algiacusia = data.noResponse?.algiacusia?.[freq] || false;

    return {
        freq: freq,
        freqAxis: getFreqPosition(freq),
        air: data.airMasked[freq] !== null ? null : data.air[freq],
        bone: data.boneMasked[freq] !== null ? null : data.bone[freq],
        airMasked: data.airMasked[freq],
        boneMasked: data.boneMasked[freq],
        ucl: data.ucl[freq],
        algiacusia: data.algiacusia[freq],
        isNr_air, isNr_bone, isNr_airMasked, isNr_boneMasked, isNr_ucl, isNr_algiacusia,
        limitRange: [MAX_OUTPUT_LEVELS.air[freq] || 120, 120],
        limitRangeBone: [MAX_OUTPUT_LEVELS.bone[freq] ?? 120, 120],
        dummy1: -10, dummy2: 22, dummy3: 55, dummy4: 87, dummy5: 120
    };
  });
  
  const airLineData = AIR_FREQUENCIES
    .filter(f => {
        const val = data.airMasked[f] ?? data.air[f];
        const isNr = data.noResponse?.airMasked?.[f] || data.noResponse?.air?.[f];
        return val !== null || isNr;
    })
    .map(f => {
        const isNr = data.noResponse?.airMasked?.[f] || data.noResponse?.air?.[f];
        return {
            freqAxis: getFreqPosition(f),
            val: isNr ? null : (data.airMasked[f] ?? data.air[f])
        };
    });

  const boneLineData = BONE_FREQUENCIES
    .filter(f => {
        const val = data.boneMasked[f] ?? data.bone[f];
        const isNr = data.noResponse?.boneMasked?.[f] || data.noResponse?.bone?.[f];
        return val !== null || isNr;
    })
    .map(f => {
        const isNr = data.noResponse?.boneMasked?.[f] || data.noResponse?.bone?.[f];
        return {
            freqAxis: getFreqPosition(f),
            val: isNr ? null : (data.boneMasked[f] ?? data.bone[f])
        };
    });

  const startPoint = { freqAxis: 0.8, limitRange: [MAX_OUTPUT_LEVELS.air[125] || 120, 120], limitRangeBone: [45, 120], domain_fixer: -10 };
  const endPoint = { freqAxis: 7.2, limitRange: [MAX_OUTPUT_LEVELS.air[8000] || 120, 120], limitRangeBone: [MAX_OUTPUT_LEVELS.bone[8000] ?? 50, 120], domain_fixer: 120 };
  
  return {
      chartData: [startPoint, ...mainData, endPoint],
      airLineData,
      boneLineData
  };
};

interface CustomSymbolProps {
  cx?: number; cy?: number; value?: number | null;
  type: 'circle' | 'cross' | 'lt' | 'gt' | 'triangle' | 'square' | 'bracket-left' | 'bracket-right' | 'ucl-triangle' | 'algiacusia-triangle';
  color: string; ear: Ear; isNr: boolean;
}

const CustomSymbol: React.FC<CustomSymbolProps> = ({ cx, cy, value, type, color, ear, isNr }) => {
  if (cx === undefined || cy === undefined || isNaN(cx) || isNaN(cy) || value === null || value === undefined) return null;
  const size = 8, strokeWidth = 2, haloWidth = 6;

  // Decide if this symbol should have a white background fill
  const hasWhiteBg = (type === 'circle' && ear === Ear.Right) ||
                    (type === 'triangle') ||
                    (type === 'square') ||
                    (type === 'ucl-triangle');

  const getShape = (sWidth: number, sColor: string, sFill: string) => {
    const half = size / 2;
    switch (type) {
      case 'circle': 
        return <circle cx={cx} cy={cy} r={half} fill={sFill} stroke={sColor} strokeWidth={sWidth} />;
      case 'cross': 
        return <path d={`M${cx - half},${cy - half} L${cx + half},${cy + half} M${cx + half},${cy - half} L${cx - half},${cy + half}`} stroke={sColor} strokeWidth={sWidth} fill="none" />;
      case 'lt': 
        return <path d={`M${cx + half},${cy - half} L${cx - half},${cy} L${cx + half},${cy + half}`} stroke={sColor} strokeWidth={sWidth} fill="none" />;
      case 'gt': 
        return <path d={`M${cx - half},${cy - half} L${cx + half},${cy} L${cx - half},${cy + half}`} stroke={sColor} strokeWidth={sWidth} fill="none" />;
      case 'triangle': 
        return <path d={`M${cx},${cy - half} L${cx + half},${cy + half} L${cx - half},${cy + half} Z`} stroke={sColor} strokeWidth={sWidth} fill={sFill} />;
      case 'square': 
        return <rect x={cx - half} y={cy - half} width={size} height={size} stroke={sColor} strokeWidth={sWidth} fill={sFill} />;
      case 'bracket-left': 
        return <path d={`M${cx + half},${cy - half} L${cx - half},${cy - half} L${cx - half},${cy + half} L${cx + half},${cy + half}`} stroke={sColor} strokeWidth={sWidth} fill="none" />;
      case 'bracket-right': 
        return <path d={`M${cx - half},${cy - half} L${cx + half},${cy - half} L${cx + half},${cy + half} L${cx - half},${cy + half}`} stroke={sColor} strokeWidth={sWidth} fill="none" />;
      case 'ucl-triangle': {
          const d = ear === Ear.Right ? `M ${cx - half},${cy + half} L ${cx + half},${cy + half} L ${cx + half},${cy - half} Z` : `M ${cx + half},${cy + half} L ${cx - half},${cy + half} L ${cx - half},${cy - half} Z`;
          return <path d={d} stroke={sColor} strokeWidth={sWidth} fill={sFill} />;
      }
      case 'algiacusia-triangle': {
          const d = ear === Ear.Right ? `M ${cx - half},${cy + half} L ${cx + half},${cy + half} L ${cx + half},${cy - half} Z` : `M ${cx + half},${cy + half} L ${cx - half},${cy + half} L ${cx - half},${cy - half} Z`;
          const finalFill = (sColor === 'white') ? 'white' : color;
          return <path d={d} stroke={sColor} strokeWidth={sWidth} fill={finalFill} />;
      }
      default: return null;
    }
  };

  let arrowElement = null;
  if (isNr) {
      const arrowLen = 14;
      const headSize = 5;
      const startOffset = 11;
      if (ear === Ear.Right) {
          const angle = Math.PI / 4; 
          const startX = cx + startOffset * Math.cos(angle);
          const startY = cy + startOffset * Math.sin(angle);
          const endX = startX + arrowLen * Math.cos(angle);
          const endY = startY + arrowLen * Math.sin(angle);
          arrowElement = (
            <g>
                <line x1={startX} y1={startY} x2={endX} y2={endY} stroke="white" strokeWidth={strokeWidth + 2} />
                <line x1={startX} y1={startY} x2={endX} y2={endY} stroke={color} strokeWidth={strokeWidth} />
                <path d={`M${endX},${endY} L${endX - headSize},${endY} M${endX},${endY} L${endX},${endY - headSize}`} stroke={color} strokeWidth={strokeWidth} fill="none" />
            </g>
          );
      } else {
          const angle = 3 * Math.PI / 4;
          const startX = cx + startOffset * Math.cos(angle);
          const startY = cy + startOffset * Math.sin(angle);
          const endX = startX + arrowLen * Math.cos(angle);
          const endY = startY + arrowLen * Math.sin(angle);
          arrowElement = (
            <g>
                <line x1={startX} y1={startY} x2={endX} y2={endY} stroke="white" strokeWidth={strokeWidth + 2} />
                <line x1={startX} y1={startY} x2={endX} y2={endY} stroke={color} strokeWidth={strokeWidth} />
                <path d={`M${endX},${endY} L${endX + headSize},${endY} M${endX},${endY} L${endX},${endY - headSize}`} stroke={color} strokeWidth={strokeWidth} fill="none" />
            </g>
          );
      }
  }

  return (
    <g style={{ pointerEvents: 'none' }}>
      {getShape(haloWidth, 'white', hasWhiteBg ? 'white' : 'none')}
      {getShape(strokeWidth, color, hasWhiteBg ? 'white' : 'transparent')}
      {arrowElement}
    </g>
  );
};

const CustomTooltipContent: React.FC<any> = ({ active, payload, label, t, ear }) => {
  if (active && payload && payload.length) {
    const findPayload = (key: string) => payload.find((p: any) => p.dataKey === key);
    const air = findPayload('air')?.payload?.air;
    const isNrAir = findPayload('air')?.payload?.isNr_air;
    const bone = findPayload('bone')?.payload?.bone;
    const isNrBone = findPayload('bone')?.payload?.isNr_bone;
    const airMasked = findPayload('airMasked')?.payload?.airMasked;
    const isNrAirMasked = findPayload('airMasked')?.payload?.isNr_airMasked;
    const boneMasked = findPayload('boneMasked')?.payload?.boneMasked;
    const isNrBoneMasked = findPayload('boneMasked')?.payload?.isNr_boneMasked;
    const ucl = findPayload('ucl')?.payload?.ucl;
    const isNrUcl = findPayload('ucl')?.payload?.isNr_ucl;
    const algiacusia = findPayload('algiacusia')?.payload?.algiacusia;
    const isNrAlgiacusia = findPayload('algiacusia')?.payload?.isNr_algiacusia;
    const hasData = (v: any) => v !== null && v !== undefined;
    if (!hasData(air) && !hasData(bone) && !hasData(airMasked) && !hasData(boneMasked) && !hasData(ucl) && !hasData(algiacusia)) return null;
    const formatVal = (val: number, isNr: boolean) => `${val} dB${isNr ? (ear === Ear.Right ? ' (NR ↘)' : ' (NR ↙)') : ''}`;
    const effectiveBone = hasData(boneMasked) ? boneMasked : bone;
    const effectiveAir = hasData(airMasked) ? airMasked : air; 
    const gap = (hasData(effectiveAir) && hasData(effectiveBone)) ? effectiveAir - effectiveBone : null;
    return (
      <div className="bg-white/80 backdrop-blur-sm p-3 shadow-lg rounded-md border border-slate-200">
        <p className="font-bold text-slate-700">{`${payload[0]?.payload?.freq} Hz`}</p>
        <ul className="mt-1 space-y-1">
          {hasData(air) && (<li className="text-sm font-medium text-slate-600">{`${t('audiogramCharts.tooltip.air')}: ${formatVal(air, isNrAir)}`}</li>)}
          {hasData(airMasked) && (<li className="text-sm font-medium text-slate-600">{`${t('audiogramCharts.tooltip.airMasked')}: ${formatVal(airMasked, isNrAirMasked)}`}</li>)}
          {hasData(bone) && (<li className="text-sm font-medium text-slate-600">{`${t('audiogramCharts.tooltip.bone')}: ${formatVal(bone, isNrBone)}`}</li>)}
          {hasData(boneMasked) && (<li className="text-sm font-medium text-slate-600">{`${t('audiogramCharts.tooltip.boneMasked')}: ${formatVal(boneMasked, isNrBoneMasked)}`}</li>)}
          {hasData(ucl) && (<li className="text-sm font-medium text-slate-600">{`${t('audiogramCharts.tooltip.ucl')}: ${formatVal(ucl, isNrUcl)}`}</li>)}
          {hasData(algiacusia) && (<li className="text-sm font-medium text-slate-600">{`${t('audiogramCharts.tooltip.algiacusia')}: ${formatVal(algiacusia, isNrAlgiacusia)}`}</li>)}
          {gap !== null && gap > 0 && (<li className="text-sm" style={gap >= 15 ? { color: '#d97706', fontWeight: 'bold' } : { color: '#475569', fontWeight: 'bold' }}>{`${t('audiogramCharts.tooltip.gap')}: ${gap} dB`}</li>)}
        </ul>
      </div>
    );
  }
  return null;
};

const AudiogramChart: React.FC<AudiogramChartProps> = ({ ear, data, isPrintVersion = false, isFreeVersion = false }) => {
  const { t } = useTranslations(); 
  const { isMobile, isTablet } = useViewportSize(); 
  const { chartData, airLineData, boneLineData } = formatDataForChart(data); 
  const color = COLORS[ear]; 
  const earTitle = t(ear === Ear.Left ? 'audiogramCharts.leftEar' : 'audiogramCharts.rightEar');
  
  const airSymbol = (props: any) => <CustomSymbol {...props} type="circle" color={color} ear={ear} isNr={props.payload.isNr_air} />;
  const crossSymbol = (props: any) => <CustomSymbol {...props} type="cross" color={color} ear={ear} isNr={props.payload.isNr_air} />;
  const ltSymbol = (props: any) => <CustomSymbol {...props} type="lt" color={color} ear={ear} isNr={props.payload.isNr_bone} />;
  const gtSymbol = (props: any) => <CustomSymbol {...props} type="gt" color={color} ear={ear} isNr={props.payload.isNr_bone} />;
  const triangleSymbol = (props: any) => <CustomSymbol {...props} type="triangle" color={color} ear={ear} isNr={props.payload.isNr_airMasked} />;
  const squareSymbol = (props: any) => <CustomSymbol {...props} type="square" color={color} ear={ear} isNr={props.payload.isNr_airMasked} />;
  const bracketLeftSymbol = (props: any) => <CustomSymbol {...props} type="bracket-left" color={color} ear={ear} isNr={props.payload.isNr_boneMasked} />;
  const bracketRightSymbol = (props: any) => <CustomSymbol {...props} type="bracket-right" color={color} ear={ear} isNr={props.payload.isNr_boneMasked} />;
  const uclSymbol = (props: any) => <CustomSymbol {...props} type="ucl-triangle" color={color} ear={ear} isNr={props.payload.isNr_ucl} />;
  const algiacusiaSymbol = (props: any) => <CustomSymbol {...props} type="algiacusia-triangle" color={color} ear={ear} isNr={props.payload.isNr_algiacusia} />;
  
  const fontSizes = { 
    tick: isPrintVersion ? 8 : (isMobile ? 10 : 10), 
    label: isPrintVersion ? 9 : (isMobile ? 11 : 11), 
    title: isPrintVersion ? 11 : (isMobile ? 14 : 16) 
  };
  
  const chartMargin = isPrintVersion 
    ? { top: 5, right: -20, left: 10, bottom: 25 } 
    : (isMobile ? { top: 5, right: -30, left: 10, bottom: 25 } : (isTablet ? { top: 5, right: -30, left: 20, bottom: 30 } : { top: 5, right: -30, left: 20, bottom: 30 }));
  
  const yTicks = [-10, 0, 20, 40, 60, 80, 100, 120];
  const solidGridLines = [30, 50, 70, 90, 110, 120];
  const dashedGridLines = [-5, 5, 15, 25, 35, 45, 55, 65, 75, 85, 95, 105, 115];

  const currentTicks = isFreeVersion ? FREE_TICKS : CHART_TICKS;
  const xAxisDomain = isMobile ? [0.95, 7.05] : [0.8, 7.05];

    const ChartElements = (
    <>
        <CartesianGrid stroke={COLORS.grid} vertical={true} horizontal={false} />
        <Area yAxisId="left" type="linear" dataKey="limitRangeBone" stroke="none" fill="#cbd5e1" fillOpacity={0.4} isAnimationActive={false} />
        <Area yAxisId="left" type="linear" dataKey="limitRange" stroke="none" fill="#f1f5f9" fillOpacity={0.7} isAnimationActive={false} />
        <ReferenceLine y={-10} yAxisId="left" stroke={COLORS.grid} strokeWidth={1} style={{ pointerEvents: 'none' }} />
        {solidGridLines.map((y) => (<ReferenceLine key={`solid-${y}`} y={y} yAxisId="left" stroke={COLORS.grid} strokeWidth={1} style={{ pointerEvents: 'none' }} />))}
        {dashedGridLines.map((y) => (<ReferenceLine key={`dash-${y}`} y={y} yAxisId="left" stroke={COLORS.grid} strokeDasharray="3 3" strokeWidth={1} style={{ pointerEvents: 'none' }} />))}
        {/* @ts-ignore: ReferenceArea props typing issue in Recharts */}
        {!isPrintVersion && (<><ReferenceArea yAxisId="left" y1={-10} y2={25} fill="green" fillOpacity={0.05} style={{ pointerEvents: 'none' }} /><ReferenceArea yAxisId="left" y1={25} y2={40} fill="yellow" fillOpacity={0.07} style={{ pointerEvents: 'none' }} /><ReferenceArea yAxisId="left" y1={40} y2={70} fill="orange" fillOpacity={0.07} style={{ pointerEvents: 'none' }} /><ReferenceArea yAxisId="left" y1={70} y2={90} fill="red" fillOpacity={0.07} style={{ pointerEvents: 'none' }} /><ReferenceArea yAxisId="left" y1={90} y2={120} fill="purple" fillOpacity={0.07} style={{ pointerEvents: 'none' }} /></>)}
        
        <XAxis dataKey="freqAxis" type="number" scale="linear" domain={xAxisDomain} ticks={currentTicks} height={30}
          tickFormatter={(val) => {
              if (val === 1) return '125'; if (val === 2) return '250'; if (val === 3) return '500'; if (val === 3.5) return '750'; if (val === 4) return '1k'; if (val === 4.5) return '1.5k'; if (val === 5) return '2k'; if (val === 5.5) return '3k'; if (val === 6) return '4k'; if (val === 6.5) return '6k'; if (val === 7) return '8k'; return '';
          }}
          tick={{ fill: '#0f172a', fontSize: fontSizes.tick, fontWeight: 'normal', dy: 5 }} axisLine={{ stroke: COLORS.grid }} tickLine={{ stroke: COLORS.grid }} label={{ value: t('audiogramCharts.frequency'), position: 'insideBottom', offset: -5, fill: COLORS.text, fontSize: fontSizes.label, fontWeight: 'bold' }} interval={0} minTickGap={0} />
        
        <YAxis yAxisId="left" orientation="left" reversed={true} type="number" domain={[-10, 120]} ticks={yTicks} tick={{ fill: COLORS.text, fontSize: fontSizes.tick, dx: isMobile ? -1 : -3 }} axisLine={{ stroke: COLORS.grid }} tickLine={{ stroke: COLORS.grid }} label={{ value: t('audiogramCharts.intensity'), angle: -90, position: 'insideLeft', offset: isMobile ? 8 : (isPrintVersion ? 15 : 10), style: { textAnchor: 'middle', fill: COLORS.text, fontSize: `${fontSizes.label}px`, fontWeight: 'bold' } }} />
        <YAxis yAxisId="right" orientation="right" reversed={true} type="number" domain={[-10, 120]} ticks={yTicks} tick={false} tickLine={false} axisLine={{ stroke: COLORS.grid }} />
        
        {!isPrintVersion && <Tooltip content={<CustomTooltipContent t={t} ear={ear} />} cursor={{ strokeDasharray: '3 3' }} /> }
        
        <Line yAxisId="left" dataKey="domain_fixer" stroke="none" dot={false} activeDot={false} isAnimationActive={false} />
        
        {/* Invisible lines that ensure all frequencies are hoverable by the tooltop across all Y heights */}
        <Line yAxisId="left" dataKey="dummy1" stroke="none" dot={false} activeDot={false} isAnimationActive={false} />
        <Line yAxisId="left" dataKey="dummy2" stroke="none" dot={false} activeDot={false} isAnimationActive={false} />
        <Line yAxisId="left" dataKey="dummy3" stroke="none" dot={false} activeDot={false} isAnimationActive={false} />
        <Line yAxisId="left" dataKey="dummy4" stroke="none" dot={false} activeDot={false} isAnimationActive={false} />
        <Line yAxisId="left" dataKey="dummy5" stroke="none" dot={false} activeDot={false} isAnimationActive={false} />

        <Line yAxisId="left" data={airLineData} dataKey="val" stroke={color} strokeWidth={2} dot={false} connectNulls={false} type="linear" isAnimationActive={!isPrintVersion} />
        <Line yAxisId="left" data={boneLineData} dataKey="val" stroke={color} strokeWidth={1.5} strokeDasharray="5 5" dot={false} connectNulls={false} type="linear" isAnimationActive={!isPrintVersion} />

        <Line yAxisId="left" dataKey="air" stroke="none" dot={ear === Ear.Right ? airSymbol : crossSymbol} activeDot={false} isAnimationActive={false} />
        <Line yAxisId="left" dataKey="bone" stroke="none" dot={ear === Ear.Right ? ltSymbol : gtSymbol} activeDot={false} isAnimationActive={false} />
        <Line yAxisId="left" dataKey="airMasked" stroke="none" dot={ear === Ear.Right ? triangleSymbol : squareSymbol} activeDot={false} isAnimationActive={false} />
        <Line yAxisId="left" dataKey="boneMasked" stroke="none" dot={ear === Ear.Right ? bracketLeftSymbol : bracketRightSymbol} activeDot={false} isAnimationActive={false} />
        <Line yAxisId="left" dataKey="ucl" stroke="none" dot={uclSymbol} activeDot={false} isAnimationActive={false} />
        <Line yAxisId="left" dataKey="algiacusia" stroke="none" dot={algiacusiaSymbol} activeDot={false} isAnimationActive={false} />
    </>
  );

  const TitleHeader = (
    <h3 className={`w-full text-center font-black ${isPrintVersion ? 'pt-2 pb-1' : 'pt-4 pb-2'} mb-0 uppercase tracking-tighter`} style={{ color: color, fontSize: `${fontSizes.title}px` }}>
      {earTitle}
    </h3>
  );

  if (isPrintVersion) {
      return (
        <div className="w-full bg-white flex flex-col items-center justify-center">
          {TitleHeader}
          <div className="relative flex justify-center items-center">
            <ComposedChart width={374} height={200} data={chartData} margin={chartMargin}>
              {ChartElements}
            </ComposedChart>
          </div>
        </div>
      );
  }
  
  return (
    <div className="w-full h-full bg-white flex flex-col">
      {TitleHeader}
      <div className="flex-grow relative">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={chartData} margin={chartMargin}>
            {ChartElements}
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AudiogramChart;
