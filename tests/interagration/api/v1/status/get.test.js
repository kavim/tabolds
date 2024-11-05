test("should be a fine status result in /api/v1/status", async () => {
  const response = await fetch("http://localhost:3000/api/v1/status");
  const data = await response.json();

  expect(response.status).toBe(200);
  expect(data).toHaveProperty("updated_at");
  const parsedUpdatedAt = new Date(data.updated_at).toISOString();
  expect(parsedUpdatedAt).toBe(data.updated_at);

  expect(data.dependencies.database.version).toBe("16.0");
  expect(data.dependencies.database.max_connections).toBeGreaterThan(0);
  expect(data.dependencies.database.openedConnections).toBe(0);
});

test("Sql injection", async () => {
  const response = await fetch(
    "http://localhost:3000/api/v1/status?databaseName='; SELECT pg_sleep(4) --';",
  );
  expect(response.status).toBe(200);
});
