import { useState } from 'react';
import { Target, Check, X, ChevronDown, Plus, Calendar } from 'lucide-react';
import { Card } from '../components/ui/Card';

import { useFantasy } from '../../application/hooks/useFantasy';

interface PredictionsPageProps {
  onNavigate?: (view: string) => void;
}

const MOCK_MATCHDAYS = [
  { id: 1, points: 65, date: '11 Jun', isActive: true },
  { id: 2, points: 72, date: '17 Jun', isActive: false },
  { id: 3, points: 50, date: '23 Jun', isActive: false },
];

// Partidos reales de cada jornada
const MOCK_MATCHES: Record<number, Array<{
  id: string;
  homeTeam: string;
  awayTeam: string;
  homeName: string;
  awayName: string;
  date: string;
  time: string;
  played: boolean;
  actualResult?: string; // ej: "2-1"
}>> = {
  1: [
    { id: 'm1', homeTeam: 'arg', awayTeam: 'kor', homeName: 'Argentina', awayName: 'Corea del Sur', date: '11 Jun', time: '14:00', played: true, actualResult: '2-0' },
    { id: 'm2', homeTeam: 'esp', awayTeam: 'ned', homeName: 'España', awayName: 'Países Bajos', date: '11 Jun', time: '17:00', played: true, actualResult: '3-0' },
    { id: 'm3', homeTeam: 'fra', awayTeam: 'cro', homeName: 'Francia', awayName: 'Croacia', date: '12 Jun', time: '14:00', played: true, actualResult: '2-1' },
    { id: 'm4', homeTeam: 'bra', awayTeam: 'uru', homeName: 'Brasil', awayName: 'Uruguay', date: '12 Jun', time: '17:00', played: true, actualResult: '2-0' },
    { id: 'm5', homeTeam: 'ger', awayTeam: 'mar', homeName: 'Alemania', awayName: 'Marruecos', date: '13 Jun', time: '20:00', played: false },
  ],
  2: [
    { id: 'm6', homeTeam: 'eng', awayTeam: 'usa', homeName: 'Inglaterra', awayName: 'EE.UU.', date: '17 Jun', time: '14:00', played: false },
    { id: 'm7', homeTeam: 'por', awayTeam: 'gha', homeName: 'Portugal', awayName: 'Ghana', date: '17 Jun', time: '17:00', played: false },
    { id: 'm8', homeTeam: 'arg', awayTeam: 'mex', homeName: 'Argentina', awayName: 'México', date: '18 Jun', time: '20:00', played: false },
    { id: 'm9', homeTeam: 'fra', awayTeam: 'den', homeName: 'Francia', awayName: 'Dinamarca', date: '18 Jun', time: '14:00', played: false },
  ],
  3: [
    { id: 'm10', homeTeam: 'esp', awayTeam: 'jpn', homeName: 'España', awayName: 'Japón', date: '23 Jun', time: '17:00', played: false },
    { id: 'm11', homeTeam: 'bra', awayTeam: 'sui', homeName: 'Brasil', awayName: 'Suiza', date: '23 Jun', time: '20:00', played: false },
    { id: 'm12', homeTeam: 'ger', awayTeam: 'crc', homeName: 'Alemania', awayName: 'Costa Rica', date: '24 Jun', time: '14:00', played: false },
  ],
};

const SCORING_SYSTEM = [
  { label: 'Resultado exacto', points: 15 },
  { label: 'Acertar ganador', points: 5 },
  { label: 'Fallo', points: 0 },
];

