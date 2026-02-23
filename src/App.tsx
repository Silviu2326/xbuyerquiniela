import { useState, useEffect } from 'react';
import { Loader } from './components/shared/Loader';
import { Toast } from './components/shared/Toast';
import { BetModal } from './components/betting/BetModal';
import { BetList } from './components/betting/BetList';
import { FantasyHub } from './components/fantasy/FantasyHub';
import { FantasyRouter } from './features/fantasy/presentation/FantasyRouter';
import { Dashboard } from './components/home/Dashboard';
import { MatchCenter } from './components/sections/MatchCenter';
import { Matches } from './components/sections/Matches';
import { Groups } from './components/sections/Groups';
import { Teams } from './components/sections/Teams';
import { Venues } from './components/sections/Venues';
import { TacticsMode } from './components/sections/TacticsMode';
import { ModoDT } from './components/sections/ModoDT';
import { Ranking } from './components/sections/Ranking';
import { Trivia } from './components/sections/Trivia';
import { AI } from './components/sections/AI';
import { News } from './components/sections/News';
import { Stories } from './components/sections/Stories';
import { Micro } from './components/sections/Micro';
import { Party } from './components/sections/Party';
import { Premium } from './components/sections/Premium';
import { useToast } from './hooks/useToast';
import { loadFromStorage, saveToStorage } from './utils/helpers';
import type { Bet, FantasyState, UIState } from './types/index.ts';
import { CHIPS_DEF } from './data/fantasy';

const INITIAL_FANTASY_STATE: FantasyState = {
  squad: [],
  budget: 250,
  formation: "4-3-3",
  captainId: null,
  viceCaptainId: null,
  predictions: {},
  chips: CHIPS_DEF.map(c => ({ ...c })),
  pts: 94,
  gwPts: 42,
  streak: 3,
  coins: 3200,
  xp: 1800,
  level: 9
};

const INITIAL_UI_STATE: UIState = {
  view: "dashboard",
  prevView: null,
  filter: "ALL",
  search: "",
  predMatch: null,
  predTeam: "home",
  predXI: [],
  predForm: "4-3-3",
  timeH: 2,
  timeM: 47,
  timeS: 33,
  online: 34521,
  lined: 28744
};

