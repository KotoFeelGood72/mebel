import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import dotenv from "dotenv";
import path from "path";

export default defineConfig(({ mode }) => {
  // Загружаем файл .env для соответствующего режима
  const env = loadEnv(mode, process.cwd());

  // Теперь мы можем использовать переменные окружения
  const apiUrl = env.VITE_API_BASE_URL;
  const authUrl = env.VITE_AUTH_BASE_URL;

  return {
    build: {
      rollupOptions: {
        output: {
          manualChunks: () => "main.js",
          entryFileNames: "assets/[name].js",
          chunkFileNames: "assets/[name].js",
          assetFileNames: "assets/[name].[ext]",
        },
      },
      cssCodeSplit: false,
    },

    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    define: {
      __API_URL__: JSON.stringify(apiUrl),
      __AUTH_URL__: JSON.stringify(authUrl),
    },
    server: {
      port: 5173,
      host: true,
      strictPort: true,
      watch: {
        usePolling: true,
      },
      proxy: {
        "/api": {
          target: apiUrl, // Использование переменной окружения
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
        "/auth": {
          target: authUrl, // Использование переменной окружения
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/auth/, ""),
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @import "@/assets/scss/_mixins.scss";
          @import "@/assets/scss/_variables.scss";
          `,
        },
      },
    },
  };
});
