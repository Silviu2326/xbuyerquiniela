// ============================================
// DATOS DE JUGADORES - MODO DT 2026
// 36 jugadores por selección (elegir 26)
// ============================================

import type { DTPlayer, DTNation } from '../store/dtStore';

// Lista de las 48 naciones participantes
export const DT_NATIONS: DTNation[] = [
  { id: 'ger', name: 'Alemania', code: 'GER', flag: '🇩🇪', confederation: 'UEFA', strength: 88 },
  { id: 'aut', name: 'Austria', code: 'AUT', flag: '🇦🇹', confederation: 'UEFA', strength: 82 },
  { id: 'bel', name: 'Bélgica', code: 'BEL', flag: '🇧🇪', confederation: 'UEFA', strength: 85 },
  { id: 'cro', name: 'Croacia', code: 'CRO', flag: '🇭🇷', confederation: 'UEFA', strength: 84 },
  { id: 'den', name: 'Dinamarca', code: 'DEN', flag: '🇩🇰', confederation: 'UEFA', strength: 81 },
  { id: 'esp', name: 'España', code: 'ESP', flag: '🇪🇸', confederation: 'UEFA', strength: 90 },
  { id: 'fra', name: 'Francia', code: 'FRA', flag: '🇫🇷', confederation: 'UEFA', strength: 91 },
  { id: 'wal', name: 'Gales', code: 'WAL', flag: '🏴󠁧󠁢󠁷󠁬󠁳󠁿', confederation: 'UEFA', strength: 78 },
  { id: 'ned', name: 'Países Bajos', code: 'NED', flag: '🇳🇱', confederation: 'UEFA', strength: 87 },
  { id: 'eng', name: 'Inglaterra', code: 'ENG', flag: '🏴󠁧󠁢󠁥󠁮󠁧󠁿', confederation: 'UEFA', strength: 89 },
  { id: 'ita', name: 'Italia', code: 'ITA', flag: '🇮🇹', confederation: 'UEFA', strength: 86 },
  { id: 'por', name: 'Portugal', code: 'POR', flag: '🇵🇹', confederation: 'UEFA', strength: 88 },
  { id: 'srb', name: 'Serbia', code: 'SRB', flag: '🇷🇸', confederation: 'UEFA', strength: 80 },
  { id: 'sui', name: 'Suiza', code: 'SUI', flag: '🇨🇭', confederation: 'UEFA', strength: 79 },
  { id: 'ukr', name: 'Ucrania', code: 'UKR', flag: '🇺🇦', confederation: 'UEFA', strength: 77 },
  { id: 'swe', name: 'Suecia', code: 'SWE', flag: '🇸🇪', confederation: 'UEFA', strength: 76 },
  { id: 'arg', name: 'Argentina', code: 'ARG', flag: '🇦🇷', confederation: 'CONMEBOL', strength: 93 },
  { id: 'bra', name: 'Brasil', code: 'BRA', flag: '🇧🇷', confederation: 'CONMEBOL', strength: 92 },
  { id: 'uru', name: 'Uruguay', code: 'URU', flag: '🇺🇾', confederation: 'CONMEBOL', strength: 86 },
  { id: 'col', name: 'Colombia', code: 'COL', flag: '🇨🇴', confederation: 'CONMEBOL', strength: 84 },
  { id: 'ecu', name: 'Ecuador', code: 'ECU', flag: '🇪🇨', confederation: 'CONMEBOL', strength: 79 },
  { id: 'par', name: 'Paraguay', code: 'PAR', flag: '🇵🇾', confederation: 'CONMEBOL', strength: 77 },
  { id: 'can', name: 'Canadá', code: 'CAN', flag: '🇨🇦', confederation: 'CONCACAF', strength: 76 },
  { id: 'crc', name: 'Costa Rica', code: 'CRC', flag: '🇨🇷', confederation: 'CONCACAF', strength: 73 },
  { id: 'usa', name: 'Estados Unidos', code: 'USA', flag: '🇺🇸', confederation: 'CONCACAF', strength: 80 },
  { id: 'mex', name: 'México', code: 'MEX', flag: '🇲🇽', confederation: 'CONCACAF', strength: 79 },
  { id: 'pan', name: 'Panamá', code: 'PAN', flag: '🇵🇦', confederation: 'CONCACAF', strength: 72 },
  { id: 'jam', name: 'Jamaica', code: 'JAM', flag: '🇯🇲', confederation: 'CONCACAF', strength: 70 },
  { id: 'alg', name: 'Argelia', code: 'ALG', flag: '🇩🇿', confederation: 'CAF', strength: 78 },
  { id: 'cmr', name: 'Camerún', code: 'CMR', flag: '🇨🇲', confederation: 'CAF', strength: 76 },
  { id: 'egy', name: 'Egipto', code: 'EGY', flag: '🇪🇬', confederation: 'CAF', strength: 80 },
  { id: 'gha', name: 'Ghana', code: 'GHA', flag: '🇬🇭', confederation: 'CAF', strength: 77 },
  { id: 'mar', name: 'Marruecos', code: 'MAR', flag: '🇲🇦', confederation: 'CAF', strength: 84 },
  { id: 'nga', name: 'Nigeria', code: 'NGA', flag: '🇳🇬', confederation: 'CAF', strength: 79 },
  { id: 'sen', name: 'Senegal', code: 'SEN', flag: '🇸🇳', confederation: 'CAF', strength: 82 },
  { id: 'rsa', name: 'Sudáfrica', code: 'RSA', flag: '🇿🇦', confederation: 'CAF', strength: 74 },
  { id: 'tun', name: 'Túnez', code: 'TUN', flag: '🇹🇳', confederation: 'CAF', strength: 75 },
  { id: 'aus', name: 'Australia', code: 'AUS', flag: '🇦🇺', confederation: 'AFC', strength: 76 },
  { id: 'irn', name: 'Irán', code: 'IRN', flag: '🇮🇷', confederation: 'AFC', strength: 77 },
  { id: 'jpn', name: 'Japón', code: 'JPN', flag: '🇯🇵', confederation: 'AFC', strength: 83 },
  { id: 'kor', name: 'Corea del Sur', code: 'KOR', flag: '🇰🇷', confederation: 'AFC', strength: 81 },
  { id: 'qat', name: 'Catar', code: 'QAT', flag: '🇶🇦', confederation: 'AFC', strength: 74 },
  { id: 'ksa', name: 'Arabia Saudita', code: 'KSA', flag: '🇸🇦', confederation: 'AFC', strength: 75 },
  { id: 'chn', name: 'China', code: 'CHN', flag: '🇨🇳', confederation: 'AFC', strength: 72 },
  { id: 'uzb', name: 'Uzbekistán', code: 'UZB', flag: '🇺🇿', confederation: 'AFC', strength: 71 },
  { id: 'nzl', name: 'Nueva Zelanda', code: 'NZL', flag: '🇳🇿', confederation: 'OFC', strength: 69 },
];

