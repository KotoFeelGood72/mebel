import { defineStore, storeToRefs } from "pinia";
import { useLoadingStore } from "./useLoadingStore";

export const useHomeStore = defineStore("home", {
  state: () => ({
    home: null as any,
  }),
  actions: {
    async getHome() {
      try {
        const { $main } = useNuxtApp();
        const response = await $main.get("/home.json");
        this.home = response.data.acf;
      } catch (error) {}
    },
  },
});

export const useHomeStoreRefs = () => storeToRefs(useHomeStore());
