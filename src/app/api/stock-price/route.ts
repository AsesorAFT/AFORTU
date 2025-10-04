
import { NextResponse } from 'next/server';

import { getStockPrice } from '@/services/stock-price-service';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');

    if (!symbol) {
        return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
    }

    try {
        const { price } = await getStockPrice(symbol);

        return NextResponse.json({ symbol, price });
    } catch (error: any) {
        const message = typeof error?.message === 'string' ? error.message : 'Failed to fetch stock price.';

        if (message.toLowerCase().includes('invalid symbol')) {
            return NextResponse.json({ error: message }, { status: 404 });
        }

        if (message.toLowerCase().includes('finance api key')) {
            return NextResponse.json({ error: message }, { status: 500 });
        }

        if (message.toLowerCase().includes('invalid price')) {
            return NextResponse.json({ error: message }, { status: 502 });
        }

        return NextResponse.json({ error: message }, { status: 500 });
    }
}
