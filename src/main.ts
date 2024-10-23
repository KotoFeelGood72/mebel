import { createApp } from "vue";
import { createPinia } from "pinia";
import "@/assets/scss/style.scss";
import Icons from "./components/ui/Icons.vue";
import App from "./App.vue";
import router from "./router";
import Toast, { POSITION } from "vue-toastification";
import "vue-toastification/dist/index.css";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import { MaskInput } from "vue-3-mask";

declare global {
  interface Window {
    YaPay: any;
  }
}

const app = createApp(App);

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);

app.use(Toast, {
  position: POSITION.BOTTOM_LEFT,
  timeout: 2000,
});

app.component("Icons", Icons);
app.component("MaskInput", MaskInput);

app.mount("#app");

// Функция для загрузки Yandex Pay SDK
function loadYaPayScript() {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");
    script.src = "https://pay.yandex.ru/sdk/v1/pay.js";
    script.async = true;

    // Обработчик загрузки скрипта
    script.onload = () => {
      console.log("Yandex Pay SDK загружен");
      resolve(true);
    };

    // Обработчик ошибок при загрузке скрипта
    script.onerror = () => {
      console.error("Ошибка при загрузке Yandex Pay SDK");
      reject(new Error("Ошибка при загрузке Yandex Pay SDK"));
    };

    // Добавляем скрипт в документ
    document.head.appendChild(script);
  });
}

// Пример использования функции для загрузки SDK
loadYaPayScript()
  .then(() => {
    // Проверяем, что window.YaPay действительно существует
    if (window.YaPay) {
      console.log("SDK доступен, можно инициализировать платежи");
      // Здесь выполняем дальнейшие действия с SDK
    } else {
      console.error("YaPay SDK не загружен корректно");
    }
  })
  .catch((error) => {
    console.error("Ошибка загрузки SDK:", error);
  });
