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