// Plantillas base para generar jugadores
const FIRST_NAMES = [
  'Juan', 'Carlos', 'Luis', 'Pedro', 'Diego', 'Miguel', 'José', 'Antonio', 'David', 'Javier',
  'Daniel', 'Francisco', 'Pablo', 'Alejandro', 'Sergio', 'Fernando', 'Ángel', 'Jorge', 'Alberto', 'Raúl',
  'Andrés', 'Manuel', 'Mario', 'Iván', 'Rubén', 'Víctor', 'Óscar', 'Marcos', 'Hugo', 'Martín',
  'Lucas', 'Mateo', 'Leo', 'Daniel', 'Alejandro', 'Mateo', 'Martín', 'Lucas', 'Leo', 'Daniel'
];

const LAST_NAMES = [
  'García', 'Rodríguez', 'González', 'Fernández', 'López', 'Martínez', 'Sánchez', 'Pérez', 'Gómez', 'Martín',
  'Jiménez', 'Ruiz', 'Hernández', 'Díaz', 'Moreno', 'Muñoz', 'Álvarez', 'Romero', 'Alonso', 'Gutiérrez',
  'Navarro', 'Torres', 'Domínguez', 'Vázquez', 'Ramos', 'Gil', 'Ramírez', 'Serrano', 'Blanco', 'Molina',
  'Morales', 'Suárez', 'Ortega', 'Delgado', 'Castro', 'Ortiz', 'Rubio', 'Marín', 'Sanz', 'Iglesias'
];

