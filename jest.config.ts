import nextJest from "next/jest.js";
import type { Config } from "jest";

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: "./",
});

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config: Config = {
  // Add more setup options before each test is run
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  testEnvironment: "jest-environment-jsdom",
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 53,
      statements: -10,
    },
  },
  collectCoverageFrom: [
    "**/*.{ts,tsx}",
    "**/app/**",
    "!**/app/layout.tsx",
    "!**/.next/**",
    "!**/jest.config.ts",
    "!**/jest.setup.ts",
    "!**/tailwind.config.ts",
  ],
};

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config);
