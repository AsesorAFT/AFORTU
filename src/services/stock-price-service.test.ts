import alphavantage from 'alphavantage';
import { getStockPrice } from './stock-price-service';

jest.mock('alphavantage');

const mockedAlphaVantage = alphavantage as unknown as jest.Mock;
const mockQuote = jest.fn();

const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
const consoleLogSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

describe('getStockPrice', () => {
    beforeEach(() => {
        mockQuote.mockReset();
        mockedAlphaVantage.mockReset();
        mockedAlphaVantage.mockReturnValue({
            data: {
                quote: mockQuote,
            },
        });
        process.env.FINANCE_API_KEY = 'test-key';
    });

    afterEach(() => {
        delete process.env.FINANCE_API_KEY;
    });

    afterAll(() => {
        consoleErrorSpy.mockRestore();
        consoleLogSpy.mockRestore();
    });

    it('returns the parsed stock price when the API call succeeds', async () => {
        mockQuote.mockResolvedValue({
            'Global Quote': {
                '05. price': '123.45',
            },
        });

        const result = await getStockPrice('NVDA');

        expect(mockQuote).toHaveBeenCalledWith('NVDA');
        expect(result).toEqual({ symbol: 'NVDA', price: 123.45 });
    });

    it('allows zero prices to flow through without treating them as falsy', async () => {
        mockQuote.mockResolvedValue({
            'Global Quote': {
                '05. price': '0',
            },
        });

        const result = await getStockPrice('ZERO');

        expect(result).toEqual({ symbol: 'ZERO', price: 0 });
    });

    it('throws when FINANCE_API_KEY is missing', async () => {
        delete process.env.FINANCE_API_KEY;

        await expect(getStockPrice('AAPL')).rejects.toThrow(
            'Finance API key is not configured on the server.'
        );
        expect(mockedAlphaVantage).not.toHaveBeenCalled();
    });

    it('throws a friendly error when the API returns no quote data', async () => {
        mockQuote.mockResolvedValue({
            'Global Quote': {},
        });

        await expect(getStockPrice('INVALID')).rejects.toThrow(
            'Invalid symbol: INVALID. Please check the ticker.'
        );
    });

    it('throws when the API returns a non-numeric price', async () => {
        mockQuote.mockResolvedValue({
            'Global Quote': {
                '05. price': 'N/A',
            },
        });

        await expect(getStockPrice('BROKEN')).rejects.toThrow(
            'Received an invalid price for BROKEN.'
        );
    });
});
