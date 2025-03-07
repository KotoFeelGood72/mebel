import { api } from "@/api/axios";
import { ref } from "vue";

const productPage = ref<any>(null);

export function useProductPage() {
  const useGetProductPage = async (product: string) => {
    try {
      const response = await api.get(`/product/${product}.json`);
      productPage.value = response.data;
    } catch (error) {}
  };

  return {
    useGetProductPage,
    productPage,
  };
}
