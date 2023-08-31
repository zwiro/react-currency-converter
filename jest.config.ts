import type { Config } from "jest"

const config: Config = {
  verbose: true,

  moduleNameMapper: {
    "^@/(.*)$": "<rootDir>/src/$1",
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  globals: {
    VITE_EXCHANGE_RATE_API_KEY: process.env.VITE_EXCHANGE_RATE_API_KEY,
  },
}

export default config
