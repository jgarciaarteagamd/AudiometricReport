import React, { useState, useEffect } from 'react';
import { ResponsiveContainer, ComposedChart, XAxis, YAxis, CartesianGrid, Tooltip, Line, ReferenceLine, Scatter, Area } from 'recharts';
import { SpeechAudiometryData, Ear } from '../types';
import { COLORS, SPEECH_INTENSITIES } from '../constants';
import { useTranslations } from '../i18n/LanguageContext';

interface SpeechAudiometryChartProps {
  data: SpeechAudiometryData;
  isPrintVersion?: boolean;
}

const useViewportSize = (mobileBreakpoint = 768, tabletBreakpoint = 1024) => {
  const [viewport, setViewport] = useState({
    isMobile: window.innerWidth < mobileBreakpoint,
    isTablet: window.innerWidth >= mobileBreakpoint && window.innerWidth < tabletBreakpoint,
  });

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setViewport({
        isMobile: width < mobileBreakpoint,
        isTablet: width >= mobileBreakpoint && width < tabletBreakpoint,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [mobileBreakpoint, tabletBreakpoint]);

  return viewport;
};

// Helper to parse potential empty strings to number or null
const parseVal = (val: string): number | null => {
    if (!val || val.trim() === '') return null;
    const num = parseFloat(val);
    return isNaN(num) ? null : num;
}

interface Point {
    x: number;
    y: number;
}

// Function to generate Clinical Curve Points
const generateCurvePoints = (
    srt: number | null, 
    sdt: number | null,
    srtNotObtained: boolean | undefined,
    wrsDb: number | null, 
    wrsPct: number | null,
    wrs2Db: number | null,
    wrs2Pct: number | null
): Point[] => {
    const points: Point[] = [];

    if (srtNotObtained) {
        // N/O Logic (Based on WRS anchor)
        if (wrsDb !== null && wrsPct !== null) {
            // Point 1: Ghost Start (WRS - 20dB) or SDT
            const startX = sdt !== null ? sdt : Math.max(0, wrsDb - 20);
            points.push({ x: startX, y: 0 });
            // Point 2: WRS (Max Discrim)
            points.push({ x: wrsDb, y: wrsPct });
            
            // Check for WRS 2 (Rollover point)
            if (wrs2Db !== null && wrs2Pct !== null && wrs2Db > wrsDb) {
                // Point 3: WRS 2
                points.push({ x: wrs2Db, y: wrs2Pct });
                // Point 4: Plateau from WRS 2
                points.push({ x: 120, y: wrs2Pct });
            } else {
                // Point 3: Plateau to 120dB (Flat Line from WRS 1)
                points.push({ x: 120, y: wrsPct });
            }
        }
    } else if (srt !== null) {
        // Standard Logic (Based on SRT anchor)
        
        // 1. Start Point (0% Discrimination)
        // If SDT is provided, curve starts at SDT. Otherwise, default to SRT - 20dB.
        if (sdt !== null) {
             points.push({ x: sdt, y: 0 });
        } else {
             points.push({ x: Math.max(0, srt - 20), y: 0 });
        }

        // 2. Clinical SRT Point (Always 50%)
        points.push({ x: srt, y: 50 });

        // 3. WRS Point (Maximum Discrimination)
        if (wrsDb !== null && wrsPct !== null) {
            // Only add if it makes sense geometrically (WRS dB > SRT is typical, but we allow user input)
            points.push({ x: wrsDb, y: wrsPct });
            
            // 4. WRS 2 Point (Optional Rollover)
            if (wrs2Db !== null && wrs2Pct !== null && wrs2Db > wrsDb) {
                points.push({ x: wrs2Db, y: wrs2Pct });
            }
        }
    }

    // Sort by X to ensure Recharts draws correctly left-to-right
    return points.sort((a, b) => a.x - b.x);
}

const generateNormalityData = () => {
    const data = [];
    // Generate points for the S-Curve band
    // X is Intensity (0-120), Y is % Discrimination
    for (let x = 0; x <= 120; x += 2) {
        // Logistic Function: 100 / (1 + e^-k(x - midpoint))
        
        // Upper Bound (Best possible curve): Midpoint ~12dB, Steepness 0.4
        const yMax = 100 / (1 + Math.exp(-0.4 * (x - 12)));
        
        // Lower Bound (Limit of normal): Midpoint ~22dB, Steepness 0.3
        const yMin = 100 / (1 + Math.exp(-0.3 * (x - 22)));

        // Area chart takes an array [min, max] for the value to create a band
        data.push({ x, normality: [yMin, yMax] });
    }
    return data;
};

const formatDataForChart = (data: SpeechAudiometryData) => {
    // 1. Parse Inputs
    const srtR = parseVal(data.right.srt);
    const sdtR = parseVal(data.right.sdt);
    const wrsDbR = parseVal(data.right.wrs.db);
    const wrsPctR = parseVal(data.right.wrs.percentage);
    const wrs2DbR = parseVal(data.right.wrs2?.db || '');
    const wrs2PctR = parseVal(data.right.wrs2?.percentage || '');
    const uclR = parseVal(data.right.ucl);

    const srtL = parseVal(data.left.srt);
    const sdtL = parseVal(data.left.sdt);
    const wrsDbL = parseVal(data.left.wrs.db);
    const wrsPctL = parseVal(data.left.wrs.percentage);
    const wrs2DbL = parseVal(data.left.wrs2?.db || '');
    const wrs2PctL = parseVal(data.left.wrs2?.percentage || '');
    const uclL = parseVal(data.left.ucl);

    // 2. Generate Curves Points
    const rightCurve = generateCurvePoints(srtR, sdtR, data.right.srtNotObtained, wrsDbR, wrsPctR, wrs2DbR, wrs2PctR);
    const leftCurve = generateCurvePoints(srtL, sdtL, data.left.srtNotObtained, wrsDbL, wrsPctL, wrs2DbL, wrs2PctL);

    return { 
        rightCurve, leftCurve, 
        uclR, uclL, 
        srtR, srtL, 
        wrsDbR, wrsPctR, wrs2DbR, wrs2PctR,
        wrsDbL, wrsPctL, wrs2DbL, wrs2PctL
    };
};

const SpeechAudiometryChart: React.FC<SpeechAudiometryChartProps> = ({ data, isPrintVersion = false }) => {
  const { t } = useTranslations();
  const { isMobile } = useViewportSize();
  const { rightCurve, leftCurve, uclR, uclL, srtR, srtL, wrsDbR, wrsPctR, wrs2DbR, wrs2PctR, wrsDbL, wrsPctL, wrs2DbL, wrs2PctL } = formatDataForChart(data);
  const normalityData = generateNormalityData();

  const fontSizes = {
    tick: isPrintVersion ? 8 : (isMobile ? 10 : 10),
    label: isPrintVersion ? 9 : (isMobile ? 11 : 11),
    title: isPrintVersion ? 13 : (isMobile ? 18 : 18)
  };

  const chartMargin = isPrintVersion
    ? { top: 30, right: 20, left: 0, bottom: 20 }
    : { top: 20, right: 30, left: 10, bottom: 20 };

  const CustomTooltip = ({ active, payload, label }: any) => {
      if (active && payload && payload.length) {
          return (
              <div className="bg-white/90 p-2 border border-slate-200 rounded shadow text-sm">
                  <p className="font-bold mb-1">{label} dB HL</p>
                  {payload.map((entry: any, index: number) => {
                      if (entry.name === 'normality') return null; // Skip normality tooltip
                      return (
                        <p key={index} style={{color: entry.color}}>
                            {entry.name === 'right' ? 'OD' : 'OI'}: {Math.round(entry.value)}%
                        </p>
                      );
                  })}
              </div>
          );
      }
      return null;
  };

  const UclLabel = (props: any) => {
      const { x, y, stroke, value } = props;
      return (
        <g transform={`translate(${x},${y})`}>
            <text x={0} y={-10} dy={0} textAnchor="middle" fill={stroke} fontSize={10} fontWeight="bold">UCL</text>
            <text x={0} y={-10} dy={10} textAnchor="middle" fill={stroke} fontSize={10}>{value}</text>
        </g>
      );
  }

  const ChartElements = (
    <>
        <CartesianGrid stroke={COLORS.grid} strokeDasharray="3 3" />
        
        {/* Normative Area (Sigmoid S-Curve) */}
        <Area 
            data={normalityData}
            dataKey="normality"
            stroke="none"
            fill="#e2e8f0" 
            fillOpacity={0.6}
            isAnimationActive={false}
            tooltipType="none" // Hide from tooltip
            name="normality"
        />

        <XAxis 
            type="number" 
            dataKey="x"
            domain={[0, 120]} 
            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120]}
            tick={{ fill: COLORS.text, fontSize: fontSizes.tick }}
            label={{ value: t('studies.speech.intensityAxis'), position: 'insideBottom', offset: -5, fill: COLORS.text, fontSize: fontSizes.label, fontWeight: 'bold' }}
            allowDataOverflow={true}
        />
        
        <YAxis 
            type="number"
            dataKey="y"
            domain={[0, 100]} 
            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
            tick={{ fill: COLORS.text, fontSize: fontSizes.tick }}
            label={{ 
                value: t('studies.speech.discriminationAxis'), 
                angle: -90, 
                position: 'insideLeft', 
                offset: 15,
                style: { textAnchor: 'middle', fill: COLORS.text, fontSize: fontSizes.label, fontWeight: 'bold' } 
            }}
        />

        {!isPrintVersion && <Tooltip content={<CustomTooltip />} />}

        {/* Right Ear Line */}
        {rightCurve.length > 0 && (
            <Line 
                data={rightCurve}
                type="monotone" 
                dataKey="y" 
                name="right"
                stroke={COLORS.right} 
                strokeWidth={2} 
                dot={false} 
                isAnimationActive={!isPrintVersion} 
            />
        )}

        {/* Left Ear Line */}
        {leftCurve.length > 0 && (
            <Line 
                data={leftCurve}
                type="monotone" 
                dataKey="y" 
                name="left"
                stroke={COLORS.left} 
                strokeWidth={2} 
                dot={false} 
                isAnimationActive={!isPrintVersion} 
            />
        )}
        
        {/* Markers for SRT (50%), WRS 1, WRS 2 */}
        {!data.right.srtNotObtained && srtR !== null && <Scatter data={[{x: srtR, y: 50}]} fill={COLORS.right} shape="circle" />}
        {wrsDbR !== null && wrsPctR !== null && <Scatter data={[{x: wrsDbR, y: wrsPctR}]} fill={COLORS.right} shape="diamond" />}
        {wrs2DbR !== null && wrs2PctR !== null && <Scatter data={[{x: wrs2DbR, y: wrs2PctR}]} fill={COLORS.right} shape="square" />}
        
        {!data.left.srtNotObtained && srtL !== null && <Scatter data={[{x: srtL, y: 50}]} fill={COLORS.left} shape="circle" />}
        {wrsDbL !== null && wrsPctL !== null && <Scatter data={[{x: wrsDbL, y: wrsPctL}]} fill={COLORS.left} shape="diamond" />}
        {wrs2DbL !== null && wrs2PctL !== null && <Scatter data={[{x: wrs2DbL, y: wrs2PctL}]} fill={COLORS.left} shape="square" />}

        {/* 50% Line */}
        <ReferenceLine y={50} stroke="#94a3b8" strokeDasharray="3 3" label={{ position: 'insideRight', value: '50%', fontSize: 9, fill: '#94a3b8' }} />
        
        {/* UCL Lines */}
        {uclR !== null && (
            <ReferenceLine x={uclR} stroke={COLORS.right} strokeDasharray="5 5" label={<UclLabel value={`${uclR} dB`} />} />
        )}
        {uclL !== null && (
            <ReferenceLine x={uclL} stroke={COLORS.left} strokeDasharray="5 5" label={<UclLabel value={`${uclL} dB`} />} />
        )}
    </>
  );

  if (isPrintVersion) {
      return (
          <div className="w-full h-full bg-white relative overflow-hidden flex justify-center items-center">
             <ComposedChart 
                width={650} 
                height={260} 
                margin={chartMargin}
            >
                {ChartElements}
            </ComposedChart>
          </div>
      );
  }

  return (
    <div className={`w-full h-[400px] bg-white relative rounded-lg border border-slate-200 p-2`}>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart margin={chartMargin}>
            {ChartElements}
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SpeechAudiometryChart;
