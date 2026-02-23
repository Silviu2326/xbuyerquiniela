import { useState } from 'react';
import type { Match, BetType } from '../../types/index.ts';
import { BET_TYPES, SCORERS, SCORE_OPTIONS, SCORE_ODDS } from '../../data/betting';
import { MATCHES } from '../../data/matches';
import { getFlagImage } from '../../utils/helpers';
import { ChevronLeft, X, Zap } from 'lucide-react';

interface BetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (bet: any) => void;
}

export const BetModal = ({ isOpen, onClose, onConfirm }: BetModalProps) => {
  const [step, setStep] = useState(1);
  const [selMatch, setSelMatch] = useState<Match | null>(null);
  const [selType, setSelType] = useState<BetType | null>(null);
  const [selPick, setSelPick] = useState<string | null>(null);
  const [selOdds, setSelOdds] = useState(0);
  const [selAmount, setSelAmount] = useState(25);

  if (!isOpen) return null;

  const progress = (step / 4) * 100;
  const potential = (selAmount * selOdds).toFixed(2);

  const handleMatchSelect = (match: Match) => {
    setSelMatch(match);
    setStep(2);
  };

  const handleTypeSelect = (type: BetType) => {
    setSelType(type);
    setStep(3);
  };

  const handlePick = (pick: string, odds: number) => {
    setSelPick(pick);
    setSelOdds(odds);
  };

  const handleContinue = () => {
    setStep(4);
  };

  const handleConfirm = () => {
    if (!selMatch || !selType || !selPick) return;

    onConfirm({
      match: `${selMatch.h} vs ${selMatch.a}`,
      matchId: selMatch.id,
      type: selType.id,
      typeName: selType.label,
      pick: selPick,
      odds: selOdds,
      amount: selAmount,
      status: 'pending',
      date: `${selMatch.date} ${selMatch.time}`
    });

    // Reset
    setStep(1);
    setSelMatch(null);
    setSelType(null);
    setSelPick(null);
    setSelOdds(0);
    setSelAmount(25);
  };

  const getStepTitle = () => {
    switch (step) {
      case 1: return 'Selecciona partido';
      case 2: return 'Tipo de apuesta';
      case 3: return 'Tu predicción';
      case 4: return 'Confirmar apuesta';
      default: return '';
    }
  };

  return (
    <div style={{
      position: 'fixed',
      inset: 0,
      zIndex: 100,
      background: 'rgba(0,0,0,0.85)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'flex-end',
      justifyContent: 'center',
    }}>
      <div style={{
        background: 'var(--bg-primary)',
        borderRadius: 'var(--radius-2xl) var(--radius-2xl) 0 0',
        width: '100%',
        maxWidth: 500,
        maxHeight: '90vh',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          background: 'var(--bg-secondary)',
          borderBottom: '1px solid var(--border-primary)',
          padding: 'var(--space-4)',
          flexShrink: 0,
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-3)',
          }}>
            {step > 1 ? (
              <button
                onClick={() => setStep(step - 1)}
                style={{
                  width: 36,
                  height: 36,
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
                <ChevronLeft size={20} />
              </button>
            ) : (
              <div style={{ width: 36 }} />
            )}
            
            <span style={{
              fontSize: 'var(--text-md)',
              fontWeight: 'var(--font-black)',
              color: 'var(--text-primary)',
            }}>
              {getStepTitle().toUpperCase()}
            </span>
            
            <button
              onClick={onClose}
              style={{
                width: 36,
                height: 36,
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
              <X size={18} />
            </button>
          </div>
          
          {/* Progress bar */}
          <div style={{
            height: 4,
            background: 'var(--bg-elevated)',
            borderRadius: 'var(--radius-full)',
            overflow: 'hidden',
          }}>
            <div style={{
              height: '100%',
              width: `${progress}%`,
              background: 'var(--color-primary)',
              borderRadius: 'var(--radius-full)',
              transition: 'width 0.3s ease',
            }} />
          </div>
        </div>

        {/* Content */}
        <div style={{
          padding: 'var(--space-4)',
          overflowY: 'auto',
          flex: 1,
        }}>
          {step === 1 && <Step1 onSelect={handleMatchSelect} />}
          {step === 2 && <Step2 onSelect={handleTypeSelect} />}
          {step === 3 && (
            <Step3
              match={selMatch!}
              type={selType!}
              selPick={selPick}
              onPick={handlePick}
              onContinue={handleContinue}
            />
          )}
          {step === 4 && (
            <Step4
              match={selMatch!}
              type={selType!}
              pick={selPick!}
              odds={selOdds}
              amount={selAmount}
              potential={potential}
              onAmountChange={setSelAmount}
              onConfirm={handleConfirm}
            />
          )}
        </div>
      </div>
    </div>
  );
};

// Step 1: Seleccionar partido
function Step1({ onSelect }: { onSelect: (m: Match) => void }) {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)',
    }}>
      {MATCHES.map(m => (
        <div
          key={m.id}
          onClick={() => onSelect(m)}
          style={{
            background: 'var(--bg-secondary)',
            border: m.live ? '1px solid var(--color-primary)' : '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-4)',
            cursor: 'pointer',
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-2)',
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              flex: 1,
            }}>
              <img
                src={getFlagImage(m.h, 28)}
                alt={m.h}
                style={{
                  width: 28,
                  height: 20,
                  borderRadius: 'var(--radius-sm)',
                  objectFit: 'cover',
                }}
              />
              <span style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
              }}>{m.h}</span>
            </div>
            
            <div style={{
              fontSize: m.live ? 'var(--text-xl)' : 'var(--text-sm)',
              fontWeight: 'var(--font-black)',
              color: m.live ? 'var(--text-primary)' : 'var(--text-tertiary)',
              padding: '0 var(--space-3)',
            }}>
              {m.live ? `${m.hS} - ${m.aS}` : 'vs'}
            </div>
            
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--space-2)',
              flex: 1,
              justifyContent: 'flex-end',
            }}>
              <span style={{
                fontSize: 'var(--text-sm)',
                fontWeight: 'var(--font-bold)',
                color: 'var(--text-primary)',
              }}>{m.a}</span>
              <img
                src={getFlagImage(m.a, 28)}
                alt={m.a}
                style={{
                  width: 28,
                  height: 20,
                  borderRadius: 'var(--radius-sm)',
                  objectFit: 'cover',
                }}
              />
            </div>
          </div>
          
          <div style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
            textAlign: 'center',
          }}>
            {m.live ? (
              <span style={{ color: 'var(--color-primary)', fontWeight: 'var(--font-bold)' }}>
                ● EN VIVO {m.min}
              </span>
            ) : (
              <span>📅 {m.date} · {m.time}</span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

// Step 2: Tipo de apuesta
function Step2({ onSelect }: { onSelect: (t: BetType) => void }) {
  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(2, 1fr)',
      gap: 'var(--space-3)',
    }}>
      {BET_TYPES.map(bt => (
        <div
          key={bt.id}
          onClick={() => onSelect(bt)}
          style={{
            background: 'var(--bg-secondary)',
            border: '1px solid var(--border-primary)',
            borderRadius: 'var(--radius-xl)',
            padding: 'var(--space-4)',
            cursor: 'pointer',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: '32px', marginBottom: 'var(--space-2)' }}>
            {bt.icon}
          </div>
          <div style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--text-primary)',
            marginBottom: '4px',
          }}>
            {bt.label}
          </div>
          <div style={{
            fontSize: '10px',
            color: 'var(--text-tertiary)',
            marginBottom: 'var(--space-2)',
          }}>
            {bt.desc}
          </div>
          <div style={{
            fontSize: 'var(--text-xs)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-primary)',
          }}>
            {bt.oddsRange}
          </div>
        </div>
      ))}
    </div>
  );
}

