import { Home, Users, Search, Swords, Target, ArrowLeft } from 'lucide-react';
import { useFantasyStore } from '../../application/store/fantasyStore';

interface FantasyHeaderProps {
  onNavigateHome?: () => void;
}

export function FantasyHeader({ onNavigateHome }: FantasyHeaderProps) {
  const selectedView = useFantasyStore((state) => state.selectedView);
  const setView = useFantasyStore((state) => state.setView);

  const handleNavigation = (view: string) => {
    setView(view as any);
  };

  const handleGoHome = () => {
    if (onNavigateHome) {
      onNavigateHome();
    }
  };

  const navItems = [
    { id: 'dashboard', icon: Home, label: 'Dashboard' },
    { id: 'squad', icon: Users, label: 'Mi Selección' },
    { id: 'players', icon: Search, label: 'Jugadores' },
    { id: 'duels', icon: Swords, label: 'Duelos' },
    { id: 'predictions', icon: Target, label: 'Predicciones' },
  ];

  return (
    <div style={{
      background: '#0D0D0D',
      borderBottom: '1px solid #2a2a3a',
      padding: 'var(--space-3) var(--space-4)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
    }}>
      {/* HEADER SUPERIOR */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        marginBottom: 'var(--space-3)',
      }}>
        {/* BOTÓN VOLVER A INICIO - IZQUIERDA */}
        <button
          onClick={handleGoHome}
          style={{
            position: 'absolute',
            left: 0,
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            background: 'transparent',
            border: 'none',
            color: '#9CA3AF',
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--font-bold)',
            cursor: 'pointer',
            padding: 'var(--space-1)',
          }}
        >
          <ArrowLeft size={16} />
          <span>Inicio</span>
        </button>

        {/* TÍTULO CENTRADO */}
        <div style={{
          textAlign: 'center',
        }}>
          <h1 style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-black)',
            color: '#FFE600',
            letterSpacing: '-0.5px',
          }}>
            Fantasy Mundial
          </h1>
          <p style={{
            fontSize: 'var(--text-xs)',
            color: '#9CA3AF',
            marginTop: '2px',
          }}>
            FIFA World Cup 2026™
          </p>
        </div>
      </div>

      {/* NAVEGACIÓN POR TABS */}
      <div style={{
        display: 'flex',
        width: '100%',
        gap: 'var(--space-1)',
      }}>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = selectedView === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => handleNavigation(item.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                flex: 1,
                padding: 'var(--space-2) var(--space-1)',
                background: isActive ? 'rgba(255, 230, 0, 0.1)' : 'transparent',
                border: isActive ? '1px solid #FFE600' : '1px solid #3a3a4a',
                borderRadius: 'var(--radius-lg)',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s ease',
              }}
            >
              <Icon 
                size={14} 
                style={{ 
                  color: isActive ? '#FFE600' : '#9CA3AF',
                  flexShrink: 0,
                }} 
              />
              <span style={{
                fontSize: 'var(--text-xs)',
                fontWeight: isActive ? 'var(--font-bold)' : 'var(--font-medium)',
                color: isActive ? '#FFE600' : '#9CA3AF',
              }}>
                {item.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
