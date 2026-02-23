import { useEffect, useState } from 'react';
import { ChevronRight, Trophy, TrendingUp, Zap, Crown, Target, Check, X } from 'lucide-react';
import { Card } from '../components/ui/Card';

import { useFantasy, useRanking } from '../../application/hooks/useFantasy';
import { MOCK_NATIONS, MOCK_PLAYERS, MOCK_MATCHDAYS, MOCK_STANDINGS } from '../../infrastructure/repositories/mockData';
import { useFantasyStore } from '../../application/store/fantasyStore';

const NATION_FLAGS: Record<string, string> = {
  arg: '🇦🇷',
  bra: '🇧🇷',
  fra: '🇫🇷',
  esp: '🇪🇸',
  eng: '🏴󠁧󠁢󠁥󠁮󠁧󠁿',
  ger: '🇩🇪',
  kor: '🇰🇷',
  ned: '🇳🇱',
  cro: '🇭🇷',
  uru: '🇺🇾',
  mar: '🇲🇦',
  tbd: '❓',
};

const MOCK_PREDICTIONS_SUMMARY = [
  {
    id: 'p1',
    match: 'Argentina vs TBD',
    homeTeam: 'arg',
    awayTeam: 'tbd',
    prediction: '2-0',
    result: '2-0',
    points: 15,
    status: 'exact',
  },
  {
    id: 'p2',
    match: 'España vs TBD',
    homeTeam: 'esp',
    awayTeam: 'tbd',
    prediction: '3-1',
    result: '3-0',
    points: 5,
    status: 'winner',
  },
  {
    id: 'p3',
    match: 'Francia vs Corea',
    homeTeam: 'fra',
    awayTeam: 'kor',
    prediction: '2-1',
    result: '2-1',
    points: 15,
    status: 'exact',
  },
  {
    id: 'p4',
    match: 'Brasil vs TBD',
    homeTeam: 'bra',
    awayTeam: 'tbd',
    prediction: '1-1',
    result: '2-0',
    points: 0,
    status: 'wrong',
  },
];

const SCORING_SYSTEM = [
  { label: 'Resultado exacto', points: 15 },
  { label: 'Acertar ganador', points: 5 },
  { label: 'Fallo', points: 0 },
  { label: 'Gol de tu jugador', points: 6 },
  { label: 'Asistencia', points: 4 },
  { label: 'Portería a cero', points: 5 },
];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
interface FantasyDashboardProps {
  onNavigate?: (view: string) => void;
}

