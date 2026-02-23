// ============================================
// TIPOS DEL FANTASY - Mundial 2026
// ============================================

// --- Enums básicos ---

export type PlayerPosition = 'GK' | 'DEF' | 'MID' | 'FWD';

export const PLAYER_POSITIONS = {
  GK: 'GK' as const,
  DEF: 'DEF' as const,
  MID: 'MID' as const,
  FWD: 'FWD' as const,
};

export type MatchPhase = 
  | 'group'
  | 'round-of-16'
  | 'quarter'
  | 'semi'
  | 'third-place'
  | 'final';

export type ChipType = 'wildcard' | 'triple-captain' | 'bench-boost' | 'revelation';

// --- Entidades base ---

export interface Nation {
  id: string;
  name: string;
  code: string;      // Código FIFA (ESP, ARG, etc.)
  flag: string;      // URL del flag
  group: string;
  eliminated: boolean;
}

export interface Player {
  id: string;
  name: string;
  nationId: string;
  position: PlayerPosition;
  value: number;     // Valor en millones
  points: number;    // Puntos totales acumulados
  pointsPerMatch: number;
  goals: number;
  assists: number;
  cleanSheets: number;
  isU23: boolean;    // Para chip de revelación
  image?: string;
}

export interface Match {
  id: string;
  homeNationId: string;
  awayNationId: string;
  phase: MatchPhase;
  matchday: number;
  date: Date;
  venue: string;
  homeScore?: number;
  awayScore?: number;
  finished: boolean;
}

export interface Matchday {
  id: number;
  name: string;
  phase: MatchPhase;
  deadline: Date;
  matches: Match[];
  isCurrent: boolean;
  isFinished: boolean;
}

// --- Fantasy Squad ---

export interface SquadPlayer extends Player {
  isStarter: boolean;
  isCaptain: boolean;
  isViceCaptain: boolean;
}

export interface FantasySquad {
  players: SquadPlayer[];
  formation: string;  // "4-3-3", "4-4-2", etc.
  budgetUsed: number;
  budgetTotal: number;
}

// --- Predicciones ---

export interface Prediction {
  matchId: string;
  homeScore: number;
  awayScore: number;
  points?: number;   // Puntos ganados por esta predicción
}

// --- Chips ---

export interface Chip {
  type: ChipType;
  name: string;
  description: string;
  used: boolean;
  usedInMatchday?: number;
  icon: string;
}

// --- Duelos ---

export type DuelStatus = 'pending' | 'active' | 'finished';
export type DuelType = 'head-to-head' | 'highest-score' | 'exact-predictions';

export interface Duel {
  id: string;
  type: DuelType;
  opponent: {
    id: string;
    name: string;
    avatar: string;
    rank: number;
  };
  status: DuelStatus;
  myScore: number;
  opponentScore: number;
  matchday: number;
  createdAt: Date;
  expiresAt: Date;
  reward?: string;
}

export interface DuelUser {
  id: string;
  name: string;
  avatar: string;
  rank: number;
  points: number;
}

// --- Ranking ---

export interface UserScore {
  totalPoints: number;
  rank: number;
  previousRank: number;
  matchdayPoints: number;
}

export interface LeagueStanding {
  userId: string;
  userName: string;
  avatar: string;
  position: number;
  previousPosition: number;
  totalPoints: number;
  gapToFirst: number;
  streak: number;
  bestMatchday: number;
  isMe: boolean;
}

// --- Estado Global ---

export type FantasyView = 
  | 'dashboard'
  | 'squad'
  | 'players'
  | 'predictions'
  | 'duels'
  | 'chips'
  | 'ranking'
  | 'user-detail';

export interface FantasyState {
  // Datos base
  nations: Nation[];
  players: Player[];
  matchdays: Matchday[];
  
  // Mi estado
  mySquad: FantasySquad;
  myPredictions: Record<string, Prediction>;
  myChips: Chip[];
  myScore: UserScore;
  
  // Ranking
  leagueStandings: LeagueStanding[];
  
  // Duelos
  myDuels: Duel[];
  
  // UI State
  currentMatchday: number;
  selectedView: FantasyView;
  selectedUserId?: string;
}
