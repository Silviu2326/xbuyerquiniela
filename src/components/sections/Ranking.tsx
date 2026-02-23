import { useState } from 'react';
import {
  ChevronLeft,
  Trophy,
  TrendingUp,
  Zap,
  Search
} from 'lucide-react';
import { Header } from '../home/Header';
import { MobileLayout } from '../../features/fantasy/presentation/shared/MobileLayout';

interface RankingProps {
  onNavigate: (view: string) => void;
  points: number;
}

interface Player {
  rank: number;
  name: string;
  points: number;
  streak: number;
  country: string;
  avatar: string;
  isMe?: boolean;
}

// Datos de ejemplo para el ranking GLOBAL
const GLOBAL_PLAYERS = [
  { rank: 1, name: 'CarlosLopez23', points: 2847, streak: 12, country: 'México', avatar: '👑' },
  { rank: 2, name: 'MessiFan2026', points: 2723, streak: 8, country: 'Argentina', avatar: '🦅' },
  { rank: 3, name: 'Canarinho10', points: 2654, streak: 15, country: 'Brasil', avatar: '🐯' },
  { rank: 4, name: 'LuchoGamer', points: 2512, streak: 6, country: 'España', avatar: '🐂' },
  { rank: 5, name: 'MbappeSpeed', points: 2489, streak: 9, country: 'Francia', avatar: '🐓' },
  { rank: 6, name: 'KaneHurricane', points: 2456, streak: 5, country: 'Inglaterra', avatar: '🦁' },
  { rank: 7, name: 'HalandMachine', points: 2434, streak: 11, country: 'Noruega', avatar: '🔨' },
  { rank: 8, name: 'CR7Forever', points: 2398, streak: 7, country: 'Portugal', avatar: '⚡' },
  { rank: 9, name: 'NeymarJr', points: 2376, streak: 4, country: 'Brasil', avatar: '🇧🇷' },
  { rank: 10, name: 'DeBruyne17', points: 2345, streak: 8, country: 'Bélgica', avatar: '🔷' },
  { rank: 11, name: 'ModricMagic', points: 2312, streak: 6, country: 'Croacia', avatar: '🔴' },
  { rank: 12, name: 'SonHeungMin', points: 2289, streak: 5, country: 'Corea del Sur', avatar: '⚪' },
  { rank: 13, name: 'LewyGoals', points: 2267, streak: 9, country: 'Polonia', avatar: '⚪' },
  { rank: 14, name: 'OchoaSaves', points: 2245, streak: 10, country: 'México', avatar: '🧤' },
  { rank: 15, name: 'MusialaMagic', points: 2212, streak: 4, country: 'Alemania', avatar: '⚫' },
];

// Datos de AMIGOS (diferentes)
const FRIENDS_PLAYERS = [
  { rank: 1, name: 'LuisAmigo23', points: 2156, streak: 8, country: 'México', avatar: '🦊' },
  { rank: 2, name: 'AnaFutbolera', points: 2089, streak: 6, country: 'España', avatar: '🌸' },
  { rank: 3, name: 'PedroGol', points: 1954, streak: 4, country: 'Argentina', avatar: '🎯' },
  { rank: 4, name: 'MariaLeyenda', points: 1897, streak: 7, country: 'Colombia', avatar: '💎' },
  { rank: 5, name: 'JuanTactico', points: 1823, streak: 3, country: 'Chile', avatar: '🧠' },
  { rank: 6, name: 'SofiaSkills', points: 1756, streak: 5, country: 'España', avatar: '⚡' },
  { rank: 7, name: 'DiegoDefensa', points: 1689, streak: 2, country: 'Uruguay', avatar: '🛡️' },
];

