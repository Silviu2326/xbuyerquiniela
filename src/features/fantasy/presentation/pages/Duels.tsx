import { useState } from 'react';
import { Swords, Plus, Skull, Trophy, Check } from 'lucide-react';
import { Card } from '../components/ui/Card';

import { useFantasyStore } from '../../application/store/fantasyStore';
import { useRanking } from '../../application/hooks/useFantasy';

interface DuelsPageProps {
  onNavigate?: (view: string) => void;
}

interface Duel {
  id: string;
  opponent: {
    id: string;
    name: string;
    initials: string;
    points: number;
  };
  pointsAtStake: number;
  status: 'live' | 'pending' | 'finished';
  myScore: number;
  opponentScore: number;
  matchday: number;
  winnerId?: string;
  result?: 'win' | 'loss';
}

const MOCK_DUELS: Duel[] = [
  {
    id: 'd1',
    opponent: { id: 'u2', name: 'Gabriel V.', initials: 'GV', points: 174 },
    pointsAtStake: 20,
    status: 'live',
    myScore: 38,
    opponentScore: 32,
    matchday: 1,
  },
  {
    id: 'd2',
    opponent: { id: 'u5', name: 'Lucas B.', initials: 'LB', points: 155 },
    pointsAtStake: 15,
    status: 'pending',
    myScore: 0,
    opponentScore: 0,
    matchday: 2,
  },
];

const MOCK_HISTORY: Duel[] = [
  {
    id: 'h1',
    opponent: { id: 'u2', name: 'Gabriel V.', initials: 'GV', points: 174 },
    pointsAtStake: 10,
    status: 'finished',
    myScore: 45,
    opponentScore: 38,
    matchday: 1,
    result: 'win',
  },
  {
    id: 'h2',
    opponent: { id: 'u3', name: 'Lucas B.', initials: 'LB', points: 155 },
    pointsAtStake: 15,
    status: 'finished',
    myScore: 32,
    opponentScore: 47,
    matchday: 1,
    result: 'loss',
  },
  {
    id: 'h3',
    opponent: { id: 'u4', name: 'Matías R.', initials: 'MR', points: 168 },
    pointsAtStake: 20,
    status: 'finished',
    myScore: 52,
    opponentScore: 32,
    matchday: 1,
    result: 'win',
  },
];

const MOCK_RIVALS = [
  { id: 'u2', name: 'Gabriel V.', initials: 'GV', points: 174, position: 2 },
  { id: 'u3', name: 'Matías R.', initials: 'MR', points: 168, position: 3 },
  { id: 'u4', name: 'Lucas B.', initials: 'LB', points: 155, position: 4 },
  { id: 'u5', name: 'Diego M.', initials: 'DM', points: 142, position: 5 },
];

const STAKE_OPTIONS = [5, 10, 15, 20, 30];

