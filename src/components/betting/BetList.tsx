import { useState, useMemo } from 'react';
import type { Bet } from '../../types/index.ts';
import {
  ChevronLeft,
  Plus,
  TrendingUp,
  TrendingDown,
  Target,
  Award,
  Clock,
  CheckCircle2,
  XCircle
} from 'lucide-react';
import { getFlagImage } from '../../utils/helpers';
import { Header } from '../home/Header';
import { MobileLayout } from '../../features/fantasy/presentation/shared/MobileLayout';

interface BetListProps {
  bets: Bet[];
  onOpenModal: () => void;
  onNavigate?: (view: string) => void;
  points: number;
}

export const BetList = ({ bets, onOpenModal, onNavigate, points }: BetListProps) => {
  const [filter, setFilter] = useState<'all' | 'pending' | 'won' | 'lost'>('all');

  // Calcular estadísticas
  const stats = useMemo(() => {
    const totalBet = bets.reduce((sum, b) => sum + b.amount, 0);
    const wonBets = bets.filter(b => b.status === 'won');
    const totalWon = wonBets.reduce((sum, b) => sum + (b.amount * b.odds), 0);
    const profit = totalWon - bets.filter(b => b.status !== 'pending').reduce((sum, b) => sum + b.amount, 0);
    const winRate = bets.length > 0 ? Math.round((wonBets.length / bets.filter(b => b.status !== 'pending').length) * 100) || 0 : 0;
    
    return { totalBet, totalWon, profit, winRate };
  }, [bets]);

  // Filtrar apuestas
  const filteredBets = useMemo(() => {
    if (filter === 'all') return bets;
    return bets.filter(b => b.status === filter);
  }, [bets, filter]);

  // Conteos para tabs
  const counts = {
    all: bets.length,
    pending: bets.filter(b => b.status === 'pending').length,
    won: bets.filter(b => b.status === 'won').length,
    lost: bets.filter(b => b.status === 'lost').length,
  };

  return (
    <MobileLayout onNavigate={onNavigate} currentView="bets">
      {/* Header Principal */}
      <Header points={points} />

      {/* HEADER - CENTRADO */}
      <div style={{
        background: 'var(--bg-secondary)',
        padding: 'var(--space-3) var(--space-4)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid var(--border-primary)',
        position: 'relative',
      }}>
        {/* Back a la izquierda */}
        <button 
          onClick={() => onNavigate?.('dashboard')}
          style={{
            position: 'absolute',
            left: 'var(--space-4)',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-tertiary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-md)',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
          }}
        >
          <ChevronLeft size={18} />
        </button>

        {/* Título centrado */}
        <span style={{
          fontSize: 'var(--text-lg)',
          fontWeight: 'var(--font-black)',
          color: 'var(--text-primary)',
        }}>
          MIS APUESTAS
        </span>
        
        {/* Nueva apuesta a la derecha */}
        <button 
          onClick={onOpenModal}
          style={{
            position: 'absolute',
            right: 'var(--space-4)',
            width: 32,
            height: 32,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--color-primary)',
            border: 'none',
            borderRadius: 'var(--radius-md)',
            color: 'var(--bg-primary)',
            cursor: 'pointer',
          }}
        >
          <Plus size={18} />
        </button>
      </div>

      {/* CONTENIDO */}
      <div style={{ padding: 'var(--space-4)' }}>
        
        {/* STATS CARDS */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--space-3)',
          marginBottom: 0,
        }}>
          <StatCard 
            label="Total Apostado" 
            value={`€${stats.totalBet}`}
            icon={<Target size={18} />}
            color="var(--text-primary)"
          />
          <StatCard 
            label="Total Ganado" 
            value={`€${stats.totalWon.toFixed(0)}`}
            icon={<Award size={18} />}
            color="var(--color-primary)"
          />
          <StatCard 
            label="% Acierto" 
            value={`${stats.winRate}%`}
            icon={<TrendingUp size={18} />}
            color="var(--color-accent)"
          />
          <StatCard 
            label="Balance" 
            value={`${stats.profit >= 0 ? '+' : ''}€${stats.profit.toFixed(0)}`}
            icon={stats.profit >= 0 ? <TrendingUp size={18} /> : <TrendingDown size={18} />}
            color={stats.profit >= 0 ? 'var(--color-success)' : 'var(--color-error)'}
          />
        </div>

        {/* FILTROS */}
        <div style={{
          display: 'flex',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-3)',
          overflowX: 'auto',
          paddingBottom: 'var(--space-1)',
        }}>
          <FilterTab 
            label="Todas" 
            count={counts.all} 
            isActive={filter === 'all'}
            onClick={() => setFilter('all')}
          />
          <FilterTab 
            label="Pendientes" 
            count={counts.pending} 
            isActive={filter === 'pending'}
            onClick={() => setFilter('pending')}
            color="var(--color-warning)"
          />
          <FilterTab 
            label="Ganadas" 
            count={counts.won} 
            isActive={filter === 'won'}
            onClick={() => setFilter('won')}
            color="var(--color-success)"
          />
          <FilterTab 
            label="Perdidas" 
            count={counts.lost} 
            isActive={filter === 'lost'}
            onClick={() => setFilter('lost')}
            color="var(--color-error)"
          />
        </div>

        {/* LISTA DE APUESTAS */}
        {filteredBets.length === 0 ? (
          <EmptyState onNewBet={onOpenModal} />
        ) : (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
          }}>
            {filteredBets.map(bet => (
              <BetCard key={bet.id} bet={bet} />
            ))}
          </div>
        )}
      </div>

    </MobileLayout>
  );
};

