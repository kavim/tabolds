test("POST migrations 200", async () => {
  const response1 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const response1Body = await response1.json();

  console.log(response1Body);

  expect(response1.status).toBe(200);
  expect(Array.isArray(response1Body)).toBe(true);
  expect(response1Body.length).toBeGreaterThan(0);

  const response2 = await fetch("http://localhost:3000/api/v1/migrations", {
    method: "POST",
  });
  const response2Body = await response2.json();

  console.log(response2Body);

  expect(response2.status).toBe(200);
  expect(response2Body.length).toBe(0);
});
