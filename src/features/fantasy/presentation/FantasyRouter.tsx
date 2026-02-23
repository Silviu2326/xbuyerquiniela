import { FantasyDashboard } from './pages/Dashboard';
import { SquadPage } from './pages/Squad';
import { PlayersPage } from './pages/Players';
import { DuelsPage } from './pages/Duels';
import { PredictionsPage } from './pages/Predictions';
import { UserProfilePage } from './pages/UserProfile';
import { ChipsPage } from './pages/Chips';
import { useFantasyStore } from '../application/store/fantasyStore';
import { FantasyLayout } from './shared/FantasyLayout';
import { MobileLayout } from './shared/MobileLayout';

interface FantasyRouterProps {
  onNavigate?: (view: string) => void;
}

export function FantasyRouter({ onNavigate }: FantasyRouterProps) {
  const selectedView = useFantasyStore((state) => state.selectedView);
  const selectedUserId = useFantasyStore((state) => state.selectedUserId);

  const handleNavigateHome = () => {
    if (onNavigate) {
      onNavigate('dashboard');
    }
  };

  const renderContent = () => {
    switch (selectedView) {
      case 'dashboard':
        return <FantasyDashboard onNavigate={onNavigate} />;
      case 'squad':
        return <SquadPage onNavigate={onNavigate} />;
      case 'players':
        return <PlayersPage onNavigate={onNavigate} />;
      case 'predictions':
        return <PredictionsPage onNavigate={onNavigate} />;
      case 'duels':
        return <DuelsPage onNavigate={onNavigate} />;
      case 'user-detail':
        return <UserProfilePage onNavigate={onNavigate} userId={selectedUserId} />;
      case 'chips':
        return <ChipsPage onNavigate={onNavigate} />;
      default:
        return <FantasyDashboard onNavigate={onNavigate} />;
    }
  };

  return (
    <MobileLayout onNavigate={onNavigate} currentView={selectedView}>
      <FantasyLayout onNavigateHome={handleNavigateHome}>
        {renderContent()}
      </FantasyLayout>
    </MobileLayout>
  );
}
