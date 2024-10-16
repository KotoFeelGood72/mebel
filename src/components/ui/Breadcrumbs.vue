<template>
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb">
      <li v-for="(crumb, index) in allCrumbs" :key="index" class="breadcrumb-item">
        <a v-if="crumb.href" :href="crumb.href">{{ crumb.text }}</a>
        <span v-else>{{ crumb.text }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";

// Props
const props = defineProps<{
  crumbs?: { text: string; href?: string }[];
}>();

const defaultCrumb = { text: "Главная", href: "/" };

const allCrumbs = computed(() => {
  return [defaultCrumb, ...(props.crumbs || [])];
});
</script>

<style scoped lang="scss">
.breadcrumb {
  @include flex-start;
  flex-wrap: wrap;
  color: $gray;
  margin-bottom: 3rem;
  li {
    &:not(:last-child) {
      &:after {
        content: "/";
        padding: 0 0.5rem;
      }
    }
  }
  a {
    color: $brown;
  }
}
</style>
