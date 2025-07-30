import alphavantage from 'alphavantage';

interface StockPriceResponse {
    symbol: string;
    price: number;
}

/**
 * Fetches the current stock price for a given symbol.
 * @param symbol The stock ticker symbol (e.g., 'NVDA').
 * @returns A promise that resolves to an object containing the symbol and its price.
 * @throws An error if the API key is missing, the symbol is invalid, or the API call fails.
 */
export async function getStockPrice(symbol: string): Promise<StockPriceResponse> {
    const apiKey = process.env.FINANCE_API_KEY;

    if (!apiKey) {
        console.error("FINANCE_API_KEY environment variable not set.");
        throw new Error('Finance API key is not configured on the server.');
    }

    const alpha = alphavantage({ key: apiKey });

    try {
        const data: any = await alpha.data.quote(symbol);
        const globalQuote = data?.['Global Quote'];
        
        if (!globalQuote || Object.keys(globalQuote).length === 0 || globalQuote['05. price'] === undefined) {
             console.log(`No data or invalid symbol for: ${symbol}. Response:`, data);
             throw new Error(`Invalid symbol or no data available for ${symbol}.`);
        }

        const price = parseFloat(globalQuote['05. price']);
        
        return { symbol, price };
    } catch (error: any) {
        console.error(`Alpha Vantage API error for symbol ${symbol}:`, error.message || error);
        if (error.message && (error.message.includes('Invalid API call') || error.message.includes('invalid symbol'))) {
             throw new Error(`Invalid symbol: ${symbol}. Please check the ticker.`);
        }
        throw new Error(`Failed to fetch stock price for ${symbol}. It might be an invalid symbol or an API issue.`);
    }
}