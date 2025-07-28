import { api } from "@/api/axios";
import { ref } from "vue";

const news = ref<any>(null);
const article = ref<any>(null);

const WORDPRESS_API_BASE = "https://softpear.ru/wp-json/wp/v2"; // Замените на ваш домен

export function useNews() {
  const useGetNews = async () => {
    try {
      const response = await api.get(`${WORDPRESS_API_BASE}/posts?_embed`);
      news.value = response.data.map((item: any) => ({
        ...item,
        thumbnail:
          item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
      }));
    } catch (error) {}
  };
  const useGetArticle = async (slug: any) => {
    try {
      const response = await api.get(
        `${WORDPRESS_API_BASE}/posts?slug=${slug}&_embed`
      );
      const item =
        response.data && response.data.length > 0 ? response.data[0] : null;
      article.value = item
        ? {
            ...item,
            title: item.title.rendered,
            content: item.content.rendered,
            thumbnail:
              item._embedded?.["wp:featuredmedia"]?.[0]?.source_url || null,
          }
        : null;
    } catch (error) {}
  };

  return {
    useGetNews,
    useGetArticle,
    article,
    news,
  };
}