// Generar jugadores para una selección
export function generatePlayersForNation(nationId: string, _nationName: string, strength: number): DTPlayer[] {
  const players: DTPlayer[] = [];
  
  // Distribución: 4 GK, 12 DEF, 12 MID, 8 FWD = 36
  const distribution = { GK: 4, DEF: 12, MID: 12, FWD: 8 };
  let playerIndex = 1;
  
  Object.entries(distribution).forEach(([pos, count]) => {
    for (let i = 0; i < count; i++) {
      const firstName = FIRST_NAMES[Math.floor(Math.random() * FIRST_NAMES.length)];
      const lastName = LAST_NAMES[Math.floor(Math.random() * LAST_NAMES.length)];
      
      // Overall basado en la fuerza de la selección y posición en plantilla
      const baseOverall = strength - 10 + Math.floor(Math.random() * 20);
      const overall = Math.min(99, Math.max(60, baseOverall - (i * 2)));
      
      players.push({
        id: `${nationId}-${playerIndex}`,
        name: `${firstName} ${lastName}`,
        nationId,
        position: pos as 'GK' | 'DEF' | 'MID' | 'FWD',
        age: 20 + Math.floor(Math.random() * 15),
        overall,
        potential: Math.min(99, overall + Math.floor(Math.random() * 10)),
        form: 5 + Math.floor(Math.random() * 5),
        fitness: 80 + Math.floor(Math.random() * 20),
        isInjured: false,
      });
      
      playerIndex++;
    }
  });
  
  return players;
}

