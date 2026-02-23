import type { ReactNode, CSSProperties } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'elevated' | 'interactive';
  onClick?: () => void;
  style?: CSSProperties;
}

export function Card({ children, className = '', variant = 'default', onClick, style }: CardProps) {
  const baseStyles: CSSProperties = {
    background: '#1a1a24',
    borderRadius: 'var(--radius-lg)',
    border: '1px solid #2a2a3a',
    overflow: 'hidden',
    transition: 'all var(--transition-fast)',
  };
  
  const variants: Record<string, CSSProperties> = {
    default: {},
    elevated: {
      background: '#12121a',
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.4)',
    },
    interactive: {
      cursor: 'pointer',
    },
  };
  
  return (
    <div
      className={`card card-${variant} ${className}`}
      style={{ 
        ...baseStyles, 
        ...variants[variant], 
        ...style 
      }}
      onClick={onClick}
      onMouseEnter={(e) => {
        if (variant === 'interactive') {
          e.currentTarget.style.borderColor = '#FFE600';
          e.currentTarget.style.boxShadow = '0 0 20px rgba(255, 230, 0, 0.15)';
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#2a2a3a';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      {children}
    </div>
  );
}

// Sub-componentes para estructura consistente

Card.Header = function CardHeader({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <div 
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-4)',
        borderBottom: '1px solid #2a2a3a',
      }}
    >
      {children}
    </div>
  );
};

Card.Body = function CardBody({ 
  children, 
  className = '',
  padding = 'normal',
}: { 
  children: ReactNode; 
  className?: string;
  padding?: 'none' | 'normal' | 'large';
}) {
  const paddingMap = {
    none: 0,
    normal: 'var(--space-4)',
    large: 'var(--space-6)',
  };
  
  return (
    <div 
      className={className}
      style={{ padding: paddingMap[padding] }}
    >
      {children}
    </div>
  );
};

Card.Footer = function CardFooter({ 
  children, 
  className = '' 
}: { 
  children: ReactNode; 
  className?: string;
}) {
  return (
    <div 
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--space-3) var(--space-4)',
        borderTop: '1px solid #2a2a3a',
        background: '#12121a',
      }}
    >
      {children}
    </div>
  );
};
