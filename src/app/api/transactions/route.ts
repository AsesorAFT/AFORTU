
import { NextResponse } from 'next/server';

const transactions = [
  { description: 'Aportación a Portafolio', type: 'Aportación a Asset Management', amount: '+$2,500.00', status: 'Realizado', category: 'inversion' },
  { description: 'Pago de servicio de asesoría', type: 'Pago de Servicios', amount: '-$150.75', status: 'Realizado', category: 'servicio' },
  { description: 'Retiro de cuenta de liquidez', type: 'Retiro de Liquidez Estructurada', amount: '-$500.00', status: 'Realizado', category: 'inversion' },
  { description: 'Depósito a contrato de Tasa Fija', type: 'Depósito a Tasa Fija', amount: '+$5,000.00', status: 'Pendiente', category: 'inversion' },
  { description: 'Vencimiento de inversión', type: 'Vencimiento', amount: '+$1,450.00', status: 'Realizado', category: 'inversion' },
  { description: 'Ajuste de portafolio', type: 'Aportación a Asset Management', amount: '-$20.00', status: 'Realizado', category: 'servicio' },
];

export async function GET() {
  return NextResponse.json(transactions);
}
