
import { NextResponse } from 'next/server';

// This is a mock API endpoint. In a real application, you would fetch
// user-specific data from a database based on the authenticated user's ID.
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const range = searchParams.get('range') || 'year';

  // Dummy data based on range. This data would be dynamic per user.
  const data: { [key: string]: any } = {
    year: {
      revenue: '$95,420.50',
      expenses: '$42,100.20',
      netProfit: '$53,320.30',
      newAppointments: '8',
    },
    month: {
      revenue: '$8,500.00',
      expenses: '$3,200.50',
      netProfit: '$5,300.50',
      newAppointments: '2',
    },
    quarter: {
      revenue: '$25,000.00',
      expenses: '$10,100.00',
      netProfit: '$14,900.00',
      newAppointments: '5',
    },
  };

  return NextResponse.json(data[range] || data['year']);
}
