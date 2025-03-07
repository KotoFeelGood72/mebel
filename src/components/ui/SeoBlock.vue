<template>
  <div class="seo-block">
    <div class="container">
      <div class="seo_block__content" v-html="content"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  content: any;
}>();
</script>

<style scoped lang="scss">
.seo_block__content {
  padding: 8rem 0;

  @include bp($point_2) {
    padding: 6rem 0;
  }

  :deep(p),
  :deep(ul),
  :deep(ol) {
    padding: 1.5rem 0;
  }

  :deep(.wp-block-list) {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    padding-left: 2rem;
  }

  :deep(li) {
    padding-left: 1rem;
    list-style: disc;
  }

  :deep(h2),
  :deep(h3) {
    font-size: 3.4rem;
    font-family: $font_2;
    font-weight: 600;
    padding: 1.5rem 0;

    @include bp($point_2) {
      font-size: 2.4rem;
    }
  }
  :deep(h4),
  :deep(h5) {
    padding: 1.5rem 0;
    font-size: 2.4rem;
    font-family: $font_2;
    font-weight: 600;
    @include bp($point_2) {
      font-size: 2rem;
    }
  }

  :deep(h6) {
    padding: 1.5rem 0;
    font-size: 2rem;
    font-family: $font_2;
    font-weight: 600;
    @include bp($point_2) {
      font-size: 1.8rem;
    }
  }
}
</style>
