import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import { getRandomDogImage } from "../services/dogService";

const mockFetch = vi.fn();
(global as any).fetch = mockFetch;

describe("dogService.getRandomDogImage", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test("Successful API fetch returns mapped response", async () => {

    const mockApiResponse = {
      message: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success"
    };

    mockFetch.mockResolvedValue({
      ok: true,
      json: async () => mockApiResponse
    });

    const result = await getRandomDogImage();

    expect(result.imageUrl).toBe(mockApiResponse.message);
    expect(result.status).toBe("success");
    expect(mockFetch).toHaveBeenCalledOnce();
  });


  test("Rejects when response.ok is false", async () => {

    mockFetch.mockResolvedValue({
      ok: false,
      status: 500
    });

    await expect(getRandomDogImage()).rejects.toThrow(
      "Failed to fetch dog image"
    );

    expect(mockFetch).toHaveBeenCalledOnce();
  });
});