// Componentes auxiliares

function StatCard({ 
  label, 
  value, 
  icon,
  color,
}: { 
  label: string; 
  value: string;
  icon: React.ReactNode;
  color: string;
}) {
  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-primary)',
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-1) var(--space-2)',
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        marginBottom: 0,
        color: 'var(--text-secondary)',
      }}>
        {icon}
        <span style={{
          fontSize: 'var(--text-xs)',
          fontWeight: 'var(--font-medium)',
          color: 'var(--text-secondary)',
        }}>
          {label}
        </span>
      </div>
      <span style={{
        fontSize: 'var(--text-xl)',
        fontWeight: 'var(--font-black)',
        color: color,
      }}>
        {value}
      </span>
    </div>
  );
}

function FilterTab({ 
  label, 
  count, 
  isActive, 
  onClick,
  color = 'var(--color-primary)',
}: { 
  label: string; 
  count: number;
  isActive: boolean;
  onClick: () => void;
  color?: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        padding: 'var(--space-2)',
        background: isActive ? 'var(--bg-elevated)' : 'transparent',
        border: isActive ? `1px solid ${color}` : '1px solid var(--border-primary)',
        borderRadius: 'var(--radius-full)',
        cursor: 'pointer',
        whiteSpace: 'nowrap',
      }}
    >
      <span style={{
        fontSize: 'var(--text-xs)',
        fontWeight: isActive ? 'var(--font-bold)' : 'var(--font-medium)',
        color: isActive ? color : 'var(--text-secondary)',
      }}>
        {label}
      </span>
      <span style={{
        fontSize: 'var(--text-xs)',
        fontWeight: 'var(--font-bold)',
        color: isActive ? 'var(--bg-primary)' : 'var(--text-secondary)',
        background: isActive ? color : 'var(--bg-tertiary)',
        padding: '1px 6px',
        borderRadius: 'var(--radius-full)',
      }}>
        {count}
      </span>
    </button>
  );
}

// Función para extraer equipos del string "EquipoA vs EquipoB"
function parseMatchTeams(matchStr: string): { home: string; away: string } {
  const parts = matchStr.split(' vs ');
  return {
    home: parts[0]?.trim() || '',
    away: parts[1]?.trim() || ''
  };
}

// Emoji flags fallback
const FLAG_EMOJIS: Record<string, string> = {
  'México': '🇲🇽',
  'Sudáfrica': '🇿🇦',
  'Corea del Sur': '🇰🇷',
  'Brasil': '🇧🇷',
  'Marruecos': '🇲🇦',
  'EE.UU.': '🇺🇸',
  'Paraguay': '🇵🇾',
  'Canadá': '🇨🇦',
  'España': '🇪🇸',
  'Cabo Verde': '🇨🇻',
  'Argentina': '🇦🇷',
  'Argelia': '🇩🇿',
  'Inglaterra': '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  'Croacia': '🇭🇷',
  'Francia': '🇫🇷',
  'Senegal': '🇸🇳',
  'Alemania': '🇩🇪',
  'Curazao': '🇨🇼',
  'Colombia': '🇨🇴',
  'Portugal': '🇵🇹',
  'Japón': '🇯🇵',
  'Uruguay': '🇺🇾',
  'Bélgica': '🇧🇪',
  'Países Bajos': '🇳🇱',
  'Italia': '🇮🇹',
};

