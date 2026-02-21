import { describe, test, expect, vi, beforeEach } from "vitest";
import { getDogImage } from "../controllers/dogController";
import * as dogService from "../services/dogService";

describe("dogController.getDogImage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  test("Returns success true and mocked servide result", async () => {
    const mockServiceResult = {
      imageUrl: "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg",
      status: "success"
    };

    vi.spyOn(dogService, "getRandomDogImage").mockResolvedValue(mockServiceResult);

    const req = {} as any;
    const res = {
      json: vi.fn()
    } as any;

    await getDogImage(req, res);

    expect(dogService.getRandomDogImage).toHaveBeenCalledOnce();

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockServiceResult
    });
  });
});