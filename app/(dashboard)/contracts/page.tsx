'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  FileText, DownloadCloud, Eye, CheckCircle2, AlertCircle, Clock,
  FileBarChart, ShieldCheck, FileSignature, ArrowLeft, PlusCircle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAfortuSettings } from '@/components/tools/use-afortu-settings';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const statusConfig: Record<string, { Icon: React.ElementType, className: string }> = {
  'pagado': { Icon: CheckCircle2, className: 'bg-emerald-600/10 text-emerald-300 border-emerald-600/20' },
  'en proceso': { Icon: Clock, className: 'bg-amber-600/10 text-amber-300 border-amber-600/20' },
  'pendiente de pago': { Icon: AlertCircle, className: 'bg-red-600/10 text-red-300 border-red-600/20' },
};

export default function ContractsPage() {
  const { settings } = useAfortuSettings();
  const { contractsData } = settings;

  const investmentContracts = contractsData.filter((c: any) => c.type === 'Inversión');
  const serviceContracts = contractsData.filter((c: any) => c.type === 'Servicio');

  // Form state
  const [contractType, setContractType] = useState<string | undefined>(undefined);
  const [initialAmount, setInitialAmount] = useState<number | ''>('');
  const [serviceCategory, setServiceCategory] = useState<string | undefined>(undefined);
  const [isSpecificContract, setIsSpecificContract] = useState<string>('no');
  const [specificContractName, setSpecificContractName] = useState<string>('');
  const [notes, setNotes] = useState<string>('');
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccessMessage(null);
    setErrorMessage(null);

    const payload = {
      contractType,
      initialAmount: initialAmount === '' ? null : initialAmount,
      serviceCategory: contractType === 'servicio' ? serviceCategory : null,
      isSpecificContract: contractType === 'servicio' ? (isSpecificContract === 'si') : null,
      specificContractName: contractType === 'servicio' && isSpecificContract === 'si' ? specificContractName : null,
      notes,
      requestedAt: new Date().toISOString(),
    };

    try {
      const res = await fetch('/api/contracts/request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(`Error en el servidor: ${res.statusText}`);

      setSuccessMessage('Tu solicitud ha sido enviada correctamente. Nos pondremos en contacto contigo pronto.');
      setContractType(undefined);
      setInitialAmount('');
      setServiceCategory(undefined);
      setIsSpecificContract('no');
      setSpecificContractName('');
      setNotes('');
    } catch (err) {
      console.error(err);
      setErrorMessage('No se pudo enviar la solicitud. Intenta de nuevo más tarde.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-b from-[#062A57] via-[#083B7A] to-[#0B4F9E] text-white py-12 px-6 md:px-16 font-sans">
      {/* Header */}
      <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="flex items-center gap-5">
          <div className="h-16 w-16 rounded-xl bg-white/6 border border-white/8 flex items-center justify-center">
            <FileText className="h-8 w-8 text-white/90" />
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-serif tracking-tight text-white">Mis Contratos</h1>
            <p className="text-slate-200 mt-1 max-w-xl text-sm">
              Consulta y gestiona tus acuerdos de inversión y servicios profesionales con un enfoque institucional y privado.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button asChild variant="outline" className="bg-transparent text-white/95 border-white/10 hover:bg-white/6">
            <Link href="/dashboard" className="inline-flex items-center gap-2 px-3 py-2">
              <ArrowLeft className="h-4 w-4" />
              Volver
            </Link>
          </Button>

          <Button asChild className="bg-[#00378b] hover:bg-[#003078] text-white font-semibold shadow-md px-4 py-2">
            <a href="/api/cfdi/download-all" className="inline-flex items-center gap-2">
              <DownloadCloud className="h-4 w-4" />
              Descargar CFDI
            </a>
          </Button>
        </div>
      </header>

      {/* Investment Contracts */}
      <section className="bg-white/3 border border-white/6 backdrop-blur rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <FileBarChart className="h-6 w-6 text-[#9fd0ff]" />
          <h2 className="text-2xl font-serif text-white">Contratos de Inversión</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {investmentContracts.map((contract: any) => {
            const statusInfo = statusConfig[contract.status] || { Icon: Clock, className: 'bg-white/5 text-slate-300 border-white/6' };
            const signedColor = contract.signed ? 'text-emerald-300' : 'text-amber-300';

            return (
              <div
                key={contract.id}
                className="bg-white/4 border border-white/6 rounded-lg p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-serif text-lg text-white/95 flex-1 pr-2">{contract.title}</h3>
                  <Badge variant="outline" className={cn("text-xs font-medium", statusInfo.className)}>
                    <statusInfo.Icon className="h-3.5 w-3.5 mr-1.5" />
                    {contract.status}
                  </Badge>
                </div>

                <p className="text-sm text-slate-300 flex-grow">{contract.details}</p>

                <div className="text-lg font-semibold text-white/95">{contract.amount}</div>

                <div className="border-t border-white/6 pt-3 flex items-center justify-between">
                  <div className={`text-xs font-semibold flex items-center gap-1.5 ${signedColor}`}> 
                    {contract.signed ? <FileSignature className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    <span>{contract.signed ? 'Firmado Digitalmente' : 'Pendiente de Firma'}</span>
                  </div>

                  <Link
                    href={`/contracts/${contract.id}`}
                    className="inline-flex items-center gap-2 text-[#9fd0ff] hover:text-white text-sm font-medium"
                  >
                    <Eye className="h-4 w-4" /> Ver detalles
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Service Contracts */}
      <section className="bg-white/3 border border-white/6 backdrop-blur rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <ShieldCheck className="h-6 w-6 text-[#9fd0ff]" />
          <h2 className="text-2xl font-serif text-white">Contratos de Servicios Profesionales</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {serviceContracts.map((contract: any) => {
            const statusInfo = statusConfig[contract.status] || { Icon: Clock, className: 'bg-white/5 text-slate-300 border-white/6' };
            const signedColor = contract.signed ? 'text-emerald-300' : 'text-amber-300';

            return (
              <div
                key={contract.id}
                className="bg-white/4 border border-white/6 rounded-lg p-5 flex flex-col gap-3 shadow-sm hover:shadow-md transition-transform transform hover:-translate-y-1"
              >
                <div className="flex items-start justify-between">
                  <h3 className="font-serif text-lg text-white/95 flex-1 pr-2">{contract.title}</h3>
                  <Badge variant="outline" className={cn("text-xs font-medium", statusInfo.className)}>
                    <statusInfo.Icon className="h-3.5 w-3.5 mr-1.5" />
                    {contract.status}
                  </Badge>
                </div>

                <p className="text-sm text-slate-300 flex-grow">{contract.details}</p>

                <div className="border-t border-white/6 pt-3 flex items-center justify-between">
                  <div className={`text-xs font-semibold flex items-center gap-1.5 ${signedColor}`}> 
                    {contract.signed ? <FileSignature className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                    <span>{contract.signed ? 'Firmado Digitalmente' : 'Pendiente de Firma'}</span>
                  </div>

                  <Link
                    href={`/contracts/${contract.id}`}
                    className="inline-flex items-center gap-2 text-[#9fd0ff] hover:text-white text-sm font-medium"
                  >
                    <Eye className="h-4 w-4" /> Ver detalles
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* New Contract Request Section */}
      <section className="bg-white/3 border border-white/6 backdrop-blur rounded-2xl shadow-lg p-6 md:p-8">
        <div className="flex items-center gap-3 mb-4">
          <PlusCircle className="h-6 w-6 text-[#9fd0ff]" />
          <h2 className="text-2xl font-serif text-white">Solicitar Apertura de Contrato</h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="contractType" className="text-slate-200">Tipo de Contrato</Label>
            <Select onValueChange={(val) => setContractType(val)}>
              <SelectTrigger id="contractType" className="bg-white/5 border-white/8 text-white rounded-md">
                <SelectValue placeholder="Selecciona un tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="inversion">Inversión Global</SelectItem>
                <SelectItem value="tasa-fija">Tasa Fija (CAV)</SelectItem>
                <SelectItem value="servicio">Servicio Profesional</SelectItem>
              </SelectContent>
            </Select>
            <p className="text-xs text-slate-300 mt-1">Selecciona "Servicio Profesional" para elegir entre Patrimonio, Legado y Retiro.</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="initialAmount" className="text-slate-200">Monto Inicial (MXN)</Label>
            <Input
              id="initialAmount"
              type="number"
              value={initialAmount}
              onChange={(e) => setInitialAmount(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="Ej: 500000"
              className="bg-white/5 border-white/8 text-white rounded-md"
            />
            <p className="text-xs text-slate-300 mt-1">
              {contractType === 'servicio' ? 'Para servicios, este monto es opcional.' : 'Indica el monto inicial para contratación.'}
            </p>
          </div>

          {contractType === 'servicio' && (
            <>
              <div className="space-y-2">
                <Label htmlFor="serviceCategory" className="text-slate-200">Categoría de Servicio</Label>
                <Select onValueChange={(val) => setServiceCategory(val)}>
                  <SelectTrigger id="serviceCategory" className="bg-white/5 border-white/8 text-white rounded-md">
                    <SelectValue placeholder="Selecciona una categoría" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="patrimonio">Patrimonio</SelectItem>
                    <SelectItem value="legado">Legado</SelectItem>
                    <SelectItem value="retiro">Retiro</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-300 mt-1">Elige la categoría que mejor describe el servicio que requieres.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="isSpecific" className="text-slate-200">¿Es un contrato en especial?</Label>
                <Select onValueChange={(val) => setIsSpecificContract(val || 'no')}> 
                  <SelectTrigger id="isSpecific" className="bg-white/5 border-white/8 text-white rounded-md">
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="si">Sí, es un contrato específico</SelectItem>
                    <SelectItem value="no">No, necesito asesoría / explicación</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-slate-300 mt-1">Si es un contrato específico indícalo en el campo siguiente.</p>
              </div>

              {isSpecificContract === 'si' && (
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="specificContract" className="text-slate-200">Nombre o tipo de contrato (específico)</Label>
                  <Input
                    id="specificContract"
                    value={specificContractName}
                    onChange={(e) => setSpecificContractName(e.target.value)}
                    placeholder="Ej: Contrato de administración de patrimonio a largo plazo"
                    className="bg-white/5 border-white/8 text-white rounded-md"
                  />
                </div>
              )}

              {isSpecificContract === 'no' && (
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="notesService" className="text-slate-200">Explícanos qué necesitas</Label>
                  <Textarea
                    id="notesService"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="Describe objetivos, plazos, preferencias o cualquier detalle relevante..."
                    className="bg-white/5 border-white/8 text-white rounded-md"
                    rows={5}
                  />
                </div>
              )}
            </>
          )}

          {contractType !== 'servicio' && (
            <div className="md:col-span-2 space-y-2">
              <Label htmlFor="notesGeneral" className="text-slate-200">Notas Adicionales</Label>
              <Textarea
                id="notesGeneral"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Describe tus objetivos, plazos o cualquier detalle relevante para tu asesor..."
                className="bg-white/5 border-white/8 text-white rounded-md"
                rows={5}
              />
            </div>
          )}

          <div className="md:col-span-2 flex justify-end items-center gap-4">
            <div className="flex-1">
              {successMessage && <div className="text-sm text-emerald-300">{successMessage}</div>}
              {errorMessage && <div className="text-sm text-red-300">{errorMessage}</div>}
            </div>

            <Button type="submit" disabled={submitting} className="bg-[#00378b] hover:bg-[#002f70] text-white font-semibold px-4 py-2 rounded-md">
              {submitting ? 'Enviando...' : 'Enviar Solicitud'}
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
}