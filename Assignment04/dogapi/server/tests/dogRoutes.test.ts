import { describe, test, expect, vi, beforeEach, afterEach } from "vitest";
import express from "express";
import request from "supertest";
import dogRoutes from "../routes/dogRoutes";
import * as dogController from "../controllers/dogController";

vi.mock("../controllers/dogController");

describe("dogRoutes", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  test("GET /api/dogs/random returns 200, success true and mocked image url", async () => {
    const mockedImageUrl = "https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg";

    vi.mocked(dogController.getDogImage).mockImplementation((_req: any, res: any) => {
      return res.status(200).json({
        success: true,
        data: { imageUrl: mockedImageUrl }
      });
    });

    const app = express();
    app.use("/api/dogs", dogRoutes);

    const response = await request(app).get("/api/dogs/random");

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toBe(mockedImageUrl);
  });

  test("GET /api/dogs/random returns 500 and error message on failure", async () => {
    const mockedError = {
      success: false,
      error: "Failed to fetch dog image: Network error"
    };

    vi.mocked(dogController.getDogImage).mockImplementation((_req: any, res: any) => {
      return res.status(500).json(mockedError);
    });

    const app = express();
    app.use("/api/dogs", dogRoutes);

    const response = await request(app).get("/api/dogs/random");

    expect(response.status).toBe(500);
    expect(response.body.success).toBe(false);
    expect(response.body.error).toBe(mockedError.error);
  });
});