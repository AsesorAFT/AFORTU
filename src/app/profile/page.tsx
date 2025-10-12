import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Shield } from 'lucide-react';

const user = {
  name: 'Usuario Demo',
  email: 'demo@afortu.com',
  phone: '+52 55 0000 0000',
  accountType: 'PRO',
  onboardingDate: '12 febrero 2025',
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-slate-50 py-14">
      <div className="container mx-auto space-y-8 px-6 lg:px-12">
        <div>
          <h1 className="text-3xl font-bold text-[#0a1931] lg:text-4xl">Perfil y preferencias</h1>
          <p className="mt-2 max-w-2xl text-slate-600">
            Ajusta la información de tu cuenta, verifica los niveles de seguridad y define qué notificaciones deseas recibir.
          </p>
        </div>

        <Card className="border-slate-200/80">
          <CardHeader>
            <CardTitle className="text-2xl text-[#0a1931]">Información general</CardTitle>
            <CardDescription className="text-slate-600">
              Datos principales que compartes con tu equipo AFORTU.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6 lg:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" defaultValue={user.name} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input id="email" type="email" defaultValue={user.email} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Teléfono</Label>
              <Input id="phone" defaultValue={user.phone} />
            </div>
            <div className="space-y-2">
              <Label>Tipo de cuenta</Label>
              <Badge className="w-fit bg-[#f7c873] text-[#0a1931]">{user.accountType}</Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-2xl text-[#0a1931]">
              <Shield className="h-5 w-5 text-[#f7c873]" /> Seguridad y accesos
            </CardTitle>
            <CardDescription className="text-slate-600">
              Administra autenticación de dos factores y los accesos externos a tu patrimonio.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-xl border border-slate-200/80 bg-white p-5">
              <div>
                <p className="font-semibold text-[#0a1931]">Autenticación de dos factores</p>
                <p className="text-sm text-slate-500">Protege tu cuenta con códigos temporales y llaves físicas.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <div className="rounded-xl border border-slate-200/80 bg-white p-5">
              <p className="font-semibold text-[#0a1931]">Accesos delegados</p>
              <p className="mt-1 text-sm text-slate-500">
                Familiar (Ana López) · Lectura total
                <br />
                Despacho fiscal (Consultores MX) · Lectura + carga de documentos
              </p>
              <Button variant="outline" className="mt-4 border-[#0a1931] text-[#0a1931] hover:bg-[#0a1931]/5">
                Gestionar permisos
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="border-slate-200/80">
          <CardHeader>
            <CardTitle className="text-2xl text-[#0a1931]">Notificaciones</CardTitle>
            <CardDescription className="text-slate-600">
              Define qué alertas recibirás por correo o WhatsApp.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#0a1931]">Alertas de mercado</p>
                <p className="text-sm text-slate-500">Variaciones diarias y oportunidades detectadas por la IA.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#0a1931]">Recordatorios fiscales</p>
                <p className="text-sm text-slate-500">Vencimientos SAT, declaraciones internacionales y CFDI.</p>
              </div>
              <Switch defaultChecked />
            </div>
            <Separator />
            <div className="flex items-center justify-between">
              <div>
                <p className="font-semibold text-[#0a1931]">Bitácora y tareas</p>
                <p className="text-sm text-slate-500">Actualizaciones de la coordinación patrimonial.</p>
              </div>
              <Switch />
            </div>
            <Button className="mt-4 bg-[#0a1931] text-white hover:bg-[#132a4c]">Guardar preferencias</Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
