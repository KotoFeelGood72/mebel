import { fileURLToPath, URL } from "node:url";
import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());
  const apiUrl = env.VITE_API_BASE_URL;
  const authUrl = env.VITE_AUTH_BASE_URL;

  return {
    base: process.env.VITE_BASE_URL_ASSET || "/",
    // build: {
    //   rollupOptions: {
    //     output: {
    //       manualChunks: () => "main.js",
    //       //   entryFileNames: "assets/[name].js",
    //       //   chunkFileNames: "assets/[name].js",
    //       //   assetFileNames: "assets/[name].[ext]",
    //     },
    //   },
    //   cssCodeSplit: false,
    // },

    plugins: [vue()],
    resolve: {
      alias: {
        "@": fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    server: {
      port: 8000,
      host: true,
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
          api: "modern-compiler",
        },
      },
    },
  };
});
