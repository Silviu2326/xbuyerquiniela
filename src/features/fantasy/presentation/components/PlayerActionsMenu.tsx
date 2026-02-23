import { Crown, ArrowDown, X, ArrowUp, Shield } from 'lucide-react';

interface Player {
  id: string;
  name: string;
  initials: string;
  isCaptain?: boolean;
  isViceCaptain?: boolean;
  isStarter?: boolean;
}

interface PlayerActionsMenuProps {
  player: Player | null;
  isOpen: boolean;
  onClose: () => void;
  onMakeCaptain?: (playerId: string) => void;
  onMakeViceCaptain?: (playerId: string) => void;
  onSendToBench?: (playerId: string) => void;
  onSendToField?: (playerId: string) => void;
  onRemoveFromTeam?: (playerId: string) => void;
}

export function PlayerActionsMenu({
  player,
  isOpen,
  onClose,
  onMakeCaptain,
  onMakeViceCaptain,
  onSendToBench,
  onSendToField,
  onRemoveFromTeam,
}: PlayerActionsMenuProps) {
  if (!isOpen || !player) return null;

  const menuItems = [
    {
      id: 'captain',
      icon: Crown,
      label: player.isCaptain ? 'Quitar Capitanía' : 'Hacer Capitán',
      color: '#FFD700',
      onClick: () => {
        onMakeCaptain?.(player.id);
        onClose();
      },
    },
    {
      id: 'vice',
      icon: Shield,
      label: player.isViceCaptain ? 'Quitar Vicecapitán' : 'Hacer Vicecapitán',
      color: '#C0C0C0',
      onClick: () => {
        onMakeViceCaptain?.(player.id);
        onClose();
      },
    },
    player.isStarter
      ? {
          id: 'bench',
          icon: ArrowDown,
          label: 'Enviar al Banquillo',
          color: '#FFE600',
          onClick: () => {
            onSendToBench?.(player.id);
            onClose();
          },
        }
      : {
          id: 'field',
          icon: ArrowUp,
          label: 'Poner de Titular',
          color: '#FFE600',
          onClick: () => {
            onSendToField?.(player.id);
            onClose();
          },
        },
    {
      id: 'remove',
      icon: X,
      label: 'Quitar de la Formación',
      color: '#EF4444',
      onClick: () => {
        onRemoveFromTeam?.(player.id);
        onClose();
      },
    },
  ];

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        backdropFilter: 'blur(2px)',
        zIndex: 150,
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 400,
          background: 'var(--bg-secondary)',
          borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0',
          padding: 'var(--space-4)',
          animation: 'slideUp 0.2s ease-out',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* HEADER CON INFO DEL JUGADOR */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-3)',
            paddingBottom: 'var(--space-4)',
            borderBottom: '1px solid var(--border-primary)',
            marginBottom: 'var(--space-4)',
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, var(--color-primary) 0%, var(--color-primary-dark, var(--color-primary)) 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 'var(--text-lg)',
              fontWeight: 'var(--font-black)',
              color: '#fff',
            }}
          >
            {player.initials}
          </div>
          <div>
            <h3
              style={{
                fontSize: 'var(--text-lg)',
                fontWeight: 'var(--font-black)',
                color: 'var(--text-primary)',
              }}
            >
              {player.name}
            </h3>
            <p
              style={{
                fontSize: 'var(--text-xs)',
                color: 'var(--text-tertiary)',
              }}
            >
              {player.isStarter ? 'Titular' : 'Banquillo'}
              {player.isCaptain && ' • Capitán'}
              {player.isViceCaptain && ' • Vicecapitán'}
            </p>
          </div>
        </div>

        {/* OPCIONES DEL MENÚ */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={item.onClick}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--space-3)',
                  padding: 'var(--space-4)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-primary)',
                  borderRadius: 'var(--radius-lg)',
                  cursor: 'pointer',
                  textAlign: 'left',
                  width: '100%',
                }}
              >
                <div
                  style={{
                    width: 40,
                    height: 40,
                    borderRadius: '50%',
                    background: `${item.color}20`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Icon size={20} style={{ color: item.color }} />
                </div>
                <span
                  style={{
                    fontSize: 'var(--text-sm)',
                    fontWeight: 'var(--font-bold)',
                    color: 'var(--text-primary)',
                  }}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* BOTÓN CANCELAR */}
        <button
          onClick={onClose}
          style={{
            width: '100%',
            padding: 'var(--space-4)',
            marginTop: 'var(--space-4)',
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            fontSize: 'var(--text-sm)',
            fontWeight: 'var(--font-bold)',
            cursor: 'pointer',
          }}
        >
          Cancelar
        </button>
      </div>

      <style>{`
        @keyframes slideUp {
          from {
            transform: translateY(100%);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
