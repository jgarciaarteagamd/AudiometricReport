
export enum Ear {
    Right = 'right',
    Left = 'left'
}

export enum Conduction {
    Air = 'air',
    Bone = 'bone',
    AirMasked = 'airMasked',
    BoneMasked = 'boneMasked',
    UCL = 'ucl',
    Algiacusia = 'algiacusia'
}

export interface HearingData {
  [frequency: number]: number | null;
}

export interface NoResponseData {
  [frequency: number]: boolean;
}

export interface AudiogramEarData {
    air: HearingData;
    bone: HearingData;
    airMasked: HearingData;
    boneMasked: HearingData;
    ucl: HearingData;
    algiacusia: HearingData;
    noResponse: {
        air: NoResponseData;
        bone: NoResponseData;
        airMasked: NoResponseData;
        boneMasked: NoResponseData;
        ucl: NoResponseData;
        algiacusia: NoResponseData;
    };
}

export interface AudiogramData {
  right: AudiogramEarData;
  left: AudiogramEarData;
}

export interface TympanometryEarData {
    pom: string;
    cac: string;
    veq: string;
    gradient: string;
}

export interface SpeechAudiometryEarData {
    sdt: string;
    srt: string;
    srtNotObtained: boolean;
    wrs: { db: string; percentage: string };
    wrs2: { db: string; percentage: string };
    ucl: string;
}

export interface SpeechAudiometryData {
    right: SpeechAudiometryEarData;
    left: SpeechAudiometryEarData;
}

export interface ReflexEarData {
    ipsi: { [freq: number]: string };
    contra: { [freq: number]: string };
    decay: { [freq: number]: string };
    absent: {
        ipsi: { [freq: number]: boolean };
        contra: { [freq: number]: boolean };
    };
    present: {
        ipsi: { [freq: number]: boolean };
        contra: { [freq: number]: boolean };
    };
}

export interface ImpedanceData {
    right: { tymp: TympanometryEarData, reflex: ReflexEarData };
    left: { tymp: TympanometryEarData, reflex: ReflexEarData };
}

export enum CalculationStandard {
    AAO_HNS = 'AAO-HNS',
    AMA = 'AMA',
    AAOO = 'AAOO'
}

export interface CalculatedValues {
  ptaOdVa: string;
  pOdVaTotal: string;
  ptaOiVa: string;
  pOiVaTotal: string;
  ptaAoVa: string;
  pAoVaTotal: string;
  ptaOdBone?: string;
  ptaOiBone?: string;
  hasBoneData?: boolean;
  standard?: CalculationStandard;
}

export interface ReportInfo {
  apellidos: string;
  nombre: string;
  id: string;
  fechaNacimiento: string;
  edad: string;
  email: string;
  phone: string;
  motivo: string;
  antecedentes: string;
  antecedentesPersonales: string;
  antecedentesFamiliares: string;
  factoresExternos: string;
  exploracionFisica: string;
  complementarias: string;
  lugarAudiometria: string;
  fechaAudiometria: string;
  juicioClinico: string;
  plan: string;
  facultativo: string;
  profesion: string;
  matricula: string;
  lugarFirma: string;
  fechaFirma: string;
  footerText: string; 
  lugarFirmaCiudad: string;
  logo?: string | null;
}

export interface FullReportData {
    reportInfo: ReportInfo;
    calculatedValues: CalculatedValues;
    audiogram: AudiogramData;
    speechAudiometry?: SpeechAudiometryData;
    impedance?: ImpedanceData;
}

export type AppView = 'menu' | 'calculator' | 'reportGenerator' | 'reportViewer' | 'legalNotice' | 'privacyPolicy' | 'termsAndConditions' | 'faq' | 'free-report' | 'reportIssue';

export interface DataError {
    ear: 'right' | 'left';
    freq: number;
    type: 'limit' | 'inversion';
    messageKey: string;
    params?: any;
}

export interface MaskingAlert {
    ear: 'right' | 'left';
    freq: number;
    reasonKey: string;
}