import type { BetType } from '../types/index.ts';

export const BET_TYPES: BetType[] = [
  { id: 'result', icon: '⚽', label: 'Resultado', desc: '1X2 — ¿Quién gana?', oddsRange: '1.85 – 4.50' },
  { id: 'score', icon: '🎯', label: 'Marcador exacto', desc: 'Adivina el resultado', oddsRange: '6.00 – 25.0' },
  { id: 'goals', icon: '🔥', label: 'Más/Menos goles', desc: 'Total de goles en el partido', oddsRange: '1.80 – 2.10' },
  { id: 'scorer', icon: '👟', label: 'Goleador', desc: '¿Quién marca?', oddsRange: '2.50 – 8.00' },
  { id: 'both', icon: '⚡', label: 'Ambos anotan', desc: '¿Los dos equipos marcan?', oddsRange: '1.85 – 2.00' },
  { id: 'half', icon: '⏱️', label: '1er Tiempo', desc: 'Resultado al descanso', oddsRange: '2.10 – 3.20' },
  { id: 'cards', icon: '🟨', label: 'Tarjetas', desc: 'Más/Menos de 3.5', oddsRange: '1.70 – 2.10' },
  { id: 'corners', icon: '📐', label: 'Córners', desc: 'Más/Menos de 8.5', oddsRange: '1.75 – 2.05' },
];

export const SCORERS: Record<string, string[]> = {
  'México': ['R. Jiménez|3.80', 'H. Lozano|4.20', 'S. Giménez|3.50', 'J. Vega|5.00', 'O. Pineda|6.00'],
  'Sudáfrica': ['P. Tau|5.50', 'L. Mokoena|6.00', 'B. Zwane|7.00'],
  'Brasil': ['Vinicius Jr.|2.80', 'Rodrygo|3.50', 'Raphinha|4.00', 'Endrick|4.50', 'Richarlison|5.00'],
  'Marruecos': ['Y. En-Nesyri|4.00', 'H. Ziyech|4.50', 'A. Hakimi|7.00'],
  'EE.UU.': ['C. Pulisic|3.20', 'T. Weah|4.00', 'F. Balogun|3.80', 'G. Reyna|5.00'],
  'Paraguay': ['A. Enciso|4.50', 'M. Almirón|5.00', 'J. Pitta|5.50'],
  'España': ['Lamine Yamal|2.80', 'Morata|3.50', 'N. Williams|3.20', 'Pedri|5.50', 'Rodri|6.00'],
  'Cabo Verde': ['G. Rodrigues|6.00', 'R. Silva|7.00'],
  'Argentina': ['L. Messi|3.00', 'J. Álvarez|3.20', 'L. Martínez|2.80', 'A. Mac Allister|5.50'],
  'Argelia': ['I. Bennacer|6.00', 'S. Mahrez|4.00', 'A. Slimani|5.00'],
  'Inglaterra': ['H. Kane|2.50', 'J. Bellingham|3.50', 'B. Saka|3.80', 'P. Foden|4.00', 'C. Palmer|4.20'],
  'Croacia': ['L. Modrić|5.50', 'A. Kramarić|4.00', 'M. Pašalić|5.00'],
  'Francia': ['Mbappé|2.20', 'Griezmann|3.80', 'O. Dembélé|4.50', 'M. Thuram|4.00'],
  'Senegal': ['S. Mané|3.50', 'N. Jackson|4.50', 'I. Sarr|5.00'],
  'Alemania': ['J. Musiala|3.00', 'K. Havertz|3.50', 'F. Wirtz|3.20', 'L. Sané|4.50', 'N. Füllkrug|4.00'],
  'Curazao': ['J. Bacuna|7.00', 'K. Grot|8.00'],
  'Canadá': ['J. David|3.50', 'A. Davies|5.00', 'C. Larin|4.50'],
  'Corea del Sur': ['Son Heung-min|2.80', 'Hwang Hee-chan|4.50', 'Lee Kang-in|5.00'],
};

export const SCORE_OPTIONS = ['1-0', '2-0', '2-1', '3-0', '3-1', '3-2', '0-0', '0-1', '0-2', '1-1', '2-2', '1-2'];
export const SCORE_ODDS = [5.50, 8.00, 7.50, 12.0, 15.0, 25.0, 9.00, 6.50, 10.0, 6.00, 11.0, 8.50];
