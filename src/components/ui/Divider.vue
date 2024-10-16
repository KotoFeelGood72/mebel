<template>
  <div class="divider" :style="{ height: height + 'rem' }"></div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  height: number;
}>();
</script>

<style scoped lang="scss"></style>
