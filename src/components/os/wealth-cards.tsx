'use client';

import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from 'react';
import { formatDate } from '@/lib/os/format';
import type { DistributionSlice, Maturity, PortfolioSummary } from '@/lib/os/portfolio';
import { ContractRef } from './contract-ref';
import { Change, Money, Percent, PrivacyToggle, usePrivacy } from './privacy';

interface Cutoff {
  current: string;
  previous: string;
  currency: string;
}

const CARD_TITLES = ['Patrimonio total', 'Distribución', 'Vencimientos'];

function sheenDelay(index: number): CSSProperties {
  return { '--os-sheen-delay': `${index * 1.2}s` } as CSSProperties;
}

/** Brillo que sigue al ratón; en táctil no se aplica. */
function followPointer(event: PointerEvent<HTMLElement>) {
  if (event.pointerType !== 'mouse') return;
  const card = event.currentTarget;
  const rect = card.getBoundingClientRect();
  card.style.setProperty('--os-px', `${event.clientX - rect.left}px`);
  card.style.setProperty('--os-py', `${event.clientY - rect.top}px`);
}

export function WealthCards({
  summary,
  slices,
  maturities,
  cutoff,
}: {
  summary: PortfolioSummary;
  slices: DistributionSlice[];
  maturities: Maturity[];
  cutoff: Cutoff;
}) {
  const { hidden } = usePrivacy();
  const trackRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef(0);
  const [active, setActive] = useState(0);
  const [isCarousel, setIsCarousel] = useState(true);

  useEffect(() => {
    const desktop = window.matchMedia('(min-width: 1024px)');
    const update = () => setIsCarousel(!desktop.matches);
    update();
    desktop.addEventListener('change', update);
    return () => {
      desktop.removeEventListener('change', update);
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  const cardOffsets = (): number[] => {
    const track = trackRef.current;
    if (!track) return [];
    const cards = Array.from(track.children) as HTMLElement[];
    const first = cards[0]?.offsetLeft ?? 0;
    return cards.map((card) => card.offsetLeft - first);
  };

  const handleScroll = () => {
    cancelAnimationFrame(frameRef.current);
    frameRef.current = requestAnimationFrame(() => {
      const track = trackRef.current;
      if (!track) return;
      const offsets = cardOffsets();
      const x = track.scrollLeft;
      const atEnd = x >= track.scrollWidth - track.clientWidth - 2;
      let index = 0;
      if (atEnd) {
        index = offsets.length - 1;
      } else {
        let best = Number.POSITIVE_INFINITY;
        offsets.forEach((offset, i) => {
          const distance = Math.abs(offset - x);
          if (distance < best) {
            best = distance;
            index = i;
          }
        });
      }
      setActive(index);
    });
  };

  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    track.scrollTo({ left: cardOffsets()[index] ?? 0, behavior: reduce ? 'auto' : 'smooth' });
    setActive(index);
  };

  const cutoffLabel = `Corte al ${formatDate(cutoff.current)}`;

  return (
    <div className="os-wealth">
      <div
        ref={trackRef}
        className="os-wealth__track"
        role="group"
        aria-label="Resumen patrimonial"
        aria-roledescription={isCarousel ? 'carrusel' : undefined}
        tabIndex={isCarousel ? 0 : undefined}
        onScroll={handleScroll}
      >
        <article
          className="os-gold"
          aria-labelledby="os-card-patrimonio"
          style={sheenDelay(0)}
          onPointerMove={followPointer}
        >
          <div className="os-gold__head">
            <h2 id="os-card-patrimonio" className="os-gold__title">
              Patrimonio total
            </h2>
            <PrivacyToggle variant="gold" />
          </div>
          <div className="os-gold__body">
            <p className="os-gold__amount">
              <Money value={summary.total} split />
              <span className="os-gold__ccy">{cutoff.currency}</span>
            </p>
            <p className="os-gold__delta">
              <Change amount={summary.change} pct={summary.changePct} />
              <span>vs. {formatDate(cutoff.previous)}</span>
            </p>
          </div>
          <div className="os-gold__foot">
            <span>{cutoffLabel}</span>
            <span>{summary.accountCount} cuentas</span>
          </div>
        </article>

        <article
          className="os-gold"
          aria-labelledby="os-card-distribucion"
          style={sheenDelay(1)}
          onPointerMove={followPointer}
        >
          <div className="os-gold__head">
            <h2 id="os-card-distribucion" className="os-gold__title">
              Distribución
            </h2>
            <span className="os-gold__tag">Por tipo de cuenta</span>
          </div>
          <div className="os-gold__body">
            <div className="os-dist-bar" data-hidden={hidden ? 'true' : undefined} aria-hidden="true">
              {!hidden &&
                slices.map((slice, i) => (
                  <span key={slice.group} className={`os-tone-${i}`} style={{ flex: `${slice.percent} 1 0` }} />
                ))}
            </div>
            <ul className="os-dist-legend">
              {slices.map((slice, i) => (
                <li key={slice.group}>
                  <span className={`os-swatch os-tone-${i}`} aria-hidden="true" />
                  <span>{slice.label}</span>
                  <Percent value={slice.percent} />
                </li>
              ))}
            </ul>
          </div>
          <div className="os-gold__foot">
            <span>{cutoffLabel}</span>
            <span>% del patrimonio</span>
          </div>
        </article>

        <article
          className="os-gold"
          aria-labelledby="os-card-vencimientos"
          style={sheenDelay(2)}
          onPointerMove={followPointer}
        >
          <div className="os-gold__head">
            <h2 id="os-card-vencimientos" className="os-gold__title">
              Vencimientos
            </h2>
            <span className="os-gold__tag">Próximos</span>
          </div>
          <div className="os-gold__body">
            {maturities.length === 0 ? (
              <p className="os-gold__empty">No hay vencimientos posteriores al corte.</p>
            ) : (
              <ol className="os-mat">
                {maturities.map((maturity) => (
                  <li key={maturity.accountId}>
                    <time className="os-mat__date os-num" dateTime={maturity.date}>
                      {formatDate(maturity.date)}
                    </time>
                    <span className="os-mat__amount">
                      <Money value={maturity.principal} />
                    </span>
                    <span className="os-mat__name">
                      Plazo {maturity.termDays} días · <ContractRef value={maturity.contract} />
                    </span>
                    <span className="os-mat__label">Capital</span>
                  </li>
                ))}
              </ol>
            )}
          </div>
          <div className="os-gold__foot">
            <span>{cutoffLabel}</span>
            <span>Capital creciente</span>
          </div>
        </article>
      </div>

      <div className="os-wealth__dots">
        {CARD_TITLES.map((title, i) => (
          <button
            key={title}
            type="button"
            className="os-dot"
            aria-label={`${title}, tarjeta ${i + 1} de ${CARD_TITLES.length}`}
            aria-current={active === i ? 'true' : undefined}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </div>
  );
}
