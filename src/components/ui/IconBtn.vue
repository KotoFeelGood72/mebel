<template>
  <div class="icon-btn">
    <Icon :name="icon" :size="size" />
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";

const props = withDefaults(
  defineProps<{
    icon?: string;
    size?: string;
  }>(),
  {
    size: "24",
    icon: "custom:user",
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
}
</style>
