// ============================================
// FANTASY MODULE - EXPORTS
// ============================================

// Domain
export * from './domain/types';
export * from './domain/rules';

// Application
export * from './application/store/fantasyStore';
export * from './application/hooks/useFantasy';

// Infrastructure
export * from './infrastructure/repositories/mockData';

// Presentation - Pages
export { FantasyDashboard } from './presentation/pages/Dashboard';
export { SquadPage } from './presentation/pages/Squad';
export { PlayersPage } from './presentation/pages/Players';
export { DuelsPage } from './presentation/pages/Duels';
export { PredictionsPage } from './presentation/pages/Predictions';
export { UserProfilePage } from './presentation/pages/UserProfile';

// Presentation - Shared
export { MobileLayout } from './presentation/shared/MobileLayout';
export { PageHeader } from './presentation/shared/PageHeader';
