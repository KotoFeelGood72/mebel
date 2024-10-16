import { defineStore, storeToRefs } from "pinia";

export const useRentStore = defineStore("rent", {
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

export const useRentStoreRefs = () => storeToRefs(useRentStore());
