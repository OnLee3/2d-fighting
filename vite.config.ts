import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import restart from "vite-plugin-restart"; // Import the plugin

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    reactRefresh(),
    restart({ restart: "**/*.{ts,tsx}" }), // Add the plugin and configure it to restart the server when .ts or .tsx files change
  ],
});
