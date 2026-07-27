import { GET } from "./route";

describe("GET /api/stock-price", () => {
  it("is disabled on the public site", async () => {
    const response = await GET();

    expect(response.status).toBe(404);
    expect(response.headers.get("cache-control")).toBe("no-store");
    await expect(response.json()).resolves.toEqual({ error: "Not found" });
  });
});