// Generar todos los jugadores para las 48 selecciones
export const NATIONS_DATA: Record<string, { nation: DTNation; players: DTPlayer[]; coach: string; bestPlayer: string; preferredFormation: string; preferredTactic: string }> = {
  // UEFA
  'esp': {
    nation: { id: 'esp', name: 'España', code: 'ESP', flag: '🇪🇸', confederation: 'UEFA', strength: 90 },
    players: [
      // Porteros
      { id: 'esp-1', name: 'Unai Simón', nationId: 'esp', position: 'GK', age: 29, overall: 86, potential: 88, form: 8, fitness: 95, isInjured: false },
      { id: 'esp-2', name: 'David Raya', nationId: 'esp', position: 'GK', age: 29, overall: 84, potential: 85, form: 7, fitness: 92, isInjured: false },
      { id: 'esp-3', name: 'Álex Remiro', nationId: 'esp', position: 'GK', age: 29, overall: 82, potential: 83, form: 7, fitness: 90, isInjured: false },
      { id: 'esp-4', name: 'Robert Sánchez', nationId: 'esp', position: 'GK', age: 27, overall: 81, potential: 84, form: 6, fitness: 88, isInjured: false },
      // Defensas
      { id: 'esp-5', name: 'Dani Carvajal', nationId: 'esp', position: 'DEF', age: 34, overall: 85, potential: 85, form: 8, fitness: 90, isInjured: false },
      { id: 'esp-6', name: 'Aymeric Laporte', nationId: 'esp', position: 'DEF', age: 31, overall: 87, potential: 87, form: 8, fitness: 92, isInjured: false },
      { id: 'esp-7', name: 'Pau Cubarsí', nationId: 'esp', position: 'DEF', age: 18, overall: 84, potential: 94, form: 8, fitness: 95, isInjured: false },
      { id: 'esp-8', name: 'Pedro Porro', nationId: 'esp', position: 'DEF', age: 25, overall: 83, potential: 87, form: 7, fitness: 90, isInjured: false },
      { id: 'esp-9', name: 'Iñigo Martínez', nationId: 'esp', position: 'DEF', age: 33, overall: 82, potential: 82, form: 7, fitness: 85, isInjured: false },
      { id: 'esp-10', name: 'Grimaldo', nationId: 'esp', position: 'DEF', age: 29, overall: 85, potential: 86, form: 9, fitness: 93, isInjured: false },
      { id: 'esp-11', name: 'Nacho Fernández', nationId: 'esp', position: 'DEF', age: 35, overall: 81, potential: 81, form: 6, fitness: 80, isInjured: false },
      { id: 'esp-12', name: 'Le Normand', nationId: 'esp', position: 'DEF', age: 28, overall: 84, potential: 85, form: 7, fitness: 90, isInjured: false },
      { id: 'esp-13', name: 'Vivian', nationId: 'esp', position: 'DEF', age: 25, overall: 82, potential: 87, form: 7, fitness: 88, isInjured: false },
      { id: 'esp-14', name: 'Mingueza', nationId: 'esp', position: 'DEF', age: 25, overall: 80, potential: 85, form: 6, fitness: 87, isInjured: false },
      { id: 'esp-15', name: 'Arnau Martínez', nationId: 'esp', position: 'DEF', age: 22, overall: 79, potential: 88, form: 7, fitness: 90, isInjured: false },
      { id: 'esp-16', name: 'Raúl Asencio', nationId: 'esp', position: 'DEF', age: 20, overall: 78, potential: 90, form: 6, fitness: 88, isInjured: false },
      // Centrocampistas
      { id: 'esp-17', name: 'Rodri', nationId: 'esp', position: 'MID', age: 30, overall: 91, potential: 91, form: 9, fitness: 92, isInjured: false },
      { id: 'esp-18', name: 'Pedri', nationId: 'esp', position: 'MID', age: 23, overall: 89, potential: 95, form: 8, fitness: 85, isInjured: false },
      { id: 'esp-19', name: 'Fermín López', nationId: 'esp', position: 'MID', age: 22, overall: 86, potential: 92, form: 8, fitness: 93, isInjured: false },
      { id: 'esp-20', name: 'Dani Olmo', nationId: 'esp', position: 'MID', age: 27, overall: 87, potential: 88, form: 8, fitness: 90, isInjured: false },
      { id: 'esp-21', name: 'Nico Williams', nationId: 'esp', position: 'MID', age: 23, overall: 88, potential: 93, form: 9, fitness: 95, isInjured: false },
      { id: 'esp-22', name: 'Martín Zubimendi', nationId: 'esp', position: 'MID', age: 26, overall: 86, potential: 89, form: 7, fitness: 92, isInjured: false },
      { id: 'esp-23', name: 'Álex Baena', nationId: 'esp', position: 'MID', age: 24, overall: 85, potential: 88, form: 8, fitness: 90, isInjured: false },
      { id: 'esp-24', name: 'Mikel Merino', nationId: 'esp', position: 'MID', age: 29, overall: 84, potential: 85, form: 7, fitness: 88, isInjured: false },
      { id: 'esp-25', name: 'Marc Casadó', nationId: 'esp', position: 'MID', age: 21, overall: 82, potential: 89, form: 7, fitness: 90, isInjured: false },
      { id: 'esp-26', name: 'Beñat Turrientes', nationId: 'esp', position: 'MID', age: 24, overall: 81, potential: 86, form: 6, fitness: 88, isInjured: false },
      { id: 'esp-27', name: 'Pablo Torre', nationId: 'esp', position: 'MID', age: 22, overall: 80, potential: 87, form: 6, fitness: 87, isInjured: false },
      { id: 'esp-28', name: 'Pepelu', nationId: 'esp', position: 'MID', age: 26, overall: 79, potential: 83, form: 7, fitness: 89, isInjured: false },
      // Delanteros
      { id: 'esp-29', name: 'Lamine Yamal', nationId: 'esp', position: 'FWD', age: 19, overall: 90, potential: 98, form: 9, fitness: 94, isInjured: false },
      { id: 'esp-30', name: 'Álvaro Morata', nationId: 'esp', position: 'FWD', age: 33, overall: 84, potential: 84, form: 7, fitness: 85, isInjured: false },
      { id: 'esp-31', name: 'Dani Pérez', nationId: 'esp', position: 'FWD', age: 23, overall: 82, potential: 88, form: 7, fitness: 90, isInjured: false },
      { id: 'esp-32', name: 'Oyarzabal', nationId: 'esp', position: 'FWD', age: 28, overall: 85, potential: 86, form: 8, fitness: 88, isInjured: false },
      { id: 'esp-33', name: 'Abel Ruiz', nationId: 'esp', position: 'FWD', age: 25, overall: 81, potential: 86, form: 7, fitness: 90, isInjured: false },
      { id: 'esp-34', name: 'Bryan Zaragoza', nationId: 'esp', position: 'FWD', age: 24, overall: 80, potential: 85, form: 7, fitness: 88, isInjured: false },
      { id: 'esp-35', name: 'Samu Omorodion', nationId: 'esp', position: 'FWD', age: 21, overall: 79, potential: 88, form: 6, fitness: 87, isInjured: false },
      { id: 'esp-36', name: 'Yéremi Pino', nationId: 'esp', position: 'FWD', age: 23, overall: 78, potential: 86, form: 6, fitness: 86, isInjured: false },
    ],
    coach: 'Luis de la Fuente',
    bestPlayer: 'Lamine Yamal',
    preferredFormation: '4-3-3',
    preferredTactic: 'Posesión',
  },
  
  'arg': {
    nation: { id: 'arg', name: 'Argentina', code: 'ARG', flag: '🇦🇷', confederation: 'CONMEBOL', strength: 93 },
    players: [
      // Porteros
      { id: 'arg-1', name: 'Emiliano Martínez', nationId: 'arg', position: 'GK', age: 33, overall: 89, potential: 89, form: 9, fitness: 92, isInjured: false },
      { id: 'arg-2', name: 'Walter Benítez', nationId: 'arg', position: 'GK', age: 32, overall: 82, potential: 82, form: 7, fitness: 88, isInjured: false },
      { id: 'arg-3', name: 'Gerónimo Rulli', nationId: 'arg', position: 'GK', age: 33, overall: 81, potential: 81, form: 6, fitness: 85, isInjured: false },
      { id: 'arg-4', name: 'Franco Armani', nationId: 'arg', position: 'GK', age: 39, overall: 79, potential: 79, form: 6, fitness: 80, isInjured: false },
      // Defensas
      { id: 'arg-5', name: 'Cristian Romero', nationId: 'arg', position: 'DEF', age: 27, overall: 88, potential: 90, form: 8, fitness: 90, isInjured: false },
      { id: 'arg-6', name: 'Lisandro Martínez', nationId: 'arg', position: 'DEF', age: 27, overall: 87, potential: 89, form: 8, fitness: 85, isInjured: false },
      { id: 'arg-7', name: 'Nahuel Molina', nationId: 'arg', position: 'DEF', age: 27, overall: 85, potential: 87, form: 8, fitness: 92, isInjured: false },
      { id: 'arg-8', name: 'Nicolás Otamendi', nationId: 'arg', position: 'DEF', age: 37, overall: 84, potential: 84, form: 7, fitness: 82, isInjured: false },
      { id: 'arg-9', name: 'Marcos Acuña', nationId: 'arg', position: 'DEF', age: 33, overall: 83, potential: 83, form: 7, fitness: 85, isInjured: false },
      { id: 'arg-10', name: 'Gonzalo Montiel', nationId: 'arg', position: 'DEF', age: 28, overall: 82, potential: 84, form: 7, fitness: 88, isInjured: false },
      { id: 'arg-11', name: 'Nicolás Tagliafico', nationId: 'arg', position: 'DEF', age: 32, overall: 84, potential: 84, form: 8, fitness: 90, isInjured: false },
      { id: 'arg-12', name: 'Leandro Paredes', nationId: 'arg', position: 'DEF', age: 30, overall: 82, potential: 83, form: 7, fitness: 85, isInjured: false },
      { id: 'arg-13', name: 'Lucas Martínez Quarta', nationId: 'arg', position: 'DEF', age: 29, overall: 81, potential: 83, form: 7, fitness: 88, isInjured: false },
      { id: 'arg-14', name: 'Valentín Barco', nationId: 'arg', position: 'DEF', age: 21, overall: 79, potential: 88, form: 7, fitness: 90, isInjured: false },
      { id: 'arg-15', name: 'Leonardo Balerdi', nationId: 'arg', position: 'DEF', age: 26, overall: 80, potential: 85, form: 6, fitness: 87, isInjured: false },
      { id: 'arg-16', name: 'Juan Foyth', nationId: 'arg', position: 'DEF', age: 27, overall: 81, potential: 84, form: 6, fitness: 85, isInjured: false },
      // Centrocampistas
      { id: 'arg-17', name: 'Enzo Fernández', nationId: 'arg', position: 'MID', age: 24, overall: 88, potential: 93, form: 8, fitness: 90, isInjured: false },
      { id: 'arg-18', name: 'Alexis Mac Allister', nationId: 'arg', position: 'MID', age: 26, overall: 87, potential: 90, form: 8, fitness: 92, isInjured: false },
      { id: 'arg-19', name: 'Rodrigo De Paul', nationId: 'arg', position: 'MID', age: 31, overall: 86, potential: 86, form: 8, fitness: 90, isInjured: false },
      { id: 'arg-20', name: 'Giovani Lo Celso', nationId: 'arg', position: 'MID', age: 29, overall: 84, potential: 85, form: 8, fitness: 88, isInjured: false },
      { id: 'arg-21', name: 'Exequiel Palacios', nationId: 'arg', position: 'MID', age: 26, overall: 84, potential: 87, form: 7, fitness: 88, isInjured: false },
      { id: 'arg-22', name: 'Thiago Almada', nationId: 'arg', position: 'MID', age: 24, overall: 83, potential: 89, form: 8, fitness: 90, isInjured: false },
      { id: 'arg-23', name: 'Valentín Carboni', nationId: 'arg', position: 'MID', age: 20, overall: 79, potential: 90, form: 7, fitness: 90, isInjured: false },
      { id: 'arg-24', name: 'Facundo Buonanotte', nationId: 'arg', position: 'MID', age: 21, overall: 78, potential: 89, form: 7, fitness: 88, isInjured: false },
      { id: 'arg-25', name: 'Manu Lanzini', nationId: 'arg', position: 'MID', age: 32, overall: 80, potential: 80, form: 6, fitness: 82, isInjured: false },
      { id: 'arg-26', name: 'Ezequiel Fernández', nationId: 'arg', position: 'MID', age: 23, overall: 77, potential: 85, form: 6, fitness: 87, isInjured: false },
      { id: 'arg-27', name: 'Kevin Zenón', nationId: 'arg', position: 'MID', age: 24, overall: 78, potential: 86, form: 7, fitness: 88, isInjured: false },
      { id: 'arg-28', name: 'Pedro De la Vega', nationId: 'arg', position: 'MID', age: 23, overall: 77, potential: 85, form: 6, fitness: 85, isInjured: false },
      // Delanteros
      { id: 'arg-29', name: 'Lionel Messi', nationId: 'arg', position: 'FWD', age: 39, overall: 88, potential: 88, form: 8, fitness: 75, isInjured: false },
      { id: 'arg-30', name: 'Julián Álvarez', nationId: 'arg', position: 'FWD', age: 25, overall: 87, potential: 91, form: 9, fitness: 95, isInjured: false },
      { id: 'arg-31', name: 'Lautaro Martínez', nationId: 'arg', position: 'FWD', age: 28, overall: 88, potential: 89, form: 9, fitness: 92, isInjured: false },
      { id: 'arg-32', name: 'Ángel Di María', nationId: 'arg', position: 'FWD', age: 38, overall: 84, potential: 84, form: 7, fitness: 78, isInjured: false },
      { id: 'arg-33', name: 'Nicolás González', nationId: 'arg', position: 'FWD', age: 27, overall: 84, potential: 86, form: 8, fitness: 90, isInjured: false },
      { id: 'arg-34', name: 'Paulo Dybala', nationId: 'arg', position: 'FWD', age: 32, overall: 85, potential: 85, form: 7, fitness: 82, isInjured: false },
      { id: 'arg-35', name: 'Santiago Giménez', nationId: 'arg', position: 'FWD', age: 24, overall: 82, potential: 88, form: 8, fitness: 90, isInjured: false },
      { id: 'arg-36', name: 'Ángel Correa', nationId: 'arg', position: 'FWD', age: 30, overall: 81, potential: 82, form: 7, fitness: 88, isInjured: false },
    ],
    coach: 'Lionel Scaloni',
    bestPlayer: 'Lionel Messi',
    preferredFormation: '4-3-3',
    preferredTactic: 'Contragolpe',
  },
};

