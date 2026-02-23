import { ArrowLeft, Target, Users, TrendingUp } from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

import { useFantasyStore } from '../../application/store/fantasyStore';
import { useRanking } from '../../application/hooks/useFantasy';
import type { PlayerPosition } from '../../domain/types';
import { MOCK_STANDINGS } from '../../infrastructure/repositories/mockData';

interface UserProfileData {
  id: string;
  name: string;
  avatar?: string;
  position: number;
  totalPoints: number;
  streak: number;
  bestMatchday: number;
  scoreByMatchday: Record<number, { players: number; predictions: number; total: number }>;
  squad: {
    starters: Array<{
      id: string;
      name: string;
      position: PlayerPosition;
      nationId: string;
      points: number;
      isCaptain: boolean;
      isViceCaptain: boolean;
    }>;
    bench: Array<{
      id: string;
      name: string;
      position: PlayerPosition;
      nationId: string;
      points: number;
    }>;
    formation: string;
  };
  predictions: {
    total: number;
    exact: number;
    winner: number;
    wrong: number;
    points: number;
  };
}

const MOCK_USER_PROFILE: UserProfileData = {
  id: 'u2',
  name: 'LauraFútbol',
  position: 2,
  totalPoints: 124,
  streak: 2,
  bestMatchday: 48,
  scoreByMatchday: {
    1: { players: 35, predictions: 13, total: 48 },
  },
  squad: {
    formation: '4-3-3',
    starters: [
      { id: '1', name: 'Unai Simón', position: 'GK', nationId: 'esp', points: 8, isCaptain: false, isViceCaptain: false },
      { id: '2', name: 'Dani Carvajal', position: 'DEF', nationId: 'esp', points: 6, isCaptain: false, isViceCaptain: false },
      { id: '3', name: 'William Saliba', position: 'DEF', nationId: 'fra', points: 7, isCaptain: false, isViceCaptain: false },
      { id: '4', name: 'Cristian Romero', position: 'DEF', nationId: 'arg', points: 6, isCaptain: false, isViceCaptain: false },
      { id: '5', name: 'John Stones', position: 'DEF', nationId: 'eng', points: 5, isCaptain: false, isViceCaptain: false },
      { id: '6', name: 'Rodri', position: 'MID', nationId: 'esp', points: 9, isCaptain: true, isViceCaptain: false },
      { id: '7', name: 'Jude Bellingham', position: 'MID', nationId: 'eng', points: 12, isCaptain: false, isViceCaptain: true },
      { id: '8', name: 'Jamal Musiala', position: 'MID', nationId: 'ger', points: 10, isCaptain: false, isViceCaptain: false },
      { id: '9', name: 'Lamine Yamal', position: 'FWD', nationId: 'esp', points: 15, isCaptain: false, isViceCaptain: false },
      { id: '10', name: 'Kylian Mbappé', position: 'FWD', nationId: 'fra', points: 18, isCaptain: false, isViceCaptain: false },
      { id: '11', name: 'Vinicius Jr.', position: 'FWD', nationId: 'bra', points: 14, isCaptain: false, isViceCaptain: false },
    ],
    bench: [
      { id: '12', name: 'Emiliano Martínez', position: 'GK', nationId: 'arg', points: 6 },
      { id: '13', name: 'Antonio Rüdiger', position: 'DEF', nationId: 'ger', points: 5 },
      { id: '14', name: 'Bruno Guimarães', position: 'MID', nationId: 'bra', points: 4 },
      { id: '15', name: 'Julián Álvarez', position: 'FWD', nationId: 'arg', points: 7 },
    ],
  },
  predictions: {
    total: 6,
    exact: 2,
    winner: 3,
    wrong: 1,
    points: 45,
  },
};

interface UserProfilePageProps {
  userId?: string;
  onNavigate?: (view: string) => void;
}

