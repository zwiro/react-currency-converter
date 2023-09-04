import { defineConfig } from "cypress"

export default defineConfig({
  e2e: {
    baseUrl: "http://localhost:5173",
    responseTimeout: 120e3,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
})
