/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_URL: string; // Или другие переменные окружения, которые вы используете
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
