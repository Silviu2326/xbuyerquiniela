// ============================================
// STORE ZUSTAND - FANTASY MUNDIAL 2026
// ============================================

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type {
  FantasyState,
  FantasySquad,
  SquadPlayer,
  Player,
  Prediction,
  Chip,
  LeagueStanding,
  FantasyView,
  Nation,
  Matchday,
} from '../../domain/types';
import { PLAYER_POSITIONS } from '../../domain/types';
import { canAddPlayer, validateSquad, canBeStarter, FORMATION_SLOTS } from '../../domain/rules';

// --- Estado Inicial ---

const createInitialChips = (): Chip[] => [
  { type: 'wildcard', name: 'Comodín Total', description: 'Reconstruye TODA tu selección', icon: '🃏', used: false },
  { type: 'triple-captain', name: 'Triple Capitán', description: 'Capitán ×3 puntos', icon: '👑', used: false },
  { type: 'bench-boost', name: 'Banca Completa', description: 'Suplentes suman puntos', icon: '🪑', used: false },
  { type: 'revelation', name: 'Revelación', description: 'Sub-23 ×2 puntos', icon: '🔮', used: false },
];

const createInitialSquad = (): FantasySquad => ({
  players: [],
  formation: '4-3-3',
  budgetUsed: 0,
  budgetTotal: 100,
});

const initialState: Omit<FantasyState, 'nations' | 'players' | 'matchdays'> = {
  mySquad: createInitialSquad(),
  myPredictions: {},
  myChips: createInitialChips(),
  myScore: {
    totalPoints: 0,
    rank: 0,
    previousRank: 0,
    matchdayPoints: 0,
  },
  leagueStandings: [],
  myDuels: [],
  currentMatchday: 1,
  selectedView: 'dashboard',
};

// --- Actions ---

interface FantasyActions {
  // Navigation
  setView: (view: FantasyView) => void;
  setSelectedUser: (userId: string | undefined) => void;
  
  // Squad Management
  addPlayer: (player: Player) => { success: boolean; message?: string };
  removePlayer: (playerId: string) => void;
  setStarters: (playerIds: string[]) => void;
  setCaptain: (playerId: string) => void;
  setViceCaptain: (playerId: string) => void;
  setFormation: (formation: string) => void;
  validateMySquad: () => { valid: boolean; errors: string[] };
  
  // Predictions
  setPrediction: (matchId: string, prediction: Prediction) => void;
  removePrediction: (matchId: string) => void;
  
  // Chips
  activateChip: (chipType: string) => void;
  deactivateChip: (chipType: string) => void;
  
  // Data Loading
  loadNations: (nations: Nation[]) => void;
  loadPlayers: (players: Player[]) => void;
  loadMatchdays: (matchdays: Matchday[]) => void;
  loadStandings: (standings: LeagueStanding[]) => void;
}

export type FantasyStore = FantasyState & FantasyActions;

// --- Store Creation ---