function App() {
  const [bets, setBets] = useState<Bet[]>([]);
  const [betModalOpen, setBetModalOpen] = useState(false);
  const [fantasyState, setFantasyState] = useState<FantasyState>(INITIAL_FANTASY_STATE);
  const [uiState, setUIState] = useState<UIState>(INITIAL_UI_STATE);
  const { toast, showToast, hideToast } = useToast();

  // Load data from localStorage on mount
  useEffect(() => {
    const savedBets = loadFromStorage<Bet[]>('qm26_bets', []);
    const savedFantasy = loadFromStorage<FantasyState>('qm26_fantasy', INITIAL_FANTASY_STATE);

    // Si no hay datos guardados, agregar apuestas de ejemplo
    if (savedBets.length === 0) {
      const exampleBets: Bet[] = [
        { id: 1, match: 'México vs Sudáfrica', matchId: 1, type: 'result', typeName: 'Resultado', pick: 'México', odds: 1.85, amount: 50, status: 'pending', date: '11 Jun 12:00' },
        { id: 2, match: 'Brasil vs Marruecos', matchId: 3, type: 'scorer', typeName: 'Goleador', pick: 'Vinicius Jr.', odds: 2.80, amount: 25, status: 'won', date: '12 Jun 14:00' },
        { id: 3, match: 'España vs Cabo Verde', matchId: 6, type: 'result', typeName: 'Resultado', pick: 'España', odds: 1.45, amount: 100, status: 'won', date: '13 Jun 14:00' },
        { id: 4, match: 'Argentina vs Argelia', matchId: 7, type: 'goals', typeName: 'Más/Menos goles', pick: 'Más de 2.5', odds: 1.85, amount: 50, status: 'lost', date: '13 Jun 15:00' },
        { id: 5, match: 'Inglaterra vs Croacia', matchId: 8, type: 'both', typeName: 'Ambos anotan', pick: 'Sí', odds: 1.90, amount: 30, status: 'pending', date: '14 Jun 14:00' },
        { id: 6, match: 'Francia vs Senegal', matchId: 9, type: 'scorer', typeName: 'Goleador', pick: 'Mbappé', odds: 2.20, amount: 75, status: 'won', date: '14 Jun 17:00' },
        { id: 7, match: 'Alemania vs Curazao', matchId: 10, type: 'score', typeName: 'Marcador exacto', pick: '3-0', odds: 12.0, amount: 10, status: 'pending', date: '14 Jun 19:00' },
        { id: 8, match: 'EE.UU. vs Paraguay', matchId: 4, type: 'result', typeName: 'Resultado', pick: 'EE.UU.', odds: 2.10, amount: 40, status: 'lost', date: '12 Jun 19:00' }
      ];
      setBets(exampleBets);
      saveToStorage('qm26_bets', exampleBets);
    } else {
      setBets(savedBets);
    }

    setFantasyState(savedFantasy);
  }, []);

  // Save bets to localStorage whenever they change
  useEffect(() => {
    if (bets.length > 0) {
      saveToStorage('qm26_bets', bets);
    }
  }, [bets]);

  // Save fantasy state to localStorage whenever it changes
  useEffect(() => {
    saveToStorage('qm26_fantasy', fantasyState);
  }, [fantasyState]);

  // Timer for countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setUIState(prev => {
        let { timeH, timeM, timeS } = prev;

        if (timeS > 0) {
          timeS--;
        } else {
          timeS = 59;
          if (timeM > 0) {
            timeM--;
          } else {
            timeM = 59;
            if (timeH > 0) {
              timeH--;
            } else {
              timeH = 0;
              timeM = 0;
              timeS = 0;
            }
          }
        }

        return { ...prev, timeH, timeM, timeS };
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleConfirmBet = (bet: Omit<Bet, 'id'>) => {
    const newBet: Bet = {
      ...bet,
      id: Date.now()
    };
    setBets(prev => [...prev, newBet]);
    setBetModalOpen(false);
    showToast('¡Apuesta registrada con éxito!', 'success');
  };

  const handleNavigate = (view: string) => {
    setUIState(prev => ({
      ...prev,
      prevView: prev.view,
      view
    }));
  };

  const renderView = () => {
    switch (uiState.view) {
      case 'dashboard':
        return (
          <Dashboard
            points={fantasyState.pts}
            streak={fantasyState.streak}
            ranking={47}
            precision={68}
            onNavigate={handleNavigate}
          />
        );
      case 'match':
        return <MatchCenter onNavigate={handleNavigate} points={fantasyState.pts} />;
      case 'matches':
        return <Matches onNavigate={handleNavigate} points={fantasyState.pts} />;
      case 'groups':
        return <Groups onNavigate={handleNavigate} points={fantasyState.pts} />;
      case 'selections':
        return <Teams onNavigate={handleNavigate} points={fantasyState.pts} />;
      case 'venues':
        return <Venues onNavigate={handleNavigate} points={fantasyState.pts} />;
      case 'tactics':
        return <ModoDT onNavigate={handleNavigate} points={fantasyState.pts} />;
      case 'career':
      case 'career-select':
      case 'career-squad':
      case 'career-home':
        return <TacticsMode onNavigate={handleNavigate} points={fantasyState.pts} />;
      case 'ranking':
        return <Ranking onNavigate={handleNavigate} points={fantasyState.pts} />;
      case 'trivia':
        return <Trivia onNavigate={handleNavigate} points={fantasyState.pts} />;
      case 'ai':
        return <AI onNavigate={handleNavigate} points={fantasyState.pts} />;
      case 'news':
        return <News onNavigate={handleNavigate} points={fantasyState.pts} />;
      case 'stories':
        return <Stories onNavigate={handleNavigate} points={fantasyState.pts} />;
      case 'micro':
        return <Micro onNavigate={handleNavigate} points={fantasyState.pts} />;
      case 'party':
        return <Party onNavigate={handleNavigate} points={fantasyState.pts} />;
      case 'premium':
        return <Premium onNavigate={handleNavigate} points={fantasyState.pts} />;
      case 'fantasy':
      case 'hub':
      case 'squad':
      case 'players':
      case 'duels':
        return <FantasyRouter onNavigate={handleNavigate} />;
      case 'pitch':
      case 'predict-list':
      case 'predict-detail':
      case 'chips':
        return (
          <FantasyHub
            state={fantasyState}
            ui={uiState}
            onNavigate={handleNavigate}
          />
        );
      case 'bets':
        return (
          <BetList
            bets={bets}
            onOpenModal={() => setBetModalOpen(true)}
            onNavigate={handleNavigate}
            points={fantasyState.pts}
          />
        );
      default:
        return (
          <Dashboard
            points={fantasyState.pts}
            streak={fantasyState.streak}
            ranking={47}
            precision={68}
            onNavigate={handleNavigate}
          />
        );
    }
  };

  return (
    <>
      <Loader />

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={hideToast}
        />
      )}

      {/* Main Content */}
      {renderView()}

      {/* Bet Modal */}
      <BetModal
        isOpen={betModalOpen}
        onClose={() => setBetModalOpen(false)}
        onConfirm={handleConfirmBet}
      />
    </>
  );
}

export default App;
