<template>
  <div class="news-page" v-if="article">
    <header class="news-header">
      <h1 class="news-title">{{ article.title }}</h1>
      <div class="news-meta">
        <span class="news-date">{{ formatDate(article.date) }}</span>
        <span class="news-author">Автор: {{ article.author }}</span>
      </div>
    </header>

    <!-- Изображение -->
    <div class="news-image">
      <img :src="article.thumbnail" :alt="article.title" />
    </div>

    <div class="news-content" v-html="article.content"></div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useNews } from "@/services/useNews";

const route = useRoute();
const { useGetArticle, article } = useNews();

// Функция для форматирования даты
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("ru-RU", options);
};

onMounted(async () => {
  const articleId = route.params.id;
  await useGetArticle(articleId);
});
</script>

<style scoped lang="scss">
.news-page {
  padding-top: 24rem;
  max-width: 800px;
  margin: 0 auto;
  // padding: 20px;
  font-size: 2rem;

  .news-header {
    text-align: center;
    margin-bottom: 20px;

    .news-title {
      font-size: 2rem;
      font-weight: bold;
      margin-bottom: 10px;
    }

    .news-meta {
      font-size: 0.9rem;
      color: #777;

      span {
        margin-right: 15px;
      }
    }
  }

  .news-image {
    margin: 20px 0;

    img {
      width: 100%;
      height: auto;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
  }

  .news-content {
    font-size: 1rem;
    line-height: 1.6;
    margin-bottom: 30px;

    p {
      margin-bottom: 15px;
    }

    h3,
    h4,
    h5 {
      margin: 20px 0 10px;
      font-weight: bold;
      color: #444;
    }

    ul {
      list-style: disc;
      padding-left: 20px;

      li {
        margin-bottom: 10px;
      }
    }

    a {
      color: #007bff;
      text-decoration: none;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .related-news {
    background: #f9f9f9;
    padding: 15px;
    border-radius: 8px;

    h3 {
      font-size: 1.2rem;
      margin-bottom: 10px;
    }

    ul {
      list-style: none;
      padding: 0;

      li {
        margin-bottom: 5px;

        a {
          color: #007bff;
          text-decoration: none;

          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
}
</style>
