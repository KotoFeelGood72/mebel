<template>
  <div
    :class="[
      `products_slider products_slider_${products.id}`,
      { single_slider: single },
    ]"
    v-if="products && products.gallery_images"
  >
    <Swiper
      :slides-per-view="1"
      :space-between="20"
      :modules="[Navigation, Pagination]"
      :watchSlidesVisibility="true"
      :breakpoints="{
        320: {
          slidesPerView: 1.1,
          spaceBetween: 10,
          slidesOffsetBefore: 10,
          slidesOffsetAfter: 10,
        },
        768: {
          slidesPerView: 1,
          spaceBetween: 10,
          slidesOffsetBefore: 10,
          slidesOffsetAfter: 10,
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 10,
        },
      }"
      :navigation="{
        prevEl: `.products_prev_${products.id}`,
        nextEl: `.products_next_${products.id}`,
      }"
      @slideChange="updateCurrentSlide"
    >
      <SwiperSlide
        v-for="(item, i) in products.gallery_images"
        :key="'products-item-slide-' + products.id"
      >
        <a :href="item" :data-fancybox="'fancy-products-' + products.id">
          <img :src="item" />
        </a>
      </SwiperSlide>
    </Swiper>
    <div
      class="products_navigation"
      v-if="products.gallery_images && totalSlides > 2"
    >
      <div :class="`products_prev products_prev_${products.id}`">
        <Icons icon="bi:chevron-left" :size="30" />
      </div>
      <div class="products-pagination">
        <span class="fraction">
          {{ currentSlide }}
          <div class="total">/{{ totalSlides }}</div>
        </span>
      </div>
      <div :class="`products_next products_next_${products.id}`">
        <Icons icon="bi:chevron-right" :size="30" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import { ref } from "vue";

const props = defineProps<{
  products: any;
  single?: boolean;
}>();

const currentSlide = ref(1);
const totalSlides = ref(
  props.products?.gallery_images ? props.products.gallery_images.length : 0
);

const updateCurrentSlide = (swiper: any) => {
  currentSlide.value = swiper.realIndex + 1;
};
</script>

<style scoped lang="scss">
.products_slider {
  max-width: 74.5rem;
  position: relative;
  @include bp($point_2) {
    max-width: 100%;
    width: 100%;
  }

  :deep(.swiper) {
    height: 60.5rem;
    @include bp($point_2) {
      height: 22.3rem;
    }
  }

  .swiper-slide {
    @include flex-center;
    width: 100%;
    height: 100%;
  }

  a,
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.products_navigation {
  @include flex-space;
  margin-top: 3rem;
  user-select: none;

  @include bp($point_2) {
    display: none;
  }

  div {
    cursor: pointer;
    @include flex-center;

    &.swiper-button-disabled {
      opacity: 0.4;
      pointer-events: none;
    }
  }
}

.fraction {
  font-size: 2.4rem;
  @include flex-center;
  font-family: $font_2;
}
.total {
  font-size: 2rem;
  color: #ababab;
  padding-left: 0.5rem;
}

.single_slider {
  max-width: 99.5rem;
  margin-bottom: 3rem;
  :deep(.swiper) {
    height: auto;
  }

  a {
    @include flex-center;
    width: 100%;
    height: 100%;
  }

  @include bp($point_2) {
    max-width: 100%;
    margin-bottom: 0;
  }

  :deep(.swiper-slide) {
    height: 78.4rem;
    @include flex-center;
    @include bp($point_2) {
      height: 24rem;
    }
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
