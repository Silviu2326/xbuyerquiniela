import { useState } from 'react';
import { ChevronDown, ChevronRight } from 'lucide-react';
import { Card } from '../components/ui/Card';

import { useFantasyStore } from '../../application/store/fantasyStore';
import { useSquad } from '../../application/hooks/useFantasy';
import { PlayerDetailModal } from '../components/PlayerDetailModal';


interface SquadPageProps {
  onNavigate?: (view: string) => void;
}

const FORMATIONS: Record<string, number[]> = {
  '4-3-3': [1, 4, 3, 3],
  '4-4-2': [1, 4, 4, 2],
  '3-4-3': [1, 3, 4, 3],
  '3-5-2': [1, 3, 5, 2],
  '4-2-3-1': [1, 4, 2, 3, 1],
  '5-3-2': [1, 5, 3, 2],
};

export function SquadPage({ onNavigate: _onNavigate }: SquadPageProps) {
  const { setView, mySquad } = useFantasyStore();
  const {
    starters: _starters,
    bench,
    formation,
    setFormation,
    setStarters,
    setCaptain,
    setViceCaptain,
    removePlayer,
  } = useSquad();
  
  const [showFormationSelector, setShowFormationSelector] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<any | null>(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [captainId, setCaptainId] = useState<string | null>(null);
  const [viceCaptainId, setViceCaptainId] = useState<string | null>(null);

  // const allPlayers = [...starters, ...bench];

  // Handlers para acciones de jugadores
  const handlePlayerClick = (player: any) => {
    const isCaptain = player.id === captainId;
    const isViceCaptain = player.id === viceCaptainId;
    const isStarter = player.isStarter !== false; // Por defecto true si no está definido
    
    setSelectedPlayer({
      ...player,
      isCaptain,
      isViceCaptain,
      isStarter,
      initials: player.initials || player.name?.substring(0, 2).toUpperCase(),
      nation: player.nationId || player.nation, // Asegurar que nation esté definido
    });
    setIsMenuOpen(true);
  };

  const handleMakeCaptain = (playerId: string) => {
    if (captainId === playerId) {
      setCaptainId(null);
      setCaptain('');
    } else {
      setCaptainId(playerId);
      setCaptain(playerId);
      if (viceCaptainId === playerId) {
        setViceCaptainId(null);
        setViceCaptain('');
      }
    }
  };

  const handleSendToBench = (playerId: string) => {
    // Quitar de titulares (mover a banquillo)
    const currentStarters = mySquad.players
      .filter((p: any) => p.isStarter && p.id !== playerId)
      .map((p: any) => p.id);
    setStarters(currentStarters);
  };
  
  // Helper para contar titulares por posición
  const countStartersByPosition = (positionLabel: string) => {
    const positionMap: Record<string, string> = {
      'GK': 'POR',
      'DEF': 'DEF',
      'MID': 'MED',
      'FWD': 'DEL',
    };
    
    return mySquad.players.filter((p: any) => {
      if (!p.isStarter) return false;
      const pLabel = positionMap[p.position] || p.position;
      return pLabel === positionLabel;
    }).length;
  };

  const handleSendToField = (playerId: string) => {
    if (fieldPlayers.length >= 11) {
      alert('Ya tienes 11 titulares. Quita uno primero.');
      return;
    }
    
    // Validar que haya espacio para la posición del jugador
    const player = mySquad.players.find((p: any) => p.id === playerId);
    if (!player) return;
    
    const positionLimits: Record<string, number> = {
      'POR': 1,
      'DEF': parseInt(formation.split('-')[1]) || 4,
      'MED': parseInt(formation.split('-')[2]) || 3,
      'DEL': parseInt(formation.split('-')[3]) || 3,
    };
    
    const positionMap: Record<string, string> = {
      'GK': 'POR',
      'DEF': 'DEF',
      'MID': 'MED',
      'FWD': 'DEL',
    };
    
    const playerPosLabel = positionMap[player.position] || player.position;
    const currentCount = countStartersByPosition(playerPosLabel);
    
    const limit = positionLimits[playerPosLabel] || 3;
    
    if (currentCount >= limit) {
      alert(`No hay espacio para más ${playerPosLabel}. Límite: ${limit} en formación ${formation}`);
      return;
    }
    
    const currentStarters = mySquad.players
      .filter((p: any) => p.isStarter)
      .map((p: any) => p.id);
    setStarters([...currentStarters, playerId]);
  };

  const handleRemoveFromTeam = (playerId: string) => {
    // Eliminar completamente del equipo
    if (captainId === playerId) {
      setCaptainId(null);
      setCaptain('');
    }
    if (viceCaptainId === playerId) {
      setViceCaptainId(null);
      setViceCaptain('');
    }
    removePlayer(playerId);
  };

  const handleToggleStarter = (playerId: string) => {
    const player = mySquad.players.find((p: any) => p.id === playerId);
    if (!player) return;
    
    if (player.isStarter) {
      // Enviar al banquillo
      handleSendToBench(playerId);
    } else {
      // Poner de titular
      handleSendToField(playerId);
    }
  };

  // Posiciones específicas por posición en el campo (POR, DEF, MED, DEL)
  // Cada jugador se coloca según su posición, no por orden de llegada
  const POSITION_SLOTS: Record<string, Record<string, Array<{x: number, y: number}>>> = {
    'POR': {
      'any': [{ x: 50, y: 88 }], // Portero siempre en la misma posición
    },
    'DEF': {
      '3': [{ x: 25, y: 70 }, { x: 50, y: 72 }, { x: 75, y: 70 }],
      '4': [{ x: 12, y: 65 }, { x: 37, y: 65 }, { x: 63, y: 65 }, { x: 88, y: 65 }],
      '5': [{ x: 10, y: 62 }, { x: 30, y: 68 }, { x: 50, y: 70 }, { x: 70, y: 68 }, { x: 90, y: 62 }],
    },
    'MED': {
      '2': [{ x: 35, y: 48 }, { x: 65, y: 48 }],
      '3': [{ x: 25, y: 45 }, { x: 50, y: 48 }, { x: 75, y: 45 }],
      '4': [{ x: 15, y: 42 }, { x: 38, y: 48 }, { x: 62, y: 48 }, { x: 85, y: 42 }],
      '5': [{ x: 15, y: 42 }, { x: 32, y: 48 }, { x: 50, y: 50 }, { x: 68, y: 48 }, { x: 85, y: 42 }],
    },
    'DEL': {
      '1': [{ x: 50, y: 22 }],
      '2': [{ x: 35, y: 25 }, { x: 65, y: 25 }],
      '3': [{ x: 20, y: 22 }, { x: 50, y: 25 }, { x: 80, y: 22 }],
    },
  };

  // Separar titulares y banquillo
  const starters = mySquad?.players?.filter((p: any) => p.isStarter) || [];
  
  // Mapeo de posición a categoría simplificada
  const getPosCategory = (pos: string): string => {
    if (pos === 'GK' || pos === 'POR') return 'POR';
    if (pos === 'DEF') return 'DEF';
    if (pos === 'MID' || pos === 'MED') return 'MED';
    if (pos === 'FWD' || pos === 'DEL') return 'DEL';
    return 'DEF';
  };
  
  // Agrupar titulares por posición
  const byPosition: Record<string, any[]> = {
    'POR': [],
    'DEF': [],
    'MED': [],
    'DEL': [],
  };
  
  for (const player of starters) {
    const cat = getPosCategory(player.position);
    if (byPosition[cat]) {
      byPosition[cat].push(player);
    }
  }
  
  // Asignar coordenadas específicas según posición y cantidad
  const fieldPlayers: any[] = [];
  
  // Portero (siempre 1)
  if (byPosition['POR'].length > 0) {
    const portero = byPosition['POR'][0];
    fieldPlayers.push({
      ...portero,
      initials: portero.initials || portero.name?.substring(0, 2).toUpperCase() || '??',
      position: 'POR',
      x: 50,
      y: 88,
    });
  }
  
  // Defensas
  const defCount = byPosition['DEF'].length;
  const defSlots = POSITION_SLOTS['DEF'][String(Math.min(defCount, 5))] || POSITION_SLOTS['DEF']['4'];
  byPosition['DEF'].forEach((player: any, idx: number) => {
    if (idx < defSlots.length) {
      fieldPlayers.push({
        ...player,
        initials: player.initials || player.name?.substring(0, 2).toUpperCase() || '??',
        position: 'DEF',
        x: defSlots[idx].x,
        y: defSlots[idx].y,
      });
    }
  });
  
  // Mediocentros
  const medCount = byPosition['MED'].length;
  const medSlots = POSITION_SLOTS['MED'][String(Math.min(medCount, 5))] || POSITION_SLOTS['MED']['3'];
  byPosition['MED'].forEach((player: any, idx: number) => {
    if (idx < medSlots.length) {
      fieldPlayers.push({
        ...player,
        initials: player.initials || player.name?.substring(0, 2).toUpperCase() || '??',
        position: 'MED',
        x: medSlots[idx].x,
        y: medSlots[idx].y,
      });
    }
  });
  
  // Delanteros
  const delCount = byPosition['DEL'].length;
  const delSlots = POSITION_SLOTS['DEL'][String(Math.min(delCount, 3))] || POSITION_SLOTS['DEL']['2'];
  byPosition['DEL'].forEach((player: any, idx: number) => {
    if (idx < delSlots.length) {
      fieldPlayers.push({
        ...player,
        initials: player.initials || player.name?.substring(0, 2).toUpperCase() || '??',
        position: 'DEL',
        x: delSlots[idx].x,
        y: delSlots[idx].y,
      });
    }
  });

  const getNationColor = (nation: string) => {
    const colors: Record<string, string> = {
      arg: '#6B8FC5',
      fra: '#5B7BA3',
      esp: '#C4544B',
      bra: '#4A9B5C',
      eng: '#5B7BA3',
      uru: '#6B8FC5',
      ned: '#C4544B',
      mar: '#C4544B',
    };
    return colors[nation] || '#6366F1';
  };

  return (
    <div style={{ minHeight: '100vh', background: '#12121a' }}>
      <div style={{ padding: 'var(--space-4)' }}>
        {/* SELECTOR DE FORMACIÓN */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-4)',
        }}>
          <div>
            <p style={{
              fontSize: 'var(--text-xs)',
              color: '#6b7280',
              textTransform: 'uppercase',
              letterSpacing: '1px',
              marginBottom: '4px',
            }}>
              FORMACIÓN
            </p>
            <p style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-black)',
              color: '#FFE600',
            }}>
              {formation}
            </p>
          </div>
          <button
            onClick={() => setShowFormationSelector(!showFormationSelector)}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              background: '#1a1a24',
              border: '1px solid #2a2a3a',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-2) var(--space-3)',
              color: '#9ca3af',
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-bold)',
              cursor: 'pointer',
            }}
          >
            Cambiar <ChevronDown size={14} />
          </button>
        </div>

        {/* SELECTOR DE FORMACIONES */}
        {showFormationSelector && (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--space-2)',
            marginBottom: 'var(--space-4)',
          }}>
            {Object.keys(FORMATIONS).map((form) => (
              <button
                key={form}
                onClick={() => {
                  setFormation(form as any);
                  setShowFormationSelector(false);
                }}
                style={{
                  padding: 'var(--space-3)',
                  background: formation === form ? '#FFE600' : '#1a1a24',
                  border: `1px solid ${formation === form ? '#FFE600' : '#2a2a3a'}`,
                  borderRadius: 'var(--radius-lg)',
                  color: formation === form ? '#12121a' : '#f3f4f6',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-bold)',
                  cursor: 'pointer',
                }}
              >
                {form}
              </button>
            ))}
          </div>
        )}

        {/* CAMPO DE FÚTBOL */}
        <div style={{
          background: 'linear-gradient(180deg, #1a4d2e 0%, #2d6a4f 50%, #1a4d2e 100%)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-4)',
          marginBottom: 'var(--space-4)',
          position: 'relative',
          minHeight: 420,
          boxShadow: 'inset 0 0 60px rgba(0,0,0,0.3)',
        }}>
          {/* LÍNEAS DEL CAMPO */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '10%',
            right: '10%',
            height: 1,
            background: 'rgba(255,255,255,0.3)',
          }} />
          <div style={{
            position: 'absolute',
            top: '20%',
            left: '25%',
            right: '25%',
            height: 1,
            background: 'rgba(255,255,255,0.2)',
          }} />
          <div style={{
            position: 'absolute',
            top: '80%',
            left: '25%',
            right: '25%',
            height: 1,
            background: 'rgba(255,255,255,0.2)',
          }} />
          {/* CÍRCULO CENTRAL */}
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 80,
            height: 80,
            border: '2px solid rgba(255,255,255,0.3)',
            borderRadius: '50%',
          }} />

          {/* JUGADORES EN EL CAMPO */}
          {fieldPlayers.length === 0 ? (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              textAlign: 'center',
              color: 'rgba(255,255,255,0.6)',
            }}>
              <p style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>⚽</p>
              <p style={{ fontSize: 'var(--text-sm)', fontWeight: 'var(--font-bold)' }}>
                Tu equipo está vacío
              </p>
              <p style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--space-1)' }}>
                Añade jugadores desde "Jugadores"
              </p>
            </div>
          ) : (
            fieldPlayers.map((player: any) => {
            const isCaptain = player.id === captainId;
            const isViceCaptain = player.id === viceCaptainId;
            
            return (
              <div
                key={player.id}
                onClick={() => handlePlayerClick(player)}
                style={{
                  position: 'absolute',
                  left: `${player.x}%`,
                  top: `${player.y}%`,
                  transform: 'translate(-50%, -50%)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
              >
                {/* CÍRCULO DEL JUGADOR */}
                <div style={{
                  width: 44,
                  height: 44,
                  borderRadius: '50%',
                  background: getNationColor(player.nation),
                  border: isCaptain ? '3px solid #FFE600' : isViceCaptain ? '3px solid #C0C0C0' : '3px solid rgba(255,255,255,0.8)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-black)',
                  color: '#fff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.5)',
                  boxShadow: isCaptain ? '0 0 20px #FFE600' : isViceCaptain ? '0 0 15px #C0C0C0' : '0 4px 12px rgba(0,0,0,0.3)',
                  position: 'relative',
                }}>
                  {player.initials}
                  {(isCaptain || isViceCaptain) && (
                    <div style={{
                      position: 'absolute',
                      top: -8,
                      right: -8,
                      width: 20,
                      height: 20,
                      borderRadius: '50%',
                      background: isCaptain ? '#FFE600' : '#C0C0C0',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '10px',
                      color: '#000',
                    }}>
                      {isCaptain ? 'C' : 'V'}
                    </div>
                  )}
                </div>
                {/* NOMBRE */}
                <span style={{
                  fontSize: '10px',
                  fontWeight: 'var(--font-bold)',
                  color: '#fff',
                  textShadow: '0 1px 2px rgba(0,0,0,0.8)',
                  marginTop: '4px',
                  whiteSpace: 'nowrap',
                }}>
                  {player.name}
                </span>
                {/* PUNTOS */}
                <span style={{
                  fontSize: '10px',
                  fontWeight: 'var(--font-black)',
                  color: '#FFE600',
                  background: 'rgba(0,0,0,0.6)',
                  padding: '2px 6px',
                  borderRadius: 'var(--radius-sm)',
                  marginTop: '2px',
                }}>
                  {player.points}
                </span>
              </div>
            );
          })
          )}
        </div>

        {/* COMPOSICIÓN DEL EQUIPO */}
        <Card style={{ marginBottom: 'var(--space-4)' }}>
          <Card.Header>
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              color: '#f3f4f6',
            }}>
              📋 Composición del equipo
            </span>
          </Card.Header>
          <Card.Body>
            <p style={{
              fontSize: 'var(--text-xs)',
              color: '#6b7280',
              marginBottom: 'var(--space-3)',
            }}>
              Máx. 1 jugador por selección • 3 selecciones favoritas permiten 2 jugadores
            </p>
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--space-2)',
            }}>
              {['🇦🇷 2★', '🇫🇷 2★', '🇪🇸 2★', '🏴󠁧󠁢󠁥󠁮󠁧󠁿 2★', '🇧🇷 2★', '🇩🇪 1★', '🇳🇱 1★', '🇵🇹 1★', '🇺🇾 1★', '🇲🇦 1★'].map((flag, idx) => (
                <span
                  key={idx}
                  style={{
                    fontSize: 'var(--text-xs)',
                    background: '#1a1a24',
                    padding: '4px 8px',
                    borderRadius: 'var(--radius-md)',
                    color: '#9ca3af',
                  }}
                >
                  {flag}
                </span>
              ))}
            </div>
          </Card.Body>
        </Card>

        {/* BANQUILLO */}
        <Card>
          <Card.Header>
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              color: '#f3f4f6',
            }}>
              🪑 Banquillo ({bench.length}/4)
            </span>
          </Card.Header>
          <Card.Body padding="none">
            {bench.length === 0 ? (
              <div style={{
                padding: 'var(--space-4)',
                textAlign: 'center',
                color: '#6b7280',
              }}>
                <p style={{ fontSize: 'var(--text-sm)' }}>
                  No hay jugadores en el banquillo
                </p>
              </div>
            ) : (
              bench.map((player: any, playerIdx: number) => (
                <div
                  key={player.id}
                  onClick={() => handlePlayerClick(player)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-3)',
                    borderBottom: playerIdx < bench.length - 1 ? '1px solid #2a2a3a' : 'none',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#1a1a24';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'transparent';
                  }}
                >
                  <div style={{
                    width: 36,
                    height: 36,
                    borderRadius: '50%',
                    background: getNationColor(player.nationId || player.nation),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-bold)',
                    color: '#fff',
                  }}>
                    {(player.initials || player.name?.substring(0, 2).toUpperCase())}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                    }}>
                      <span style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-bold)',
                        color: '#f3f4f6',
                      }}>
                        {player.name}
                      </span>
                      <span style={{
                        fontSize: '10px',
                        background: player.position === 'POR' || player.position === 'GK' ? '#F59E0B' : 
                                   player.position === 'DEF' ? '#FFE600' : 
                                   player.position === 'MED' || player.position === 'MID' ? '#10B981' : '#EF4444',
                        color: '#12121a',
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 'var(--font-bold)',
                      }}>
                        {player.position === 'GK' ? 'POR' :
                         player.position === 'DEF' ? 'DEF' :
                         player.position === 'MID' ? 'MED' :
                         player.position === 'FWD' ? 'DEL' : player.position}
                      </span>
                    </div>
                    <span style={{
                      fontSize: 'var(--text-xs)',
                      color: '#6b7280',
                    }}>
                      {player.club}
                    </span>
                  </div>
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-black)',
                    color: '#FFE600',
                  }}>
                    {player.points}
                  </span>
                  <span style={{
                    fontSize: '10px',
                    color: '#6b7280',
                  }}>
                    pts
                  </span>
                </div>
              ))
            )}
          </Card.Body>
        </Card>

        {/* LISTADO COMPLETO DE JUGADORES DEL EQUIPO */}
        <Card style={{ marginTop: 'var(--space-4)' }}>
          <Card.Header>
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              color: '#f3f4f6',
            }}>
              👥 Todos los Jugadores ({mySquad.players.length}/15)
            </span>
          </Card.Header>
          <Card.Body padding="none">
            {mySquad.players.length === 0 ? (
              <div style={{
                padding: 'var(--space-6)',
                textAlign: 'center',
                color: '#6b7280',
              }}>
                <p style={{ marginBottom: 'var(--space-2)' }}>⚽</p>
                <p style={{ fontSize: 'var(--text-sm)' }}>
                  Tu equipo está vacío
                </p>
                <p style={{ fontSize: 'var(--text-xs)', marginTop: 'var(--space-2)' }}>
                  Ve a "Jugadores" para añadir jugadores
                </p>
              </div>
            ) : (
            mySquad.players.map((player: any, idx: number) => {
              const isCaptain = player.id === captainId;
              const isViceCaptain = player.id === viceCaptainId;
              const isStarter = player.isStarter;
              
              return (
                <div
                  key={player.id}
                  onClick={() => handlePlayerClick(player)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    padding: 'var(--space-3)',
                    borderBottom: idx < 14 ? '1px solid #2a2a3a' : 'none',
                    background: isStarter ? 'rgba(255, 230, 0, 0.05)' : 'transparent',
                    cursor: 'pointer',
                    transition: 'background 0.2s',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#1a1a24';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = isStarter ? 'rgba(255, 230, 0, 0.05)' : 'transparent';
                  }}
                >
                  <div style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: getNationColor(player.nation),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--text-xs)',
                    fontWeight: 'var(--font-black)',
                    color: '#fff',
                    border: isCaptain ? '2px solid #FFE600' : isViceCaptain ? '2px solid #C0C0C0' : 'none',
                    position: 'relative',
                  }}>
                    {player.initials}
                    {(isCaptain || isViceCaptain) && (
                      <div style={{
                        position: 'absolute',
                        bottom: -2,
                        right: -2,
                        width: 16,
                        height: 16,
                        borderRadius: '50%',
                        background: isCaptain ? '#FFE600' : '#C0C0C0',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '8px',
                        color: '#000',
                      }}>
                        {isCaptain ? 'C' : 'V'}
                      </div>
                    )}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                    }}>
                      <span style={{
                        fontSize: 'var(--text-sm)',
                        fontWeight: 'var(--font-bold)',
                        color: '#f3f4f6',
                      }}>
                        {player.name}
                      </span>
                      <span style={{
                        fontSize: '9px',
                        background: player.position === 'POR' ? '#F59E0B' : player.position === 'DEF' ? '#FFE600' : player.position === 'MED' ? '#10B981' : '#EF4444',
                        color: '#12121a',
                        padding: '2px 6px',
                        borderRadius: 'var(--radius-sm)',
                        fontWeight: 'var(--font-bold)',
                      }}>
                        {player.position}
                      </span>
                      {!isStarter && (
                        <span style={{
                          fontSize: '9px',
                          background: '#1a1a24',
                          color: '#6b7280',
                          padding: '2px 6px',
                          borderRadius: 'var(--radius-sm)',
                        }}>
                          BAN
                        </span>
                      )}
                    </div>
                    <span style={{
                      fontSize: 'var(--text-xs)',
                      color: '#6b7280',
                    }}>
                      {player.club}
                    </span>
                  </div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-2)',
                  }}>
                    <span style={{
                      fontSize: 'var(--text-sm)',
                      fontWeight: 'var(--font-black)',
                      color: '#FFE600',
                    }}>
                      {player.points}
                    </span>
                    <span style={{
                      fontSize: '10px',
                      color: '#6b7280',
                    }}>
                      pts
                    </span>
                  </div>
                </div>
              );
            })
            )}
          </Card.Body>
        </Card>

        {/* COMODINES ACTIVOS */}
        <Card style={{ marginTop: 'var(--space-4)' }}>
          <Card.Header>
            <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', fontSize: 'var(--text-lg)' }}>🎁</span>
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              color: '#f3f4f6',
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
                color: '#FFE600',
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
                { icon: '⭐', name: 'Capitán x2', available: 3, total: 3, color: '#FFE600', desc: 'Duplica los puntos de un jugador' },
                { icon: '🛡️', name: 'Escudo', available: 2, total: 2, color: '#FFE600', desc: 'Protege tu puntuación mínima' },
                { icon: '✨', name: 'Estrella Dorada', available: 1, total: 1, color: '#FFE600', desc: 'Triplica puntos de tu mejor jugador' },
                { icon: '🔄', name: 'Banquillo Boost', available: 2, total: 2, color: '#FFE600', desc: 'Suma puntos del banquillo' },
              ].map((chip) => (
                <div
                  key={chip.name}
                  onClick={() => setView('chips')}
                  style={{
                    minWidth: 100,
                    padding: 'var(--space-3)',
                    background: '#1a1a24',
                    borderRadius: 'var(--radius-lg)',
                    textAlign: 'center',
                    border: chip.available > 0 ? `1px solid ${chip.color}` : '1px solid #2a2a3a',
                    opacity: chip.available > 0 ? 1 : 0.5,
                    cursor: 'pointer',
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
                    color: '#f3f4f6',
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

      {/* MODAL DE DETALLE DEL JUGADOR */}
      <PlayerDetailModal
        player={selectedPlayer}
        isOpen={isMenuOpen}
        onClose={() => setIsMenuOpen(false)}
        onRemoveFromTeam={handleRemoveFromTeam}
        onMakeCaptain={handleMakeCaptain}
        onToggleStarter={handleToggleStarter}
        mode="manage"
      />
    </div>
  );
}
