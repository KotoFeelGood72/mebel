<template>
  <RouterLink :to="`/news/${article.slug}`" class="article">
    <div class="article_img">
      <div class="date">{{ formattedDate }}</div>
      <img :src="article.thumbnail" :alt="article.title" class="full" />
    </div>
    <div class="article__content">
      <h3>{{ article.title.rendered }}</h3>
      <div class="article__excerpt" v-html="article.excerpt.rendered"></div>
      <div class="btn">
        <DefaultBtn name="Подробнее" type="primary" color="brown" size="small" />
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import DefaultBtn from "../ui/DefaultBtn.vue";
const props = defineProps<{
  article: any;
}>();

// Функция форматирования даты
const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  return date.toLocaleDateString("ru-RU", options);
};

// Форматированная дата
const formattedDate = formatDate(props.article.date);
</script>

<style scoped lang="scss">
.article {
  background-color: $light;
  border-radius: 1rem;
  overflow: hidden;
  transition: all 0.3s ease-in-out;
  &:hover {
    box-shadow: 0 1rem 2rem 0 #93939319;
  }
}

.article_img {
  position: relative;
  width: 100%;
  height: 30rem;
  @include bp($point_2) {
    height: 20rem;
  }

  .date {
    position: absolute;

    top: 2rem;
    right: 2rem;
    padding: 1rem 2rem;
    background-color: $lbrown;
    backdrop-filter: blur(1rem);
    font-size: 1.4rem;
    font-weight: 600;
    color: $white;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

h3 {
  font-size: 2.4rem;
  margin-bottom: 2rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  line-height: 3.3rem;
  max-height: 6.5rem;
  @include bp($point_2) {
    font-size: 1.8rem;
    line-height: 2.6rem;
    margin-bottom: 1rem;
  }
}

p {
  font-size: 1.8rem;
  margin-bottom: 3rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3;
  line-height: 2.4rem;
  max-height: 7rem;
  @include bp($point_2) {
    font-size: 1.6rem;
    line-height: 2.2rem;
  }
}

.article__excerpt {
  max-height: 12rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 4;
  margin-bottom: 2rem;
}

.article__content {
  padding: 3rem 2rem;
}

.btn {
  display: inline-flex;
}
</style>
