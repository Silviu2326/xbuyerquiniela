import type { CSSProperties } from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface StatProps {
  value: string | number;
  label: string;
  change?: number; // positivo o negativo para mostrar tendencia
  size?: 'sm' | 'md' | 'lg';
  align?: 'left' | 'center' | 'right';
}

export function Stat({ 
  value, 
  label, 
  change,
  size = 'md',
  align = 'left',
}: StatProps) {
  const sizeStyles: Record<string, { value: CSSProperties; label: CSSProperties }> = {
    sm: {
      value: { fontSize: 'var(--text-lg)', fontWeight: 'var(--font-bold)' },
      label: { fontSize: '10px' },
    },
    md: {
      value: { fontSize: 'var(--text-xl)', fontWeight: 'var(--font-black)' },
      label: { fontSize: 'var(--text-xs)' },
    },
    lg: {
      value: { fontSize: 'var(--text-3xl)', fontWeight: 'var(--font-black)' },
      label: { fontSize: 'var(--text-sm)' },
    },
  };
  
  const alignStyles: Record<string, CSSProperties> = {
    left: { textAlign: 'left' },
    center: { textAlign: 'center', alignItems: 'center' },
    right: { textAlign: 'right', alignItems: 'flex-end' },
  };
  
  const changeColor = change === undefined 
    ? '#6a6a80' 
    : change > 0 
      ? '#FFE600' 
      : change < 0 
        ? 'var(--color-error)' 
        : '#6a6a80';
  
  const ChangeIcon = change === undefined 
    ? Minus 
    : change > 0 
      ? TrendingUp 
      : change < 0 
        ? TrendingDown 
        : Minus;
  
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-1)',
        ...alignStyles[align],
      }}
    >
      <div
        style={{
          color: '#ffffff',
          lineHeight: 1,
          ...sizeStyles[size].value,
        }}
      >
        {value}
      </div>
      
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-1)',
          color: '#6a6a80',
          textTransform: 'uppercase',
          letterSpacing: '0.5px',
          ...sizeStyles[size].label,
        }}
      >
        {label}
        {change !== undefined && (
          <span style={{ 
            color: changeColor,
            display: 'inline-flex',
            alignItems: 'center',
            gap: '2px',
          }}>
            <ChangeIcon size={12} />
            {change !== 0 && Math.abs(change)}
          </span>
        )}
      </div>
    </div>
  );
}