// Step 3: Predicción
function Step3({ 
  match, 
  type, 
  selPick, 
  onPick, 
  onContinue 
}: { 
  match: Match;
  type: BetType;
  selPick: string | null;
  onPick: (pick: string, odds: number) => void;
  onContinue: () => void;
}) {
  let content = null;

  if (type.id === 'result') {
    const odds = [1.85, 3.20, 4.50];
    const labels = [match.h, 'Empate', match.a];
    content = (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--space-2)',
      }}>
        {labels.map((label, i) => (
          <button
            key={label}
            onClick={() => onPick(label, odds[i])}
            style={{
              padding: 'var(--space-3)',
              background: selPick === label ? 'var(--color-primary)' : 'var(--bg-secondary)',
              border: selPick === label ? 'none' : '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
            }}
          >
            <div style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-bold)',
              color: selPick === label ? 'var(--bg-primary)' : 'var(--text-primary)',
              marginBottom: '4px',
            }}>{label}</div>
            <div style={{
              fontSize: 'var(--text-xs)',
              color: selPick === label ? 'var(--bg-primary)' : 'var(--color-primary)',
              fontWeight: 'var(--font-bold)',
            }}>{odds[i].toFixed(2)}</div>
          </button>
        ))}
      </div>
    );
  } else if (type.id === 'score') {
    content = (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 'var(--space-2)',
      }}>
        {SCORE_OPTIONS.map((score, i) => (
          <button
            key={score}
            onClick={() => onPick(score, SCORE_ODDS[i])}
            style={{
              padding: 'var(--space-2)',
              background: selPick === score ? 'var(--color-primary)' : 'var(--bg-secondary)',
              border: selPick === score ? 'none' : '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
            }}
          >
            <div style={{
              fontSize: 'var(--text-xs)',
              fontWeight: 'var(--font-bold)',
              color: selPick === score ? 'var(--bg-primary)' : 'var(--text-primary)',
            }}>{score}</div>
            <div style={{
              fontSize: '10px',
              color: selPick === score ? 'var(--bg-primary)' : 'var(--color-primary)',
            }}>{SCORE_ODDS[i].toFixed(2)}</div>
          </button>
        ))}
      </div>
    );
  } else if (type.id === 'scorer') {
    const hScorers = SCORERS[match.h] || [];
    const aScorers = SCORERS[match.a] || [];
    content = (
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
      }}>
        <div>
          <div style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-2)',
          }}>{match.h}</div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-1)',
          }}>
            {hScorers.map(s => {
              const [name, odds] = s.split('|');
              const isSelected = selPick === name;
              return (
                <button
                  key={name}
                  onClick={() => onPick(name, parseFloat(odds))}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'var(--space-3)',
                    background: isSelected ? 'var(--color-primary)' : 'var(--bg-secondary)',
                    border: isSelected ? 'none' : '1px solid var(--border-primary)',
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-bold)',
                    color: isSelected ? 'var(--bg-primary)' : 'var(--text-primary)',
                  }}>⚽ {name}</span>
                  <span style={{
                    fontSize: 'var(--text-xs)',
                    color: isSelected ? 'var(--bg-primary)' : 'var(--color-primary)',
                    fontWeight: 'var(--font-bold)',
                  }}>{parseFloat(odds).toFixed(2)}</span>
                </button>
              );
            })}
          </div>
        </div>
        <div>
          <div style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-secondary)',
            marginBottom: 'var(--space-2)',
          }}>{match.a}</div>
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-1)',
          }}>
            {aScorers.map(s => {
              const [name, odds] = s.split('|');
              const isSelected = selPick === name;
              return (
                <button
                  key={name}
                  onClick={() => onPick(name, parseFloat(odds))}
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: 'var(--space-3)',
                    background: isSelected ? 'var(--color-primary)' : 'var(--bg-secondary)',
                    border: isSelected ? 'none' : '1px solid var(--border-primary)',
                    borderRadius: 'var(--radius-lg)',
                    cursor: 'pointer',
                  }}
                >
                  <span style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-bold)',
                    color: isSelected ? 'var(--bg-primary)' : 'var(--text-primary)',
                  }}>⚽ {name}</span>
                  <span style={{
                    fontSize: 'var(--text-xs)',
                    color: isSelected ? 'var(--bg-primary)' : 'var(--color-primary)',
                    fontWeight: 'var(--font-bold)',
                  }}>{parseFloat(odds).toFixed(2)}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  } else {
    const options = [
      { label: 'Más de 2.5', odds: 1.85 },
      { label: 'Menos de 2.5', odds: 2.00 }
    ];
    content = (
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--space-2)',
      }}>
        {options.map(opt => (
          <button
            key={opt.label}
            onClick={() => onPick(opt.label, opt.odds)}
            style={{
              padding: 'var(--space-4)',
              background: selPick === opt.label ? 'var(--color-primary)' : 'var(--bg-secondary)',
              border: selPick === opt.label ? 'none' : '1px solid var(--border-primary)',
              borderRadius: 'var(--radius-lg)',
              cursor: 'pointer',
            }}
          >
            <div style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              color: selPick === opt.label ? 'var(--bg-primary)' : 'var(--text-primary)',
              marginBottom: '4px',
            }}>{opt.label}</div>
            <div style={{
              fontSize: 'var(--text-xs)',
              color: selPick === opt.label ? 'var(--bg-primary)' : 'var(--color-primary)',
              fontWeight: 'var(--font-bold)',
            }}>{opt.odds.toFixed(2)}</div>
          </button>
        ))}
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
    }}>
      <div style={{
        fontSize: 'var(--text-xs)',
        color: 'var(--text-secondary)',
      }}>Selecciona tu predicción</div>
      {content}
      {selPick && (
        <button
          onClick={onContinue}
          style={{
            padding: 'var(--space-4)',
            background: 'var(--color-primary)',
            border: 'none',
            borderRadius: 'var(--radius-xl)',
            color: 'var(--bg-primary)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-black)',
            cursor: 'pointer',
            marginTop: 'var(--space-2)',
          }}
        >
          CONTINUAR →
        </button>
      )}
    </div>
  );
}

