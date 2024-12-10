<template>
  <div class="news">
    <div class="container">
      <div class="head">
        <h1>Новости</h1>
      </div>
      <div class="grid">
        <ArticleCard
          v-for="(item, i) in news"
          :key="'page-article-item' + i"
          :article="item"
        />
      </div>
    </div>
    <ActionBlock
      img="https://fu.gleede.ru/wp-content/uploads/2024/11/action-2.jpg"
      title="Как начать сотрудничество?"
      txt="Свяжитесь с нами, чтобы обсудить ваши идеи и запросы. Наши специалисты всегда готовы предоставить консультацию и помочь на каждом этапе реализации вашего проекта. Вместе мы сможем создать нечто действительно выдающееся."
    />
  </div>
</template>

<script setup lang="ts">
// @ts-ignore
import { useNews } from "@/services/useNews";
// @ts-ignore
import ActionBlock from "@/components/blocks/ActionBlock.vue";
// @ts-ignore
import ArticleCard from "@/components/card/ArticleCard.vue";
import { ref, onMounted, computed } from "vue";

const { useGetNews, news } = useNews();
// const head = ref<any>();

onMounted(async () => {
  await useGetNews();
});
</script>

<style scoped lang="scss">
.head {
  background-image: url("http://fu.gleede.ru/wp-content/uploads/2024/11/action.jpg");
  background-position: center center;
  background-attachment: fixed;
  background-size: cover;
  background-repeat: no-repeat;
  height: 30rem;
  border-radius: 2rem;
  margin-bottom: 8rem;
  @include flex-start;
  padding: 5rem 3rem;

  h1 {
    font-size: 6rem;
    font-weight: 600;
  }
}
.news {
  padding: 24rem 0 10rem 0;
}
.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(30%, 1fr));
  grid-gap: 3rem;
}
</style>
