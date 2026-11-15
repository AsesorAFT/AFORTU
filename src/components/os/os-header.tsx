'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BrandLockup } from './brand-lockup';
import { AccountMenu } from './account-menu';
import { OS_NAV, isNavActive } from './nav-items';
import { PrivacyToggle } from './privacy';

export interface OsClient {
  name: string;
  firstName: string;
  initials: string;
}

export function OsHeader({ client }: { client: OsClient }) {
  const pathname = usePathname();

  return (
    <header className="os-header">
      <div className="os-container os-header__bar">
        <BrandLockup />

        <nav className="os-header__nav" aria-label="Principal">
          <ul>
            {OS_NAV.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="os-nav-link"
                  aria-current={isNavActive(pathname, item.href) ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="os-header__actions">
          <span className="os-demo-pill">
            <span className="os-demo-pill__short" aria-hidden="true">
              Demo
            </span>
            <span className="os-demo-pill__long">Datos de demostración</span>
          </span>
          <PrivacyToggle />
          <AccountMenu client={client} />
        </div>
      </div>
    </header>
  );
}
