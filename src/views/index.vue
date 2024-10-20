<template>
  <div class="home" v-if="page">
    <HeroSlider :slides="page.slider" />
    <Hits :title="page.title_hit" :products="page.hit_products" />
    <RecomendedBlock />
    <ActionBlock />
  </div>
</template>

<script setup lang="ts">
import Hits from "@/components/blocks/Hits.vue";
import ActionBlock from "@/components/blocks/ActionBlock.vue";
import RecomendedBlock from "@/components/blocks/RecomendedBlock.vue";
import HeroSlider from "@/components/blocks/HeroSlider.vue";
import { useProductsStoreRefs } from "@/stores/useProductsStore";
import { computed, onMounted } from "vue";

import { usePage } from "@/services/usePage";

const { useGetPage, page } = usePage();

const { products } = useProductsStoreRefs();

const featuredProducts = computed(() => {
  if (products.value) {
    return products.value.filter((product: any) => product.is_featured === true);
  }
});

onMounted(async () => {
  await useGetPage("114");
});
</script>

<style scoped lang="scss"></style>
