<template>
  <Icon :icon="icon" :style="{ fontSize: `${size}px` }" />
</template>

<script setup lang="ts">
import { Icon } from "@iconify/vue";

const props = withDefaults(
  defineProps<{
    icon: string;
    size?: number;
  }>(),
  {
    icon: "",
    size: 20,
  }
);
</script>

<style scoped lang="scss"></style>
