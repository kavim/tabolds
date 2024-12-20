const dotenv = require("dotenv");
dotenv.config({ path: ".env.development" });
const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: ".",
});
const jestConfig = createJestConfig({
  moduleDirectories: ["node_modules", "<rootDir>"],
  setupFilesAfterEnv: ["<rootDir>/tests/setup.js"],
  maxWorkers: 4,
  cache: false,
  testTimeout: 120000,
});

module.exports = jestConfig;