export function UserProfilePage({ userId, onNavigate: _onNavigate }: UserProfilePageProps) {
  const { setView, setSelectedUser } = useFantasyStore();
  const { myStanding } = useRanking();
  
  const isMyProfile = !userId || userId === 'me';
  
  // Buscar el usuario en los standings para obtener su nombre correcto
  const selectedUserFromStandings = userId && userId !== 'me' 
    ? MOCK_STANDINGS.find(s => s.userId === userId)
    : null;
  
  const user = isMyProfile 
    ? { 
        ...MOCK_USER_PROFILE, 
        name: myStanding?.userName || 'Yo',
        position: myStanding?.position || 1,
        totalPoints: myStanding?.totalPoints || 0,
        streak: myStanding?.streak || 0,
      }
    : { 
        ...MOCK_USER_PROFILE, 
        name: selectedUserFromStandings?.userName || 'Usuario',
        position: selectedUserFromStandings?.position || 1,
        totalPoints: selectedUserFromStandings?.totalPoints || 0,
        streak: selectedUserFromStandings?.streak || 0,
      };
  
  const gk = user.squad.starters.filter(p => p.position === 'GK');
  const defs = user.squad.starters.filter(p => p.position === 'DEF');
  const mids = user.squad.starters.filter(p => p.position === 'MID');
  const fwds = user.squad.starters.filter(p => p.position === 'FWD');
  
  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <div style={{ paddingBottom: 100 }}>
        {/* HEADER */}
        <div style={{
          background: 'linear-gradient(180deg, var(--bg-secondary) 0%, var(--bg-primary) 100%)',
          borderBottom: '1px solid var(--border-primary)',
          padding: 'var(--space-4)',
          position: 'sticky',
          top: 0,
          zIndex: 50,
        }}>
          <button
            onClick={() => {
              setSelectedUser(undefined);
              setView('dashboard');
            }}
            style={{
              background: 'transparent',
              border: 'none',
              color: 'var(--text-secondary)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-4)',
            }}
          >
            <ArrowLeft size={24} />
            <span>Volver</span>
          </button>
          
          {/* PERFIL HEADER */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-4)',
          }}>
            <div style={{
              width: 80,
              height: 80,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--text-3xl)',
              fontWeight: 'var(--font-black)',
              color: 'var(--bg-primary)',
              boxShadow: 'var(--shadow-glow)',
            }}>
              #{user.position}
            </div>
            
            <div>
              <h1 style={{
                fontSize: 'var(--text-2xl)',
                fontWeight: 'var(--font-black)',
                color: 'var(--text-primary)',
                marginBottom: 'var(--space-1)',
              }}>
                {user.name}
              </h1>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
              }}>
                <Badge variant="primary" size="md">{user.totalPoints} pts totales</Badge>
                {user.streak > 0 && (
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    fontSize: 'var(--text-xs)',
                    color: 'var(--color-accent)',
                  }}>
                    🔥 Racha {user.streak}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* CONTENIDO */}
        <div style={{ padding: 'var(--space-4)' }}>
          
          {/* DESGLOSE DE PUNTOS */}
          <Card style={{ marginBottom: 'var(--space-4)' }}>
            <Card.Header>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-md)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
              }}>
                <TrendingUp size={20} style={{ color: 'var(--color-primary)' }} />
                Desglose de puntos
              </div>
            </Card.Header>
            <Card.Body>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--space-4)',
                textAlign: 'center',
                marginBottom: 'var(--space-4)',
              }}>
                <div>
                  <div style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-black)',
                    color: 'var(--color-primary)',
                  }}>
                    {user.squad.starters.reduce((sum, p) => sum + p.points, 0)}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-tertiary)',
                  }}>
                    Jugadores
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-black)',
                    color: 'var(--color-accent)',
                  }}>
                    {user.predictions.points}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-tertiary)',
                  }}>
                    Predicciones
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: 'var(--text-2xl)',
                    fontWeight: 'var(--font-black)',
                    color: 'var(--text-primary)',
                  }}>
                    {user.totalPoints}
                  </div>
                  <div style={{
                    fontSize: 'var(--text-xs)',
                    color: 'var(--text-tertiary)',
                  }}>
                    Total
                  </div>
                </div>
              </div>
              
              {/* POR JORNADA */}
              <div style={{
                borderTop: '1px solid var(--border-primary)',
                paddingTop: 'var(--space-3)',
              }}>
                <div style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-semibold)',
                  color: 'var(--text-secondary)',
                  marginBottom: 'var(--space-3)',
                }}>
                  Por jornada
                </div>
                
                {Object.entries(user.scoreByMatchday).map(([matchday, scores]) => (
                  <div
                    key={matchday}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      padding: 'var(--space-3)',
                      background: 'var(--bg-tertiary)',
                      borderRadius: 'var(--radius-md)',
                      marginBottom: 'var(--space-2)',
                    }}
                  >
                    <div style={{
                      width: 40,
                      height: 40,
                      borderRadius: 'var(--radius-md)',
                      background: 'var(--bg-elevated)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-bold)',
                      color: 'var(--text-secondary)',
                    }}>
                      J{matchday}
                    </div>
                    
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        fontSize: 'var(--text-xs)',
                        color: 'var(--text-tertiary)',
                        marginBottom: '4px',
                      }}>
                        <span>Jugadores: {scores.players} pts</span>
                        <span>Predicciones: {scores.predictions} pts</span>
                      </div>
                      <div style={{
                        height: 4,
                        background: 'var(--bg-elevated)',
                        borderRadius: 'var(--radius-full)',
                        overflow: 'hidden',
                        display: 'flex',
                      }}>
                        <div style={{
                          width: `${(scores.players / scores.total) * 100}%`,
                          background: 'var(--color-primary)',
                        }} />
                        <div style={{
                          width: `${(scores.predictions / scores.total) * 100}%`,
                          background: 'var(--color-accent)',
                        }} />
                      </div>
                    </div>
                    
                    <div style={{
                      fontSize: 'var(--text-lg)',
                      fontWeight: 'var(--font-black)',
                      color: 'var(--text-primary)',
                    }}>
                      {scores.total}
                    </div>
                  </div>
                ))}
              </div>
            </Card.Body>
          </Card>
          
          {/* EQUIPO */}
          <Card style={{ marginBottom: 'var(--space-4)' }}>
            <Card.Header>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-2)',
                  fontSize: 'var(--text-md)',
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-primary)',
                }}>
                  <Users size={20} style={{ color: 'var(--color-primary)' }} />
                  Equipo
                </div>
                <Badge variant="neutral">{user.squad.formation}</Badge>
              </div>
            </Card.Header>
            <Card.Body>
              {/* ALINEACIÓN */}
              <div style={{
                background: 'linear-gradient(180deg, #2a2a3a 0%, #1a1a2e 100%)',
                borderRadius: 'var(--radius-lg)',
                padding: 'var(--space-4)',
                marginBottom: 'var(--space-4)',
                border: '1px solid #2a2a3a',
              }}>
                {/* DELANTEROS */}
                <PositionRow players={fwds} />
                {/* MEDIOS */}
                <PositionRow players={mids} />
                {/* DEFENSAS */}
                <PositionRow players={defs} />
                {/* PORTERO */}
                <PositionRow players={gk} />
              </div>
              
              {/* BANQUILLO */}
              <div>
                <div style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-bold)',
                  color: 'var(--text-tertiary)',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-2)',
                }}>
                  Banquillo
                </div>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 'var(--space-2)',
                }}>
                  {user.squad.bench.map((player) => (
                    <div
                      key={player.id}
                      style={{
                        background: 'var(--bg-tertiary)',
                        borderRadius: 'var(--radius-md)',
                        padding: 'var(--space-2)',
                        textAlign: 'center',
                      }}
                    >
                      <div style={{
                        fontSize: '10px',
                        fontWeight: 'var(--font-bold)',
                        color: 'var(--text-primary)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                        {player.name.split(' ').pop()}
                      </div>
                      <div style={{
                        fontSize: '9px',
                        color: 'var(--color-primary)',
                      }}>
                        {player.points} pts
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Card.Body>
          </Card>
          
          {/* PREDICCIONES */}
          <Card>
            <Card.Header>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-2)',
                fontSize: 'var(--text-md)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
              }}>
                <Target size={20} style={{ color: 'var(--color-accent)' }} />
                Predicciones
              </div>
            </Card.Header>
            <Card.Body>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 'var(--space-3)',
                textAlign: 'center',
              }}>
                <div>
                  <div style={{
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-black)',
                    color: 'var(--text-primary)',
                  }}>
                    {user.predictions.total}
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: 'var(--text-tertiary)',
                  }}>
                    Total
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-black)',
                    color: 'var(--color-success)',
                  }}>
                    {user.predictions.exact}
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: 'var(--text-tertiary)',
                  }}>
                    Exactos
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-black)',
                    color: 'var(--color-primary)',
                  }}>
                    {user.predictions.winner}
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: 'var(--text-tertiary)',
                  }}>
                    Ganador
                  </div>
                </div>
                <div>
                  <div style={{
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-black)',
                    color: 'var(--color-error)',
                  }}>
                    {user.predictions.wrong}
                  </div>
                  <div style={{
                    fontSize: '10px',
                    color: 'var(--text-tertiary)',
                  }}>
                    Fallos
                  </div>
                </div>
              </div>
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
}

