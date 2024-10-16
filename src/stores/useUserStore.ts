import { defineStore } from "pinia";
import axios from "axios";
import { storeToRefs } from "pinia";

export const useUserStore = defineStore("users", {
  state: () => ({
    user: null as any,
    data: null as any,
  }),
  actions: {
    async loginUser(data: any) {
      this.user = data;
    },

    async fetchUser() {
      // if (!this.user) {
      //   throw new Error("Пользователь не авторизован");
      // }
      // try {
      //   const { $main } = useNuxtApp();
      //   const response = await $main.get(
      //     `/users/${this.user.user_data.ID}.json`
      //   );
      //   if (response.data) {
      //     this.data = response.data;
      //   }
      // } catch (error) {
      //   console.error("Ошибка получения данных пользователя:", error);
      //   throw new Error("Токен недействителен. Выполнен выход.");
      // }
    },

    async logout() {
      try {
        const response = await axios.post(
          "https://fura.dynamic-devs-collective.ru/custom-auth/v1/logout"
        );
        if (response.status === 200) {
          console.log("Пользователь успешно вышел");
        } else {
          console.warn("Ошибка при выполнении logout");
        }
      } catch (error) {
        console.error("Ошибка выполнения запроса logout:", error);
      }
      this.user = null;
      this.data = null;
      localStorage.removeItem("users");
    },
  },
  persist: true,
});

export const useUserStoreRefs = () => storeToRefs(useUserStore());