// Datos SEMANAL (solo esta semana)
const WEEKLY_PLAYERS = [
  { rank: 1, name: 'SemanaHeroe', points: 523, streak: 5, country: 'Brasil', avatar: '🔥' },
  { rank: 2, name: 'GolSemanal', points: 487, streak: 4, country: 'Francia', avatar: '⚽' },
  { rank: 3, name: 'RachaLoca', points: 456, streak: 6, country: 'Alemania', avatar: '🚀' },
  { rank: 4, name: 'PrediccionPro', points: 423, streak: 3, country: 'Italia', avatar: '🔮' },
  { rank: 5, name: 'FantasyKing', points: 398, streak: 4, country: 'Inglaterra', avatar: '👑' },
  { rank: 6, name: 'ApuestaSegura', points: 367, streak: 2, country: 'Portugal', avatar: '💰' },
  { rank: 7, name: 'MundialMaster', points: 345, streak: 3, country: 'México', avatar: '🏆' },
];

// Usuario actual en cada modo
const CURRENT_USER_GLOBAL: Player = { rank: 47, name: 'Tú', points: 1847, streak: 3, country: 'España', avatar: '👤', isMe: true };
const CURRENT_USER_FRIENDS: Player = { rank: 8, name: 'Tú', points: 1847, streak: 3, country: 'España', avatar: '👤', isMe: true };
const CURRENT_USER_WEEKLY: Player = { rank: 12, name: 'Tú', points: 234, streak: 2, country: 'España', avatar: '👤', isMe: true };

