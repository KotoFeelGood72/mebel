<template>
  <div class="ideas">
    <div class="container">
      <div class="ideas_main">
        <h2>Идеи для дома</h2>
        <ul class="ideas_grid">
          <li
            class="ideas_item"
            v-for="(item, i) in gallery"
            :key="'gallery-item-' + i"
          >
            <a :href="item.img.url">
              <img :src="item.img.url" alt="" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";

const props = defineProps<{
  gallery: any;
}>();
</script>

<style scoped lang="scss">
.ideas_main {
  padding: 10rem 0;
  @include bp($point_2) {
    padding: 3.8rem 0 3rem 0;
  }
  h2 {
    font-family: $font_2;
    font-size: 4rem;
    font-weight: 500;
    margin-bottom: 4rem;
    @include bp($point_2) {
      font-size: 2.4rem;
      margin-bottom: 2rem;
    }
  }
}
.ideas_grid {
  display: grid;
  grid-template-areas:
    "a b d"
    "a c d";

  @include bp($point_2) {
    grid-template-areas:
      "a . b"
      "a . c"
      "d d d";
  }

  li {
    &:nth-child(1) {
      grid-area: a;
      height: 94.75rem;
      @include bp($point_2) {
        height: auto;
      }
    }
    &:nth-child(2) {
      grid-area: b;
      height: 39.2rem;
      @include bp($point_2) {
        height: auto;
      }
    }
    &:nth-child(3) {
      grid-area: c;
      height: 55.6rem;
      @include bp($point_2) {
        height: auto;
      }
    }
    &:nth-child(4) {
      grid-area: d;
      height: 94.75rem;
      @include bp($point_2) {
        height: 22.6rem;
      }
    }
  }
}

.ideas_item {
  a {
    @include flex-center;
    width: 100%;
    height: 100%;
    img {
      width: 100%;
      height: 100%;
      @include flex-center;
      object-fit: cover;
    }
  }
}
</style>
