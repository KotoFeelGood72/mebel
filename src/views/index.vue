<template>
  <div class="home" v-if="home">
    <HeroSlider :slides="home.slider" />
    <Hits :title="home.title_hit" :products="featuredProducts" />
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
import { useHomeStore, useHomeStoreRefs } from "@/stores/useHomeStore";
import { computed, onMounted } from "vue";

const { getHome } = useHomeStore();
const { home } = useHomeStoreRefs();
const { products } = useProductsStoreRefs();

const featuredProducts = computed(() => {
  if (products.value) {
    return products.value.filter(
      (product: any) => product.is_featured === true
    );
  }
});

onMounted(async () => {
  await getHome();
});
</script>

<style scoped lang="scss"></style>
