
import { NextResponse } from 'next/server';
import alphavantage from 'alphavantage';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const symbol = searchParams.get('symbol');

    if (!symbol) {
        return NextResponse.json({ error: 'Symbol is required' }, { status: 400 });
    }

    const apiKey = process.env.FINANCE_API_KEY;

    if (!apiKey) {
        console.error("FINANCE_API_KEY environment variable not set.");
        return NextResponse.json({ error: 'Finance API key is not configured.' }, { status: 500 });
    }

    const alpha = alphavantage({ key: apiKey });

    try {
        const data: any = await alpha.data.quote(symbol);
        const globalQuote = data?.['Global Quote'];
        
        // Handle cases where the symbol is invalid and Alpha Vantage returns an empty object or a note.
        if (!globalQuote || Object.keys(globalQuote).length === 0 || globalQuote['05. price'] === undefined) {
             console.log(`No data or invalid symbol for: ${symbol}. Response:`, data);
             return NextResponse.json({ error: `Invalid symbol or no data available for ${symbol}.` }, { status: 404 });
        }

        const price = globalQuote['05. price'];
        
        return NextResponse.json({ symbol, price: parseFloat(price) });
    } catch (error: any) {
        console.error(`Alpha Vantage API error for symbol ${symbol}:`, error.message || error);
        // Check for common error message from Alpha Vantage for invalid symbols
        if (error.message && (error.message.includes('Invalid API call') || error.message.includes('invalid symbol'))) {
             return NextResponse.json({ error: `Invalid symbol: ${symbol}. Please check the ticker.` }, { status: 404 });
        }
        return NextResponse.json({ error: `Failed to fetch stock price for ${symbol}. It might be an invalid symbol or an API issue.` }, { status: 500 });
    }
}
