import React from 'react';
import { ResponsiveContainer, ComposedChart, Line, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine, ReferenceArea } from 'recharts';
import { Ear, TympanometryEarData } from '../types';
import { useTranslations } from '../i18n/LanguageContext';
import { useViewportSize } from '../utils/useViewportSize';
import { COLORS } from '../constants';

interface ImpedanceChartProps {
  ear: 'right' | 'left';
  data: TympanometryEarData;
  isPrintVersion?: boolean;
  yMax?: number; 
}

const parseVal = (val: string): number | null => {
    if (!val || val.trim() === '') return null;
    const num = parseFloat(val);
    return isNaN(num) ? null : num;
};

const generateCurveData = (pressure: number | null, compliance: number | null, gradient: number | null, veq: number | null) => {
    const points = [];
    const minPressure = -400;
    const maxPressure = 400; // Extended to 400 to center the 0 visually
    const step = 10;
    
    // Position for the Veq Bar (far right, adjusted to 385 to avoid clipping)
    const barPosition = 390; 

    if (pressure === null || compliance === null) {
        for (let x = minPressure; x <= maxPressure; x += step) {
            // Add Veq bar at specific position even if curve is flat
            const isBarPos = Math.abs(x - barPosition) < (step / 2);
            points.push({ 
                pressure: x, 
                compliance: 0,
                volumeBar: (isBarPos && veq !== null) ? veq : null
            });
        }
        return points;
    }

    // Width of the curve controls the "gradient" visualization
    const width = gradient ? (gradient / 2.355) : 50; 

    for (let x = minPressure; x <= maxPressure; x += step) {
        const y = compliance * Math.exp(-0.5 * Math.pow((x - pressure) / width, 2));
        
        // Inject Veq data point only at barPosition
        const isBarPos = Math.abs(x - barPosition) < (step / 2);
        
        points.push({ 
            pressure: x, 
            compliance: y,
            volumeBar: (isBarPos && veq !== null) ? veq : null
        });
    }
    return points;
};

const ImpedanceChart: React.FC<ImpedanceChartProps> = ({ ear, data, isPrintVersion = false, yMax = 3 }) => {
    const { t } = useTranslations();
    const { isMobile } = useViewportSize();
    
    const pom = parseVal(data.pom);
    const cac = parseVal(data.cac);
    const veq = parseVal(data.veq);
    const gradient = parseVal(data.gradient);

    const chartData = generateCurveData(pom, cac, gradient, veq);
    const color = ear === 'right' ? COLORS.right : COLORS.left;
    
    const fontSizes = {
        tick: isPrintVersion ? 8 : (isMobile ? 10 : 10),
        label: isPrintVersion ? 9 : (isMobile ? 11 : 11),
        title: isPrintVersion ? 11 : (isMobile ? 14 : 16)
    };

    const chartMargin = isPrintVersion
        ? { top: 5, right: 30, left: -10, bottom: 20 }
        : (isMobile ? { top: 5, right: 30, left: 10, bottom: 25 } : { top: 5, right: 30, left: 10, bottom: 30 });

    const earTitle = t(ear === Ear.Left ? 'audiogramCharts.leftEar' : 'audiogramCharts.rightEar');

    const ChartElements = (
        <ComposedChart width={isPrintVersion ? 320 : undefined} height={isPrintVersion ? 135 : undefined} data={chartData} margin={chartMargin}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
            
            {/* Normative Area (Jerger Type A) */}
            {/* Pressure: -100 to +50 daPa | Compliance: 0.3 to 1.6 ml */}
            <ReferenceArea 
                {...({
                    x1: -100,
                    x2: 50,
                    y1: 0.3,
                    y2: 1.6,
                    fill: "#f1f5f9",
                    fillOpacity: 0.6,
                    stroke: "#cbd5e1",
                    strokeDasharray: "2 2"
                } as any)}
            />

            <XAxis 
                dataKey="pressure" 
                type="number" 
                domain={[-400, 400]} // Symmetrical domain to center 0
                ticks={[-400, -200, 0, 200, 400]}
                height={30}
                tick={{ fontSize: fontSizes.tick, fill: '#0f172a', dy: 5 }}
                label={{ value: t('studies.tympanometry.pressureAxis'), position: 'insideBottom', offset: -5, fontSize: fontSizes.label, fill: '#334155', fontWeight: 'bold' }}
            />
            
            <YAxis 
                domain={[0, yMax]} 
                allowDataOverflow={true}
                tick={{ fontSize: fontSizes.tick, fill: '#0f172a' }}
                label={{ 
                    value: t('studies.tympanometry.complianceAxis'), 
                    angle: -90, 
                    position: 'insideLeft', 
                    offset: isPrintVersion ? 18 : 15, 
                    style: { textAnchor: 'middle', fill: '#334155', fontSize: fontSizes.label, fontWeight: 'bold' }
                }}
            />
            
            {!isPrintVersion && <Tooltip formatter={(val: number, name: string) => [val.toFixed(2) + ' mL', name === 'volumeBar' ? 'Veq' : 'Compliance']} labelFormatter={(label) => label + ' daPa'} />}
            
            {/* Bold Center Line at 0 - Dashed and thinner per request */}
            <ReferenceLine x={0} stroke="#94a3b8" strokeWidth={1.25} strokeDasharray="5 5" />
            
            {/* Equivalent Volume Bar */}
            <Bar 
                dataKey="volumeBar" 
                barSize={isPrintVersion ? 30 : 60} 
                fill={color} 
                fillOpacity={0.6} 
                stroke="none"
                isAnimationActive={!isPrintVersion}
            />

            <Line 
                type="monotone" 
                dataKey="compliance" 
                stroke={color} 
                strokeWidth={3}
                dot={false}
                isAnimationActive={!isPrintVersion}
            />
        </ComposedChart>
    );

    if (isPrintVersion) {
        return (
            <div className="w-full bg-white flex flex-col items-center">
                <h3 className="w-full text-center font-black pt-2 pb-1 mb-0 uppercase tracking-tighter" style={{ color: color, fontSize: `${fontSizes.title}px` }}>
                    {earTitle}
                </h3>
                <div className="relative flex justify-center items-center">
                    {ChartElements}
                </div>
            </div>
        );
    }

    return (
        <div className="w-full h-full bg-white flex flex-col">
            <h3 className="w-full text-center font-black pt-4 pb-2 mb-0 uppercase tracking-tighter" style={{ color: color, fontSize: `${fontSizes.title}px` }}>
                {earTitle}
            </h3>
            <div className="flex-grow relative">
                <ResponsiveContainer width="100%" height="100%">
                    {ChartElements}
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default ImpedanceChart;
