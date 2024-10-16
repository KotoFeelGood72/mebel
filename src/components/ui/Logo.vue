<template>
  <div :class="[`position-${position}`, 'logo']">
    <NuxtLink to="/">
      <img src="/img/logo.svg" alt="" />
    </NuxtLink>
  </div>
</template>

<script setup lang="ts">
import { defineProps, withDefaults } from "vue";

withDefaults(
  defineProps<{
    position?: "footer" | "header";
  }>(),
  {
    position: "header",
  }
);
</script>

<style scoped lang="scss">
.logo {
  @include flex-center;
  max-height: 3rem;
  transition: all 0.3s ease-in-out;
  a {
    width: 100%;
    height: 100%;
    @include flex-center;
  }
}

.position-footer {
  margin-top: 0.5rem;
  @include flex-center;
  &.logo {
    width: 22.5rem;
    @include bp($point_2) {
      width: 100%;
    }
    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }
}
</style>
