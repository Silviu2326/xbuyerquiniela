import { useEffect } from "react";
import { useDTStore } from "../../features/dt/store/dtStore";
import { DTLandingBackup } from "../../features/dt/components/DTLandingBackup";
import { DTNationSelect } from "../../features/dt/components/DTNationSelect";
import { DTSquadSelection } from "../../features/dt/components/DTSquadSelection";
import { DTHome } from "../../features/dt/components/DTHome";
import { DTLineup } from "../../features/dt/components/DTLineup";
import { DTMatchSetup } from "../../features/dt/components/DTMatchSetup";
import { DTFixture } from "../../features/dt/components/DTFixture";
import { DTMatch } from "../../features/dt/components/DTMatch";
import { DTMatchResult } from "../../features/dt/components/DTMatchResult";
import { DTTournamentEnd } from "../../features/dt/components/DTTournamentEnd";
import { DTBadges } from "../../features/dt/components/DTBadges";
import { DTTrainingCenter } from "../../features/dt/components/DTTrainingCenter";
import { DTTeamStats } from "../../features/dt/components/DTTeamStats";
import { DTStandings } from "../../features/dt/components/DTStandings";

interface TacticsModeProps {
  onNavigate: (view: string) => void;
  points: number;
}

export const TacticsMode = ({ onNavigate }: TacticsModeProps) => {
  const { currentView, currentCareer, setView } = useDTStore();

  // Al entrar al modo DT, si estamos en vista de partido sin partido cargado, ir al home
  useEffect(() => {
    if (
      currentCareer &&
      (currentView === "match" || currentView === "match-setup") &&
      !currentCareer.currentMatch
    ) {
      setView("home");
    }
  }, []);

  // Si estamos en vista de partido pero no hay partido cargado, mostrar Home
  if (
    (currentView === "match" || currentView === "match-setup") &&
    !currentCareer?.currentMatch
  ) {
    return <DTHome />;
  }

  switch (currentView) {
    case "landing":
      return <DTLandingBackup onNavigate={onNavigate} />;
    case "nation-select":
      return <DTNationSelect />;
    case "squad-selection":
      return <DTSquadSelection />;
    case "home":
      return <DTHome />;
    case "lineup":
      return <DTLineup />;
    case "match-setup":
      return <DTMatchSetup />;
    case "fixture":
      return <DTFixture />;
    case "match":
      return <DTMatch />;
    case "match-result":
      return <DTMatchResult />;
    case "tournament-end":
      return <DTTournamentEnd />;
    case "tutorial":
      return (
        <div className="min-h-screen bg-[#0D0D0D] flex items-center justify-center">
          <div className="text-center">
            <div className="text-6xl mb-4">📚</div>
            <h2 className="text-2xl font-bold text-white mb-2">Tutorial</h2>
            <p className="text-gray-500 mb-4">Próximamente...</p>
            <button
              onClick={() => useDTStore.getState().setView("landing")}
              className="px-6 py-3 bg-[#FFE600] text-black font-bold rounded-xl"
            >
              Volver
            </button>
          </div>
        </div>
      );
    case "badges":
      return <DTBadges />;
    case "training":
      return <DTTrainingCenter />;
    case "stats":
      return <DTTeamStats />;
    case "standings":
      return <DTStandings />;
    default:
      return <DTLandingBackup onNavigate={onNavigate} />;
  }
};
