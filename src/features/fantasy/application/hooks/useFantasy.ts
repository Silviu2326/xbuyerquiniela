// ============================================
// HOOKS - FANTASY
// ============================================

import { useMemo } from 'react';
import { useFantasyStore } from '../store/fantasyStore';
import type { Player, PlayerPosition } from '../../domain/types';
import { canAddPlayer, GAME_RULES, validateFormation, FORMATION_SLOTS } from '../../domain/rules';

// --- Hook Principal ---

export function useFantasy() {
  const store = useFantasyStore();
  
  return {
    // State
    mySquad: store.mySquad,
    nations: store.nations,
    players: store.players,
    matchdays: store.matchdays,
    myPredictions: store.myPredictions,
    myChips: store.myChips,
    myScore: store.myScore,
    leagueStandings: store.leagueStandings,
    currentMatchday: store.currentMatchday,
    selectedView: store.selectedView,
    
    // Actions
    setView: store.setView,
    addPlayer: store.addPlayer,
    removePlayer: store.removePlayer,
    setStarters: store.setStarters,
    setCaptain: store.setCaptain,
    setViceCaptain: store.setViceCaptain,
    setFormation: store.setFormation,
    validateMySquad: store.validateMySquad,
    setPrediction: store.setPrediction,
    removePrediction: store.removePrediction,
    activateChip: store.activateChip,
    deactivateChip: store.deactivateChip,
    loadNations: store.loadNations,
    loadPlayers: store.loadPlayers,
    loadMatchdays: store.loadMatchdays,
    loadStandings: store.loadStandings,
  };
}

// --- Hook de Squad ---

export function useSquad() {
  const store = useFantasyStore();
  const { mySquad } = store;
  
  const starters = useMemo(() => mySquad.players.filter(p => p.isStarter), [mySquad.players]);
  const bench = useMemo(() => mySquad.players.filter(p => !p.isStarter), [mySquad.players]);
  const captain = useMemo(() => mySquad.players.find(p => p.isCaptain), [mySquad.players]);
  const viceCaptain = useMemo(() => mySquad.players.find(p => p.isViceCaptain), [mySquad.players]);
  
  const squadStats = useMemo(() => {
    const byNation: Record<string, number> = {};
    const byPosition: Record<PlayerPosition, number> = {
      ['GK']: 0,
      ['DEF']: 0,
      ['MID']: 0,
      ['FWD']: 0,
    };
    
    for (const player of mySquad.players) {
      byNation[player.nationId] = (byNation[player.nationId] || 0) + 1;
      byPosition[player.position]++;
    }
    
    const nationsWithTwo = Object.values(byNation).filter(c => c === 2).length;
    
    return {
      total: mySquad.players.length,
      starters: starters.length,
      bench: bench.length,
      byNation,
      byPosition,
      uniqueNations: Object.keys(byNation).length,
      nationsWithTwo,
      isComplete: mySquad.players.length === GAME_RULES.SQUAD_SIZE,
    };
  }, [mySquad, starters.length, bench.length]);
  
  const canAdd = (player: Player) => {
    return canAddPlayer(mySquad.players, { 
      ...player, 
      isStarter: false, 
      isCaptain: false, 
      isViceCaptain: false, 
    });
  };
  
  const isFormationValid = useMemo(() => {
    return validateFormation(mySquad.formation, starters);
  }, [mySquad.formation, starters]);
  
  const formationSlots = useMemo(() => {
    return FORMATION_SLOTS[mySquad.formation];
  }, [mySquad.formation]);
  
  return {
    squad: mySquad,
    starters,
    bench,
    captain,
    viceCaptain,
    stats: squadStats,
    formation: mySquad.formation,
    canAdd,
    isFormationValid,
    formationSlots,
    addPlayer: store.addPlayer,
    removePlayer: store.removePlayer,
    setStarters: store.setStarters,
    setCaptain: store.setCaptain,
    setViceCaptain: store.setViceCaptain,
    setFormation: store.setFormation,
  };
}

// --- Hook de Jugadores Disponibles ---

export function useAvailablePlayers(nationId?: string, position?: PlayerPosition) {
  const { players, nations, mySquad } = useFantasyStore();
  
  const filteredPlayers = useMemo(() => {
    let result = players;
    
    if (nationId) {
      result = result.filter(p => p.nationId === nationId);
    }
    
    if (position) {
      result = result.filter(p => p.position === position);
    }
    
    // Marcar si ya están en el equipo
    return result.map(p => ({
      ...p,
      isInSquad: mySquad.players.some(sp => sp.id === p.id),
    }));
  }, [players, nationId, position, mySquad.players]);
  
  const nationsList = useMemo(() => {
    return nations.map(n => ({
      ...n,
      playersCount: mySquad.players.filter(p => p.nationId === n.id).length,
    }));
  }, [nations, mySquad.players]);
  
  return {
    players: filteredPlayers,
    nations: nationsList,
    totalCount: filteredPlayers.length,
  };
}

// --- Hook de Predicciones ---

export function usePredictions() {
  const { myPredictions, matchdays, setPrediction, removePrediction } = useFantasyStore();
  
  const currentMatchday = useMemo(() => {
    return matchdays.find(m => m.isCurrent);
  }, [matchdays]);
  
  const predictionsForCurrentMatchday = useMemo(() => {
    if (!currentMatchday) return [];
    
    return currentMatchday.matches.map(match => ({
      match,
      prediction: myPredictions[match.id],
    }));
  }, [currentMatchday, myPredictions]);
  
  const stats = useMemo(() => {
    const predictions = Object.values(myPredictions);
    return {
      total: predictions.length,
      totalPoints: predictions.reduce((sum, p) => sum + (p.points || 0), 0),
    };
  }, [myPredictions]);
  
  return {
    predictions: myPredictions,
    currentMatchday,
    predictionsForCurrentMatchday,
    stats,
    setPrediction,
    removePrediction,
  };
}

// --- Hook de Ranking ---

export function useRanking() {
  const { leagueStandings } = useFantasyStore();
  
  const myStanding = useMemo(() => {
    return leagueStandings.find(s => s.isMe);
  }, [leagueStandings]);
  
  const topThree = useMemo(() => {
    return leagueStandings.slice(0, 3);
  }, [leagueStandings]);
  
  const aroundMe = useMemo(() => {
    if (!myStanding) return [];
    
    const myIndex = leagueStandings.findIndex(s => s.isMe);
    const start = Math.max(0, myIndex - 2);
    const end = Math.min(leagueStandings.length, myIndex + 3);
    
    return leagueStandings.slice(start, end);
  }, [leagueStandings, myStanding]);
  
  return {
    standings: leagueStandings,
    myStanding,
    topThree,
    aroundMe,
    totalParticipants: leagueStandings.length,
  };
}

// --- Hook de Comodines ---

export function useChips() {
  const { myChips, activateChip, deactivateChip } = useFantasyStore();
  
  const usedChips = useMemo(() => {
    return myChips.filter(c => c.used);
  }, [myChips]);
  
  const availableChips = useMemo(() => {
    return myChips.filter(c => !c.used);
  }, [myChips]);
  
  return {
    allChips: myChips,
    availableChips,
    usedChips,
    hasUsedChip: usedChips.length > 0,
    activateChip,
    deactivateChip,
  };
}