const NATION_FLAGS: Record<string, string> = {
  // 3 letras
  arg: 'ar',
  bra: 'br',
  fra: 'fr',
  esp: 'es',
  eng: 'gb-eng',
  ger: 'de',
  kor: 'kr',
  ned: 'nl',
  cro: 'hr',
  uru: 'uy',
  mar: 'ma',
  usa: 'us',
  por: 'pt',
  gha: 'gh',
  mex: 'mx',
  den: 'dk',
  jpn: 'jp',
  sui: 'ch',
  crc: 'cr',
  // 2 letras (alternativas)
  ar: 'ar',
  br: 'br',
  fr: 'fr',
  es: 'es',
  'gb-eng': 'gb-eng',
  de: 'de',
  kr: 'kr',
  nl: 'nl',
  hr: 'hr',
  uy: 'uy',
  ma: 'ma',
  us: 'us',
  pt: 'pt',
  gh: 'gh',
  mx: 'mx',
  dk: 'dk',
  jp: 'jp',
  ch: 'ch',
  cr: 'cr',
};

const FlagImage = ({ code, size = 24 }: { code: string; size?: number }) => {
  const flagCode = NATION_FLAGS[code] || code;
  return (
    <img
      src={`https://flagcdn.com/w80/${flagCode}.png`}
      alt={code}
      style={{
        width: size,
        height: size * 0.75,
        objectFit: 'cover',
        borderRadius: '2px',
        boxShadow: '0 1px 2px rgba(0,0,0,0.2)',
      }}
    />
  );
};

interface Prediction {
  matchId: string;
  homeScore: number;
  awayScore: number;
  points?: number;
  result?: 'exact' | 'winner' | 'wrong' | 'pending';
}

