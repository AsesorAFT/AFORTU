
import { NextResponse } from 'next/server';

const monthNames = ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const range = searchParams.get('range') || 'year';
    const initialCapital = searchParams.get('capitalInicial') ? parseFloat(searchParams.get('capitalInicial') as string) : 100000;
    const annualInterestRate = searchParams.get('interestRate') ? parseFloat(searchParams.get('interestRate') as string) / 100 : 0.18;
    const termInMonths = searchParams.get('termInMonths') ? parseInt(searchParams.get('termInMonths') as string, 10) : 24;

    const monthlyInterestRate = annualInterestRate / 12;

    const chartData = [];
    let currentCapital = initialCapital;

    for (let i = 0; i < termInMonths; i++) {
        const interestEarned = currentCapital * monthlyInterestRate;
        const newCapital = currentCapital + interestEarned;
        
        chartData.push({
            month: monthNames[i % 12],
            month_num: (i % 12) + 1,
            year: Math.floor(i / 12) + 1,
            capital: newCapital,
            rendimiento: interestEarned,
        });

        currentCapital = newCapital;
    }
    
    let data;
    switch (range) {
        case 'month':
            data = chartData.slice(-1).map(d => ({ ...d, month: 'Este Mes' }));
            break;
        case 'quarter':
            data = chartData.slice(-3);
            break;
        case 'year':
            data = chartData.slice(0, 12); // Show first year for 'year' range
            break;
        default:
            data = chartData.slice(0, 12);
            break;
    }
  
    return NextResponse.json(data);
}
