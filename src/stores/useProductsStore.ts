import { defineStore, storeToRefs } from "pinia";

export const useProductsStore = defineStore("products", {
  state: () => ({
    products: null as any,
    single: {} as any,
  }),
  actions: {
    async getAllProducts() {
      // try {
      //   const { $main } = useNuxtApp();
      //   const response = await $main.get("/all-products.json");
      //   this.products = response.data;
      // } catch (error) {}
    },
    getProductBySlug(slug: any) {
      if (!this.products) {
        return null;
      }
      return (
        this.products.find((product: any) => product.slug === slug) || null
      );
    },
  },
  persist: true,
});

export const useProductsStoreRefs = () => storeToRefs(useProductsStore());