export const useFantasyStore = create<FantasyStore>()(
  persist(
    (set, get) => ({
      ...initialState,
      nations: [],
      players: [],
      matchdays: [],
      
      // Navigation
      setView: (view) => set({ selectedView: view }),
      setSelectedUser: (userId) => set({ selectedUserId: userId }),
      
      // Squad Management
      addPlayer: (player) => {
        const { mySquad } = get();
        const result = canAddPlayer(mySquad.players, { ...player, isStarter: false, isCaptain: false, isViceCaptain: false });
        
        if (!result.allowed) {
          return { success: false, message: result.reason };
        }
        
        const newPlayer: SquadPlayer = {
          ...player,
          isStarter: canBeStarter(mySquad.players, player.position, mySquad.formation),
          isCaptain: false,
          isViceCaptain: false,
        };
        
        set({
          mySquad: {
            ...mySquad,
            players: [...mySquad.players, newPlayer],
          },
        });
        
        return { success: true };
      },
      
      removePlayer: (playerId) => {
        const { mySquad } = get();
        set({
          mySquad: {
            ...mySquad,
            players: mySquad.players.filter(p => p.id !== playerId),
          },
        });
      },
      
      setStarters: (playerIds) => {
        const { mySquad } = get();
        set({
          mySquad: {
            ...mySquad,
            players: mySquad.players.map(p => ({
              ...p,
              isStarter: playerIds.includes(p.id),
            })),
          },
        });
      },
      
      setCaptain: (playerId) => {
        const { mySquad } = get();
        set({
          mySquad: {
            ...mySquad,
            players: mySquad.players.map(p => ({
              ...p,
              isCaptain: p.id === playerId,
            })),
          },
        });
      },
      
      setViceCaptain: (playerId) => {
        const { mySquad } = get();
        set({
          mySquad: {
            ...mySquad,
            players: mySquad.players.map(p => ({
              ...p,
              isViceCaptain: p.id === playerId,
            })),
          },
        });
      },
      
      setFormation: (formation) => {
        const { mySquad } = get();
        const slots = FORMATION_SLOTS[formation];
        
        if (!slots) return;
        
        // Ajustar titulares según la nueva formación
        const normalizePosition = (pos: string): string => {
          if (pos === 'GK' || pos === PLAYER_POSITIONS.GK || pos === 'POR') return 'GK';
          if (pos === 'DEF' || pos === PLAYER_POSITIONS.DEF) return 'DEF';
          if (pos === 'MID' || pos === PLAYER_POSITIONS.MID || pos === 'MED') return 'MID';
          if (pos === 'FWD' || pos === PLAYER_POSITIONS.FWD || pos === 'DEL') return 'FWD';
          return pos;
        };
        
        const byPosition: Record<string, typeof mySquad.players> = {
          GK: [],
          DEF: [],
          MID: [],
          FWD: [],
        };
        
        for (const player of mySquad.players) {
          const normPos = normalizePosition(player.position);
          byPosition[normPos].push(player);
        }
        
        const limits = {
          GK: slots.GK,
          DEF: slots.DEF,
          MID: slots.MID,
          FWD: slots.FWD,
        };
        
        const newStarters: string[] = [];
        
        (['GK', 'DEF', 'MID', 'FWD'] as const).forEach(pos => {
          const limit = limits[pos];
          const playersInPos = byPosition[pos];
          
          const currentStarters = playersInPos.filter(p => p.isStarter).slice(0, limit);
          newStarters.push(...currentStarters.map(p => p.id));
          
          if (currentStarters.length < limit) {
            const needed = limit - currentStarters.length;
            const benchPlayers = playersInPos.filter(p => !p.isStarter).slice(0, needed);
            newStarters.push(...benchPlayers.map(p => p.id));
          }
        });
        
        set({
          mySquad: {
            ...mySquad,
            formation,
            players: mySquad.players.map(p => ({
              ...p,
              isStarter: newStarters.includes(p.id),
            })),
          },
        });
      },
      
      validateMySquad: () => {
        const errors = validateSquad(get().mySquad.players);
        return {
          valid: errors.length === 0,
          errors: errors.map(e => e.message),
        };
      },
      
      // Predictions
      setPrediction: (matchId, predictionData) => {
        set({
          myPredictions: {
            ...get().myPredictions,
            [matchId]: predictionData,
          },
        });
      },
      
      removePrediction: (matchId) => {
        const { [matchId]: _, ...rest } = get().myPredictions;
        set({ myPredictions: rest });
      },
      
      // Chips
      activateChip: (chipType) => {
        set({
          myChips: get().myChips.map(chip =>
            chip.type === chipType
              ? { ...chip, used: true }
              : chip
          ),
        });
      },
      
      deactivateChip: (chipType) => {
        set({
          myChips: get().myChips.map(chip =>
            chip.type === chipType
              ? { ...chip, used: false }
              : chip
          ),
        });
      },
      
      // Data Loading
      loadNations: (nations) => set({ nations }),
      loadPlayers: (players) => set({ players }),
      loadMatchdays: (matchdays) => set({ matchdays }),
      loadStandings: (standings) => set({ leagueStandings: standings }),
    }),
    {
      name: 'fantasy-storage',
      partialize: (state) => ({
        mySquad: state.mySquad,
        myPredictions: state.myPredictions,
        myChips: state.myChips,
        myScore: state.myScore,
        currentMatchday: state.currentMatchday,
      }),
    }
  )
);

// --- Selectors ---

export const selectMyStarters = (state: FantasyStore) => 
  state.mySquad.players.filter(p => p.isStarter);

export const selectMyBench = (state: FantasyStore) => 
  state.mySquad.players.filter(p => !p.isStarter);

export const selectCaptain = (state: FantasyStore) => 
  state.mySquad.players.find(p => p.isCaptain);

export const selectViceCaptain = (state: FantasyStore) => 
  state.mySquad.players.find(p => p.isViceCaptain);

export const selectUsedChips = (state: FantasyStore) => 
  state.myChips.filter(c => c.used);

export const selectMyStanding = (state: FantasyStore) =>
  state.leagueStandings.find(s => s.isMe);

export const selectPlayersByNation = (state: FantasyStore, nationId: string) =>
  state.players.filter(p => p.nationId === nationId);

export const selectPlayersByPosition = (state: FantasyStore, position: string) =>
  state.players.filter(p => p.position === position);
