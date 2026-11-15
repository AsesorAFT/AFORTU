export default function OsLoading() {
  return (
    <div role="status" aria-live="polite">
      <span className="sr-only">Cargando…</span>
      <div className="os-hero" aria-hidden="true">
        <div className="os-container">
          <div className="os-skel os-skel--name" />
          <div className="os-skel os-skel--meta" />
          <div className="os-skel-cards">
            <div className="os-skel os-skel--card" />
            <div className="os-skel os-skel--card" />
            <div className="os-skel os-skel--card" />
          </div>
        </div>
      </div>
      <div className="os-sheet" aria-hidden="true">
        <div className="os-container">
          <div className="os-skel os-skel--meta" />
          <div className="os-skel os-skel--row" />
          <div className="os-skel os-skel--row" />
          <div className="os-skel os-skel--row" />
        </div>
      </div>
    </div>
  );
}
