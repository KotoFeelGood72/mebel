<template>
  <div class="home" v-if="page">
    <HeroSlider :slides="page.slider" />
    <Hits :title="page.title_hit" :products="products" />
    <RecomendedBlock />
    <ActionBlock />
  </div>
</template>

<script setup lang="ts">
import Hits from "@/components/blocks/Hits.vue";
import ActionBlock from "@/components/blocks/ActionBlock.vue";
import RecomendedBlock from "@/components/blocks/RecomendedBlock.vue";
import HeroSlider from "@/components/blocks/HeroSlider.vue";
import { onMounted, watchEffect } from "vue";
import { usePage } from "@/services/usePage";
import { useProducts } from "@/services/useProducts";

const { useGetPage, page, meta } = usePage();
const { useGetProducts, products } = useProducts();

onMounted(async () => {
  await useGetPage("114");
  await useGetProducts("popular");
});
</script>

<style scoped lang="scss"></style>
