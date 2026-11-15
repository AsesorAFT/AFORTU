'use client';

import { RotateCcw } from 'lucide-react';

export default function OsError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <div className="os-container os-state" role="alert">
      <p className="os-overline os-state__kicker">AFORTU OS</p>
      <h1 className="os-state__title">No pudimos cargar esta vista</h1>
      <p className="os-state__text">Vuelve a intentarlo. Si el problema continúa, contacta a tu asesor.</p>
      <button type="button" className="os-btn os-btn--primary" onClick={reset}>
        <RotateCcw aria-hidden="true" />
        Reintentar
      </button>
    </div>
  );
}
