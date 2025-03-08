<template>
  <div class="home" v-if="page">
    <HeroSlider :slides="page.slider" />
    <Hits :title="page.title_hit" :products="hits" />
    <RecomendedBlock
      :img1="page?.recomend_img_1"
      :img2="page?.recomend_img_2"
      :img3="page?.recomend_img_3"
      :title="page.recomend_title"
      :card="page.caard_in_txt"
    />
    <ActionBlock
      :img="page.изображение"
      :title="page.form_title"
      :txt="page.form_txt"
    />
  </div>
</template>

<script setup lang="ts">
import Hits from "@/components/blocks/Hits.vue";
import ActionBlock from "@/components/blocks/ActionBlock.vue";
import RecomendedBlock from "@/components/blocks/RecomendedBlock.vue";
import HeroSlider from "@/components/blocks/HeroSlider.vue";
import { onMounted } from "vue";
import { usePage } from "@/services/usePage";
import { useProducts } from "@/services/useProducts";

const { useGetPage, page } = usePage();
const { useGetProducts, hits } = useProducts();

onMounted(async () => {
  await useGetPage("beskarkasnye-divany-kresla");
  await useGetProducts("popular");
});
</script>

<style scoped lang="scss"></style>
