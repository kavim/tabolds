import database from "infra/database";
import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServicesToBeReady();
  await database.query("drop schema public cascade; create schema public;");
}, 30000); // Set a specific timeout for this hook

test("GET migrations 200", async () => {
  const response = await fetch("http://localhost:3000/api/v1/migrations");

  expect(response.status).toBe(200);

  const responseBody = await response.json();
  expect(Array.isArray(responseBody)).toBe(true);
  expect(responseBody.length).toBeGreaterThan(0);
});
