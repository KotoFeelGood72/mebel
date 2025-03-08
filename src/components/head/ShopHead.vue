<template>
  <div class="shophead">
    <div class="container">
      <div class="shophead__main">
        <div class="shophead__content">
          <h1>{{ title }}</h1>
          <p>
            {{ txt }}
          </p>
        </div>
        <div class="shophead_img__w">
          <div class="shophead__img">
            <img :src="img" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  title?: string;
  txt?: string;
  img?: string;
}>();
</script>

<style scoped lang="scss">
.shophead__main {
  @include flex-start;
  padding-left: 14.5rem;
  gap: 5rem;
  &:before {
    position: absolute;
    top: 0;
    right: 0;
    content: "";
    background-color: $lbrown;
    width: 100%;
    height: 100%;
    max-width: 95rem;
    max-height: 53.2rem;
    pointer-events: none;
    display: none;
    @include bp($point_2) {
      display: block;
    }
  }
  @include bp($point_2) {
    padding: 0 0 1rem 0;
    flex-direction: column;
  }

  h1 {
    font-size: 5rem;
    margin-bottom: 3rem;
    font-family: $font_1;
    @include bp($point_2) {
      position: relative;
      z-index: 2;
      font-size: 3rem;
      color: $white;
      margin-bottom: 1.7rem;
    }
  }
  p {
    color: $gray;
    font-size: 2.4rem;
    @include bp($point_2) {
      font-size: 1.6rem;
      color: $white;
    }
  }
}

.shophead__content {
  max-width: 60.4rem;
  margin-right: -4rem;
  padding: 10rem 0 17.9rem 0;
  @include bp($point_2) {
    margin-right: 0;
    padding: 4rem 0 0 0;
    max-width: 100%;
    position: relative;
    z-index: 2;
  }
}

.shophead {
  background-color: $light;
  padding-top: $header;
  position: relative;
  margin-bottom: 5rem;
  @include bp($point_2) {
    padding-top: 7.5rem;
    margin: 0;
    overflow-x: hidden;
  }
}

.shophead_img__w {
  z-index: 2;
  &:before {
    position: absolute;
    bottom: 0;
    right: 0;
    content: "";
    background-color: $lbrown;
    width: 100%;
    height: 100%;
    max-width: 95rem;
    max-height: 53.2rem;
    pointer-events: none;
    z-index: -1;
    @include bp($point_2) {
      display: none;
    }
  }
}

.shophead__img {
  max-width: 79.5rem;
  @include bp($point_2) {
    max-width: 120%;
    width: 120%;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
