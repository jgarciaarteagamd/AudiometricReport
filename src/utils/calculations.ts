
import type { HearingData, AudiogramData, AudiogramEarData, CalculatedValues, DataError, MaskingAlert } from '../types';
import { Conduction, CalculationStandard } from '../types';
import { AIR_FREQUENCIES, BONE_FREQUENCIES, MAX_OUTPUT_LEVELS } from '../constants';

// Fowler-Sabine Table (Revised values from provided image)
const FOWLER_SABINE_TABLE: Record<number, Record<number, number>> = {
    500:  { 10: 0.2, 15: 0.5, 20: 1.1, 25: 1.8, 30: 2.6, 35: 3.7, 40: 4.9, 45: 6.3, 50: 7.9, 55: 9.6, 60: 11.3, 65: 12.8, 70: 13.8, 75: 14.6, 80: 14.8, 85: 14.9, 90: 15.0 },
    1000: { 10: 0.3, 15: 0.9, 20: 2.1, 25: 3.6, 30: 5.4, 35: 7.7, 40: 10.2, 45: 13.0, 50: 15.7, 55: 19.0, 60: 21.5, 65: 23.5, 70: 25.5, 75: 27.2, 80: 28.8, 85: 29.8, 90: 29.9, 95: 30.0 },
    2000: { 10: 0.4, 15: 1.3, 20: 2.9, 25: 4.9, 30: 7.3, 35: 9.8, 40: 12.9, 45: 17.3, 50: 22.4, 55: 25.7, 60: 28.0, 65: 30.2, 70: 32.2, 75: 34.0, 80: 35.8, 85: 37.5, 90: 39.2, 95: 40.0 },
    4000: { 10: 0.1, 15: 0.3, 20: 0.9, 25: 1.7, 30: 2.7, 35: 3.8, 40: 5.0, 45: 6.4, 50: 8.0, 55: 9.7, 60: 11.2, 65: 12.5, 70: 13.5, 75: 14.2, 80: 14.6, 85: 14.8, 90: 14.9, 95: 15.0 }
};

function getFowlerPercentage(freq: number, db: number): number {
    const table = FOWLER_SABINE_TABLE[freq];
    if (!table) return 0;
    
    // Exact value or Floor to nearest 5dB (table scale)
    const floorDb = Math.floor(db / 5) * 5;
    if (floorDb <= 10) return db < 10 ? 0 : (table[10] || 0);
    
    const dbKeys = Object.keys(table).map(Number).sort((a,b) => a-b);
    const maxDb = dbKeys[dbKeys.length - 1];
    
    if (db >= maxDb) return table[maxDb];
    if (table[floorDb] !== undefined) return table[floorDb];

    // Fallback simple interpolation for mid values
    let lower = 10;
    let upper = maxDb;
    for (let i = 0; i < dbKeys.length - 1; i++) {
        if (db >= dbKeys[i] && db <= dbKeys[i+1]) {
            lower = dbKeys[i];
            upper = dbKeys[i+1];
            break;
        }
    }
    const valLower = table[lower];
    const valUpper = table[upper];
    const weight = (db - lower) / (upper - lower);
    return valLower + weight * (valUpper - valLower);
}

function getEffectiveThreshold(normal: HearingData, masked: HearingData, freq: number): number | null {
    if (masked[freq] !== null && masked[freq] !== undefined) return masked[freq];
    if (normal[freq] !== null && normal[freq] !== undefined) return normal[freq];
    return null;
}

function calculateAmaStaticLoss(airNormal: HearingData, airMasked: HearingData, freqs: number[]): number | null {
    let lossMono = 0;
    let hasData = false;
    for (const freq of freqs) {
        const val = getEffectiveThreshold(airNormal, airMasked, freq);
        if (val !== null) {
            hasData = true;
            lossMono += getFowlerPercentage(freq, val);
        } else {
            return null;
        }
    }
    return hasData ? lossMono : null;
}

function calculateAaoHnsLoss(pta: number): number {
    let loss = (pta - 25) * 1.5;
    if (loss < 0) loss = 0;
    if (loss > 100) loss = 100;
    return loss;
}

function calcPtaForStandard(normal: HearingData, masked: HearingData, standard: CalculationStandard): number | null {
    // AMA and AAO-HNS use 500, 1000, 2000, 4000. AAOO uses 500, 1000, 2000.
    const freqs = standard === CalculationStandard.AAOO 
        ? [500, 1000, 2000] 
        : [500, 1000, 2000, 4000];
        
    let sum = 0;
    let count = 0;
    for (const f of freqs) {
        const val = getEffectiveThreshold(normal, masked, f);
        if (val !== null) {
             sum += val;
             count++;
        }
    }
    return count > 0 ? sum / count : null;
}


