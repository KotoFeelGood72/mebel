<template>
  <div class="icon-btn">
    <Icons :icon="icon" :size="size" />
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

const props = withDefaults(
  defineProps<{
    icon?: string;
    size?: number;
  }>(),
  {
    size: 35,
    icon: "ph:user-circle-light",
  }
);
</script>

<style scoped lang="scss">
.icon-btn {
  @include flex-center;
  cursor: pointer;
  border-radius: 50%;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  color: $brown;
}
</style>
