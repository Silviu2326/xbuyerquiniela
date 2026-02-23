import { Star, Shield, Sparkles, RefreshCw, Target } from 'lucide-react';
import { Card } from '../components/ui/Card';

import { useFantasyStore } from '../../application/store/fantasyStore';

interface ChipsPageProps {
  onNavigate?: (view: string) => void;
}

const CHIPS_DATA = [
  {
    id: 'captain',
    icon: Star,
    name: 'Capitán x2',
    description: 'Duplica los puntos de un jugador',
    available: 3,
    total: 3,
    color: '#FFE600',
    bgColor: 'rgba(255, 230, 0, 0.1)',
    used: 0,
  },
  {
    id: 'shield',
    icon: Shield,
    name: 'Escudo',
    description: 'Protege tu puntuación mínima de la jornada',
    available: 2,
    total: 2,
    color: '#FFE600',
    bgColor: 'rgba(255, 230, 0, 0.1)',
    used: 0,
  },
  {
    id: 'golden',
    icon: Sparkles,
    name: 'Estrella Dorada',
    description: 'Triplica puntos de tu mejor jugador',
    available: 1,
    total: 1,
    color: '#FFE600',
    bgColor: 'rgba(255, 230, 0, 0.1)',
    used: 0,
  },
  {
    id: 'bench',
    icon: RefreshCw,
    name: 'Banquillo Boost',
    description: 'Suma puntos del banquillo esta jornada',
    available: 2,
    total: 2,
    color: '#FFE600',
    bgColor: 'rgba(255, 230, 0, 0.1)',
    used: 0,
  },
  {
    id: 'sniper',
    icon: Target,
    name: 'Francotirador',
    description: 'x3 en predicción de marcador exacto',
    available: 1,
    total: 2,
    color: '#FFE600',
    bgColor: 'rgba(255, 230, 0, 0.1)',
    used: 1,
  },
];

export function ChipsPage({ onNavigate: _onNavigate }: ChipsPageProps) {
  useFantasyStore();

  return (
    <div style={{ minHeight: '100vh', background: '#12121a' }}>
      <div style={{ padding: 'var(--space-4)' }}>
        {/* HEADER INFORMATIVO */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'var(--space-6)',
          padding: 'var(--space-6)',
          background: 'linear-gradient(135deg, rgba(255, 230, 0, 0.1) 0%, rgba(255, 230, 0, 0.05) 100%)',
          borderRadius: 'var(--radius-xl)',
          border: '1px solid rgba(255, 230, 0, 0.2)',
        }}>
          <div style={{
            width: 64,
            height: 64,
            borderRadius: '50%',
            background: '#1a1a24',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto var(--space-3)',
            fontSize: '32px',
          }}>
            🎁
          </div>
          <h2 style={{
            fontSize: 'var(--text-xl)',
            fontWeight: 'var(--font-black)',
            color: '#f3f4f6',
            marginBottom: 'var(--space-2)',
          }}>
            Comodines Estratégicos
          </h2>
          <p style={{
            fontSize: 'var(--text-sm)',
            color: '#9ca3af',
            maxWidth: 300,
            margin: '0 auto',
            lineHeight: 1.5,
          }}>
            Usa tus comodines en el momento perfecto para multiplicar tus puntos. Una vez usados, no se recuperan.
          </p>
        </div>

        {/* LISTADO DE COMODINES */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {CHIPS_DATA.map((chip) => {
            const Icon = chip.icon;
            const isAvailable = chip.available > 0;
            
            return (
              <Card
                key={chip.id}
                variant={isAvailable ? 'elevated' : 'default'}
                style={{
                  opacity: isAvailable ? 1 : 0.6,
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-3)',
                }}>
                  {/* ICONO */}
                  <div style={{
                    width: 56,
                    height: 56,
                    borderRadius: 'var(--radius-lg)',
                    background: chip.bgColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: `2px solid ${chip.color}`,
                  }}>
                    <Icon size={28} style={{ color: chip.color }} />
                  </div>

                  {/* INFO */}
                  <div style={{ flex: 1 }}>
                    <h3 style={{
                      fontSize: 'var(--text-md)',
                      fontWeight: 'var(--font-black)',
                      color: '#f3f4f6',
                      marginBottom: '4px',
                    }}>
                      {chip.name}
                    </h3>
                    <p style={{
                      fontSize: 'var(--text-xs)',
                      color: '#9ca3af',
                      marginBottom: 'var(--space-1)',
                    }}>
                      {chip.description}
                    </p>
                    
                    {/* INDICADORES DE USO */}
                    <div style={{
                      display: 'flex',
                      gap: '4px',
                      marginTop: 'var(--space-1)',
                    }}>
                      {Array.from({ length: chip.total }).map((_, i) => (
                        <div
                          key={i}
                          style={{
                            width: 8,
                            height: 8,
                            borderRadius: '50%',
                            background: i < chip.available ? chip.color : '#2a2a3a',
                          }}
                        />
                      ))}
                      <span style={{
                        fontSize: '10px',
                        color: chip.color,
                        fontWeight: 'var(--font-bold)',
                        marginLeft: '4px',
                      }}>
                        {chip.available}/{chip.total} disponibles
                      </span>
                    </div>
                  </div>

                  {/* BOTÓN USAR */}
                  <button
                    disabled={!isAvailable}
                    style={{
                      padding: 'var(--space-2) var(--space-4)',
                      background: isAvailable ? chip.color : '#1a1a24',
                      border: 'none',
                      borderRadius: 'var(--radius-lg)',
                      color: isAvailable ? '#12121a' : '#6b7280',
                      fontSize: 'var(--text-xs)',
                      fontWeight: 'var(--font-black)',
                      cursor: isAvailable ? 'pointer' : 'not-allowed',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px',
                    }}
                  >
                    {isAvailable ? 'Usar' : 'Agotado'}
                  </button>
                </div>
              </Card>
            );
          })}
        </div>

        {/* INFO ADICIONAL */}
        <div style={{
          marginTop: 'var(--space-6)',
          padding: 'var(--space-4)',
          background: '#1a1a24',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid #2a2a3a',
        }}>
          <h4 style={{
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-bold)',
            color: '#f3f4f6',
            marginBottom: 'var(--space-2)',
          }}>
            💡 Consejos
          </h4>
          <ul style={{
            fontSize: 'var(--text-xs)',
            color: '#9ca3af',
            paddingLeft: 'var(--space-4)',
            lineHeight: 1.8,
          }}>
            <li>Los comodines no se pueden usar en la misma jornada</li>
            <li>Planifica bien el momento de usar cada comodín</li>
            <li>El Capitán x2 es ideal para jugadores con partidos favorables</li>
            <li>El Escudo protege de malas jornadas</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
