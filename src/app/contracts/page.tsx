"use client";

import React, { useState, useMemo } from "react";
import { FileText, Download, Search } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";

const contractsData = [
  {
    id: "SERV-001",
    service: "Planificación Patrimonial",
    date: "2024-01-15",
    status: "Activo",
  },
  {
    id: "SERV-002",
    service: "Blindaje Patrimonial",
    date: "2024-03-01",
    status: "Activo",
  },
  {
    id: "INV-TF-01",
    service: "Inversión a Tasa Fija",
    date: "2023-07-29",
    status: "Activo",
  },
  {
    id: "INV-AM-01",
    service: "Asset Management",
    date: "2023-01-15",
    status: "Activo",
  },
  {
    id: "SERV-003",
    service: "Asesoría para el Retiro",
    date: "2022-11-10",
    status: "Finalizado",
  },
];

export default function ContractsPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string | null>(null);
  const { toast } = useToast();

  const filteredContracts = useMemo(() => {
    return contractsData
      .filter(contract => {
        if (statusFilter && contract.status !== statusFilter) {
          return false;
        }
        if (searchTerm && !contract.service.toLowerCase().includes(searchTerm.toLowerCase()) && !contract.id.toLowerCase().includes(searchTerm.toLowerCase())) {
          return false;
        }
        return true;
      });
  }, [searchTerm, statusFilter]);

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case "Activo":
        return "bg-green-100 text-green-800 border-green-200";
      case "Finalizado":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "";
    }
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <FileText className="h-8 w-8" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight font-headline">Contratos</h1>
          <p className="text-muted-foreground">
            Gestiona, revisa y descarga tus documentos legales y de servicio.
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
             <div className="relative flex-1">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Buscar por servicio o ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-8"
                />
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Filtrar por Estado</Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                   <DropdownMenuCheckboxItem
                    checked={statusFilter === null}
                    onCheckedChange={() => setStatusFilter(null)}
                  >
                    Todos
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                    checked={statusFilter === 'Activo'}
                    onCheckedChange={() => setStatusFilter('Activo')}
                  >
                    Activo
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                     checked={statusFilter === 'Finalizado'}
                    onCheckedChange={() => setStatusFilter('Finalizado')}
                  >
                    Finalizado
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contrato ID</TableHead>
                <TableHead>Servicio Contratado</TableHead>
                <TableHead>Fecha de Emisión</TableHead>
                <TableHead>Estado</TableHead>
                <TableHead className="text-right">Acciones</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredContracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium">{contract.id}</TableCell>
                  <TableCell>{contract.service}</TableCell>
                  <TableCell>{contract.date}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn(getStatusBadgeClass(contract.status))}>
                      {contract.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() =>
                        toast({
                          title: "Descarga iniciada",
                          description: `Descargando ${contract.id}...`,
                          variant: "default",
                        })
                      }
                    >
                      <Download className="h-4 w-4" />
                      <span className="sr-only">Descargar Contrato</span>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
               {filteredContracts.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center h-24">
                    No se encontraron contratos que coincidan con tu búsqueda.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
