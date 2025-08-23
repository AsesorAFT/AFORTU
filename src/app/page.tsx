'use client';

import { Briefcase, LogOut, User, TrendingUp, FileText, Bell } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '@/lib/firebase';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function DashboardPage() {
  const [user] = useAuthState(auth);
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a1931] to-[#185adb] flex flex-col items-center py-10 px-2">
      {/* Branding */}
      <div className="flex items-center gap-3 mb-8">
        <Briefcase className="h-10 w-10 text-[#f7c873]" />
        <span className="font-extrabold text-3xl text-white tracking-tight">AFORTU</span>
      </div>
      {/* Main Card */}
      <Card className="w-full max-w-3xl bg-white/95 shadow-2xl border-0">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-[#185adb]">
            ¡Bienvenido{user?.displayName ? `, ${user.displayName}` : ''}!
          </CardTitle>
          <CardDescription className="text-[#0a1931]/80 mt-1">
            Tu resumen financiero y próximos movimientos.
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8">
          {/* Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-xl bg-[#185adb]/10 p-5 text-center shadow-sm">
              <div className="text-3xl font-bold text-[#185adb]">$250,000</div>
              <div className="text-xs text-[#0a1931]/70 mt-1">Patrimonio total</div>
            </div>
            <div className="rounded-xl bg-[#f7c873]/20 p-5 text-center shadow-sm">
              <div className="text-3xl font-bold text-[#f7c873]">3</div>
              <div className="text-xs text-[#0a1931]/70 mt-1">Contratos activos</div>
            </div>
            <div className="rounded-xl bg-[#0a1931]/10 p-5 text-center shadow-sm">
              <div className="text-3xl font-bold text-[#0a1931]">8.2%</div>
              <div className="text-xs text-[#0a1931]/70 mt-1">Rendimiento anual</div>
            </div>
          </div>
          {/* Acciones rápidas */}
          <div className="flex flex-col md:flex-row gap-4 justify-center mt-2">
            <Button asChild className="bg-[#185adb] hover:bg-[#0a1931] text-white font-bold px-8 py-2 rounded-lg flex items-center gap-2">
              <Link href="/dashboard/activos">
                <TrendingUp className="h-5 w-5" /> Ver portafolio
              </Link>
            </Button>
            <Button asChild className="bg-[#f7c873] hover:bg-[#ffe29a] text-[#0a1931] font-bold px-8 py-2 rounded-lg flex items-center gap-2">
              <Link href="/dashboard/inversiones/nueva">
                <FileText className="h-5 w-5" /> Nueva inversión
              </Link>
            </Button>
            <Button
              className="bg-[#0a1931] hover:bg-[#185adb] text-white font-bold px-8 py-2 rounded-lg flex items-center gap-2"
              onClick={handleLogout}
              type="button"
            >
              <LogOut className="h-5 w-5" /> Cerrar sesión
            </Button>
          </div>
          {/* Próximos movimientos y noticias */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
            <Card className="bg-[#185adb]/5 border-0 shadow">
              <CardHeader className="flex flex-row items-center gap-2 pb-2">
                <Bell className="h-5 w-5 text-[#185adb]" />
                <CardTitle className="text-base text-[#185adb]">Próximos movimientos</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-[#0a1931]/80">
                <ul className="list-disc pl-4 space-y-1">
                  <li>Vencimiento de contrato: <span className="font-semibold">15/08/2025</span></li>
                  <li>Revisión de portafolio: <span className="font-semibold">22/08/2025</span></li>
                  <li>Depósito programado: <span className="font-semibold">$10,000</span> el 01/09/2025</li>
                </ul>
              </CardContent>
            </Card>
            <Card className="bg-[#f7c873]/10 border-0 shadow">
              <CardHeader className="flex flex-row items-center gap-2 pb-2">
                <TrendingUp className="h-5 w-5 text-[#f7c873]" />
                <CardTitle className="text-base text-[#f7c873]">Noticias financieras</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-[#0a1931]/80">
                <ul className="list-disc pl-4 space-y-1">
                  <li>El mercado accionario sube 2% en la última semana.</li>
                  <li>Nuevas oportunidades de inversión disponibles.</li>
                  <li>Actualización fiscal 2025: conoce los cambios.</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>
      {/* Footer */}
      <div className="mt-10 text-xs text-white/70 text-center max-w-lg">
        Plataforma inteligente para la gestión de tu patrimonio, inversiones y retiro.<br />
        <span className="text-[#f7c873] font-semibold">AFORTU</span> &copy; {new Date().getFullYear()}
      </div>
    </div>
  );
}