export function FantasyDashboard({ onNavigate: _onNavigate }: FantasyDashboardProps) {
  const { loadNations, loadPlayers, loadMatchdays, loadStandings, currentMatchday } = useFantasy();
  const { myStanding, standings } = useRanking();
  const { setView, setSelectedUser } = useFantasyStore();

  useEffect(() => {
    loadNations(MOCK_NATIONS);
    loadPlayers(MOCK_PLAYERS);
    loadMatchdays(MOCK_MATCHDAYS);
    loadStandings(MOCK_STANDINGS);
  }, []);

  // Timer logic
  const [totalSeconds, setTotalSeconds] = useState(48 * 3600 + 32 * 60 + 15);

  useEffect(() => {
    const interval = setInterval(() => {
      setTotalSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const days = Math.floor(totalSeconds / 86400);
  const hours = Math.floor((totalSeconds % 86400) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  const sortedStandings = [...standings].sort((a, b) => a.position - b.position);
  const top3 = sortedStandings.slice(0, 3);
  const rest = sortedStandings.slice(3);

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div style={{ padding: 'var(--space-4)' }}>
        {/* CONTADOR JORNADA */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-4)',
          marginBottom: 'var(--space-4)',
          textAlign: 'center',
        }}>
          <p style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--text-secondary)',
            textTransform: 'uppercase',
            letterSpacing: '2px',
            marginBottom: 'var(--space-2)',
          }}>
            CIERRE JORNADA {currentMatchday}
          </p>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-1)',
            fontSize: '28px',
            fontWeight: 'var(--font-black)',
            color: '#FFFFFF',
          }}>
            {days > 0 && (
              <>
                <span>{days}d</span>
                <span style={{ color: 'var(--text-tertiary)' }}>:</span>
              </>
            )}
            <span>{String(hours).padStart(2, '0')}h</span>
            <span style={{ color: 'var(--text-tertiary)' }}>:</span>
            <span>{String(minutes).padStart(2, '0')}m</span>
            <span style={{ color: 'var(--text-tertiary)' }}>:</span>
            <span>{String(seconds).padStart(2, '0')}s</span>
          </div>
          <p style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
            marginTop: 'var(--space-2)',
          }}>
            Grupos • 11 Jun - 16 Jun
          </p>
        </div>

        {/* PUNTOS POR JORNADA */}
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-3)',
          }}>
            <span style={{ fontSize: 'var(--text-lg)' }}>📊</span>
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)',
            }}>
              Puntos por Jornada
            </span>
          </div>

          <div style={{
            display: 'flex',
            gap: 'var(--space-2)',
          }}>
            {[
              { id: 1, points: 65, date: '11 Jun', isActive: true },
              { id: 2, points: 72, date: '17 Jun', isActive: false },
              { id: 3, points: 50, date: '23 Jun', isActive: false },
            ].map((matchday) => (
              <button
                key={matchday.id}
                onClick={() => setView('predictions')}
                style={{
                  flex: 1,
                  padding: 'var(--space-3)',
                  background: 'var(--bg-secondary)',
                  border: `2px solid ${matchday.isActive ? '#FFE600' : 'var(--border-primary)'}`,
                  borderRadius: 'var(--radius-lg)',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <span style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-tertiary)',
                  textTransform: 'uppercase',
                }}>
                  JORNADA {matchday.id}
                </span>
                <span style={{
                  display: 'block',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-black)',
                  color: matchday.isActive ? '#FFE600' : 'var(--text-primary)',
                  marginTop: 'var(--space-1)',
                }}>
                  {matchday.points}
                </span>
                {matchday.isActive && (
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 'var(--font-bold)',
                    color: '#FFE600',
                    border: '1px solid #FFE600',
                    background: 'transparent',
                    padding: '2px 8px',
                    borderRadius: 'var(--radius-full)',
                    marginTop: '4px',
                    display: 'inline-block',
                  }}>
                    ACTIVA
                  </span>
                )}
                <span style={{
                  display: 'block',
                  fontSize: '10px',
                  color: 'var(--text-tertiary)',
                  marginTop: '2px',
                }}>
                  {matchday.date}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* STATS RÁPIDAS */}
        {myStanding && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-3)',
            marginBottom: 'var(--space-4)',
          }}>
            <StatCard
              icon={<Trophy size={20} />}
              value={`#${myStanding.position}`}
              label="POSICIÓN"
              iconColor="#FFE600"
              valueColor="#FFE600"
            />
            <StatCard
              icon={<Zap size={20} />}
              value={myStanding.totalPoints}
              label="PUNTOS"
              iconColor="#FFE600"
              valueColor="#FFE600"
            />
            <StatCard
              icon={<TrendingUp size={20} />}
              value={`+${myStanding.totalPoints - (sortedStandings[1]?.totalPoints || 0)}`}
              label="DIF. #1"
              iconColor="#9CA3AF"
              valueColor="#9CA3AF"
            />
          </div>
        )}

        {/* CLASIFICACIÓN */}
        <div style={{ marginBottom: 'var(--space-4)' }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-3)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', flex: 1 }}>
              <span style={{ fontSize: 'var(--text-lg)' }}>🏆</span>
              <span style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
              }}>
                Tu Liga • Amigos Mundial
              </span>
            </div>
            <button style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              background: 'transparent',
              border: 'none',
              color: '#9CA3AF',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-bold)',
              cursor: 'pointer',
              marginLeft: 'auto',
            }}>
              Ver todo <ChevronRight size={14} />
            </button>
          </div>

          <Card variant="elevated">
            {/* TOP 3 CON MEDALLAS */}
            {top3.map((standing, idx) => (
              <div
                key={standing.userId}
                onClick={() => {
                  setSelectedUser(standing.userId);
                  setView('user-detail');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  borderBottom: '1px solid var(--border-primary)',
                  background: 'transparent',
                  borderLeft: standing.isMe ? '3px solid #FFE600' : '3px solid transparent',
                  cursor: 'pointer',
                }}
              >
                {/* MEDALLA/POSICIÓN */}
                <div style={{
                  width: 32,
                  height: 32,
                  borderRadius: '50%',
                  background: idx === 0 
                    ? 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)'
                    : idx === 1
                    ? 'linear-gradient(135deg, #C0C0C0 0%, #808080 100%)'
                    : idx === 2
                    ? 'linear-gradient(135deg, #CD7F32 0%, #8B4513 100%)'
                    : 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-black)',
                  color: idx < 3 ? '#000' : 'var(--text-secondary)',
                }}>
                  {idx === 0 ? <Crown size={14} /> : standing.position}
                </div>

                {/* AVATAR E INICIALES */}
                <div style={{
                  width: 40,
                  height: 40,
                  borderRadius: '50%',
                  background: standing.isMe ? 'rgba(255, 230, 0, 0.15)' : 'var(--bg-tertiary)',
                  border: standing.isMe ? '1px solid #FFE600' : '1px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-bold)',
                  color: standing.isMe ? '#FFE600' : 'var(--text-primary)',
                }}>
                  {standing.userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>

                {/* INFO */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                  }}>
                    <span style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-bold)',
                      color: standing.isMe ? 'var(--color-primary)' : 'var(--text-primary)',
                    }}>
                      {standing.userName}
                    </span>
                    {standing.isMe && (
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 'var(--font-bold)',
                        color: '#FFE600',
                        border: '1px solid #FFE600',
                        background: 'transparent',
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-sm)',
                      }}>
                        TÚ
                      </span>
                    )}
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                    marginTop: '2px',
                  }}>
                    <span style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-tertiary)',
                    }}>
                      ⚽ {Math.floor(Math.random() * 50 + 50)}
                    </span>
                    <span style={{
                      fontSize: 'var(--text-xs)',
                      color: 'var(--text-tertiary)',
                    }}>
                      🔮 {Math.floor(Math.random() * 30 + 20)}
                    </span>
                  </div>
                </div>

                {/* PUNTOS */}
                <div style={{ textAlign: 'right' }}>
                  <span style={{
                    fontSize: 'var(--text-lg)',
                    fontWeight: 'var(--font-black)',
                    color: 'var(--text-primary)',
                  }}>
                    {standing.totalPoints}
                  </span>
                  <span style={{
                    display: 'block',
                    fontSize: '10px',
                    color: 'var(--text-tertiary)',
                  }}>
                    pts
                  </span>
                </div>
              </div>
            ))}

            {/* RESTO DE LA CLASIFICACIÓN */}
            {rest.map((standing) => (
              <div
                key={standing.userId}
                onClick={() => {
                  setSelectedUser(standing.userId);
                  setView('user-detail');
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  borderBottom: '1px solid var(--border-primary)',
                  background: 'transparent',
                  borderLeft: standing.isMe ? '3px solid #FFE600' : '3px solid transparent',
                  cursor: 'pointer',
                }}
              >
                <span style={{
                  width: 32,
                  textAlign: 'center',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-tertiary)',
                }}>
                  {standing.position}
                </span>

                <div style={{
                  width: 36,
                  height: 36,
                  borderRadius: '50%',
                  background: standing.isMe ? 'rgba(255, 230, 0, 0.15)' : 'var(--bg-tertiary)',
                  border: standing.isMe ? '1px solid #FFE600' : '1px solid transparent',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-bold)',
                  color: standing.isMe ? '#FFE600' : 'var(--text-primary)',
                }}>
                  {standing.userName.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
                </div>

                <div style={{ flex: 1 }}>
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: standing.isMe ? 'var(--font-bold)' : 'var(--font-medium)',
                    color: standing.isMe ? 'var(--color-primary)' : 'var(--text-primary)',
                  }}>
                    {standing.userName}
                  </span>
                </div>

                <span style={{
                  fontSize: 'var(--text-md)',
                  fontWeight: 'var(--font-black)',
                  color: 'var(--text-primary)',
                }}>
                  {standing.totalPoints}
                </span>
              </div>
            ))}
          </Card>
        </div>

        {/* MIS PREDICCIONES - RESUMEN */}
        <Card style={{ marginBottom: 'var(--space-4)' }}>
          <Card.Header>
            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-lg)' }}>🔮</span>
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)',
              flex: 1,
            }}>
              Mis Predicciones • Jornada 1
            </span>
            <button
              onClick={() => setView('predictions')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'transparent',
                border: 'none',
                color: '#9CA3AF',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-bold)',
                cursor: 'pointer',
              }}
            >
              Ver todo <ChevronRight size={14} />
            </button>
          </Card.Header>
          <Card.Body padding="none">
            {MOCK_PREDICTIONS_SUMMARY.map((pred, idx) => (
              <div
                key={pred.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                  borderBottom: idx < MOCK_PREDICTIONS_SUMMARY.length - 1 ? '1px solid var(--border-primary)' : 'none',
                }}
              >
                {/* STATUS ICON */}
                <div style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  background: pred.status === 'exact' 
                    ? 'rgba(255, 230, 0, 0.2)' 
                    : pred.status === 'winner'
                    ? 'rgba(245, 158, 11, 0.2)'
                    : 'rgba(239, 68, 68, 0.2)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                  {pred.status === 'exact' ? (
                    <Check size={14} style={{ color: 'var(--color-primary)' }} />
                  ) : pred.status === 'winner' ? (
                    <Target size={14} style={{ color: '#F59E0B' }} />
                  ) : (
                    <X size={14} style={{ color: '#EF4444' }} />
                  )}
                </div>

                {/* MATCH INFO */}
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-1)',
                    marginBottom: '2px',
                  }}>
                    <span style={{ fontSize: '16px' }}>{NATION_FLAGS[pred.homeTeam]}</span>
                    <span style={{ fontSize: '10px', color: 'var(--text-tertiary)' }}>vs</span>
                    <span style={{ fontSize: '16px' }}>{NATION_FLAGS[pred.awayTeam]}</span>
                    <span style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-bold)',
                      color: 'var(--text-primary)',
                      marginLeft: 'var(--space-1)',
                    }}>
                      {pred.match}
                    </span>
                  </div>
                  <span style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-tertiary)',
                  }}>
                    Predicción: {pred.prediction} • Resultado: {pred.result}
                  </span>
                </div>

                {/* POINTS */}
                <span style={{
                  fontSize: 'var(--text-md)',
                  fontWeight: 'var(--font-black)',
                  color: pred.points > 0 ? 'var(--color-primary)' : '#EF4444',
                }}>
                  +{pred.points}
                </span>
              </div>
            ))}

            {/* TOTAL */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: 'var(--space-3)',
              borderTop: '2px solid var(--border-primary)',
              background: 'var(--bg-tertiary)',
            }}>
              <span style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
              }}>
                Total predicciones
              </span>
              <span style={{
                fontSize: 'var(--text-xl)',
                fontWeight: 'var(--font-black)',
                color: '#FFE600',
              }}>
                +{MOCK_PREDICTIONS_SUMMARY.reduce((sum, p) => sum + p.points, 0)} pts
              </span>
            </div>
          </Card.Body>
        </Card>

        {/* SISTEMA DE PUNTUACIÓN - RESUMEN */}
        <Card style={{ marginBottom: 'var(--space-4)' }}>
          <Card.Header>
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)',
            }}>
              📋 Sistema de puntuación
            </span>
          </Card.Header>
          <Card.Body padding="none">
            {SCORING_SYSTEM.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--space-2) var(--space-3)',
                  borderBottom: idx < SCORING_SYSTEM.length - 1 ? '1px solid var(--border-primary)' : 'none',
                }}
              >
                <span style={{
                  fontSize: 'var(--text-xs)',
                  color: 'var(--text-secondary)',
                }}>
                  {item.label}
                </span>
                <span style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-black)',
                  color: item.points > 0 ? '#FFE600' : 'var(--text-tertiary)',
                }}>
                  +{item.points}
                </span>
              </div>
            ))}
          </Card.Body>
        </Card>

        {/* COMODINES ACTIVOS */}
        <Card style={{ marginBottom: 'var(--space-4)' }}>
          <Card.Header>
            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-lg)' }}>🎁</span>
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)',
              flex: 1,
            }}>
              Comodines activos
            </span>
            <button
              onClick={() => setView('chips')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px',
                background: 'transparent',
                border: 'none',
                color: '#9CA3AF',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-bold)',
                cursor: 'pointer',
              }}
            >
              Gestionar <ChevronRight size={14} />
            </button>
          </Card.Header>
          <Card.Body>
            <div style={{
              display: 'flex',
              gap: 'var(--space-2)',
              overflowX: 'auto',
              scrollbarWidth: 'none',
              paddingBottom: 'var(--space-1)',
            }}>
              {[
                { icon: '⭐', name: 'Capitán x2', available: 3, total: 3, color: '#FFD700' },
                { icon: '🛡️', name: 'Escudo', available: 2, total: 2, color: '#0047AB' },
                { icon: '✨', name: 'Estrella Dorada', available: 1, total: 1, color: '#F59E0B' },
                { icon: '🔄', name: 'Banquillo Boost', available: 2, total: 2, color: '#8B5CF6' },
              ].map((chip) => (
                <div
                  key={chip.name}
                  style={{
                    minWidth: 100,
                    padding: 'var(--space-3)',
                    background: 'var(--bg-tertiary)',
                    borderRadius: 'var(--radius-lg)',
                    textAlign: 'center',
                    border: chip.available > 0 ? `1px solid ${chip.color}` : '1px solid var(--border-primary)',
                    opacity: chip.available > 0 ? 1 : 0.5,
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: `${chip.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto var(--space-2)',
                    fontSize: '20px',
                  }}>
                    {chip.icon}
                  </div>
                  <p style={{
                    fontSize: '10px',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--text-primary)',
                    marginBottom: '2px',
                  }}>
                    {chip.name}
                  </p>
                  <p style={{
                    fontSize: '9px',
                    color: chip.color,
                    fontWeight: 'var(--font-bold)',
                  }}>
                    {chip.available}/{chip.total} disponibles
                  </p>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  value: string | number;
  label: string;
  iconColor: string;
  valueColor: string;
}

function StatCard({ icon, value, label, iconColor, valueColor }: StatCardProps) {
  return (
    <div style={{
      background: 'var(--bg-secondary)',
      border: '1px solid var(--border-primary)',
      borderRadius: 'var(--radius-lg)',
      padding: 'var(--space-3)',
      textAlign: 'center',
    }}>
      <div style={{
        color: iconColor,
        marginBottom: 'var(--space-1)',
        display: 'flex',
        justifyContent: 'center',
      }}>
        {icon}
      </div>
      <div style={{
        fontSize: 'var(--text-xl)',
        fontWeight: 'var(--font-black)',
        color: valueColor,
      }}>
        {value}
      </div>
      <div style={{
        fontSize: '10px',
        fontWeight: 'var(--font-bold)',
        color: 'var(--text-tertiary)',
        textTransform: 'uppercase',
        letterSpacing: '1px',
        marginTop: '2px',
      }}>
        {label}
      </div>
    </div>
  );
}
