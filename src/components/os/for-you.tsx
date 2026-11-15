import Link from 'next/link';
import { ChevronRight, Clock3 } from 'lucide-react';
import type { DemoPublication } from '@/lib/os/demo-data';
import { formatDate } from '@/lib/os/format';

/** Muestra editorial de OS+. Atlas, Intelligence y Análisis aún no tienen integración. */
export function ForYou({
  publications,
  tools,
}: {
  publications: DemoPublication[];
  tools: ReadonlyArray<{ id: string; name: string }>;
}) {
  return (
    <section className="os-editorial" aria-labelledby="os-parati-titulo">
      <div className="os-container">
        <div className="os-section__head">
          <div>
            <p className="os-overline os-editorial__kicker">OS+</p>
            <h2 id="os-parati-titulo" className="os-h2">
              Para ti
            </h2>
          </div>
          <Link href="/os/plus" className="os-link">
            Abrir OS+
            <ChevronRight aria-hidden="true" />
          </Link>
        </div>

        {publications.length === 0 ? (
          <p className="os-empty-text">Aún no hay publicaciones sobre tus temas.</p>
        ) : (
          <ul className="os-pubs">
            {publications.map((publication) => (
              <li key={publication.id} className="os-pub">
                <article>
                  <p className="os-overline os-pub__topic">{publication.topic}</p>
                  <h3 className="os-pub__title">{publication.title}</h3>
                  <p className="os-pub__meta">
                    {publication.source} · <time dateTime={publication.date}>{formatDate(publication.date)}</time>{' '}
                    · {publication.minutes} min de lectura
                  </p>
                </article>
              </li>
            ))}
          </ul>
        )}

        <p className="os-overline os-tools-title">Herramientas de OS+</p>
        <ul className="os-tools">
          {tools.map((tool) => (
            <li key={tool.id} className="os-tool">
              <span className="os-tool__name">{tool.name}</span>
              <span className="os-tool__status">
                <Clock3 aria-hidden="true" />
                Integración pendiente
              </span>
            </li>
          ))}
        </ul>
        <p className="os-note">Publicaciones de demostración.</p>
      </div>
    </section>
  );
}
