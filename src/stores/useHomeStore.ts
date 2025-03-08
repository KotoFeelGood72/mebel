import { defineStore, storeToRefs } from "pinia";
import { api } from "@/api/axios";
import axios from "axios";

export const useHomeStore = defineStore("home", {
  state: () => ({
    home: null as any,
    info: null as any,
  }),
  actions: {
    async getHome() {
      try {
        const response = await api.get("/page/beskarkasnye-divany-kresla.json");
        this.home = response.data.acf;
      } catch (error) {}
    },
    async getInfo() {
      try {
        const response = await axios.get(
          "https://softpear.ru/wp-json/custom/v1/site-info/"
        );
        this.info = response.data;
      } catch (error) {}
    },
  },
});

export const useHomeStoreRefs = () => storeToRefs(useHomeStore());
