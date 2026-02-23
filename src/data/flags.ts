import type { FlagMap } from '../types/index.ts';

export const FLAG_MAP: FlagMap = {
  // Grupo A
  'México': 'mx',
  'Sudáfrica': 'za',
  'Corea del Sur': 'kr',
  
  // Grupo B
  'Canadá': 'ca',
  'Catar': 'qa',
  'Suiza': 'ch',
  
  // Grupo C
  'Brasil': 'br',
  'Marruecos': 'ma',
  'Haití': 'ht',
  'Escocia': 'gb-sct',
  
  // Grupo D
  'EE. UU.': 'us',
  'Paraguay': 'py',
  'Australia': 'au',
  
  // Grupo E
  'Alemania': 'de',
  'Curazao': 'cw',
  'Costa de Marfil': 'ci',
  'Ecuador': 'ec',
  
  // Grupo F
  'Países Bajos': 'nl',
  'Japón': 'jp',
  'Túnez': 'tn',
  
  // Grupo G
  'Bélgica': 'be',
  'Egipto': 'eg',
  'Irán': 'ir',
  'Nueva Zelanda': 'nz',
  
  // Grupo H
  'España': 'es',
  'Cabo Verde': 'cv',
  'Arabia Saudita': 'sa',
  'Uruguay': 'uy',
  
  // Grupo I
  'Francia': 'fr',
  'Senegal': 'sn',
  'Noruega': 'no',
  
  // Grupo J
  'Argentina': 'ar',
  'Argelia': 'dz',
  'Austria': 'at',
  'Jordania': 'jo',
  
  // Grupo K
  'Portugal': 'pt',
  'Uzbekistán': 'uz',
  'Colombia': 'co',
  
  // Grupo L
  'Inglaterra': 'gb-eng',
  'Croacia': 'hr',
  'Ghana': 'gh',
  'Panamá': 'pa',
  
  // Extras (por compatibilidad)
  'Italia': 'it',
  'Qatar': 'qa',
  'EE.UU.': 'us',
  'Corea': 'kr',
  'Estados Unidos': 'us',
  'Iran': 'ir',
  'Saudi Arabia': 'sa',
  'NuevaZelanda': 'nz',
  'Reino Unido': 'gb',
  'Gran Bretaña': 'gb',
};

export const getFlagUrl = (code: string, _size: number = 40): string => {
  // Usar flagcdn con tamaño fijo para evitar problemas
  return `https://flagcdn.com/w80/${code}.png`;
};

export const getFlagByCountry = (country: string, size: number = 40): string => {
  const code = FLAG_MAP[country];
  if (!code) return '';
  return getFlagUrl(code, size);
};
