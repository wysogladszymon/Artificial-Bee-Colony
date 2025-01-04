import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Importujemy 'path' do obsługi ścieżek

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [
          [
            "@babel/plugin-proposal-decorators",
            {
              version: "2023-05",
            },
          ],
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Definiujemy alias '@' dla katalogu 'src'
    },
  },
});
