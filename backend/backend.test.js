const request = require("supertest");

let app;

beforeAll(() => {
  process.env.NODE_ENV = "test";
  app = require("./server");
});

describe("Backend API Tests", () => {
  
  test("GET /api/test - should return test message", async () => {
    const res = await request(app).get("/api/test");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ message: "Backend is working!" });
  });

  test("GET /api/favorites - should return 401 without auth token", async () => {
    const res = await request(app).get("/api/favorites");
    expect(res.statusCode).toBe(401);
  });

  test("GET /api/mlb/standings - should return standings data", async () => {
    const res = await request(app).get("/api/mlb/standings");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("records");
  }, 10000);

  test("GET /api/mlb/teams - should return teams data", async () => {
    const res = await request(app).get("/api/mlb/teams");
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("teams");
  }, 10000);

});