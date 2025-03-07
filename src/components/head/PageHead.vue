<template>
  <div class="pagehead" :class="page">
    <div class="container">
      <div class="pagehead_main">
        <div class="pagehead__content">
          <h1>{{ data.title }}</h1>
          <div class="pagehead__txt">
            {{ data.txt }}
          </div>
          <div class="pagehead_btn" v-if="data.btn">
            <DefaultBtn
              name="Арендовать"
              type="secondary"
              color="black"
              size="large"
            />
          </div>
        </div>
        <div class="pagehead__img">
          <picture>
            <source
              :srcset="`${data.img}`"
              media="(min-width: 1024px)"
              type="image/jpeg"
            />
            <source
              :srcset="`${data.imgMobile}`"
              media="(min-width: 768px)"
              type="image/jpeg"
            />

            <img :src="`${data.imgMobile}`" />
          </picture>
          <!-- <img :src="data.img" alt="" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from "vue";
import DefaultBtn from "../ui/DefaultBtn.vue";

defineProps<{
  data: any;
  page?: string;
}>();
</script>

<style scoped lang="scss">
.pagehead {
  @include bp($point_2) {
    overflow-x: hidden;
  }
}
.pagehead_main {
  @include flex-start;
  padding-top: calc($header + 6.9rem);
  margin-bottom: 2.7rem;

  @include bp($point_2) {
    flex-direction: column;
    padding-top: 12rem;
  }

  h1 {
    line-height: 120%;
    font-size: 5rem;
    margin-bottom: 4.7rem;
    margin-right: -15rem;
    @include bp($point_2) {
      font-size: 2rem;
      margin: 0 0 2rem 0;
    }
  }
  .pagehead__txt {
    max-width: 70.6rem;
    @include bp($point_2) {
      font-size: 1.4rem;
      max-width: 100%;
    }
  }
}

.pagehead__img {
  max-width: 85rem;
  @include bp($point_2) {
    max-width: 100%;
    margin: -2rem -6rem 0 0;
  }
  img {
    @include bp($point_2) {
      @include flex-center;
      //   width: 50.1rem;
      width: 100%;
    }
  }
}

.pagehead_btn {
  margin-top: 4.3rem;
  display: inline-flex;
}

.rent {
  h1 {
    font-size: 6.5rem;
    line-height: 120%;
    @include bp($point_2) {
      font-size: 2rem;
      margin: 0 0 2rem 0;
    }
  }
  .pagehead_main {
    padding-left: 14.4rem;
    @include bp($point_2) {
      padding-left: 0;
    }
  }
}
</style>
