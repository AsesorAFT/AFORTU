import { GET } from './route';
import { getStockPrice } from '@/services/stock-price-service';

jest.mock('@/services/stock-price-service', () => ({
  getStockPrice: jest.fn(),
}));

const mockedGetStockPrice = getStockPrice as jest.MockedFunction<typeof getStockPrice>;

const createRequest = (symbol?: string) =>
  new Request(`http://localhost/api/stock-price${symbol ? `?symbol=${symbol}` : ''}`);

describe('GET /api/stock-price', () => {
  beforeEach(() => {
    mockedGetStockPrice.mockReset();
  });

  it('returns 400 when no symbol is provided', async () => {
    const response = await GET(createRequest());

    expect(response.status).toBe(400);
    await expect(response.json()).resolves.toEqual({ error: 'Symbol is required' });
    expect(mockedGetStockPrice).not.toHaveBeenCalled();
  });

  it('returns the service response when successful', async () => {
    mockedGetStockPrice.mockResolvedValue({ symbol: 'AAPL', price: 150.25 });

    const response = await GET(createRequest('AAPL'));

    expect(response.status).toBe(200);
    await expect(response.json()).resolves.toEqual({ symbol: 'AAPL', price: 150.25 });
  });

  it('maps invalid symbol errors to 404 responses', async () => {
    mockedGetStockPrice.mockRejectedValue(
      new Error('Invalid symbol: FAKE. Please check the ticker.')
    );

    const response = await GET(createRequest('FAKE'));

    expect(response.status).toBe(404);
    await expect(response.json()).resolves.toEqual({
      error: 'Invalid symbol: FAKE. Please check the ticker.',
    });
  });

  it('surfaces invalid price errors as upstream failures', async () => {
    mockedGetStockPrice.mockRejectedValue(
      new Error('Received an invalid price for BROKEN.')
    );

    const response = await GET(createRequest('BROKEN'));

    expect(response.status).toBe(502);
    await expect(response.json()).resolves.toEqual({
      error: 'Received an invalid price for BROKEN.',
    });
  });

  it('returns 500 when the finance API key is missing on the server', async () => {
    mockedGetStockPrice.mockRejectedValue(
      new Error('Finance API key is not configured on the server.')
    );

    const response = await GET(createRequest('NVDA'));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({
      error: 'Finance API key is not configured on the server.',
    });
  });

  it('defaults to 500 for unexpected errors', async () => {
    mockedGetStockPrice.mockRejectedValue(new Error('Service unavailable'));

    const response = await GET(createRequest('TSLA'));

    expect(response.status).toBe(500);
    await expect(response.json()).resolves.toEqual({ error: 'Service unavailable' });
  });
});
