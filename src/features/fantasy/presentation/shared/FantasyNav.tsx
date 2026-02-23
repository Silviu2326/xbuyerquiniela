import type { ReactNode } from 'react';
import { Home, Users, Search, Target, Swords } from 'lucide-react';
import { useFantasyStore } from '../../application/store/fantasyStore';

export function FantasyNav() {
  const selectedView = useFantasyStore((state) => state.selectedView);
  const setView = useFantasyStore((state) => state.setView);

  const handleNavigation = (view: string) => {
    setView(view as any);
  };

  const navItems = [
    {
      id: 'dashboard',
      icon: <Home size={22} />,
      label: 'Inicio',
    },
    {
      id: 'squad',
      icon: <Users size={22} />,
      label: 'Mi Equipo',
    },
    {
      id: 'players',
      icon: <Search size={22} />,
      label: 'Jugadores',
    },
    {
      id: 'predictions',
      icon: <Target size={22} />,
      label: 'Predicciones',
    },
    {
      id: 'duels',
      icon: <Swords size={22} />,
      label: 'Duelos',
    },
  ];

  return (
    <nav style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      right: 0,
      height: 50,
      background: '#1a1a24',
      borderTop: '1px solid #2a2a3a',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-around',
      padding: '0 var(--space-2)',
      zIndex: 100,
    }}>
      {navItems.map((item) => (
        <NavItem
          key={item.id}
          icon={item.icon}
          label={item.label}
          isActive={selectedView === item.id}
          onClick={() => handleNavigation(item.id)}
        />
      ))}
    </nav>
  );
}

interface NavItemProps {
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}

function NavItem({ icon, label, isActive, onClick }: NavItemProps) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        background: 'transparent',
        border: 'none',
        padding: 'var(--space-2)',
        cursor: 'pointer',
        color: isActive ? '#FFE600' : '#6B7280',
        transition: 'color var(--transition-fast)',
      }}
    >
      {icon}
      <span style={{
        fontSize: '11px',
        fontWeight: isActive ? 'var(--font-semibold)' : 'var(--font-medium)',
      }}>
        {label}
      </span>
    </button>
  );
}
