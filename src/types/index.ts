// Tipos principales de la aplicación QuinielaMundial 2026

export interface Team {
  c: string; // código de bandera
  g: string; // grupo
  rk: number; // ranking
  coach: string;
  schema: string; // formación
  form: string[]; // últimos 5 resultados
  squad: Player[];
}

export interface Player {
  id: number;
  n: string; // nombre
  p: 'POR' | 'DEF' | 'MED' | 'DEL'; // posición
  club: string;
  v: number; // valor
  s: number; // strength
  h?: number; // capitán del equipo
  nation?: string; // nacionalidad
  flag?: string; // flag code
}

export interface Match {
  id: number | string;
  h: string; // home team
  a: string; // away team
  d?: string; // date (short format: "11 Jun")
  date?: string; // date (full format)
  t?: string; // time (short: "18:00")
  time?: string; // time (full)
  g?: string; // group
  venue?: string;
  city?: string;
  st?: string; // stadium (short)
  live?: boolean;
  hS?: number; // home score (if live)
  aS?: number; // away score (if live)
  min?: string; // minute (if live)
}

export interface Matchday {
  id: number;
  label: string;
  phase: string;
  deadline: string;
  matches: Match[];
}

export interface BetType {
  id: string;
  icon: string;
  label: string;
  desc: string;
  oddsRange: string;
}

export interface Bet {
  id: number;
  match: string;
  matchId: number;
  type: string;
  typeName?: string;
  pick: string;
  odds: number;
  amount: number;
  status: 'pending' | 'won' | 'lost';
  date?: string;
}

export interface Chip {
  id: string;
  name: string;
  desc: string;
  icon: string;
  uses: number;
  total: number;
  phase: string;
  col: string;
}

export interface LeaderboardEntry {
  name: string;
  pts: number;
  rank: number;
  streak: number;
  gw: number; // gameweek points
  me?: boolean; // is current user
}

export interface FantasyState {
  squad: Player[];
  budget: number;
  formation: string;
  captainId: number | null;
  viceCaptainId: number | null;
  predictions: Record<string, {
    [team: string]: {
      xi: number[];
      formation: string;
    };
  }>;
  chips: Chip[];
  pts: number;
  gwPts: number;
  streak: number;
  coins: number;
  xp: number;
  level: number;
}

export interface UIState {
  view: string;
  prevView: string | null;
  filter: string;
  search: string;
  predMatch: string | null;
  predTeam: 'home' | 'away';
  predXI: number[];
  predForm: string;
  timeH: number;
  timeM: number;
  timeS: number;
  online: number;
  lined: number;
}

export interface BettingState {
  bets: Bet[];
  filter: 'all' | 'pending' | 'won' | 'lost';
  step: number;
  selMatch: Match | null;
  selType: BetType | null;
  selPick: string | null;
  selOdds: number;
  selAmount: number;
}

export type TeamsData = Record<string, Team>;

export interface FlagMap {
  [key: string]: string;
}