export const Ranking = ({ onNavigate, points }: RankingProps) => {
  const [activeTab, setActiveTab] = useState<'global' | 'friends' | 'weekly'>('global');
  const [searchQuery, setSearchQuery] = useState('');

  const TOP_PLAYERS = activeTab === 'global' ? GLOBAL_PLAYERS :
    activeTab === 'friends' ? FRIENDS_PLAYERS :
      WEEKLY_PLAYERS;

  const CURRENT_USER = activeTab === 'global' ? CURRENT_USER_GLOBAL :
    activeTab === 'friends' ? CURRENT_USER_FRIENDS :
      CURRENT_USER_WEEKLY;

  const filteredPlayers = TOP_PLAYERS.filter(p =>
    p.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <MobileLayout onNavigate={onNavigate} currentView="ranking">
      {/* Header Principal */}
      <Header points={points} />

      <div style={{ paddingBottom: 90 }}>
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
            onClick={() => onNavigate('dashboard')}
            style={{
              position: 'absolute',
              left: 'var(--space-4)',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-1)',
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              fontSize: 'var(--text-sm)',
            }}
          >
            <ChevronLeft size={18} />
            Inicio
          </button>

          {/* Título centrado */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}>
            <Trophy size={24} style={{ color: 'var(--color-accent)' }} />
            <span style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-black)',
              color: 'var(--text-primary)',
            }}>
              RANKING
            </span>
          </div>

          {/* Puntos a la derecha */}
          <div style={{
            position: 'absolute',
            right: 'var(--space-4)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}>

          </div>
        </div>

        {/* CONTENIDO */}
        <div style={{ padding: 'var(--space-4)' }}>

          {/* TABS */}
          <div style={{
            display: 'flex',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-4)',
          }}>
            <TabButton
              label="Global"
              isActive={activeTab === 'global'}
              onClick={() => setActiveTab('global')}
            />
            <TabButton
              label="Amigos"
              isActive={activeTab === 'friends'}
              onClick={() => setActiveTab('friends')}
            />
            <TabButton
              label="Semanal"
              isActive={activeTab === 'weekly'}
              onClick={() => setActiveTab('weekly')}
            />
          </div>

          {/* MI POSICIÓN */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0,200,83,0.15) 0%, rgba(0,163,68,0.1) 100%)',
            border: '1px solid var(--color-primary)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-4)',
            marginBottom: 'var(--space-4)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
              }}>
                <div style={{
                  width: 48,
                  height: 48,
                  background: 'var(--color-primary)',
                  borderRadius: 'var(--radius-lg)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-black)',
                  color: 'var(--bg-primary)',
                }}>
                  #{CURRENT_USER.rank}
                </div>
                <div>
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-primary)',
                    fontWeight: 'var(--font-bold)',
                    marginBottom: '2px',
                  }}>
                    TU POSICIÓN
                  </div>
                  <div style={{
                    fontSize: 'var(--text-md)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--text-primary)',
                  }}>
                    {CURRENT_USER.name}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-secondary)',
                  }}>
                    {CURRENT_USER.country} · {CURRENT_USER.points} pts · {CURRENT_USER.streak}🔥
                  </div>
                </div>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-1)',
                color: 'var(--color-primary)',
              }}>
                <TrendingUp size={18} />
                <span style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-bold)',
                }}>+5</span>
              </div>
            </div>
          </div>

          {/* PODIO - TOP 3 */}
          <div style={{
            marginBottom: 'var(--space-4)',
          }}>
            <div style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-black)',
              color: 'var(--text-tertiary)',
              letterSpacing: '1px',
              marginBottom: 'var(--space-3)',
            }}>
              PODIO 🏆
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1.2fr 1fr',
              gap: 'var(--space-2)',
              alignItems: 'end',
            }}>
              {/* 2º Lugar */}
              <PodiumCard
                player={TOP_PLAYERS[1]}
                position={2}
                color="#C0C0C0"
                height={120}
              />
              {/* 1º Lugar */}
              <PodiumCard
                player={TOP_PLAYERS[0]}
                position={1}
                color="#FFD700"
                height={150}
                isWinner
              />
              {/* 3º Lugar */}
              <PodiumCard
                player={TOP_PLAYERS[2]}
                position={3}
                color="#CD7F32"
                height={100}
              />
            </div>
          </div>

          {/* BUSCADOR */}
          <div style={{
            position: 'relative',
            marginBottom: 'var(--space-4)',
          }}>
            <Search size={18} style={{
              position: 'absolute',
              left: 'var(--space-3)',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--text-tertiary)',
            }} />
            <input
              type="text"
              placeholder="Buscar jugador..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: 'var(--space-3) var(--space-3) var(--space-3) 44px',
                background: 'var(--bg-secondary)',
                border: '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-lg)',
                color: 'var(--text-primary)',
                fontSize: 'var(--text-sm)',
                outline: 'none',
              }}
            />
          </div>

          {/* LISTA DE RANKING */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
          }}>
            <div style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-black)',
              color: 'var(--text-tertiary)',
              letterSpacing: '1px',
              marginBottom: 'var(--space-1)',
            }}>
              TOP JUGADORES
            </div>

            {filteredPlayers.slice(3).map((player) => (
              <RankCard key={player.rank} player={player} />
            ))}

            {/* Separador y posición del usuario */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              padding: 'var(--space-2) 0',
            }}>
              <div style={{ flex: 1, height: 1, background: 'var(--border-primary)' }} />
              <span style={{ fontSize: 'var(--text-xs)', color: 'var(--text-tertiary)' }}>...</span>
              <div style={{ flex: 1, height: 1, background: 'var(--border-primary)' }} />
            </div>

            <RankCard player={CURRENT_USER} isMe />
          </div>
        </div>

      </div>
    </MobileLayout>
  );
};

// Componentes auxiliares

function TabButton({ label, isActive, onClick }: { label: string; isActive: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        flex: 1,
        padding: 'var(--space-3)',
        background: isActive ? 'var(--bg-elevated)' : 'transparent',
        border: isActive ? '1px solid var(--color-primary)' : '1px solid var(--border-primary)',
        borderRadius: 'var(--radius-lg)',
        cursor: 'pointer',
        fontSize: 'var(--text-sm)',
        fontWeight: isActive ? 'var(--font-bold)' : 'var(--font-medium)',
        color: isActive ? 'var(--color-primary)' : 'var(--text-secondary)',
      }}
    >
      {label}
    </button>
  );
}

