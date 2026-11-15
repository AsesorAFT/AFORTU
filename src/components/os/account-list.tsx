import Link from 'next/link';
import {
  Blocks,
  CalendarClock,
  ChartCandlestick,
  ChartLine,
  ChevronRight,
  Layers,
  type LucideIcon,
} from 'lucide-react';
import { DEMO_LABEL } from '@/lib/os/demo-data';
import { formatDate } from '@/lib/os/format';
import {
  accountChangePct,
  type AccountGroup,
  type DemoAccount,
  type PortfolioSummary,
} from '@/lib/os/portfolio';
import { ContractRef } from './contract-ref';
import { Change, Money } from './privacy';

const GROUP_ICONS: Record<AccountGroup, LucideIcon> = {
  inversiones: ChartLine,
  fondos: Layers,
  acciones: ChartCandlestick,
  'capital-creciente': CalendarClock,
  bitforward: Blocks,
};

export function AccountList({
  accounts,
  summary,
  cutoff,
}: {
  accounts: DemoAccount[];
  summary: PortfolioSummary;
  cutoff: { current: string; previous: string };
}) {
  return (
    <section aria-labelledby="os-cuentas-titulo">
      <div className="os-section__head">
        <h2 id="os-cuentas-titulo" className="os-h2">
          Cuentas y contratos
        </h2>
        <Link href="/os/cuentas" className="os-link">
          Ver cuentas
          <ChevronRight aria-hidden="true" />
        </Link>
      </div>

      <div className="os-panel">
        {accounts.length === 0 ? (
          <p className="os-empty">No hay cuentas activas.</p>
        ) : (
          <>
            <div className="os-acc-cols" aria-hidden="true">
              <span>Cuenta</span>
              <span>Contrato</span>
              <span>Valor</span>
              <span>Var. / Vence</span>
            </div>
            <ul>
              {accounts.map((account) => {
                const Icon = GROUP_ICONS[account.group];
                return (
                  <li key={account.id} className="os-acc">
                    <span className="os-acc__icon" aria-hidden="true">
                      <Icon />
                    </span>
                    <div className="os-acc__main">
                      <span className="os-acc__name">{account.name}</span>
                      <span className="os-acc__sub">
                        {account.kind}
                        <span className="os-acc__sub-contract">
                          {' · '}
                          <ContractRef value={account.contract} />
                        </span>
                      </span>
                    </div>
                    <span className="os-acc__contract os-num">
                      <ContractRef value={account.contract} />
                    </span>
                    <span className="os-acc__value">
                      <Money value={account.value} />
                    </span>
                    <span className="os-acc__extra">
                      {account.fixedTerm ? (
                        <span className="os-num">Vence {formatDate(account.fixedTerm.end)}</span>
                      ) : (
                        <>
                          <span className="sr-only">Variación del mes: </span>
                          <Change pct={accountChangePct(account)} />
                        </>
                      )}
                    </span>
                  </li>
                );
              })}
            </ul>
            <div className="os-acc-total">
              <span>Total · {summary.accountCount} cuentas</span>
              <Money value={summary.total} />
            </div>
          </>
        )}
      </div>
      <p className="os-note">
        Valores al {formatDate(cutoff.current)} · Variación contra el {formatDate(cutoff.previous)} ·{' '}
        {DEMO_LABEL}
      </p>
    </section>
  );
}
