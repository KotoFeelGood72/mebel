<template>
  <DefaultLayout>
    <metainfo>
      <template v-slot:title="{ content }">{{
        content ? `${content} | SITE_NAME` : `SITE_NAME`
      }}</template>
    </metainfo>
    <router-view />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { watchEffect, onMounted, watch, computed } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { useRoute } from "vue-router";
import { useModalStore } from "./stores/useModalStore";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { useHead } from "@vueuse/head";
import { usePage } from "./services/usePage";
import { useProductPage } from "./services/useProductPage";

const route = useRoute();
const { meta } = usePage();
const { productPage } = useProductPage();
const { closeAllModals } = useModalStore();

Fancybox.bind("[data-fancybox]");

const isPagesMeta = computed(() => {
  switch (route.name) {
    case "cart":
      return "Корзина";
    case "edit":
      return "Редактирование профиля";
    case "order":
      return "Заказы";
    case "user":
      return "Личный кабинет";
    case "thanks":
      return "Спасибо за покупку в магазине SoftPear";
    case "shop":
      return "Каталог";
    case "product-list":
      return "Каталог";
  }
});

watchEffect(() => {
  if (meta.value && meta.value.title) {
    useHead({
      title: meta.value.title,
    });
  } else if (isPagesMeta.value) {
    useHead({
      title: isPagesMeta.value,
    });
  } else {
    useHead({
      title: productPage.value?.title,
    });
  }
});

watch(
  () => route.fullPath,
  () => {
    closeAllModals();
  }
);
</script>

<style lang="scss">
.fixed {
  overflow: hidden;
  @include bp($point_5, $direction: min) {
    padding-right: 1.7rem;
  }
}

:root {
  --full-screen: calc(var(--vh, 1vh) * 100);
}

html {
  height: 100%;
  font: 400 calc(100vw / 1920 * 10) / 1.33 $font_1;

  @include bp($point_2) {
    font-size: 10px;
  }
  &::-webkit-scrollbar-track {
    background-color: $lbrown;
  }

  &::-webkit-scrollbar {
    width: 0.6rem;
    background-color: $lbrown;
  }

  &::-webkit-scrollbar-thumb {
    background-color: $brown;
  }
}

body {
  position: relative;
  display: flex;
  height: 100%;
  font-size: $font_size_base;
  color: $color_text_base;
  -webkit-text-size-adjust: none;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: $body_bg;
  overflow-x: hidden;
  color: $dark;

  @supports (display: grid) {
    display: block;
  }

  @include bp($point_2) {
    font-size: 1.6rem;
  }
}

a {
  text-decoration: none;
  transition: all 0.3s ease;
  color: $dark;

  &:hover,
  &:focus {
    text-decoration: none;
    transition: all 0.3s ease;
  }
}

.page-enter-active,
.page-leave-active {
  transition: all 0.4s ease-in-out;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
}

.check {
  position: absolute;
  top: 200px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
}
</style>