function PositionRow({ players }: { players: Array<{ name: string; points: number; isCaptain?: boolean; isViceCaptain?: boolean }> }) {
  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      gap: 'var(--space-2)',
      marginBottom: 'var(--space-3)',
    }}>
      {players.map((player, idx) => (
        <div
          key={idx}
          style={{
            width: 70,
            textAlign: 'center',
          }}
        >
          <div style={{
            width: 50,
            height: 50,
            margin: '0 auto',
            borderRadius: '50%',
            background: player.isCaptain 
              ? 'linear-gradient(135deg, #FFD700 0%, #FFA000 100%)'
              : player.isViceCaptain 
                ? 'linear-gradient(135deg, #C0C0C0 0%, #808080 100%)'
                : 'var(--bg-secondary)',
            border: `2px solid ${player.isCaptain ? '#FFD700' : player.isViceCaptain ? '#C0C0C0' : 'white'}`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '20px',
            marginBottom: '4px',
          }}>
            ⚽
          </div>
          <div style={{
            fontSize: '10px',
            fontWeight: 'var(--font-bold)',
            color: 'white',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            textShadow: '0 1px 2px rgba(0,0,0,0.8)',
          }}>
            {player.name.split(' ').pop()}
          </div>
          <div style={{
            fontSize: '9px',
            color: 'var(--color-primary)',
          }}>
            {player.points} pts
          </div>
        </div>
      ))}
    </div>
  );
}
