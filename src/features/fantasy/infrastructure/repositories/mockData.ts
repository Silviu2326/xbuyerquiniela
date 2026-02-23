// ============================================
// DATOS MOCK - FANTASY MUNDIAL 2026
// ============================================

import type { Nation, Player, Matchday, LeagueStanding } from '../../domain/types';

// --- Naciones ---

export const MOCK_NATIONS: Nation[] = [
  { id: 'esp', name: 'España', code: 'ESP', flag: 'https://flagcdn.com/w80/es.png', group: 'C', eliminated: false },
  { id: 'arg', name: 'Argentina', code: 'ARG', flag: 'https://flagcdn.com/w80/ar.png', group: 'A', eliminated: false },
  { id: 'fra', name: 'Francia', code: 'FRA', flag: 'https://flagcdn.com/w80/fr.png', group: 'D', eliminated: false },
  { id: 'ger', name: 'Alemania', code: 'GER', flag: 'https://flagcdn.com/w80/de.png', group: 'B', eliminated: false },
  { id: 'bra', name: 'Brasil', code: 'BRA', flag: 'https://flagcdn.com/w80/br.png', group: 'G', eliminated: false },
  { id: 'eng', name: 'Inglaterra', code: 'ENG', flag: 'https://flagcdn.com/w80/gb-eng.png', group: 'C', eliminated: false },
  { id: 'por', name: 'Portugal', code: 'POR', flag: 'https://flagcdn.com/w80/pt.png', group: 'F', eliminated: false },
  { id: 'ned', name: 'Países Bajos', code: 'NED', flag: 'https://flagcdn.com/w80/nl.png', group: 'D', eliminated: false },
  { id: 'ita', name: 'Italia', code: 'ITA', flag: 'https://flagcdn.com/w80/it.png', group: 'B', eliminated: false },
  { id: 'uru', name: 'Uruguay', code: 'URU', flag: 'https://flagcdn.com/w80/uy.png', group: 'H', eliminated: false },
  { id: 'bel', name: 'Bélgica', code: 'BEL', flag: 'https://flagcdn.com/w80/be.png', group: 'E', eliminated: false },
  { id: 'cro', name: 'Croacia', code: 'CRO', flag: 'https://flagcdn.com/w80/hr.png', group: 'B', eliminated: false },
  { id: 'usa', name: 'Estados Unidos', code: 'USA', flag: 'https://flagcdn.com/w80/us.png', group: 'A', eliminated: false },
  { id: 'mex', name: 'México', code: 'MEX', flag: 'https://flagcdn.com/w80/mx.png', group: 'A', eliminated: false },
  { id: 'mar', name: 'Marruecos', code: 'MAR', flag: 'https://flagcdn.com/w80/ma.png', group: 'F', eliminated: false },
  { id: 'jpn', name: 'Japón', code: 'JPN', flag: 'https://flagcdn.com/w80/jp.png', group: 'E', eliminated: false },
];

// --- Jugadores ---

