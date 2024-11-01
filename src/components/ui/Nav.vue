<template>
  <nav class="nav">
    <RouterLink v-for="(item, i) in nav" :key="'nav-item-' + i" :to="item.link"
      >{{ item.name }}
    </RouterLink>
  </nav>
</template>

<script setup lang="ts">
import { ref } from "vue";
const nav = ref<any>([
  { name: "Каталог", link: "/shop" },
  { name: "Аренда", link: "/rent" },
  { name: "Для дизайнеров", link: "/design" },
]);
</script>

<style scoped lang="scss">
.nav {
  @include flex-center;
  gap: 6rem;
  pointer-events: none;
  @include bp($point_2) {
    gap: 3rem;
  }
  // z-index: -1;
  a {
    pointer-events: all;
    font-size: 1.8rem;
    @include bp($point_2) {
      font-size: 1.6rem;
    }
    &.router-link-exact-active,
    &.router-link-active {
      color: $brown;
      font-family: $font_2;
      font-weight: 500;
    }
  }
}
</style>
