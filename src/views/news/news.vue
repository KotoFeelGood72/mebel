<template>
  <div class="news-page" v-if="article">
    <header class="news-header">
      <h1 class="news-title">{{ article.title }}</h1>
      <div class="news-meta">
        <span class="news-date">{{ formatDate(article.date) }}</span>
      </div>
    </header>

    <!-- Изображение -->
    <div class="news-image">
      <img :src="article.thumbnail" :alt="article.title" />
    </div>

    <div class="news-content" v-html="article.content"></div>

    <!-- Кнопки "Поделиться" -->
    <div class="news-share">
      <h3>Поделиться:</h3>
      <div class="share-buttons">
        <a
          :href="`https://connect.ok.ru/offer?url=${currentUrl}`"
          target="_blank"
          rel="noopener noreferrer"
          class="share-button ok-button"
        >
          Одноклассники
        </a>
        <a
          :href="`https://vk.com/share.php?url=${currentUrl}`"
          target="_blank"
          rel="noopener noreferrer"
          class="share-button vk-button"
        >
          ВКонтакте
        </a>
        <a
          :href="`https://t.me/share/url?url=${currentUrl}&text=${article.title}`"
          target="_blank"
          rel="noopener noreferrer"
          class="share-button telegram-button"
        >
          Telegram
        </a>
        <button @click="copyLink" class="share-button copy-button">
          Скопировать ссылку
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import { useNews } from "@/services/useNews";
import { useToast } from "vue-toastification";

const route = useRoute();
const { useGetArticle, article } = useNews();
const toast = useToast();

// Вычисляем текущий URL
const currentUrl = window.location.href;

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

// Метод для копирования ссылки
const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(currentUrl);
    toast.info("Ссылка скопирована в буфер обмена!");
  } catch (err) {
    console.error("Ошибка копирования ссылки: ", err);

    toast.error("Не удалось скопировать ссылку");
  }
};

onMounted(async () => {
  const articleId = route.params.id;
  await useGetArticle(articleId);
});
</script>

<style scoped lang="scss">
.news-page {
  padding-top: 24rem;
  max-width: 100rem;
  margin: 0 auto;
  // padding: 20px;
  font-size: 2rem;

  .news-header {
    text-align: center;
    margin-bottom: 20px;

    .news-title {
      font-size: 4rem;
      margin-bottom: 2rem;
    }

    .news-meta {
      font-size: 1.8rem;
      color: #777;
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
    font-size: 2rem;
    margin-bottom: 3rem;

    :deep(p) {
      font-size: 2rem;
      margin: 2rem 0;
    }

    :deep(h2) {
      font-size: 3rem;
      color: $dark;
      margin: 2rem 0;
    }
    :deep(h3) {
      font-size: 3rem;
      color: $dark;
      margin: 2rem 0;
    }
    :deep(h3) {
      font-size: 3rem;
      color: $dark;
      margin: 2rem 0;
    }
    :deep(h4) {
      font-size: 3rem;
      color: $dark;
      margin: 2rem 0;
    }
    :deep(h5) {
      font-size: 3rem;
      color: $dark;
      margin: 2rem 0;
    }

    :deep(ul) {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
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

.news-share {
  margin-top: 2rem;

  h3 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .share-buttons {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    gap: 10px;

    .share-button {
      font-size: 1.6rem;
      padding: 1rem 2rem;
      border-radius: 0.5rem;
      color: #fff;
      text-decoration: none;
      transition: background-color 0.3s;

      &.ok-button {
        background-color: #ee8208;
      }
      &.vk-button {
        background-color: #4c75a3;
      }
      &.telegram-button {
        background-color: #0088cc;
      }
      &.copy-button {
        background-color: #555;
      }

      &:hover {
        opacity: 0.8;
      }
    }
  }
}
</style>