function PodiumCard({
  player,
  position,
  color,
  height,
  isWinner
}: {
  player: Player;
  position: number;
  color: string;
  height: number;
  isWinner?: boolean;
}) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--space-2)',
    }}>
      {/* Avatar y medalla */}
      <div style={{
        position: 'relative',
      }}>
        <div style={{
          width: isWinner ? 64 : 52,
          height: isWinner ? 64 : 52,
          background: 'var(--bg-tertiary)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: isWinner ? '32px' : '24px',
          border: `3px solid ${color}`,
          boxShadow: `0 0 20px ${color}40`,
        }}>
          {player.avatar}
        </div>
        <div style={{
          position: 'absolute',
          bottom: -4,
          left: '50%',
          transform: 'translateX(-50%)',
          width: 24,
          height: 24,
          background: color,
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '14px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.3)',
        }}>
          {position === 1 ? '👑' : position === 2 ? '🥈' : '🥉'}
        </div>
      </div>

      {/* Info */}
      <div style={{
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: isWinner ? 'var(--text-md)' : 'var(--text-sm)',
          fontWeight: 'var(--font-bold)',
          color: 'var(--text-primary)',
          marginBottom: '2px',
        }}>
          {player.name}
        </div>
        <div style={{
          fontSize: isWinner ? 'var(--text-xl)' : 'var(--text-lg)',
          fontWeight: 'var(--font-black)',
          color: color,
        }}>
          {player.points}
        </div>
        <div style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--text-tertiary)',
        }}>
          pts · {player.streak}🔥
        </div>
      </div>

      {/* Base del podio */}
      <div style={{
        width: '100%',
        height: height,
        background: `linear-gradient(180deg, ${color}30 0%, ${color}10 100%)`,
        borderRadius: 'var(--radius-lg) var(--radius-lg) 0 0',
        border: `1px solid ${color}50`,
        borderBottom: 'none',
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        paddingBottom: 'var(--space-2)',
      }}>
        <span style={{
          fontSize: 'var(--text-2xl)',
          fontWeight: 'var(--font-black)',
          color: color,
        }}>
          {position}
        </span>
      </div>
    </div>
  );
}

function RankCard({ player, isMe }: { player: Player; isMe?: boolean }) {
  const isTop5 = player.rank <= 5;

  return (
    <div style={{
      background: isMe ? 'rgba(0,200,83,0.1)' : 'var(--bg-secondary)',
      border: isMe ? '1px solid var(--color-primary)' : '1px solid var(--border-primary)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-3)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--space-3)',
    }}>
      {/* Rank */}
      <div style={{
        minWidth: 36,
        textAlign: 'center',
        fontSize: 'var(--text-md)',
        fontWeight: 'var(--font-black)',
        color: isTop5 ? 'var(--color-accent)' : isMe ? 'var(--color-primary)' : 'var(--text-tertiary)',
      }}>
        #{player.rank}
      </div>

      {/* Avatar */}
      <div style={{
        width: 44,
        height: 44,
        background: 'var(--bg-tertiary)',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: '20px',
      }}>
        {player.avatar}
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <div style={{
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-bold)',
          color: 'var(--text-primary)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-1)',
        }}>
          {player.name}
          {isMe && (
            <span style={{
              fontSize: '10px',
              padding: '2px 6px',
              background: 'var(--color-primary)',
              color: 'var(--bg-primary)',
              borderRadius: 'var(--radius-sm)',
            }}>
              TÚ
            </span>
          )}
        </div>
        <div style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--text-tertiary)',
        }}>
          {player.country}
        </div>
      </div>

      {/* Stats */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
      }}>
        <div style={{
          textAlign: 'right',
        }}>
          <div style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-black)',
            color: 'var(--text-primary)',
          }}>
            {player.points}
          </div>
          <div style={{
            fontSize: '10px',
            color: 'var(--text-tertiary)',
          }}>
            pts
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2px',
          padding: 'var(--space-1) var(--space-2)',
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-md)',
        }}>
          <span style={{ fontSize: '12px' }}>🔥</span>
          <span style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--text-primary)',
          }}>
            {player.streak}
          </span>
        </div>
      </div>
    </div>
  );
}