function BetCard({ bet }: { bet: Bet }) {
  const potential = (bet.amount * bet.odds).toFixed(2);
  const profit = (parseFloat(potential) - bet.amount).toFixed(2);
  const teams = parseMatchTeams(bet.match);

  const getStatusConfig = () => {
    switch (bet.status) {
      case 'won': 
        return { 
          label: 'GANADA', 
          icon: <CheckCircle2 size={14} />,
          color: 'var(--color-success)',
          bgColor: 'rgba(0, 200, 83, 0.1)',
        };
      case 'lost': 
        return { 
          label: 'PERDIDA', 
          icon: <XCircle size={14} />,
          color: 'var(--color-error)',
          bgColor: 'rgba(255, 23, 68, 0.1)',
        };
      default: 
        return { 
          label: 'PENDIENTE', 
          icon: <Clock size={14} />,
          color: 'var(--color-warning)',
          bgColor: 'rgba(255, 193, 7, 0.1)',
        };
    }
  };

  const status = getStatusConfig();

  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-primary)',
      borderLeft: `3px solid ${status.color}`,
      borderRadius: 'var(--radius-xl)',
      padding: 'var(--space-2)',
    }}>
      {/* Header con banderas */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 'var(--space-1)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}>
          {/* Banderas */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}>
            {teams.home && (
              <FlagEmoji country={teams.home} />
            )}
            <span style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
              fontWeight: 'var(--font-bold)',
              padding: '0 var(--space-1)',
            }}>vs</span>
            {teams.away && (
              <FlagEmoji country={teams.away} />
            )}
          </div>
          
          {/* Info */}
          <div>
            <div style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)',
            }}>
              {bet.match}
            </div>
            <div style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
            }}>
              {bet.typeName || bet.type}
            </div>
          </div>
        </div>
        
        {/* Status badge */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '4px',
          padding: '2px 8px',
          background: status.bgColor,
          borderRadius: 'var(--radius-md)',
          color: status.color,
          fontSize: '10px',
          fontWeight: 'var(--font-black)',
        }}>
          {status.icon}
          {status.label}
        </div>
      </div>

      {/* Pick y Odds */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-2)',
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-lg)',
        marginBottom: 'var(--space-2)',
      }}>
        <span style={{
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-bold)',
          color: 'var(--text-primary)',
        }}>
          {bet.pick}
        </span>
        <span style={{
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-black)',
          color: 'var(--color-primary)',
        }}>
          ×{bet.odds.toFixed(2)}
        </span>
      </div>

      {/* Footer - Apostado y Resultado */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        <div>
          <span style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
          }}>
            Apostado: {' '}
          </span>
          <span style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--text-primary)',
          }}>
            €{bet.amount}
          </span>
        </div>
        
        {bet.status === 'won' && (
          <span style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-success)',
          }}>
            +€{profit} ✓
          </span>
        )}
        {bet.status === 'lost' && (
          <span style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-error)',
          }}>
            -€{bet.amount}
          </span>
        )}
        {bet.status === 'pending' && (
          <span style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-warning)',
          }}>
            → €{potential}
          </span>
        )}
      </div>
    </div>
  );
}

function EmptyState({ onNewBet }: { onNewBet: () => void }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: 'var(--space-4) var(--space-3)',
      textAlign: 'center',
    }}>
      <div style={{
        width: 64,
        height: 64,
        background: 'var(--bg-tertiary)',
        borderRadius: 'var(--radius-xl)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '32px',
        marginBottom: 'var(--space-3)',
      }}>
        🎫
      </div>
      <h3 style={{
        fontSize: 'var(--text-lg)',
        fontWeight: 'var(--font-bold)',
        color: 'var(--text-primary)',
        marginBottom: 'var(--space-2)',
      }}>
        No hay apuestas
      </h3>
      <p style={{
        fontSize: 'var(--text-sm)',
        color: 'var(--text-secondary)',
        marginBottom: 'var(--space-6)',
      }}>
        Empieza a apostar en los partidos del Mundial 2026
      </p>
      <button
        onClick={onNewBet}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          padding: 'var(--space-3) var(--space-6)',
          background: 'var(--color-primary)',
          border: 'none',
          borderRadius: 'var(--radius-lg)',
          color: 'var(--bg-primary)',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-bold)',
          cursor: 'pointer',
        }}
      >
        <Plus size={18} />
        Nueva Apuesta
      </button>
    </div>
  );
}

function FlagEmoji({ country }: { country: string }) {
  const flagUrl = getFlagImage(country, 40);
  const emoji = FLAG_EMOJIS[country] || '🏳️';
  
  return (
    <img
      src={flagUrl}
      alt={country}
      onError={(e) => {
        // Si la imagen falla, reemplazar con emoji
        const target = e.currentTarget;
        target.style.display = 'none';
        const parent = target.parentElement;
        if (parent) {
          const span = document.createElement('span');
          span.textContent = emoji;
          span.style.fontSize = '18px';
          parent.insertBefore(span, target);
        }
      }}
      style={{
        width: 24,
        height: 18,
        borderRadius: 'var(--radius-sm)',
        objectFit: 'cover',
        boxShadow: 'var(--shadow-sm)',
      }}
    />
  );
}


