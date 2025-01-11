import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  root: ".", // Set the root directory to the root of the project
  plugins: [react()],
});
