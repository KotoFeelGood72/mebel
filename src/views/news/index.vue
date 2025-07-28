<template>
  <div class="news" v-if="page">
    <div class="container">
      <!-- <div class="head" :style="`background-image: url('${page?.img?.url}')`">
        <bread :items="breadcrumbs" theme="dark" />
        <h1>{{ page["news-title"] }}</h1>
      </div> -->
      <div class="grid">
        <ArticleCard
          v-for="(item, i) in news"
          :key="'page-article-item' + i"
          :article="item"
        />
      </div>
    </div>
    <!-- <ActionBlock
      :img="page.form.kartinka.url"
      :title="page.form.zagolovok"
      :txt="page.form.opisanie"
    /> -->
  </div>
</template>

<script setup lang="ts">
import { useNews } from "@/services/useNews";
import ActionBlock from "@/components/blocks/ActionBlock.vue";
import ArticleCard from "@/components/card/ArticleCard.vue";
import { onMounted } from "vue";
import bread from "@/components/bread.vue";
import { usePage } from "@/services/usePage";

const { useGetPage, page } = usePage();
const breadcrumbs = [{ label: "Главная", to: "/" }, { label: "Блог" }];
const { useGetNews, news } = useNews();
// const head = ref<any>();

onMounted(async () => {
  await useGetNews();
  await useGetPage("news"); // Загружаем данные страницы
});
</script>

<style scoped lang="scss">
.head {
  background-image: url("http://softpear.ru/wp-content/uploads/2024/11/action.jpg");
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  height: 30rem;
  border-radius: 2rem;
  margin-bottom: 8rem;
  @include flex-start;
  align-items: flex-start;
  padding: 5rem 3rem;
  flex-direction: column;
  @include bp($point_2) {
    margin-bottom: 3rem;
    height: 15rem;
    border-radius: 1rem;
  }

  h1 {
    font-size: 6rem;
    font-weight: 600;

    @include bp($point_2) {
      font-size: 2.4rem;
    }
  }
}
.news {
  padding: 24rem 0 10rem 0;
  @include bp($point_2) {
    padding: 10rem 0 6rem 0;
  }
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  grid-gap: 3rem;
  @include bp($point_2) {
    grid-gap: 2rem;
    grid-template-columns: repeat(auto-fill, minmax(100%, 1fr));
  }
}
</style>
