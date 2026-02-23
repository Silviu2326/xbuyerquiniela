import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { DT_NATIONS } from '../data/players';

export type PlayerPosition = 'GK' | 'DEF' | 'MID' | 'FWD';
export type MatchPhase = 'group' | 'round-of-32' | 'round-of-16' | 'quarter' | 'semi' | 'third-place' | 'final';
export type TrainingType = 'tactical' | 'physical' | 'technical' | 'rest';
export type TrainingIntensity = 'low' | 'medium' | 'high';

export interface DTNation {
  id: string;
  name: string;
  code: string;
  flag: string;
  confederation: string;
  strength: number;
}

export interface DTPlayer {
  id: string;
  name: string;
  nationId: string;
  position: PlayerPosition;
  age: number;
  overall: number;
  potential: number;
  form: number;
  fitness: number;
  isInjured: boolean;
  injuryWeeks?: number;
  isSuspended?: boolean;
  yellowCards?: number;
  stats?: DTPlayerStats;
}

export interface DTPlayerStats {
  playerId: string;
  matchesPlayed: number;
  matchesStarted: number;
  minutesPlayed: number;
  goals: number;
  assists: number;
  yellowCards: number;
  redCards: number;
  shots: number;
  shotsOnTarget: number;
  passes: number;
  passesCompleted: number;
  tackles: number;
  interceptions: number;
  saves?: number; // For GKs
  cleanSheets?: number; // For GKs
  rating: number; // Average match rating (0-10)
  motm: number; // Man of the match awards
}

export interface DTMatchEvent {
  minute: number;
  type: 'goal' | 'yellow' | 'red' | 'sub' | 'injury';
  playerId: string;
  teamId: string;
  description: string;
}

export interface DTMatch {
  id: string;
  matchday: number;
  homeNationId: string;
  awayNationId: string;
  homeScore: number;
  awayScore: number;
  phase: MatchPhase;
  venue: string;
  played: boolean;
  events: DTMatchEvent[];
  userIsHome?: boolean;
  penaltyHomeScore?: number;
  penaltyAwayScore?: number;
  round?: string;
}

