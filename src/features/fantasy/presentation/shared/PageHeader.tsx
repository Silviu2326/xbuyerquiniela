import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  rightElement?: React.ReactNode;
}

export function PageHeader({ title, subtitle, onBack, rightElement }: PageHeaderProps) {
  return (
    <div style={{
      background: 'var(--bg-secondary)',
      borderBottom: '1px solid var(--border-primary)',
      padding: 'var(--space-4)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
    }}>
      <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Botón atrás */}
        <button
          onClick={onBack}
          style={{
            background: 'transparent',
            border: 'none',
            color: 'var(--text-secondary)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 40,
            height: 40,
            padding: 0,
          }}
        >
          <ArrowLeft size={24} />
        </button>
        
        {/* Título centrado */}
        <div style={{
          textAlign: 'center',
          flex: 1,
        }}>
          <h1 style={{
            fontSize: 'var(--text-lg)',
            fontWeight: 'var(--font-black)',
            color: 'var(--text-primary)',
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{
              fontSize: 'var(--text-xs)',
              color: 'var(--text-tertiary)',
              marginTop: '2px',
            }}>
              {subtitle}
            </p>
          )}
        </div>
        
        {/* Elemento derecho o spacer */}
        <div style={{ width: 40, display: 'flex', justifyContent: 'flex-end' }}>
          {rightElement}
        </div>
      </div>
    </div>
  );
}
