/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_AUTH_BASE_URL: string;
  // Добавьте другие переменные окружения, если они есть
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
