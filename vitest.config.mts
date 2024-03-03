import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  test: {
    globals: true,
    setupFiles: ["dotenv/config", "./src/tests/setup-test.ts"],
    environment: "node",
    clearMocks: true,
  },
  plugins: [tsconfigPaths()],
});
