const calculadora = require("../../models/calculadora");

test("should sun 2 even numbers", () => {
  expect(calculadora.sum(2, 2)).toBe(4);
});

test("should sun 2 odd numbers", () => {
  expect(calculadora.sum(5, 7)).toBe(12);
});

test("should sun 1 even and 1 odd numbers", () => {
  expect(calculadora.sum(4, 5)).toBe(9);
});