export function PredictionsPage({ onNavigate: _onNavigate }: PredictionsPageProps) {
  useFantasy();
  const [selectedMatchday, setSelectedMatchday] = useState(1);
  const [showScoringSystem, setShowScoringSystem] = useState(false);
  const [showPredictModal, setShowPredictModal] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<typeof MOCK_MATCHES[1][0] | null>(null);
  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');
  
  // Predicciones del usuario (matchId -> prediction)
  const [predictions, setPredictions] = useState<Record<string, Prediction>>({
    'm1': { matchId: 'm1', homeScore: 2, awayScore: 0, points: 15, result: 'exact' },
    'm2': { matchId: 'm2', homeScore: 3, awayScore: 1, points: 5, result: 'winner' },
    'm3': { matchId: 'm3', homeScore: 2, awayScore: 1, points: 15, result: 'exact' },
    'm4': { matchId: 'm4', homeScore: 1, awayScore: 1, points: 0, result: 'wrong' },
  });

  const currentMatches = MOCK_MATCHES[selectedMatchday] || [];
  
  // Separar partidos en categorías
  // 1. Partidos NO jugados SIN predicción → Por predecir
  const matchesToPredict = currentMatches.filter(m => !m.played && !predictions[m.id]);
  
  // 2. Partidos NO jugados CON predicción → Mis predicciones pendientes
  const pendingPredictions = currentMatches.filter(m => !m.played && predictions[m.id]);
  
  // 3. Partidos JUGADOS (historial) → Siempre mostrar si tengo predicción o no
  const playedMatches = currentMatches.filter(m => m.played);

  const handleOpenPredictModal = (match: typeof MOCK_MATCHES[1][0]) => {
    // No permitir predecir partidos ya jugados
    if (match.played) return;
    
    setSelectedMatch(match);
    const existingPred = predictions[match.id];
    setHomeScore(existingPred ? String(existingPred.homeScore) : '');
    setAwayScore(existingPred ? String(existingPred.awayScore) : '');
    setShowPredictModal(true);
  };

  const handleSavePrediction = () => {
    if (!selectedMatch || homeScore === '' || awayScore === '') {
      alert('Introduce ambos marcadores');
      return;
    }
    
    // Guardar predicción
    setPredictions({
      ...predictions,
      [selectedMatch.id]: {
        matchId: selectedMatch.id,
        homeScore: parseInt(homeScore),
        awayScore: parseInt(awayScore),
        result: 'pending',
      },
    });
    
    setShowPredictModal(false);
    setSelectedMatch(null);
    setHomeScore('');
    setAwayScore('');
  };

  const totalPoints = Object.values(predictions).reduce((sum, p) => sum + (p.points || 0), 0);

  return (
    <div style={{ minHeight: '100vh', background: '#12121a' }}>
      <div style={{ padding: 'var(--space-4)' }}>
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
              color: '#f3f4f6',
            }}>
              Puntos por Jornada
            </span>
          </div>

          <div style={{
            display: 'flex',
            gap: 'var(--space-2)',
          }}>
            {MOCK_MATCHDAYS.map((matchday) => (
              <button
                key={matchday.id}
                onClick={() => setSelectedMatchday(matchday.id)}
                style={{
                  flex: 1,
                  padding: 'var(--space-3)',
                  background: selectedMatchday === matchday.id 
                    ? 'rgba(255, 230, 0, 0.15)' 
                    : '#1a1a24',
                  border: `2px solid ${selectedMatchday === matchday.id ? '#FFE600' : '#2a2a3a'}`,
                  borderRadius: 'var(--radius-lg)',
                  textAlign: 'center',
                  cursor: 'pointer',
                }}
              >
                <span style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-bold)',
                  color: '#6b7280',
                  textTransform: 'uppercase',
                }}>
                  JORNADA {matchday.id}
                </span>
                <span style={{
                  display: 'block',
                  fontSize: 'var(--text-2xl)',
                  fontWeight: 'var(--font-black)',
                  color: selectedMatchday === matchday.id ? '#FFE600' : '#f3f4f6',
                  marginTop: 'var(--space-1)',
                }}>
                  {matchday.points}
                </span>
                {matchday.isActive && (
                  <span style={{
                    fontSize: '9px',
                    fontWeight: 'var(--font-bold)',
                    color: '#12121a',
                    background: '#FFE600',
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
                  color: '#6b7280',
                  marginTop: '2px',
                }}>
                  {matchday.date}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* PARTIDOS POR PREDECIR (no jugados, sin predicción) */}
        {matchesToPredict.length > 0 && (
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-3)',
            }}>
              <span style={{ fontSize: 'var(--text-lg)' }}>⚽</span>
              <span style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-bold)',
                color: '#f3f4f6',
              }}>
                Partidos por Predecir
              </span>
              <span style={{
                fontSize: 'var(--text-xs)',
                background: '#1a1a24',
                color: '#9ca3af',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
              }}>
                {matchesToPredict.length}
              </span>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-2)',
            }}>
              {matchesToPredict.map((match) => (
                <button
                  key={match.id}
                  onClick={() => handleOpenPredictModal(match)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-3)',
                    background: '#1a1a24',
                    border: '1px solid #2a2a3a',
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-3)',
                    flex: 1,
                  }}>
                    {/* Local */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      flex: 1,
                      justifyContent: 'flex-end',
                    }}>
                      <FlagImage code={match.homeTeam} size={32} />
                    </div>

                    {/* VS */}
                    <div style={{
                      padding: 'var(--space-1) var(--space-2)',
                      background: '#12121a',
                      borderRadius: 'var(--radius-md)',
                    }}>
                      <span style={{
                        fontSize: 'var(--text-xs)',
                        fontWeight: 'var(--font-black)',
                        color: '#6b7280',
                      }}>
                        VS
                      </span>
                    </div>

                    {/* Visitante */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-2)',
                      flex: 1,
                    }}>
                      <FlagImage code={match.awayTeam} size={32} />
                    </div>
                  </div>

                  {/* Fecha/hora */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--space-1)',
                    marginLeft: 'var(--space-3)',
                  }}>
                    <Calendar size={12} style={{ color: '#6b7280' }} />
                    <span style={{
                      fontSize: '10px',
                      color: '#6b7280',
                    }}>
                      {match.date} {match.time}
                    </span>
                  </div>

                  {/* Botón predecir */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginLeft: 'var(--space-3)',
                    padding: 'var(--space-1) var(--space-2)',
                    background: '#FFE600',
                    borderRadius: 'var(--radius-md)',
                  }}>
                    <Plus size={14} style={{ color: '#12121a' }} />
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 'var(--font-bold)',
                      color: '#12121a',
                    }}>
                      Predecir
                    </span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* MIS PREDICCIONES PENDIENTES (ya predije, no jugado aún) */}
        {pendingPredictions.length > 0 && (
          <div style={{ marginBottom: 'var(--space-4)' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              marginBottom: 'var(--space-3)',
            }}>
              <span style={{ fontSize: 'var(--text-lg)' }}>🔮</span>
              <span style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-bold)',
                color: '#f3f4f6',
              }}>
                Mis Predicciones (Pendientes)
              </span>
              <span style={{
                fontSize: 'var(--text-xs)',
                background: 'rgba(255, 230, 0, 0.1)',
                color: '#FFE600',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
              }}>
                {pendingPredictions.length}
              </span>
            </div>

            <Card variant="elevated">
              {pendingPredictions.map((match, idx) => {
                const pred = predictions[match.id];
                
                return (
                  <div
                    key={match.id}
                    onClick={() => handleOpenPredictModal(match)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      padding: 'var(--space-3)',
                      borderBottom: idx < pendingPredictions.length - 1 ? '1px solid #2a2a3a' : 'none',
                      cursor: 'pointer',
                      background: 'transparent',
                    }}
                  >
                    {/* Icono pendiente */}
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: '#1a1a24',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      <span style={{ fontSize: '12px' }}>⏳</span>
                    </div>

                    {/* MATCH INFO */}
                    <div style={{ flex: 1 }}>
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--space-2)',
                        marginBottom: '2px',
                      }}>
                        {/* Local */}
                        <FlagImage code={match.homeTeam} size={20} />
                        <span style={{
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-bold)',
                          color: '#f3f4f6',
                        }}>
                          {match.homeName}
                        </span>
                        
                        {/* Predicción */}
                        <span style={{
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-black)',
                          color: '#FFE600',
                          background: 'rgba(255, 230, 0, 0.1)',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-sm)',
                        }}>
                          {pred?.homeScore} - {pred?.awayScore}
                        </span>
                        
                        {/* Visitante */}
                        <span style={{
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-bold)',
                          color: '#f3f4f6',
                        }}>
                          {match.awayName}
                        </span>
                        <FlagImage code={match.awayTeam} size={20} />
                      </div>
                      <span style={{
                        fontSize: 'var(--text-xs)',
                        color: '#6b7280',
                      }}>
                        📅 {match.date} {match.time} • Toca para editar
                      </span>
                    </div>
                  </div>
                );
              })}
            </Card>
          </div>
        )}

        {/* HISTORIAL (partidos jugados) */}
        {playedMatches.length > 0 && (
          <div style={{ marginBottom: 'var(--space-4)' }}>
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
                color: '#f3f4f6',
              }}>
                Historial
              </span>
              <span style={{
                fontSize: 'var(--text-xs)',
                background: '#1a1a24',
                color: '#9ca3af',
                padding: '2px 8px',
                borderRadius: 'var(--radius-full)',
              }}>
                {playedMatches.length}
              </span>
            </div>

            <Card variant="elevated">
              {playedMatches.map((match, idx) => {
                const pred = predictions[match.id];
                const hasPrediction = !!pred;
                
                return (
                  <div
                    key={match.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--space-3)',
                      padding: 'var(--space-3)',
                      borderBottom: idx < playedMatches.length - 1 ? '1px solid #2a2a3a' : 'none',
                    }}
                  >
                    {/* STATUS ICON */}
                    <div style={{
                      width: 28,
                      height: 28,
                      borderRadius: '50%',
                      background: !hasPrediction 
                        ? '#1a1a24'
                        : pred?.result === 'exact' 
                        ? 'rgba(255, 230, 0, 0.2)' 
                        : pred?.result === 'winner'
                        ? 'rgba(245, 158, 11, 0.2)'
                        : 'rgba(239, 68, 68, 0.2)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                      {!hasPrediction ? (
                        <span style={{ fontSize: '10px' }}>❓</span>
                      ) : pred?.result === 'exact' ? (
                        <Check size={14} style={{ color: '#FFE600' }} />
                      ) : pred?.result === 'winner' ? (
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
                        gap: 'var(--space-2)',
                        marginBottom: '2px',
                      }}>
                        {/* Local */}
                        <FlagImage code={match.homeTeam} size={20} />
                        <span style={{
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-bold)',
                          color: '#f3f4f6',
                        }}>
                          {match.homeName}
                        </span>
                        
                        {/* Resultado real */}
                        <span style={{
                          fontSize: 'var(--text-sm)',
                          fontWeight: 'var(--font-black)',
                          color: '#f3f4f6',
                          background: '#1a1a24',
                          padding: '2px 8px',
                          borderRadius: 'var(--radius-sm)',
                        }}>
                          {match.actualResult}
                        </span>
                        
                        {/* Visitante */}
                        <span style={{
                          fontSize: 'var(--text-xs)',
                          fontWeight: 'var(--font-bold)',
                          color: '#f3f4f6',
                        }}>
                          {match.awayName}
                        </span>
                        <FlagImage code={match.awayTeam} size={20} />
                      </div>
                      <span style={{
                        fontSize: 'var(--text-xs)',
                        color: '#6b7280',
                      }}>
                        {hasPrediction 
                          ? `Tu predicción: ${pred?.homeScore}-${pred?.awayScore} • ${pred?.result === 'exact' ? '✓ Exacto' : pred?.result === 'winner' ? '✓ Ganador' : '✗ Fallo'}`
                          : 'No hiciste predicción'
                        }
                      </span>
                    </div>

                    {/* POINTS */}
                    {hasPrediction && (
                      <span style={{
                        fontSize: 'var(--text-md)',
                        fontWeight: 'var(--font-black)',
                        color: (pred?.points || 0) > 0 ? '#FFE600' : '#EF4444',
                      }}>
                        +{pred?.points}
                      </span>
                    )}
                  </div>
                );
              })}

              {/* TOTAL */}
              <div style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--space-3)',
                borderTop: '2px solid #2a2a3a',
                background: 'rgba(255, 230, 0, 0.05)',
              }}>
                <span style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-bold)',
                  color: '#f3f4f6',
                }}>
                  Total historial
                </span>
                <span style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-black)',
                  color: '#FFE600',
                }}>
                  +{totalPoints} pts
                </span>
              </div>
            </Card>
          </div>
        )}

        {/* SISTEMA DE PUNTUACIÓN */}
        <Card>
          <button
            onClick={() => setShowScoringSystem(!showScoringSystem)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              width: '100%',
              background: 'transparent',
              border: 'none',
              padding: 0,
              cursor: 'pointer',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)' }}>
              <span style={{ fontSize: 'var(--text-lg)' }}>📋</span>
              <span style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-bold)',
                color: '#f3f4f6',
              }}>
                Sistema de puntuación
              </span>
            </div>
            <ChevronDown 
              size={18} 
              style={{ 
                color: '#6b7280',
                transform: showScoringSystem ? 'rotate(180deg)' : 'none',
                transition: 'transform 0.2s',
              }} 
            />
          </button>

          {showScoringSystem && (
            <div style={{
              marginTop: 'var(--space-3)',
              paddingTop: 'var(--space-3)',
              borderTop: '1px solid #2a2a3a',
            }}>
              {SCORING_SYSTEM.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--space-2) 0',
                    borderBottom: idx < SCORING_SYSTEM.length - 1 ? '1px solid #2a2a3a' : 'none',
                  }}
                >
                  <span style={{
                    fontSize: 'var(--text-xs)',
                    color: '#9ca3af',
                  }}>
                    {item.label}
                  </span>
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-black)',
                    color: item.points > 0 ? '#FFE600' : '#6b7280',
                  }}>
                    +{item.points}
                  </span>
                </div>
              ))}
            </div>
          )}
        </Card>
      </div>

      {/* MODAL PARA PREDECIR */}
      {showPredictModal && selectedMatch && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(4px)',
          zIndex: 200,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }} onClick={() => setShowPredictModal(false)}>
          <div style={{
            width: '100%',
            maxWidth: 480,
            background: '#1a1a24',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-4)',
            margin: 'var(--space-4)',
            animation: 'fadeIn 0.3s ease-out',
          }} onClick={(e) => e.stopPropagation()}>
            <h3 style={{
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-black)',
              color: '#f3f4f6',
              marginBottom: 'var(--space-4)',
              textAlign: 'center',
            }}>
              Tu Predicción
            </h3>

            {/* PARTIDO */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--space-4)',
              marginBottom: 'var(--space-4)',
              padding: 'var(--space-3)',
              background: '#12121a',
              borderRadius: 'var(--radius-lg)',
            }}>
              {/* Local */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-1)',
              }}>
                <FlagImage code={selectedMatch.homeTeam} size={40} />
                <span style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-bold)',
                  color: '#f3f4f6',
                }}>
                  {selectedMatch.homeName}
                </span>
              </div>

              <span style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-black)',
                color: '#6b7280',
              }}>
                VS
              </span>

              {/* Visitante */}
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 'var(--space-1)',
              }}>
                <FlagImage code={selectedMatch.awayTeam} size={40} />
                <span style={{
                  fontSize: 'var(--text-xs)',
                  fontWeight: 'var(--font-bold)',
                  color: '#f3f4f6',
                }}>
                  {selectedMatch.awayName}
                </span>
              </div>
            </div>

            {/* MARCADOR */}
            <div style={{ marginBottom: 'var(--space-4)' }}>
              <label style={{
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-bold)',
                color: '#9ca3af',
                marginBottom: 'var(--space-2)',
                display: 'block',
                textAlign: 'center',
              }}>
                ¿Qué resultado crees que habrá?
              </label>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--space-3)',
                justifyContent: 'center',
              }}>
                <input
                  type="number"
                  min="0"
                  max="20"
                  placeholder="0"
                  value={homeScore}
                  onChange={(e) => setHomeScore(e.target.value)}
                  style={{
                    width: 80,
                    padding: 'var(--space-3)',
                    background: '#12121a',
                    border: '1px solid #2a2a3a',
                    borderRadius: 'var(--radius-lg)',
                    color: '#f3f4f6',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-black)',
                    textAlign: 'center',
                  }}
                />
                <span style={{
                  fontSize: 'var(--text-xl)',
                  fontWeight: 'var(--font-black)',
                  color: '#6b7280',
                }}>
                  -
                </span>
                <input
                  type="number"
                  min="0"
                  max="20"
                  placeholder="0"
                  value={awayScore}
                  onChange={(e) => setAwayScore(e.target.value)}
                  style={{
                    width: 80,
                    padding: 'var(--space-3)',
                    background: '#12121a',
                    border: '1px solid #2a2a3a',
                    borderRadius: 'var(--radius-lg)',
                    color: '#f3f4f6',
                    fontSize: 'var(--text-xl)',
                    fontWeight: 'var(--font-black)',
                    textAlign: 'center',
                  }}
                />
              </div>
            </div>

            {/* BOTONES */}
            <div style={{
              display: 'flex',
              gap: 'var(--space-2)',
            }}>
              <button
                onClick={() => setShowPredictModal(false)}
                style={{
                  flex: 1,
                  padding: 'var(--space-3)',
                  background: '#12121a',
                  border: '1px solid #2a2a3a',
                  borderRadius: 'var(--radius-lg)',
                  color: '#9ca3af',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-bold)',
                  cursor: 'pointer',
                }}
              >
                Cancelar
              </button>
              <button
                onClick={handleSavePrediction}
                style={{
                  flex: 1,
                  padding: 'var(--space-3)',
                  background: '#FFE600',
                  border: 'none',
                  borderRadius: 'var(--radius-lg)',
                  color: '#12121a',
                  fontSize: 'var(--text-sm)',
                  fontWeight: 'var(--font-bold)',
                  cursor: 'pointer',
                }}
              >
                Guardar Predicción
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }
      `}</style>
    </div>
  );
}
