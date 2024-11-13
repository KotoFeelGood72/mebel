import { api } from "@/api/axios";
import { ref } from "vue";

const hits = ref<any>(null);
const products = ref<any>(null);

export function useProducts() {
  const useGetProducts = async (pro: "all" | "popular") => {
    try {
      if (pro === "all") {
        const response = await api.get(`/products/all-products.json`);
        products.value = response.data;
      } else {
        const response = await api.get(`/products/tag-popular.json`);
        hits.value = response.data;
      }
    } catch (error) {}
  };

  return {
    useGetProducts,
    products,
    hits,
  };
}
