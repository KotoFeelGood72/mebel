<template>
  <DefaultLayout>
    <router-view />
  </DefaultLayout>
</template>

<script setup lang="ts">
import { onMounted, watch } from "vue";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import { useRoute } from "vue-router";
import { useModalStore } from "./stores/useModalStore";
import { Fancybox } from "@fancyapps/ui";
import "@fancyapps/ui/dist/fancybox/fancybox.css";

const route = useRoute();
const { closeAllModals } = useModalStore();

Fancybox.bind("[data-fancybox]");

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
