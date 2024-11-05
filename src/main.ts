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
import { createHead } from "@vueuse/head";

declare global {
  interface Window {
    YaPay: any;
  }
}

function loadYandexSplitSDK() {
  if (!window.YaPay) {
    const script = document.createElement("script");
    script.src = "https://pay.yandex.ru/sdk/v1/pay.js";
    script.async = true;
    script.onload = () => {
      console.log("YaPay SDK загружен");
    };
    script.onerror = () => {
      console.error("Ошибка при загрузке YaPay SDK");
    };
    document.head.appendChild(script);
  } else {
    console.log("YaPay SDK уже загружен");
  }
}

// Создание приложения
const app = createApp(App);

const head = createHead();

// Подключаем Pinia
const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

app.use(pinia);
app.use(router);
app.use(head);

app.use(Toast, {
  position: POSITION.BOTTOM_LEFT,
  timeout: 2000,
});

app.component("Icons", Icons);
app.component("MaskInput", MaskInput);
app.mount("#app");

// Загружаем SDK Яндекс Сплита при запуске приложения
loadYandexSplitSDK();
