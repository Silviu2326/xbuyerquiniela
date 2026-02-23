import type { ReactNode, ButtonHTMLAttributes, CSSProperties } from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  fullWidth?: boolean;
}

export function Button({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon,
  rightIcon,
  fullWidth = false,
  disabled,
  style,
  ...props
}: ButtonProps) {
  const baseStyles: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--space-2)',
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--font-semibold)',
    border: 'none',
    borderRadius: 'var(--radius-md)',
    cursor: disabled || isLoading ? 'not-allowed' : 'pointer',
    transition: 'all var(--transition-fast)',
    whiteSpace: 'nowrap',
    width: fullWidth ? '100%' : 'auto',
    opacity: disabled || isLoading ? 0.5 : 1,
  };
  
  const sizeStyles: Record<string, CSSProperties> = {
    sm: {
      padding: 'var(--space-2) var(--space-3)',
      fontSize: 'var(--text-xs)',
      height: '32px',
    },
    md: {
      padding: 'var(--space-3) var(--space-4)',
      fontSize: 'var(--text-sm)',
      height: '40px',
    },
    lg: {
      padding: 'var(--space-4) var(--space-6)',
      fontSize: 'var(--text-md)',
      height: '48px',
    },
  };
  
  const variantStyles: Record<string, CSSProperties> = {
    primary: {
      background: '#FFE600',
      color: '#12121a',
    },
    secondary: {
      background: '#1a1a24',
      color: '#ffffff',
      border: '1px solid #2a2a3a',
    },
    ghost: {
      background: 'transparent',
      color: '#ffffff',
    },
    danger: {
      background: 'var(--color-error)',
      color: 'white',
    },
  };
  
  // Hover/active states via CSS
  const hoverStyles: CSSProperties = {
    ':hover': {
      opacity: disabled || isLoading ? 0.5 : 0.9,
    } as any,
  };
  
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      disabled={disabled || isLoading}
      style={{
        ...baseStyles,
        ...sizeStyles[size],
        ...variantStyles[variant],
        ...style,
      }}
      onMouseEnter={(e) => {
        if (!disabled && !isLoading) {
          e.currentTarget.style.opacity = '0.85';
          if (variant === 'primary') {
            e.currentTarget.style.boxShadow = '0 0 15px rgba(255, 230, 0, 0.4)';
          }
        }
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = disabled || isLoading ? '0.5' : '1';
        e.currentTarget.style.boxShadow = 'none';
      }}
      onMouseDown={(e) => {
        if (!disabled && !isLoading) {
          e.currentTarget.style.transform = 'scale(0.98)';
        }
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'scale(1)';
      }}
      {...props}
    >
      {isLoading && <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />}
      {!isLoading && leftIcon}
      {children}
      {!isLoading && rightIcon}
    </button>
  );
}