export interface DTGroupStanding {
  nationId: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export interface DTGroup {
  id: string;
  name: string;
  teams: string[];
  standings: DTGroupStanding[];
  matches: DTMatch[];
}

export interface DTRandomEvent {
  id: string;
  type: 'injury' | 'suspension' | 'morale' | 'rival_injury' | 'media' | 'recovery';
  title: string;
  description: string;
  playerId?: string;
  playerName?: string;
  effect: 'positive' | 'negative' | 'neutral';
}

export interface DTTournament {
  groups: DTGroup[];
  knockoutMatches: DTMatch[];
  currentPhase: MatchPhase;
  userGroupId: string;
  currentMatchIndex: number;
  qualified: boolean;
  eliminated: boolean;
  finalPosition?: number;
  currentRound?: string;
}

export interface DTBadge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: Date;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface DTTrainingSession {
  type: TrainingType;
  intensity: TrainingIntensity;
  completed: boolean;
  effects: {
    fitnessChange: number;
    formChange: number;
    moraleChange: number;
    injuryRisk: number;
  };
  results?: {
    injuredPlayers: string[];
    improvedPlayers: string[];
  };
}

export interface DTCareer {
  id: string;
  name: string;
  nationId: string;
  createdAt: Date;
  currentDate: Date;
  matches: DTMatch[];
  squad: DTPlayer[];
  formation: string;
  tactic: string;
  stats: {
    played: number;
    won: number;
    drawn: number;
    lost: number;
    goalsFor: number;
    goalsAgainst: number;
  };
  badges: DTBadge[];
  tournament: DTTournament | null;
  currentMatch: DTMatch | null;
  randomEvent: DTRandomEvent | null;
  saved: boolean;
  lastTraining?: DTTrainingSession;
  canTrain: boolean;
  playerStats: Record<string, DTPlayerStats>; // playerId -> stats
  topScorers: { playerId: string; name: string; goals: number }[];
  starters: string[]; // IDs de los 11 titulares
}

interface DTState {
  careers: DTCareer[];
  currentCareer: DTCareer | null;
  currentView: 'landing' | 'nation-select' | 'squad-selection' | 'home' | 'lineup' | 'match-setup' | 'fixture' | 'match' | 'match-result' | 'tournament-end' | 'tutorial' | 'badges' | 'training' | 'stats' | 'standings';
}

interface DTActions {
  setView: (view: DTState['currentView']) => void;
  createCareer: (nation: DTNation, careerName: string) => DTCareer;
  setCurrentCareer: (career: DTCareer | null) => void;
  deleteCareer: (careerId: string) => void;
  updateCareer: (career: DTCareer) => void;
  initTournament: () => void;
  playNextMatch: () => boolean;
  finishMatch: (homeScore: number, awayScore: number, events: DTMatchEvent[]) => void;
  generateRandomEvent: () => void;
  dismissRandomEvent: () => void;
  checkQualification: () => void;
  initKnockoutPhase: () => void;
  advanceToNextRound: () => void;
  finishTournament: (finalPosition: number) => void;
  completeTraining: (type: TrainingType, intensity: TrainingIntensity) => void;
  resetTraining: () => void;
}

const initialState: DTState = {
  careers: [],
  currentCareer: null,
  currentView: 'landing',
};

// Random events between matches
const RANDOM_EVENTS: Omit<DTRandomEvent, 'id'>[] = [
  {
    type: 'injury',
    title: 'Lesión en entrenamiento',
    description: 'se ha lesionado durante el calentamiento. Estará fuera 1-2 semanas.',
    effect: 'negative',
  },
  {
    type: 'suspension',
    title: 'Acumulación de amarillas',
    description: 'ha acumulado tarjetas amarillas y no podrá jugar el próximo partido.',
    effect: 'negative',
  },
  {
    type: 'morale',
    title: 'Gran ambiente en el vestuario',
    description: 'El equipo está muy unido y motivado. La moral sube.',
    effect: 'positive',
  },
  {
    type: 'rival_injury',
    title: 'Baja importante del rival',
    description: 'Una estrella del equipo contrario se ha lesionado. No jugará contra ti.',
    effect: 'positive',
  },
  {
    type: 'media',
    title: 'Rueda de prensa polémica',
    description: 'Tus declaraciones han generado polémica. La presión mediática aumenta.',
    effect: 'neutral',
  },
  {
    type: 'morale',
    title: 'Problemas disciplinarios',
    description: 'Dos jugadores han discutido en el entrenamiento. El ambiente está tenso.',
    effect: 'negative',
  },
  {
    type: 'recovery',
    title: 'Recuperación sorprendente',
    description: 'se ha recuperado antes de lo esperado. Estará disponible para el próximo partido.',
    effect: 'positive',
  },
];

// Generate random groups for 48 teams using real nations
function generateTournament(userNationId: string): DTTournament {
  const groups: DTGroup[] = [];
  
  // Crear copia de las naciones y mezclarlas aleatoriamente
  const availableNations = [...DT_NATIONS].filter(n => n.id !== userNationId);
  // Fisher-Yates shuffle
  for (let i = availableNations.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [availableNations[i], availableNations[j]] = [availableNations[j], availableNations[i]];
  }
  
  const userGroupIndex = Math.floor(Math.random() * 12);
  const userPositionInGroup = Math.floor(Math.random() * 4);
  
  for (let i = 0; i < 12; i++) {
    const groupTeams: string[] = [];
    for (let j = 0; j < 4; j++) {
      if (i === userGroupIndex && j === userPositionInGroup) {
        groupTeams.push(userNationId);
      } else {
        const nation = availableNations.pop();
        if (nation) groupTeams.push(nation.id);
      }
    }
    
    const groupMatches: DTMatch[] = [
      { id: `g${i}-m1`, matchday: 1, homeNationId: groupTeams[0], awayNationId: groupTeams[1], homeScore: 0, awayScore: 0, phase: 'group', venue: '', played: false, events: [] },
      { id: `g${i}-m2`, matchday: 1, homeNationId: groupTeams[2], awayNationId: groupTeams[3], homeScore: 0, awayScore: 0, phase: 'group', venue: '', played: false, events: [] },
      { id: `g${i}-m3`, matchday: 2, homeNationId: groupTeams[0], awayNationId: groupTeams[2], homeScore: 0, awayScore: 0, phase: 'group', venue: '', played: false, events: [] },
      { id: `g${i}-m4`, matchday: 2, homeNationId: groupTeams[1], awayNationId: groupTeams[3], homeScore: 0, awayScore: 0, phase: 'group', venue: '', played: false, events: [] },
      { id: `g${i}-m5`, matchday: 3, homeNationId: groupTeams[0], awayNationId: groupTeams[3], homeScore: 0, awayScore: 0, phase: 'group', venue: '', played: false, events: [] },
      { id: `g${i}-m6`, matchday: 3, homeNationId: groupTeams[1], awayNationId: groupTeams[2], homeScore: 0, awayScore: 0, phase: 'group', venue: '', played: false, events: [] },
    ];
    
    groups.push({
      id: `group-${i}`,
      name: String.fromCharCode(65 + i),
      teams: groupTeams,
      standings: groupTeams.map(nationId => ({
        nationId,
        played: 0,
        won: 0,
        drawn: 0,
        lost: 0,
        goalsFor: 0,
        goalsAgainst: 0,
        points: 0,
      })),
      matches: groupMatches,
    });
  }
  
  return {
    groups,
    knockoutMatches: [],
    currentPhase: 'group',
    userGroupId: `group-${userGroupIndex}`,
    currentMatchIndex: 0,
    qualified: false,
    eliminated: false,
  };
}

// Simulate other matches in the group for the same matchday
function simulateOtherMatches(group: DTGroup, userNationId: string, currentMatchday: number) {
  const updatedMatches = group.matches.map(match => {
    // Solo simular partidos de la misma jornada que no sean del usuario y no estén jugados
    if (match.matchday === currentMatchday && 
        !match.played && 
        match.homeNationId !== userNationId && 
        match.awayNationId !== userNationId) {
      return {
        ...match,
        homeScore: Math.floor(Math.random() * 4),
        awayScore: Math.floor(Math.random() * 4),
        played: true,
      };
    }
    return match;
  });
  group.matches = updatedMatches;
}

// Calculate group standings
function calculateStandings(group: DTGroup): DTGroupStanding[] {
  const standings = group.teams.map(teamId => {
    const teamMatches = group.matches.filter(
      m => m.played && (m.homeNationId === teamId || m.awayNationId === teamId)
    );
    
    let played = 0, won = 0, drawn = 0, lost = 0, goalsFor = 0, goalsAgainst = 0, points = 0;
    
    teamMatches.forEach(match => {
      played++;
      const isHome = match.homeNationId === teamId;
      const teamGoals = isHome ? match.homeScore : match.awayScore;
      const oppGoals = isHome ? match.awayScore : match.homeScore;
      
      goalsFor += teamGoals;
      goalsAgainst += oppGoals;
      
      if (teamGoals > oppGoals) {
        won++;
        points += 3;
      } else if (teamGoals === oppGoals) {
        drawn++;
        points += 1;
      } else {
        lost++;
      }
    });
    
    return {
      nationId: teamId,
      played,
      won,
      drawn,
      lost,
      goalsFor,
      goalsAgainst,
      points,
    };
  });
  
  return standings.sort((a, b) => {
    const gdA = a.goalsFor - a.goalsAgainst;
    const gdB = b.goalsFor - b.goalsAgainst;
    if (b.points !== a.points) return b.points - a.points;
    if (gdB !== gdA) return gdB - gdA;
    return b.goalsFor - a.goalsFor;
  });
}

// Generate knockout bracket (simplified - 32 teams)
function generateKnockoutBracket(userNationId: string): DTMatch[] {
  const rounds: DTMatch[] = [];
  
  // Round of 32
  for (let i = 0; i < 16; i++) {
    rounds.push({
      id: `r32-${i}`,
      matchday: 4,
      homeNationId: i === 0 ? userNationId : `qualifier-${i * 2}`,
      awayNationId: i === 0 ? `qualifier-${i * 2 + 1}` : `qualifier-${i * 2 + 1}`,
      homeScore: 0,
      awayScore: 0,
      phase: 'round-of-32',
      round: '16avos de Final',
      venue: '',
      played: false,
      events: [],
    });
  }
  
  // Round of 16
  for (let i = 0; i < 8; i++) {
    rounds.push({
      id: `r16-${i}`,
      matchday: 5,
      homeNationId: `winner-r32-${i * 2}`,
      awayNationId: `winner-r32-${i * 2 + 1}`,
      homeScore: 0,
      awayScore: 0,
      phase: 'round-of-16',
      round: 'Octavos de Final',
      venue: '',
      played: false,
      events: [],
    });
  }
  
  // Quarter Finals
  for (let i = 0; i < 4; i++) {
    rounds.push({
      id: `qf-${i}`,
      matchday: 6,
      homeNationId: `winner-r16-${i * 2}`,
      awayNationId: `winner-r16-${i * 2 + 1}`,
      homeScore: 0,
      awayScore: 0,
      phase: 'quarter',
      round: 'Cuartos de Final',
      venue: '',
      played: false,
      events: [],
    });
  }
  
  // Semi Finals
  for (let i = 0; i < 2; i++) {
    rounds.push({
      id: `sf-${i}`,
      matchday: 7,
      homeNationId: `winner-qf-${i * 2}`,
      awayNationId: `winner-qf-${i * 2 + 1}`,
      homeScore: 0,
      awayScore: 0,
      phase: 'semi',
      round: 'Semifinal',
      venue: '',
      played: false,
      events: [],
    });
  }
  
  // Third Place
  rounds.push({
    id: 'tp-0',
    matchday: 8,
    homeNationId: 'loser-sf-0',
    awayNationId: 'loser-sf-1',
    homeScore: 0,
    awayScore: 0,
    phase: 'third-place',
    round: 'Tercer Puesto',
    venue: '',
    played: false,
    events: [],
  });
  
  // Final
  rounds.push({
    id: 'final-0',
    matchday: 8,
    homeNationId: 'winner-sf-0',
    awayNationId: 'winner-sf-1',
    homeScore: 0,
    awayScore: 0,
    phase: 'final',
    round: 'Final',
    venue: '',
    played: false,
    events: [],
  });
  
  return rounds;
}

export const useDTStore = create<DTState & DTActions>()(
  persist(
    (set, get) => ({
      ...initialState,

      setView: (view) => set({ currentView: view }),

      createCareer: (nation, careerName) => {
        const newCareer: DTCareer = {
          id: `career-${Date.now()}`,
          name: careerName || `Carrera ${nation.name}`,
          nationId: nation.id,
          createdAt: new Date(),
          currentDate: new Date('2026-06-11'),
          matches: [],
          squad: [],
          formation: '4-3-3',
          tactic: 'balanced',
          stats: {
            played: 0,
            won: 0,
            drawn: 0,
            lost: 0,
            goalsFor: 0,
            goalsAgainst: 0,
          },
          badges: [],
          tournament: null,
          currentMatch: null,
          randomEvent: null,
          saved: true,
          canTrain: true,
          playerStats: {},
          topScorers: [],
          starters: [],
        };

        set({
          careers: [...get().careers, newCareer],
          currentCareer: newCareer,
        });

        return newCareer;
      },

      setCurrentCareer: (career) => set({ currentCareer: career }),

      deleteCareer: (careerId) => {
        const { careers, currentCareer } = get();
        const newCareers = careers.filter((c) => c.id !== careerId);
        set({
          careers: newCareers,
          currentCareer: currentCareer?.id === careerId ? null : currentCareer,
        });
      },

      updateCareer: (career) => {
        const { careers, currentCareer } = get();
        const updatedCareers = careers.map((c) =>
          c.id === career.id ? career : c
        );
        set({
          careers: updatedCareers,
          currentCareer:
            currentCareer?.id === career.id ? career : currentCareer,
        });
      },

      initTournament: () => {
        const { currentCareer } = get();
        if (!currentCareer) return;

        const tournament = generateTournament(currentCareer.nationId);
        const userGroup = tournament.groups.find(g => g.id === tournament.userGroupId);
        // Buscar el primer partido del usuario (no cualquiera del grupo)
        const firstMatch = userGroup?.matches.find(m => 
          m.homeNationId === currentCareer.nationId || m.awayNationId === currentCareer.nationId
        );

        const updatedCareer = {
          ...currentCareer,
          tournament,
          currentMatch: firstMatch || null,
        };

        set({
          currentCareer: updatedCareer,
          currentView: 'home',
        });

        get().updateCareer(updatedCareer);
      },

      playNextMatch: () => {
        const { currentCareer } = get();
        console.log('playNextMatch called, currentCareer:', currentCareer?.id);
        console.log('tournament:', currentCareer?.tournament ? 'exists' : 'null');
        
        if (!currentCareer || !currentCareer.tournament) {
          console.log('No career or tournament');
          return false;
        }

        const tournament = currentCareer.tournament;
        let nextMatch = null;
        
        // If in group stage
        if (tournament.currentPhase === 'group') {
          const userGroup = tournament.groups.find(g => g.id === tournament.userGroupId);
          console.log('User group:', userGroup?.name);
          console.log('Matches in group:', userGroup?.matches.length);
          console.log('Played matches:', userGroup?.matches.filter(m => m.played).length);
          console.log('Unplayed matches:', userGroup?.matches.filter(m => !m.played).length);
          
          if (userGroup) {
            // Buscar solo los partidos del usuario (no todos los del grupo)
            nextMatch = userGroup.matches.find(m => 
              !m.played && (m.homeNationId === currentCareer.nationId || m.awayNationId === currentCareer.nationId)
            );
            console.log('Next match found:', nextMatch?.id);
          }
        } else {
          // In knockout phase
          nextMatch = tournament.knockoutMatches.find(m => 
            !m.played && (m.homeNationId === currentCareer.nationId || m.awayNationId === currentCareer.nationId)
          );
        }
        
        if (nextMatch) {
          const updatedCareer = {
            ...currentCareer,
            currentMatch: nextMatch,
          };
          set({ currentCareer: updatedCareer });
          console.log('Match loaded successfully:', nextMatch.id);
          return true;
        }
        
        console.log('No next match found');
        return false;
      },

      finishMatch: (homeScore, awayScore, events) => {
        const { currentCareer, generateRandomEvent, checkQualification, advanceToNextRound } = get();
        if (!currentCareer || !currentCareer.currentMatch || !currentCareer.tournament) return;

        const match = currentCareer.currentMatch;
        const isUserHome = match.homeNationId === currentCareer.nationId;
        const userGoals = isUserHome ? homeScore : awayScore;
        const opponentGoals = isUserHome ? awayScore : homeScore;
        
        // Check for yellow/red cards to update player status
        const updatedSquad = [...currentCareer.squad];
        events.forEach(event => {
          if (event.type === 'yellow' && event.playerId) {
            const player = updatedSquad.find(p => p.id === event.playerId);
            if (player) {
              player.yellowCards = (player.yellowCards || 0) + 1;
              if (player.yellowCards >= 2) {
                player.isSuspended = true;
              }
            }
          }
          if (event.type === 'red' && event.playerId) {
            const player = updatedSquad.find(p => p.id === event.playerId);
            if (player) {
              player.isSuspended = true;
            }
          }
          if (event.type === 'injury' && event.playerId) {
            const player = updatedSquad.find(p => p.id === event.playerId);
            if (player) {
              player.isInjured = true;
              player.injuryWeeks = 1 + Math.floor(Math.random() * 2);
            }
          }
        });
        
        // Clear suspensions for next match (single match suspension)
        updatedSquad.forEach(player => {
          if (player.isSuspended) {
            player.isSuspended = false;
            player.yellowCards = 0;
          }
          // Recover from injury
          if (player.isInjured && player.injuryWeeks) {
            player.injuryWeeks--;
            if (player.injuryWeeks <= 0) {
              player.isInjured = false;
              player.injuryWeeks = undefined;
            }
          }
        });

        const updatedMatch = {
          ...match,
          homeScore,
          awayScore,
          events,
          played: true,
        };

        // Update based on phase
        let tournament: DTTournament;
        if (match.phase === 'group') {
          const groupIndex = currentCareer.tournament.groups.findIndex(g => g.id === currentCareer.tournament?.userGroupId);
          if (groupIndex >= 0) {
            // Crear copia profunda del grupo para modificar
            const originalGroup = currentCareer.tournament.groups[groupIndex];
            const group: DTGroup = { 
              ...originalGroup,
              matches: [...originalGroup.matches],
              standings: [...originalGroup.standings],
              teams: [...originalGroup.teams]
            };
            
            const matchIndex = group.matches.findIndex(m => m.id === match.id);
            if (matchIndex >= 0) {
              group.matches[matchIndex] = { ...updatedMatch };
            }
            // Simular solo los partidos de la misma jornada
            simulateOtherMatches(group, currentCareer.nationId, match.matchday);
            group.standings = calculateStandings(group);
            
            // Crear copia profunda del torneo con el grupo actualizado
            tournament = { 
              ...currentCareer.tournament,
              groups: currentCareer.tournament.groups.map((g, i) => i === groupIndex ? group : { ...g }),
              knockoutMatches: [...currentCareer.tournament.knockoutMatches]
            };
          } else {
            tournament = { 
              ...currentCareer.tournament,
              groups: currentCareer.tournament.groups.map(g => ({ ...g })),
              knockoutMatches: [...currentCareer.tournament.knockoutMatches]
            };
          }
        } else {
          // Knockout phase
          tournament = { 
            ...currentCareer.tournament,
            groups: currentCareer.tournament.groups.map(g => ({ ...g })),
            knockoutMatches: [...currentCareer.tournament.knockoutMatches]
          };
          const koIndex = tournament.knockoutMatches.findIndex(m => m.id === match.id);
          if (koIndex >= 0) {
            tournament.knockoutMatches[koIndex] = { ...updatedMatch };
          }
        }

        // Update player stats
        const playerStats = { ...currentCareer.playerStats };
        
        // Generate stats for each player in squad
        currentCareer.squad.forEach(player => {
          const existingStats = playerStats[player.id] || {
            playerId: player.id,
            matchesPlayed: 0,
            matchesStarted: 0,
            minutesPlayed: 0,
            goals: 0,
            assists: 0,
            yellowCards: 0,
            redCards: 0,
            shots: 0,
            shotsOnTarget: 0,
            passes: 0,
            passesCompleted: 0,
            tackles: 0,
            interceptions: 0,
            saves: player.position === 'GK' ? 0 : undefined,
            cleanSheets: player.position === 'GK' ? 0 : undefined,
            rating: 0,
            motm: 0,
          };

          // Only update stats for players who played (not injured/suspended)
          if (!player.isInjured && !player.isSuspended) {
            const isStarter = Math.random() > 0.3; // 70% chance of starting
            const minutes = isStarter ? (Math.random() > 0.7 ? 90 : Math.floor(60 + Math.random() * 30)) : Math.floor(Math.random() * 30);
            
            // Calculate goals from events
            const playerGoals = events.filter(e => e.type === 'goal' && e.playerId === player.id).length;
            
            // Generate realistic stats based on position and overall
            const multiplier = player.overall / 100;
            const positionMultiplier = player.position === 'FWD' ? 1.2 : player.position === 'MID' ? 1 : 0.8;
            
            const newStats = {
              ...existingStats,
              matchesPlayed: existingStats.matchesPlayed + 1,
              matchesStarted: existingStats.matchesStarted + (isStarter ? 1 : 0),
              minutesPlayed: existingStats.minutesPlayed + minutes,
              goals: existingStats.goals + playerGoals,
              yellowCards: existingStats.yellowCards + events.filter(e => e.type === 'yellow' && e.playerId === player.id).length,
              redCards: existingStats.redCards + events.filter(e => e.type === 'red' && e.playerId === player.id).length,
              shots: existingStats.shots + Math.floor(Math.random() * 4 * positionMultiplier),
              shotsOnTarget: existingStats.shotsOnTarget + Math.floor(Math.random() * 2 * positionMultiplier),
              passes: existingStats.passes + Math.floor(20 + Math.random() * 40 * multiplier),
              passesCompleted: existingStats.passesCompleted + Math.floor((20 + Math.random() * 40 * multiplier) * (0.7 + Math.random() * 0.25)),
              tackles: existingStats.tackles + (player.position === 'DEF' || player.position === 'MID' ? Math.floor(Math.random() * 5) : 0),
              interceptions: existingStats.interceptions + (player.position === 'DEF' || player.position === 'MID' ? Math.floor(Math.random() * 4) : 0),
            };

            // GK stats
            if (player.position === 'GK') {
              newStats.saves = (existingStats.saves || 0) + Math.floor(Math.random() * 5);
              if (opponentGoals === 0) {
                newStats.cleanSheets = (existingStats.cleanSheets || 0) + 1;
              }
            }

            // Calculate match rating (0-10)
            let rating = 6.0; // Base rating
            if (playerGoals > 0) rating += playerGoals * 1.5;
            if (newStats.passesCompleted / newStats.passes > 0.85) rating += 0.5;
            if (player.position === 'GK' && opponentGoals === 0) rating += 1;
            if (playerGoals === 0 && player.position === 'FWD') rating -= 0.5;
            rating = Math.min(10, Math.max(4, rating + (Math.random() * 2 - 1)));

            // Update average rating
            const totalMatches = newStats.matchesPlayed;
            newStats.rating = ((existingStats.rating * (totalMatches - 1)) + rating) / totalMatches;

            // MOTM chance for high performers
            if (rating >= 8.5 && Math.random() > 0.7) {
              newStats.motm = existingStats.motm + 1;
            }

            playerStats[player.id] = newStats;
          }
        });

        // Update top scorers
        const topScorers = Object.values(playerStats)
          .sort((a, b) => b.goals - a.goals)
          .slice(0, 5)
          .map(stat => ({
            playerId: stat.playerId,
            name: currentCareer.squad.find(p => p.id === stat.playerId)?.name || 'Unknown',
            goals: stat.goals,
          }));

        const updatedCareer = {
          ...currentCareer,
          tournament,
          squad: updatedSquad,
          matches: [...currentCareer.matches, updatedMatch],
          stats: {
            ...currentCareer.stats,
            played: currentCareer.stats.played + 1,
            won: currentCareer.stats.won + (userGoals > opponentGoals ? 1 : 0),
            drawn: currentCareer.stats.drawn + (userGoals === opponentGoals ? 1 : 0),
            lost: currentCareer.stats.lost + (userGoals < opponentGoals ? 1 : 0),
            goalsFor: currentCareer.stats.goalsFor + userGoals,
            goalsAgainst: currentCareer.stats.goalsAgainst + opponentGoals,
          },
          canTrain: true, // Reset training after match
          playerStats,
          topScorers,
          currentMatch: null, // Limpiar después de jugar (se asignará el siguiente con playNextMatch)
        };

        // Actualizar careers array manteniendo el currentCareer actualizado
        const updatedCareers = get().careers.map((c) =>
          c.id === updatedCareer.id ? updatedCareer : c
        );

        set({ 
          careers: updatedCareers,
          currentCareer: updatedCareer 
        });

        // Check progression
        if (match.phase === 'group') {
          const userGroup = tournament.groups.find(g => g.id === tournament.userGroupId);
          const allPlayed = userGroup?.matches.every(m => m.played);
          
          if (allPlayed) {
            checkQualification();
          } else {
            generateRandomEvent();
            set({ currentView: 'match-result' });
          }
        } else {
          // Knockout - check if eliminated or advanced
          const isDraw = homeScore === awayScore;
          let userWon = (isUserHome && homeScore > awayScore) || (!isUserHome && awayScore > homeScore);
          
          // Si hay empate en eliminatoria, simular prórroga y penaltis
          let extraTimeHome = homeScore;
          let extraTimeAway = awayScore;
          let penaltyHome = 0;
          let penaltyAway = 0;
          
          if (isDraw) {
            // Prórroga (30 minutos) - simular goles adicionales
            const extraTimeGoals = Math.random();
            if (extraTimeGoals < 0.3) {
              // Usuario marca en prórroga
              extraTimeHome = isUserHome ? homeScore + 1 : homeScore;
              extraTimeAway = isUserHome ? awayScore : awayScore + 1;
              userWon = true;
            } else if (extraTimeGoals < 0.5) {
              // Rival marca en prórroga
              extraTimeHome = isUserHome ? homeScore : homeScore + 1;
              extraTimeAway = isUserHome ? awayScore + 1 : awayScore;
              userWon = false;
            } else {
              // Sigue el empate, ir a penaltis
              // Simular penaltis (5 cada uno)
              const userPenalties = 3 + Math.floor(Math.random() * 3); // 3-5 goles
              const oppPenalties = 3 + Math.floor(Math.random() * 3);  // 3-5 goles
              
              // Asegurar que no sean iguales
              if (userPenalties === oppPenalties) {
                if (Math.random() > 0.5) {
                  penaltyHome = isUserHome ? userPenalties + 1 : oppPenalties;
                  penaltyAway = isUserHome ? oppPenalties : userPenalties + 1;
                  userWon = true;
                } else {
                  penaltyHome = isUserHome ? userPenalties : oppPenalties + 1;
                  penaltyAway = isUserHome ? oppPenalties + 1 : userPenalties;
                  userWon = false;
                }
              } else {
                userWon = userPenalties > oppPenalties;
                penaltyHome = isUserHome ? userPenalties : oppPenalties;
                penaltyAway = isUserHome ? oppPenalties : userPenalties;
              }
            }
          }
          
          // Actualizar el partido con prórroga y penaltis si hubo
          if (isDraw) {
            const updatedMatchWithExtra = {
              ...updatedMatch,
              homeScore: extraTimeHome,
              awayScore: extraTimeAway,
              penaltyHomeScore: penaltyHome > 0 ? penaltyHome : undefined,
              penaltyAwayScore: penaltyAway > 0 ? penaltyAway : undefined,
            };
            // Actualizar en el torneo
            const koIndex = tournament.knockoutMatches.findIndex(m => m.id === match.id);
            if (koIndex >= 0) {
              tournament.knockoutMatches[koIndex] = updatedMatchWithExtra;
            }
          }
          
          if (!userWon) {
            // Eliminated
            const finalPosition = match.phase === 'round-of-32' ? 32 :
                                  match.phase === 'round-of-16' ? 16 :
                                  match.phase === 'quarter' ? 8 :
                                  match.phase === 'semi' ? 4 :
                                  match.phase === 'third-place' ? 3 : 2;
            
            get().finishTournament(finalPosition);
          } else if (match.phase === 'final') {
            get().finishTournament(1); // Champion!
          } else {
            // Advance to next round
            advanceToNextRound();
            set({ currentView: 'match-result' });
          }
        }
      },

      generateRandomEvent: () => {
        const { currentCareer } = get();
        if (!currentCareer) return;

        const shouldGenerate = Math.random() < 0.35; // 35% chance
        
        if (shouldGenerate) {
          const eventTemplate = RANDOM_EVENTS[Math.floor(Math.random() * RANDOM_EVENTS.length)];
          
          // Find affected player if needed
          let affectedPlayer: DTPlayer | undefined;
          if (eventTemplate.type === 'injury' || eventTemplate.type === 'suspension' || eventTemplate.type === 'recovery') {
            const availablePlayers = currentCareer.squad.filter(p => !p.isInjured);
            if (availablePlayers.length > 0) {
              affectedPlayer = availablePlayers[Math.floor(Math.random() * availablePlayers.length)];
            }
          }
          
          const randomEvent: DTRandomEvent = {
            ...eventTemplate,
            id: `event-${Date.now()}`,
            playerId: affectedPlayer?.id,
            playerName: affectedPlayer?.name,
            description: affectedPlayer 
              ? `${affectedPlayer.name} ${eventTemplate.description}`
              : eventTemplate.description,
          };

          // Apply effect to player
          if (affectedPlayer && eventTemplate.type === 'injury') {
            const updatedSquad = currentCareer.squad.map(p => 
              p.id === affectedPlayer!.id 
                ? { ...p, isInjured: true, injuryWeeks: 1 + Math.floor(Math.random() * 2) }
                : p
            );
            
            const updatedCareer = {
              ...currentCareer,
              squad: updatedSquad,
              randomEvent,
            };
            set({ currentCareer: updatedCareer });
            return;
          }

          const updatedCareer = {
            ...currentCareer,
            randomEvent,
          };

          set({ currentCareer: updatedCareer });
        }
      },

      dismissRandomEvent: () => {
        const { currentCareer } = get();
        if (!currentCareer) return;

        const updatedCareer = {
          ...currentCareer,
          randomEvent: null,
        };

        set({ currentCareer: updatedCareer });
      },

      checkQualification: () => {
        const { currentCareer, initKnockoutPhase } = get();
        if (!currentCareer || !currentCareer.tournament) return;

        // Crear copia profunda del torneo
        const tournament: DTTournament = { 
          ...currentCareer.tournament,
          groups: currentCareer.tournament.groups.map(g => ({ ...g })),
          knockoutMatches: [...currentCareer.tournament.knockoutMatches]
        };
        
        const groupIndex = tournament.groups.findIndex(g => g.id === tournament.userGroupId);
        if (groupIndex < 0) return;
        
        // Crear copia profunda del grupo
        const originalGroup = tournament.groups[groupIndex];
        const group: DTGroup = { 
          ...originalGroup,
          matches: [...originalGroup.matches],
          standings: [...originalGroup.standings],
          teams: [...originalGroup.teams]
        };
        
        group.standings = calculateStandings(group);
        
        const userPosition = group.standings.findIndex(s => s.nationId === currentCareer.nationId) + 1;
        
        let qualified = false;
        let eliminated = false;

        if (userPosition <= 2) {
          qualified = true;
        } else if (userPosition === 3) {
          qualified = true; // Simplified - best 3rd places qualify
        } else {
          eliminated = true;
        }

        tournament.qualified = qualified;
        tournament.eliminated = eliminated;
        tournament.groups[groupIndex] = group;

        const updatedCareer = {
          ...currentCareer,
          tournament,
        };

        // Actualizar careers array manteniendo el currentCareer actualizado
        const updatedCareers = get().careers.map((c) =>
          c.id === updatedCareer.id ? updatedCareer : c
        );

        set({ 
          careers: updatedCareers,
          currentCareer: updatedCareer 
        });

        if (qualified) {
          initKnockoutPhase();
        } else {
          set({ currentView: 'tournament-end' });
        }
      },

      initKnockoutPhase: () => {
        const { currentCareer } = get();
        if (!currentCareer || !currentCareer.tournament) return;

        // Obtener equipos clasificados de los grupos (1º y 2º de cada grupo)
        const qualifiedTeams: string[] = [];
        currentCareer.tournament.groups.forEach(group => {
          const sortedStandings = calculateStandings(group);
          // Los 2 primeros de cada grupo clasifican
          sortedStandings.slice(0, 2).forEach(s => {
            if (s.nationId !== currentCareer.nationId) {
              qualifiedTeams.push(s.nationId);
            }
          });
        });
        
        // Mezclar los equipos clasificados
        for (let i = qualifiedTeams.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [qualifiedTeams[i], qualifiedTeams[j]] = [qualifiedTeams[j], qualifiedTeams[i]];
        }

        const knockoutMatches = generateKnockoutBracket(currentCareer.nationId);
        
        // Asignar equipos reales a los partidos de dieciseisavos
        let teamIndex = 0;
        const updatedKnockoutMatches = knockoutMatches.map(match => {
          if (match.phase === 'round-of-32') {
            const isUserHome = match.homeNationId === currentCareer.nationId;
            const isUserAway = match.awayNationId === currentCareer.nationId;
            
            if (isUserHome && teamIndex < qualifiedTeams.length) {
              // Usuario juega en casa contra un equipo clasificado
              return { ...match, awayNationId: qualifiedTeams[teamIndex++] };
            } else if (isUserAway && teamIndex < qualifiedTeams.length) {
              // Usuario juega fuera contra un equipo clasificado
              return { ...match, homeNationId: qualifiedTeams[teamIndex++] };
            } else if (!isUserHome && !isUserAway) {
              // Partido entre dos equipos clasificados (no es del usuario)
              if (teamIndex < qualifiedTeams.length - 1) {
                return { 
                  ...match, 
                  homeNationId: qualifiedTeams[teamIndex++],
                  awayNationId: qualifiedTeams[teamIndex++]
                };
              }
            }
          }
          return match;
        });
        
        // Crear copia profunda del torneo
        const tournament: DTTournament = { 
          ...currentCareer.tournament,
          groups: currentCareer.tournament.groups.map(g => ({ ...g })),
          knockoutMatches: updatedKnockoutMatches
        };
        tournament.currentPhase = 'round-of-32';
        tournament.currentRound = '16avos de Final';
        
        // Find user's first knockout match
        const userMatch = tournament.knockoutMatches.find(m => 
          m.homeNationId === currentCareer.nationId || m.awayNationId === currentCareer.nationId
        );

        const updatedCareer = {
          ...currentCareer,
          tournament,
          currentMatch: userMatch ? { ...userMatch } : null,
        };

        // Actualizar careers array manteniendo el currentCareer actualizado
        const updatedCareers = get().careers.map((c) =>
          c.id === updatedCareer.id ? updatedCareer : c
        );

        set({
          careers: updatedCareers,
          currentCareer: updatedCareer,
          currentView: 'match-result', // Show group stage summary first
        });
      },

      advanceToNextRound: () => {
        const { currentCareer } = get();
        if (!currentCareer || !currentCareer.tournament) return;

        // Crear copia profunda del torneo
        const tournament: DTTournament = { 
          ...currentCareer.tournament,
          groups: currentCareer.tournament.groups.map(g => ({ ...g })),
          knockoutMatches: [...currentCareer.tournament.knockoutMatches]
        };
        
        // Encontrar el último partido jugado del usuario
        const lastPlayedMatch = [...tournament.knockoutMatches]
          .reverse()
          .find(m => m.played && (m.homeNationId === currentCareer.nationId || m.awayNationId === currentCareer.nationId));
        
        if (!lastPlayedMatch) return;
        
        // Determinar la siguiente ronda y actualizar el bracket
        const lastPhase = lastPlayedMatch.phase;
        const lastId = lastPlayedMatch.id;
        
        // Simular otros partidos de la misma ronda para determinar rivales futuros
        const sameRoundMatches = tournament.knockoutMatches.filter(m => 
          m.phase === lastPhase && !m.played && 
          m.homeNationId !== currentCareer.nationId && 
          m.awayNationId !== currentCareer.nationId &&
          !m.homeNationId.startsWith('winner-') && // Ya tiene rival asignado
          !m.awayNationId.startsWith('winner-')
        );
        
        // Simular resultados de otros partidos de la misma ronda
        sameRoundMatches.forEach(match => {
          const matchIndex = tournament.knockoutMatches.findIndex(m => m.id === match.id);
          if (matchIndex >= 0) {
            const homeScore = Math.floor(Math.random() * 4);
            const awayScore = Math.floor(Math.random() * 4);
            tournament.knockoutMatches[matchIndex] = {
              ...match,
              homeScore,
              awayScore,
              played: true
            };
          }
        });
        
        // Actualizar el siguiente partido del usuario según la ronda
        let nextMatchId: string | null = null;
        let isHome = true;
        
        if (lastPhase === 'round-of-32') {
          // Extraer el índice del partido de 16avos (0-15)
          const r32Index = parseInt(lastId.split('-')[1]);
          const r16Index = Math.floor(r32Index / 2);
          nextMatchId = `r16-${r16Index}`;
          isHome = r32Index % 2 === 0;
        } else if (lastPhase === 'round-of-16') {
          const r16Index = parseInt(lastId.split('-')[1]);
          const qfIndex = Math.floor(r16Index / 2);
          nextMatchId = `qf-${qfIndex}`;
          isHome = r16Index % 2 === 0;
        } else if (lastPhase === 'quarter') {
          const qfIndex = parseInt(lastId.split('-')[1]);
          const sfIndex = Math.floor(qfIndex / 2);
          nextMatchId = `sf-${sfIndex}`;
          isHome = qfIndex % 2 === 0;
        } else if (lastPhase === 'semi') {
          nextMatchId = 'final-0';
          isHome = lastId === 'sf-0';
        }
        
        if (nextMatchId) {
          const nextMatchIndex = tournament.knockoutMatches.findIndex(m => m.id === nextMatchId);
          if (nextMatchIndex >= 0) {
            const nextMatch = { ...tournament.knockoutMatches[nextMatchIndex] };
            
            // Actualizar el partido con el ID del usuario
            if (isHome) {
              nextMatch.homeNationId = currentCareer.nationId;
            } else {
              nextMatch.awayNationId = currentCareer.nationId;
            }
            
            // Asignar un rival aleatorio si no tiene
            const opponentSlot = isHome ? nextMatch.awayNationId : nextMatch.homeNationId;
            if (opponentSlot.startsWith('winner-') || opponentSlot.startsWith('qualifier-')) {
              const randomOpponent = DT_NATIONS.filter(n => n.id !== currentCareer.nationId)[Math.floor(Math.random() * 20)];
              if (isHome) {
                nextMatch.awayNationId = randomOpponent.id;
              } else {
                nextMatch.homeNationId = randomOpponent.id;
              }
            }
            
            tournament.knockoutMatches[nextMatchIndex] = nextMatch;
            tournament.currentRound = nextMatch.round;
            tournament.currentPhase = nextMatch.phase;
            
            const updatedCareer = {
              ...currentCareer,
              tournament,
              currentMatch: nextMatch,
            };

            set({ currentCareer: updatedCareer });
            get().updateCareer(updatedCareer);
          }
        }
      },

      finishTournament: (finalPosition) => {
        const { currentCareer } = get();
        if (!currentCareer || !currentCareer.tournament) return;

        // Crear copia profunda del torneo
        const tournament: DTTournament = { 
          ...currentCareer.tournament,
          groups: currentCareer.tournament.groups.map(g => ({ ...g })),
          knockoutMatches: [...currentCareer.tournament.knockoutMatches]
        };
        tournament.finalPosition = finalPosition;

        // Check for badges
        const newBadges = [...currentCareer.badges];
        
        if (finalPosition === 1) {
          newBadges.push({
            id: 'champion',
            name: 'Campeón del Mundo',
            description: 'Ganar la Copa del Mundo 2026',
            icon: '🏆',
            unlockedAt: new Date(),
            rarity: 'legendary',
          });
        } else if (finalPosition === 2) {
          newBadges.push({
            id: 'finalist',
            name: 'Finalista',
            description: 'Llegar a la final del Mundial',
            icon: '🥈',
            unlockedAt: new Date(),
            rarity: 'epic',
          });
        } else if (finalPosition === 3) {
          newBadges.push({
            id: 'third-place',
            name: 'Tercer Puesto',
            description: 'Ganar el partido por el tercer puesto',
            icon: '🥉',
            unlockedAt: new Date(),
            rarity: 'epic',
          });
        } else if (finalPosition === 4) {
          newBadges.push({
            id: 'semifinalist',
            name: 'Semifinalista',
            description: 'Llegar a semifinales',
            icon: '⭐',
            unlockedAt: new Date(),
            rarity: 'rare',
          });
        }

        const updatedCareer = {
          ...currentCareer,
          tournament,
          badges: newBadges,
        };

        set({
          currentCareer: updatedCareer,
          currentView: 'tournament-end',
        });

        get().updateCareer(updatedCareer);
      },

      completeTraining: (type, intensity) => {
        const { currentCareer } = get();
        if (!currentCareer || !currentCareer.canTrain) return;

        // Calculate effects based on type and intensity
        let fitnessChange = 0;
        let formChange = 0;
        let moraleChange = 0;
        let injuryRisk = 0;

        switch (type) {
          case 'tactical':
            formChange = intensity === 'high' ? 8 : intensity === 'medium' ? 5 : 3;
            fitnessChange = intensity === 'high' ? -5 : -2;
            moraleChange = 2;
            injuryRisk = intensity === 'high' ? 0.15 : 0.05;
            break;
          case 'physical':
            fitnessChange = intensity === 'high' ? 15 : intensity === 'medium' ? 10 : 5;
            formChange = intensity === 'high' ? -3 : 0;
            moraleChange = intensity === 'high' ? -5 : 0;
            injuryRisk = intensity === 'high' ? 0.25 : intensity === 'medium' ? 0.1 : 0.02;
            break;
          case 'technical':
            formChange = intensity === 'high' ? 10 : intensity === 'medium' ? 6 : 3;
            fitnessChange = intensity === 'high' ? -8 : -4;
            moraleChange = 5;
            injuryRisk = intensity === 'high' ? 0.1 : 0.03;
            break;
          case 'rest':
            fitnessChange = 20;
            formChange = -2;
            moraleChange = 10;
            injuryRisk = 0;
            break;
        }

        // Apply effects to squad
        const updatedSquad = currentCareer.squad.map(player => {
          let newFitness = Math.min(100, Math.max(0, player.fitness + fitnessChange));
          let newForm = Math.min(100, Math.max(0, player.form + formChange));
          
          return {
            ...player,
            fitness: newFitness,
            form: newForm,
          };
        });

        // Check for injuries
        const injuredPlayers: string[] = [];
        const improvedPlayers: string[] = [];

        if (type !== 'rest') {
          updatedSquad.forEach((player, index) => {
            // Only fit players can get injured during training
            if (!player.isInjured && Math.random() < injuryRisk) {
              updatedSquad[index] = {
                ...player,
                isInjured: true,
                injuryWeeks: 1,
                fitness: Math.max(0, player.fitness - 20),
              };
              injuredPlayers.push(player.name);
            }
            
            // High form players improve their overall temporarily
            if (player.form > 85 && type === 'technical') {
              improvedPlayers.push(player.name);
            }
          });
        }

        const trainingSession: DTTrainingSession = {
          type,
          intensity,
          completed: true,
          effects: { fitnessChange, formChange, moraleChange, injuryRisk },
          results: { injuredPlayers, improvedPlayers },
        };

        const updatedCareer = {
          ...currentCareer,
          squad: updatedSquad,
          lastTraining: trainingSession,
          canTrain: false,
        };

        set({ currentCareer: updatedCareer });
        get().updateCareer(updatedCareer);
      },

      resetTraining: () => {
        const { currentCareer } = get();
        if (!currentCareer) return;

        const updatedCareer = {
          ...currentCareer,
          canTrain: true,
        };

        set({ currentCareer: updatedCareer });
        get().updateCareer(updatedCareer);
      },
    }),
    {
      name: 'dt-manager-storage',
      onRehydrateStorage: () => (state) => {
        // Al cargar de localStorage, si estamos en vista de partido pero no hay partido, ir a home
        if (state) {
          const viewsThatNeedMatch = ['match', 'match-setup'];
          if (viewsThatNeedMatch.includes(state.currentView)) {
            if (!state.currentCareer?.currentMatch) {
              state.currentView = 'home';
            }
          }
        }
      },
    }
  )
);
