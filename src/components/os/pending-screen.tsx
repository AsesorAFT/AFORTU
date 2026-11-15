import Link from 'next/link';

/** Destino provisional para las secciones que aún no se diseñan. */
export function PendingScreen({ title }: { title: string }) {
  return (
    <div className="os-container os-state">
      <p className="os-overline os-state__kicker">Prototipo AFORTU OS</p>
      <h1 className="os-state__title">{title}</h1>
      <p className="os-state__text">Esta pantalla se diseñará en una siguiente entrega.</p>
      <Link href="/os" className="os-btn os-btn--primary">
        Volver a Inicio
      </Link>
    </div>
  );
}
