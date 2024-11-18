import orchestrator from "tests/orchestrator.js";

afterAll(async () => {
  await orchestrator.clearDatabase();
});

test("POST migrations 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response1.status).toBe(200);
  const response1Body = await response1.json();
  expect(Array.isArray(response1Body)).toBe(true);
  expect(response1Body.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  expect(response2.status).toBe(200);
  const response2Body = await response2.json();
  expect(response2Body.length).toBe(0);
});