export const calculateAllResults = (
    rightEarFull: AudiogramEarData, 
    leftEarFull: AudiogramEarData,
    standard: CalculationStandard = CalculationStandard.AMA
): CalculatedValues => {
    
    const ptaR = calcPtaForStandard(rightEarFull.air, rightEarFull.airMasked, standard);
    const ptaL = calcPtaForStandard(leftEarFull.air, leftEarFull.airMasked, standard);
    
    let lossR: number | null = null;
    let lossL: number | null = null;
    let lossTotal: number | null = null;
    
    const freqsLoss = [500, 1000, 2000, 4000];

    if (standard === CalculationStandard.AAO_HNS) {
        lossR = ptaR !== null ? calculateAaoHnsLoss(ptaR) : null;
        lossL = ptaL !== null ? calculateAaoHnsLoss(ptaL) : null;
    } else {
        lossR = calculateAmaStaticLoss(rightEarFull.air, rightEarFull.airMasked, freqsLoss);
        lossL = calculateAmaStaticLoss(leftEarFull.air, leftEarFull.airMasked, freqsLoss);
    }
    
    if (lossR !== null && lossL !== null) {
        if (standard === CalculationStandard.AMA) {
             // 7:1 Weighting on totals
             lossTotal = (7 * Math.min(lossR, lossL) + Math.max(lossR, lossL)) / 8;
        } else {
             // 5:1 Weighting on totals (AAO-HNS and AAOO)
             lossTotal = (5 * Math.min(lossR, lossL) + Math.max(lossR, lossL)) / 6;
        }
    }
    
    let ptaBinaural = (ptaR !== null && ptaL !== null) ? (ptaR + ptaL) / 2 : null;

    const ptaOdBone = calcPtaForStandard(rightEarFull.bone, rightEarFull.boneMasked, standard);
    const ptaOiBone = calcPtaForStandard(leftEarFull.bone, leftEarFull.boneMasked, standard);

    return {
        ptaOdVa: ptaR !== null ? ptaR.toFixed(2) : '',
        pOdVaTotal: lossR !== null ? lossR.toFixed(2) : '',
        ptaOiVa: ptaL !== null ? ptaL.toFixed(2) : '',
        pOiVaTotal: lossL !== null ? lossL.toFixed(2) : '',
        ptaAoVa: ptaBinaural !== null ? ptaBinaural.toFixed(2) : '',
        pAoVaTotal: lossTotal !== null ? lossTotal.toFixed(2) : '',
        ptaOdBone: ptaOdBone !== null ? ptaOdBone.toFixed(2) : '',
        ptaOiBone: ptaOiBone !== null ? ptaOiBone.toFixed(2) : '',
        hasBoneData: !!(ptaOdBone || ptaOiBone),
        standard
    };
};

export const analyzeDataQuality = (audiogram: AudiogramData): DataError[] => {
    const errors: DataError[] = [];
    ['right', 'left'].forEach(ear => {
        const earData = audiogram[ear as keyof AudiogramData];
        
        // Check Limits (Calculated based on conduction type)
        const conductionsToCheck: { key: Conduction, limitKey: string }[] = [
            { key: Conduction.Air, limitKey: 'air' },
            { key: Conduction.AirMasked, limitKey: 'air' },
            { key: Conduction.Bone, limitKey: 'bone' },
            { key: Conduction.BoneMasked, limitKey: 'bone' },
            { key: Conduction.UCL, limitKey: 'ucl' },
            { key: Conduction.Algiacusia, limitKey: 'algiacusia' }
        ];

        conductionsToCheck.forEach(({ key, limitKey }) => {
            const conductionData = earData[key as keyof AudiogramEarData] as HearingData;
            Object.entries(conductionData).forEach(([fStr, val]) => {
                const freq = parseInt(fStr, 10);
                const valNum = val as number | null;
                if (valNum !== null) {
                    const limitMap = MAX_OUTPUT_LEVELS[limitKey];
                    const limit = limitMap ? limitMap[freq] : undefined;
                    if (limit !== undefined && valNum > limit) {
                        // Check if it's already in errors for this frequency/ear to avoid duplicate messages if bothVA and VA-masked are over limit
                        // Actually, it's better to show which one is over limit.
                        errors.push({ ear: ear as any, freq, type: 'limit', messageKey: 'reportGenerator.audiometry.qualityLimit' });
                    }
                }
            });
        });
    });
    return errors;
};
