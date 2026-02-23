import type { Matchday, Chip, LeaderboardEntry } from '../types/index.ts';

export const MATCHDAYS: Matchday[] = [
  {
    id: 1,
    label: "Jornada 1",
    phase: "Grupos",
    deadline: "11 Jun 17:00",
    matches: [
      { id: "A1", h: "México", a: "Sudáfrica", d: "11 Jun", t: "18:00", st: "Azteca", g: "A" },
      { id: "A2", h: "Corea del Sur", a: "Cabo Verde", d: "11 Jun", t: "21:00", st: "Akron", g: "A" },
      { id: "B1", h: "Canadá", a: "Paraguay", d: "12 Jun", t: "15:00", st: "BMO Field", g: "B" },
      { id: "B2", h: "EE.UU.", a: "Uruguay", d: "12 Jun", t: "19:00", st: "SoFi", g: "B" },
      { id: "C1", h: "Brasil", a: "Marruecos", d: "13 Jun", t: "14:00", st: "AT&T", g: "C" },
      { id: "C2", h: "Argentina", a: "Colombia", d: "13 Jun", t: "18:00", st: "Hard Rock", g: "C" },
      { id: "D1", h: "España", a: "Croacia", d: "14 Jun", t: "14:00", st: "Arrowhead", g: "D" },
      { id: "D2", h: "Francia", a: "Portugal", d: "14 Jun", t: "19:00", st: "MetLife", g: "D" },
      { id: "E1", h: "Inglaterra", a: "Japón", d: "15 Jun", t: "13:00", st: "Levi's", g: "E" },
    ]
  }
];

export const CHIPS_DEF: Chip[] = [
  {
    id: "wildcard",
    name: "Comodín Total",
    desc: "Reconstruye TODA tu selección una vez en el torneo",
    icon: "🃏",
    uses: 0,
    total: 1,
    phase: "any",
    col: "#D500F9"
  },
  {
    id: "triple_cap",
    name: "Triple Capitán",
    desc: "Tu capitán multiplica ×3 en vez de ×2 esta jornada",
    icon: "👑",
    uses: 0,
    total: 1,
    phase: "any",
    col: "#FFD700"
  },
  {
    id: "bench_boost",
    name: "Banca Completa",
    desc: "Tus suplentes también suman puntos esta jornada",
    icon: "🪑",
    uses: 0,
    total: 1,
    phase: "any",
    col: "#00BCD4"
  },
  {
    id: "free_hit",
    name: "Golpe Libre",
    desc: "Cambios ilimitados solo esta jornada — tu selección vuelve después",
    icon: "⚡",
    uses: 0,
    total: 1,
    phase: "any",
    col: "#FF9800"
  },
  {
    id: "revelation",
    name: "Jugador Revelación",
    desc: "Selecciona un jugador SUB-23 — si anota o asiste suma ×2 puntos",
    icon: "🔮",
    uses: 0,
    total: 3,
    phase: "any",
    col: "#9C27B0"
  }
];

export const LEADERBOARD: LeaderboardEntry[] = [
  { name: "Carlos DT", pts: 127, rank: 1, streak: 4, gw: 52, me: true },
  { name: "LauraFútbol", pts: 124, rank: 2, streak: 2, gw: 48 },
  { name: "RodrigoTáctico", pts: 119, rank: 3, streak: 3, gw: 45 },
  { name: "AnaPredictor", pts: 116, rank: 4, streak: 1, gw: 51 },
  { name: "MiguelStats", pts: 112, rank: 5, streak: 5, gw: 39 },
  { name: "SofiaGoleadora", pts: 108, rank: 6, streak: 2, gw: 44 },
  { name: "DiegoMister", pts: 105, rank: 7, streak: 1, gw: 42 },
  { name: "ValeriaXI", pts: 101, rank: 8, streak: 3, gw: 40 }
];

export const FORMATIONS = [
  "4-3-3",
  "4-4-2",
  "4-2-3-1",
  "3-5-2",
  "3-4-3",
  "5-3-2",
  "5-4-1"
];

export const SCORING_RULES = [
  { l: "Gol (DEL)", v: "+6" },
  { l: "Gol (MED)", v: "+7" },
  { l: "Gol (DEF)", v: "+8" },
  { l: "Asistencia", v: "+3" },
  { l: "Portería a 0 (POR)", v: "+5" },
  { l: "Portería a 0 (DEF)", v: "+4" },
  { l: "3+ paradas (POR)", v: "+2" },
  { l: "Titular (juega 60+ min)", v: "+2" },
  { l: "Suplente (juega menos 60 min)", v: "+1" },
  { l: "Tarjeta amarilla", v: "-1" },
  { l: "Tarjeta roja", v: "-3" },
  { l: "Gol recibido (POR/DEF cada 2)", v: "-1" },
  { l: "Penalti fallado", v: "-2" },
  { l: "Autogol", v: "-2" }
];
