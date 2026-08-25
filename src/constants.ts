
export const AIR_FREQUENCIES = [125, 250, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000, 8000];
export const BONE_FREQUENCIES = [250, 500, 750, 1000, 1500, 2000, 3000, 4000, 6000];

export const COLORS = {
  right: '#dc2626', // red-600
  left: '#2563eb',  // blue-600
  text: '#334155',  // slate-700
  grid: '#e2e8f0',  // slate-200
};

export const INITIAL_HEARING_DATA = AIR_FREQUENCIES.reduce((acc, freq) => ({ ...acc, [freq]: null }), {});
export const INITIAL_NO_RESPONSE_DATA = AIR_FREQUENCIES.reduce((acc, freq) => ({ ...acc, [freq]: false }), {});

export const INITIAL_REPORT_INFO = {
  apellidos: '', nombre: '', id: '', fechaNacimiento: '', edad: '',
  email: '', phone: '',
  motivo: '', antecedentes: '', antecedentesPersonales: '', antecedentesFamiliares: '', factoresExternos: '',
  exploracionFisica: '', complementarias: '',
  lugarAudiometria: '', fechaAudiometria: new Date().toISOString().split('T')[0],
  juicioClinico: '', plan: '',
  facultativo: '', profesion: '', matricula: '',
  lugarFirma: '', fechaFirma: new Date().toISOString().split('T')[0],
  footerText: '',
  lugarFirmaCiudad: ''
};

export const SPEECH_INTENSITIES = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120];
export const INITIAL_SPEECH_EAR_DATA = { sdt: '', srt: '', srtNotObtained: false, wrs: { db: '', percentage: '' }, wrs2: { db: '', percentage: '' }, ucl: '' };
export const INITIAL_IMPEDANCE_EAR_DATA = { 
    tymp: { pom: '', cac: '', veq: '', gradient: '' }, 
    reflex: { 
        ipsi: { 500: '', 1000: '', 2000: '', 4000: '' }, 
        contra: { 500: '', 1000: '', 2000: '', 4000: '' }, 
        decay: { 500: '', 1000: '' }, 
        absent: { 
            ipsi: { 500: false, 1000: false, 2000: false, 4000: false }, 
            contra: { 500: false, 1000: false, 2000: false, 4000: false } 
        },
        present: { 
            ipsi: { 500: false, 1000: false, 2000: false, 4000: false }, 
            contra: { 500: false, 1000: false, 2000: false, 4000: false } 
        } 
    } 
};

// Límites máximos de salida aproximados según ANSI S3.6 / IEC 60645-1 para audiómetros Tipo 1/2
export const MAX_OUTPUT_LEVELS: { [key: string]: { [key: number]: number } } = {
    air: {
        125: 80, 250: 105, 500: 120, 750: 120, 1000: 120, 1500: 120, 2000: 120, 3000: 120, 4000: 120, 6000: 110, 8000: 100
    },
    bone: {
        125: 45, 250: 45, 500: 65, 750: 70, 1000: 75, 1500: 80, 2000: 80, 3000: 80, 4000: 75, 6000: 55, 8000: 50
    },
    ucl: {
        125: 120, 250: 120, 500: 120, 750: 120, 1000: 120, 1500: 120, 2000: 120, 3000: 120, 4000: 120, 6000: 120, 8000: 120
    },
    algiacusia: {
        125: 120, 250: 120, 500: 120, 750: 120, 1000: 120, 1500: 120, 2000: 120, 3000: 120, 4000: 120, 6000: 120, 8000: 120
    }
};
