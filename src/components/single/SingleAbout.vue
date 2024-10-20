<template>
  <div class="about">
    <div class="container">
      <div class="about_main">
        <div class="about_head">
          <h2>{{ title }}</h2>
          <p>{{ txt }}</p>
        </div>
        <ul class="about_grid">
          <li
            class="about_item"
            v-for="(item, i) in gallery"
            :key="'about-item-' + i"
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
  title: string;
  txt: string;
}>();
</script>

<style scoped lang="scss">
.about {
  background-color: #fdfdff;
}

.about_main {
  padding: 5rem 0 10rem 0;
  @include bp($point_2) {
    padding: 6rem 0 3rem 0;
  }
}

.about_head {
  margin-bottom: 4rem;
  @include bp($point_2) {
    margin-bottom: 2.5rem;
  }
  h2 {
    font-size: 4rem;
    margin-bottom: 3rem;
    font-family: $font_2;
    font-weight: 500;
    @include bp($point_2) {
      font-size: 2.4rem;
      margin-bottom: 1.5rem;
    }
  }

  p {
    max-width: 110rem;
    color: $gray;
    @include bp($point_2) {
      max-width: 100%;
      font-size: 1.6rem;
    }
  }
}

.about_grid {
  display: grid;
  grid-template-areas:
    "a b d"
    "a c d";

  @include bp($point_2) {
    grid-template-areas:
      "a b b"
      "c c d";
  }

  li {
    &:nth-child(1) {
      grid-area: a;
      height: 70.2rem;
      @include bp($point_2) {
        height: auto;
      }
    }
    &:nth-child(2) {
      grid-area: b;
      height: 40.4rem;
      @include bp($point_2) {
        height: auto;
      }
    }
    &:nth-child(3) {
      grid-area: c;
      height: 29.8rem;
      @include bp($point_2) {
        height: auto;
      }
    }
    &:nth-child(4) {
      grid-area: d;
      height: 70.2rem;
      @include bp($point_2) {
        height: auto;
      }
    }
  }
}

.about_item {
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
