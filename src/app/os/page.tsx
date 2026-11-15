import type { Metadata } from 'next';
import { AccountList } from '@/components/os/account-list';
import { CasesPanel } from '@/components/os/cases-panel';
import { ForYou } from '@/components/os/for-you';
import { OsFooter } from '@/components/os/os-footer';
import { WealthCards } from '@/components/os/wealth-cards';
import {
  DEMO_SOURCE,
  demoAccounts,
  demoCases,
  demoClient,
  demoCutoff,
  demoPublications,
  osPlusTools,
} from '@/lib/os/demo-data';
import { formatDate } from '@/lib/os/format';
import { distribution, portfolioSummary, upcomingMaturities } from '@/lib/os/portfolio';

export const metadata: Metadata = {
  title: { absolute: 'Inicio · AFORTU OS · Prototipo' },
};

export default function OsHomePage() {
  const summary = portfolioSummary(demoAccounts);
  const slices = distribution(demoAccounts);
  const maturities = upcomingMaturities(demoAccounts, demoCutoff.current, 3);

  return (
    <>
      <section className="os-hero" aria-labelledby="os-cliente">
        <div className="os-container">
          <div className="os-hero__intro">
            <div>
              <h1 id="os-cliente" className="os-hero__name">
                {demoClient.name}
              </h1>
              <p className="os-hero__meta">
                <span>Cifras en {demoCutoff.currency}</span>
                <span aria-hidden="true">·</span>
                <span>
                  Corte al <time dateTime={demoCutoff.current}>{formatDate(demoCutoff.current)}</time>
                </span>
              </p>
            </div>
            <p className="os-hero__source">Fuente: {DEMO_SOURCE}</p>
          </div>
          <WealthCards summary={summary} slices={slices} maturities={maturities} cutoff={demoCutoff} />
        </div>
      </section>

      <div className="os-sheet">
        <div className="os-container os-sheet__grid">
          <AccountList accounts={demoAccounts} summary={summary} cutoff={demoCutoff} />
          <CasesPanel cases={demoCases} />
        </div>
        <ForYou publications={demoPublications} tools={osPlusTools} />
        <OsFooter />
      </div>
    </>
  );
}
