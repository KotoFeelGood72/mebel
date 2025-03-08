import { api } from "@/api/axios";
import { ref } from "vue";

const page = ref<any>(null);
const meta = ref<any>(null);

export function usePage() {
  const useGetPage = async (pages: string) => {
    try {
      const response = await api.get(`/page/${pages}.json`);
      page.value = response.data.acf;
      meta.value = {
        title: response.data.title,
        yoast: response.data.yoast,
      };
    } catch (error) {}
  };

  return {
    useGetPage,
    page,
    meta,
  };
}