// Generar jugadores para el resto de selecciones
const OTHER_NATIONS = [
  'ger', 'fra', 'eng', 'bra', 'por', 'ned', 'bel', 'ita', 'uru', 'cro',
  'mar', 'mex', 'usa', 'col', 'chi', 'ecu', 'can', 'jpn', 'kor', 'aus',
  'irn', 'sui', 'swe', 'aut', 'hun', 'cze', 'pol', 'den', 'nor', 'srb',
  'wal', 'sco', 'tur', 'gre', 'ukr', 'rus', 'egy', 'sen', 'tun', 'nga',
  'cmr', 'gha', 'alg', 'crc', 'pan', 'jam', 'qat', 'ksa'
];

OTHER_NATIONS.forEach(nationId => {
  if (!NATIONS_DATA[nationId]) {
    const strength = 65 + Math.floor(Math.random() * 25);
    NATIONS_DATA[nationId] = {
      nation: { 
        id: nationId, 
        name: nationId.toUpperCase(), 
        code: nationId.toUpperCase(), 
        flag: '🏳️', 
        confederation: 'UEFA', 
        strength 
      },
      players: generatePlayersForNation(nationId, nationId, strength),
      coach: 'Entrenador',
      bestPlayer: 'Mejor Jugador',
      preferredFormation: '4-3-3',
      preferredTactic: 'Equilibrado',
    };
  }
});

// Función para obtener jugadores de una selección
export function getPlayersByNation(nationId: string): DTPlayer[] {
  return NATIONS_DATA[nationId]?.players || [];
}

// Función para obtener info de una selección
export function getNationInfo(nationId: string) {
  // Primero buscar en NATIONS_DATA (datos completos con jugadores)
  if (NATIONS_DATA[nationId]) {
    return NATIONS_DATA[nationId];
  }
  // Si no está, buscar en DT_NATIONS (lista completa de 48 naciones)
  const nation = DT_NATIONS.find(n => n.id === nationId);
  if (nation) {
    return {
      nation,
      players: generatePlayersForNation(nation.id, nation.name, nation.strength),
      coach: 'Entrenador',
      bestPlayer: 'Jugador Estrella',
      preferredFormation: '4-3-3',
      preferredTactic: 'balanced',
    };
  }
  return null;
}

// Función para obtener todas las selecciones
export function getAllNations(): DTNation[] {
  return DT_NATIONS;
}
