'use client';

import {
  Briefcase, LogOut, TrendingUp, FileText, PieChart, BarChart2, Bell, ChevronRight, User, Phone, Mail
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import Link from 'next/link';

// Simulated data (replace with real API data)
const asesor = {
  nombre: "María González",
  mail: "maria.gonzalez@afortu.com.mx",
  whatsapp: "+52 55 1234 5678"
};

const productos = [
  {
    nombre: "Tasa Fija AFORTU",
    saldo: 150000,
    moneda: "MXN",
    tasa: 15,
    plazo: "24 meses",
    vencimiento: "2026-08-01",
    reinversion: true,
    beneficios: [
      "Servicios profesionales AFORTU",
      "Acceso a App móvil",
      "Salesforce para negocios"
    ]
  },
  {
    nombre: "Asset Management AFORTU",
    saldo: 90000,
    moneda: "MXN",
    rendimiento: 13.2,
    diversificacion: [
      { tipo: "Acciones", porcentaje: 35 },
      { tipo: "Deuda privada", porcentaje: 30 },
      { tipo: "Deuda pública", porcentaje: 20 },
      { tipo: "Liquidez", porcentaje: 15 }
    ]
  }
];

const servicios = [
  {
    categoria: "Jurídico",
    servicios: ["Consultoría patrimonial", "Protección legal", "Contratos especiales"]
  },
  {
    categoria: "Contable/Fiscal",
    servicios: ["Planeación fiscal", "Cumplimiento", "Auditoría"]
  },
  {
    categoria: "Financiero",
    servicios: ["Estrategia integral", "Evaluación de oportunidades", "Family office"]
  }
];

const movimientos = [
  { fecha: "02/08/2025", tipo: "Depósito Tasa Fija", monto: 50000, detalle: "Aporte extraordinario" },
  { fecha: "29/07/2025", tipo: "Rebalanceo Asset Management", monto: 20000, detalle: "Compra deuda privada" },
  { fecha: "15/07/2025", tipo: "Pago intereses Tasa Fija", monto: 1875, detalle: "Mensualidad" }
];

const noticias = [
  "El mercado bursátil mexicano cierra al alza, +2.5% semanal.",
  "AFORTU incorpora nuevas herramientas de planeación patrimonial en su app.",
  "Reformas fiscales 2025: implicaciones para personas físicas de alto patrimonio."
];

export default function DashboardPage() {
  // Suma total
  const totalMXN = productos.reduce((sum, p) => sum + p.saldo, 0);
  const totalUSD = 0; // Si tuvieras saldo en USD lo sumas aquí.
  const total = totalMXN + totalUSD * 17;

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0d193c] via-[#185adb] to-[#ffd600]/80 flex flex-col items-center py-10 px-2">
      {/* Branding */}
      <div className="flex items-center gap-4 mb-6">
        <Briefcase className="h-10 w-10 text-[#ffd600]" />
        <span className="font-extrabold text-3xl text-white tracking-tight">AFORTU</span>
      </div>

      {/* Bienvenida */}
      <Card className="w-full max-w-5xl bg-white/95 shadow-2xl border-0 mb-8">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#0d193c] flex gap-2 items-center">
            <User className="h-6 w-6 text-[#185adb]" />
            ¡Bienvenido!
          </CardTitle>
          <CardDescription className="text-[#185adb]/90 mt-2">
            Tu panel de control patrimonial premium. <span className="font-bold text-[#ffd600]">Respaldo, crecimiento y asesoría personalizada.</span>
          </CardDescription>
        </CardHeader>
        <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-[#185adb]/10 rounded-xl p-4 text-center">
            <div className="text-lg font-semibold text-[#0d193c] flex items-center gap-2 justify-center">
              <PieChart className="h-5 w-5 text-[#185adb]" /> Inversión Total
            </div>
            <div className="text-3xl font-extrabold text-[#185adb] my-1">${total.toLocaleString()} <span className="text-base font-medium text-[#0d193c]/80">MXN eq</span></div>
            <div className="flex gap-3 justify-center text-xs mt-1 text-[#0d193c]/80">
              <span>MXN: ${totalMXN.toLocaleString()}</span>
              <span>USD: ${totalUSD.toLocaleString()}</span>
            </div>
          </div>
          <div className="bg-[#ffd600]/20 rounded-xl p-4 text-center">
            <div className="text-lg font-semibold text-[#b28b00] flex items-center gap-2 justify-center">
              <BarChart2 className="h-5 w-5 text-[#ffd600]" /> Tasa Fija
            </div>
            <div className="text-xl font-bold text-[#185adb] mt-1">
              ${productos[0].saldo.toLocaleString()} <span className="text-xs text-[#185adb]">MXN</span>
            </div>
            <div className="text-xs text-[#0d193c]/70 mt-1">Plazo: {productos[0].plazo} | Tasa: {productos[0].tasa}%</div>
          </div>
          <div className="bg-[#0d193c]/10 rounded-xl p-4 text-center">
            <div className="text-lg font-semibold text-[#185adb] flex items-center gap-2 justify-center">
              <Layers className="h-5 w-5 text-[#0d193c]" /> Asset Management
            </div>
            <div className="text-xl font-bold text-[#0d193c] mt-1">
              ${productos[1].saldo.toLocaleString()} <span className="text-xs text-[#185adb]">MXN</span>
            </div>
            <div className="text-xs text-[#0d193c]/70 mt-1">Rendimiento: {productos[1].rendimiento}%</div>
          </div>
        </CardContent>
      </Card>
      
      {/* Productos de inversión */}
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-4 mb-8">
        {/* Tasa Fija */}
        <Card className="bg-white/95 border border-[#185adb]/10 shadow">
          <CardHeader>
            <CardTitle className="text-lg text-[#185adb] font-bold flex items-center gap-2">
              <BarChart2 className="h-5 w-5" /> Tasa Fija AFORTU
            </CardTitle>
            <CardDescription className="text-xs text-[#0d193c]/80">{productos[0].beneficios.join(" · ")}</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-[#185adb] mb-1">Saldo: ${productos[0].saldo.toLocaleString()} MXN</div>
            <ul className="list-disc pl-4 text-xs text-[#0d193c]/80 mb-2">
              <li>Plazo: {productos[0].plazo} &mdash; Vencimiento: {productos[0].vencimiento}</li>
              <li>Tasa anual: {productos[0].tasa}%</li>
              <li>Opción de reinversión con interés compuesto</li>
            </ul>
            {/* Simulated growth chart */}
            <div className="my-2">
              <div className="text-xs text-[#185adb] mb-1">Crecimiento estimado 24 meses</div>
              <div className="w-full h-20 bg-gradient-to-r from-[#ffd600] via-[#185adb]/40 to-[#185adb]/90 rounded overflow-hidden flex items-end gap-0.5">
                {[10, 20, 30, 45, 65, 90, 120, 150, 185, 225, 270, 320, 375, 435, 500, 570, 650, 735, 820, 910, 1000, 1100, 1220, 1350].map((v, i) => (
                  <div key={i} style={{height: `${v/15}%`}} className="w-1 bg-[#185adb] rounded"></div>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Button asChild size="sm" className="bg-[#185adb] hover:bg-[#0d193c] text-white font-bold">
                <Link href="/dashboard/portafolio/tasafija">
                  Ver detalle <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="sm" className="bg-[#ffd600] hover:bg-[#fff176] text-[#0d193c] font-bold">
                <Link href="/dashboard/inversiones/nueva?tasa=fija">
                  Nueva inversión
                </Link>
              </Button>
              <Button asChild size="sm" className="bg-[#b71c1c] hover:bg-[#c62828] text-white font-bold">
                <Link href="/dashboard/portafolio/cerrar?tasa=fija">
                  Cerrar cuenta
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
        {/* Asset Management */}
        <Card className="bg-white/95 border border-[#185adb]/10 shadow">
          <CardHeader>
            <CardTitle className="text-lg text-[#0d193c] font-bold flex items-center gap-2">
              <Layers className="h-5 w-5 text-[#185adb]" /> Asset Management AFORTU
            </CardTitle>
            <CardDescription className="text-xs text-[#185adb]/80">Gestión profesional de portafolios, enfoque global y diversificación avanzada.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-lg font-bold text-[#0d193c] mb-1">Saldo: ${productos[1].saldo.toLocaleString()} MXN</div>
            <div className="flex items-center gap-3 mb-2">
              <div className="flex flex-col items-center">
                <PieChart className="h-8 w-8 text-[#185adb]" />
                <span className="text-[10px] text-[#0d193c]/70">Diversificación</span>
              </div>
              <ul className="text-xs text-[#0d193c]/80">
                {productos[1].diversificacion.map((d, i) =>
                  <li key={i}>{d.tipo}: <span className="font-semibold">{d.porcentaje}%</span></li>
                )}
              </ul>
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Button asChild size="sm" className="bg-[#0d193c] hover:bg-[#185adb] text-white font-bold">
                <Link href="/dashboard/portafolio/asset">
                  Ver detalle <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="sm" className="bg-[#ffd600] hover:bg-[#fff176] text-[#0d193c] font-bold">
                <Link href="/dashboard/inversiones/nueva?tipo=asset">
                  Nueva inversión
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Servicios Profesionales */}
      <Card className="w-full max-w-5xl bg-white/95 shadow-xl border-0 mb-8">
        <CardHeader>
          <CardTitle className="text-lg font-bold text-[#185adb] flex items-center gap-2">
            <FileText className="h-5 w-5 text-[#ffd600]" /> Servicios Profesionales Complementarios
          </CardTitle>
        </CardHeader>
        <CardContent className="grid md:grid-cols-3 gap-4">
          {servicios.map((cat, idx) => (
            <div key={cat.categoria} className="border-l-4 border-[#ffd600] pl-3">
              <div className="font-bold text-[#0d193c] mb-1">{cat.categoria}</div>
              <ul className="text-xs text-[#185adb]/90 list-disc pl-3">
                {cat.servicios.map((srv, i) => <li key={i}>{srv}</li>)}
              </ul>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Movimientos y noticias */}
      <div className="w-full max-w-5xl grid md:grid-cols-2 gap-4 mb-8">
        <Card className="bg-[#0d193c]/5 border-0 shadow">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <Bell className="h-5 w-5 text-[#185adb]" />
            <CardTitle className="text-base text-[#185adb]">Movimientos recientes</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-[#0d193c]/80">
            <ul className="list-disc pl-4 space-y-1">
              {movimientos.map((m, i) => (
                <li key={i}><span className="font-semibold">{m.tipo}</span> - {m.fecha} - ${m.monto.toLocaleString()} <span className="text-xs text-[#185adb]">{m.detalle}</span></li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card className="bg-[#ffd600]/10 border-0 shadow">
          <CardHeader className="flex flex-row items-center gap-2 pb-2">
            <TrendingUp className="h-5 w-5 text-[#ffd600]" />
            <CardTitle className="text-base text-[#ffd600]">Noticias y análisis</CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-[#0d193c]/80">
            <ul className="list-disc pl-4 space-y-1">{noticias.map((n, i) => <li key={i}>{n}</li>)}</ul>
          </CardContent>
        </Card>
      </div>

      {/* Asesor y contacto */}
      <Card className="w-full max-w-5xl bg-white/95 shadow-md border-0 mb-8">
        <CardHeader>
          <CardTitle className="text-base font-bold text-[#185adb] flex items-center gap-2">
            <User className="h-5 w-5" /> Tu asesor AFORTU
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col md:flex-row gap-4 items-center">
          <div className="text-[#0d193c] font-semibold">{asesor.nombre}</div>
          <div className="flex items-center gap-2 text-[#185adb] text-sm">
            <Mail className="h-4 w-4" /> <span>{asesor.mail}</span>
          </div>
          <div className="flex items-center gap-2 text-[#185adb] text-sm">
            <Phone className="h-4 w-4" /> <span>{asesor.whatsapp}</span>
          </div>
          <Button asChild size="sm" className="bg-[#ffd600] hover:bg-[#fff176] text-[#0d193c] font-bold ml-auto">
            <Link href="mailto:maria.gonzalez@afortu.com.mx">Agendar llamada</Link>
          </Button>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-6 text-xs text-[#0d193c]/60 text-center max-w-lg">
        Plataforma inteligente para la gestión de tu patrimonio, inversiones y servicios.<br />
        <span className="text-[#ffd600] font-semibold">AFORTU</span> &copy; {new Date().getFullYear()} | <a href="https://www.afortu.com.mx" target="_blank" rel="noopener noreferrer" className="underline text-[#ffd600]">www.afortu.com.mx</a>
      </div>
    </div>
  );
}