export const MOCK_PLAYERS: Player[] = [
  // España
  { id: 'esp-1', name: 'Unai Simón', nationId: 'esp', position: 'GK', value: 55, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'esp-2', name: 'Rodri', nationId: 'esp', position: 'MID', value: 85, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'esp-3', name: 'Lamine Yamal', nationId: 'esp', position: 'FWD', value: 90, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: true },
  { id: 'esp-4', name: 'Nico Williams', nationId: 'esp', position: 'FWD', value: 75, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: true },
  
  // Argentina
  { id: 'arg-1', name: 'Emiliano Martínez', nationId: 'arg', position: 'GK', value: 60, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'arg-2', name: 'Enzo Fernández', nationId: 'arg', position: 'MID', value: 70, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: true },
  { id: 'arg-3', name: 'Julián Álvarez', nationId: 'arg', position: 'FWD', value: 80, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: true },
  { id: 'arg-4', name: 'Lionel Messi', nationId: 'arg', position: 'FWD', value: 95, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  
  // Francia
  { id: 'fra-1', name: 'Mike Maignan', nationId: 'fra', position: 'GK', value: 55, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'fra-2', name: 'Aurélien Tchouaméni', nationId: 'fra', position: 'MID', value: 70, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: true },
  { id: 'fra-3', name: 'Kylian Mbappé', nationId: 'fra', position: 'FWD', value: 110, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'fra-4', name: 'Ousmane Dembélé', nationId: 'fra', position: 'FWD', value: 75, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  
  // Alemania
  { id: 'ger-1', name: 'Marc-André ter Stegen', nationId: 'ger', position: 'GK', value: 60, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'ger-2', name: 'Jamal Musiala', nationId: 'ger', position: 'MID', value: 90, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: true },
  { id: 'ger-3', name: 'Florian Wirtz', nationId: 'ger', position: 'MID', value: 85, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: true },
  { id: 'ger-4', name: 'Kai Havertz', nationId: 'ger', position: 'FWD', value: 70, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  
  // Brasil
  { id: 'bra-1', name: 'Alisson', nationId: 'bra', position: 'GK', value: 60, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'bra-2', name: 'Bruno Guimarães', nationId: 'bra', position: 'MID', value: 65, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'bra-3', name: 'Vinicius Jr.', nationId: 'bra', position: 'FWD', value: 105, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'bra-4', name: 'Endrick', nationId: 'bra', position: 'FWD', value: 70, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: true },
  
  // Inglaterra
  { id: 'eng-1', name: 'Jordan Pickford', nationId: 'eng', position: 'GK', value: 55, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'eng-2', name: 'Jude Bellingham', nationId: 'eng', position: 'MID', value: 100, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: true },
  { id: 'eng-3', name: 'Phil Foden', nationId: 'eng', position: 'MID', value: 85, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'eng-4', name: 'Bukayo Saka', nationId: 'eng', position: 'FWD', value: 90, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: true },
  
  // Portugal
  { id: 'por-1', name: 'Diogo Costa', nationId: 'por', position: 'GK', value: 50, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: true },
  { id: 'por-2', name: 'Bernardo Silva', nationId: 'por', position: 'MID', value: 75, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'por-3', name: 'Cristiano Ronaldo', nationId: 'por', position: 'FWD', value: 70, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'por-4', name: 'Rafael Leão', nationId: 'por', position: 'FWD', value: 80, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  
  // Defensas adicionales para completar
  { id: 'esp-5', name: 'Dani Carvajal', nationId: 'esp', position: 'DEF', value: 55, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'esp-6', name: 'Aymeric Laporte', nationId: 'esp', position: 'DEF', value: 60, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'fra-5', name: 'William Saliba', nationId: 'fra', position: 'DEF', value: 65, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: true },
  { id: 'fra-6', name: 'Jules Koundé', nationId: 'fra', position: 'DEF', value: 60, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'ger-5', name: 'Antonio Rüdiger', nationId: 'ger', position: 'DEF', value: 55, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'ger-6', name: 'Joshua Kimmich', nationId: 'ger', position: 'DEF', value: 65, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'eng-5', name: 'John Stones', nationId: 'eng', position: 'DEF', value: 60, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'eng-6', name: 'Trent Alexander-Arnold', nationId: 'eng', position: 'DEF', value: 65, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'arg-5', name: 'Cristian Romero', nationId: 'arg', position: 'DEF', value: 60, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
  { id: 'arg-6', name: 'Lisandro Martínez', nationId: 'arg', position: 'DEF', value: 55, points: 0, pointsPerMatch: 0, goals: 0, assists: 0, cleanSheets: 0, isU23: false },
];

// --- Jornadas ---

export const MOCK_MATCHDAYS: Matchday[] = [
  {
    id: 1,
    name: 'Jornada 1 - Fase de Grupos',
    phase: 'group',
    deadline: new Date('2026-06-11T18:00:00'),
    isCurrent: true,
    isFinished: false,
    matches: [
      { id: 'm1', homeNationId: 'arg', awayNationId: 'usa', phase: 'group', matchday: 1, date: new Date('2026-06-11T18:00:00'), venue: 'Estadio Azteca', finished: false },
      { id: 'm2', homeNationId: 'mex', awayNationId: 'ita', phase: 'group', matchday: 1, date: new Date('2026-06-11T21:00:00'), venue: 'AT&T Stadium', finished: false },
      { id: 'm3', homeNationId: 'esp', awayNationId: 'cro', phase: 'group', matchday: 1, date: new Date('2026-06-12T18:00:00'), venue: 'Santiago Bernabéu', finished: false },
      { id: 'm4', homeNationId: 'ger', awayNationId: 'bel', phase: 'group', matchday: 1, date: new Date('2026-06-12T21:00:00'), venue: 'Allianz Arena', finished: false },
      { id: 'm5', homeNationId: 'fra', awayNationId: 'ned', phase: 'group', matchday: 1, date: new Date('2026-06-13T18:00:00'), venue: 'Stade de France', finished: false },
      { id: 'm6', homeNationId: 'bra', awayNationId: 'mar', phase: 'group', matchday: 1, date: new Date('2026-06-13T21:00:00'), venue: 'Maracaná', finished: false },
    ],
  },
  {
    id: 2,
    name: 'Jornada 2 - Fase de Grupos',
    phase: 'group',
    deadline: new Date('2026-06-17T18:00:00'),
    isCurrent: false,
    isFinished: false,
    matches: [
      { id: 'm7', homeNationId: 'usa', awayNationId: 'ita', phase: 'group', matchday: 2, date: new Date('2026-06-17T18:00:00'), venue: 'MetLife Stadium', finished: false },
      { id: 'm8', homeNationId: 'arg', awayNationId: 'mex', phase: 'group', matchday: 2, date: new Date('2026-06-17T21:00:00'), venue: 'Estadio Azteca', finished: false },
      { id: 'm9', homeNationId: 'cro', awayNationId: 'bel', phase: 'group', matchday: 2, date: new Date('2026-06-18T18:00:00'), venue: 'Wembley', finished: false },
      { id: 'm10', homeNationId: 'esp', awayNationId: 'ger', phase: 'group', matchday: 2, date: new Date('2026-06-18T21:00:00'), venue: 'Camp Nou', finished: false },
    ],
  },
];

// --- Ranking ---

export const MOCK_STANDINGS: LeagueStanding[] = [
  { userId: 'u1', userName: 'CarlosDT', avatar: '', position: 1, previousPosition: 2, totalPoints: 127, gapToFirst: 0, streak: 4, bestMatchday: 52, isMe: true },
  { userId: 'u2', userName: 'LauraFútbol', avatar: '', position: 2, previousPosition: 1, totalPoints: 124, gapToFirst: 3, streak: 2, bestMatchday: 48, isMe: false },
  { userId: 'u3', userName: 'RodrigoTáctico', avatar: '', position: 3, previousPosition: 3, totalPoints: 119, gapToFirst: 8, streak: 3, bestMatchday: 45, isMe: false },
  { userId: 'u4', userName: 'AnaPredictor', avatar: '', position: 4, previousPosition: 5, totalPoints: 116, gapToFirst: 11, streak: 1, bestMatchday: 51, isMe: false },
  { userId: 'u5', userName: 'MiguelStats', avatar: '', position: 5, previousPosition: 4, totalPoints: 112, gapToFirst: 15, streak: 5, bestMatchday: 39, isMe: false },
  { userId: 'u6', userName: 'SofiaGoleadora', avatar: '', position: 6, previousPosition: 6, totalPoints: 108, gapToFirst: 19, streak: 2, bestMatchday: 44, isMe: false },
  { userId: 'u7', userName: 'DiegoMister', avatar: '', position: 7, previousPosition: 8, totalPoints: 105, gapToFirst: 22, streak: 1, bestMatchday: 42, isMe: false },
  { userId: 'u8', userName: 'ValeriaXI', avatar: '', position: 8, previousPosition: 7, totalPoints: 101, gapToFirst: 26, streak: 3, bestMatchday: 40, isMe: false },
];