export function DuelsPage({ onNavigate: _onNavigate }: DuelsPageProps) {
  useFantasyStore();
  const { myStanding } = useRanking();
  // Modal para crear duelo - implementar más adelante
  // const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedStake, setSelectedStake] = useState(10);
  const [selectedRival, setSelectedRival] = useState<string | null>(null);

  const activeDuels = MOCK_DUELS.filter(d => d.status !== 'finished');

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div style={{ padding: 'var(--space-4)' }}>
        {/* HEADER DEL TÍTULO */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'var(--space-6)',
        }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: 'var(--bg-secondary)',
            border: '2px solid var(--border-primary)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-3)',
          }}>
            <Swords size={28} style={{ color: 'var(--text-secondary)' }} />
          </div>
          <h2 style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-black)',
            color: 'var(--text-primary)',
            marginBottom: 'var(--space-1)',
          }}>
            Duelos 1 vs 1
          </h2>
          <p style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
            maxWidth: 280,
            margin: '0 auto',
            lineHeight: 1.5,
          }}>
            Apuesta puntos directos contra otro jugador. El ganador de la jornada se lleva los puntos apostados.
          </p>
        </div>

        {/* DUELOS ACTIVOS */}
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-3)',
          }}>
            <span style={{ fontSize: 'var(--text-lg)' }}>🔥</span>
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)',
            }}>
              Duelos activos
            </span>
          </div>

          {activeDuels.map((duel) => (
            <Card
              key={duel.id}
              variant="elevated"
              style={{ marginBottom: 'var(--space-3)' }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'var(--space-3)',
              }}>
                <span style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-bold)',
                  color: duel.status === 'live' ? '#EF4444' : '#F59E0B',
                  background: duel.status === 'live' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(245, 158, 11, 0.1)',
                  padding: '4px 10px',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  {duel.status === 'live' && <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#EF4444', animation: 'pulse 1.5s infinite' }} />}
                  {duel.status === 'live' ? 'EN VIVO' : 'PENDIENTE'}
                </span>
                <span style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--color-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <Trophy size={12} /> {duel.pointsAtStake} pts
                </span>
              </div>

              {/* VERSUS */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--space-3)',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-lg)',
              }}>
                {/* YO */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  flex: 1,
                }}>
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: duel.status === 'live' && duel.myScore > duel.opponentScore 
                      ? 'linear-gradient(135deg, #FFE600 0%, #cca300 100%)' 
                      : 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-black)',
                    color: duel.status === 'live' && duel.myScore > duel.opponentScore ? '#000' : 'var(--text-primary)',
                    border: duel.status === 'live' && duel.myScore > duel.opponentScore ? '3px solid #FFE600' : '2px solid #2a2a3a',
                    boxShadow: duel.status === 'live' && duel.myScore > duel.opponentScore ? '0 0 20px rgba(255, 230, 0, 0.3)' : 'none',
                  }}>
                    {myStanding?.userName?.substring(0, 2).toUpperCase() || 'YO'}
                  </div>
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--text-primary)',
                  }}>
                    Tú
                  </span>
                  <span style={{
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-black)',
                    color: duel.status === 'live' && duel.myScore > duel.opponentScore ? '#FFE600' : 'var(--text-primary)',
                  }}>
                    {duel.myScore}
                  </span>
                </div>

                {/* VS */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--space-1)',
                  padding: '0 var(--space-4)',
                }}>
                  <span style={{
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-black)',
                    color: 'var(--text-tertiary)',
                    letterSpacing: '2px',
                  }}>
                    VS
                  </span>
                  {duel.status === 'live' && (
                    <span style={{
                      fontSize: '10px',
                      color: '#EF4444',
                      fontWeight: 'var(--font-bold)',
                      animation: 'pulse 1.5s infinite',
                    }}>
                      LIVE
                    </span>
                  )}
                </div>

                {/* OPONENTE */}
                <div style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  flex: 1,
                }}>
                  <div style={{
                    width: 64,
                    height: 64,
                    borderRadius: '50%',
                    background: duel.status === 'live' && duel.opponentScore > duel.myScore 
                      ? 'linear-gradient(135deg, #EF4444 0%, #cc0000 100%)' 
                      : 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-black)',
                    color: duel.status === 'live' && duel.opponentScore > duel.myScore ? '#fff' : 'var(--text-primary)',
                    border: duel.status === 'live' && duel.opponentScore > duel.myScore ? '3px solid #EF4444' : '2px solid var(--border-primary)',
                    boxShadow: duel.status === 'live' && duel.opponentScore > duel.myScore ? '0 0 20px rgba(239, 68, 68, 0.3)' : 'none',
                  }}>
                    {duel.opponent.initials}
                  </div>
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--text-primary)',
                  }}>
                    {duel.opponent.name}
                  </span>
                  <span style={{
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-black)',
                    color: duel.status === 'live' && duel.opponentScore > duel.myScore ? '#EF4444' : 'var(--text-primary)',
                  }}>
                    {duel.opponentScore}
                  </span>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* RETAR A UN RIVAL */}
        <Card style={{ marginBottom: 'var(--space-4)' }}>
          <Card.Header>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
            }}>
              <Plus size={16} style={{ color: 'var(--color-primary)' }} />
              <span style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
              }}>
                Retar a un rival
              </span>
            </div>
          </Card.Header>
          <Card.Body>
            <p style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
              marginBottom: 'var(--space-3)',
            }}>
              Elige cuántos puntos apostar:
            </p>
            <div style={{
              display: 'flex',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-4)',
            }}>
              {STAKE_OPTIONS.map((stake) => (
                <button
                  key={stake}
                  onClick={() => setSelectedStake(stake)}
                  style={{
                    flex: 1,
                    padding: 'var(--space-3)',
                    background: selectedStake === stake ? 'var(--color-primary)' : 'var(--bg-tertiary)',
                    border: `1px solid ${selectedStake === stake ? 'var(--color-primary)' : 'var(--border-primary)'}`,
                    borderRadius: 'var(--radius-lg)',
                    color: selectedStake === stake ? 'var(--bg-primary)' : 'var(--text-primary)',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-bold)',
                    cursor: 'pointer',
                  }}
                >
                  {stake}
                </button>
              ))}
            </div>

            <p style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
              marginBottom: 'var(--space-3)',
            }}>
              Elige rival:
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
              {MOCK_RIVALS.map((rival) => (
                <button
                  key={rival.id}
                  onClick={() => setSelectedRival(selectedRival === rival.id ? null : rival.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-3)',
                    background: selectedRival === rival.id ? 'rgba(0, 255, 148, 0.1)' : 'var(--bg-tertiary)',
                    border: `1px solid ${selectedRival === rival.id ? 'var(--color-primary)' : 'var(--border-primary)'}`,
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: 'var(--bg-secondary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--text-primary)',
                  }}>
                    {rival.initials}
                  </div>
                  <div style={{ flex: 1 }}>
                    <span style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-bold)',
                      color: 'var(--text-primary)',
                    }}>
                      {rival.name}
                    </span>
                    <span style={{
                      display: 'block',
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-tertiary)',
                    }}>
                      {rival.points} pts • #{rival.position}
                    </span>
                  </div>
                  {selectedRival === rival.id && (
                    <Check size={20} style={{ color: 'var(--color-primary)' }} />
                  )}
                </button>
              ))}
            </div>

            {/* BOTÓN INICIAR DUELO */}
            {selectedRival && (
              <button
                onClick={() => {
                  const rival = MOCK_RIVALS.find(r => r.id === selectedRival);
                  alert(`¡Duelo creado!\n\nApostaste ${selectedStake} puntos contra ${rival?.name}\n\nEl duelo comenzará en la próxima jornada.`);
                  setSelectedRival(null);
                }}
                style={{
                  marginTop: 'var(--space-4)',
                  padding: 'var(--space-4)',
                  background: 'var(--color-primary)',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  color: '#000',
                  fontSize: 'var(--text-md)',
                  fontWeight: 'var(--font-black)',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: 'var(--space-2)',
                  width: '100%',
                }}
              >
                <Swords size={20} />
                Iniciar Duelo ({selectedStake} pts)
              </button>
            )}
          </Card.Body>
        </Card>

        {/* HISTORIAL */}
        <div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-3)',
          }}>
            <span style={{ fontSize: 'var(--text-lg)' }}>📜</span>
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)',
            }}>
              Historial
            </span>
          </div>

          <Card variant="elevated">
            {MOCK_HISTORY.map((duel, idx) => (
              <div
                key={duel.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  borderBottom: idx < MOCK_HISTORY.length - 1 ? '1px solid var(--border-primary)' : 'none',
                }}
              >
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: duel.result === 'win' ? 'rgba(0, 255, 148, 0.2)' : 'rgba(239, 68, 68, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {duel.result === 'win' ? (
                    <Trophy size={14} style={{ color: 'var(--color-primary)' }} />
                  ) : (
                    <Skull size={14} style={{ color: '#EF4444' }} />
                  )}
                </div>
                <div style={{ flex: 1 }}>
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--text-primary)',
                  }}>
                    vs {duel.opponent.name}
                  </span>
                  <span style={{
                    display: 'block',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-tertiary)',
                  }}>
                    Apostado: {duel.pointsAtStake} pts
                  </span>
                </div>
                <span style={{
                  fontSize: 'var(--text-md)',
                  fontWeight: 'var(--font-black)',
                  color: duel.result === 'win' ? 'var(--color-primary)' : '#EF4444',
                }}>
                  {duel.result === 'win' ? '+' : ''}{duel.result === 'win' ? duel.pointsAtStake : -duel.pointsAtStake}
                </span>
              </div>
            ))}
          </Card>
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
