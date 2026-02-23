import type { ReactNode } from 'react';
import { FantasyHeader } from './FantasyHeader';

interface FantasyLayoutProps {
  children: ReactNode;
  onNavigateHome?: () => void;
}

export function FantasyLayout({ children, onNavigateHome }: FantasyLayoutProps) {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      paddingBottom: 20,
    }}>
      <FantasyHeader onNavigateHome={onNavigateHome} />
      {children}
    </div>
  );
}
