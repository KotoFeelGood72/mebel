import { api } from "@/api/axios";
import { ref } from "vue";

const news = ref<any>(null);
const article = ref<any>(null);

export function useNews() {
  const useGetNews = async () => {
    try {
        const response = await api.get(`/post/all-post.json`);
        news.value = response.data;
    } catch (error) {}
  };
  const useGetArticle = async (id: string | string[]) => {
    try {
        const response = await api.get(`/post/post-${id}.json`);
        article.value = response.data;
    } catch (error) {}
  };

  return {
    useGetNews,
    useGetArticle,
    article,
    news
  };
}
