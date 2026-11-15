import Link from 'next/link';

/**
 * Símbolo oficial de AFORTU (recorte sin alterar de logo-afortu-oficial.png)
 * dentro de un medallón cromado, más el nombre AFORTU OS.
 */
export function BrandLockup() {
  return (
    <Link href="/os" className="os-lockup" aria-label="AFORTU OS, Inicio">
      <span className="os-medallion" aria-hidden="true">
        <img src="/os/brand/afortu-emblema-oficial.png" alt="" width={242} height={242} decoding="async" />
      </span>
      <span className="os-wordmark-group" aria-hidden="true">
        <span className="os-wordmark">AFORTU</span>
        <span className="os-plate">OS</span>
      </span>
    </Link>
  );
}