// Step 4: Confirmar
function Step4({
  match,
  type,
  pick,
  odds,
  amount,
  potential,
  onAmountChange,
  onConfirm,
}: {
  match: Match;
  type: BetType;
  pick: string;
  odds: number;
  amount: number;
  potential: string;
  onAmountChange: (a: number) => void;
  onConfirm: () => void;
}) {
  const presets = [10, 25, 50, 100, 200];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
    }}>
      {/* Resumen del partido */}
      <div style={{
        background: 'var(--bg-secondary)',
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-4)',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 'var(--space-3)',
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}>
            <img
              src={getFlagImage(match.h, 22)}
              alt={match.h}
              style={{
                width: 24,
                height: 16,
                borderRadius: 'var(--radius-sm)',
                objectFit: 'cover',
              }}
            />
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)',
            }}>{match.h}</span>
          </div>
          <span style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
            fontWeight: 'var(--font-bold)',
          }}>vs</span>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-2)',
          }}>
            <span style={{
              fontSize: 'var(--text-sm)',
              fontWeight: 'var(--font-bold)',
              color: 'var(--text-primary)',
            }}>{match.a}</span>
            <img
              src={getFlagImage(match.a, 22)}
              alt={match.a}
              style={{
                width: 24,
                height: 16,
                borderRadius: 'var(--radius-sm)',
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--space-2)',
          fontSize: 'var(--text-xs)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 'var(--space-2)',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
          }}>
            <span style={{ color: 'var(--text-tertiary)' }}>Tipo</span>
            <span style={{ color: 'var(--text-primary)', fontWeight: 'var(--font-semibold)' }}>
              {type.icon} {type.label}
            </span>
          </div>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            padding: 'var(--space-2)',
            background: 'var(--bg-tertiary)',
            borderRadius: 'var(--radius-md)',
          }}>
            <span style={{ color: 'var(--text-tertiary)' }}>Cuota</span>
            <span style={{ color: 'var(--color-primary)', fontWeight: 'var(--font-bold)' }}>
              {odds.toFixed(2)}
            </span>
          </div>
        </div>
        
        <div style={{
          marginTop: 'var(--space-3)',
          paddingTop: 'var(--space-3)',
          borderTop: '1px solid var(--border-primary)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <span style={{
            fontSize: 'var(--text-xs)',
            color: 'var(--text-tertiary)',
          }}>Tu predicción</span>
          <span style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-bold)',
            color: 'var(--color-primary)',
          }}>{pick}</span>
        </div>
      </div>

      {/* Cantidad */}
      <div>
        <div style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--text-secondary)',
          marginBottom: 'var(--space-3)',
        }}>Cantidad a apostar</div>
        
        {/* Presets */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-4)',
        }}>
          {presets.map(p => (
            <button
              key={p}
              onClick={() => onAmountChange(p)}
              style={{
                padding: 'var(--space-2)',
                background: amount === p ? 'var(--color-primary)' : 'var(--bg-secondary)',
                border: amount === p ? 'none' : '1px solid var(--border-primary)',
                borderRadius: 'var(--radius-md)',
                fontSize: 'var(--text-xs)',
                fontWeight: 'var(--font-bold)',
                color: amount === p ? 'var(--bg-primary)' : 'var(--text-primary)',
                cursor: 'pointer',
              }}
            >
              €{p}
            </button>
          ))}
        </div>
        
        {/* Slider y display */}
        <div style={{
          background: 'var(--bg-secondary)',
          border: '1px solid var(--border-primary)',
          borderRadius: 'var(--radius-xl)',
          padding: 'var(--space-4)',
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--space-3)',
          }}>
            <span style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
            }}>Tu apuesta</span>
            <span style={{
              fontSize: 'var(--text-2xl)',
              fontWeight: 'var(--font-black)',
              color: 'var(--text-primary)',
            }}>€{amount}</span>
          </div>
          <input
            type="range"
            min="5"
            max="500"
            step="5"
            value={amount}
            onChange={(e) => onAmountChange(parseInt(e.target.value))}
            style={{
              width: '100%',
              height: 6,
              background: 'var(--bg-elevated)',
              borderRadius: 'var(--radius-full)',
              appearance: 'none',
              cursor: 'pointer',
            }}
          />
        </div>
      </div>

      {/* Ganancia potencial */}
      <div style={{
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border-primary)',
        borderRadius: 'var(--radius-xl)',
        padding: 'var(--space-4)',
        textAlign: 'center',
      }}>
        <div style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--text-secondary)',
          marginBottom: 'var(--space-1)',
        }}>Ganancia potencial</div>
        <div style={{
          fontSize: 'var(--text-3xl)',
          fontWeight: 'var(--font-black)',
          color: 'var(--color-primary)',
        }}>€{potential}</div>
        <div style={{
          fontSize: 'var(--text-xs)',
          color: 'var(--text-tertiary)',
          marginTop: '4px',
        }}>Cuota {odds.toFixed(2)} × €{amount}</div>
      </div>

      {/* Confirmar */}
      <button
        onClick={onConfirm}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--space-2)',
          padding: 'var(--space-4)',
          background: 'var(--color-primary)',
          border: 'none',
          borderRadius: 'var(--radius-xl)',
          color: 'var(--bg-primary)',
          fontSize: 'var(--text-sm)',
          fontWeight: 'var(--font-black)',
          cursor: 'pointer',
        }}
      >
        <Zap size={18} />
        CONFIRMAR APUESTA
      </button>
    </div>
  );
}
