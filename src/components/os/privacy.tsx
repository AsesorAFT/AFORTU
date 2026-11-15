'use client';

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { ArrowDownRight, ArrowUpRight, Eye, EyeOff, Minus } from 'lucide-react';
import { formatMoney, formatPercent, moneyParts } from '@/lib/os/format';
import { PRIVACY_COOKIE, PRIVACY_COOKIE_MAX_AGE } from '@/lib/os/privacy';

interface PrivacyContextValue {
  hidden: boolean;
  toggle: () => void;
}

const PrivacyContext = createContext<PrivacyContextValue | null>(null);

export function PrivacyProvider({
  initialHidden,
  children,
}: {
  initialHidden: boolean;
  children: ReactNode;
}) {
  const [hidden, setHidden] = useState(initialHidden);
  const [announcement, setAnnouncement] = useState('');

  const toggle = useCallback(() => {
    const next = !hidden;
    setHidden(next);
    setAnnouncement(next ? 'Saldos ocultos' : 'Saldos visibles');
    document.cookie = `${PRIVACY_COOKIE}=${next ? '1' : '0'}; path=/os; max-age=${PRIVACY_COOKIE_MAX_AGE}; samesite=lax`;
  }, [hidden]);

  const value = useMemo(() => ({ hidden, toggle }), [hidden, toggle]);

  return (
    <PrivacyContext.Provider value={value}>
      {children}
      <p className="sr-only" aria-live="polite">
        {announcement}
      </p>
    </PrivacyContext.Provider>
  );
}

export function usePrivacy(): PrivacyContextValue {
  const context = useContext(PrivacyContext);
  if (!context) throw new Error('usePrivacy debe usarse dentro de PrivacyProvider');
  return context;
}

export function PrivacyToggle({ variant = 'header' }: { variant?: 'header' | 'gold' }) {
  const { hidden, toggle } = usePrivacy();
  const Icon = hidden ? EyeOff : Eye;
  return (
    <button
      type="button"
      className={variant === 'gold' ? 'os-icon-btn os-icon-btn--gold' : 'os-icon-btn'}
      aria-pressed={hidden}
      aria-label="Ocultar saldos"
      onClick={toggle}
    >
      <Icon aria-hidden="true" />
    </button>
  );
}

export function Masked({ label = 'Importe oculto', short = false }: { label?: string; short?: boolean }) {
  return (
    <span className="os-masked">
      <span aria-hidden="true">{short ? '•••' : '••••••'}</span>
      <span className="sr-only">{label}</span>
    </span>
  );
}

/** Importe en MXN. Con `split`, los decimales se muestran en menor tamaño. */
export function Money({
  value,
  signed = false,
  split = false,
  className,
}: {
  value: number;
  signed?: boolean;
  split?: boolean;
  className?: string;
}) {
  const { hidden } = usePrivacy();
  const classes = className ? `os-money os-num ${className}` : 'os-money os-num';
  if (hidden) {
    return (
      <span className={classes}>
        <Masked />
      </span>
    );
  }
  if (!split) return <span className={classes}>{formatMoney(value, signed)}</span>;

  const { sign, integer, decimals } = moneyParts(value, signed);
  return (
    <span className={classes}>
      <span aria-hidden="true">
        {sign}
        {integer}
        <span className="os-money__dec">{decimals}</span>
      </span>
      <span className="sr-only">{formatMoney(value, signed)}</span>
    </span>
  );
}

export function Percent({ value, decimals = 1 }: { value: number; decimals?: number }) {
  const { hidden } = usePrivacy();
  if (hidden) return <Masked label="Porcentaje oculto" short />;
  return <span className="os-num">{formatPercent(value, { decimals })}</span>;
}

/** Variación con dirección; verde y rojo solo para el signo del movimiento. */
export function Change({ amount, pct }: { amount?: number; pct: number }) {
  const { hidden } = usePrivacy();
  if (hidden) {
    return (
      <span className="os-change" data-dir="hidden">
        <Masked label="Variación oculta" />
      </span>
    );
  }
  const rounded = Number(pct.toFixed(2));
  const dir = rounded > 0 ? 'up' : rounded < 0 ? 'down' : 'flat';
  const Icon = dir === 'up' ? ArrowUpRight : dir === 'down' ? ArrowDownRight : Minus;
  return (
    <span className="os-change os-num" data-dir={dir}>
      <Icon aria-hidden="true" />
      {amount !== undefined && (
        <>
          {formatMoney(amount, true)}
          <span className="os-change__sep" aria-hidden="true">
            ·
          </span>
        </>
      )}
      {formatPercent(pct, { signed: true })}
    </span>
  );
}
