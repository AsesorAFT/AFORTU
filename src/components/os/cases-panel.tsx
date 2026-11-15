import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { DemoCase } from '@/lib/os/demo-data';
import { formatDate } from '@/lib/os/format';

function stepState(index: number, stage: number): 'done' | 'current' | 'todo' {
  if (index < stage - 1) return 'done';
  return index === stage - 1 ? 'current' : 'todo';
}

export function CasesPanel({ cases }: { cases: DemoCase[] }) {
  return (
    <section aria-labelledby="os-casos-titulo">
      <div className="os-section__head">
        <h2 id="os-casos-titulo" className="os-h2">
          Servicios en curso
        </h2>
        <Link href="/os/servicios" className="os-link">
          Ver servicios
          <ChevronRight aria-hidden="true" />
        </Link>
      </div>

      {cases.length === 0 ? (
        <p className="os-panel os-empty">No tienes servicios en curso.</p>
      ) : (
        <ul className="os-panel">
          {cases.map((item) => (
            <li key={item.id} className="os-case">
              <p className="os-overline os-case__area">{item.area}</p>
              <h3 className="os-case__title">{item.title}</h3>
              <div className="os-steps" aria-hidden="true">
                {Array.from({ length: item.stages }, (_, i) => (
                  <span key={i} data-state={stepState(i, item.stage)} />
                ))}
              </div>
              <p className="os-case__stage">
                Etapa {item.stage} de {item.stages} · {item.stageName}
              </p>
              <div className="os-case__next">
                <p className="os-overline">Siguiente paso</p>
                <p className="os-case__next-text">{item.nextStep}</p>
                <p className="os-case__due">
                  Fecha objetivo: <time dateTime={item.due}>{formatDate(item.due)}</time>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
