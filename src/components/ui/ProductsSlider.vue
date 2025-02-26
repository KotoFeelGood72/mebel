<template>
  <div class="products-sliders">
    <div class="isStock" :class="[isStock]">
      {{ isStockText }}
    </div>
    <div
      :class="[
        `products_slider products_slider_${gallery?.id}`,
        { single_slider: gallery },
      ]"
      v-if="gallery"
    >
      <div v-if="loading" class="loader">
        <Icons icon="svg-spinners:ring-resize" :size="100" />
      </div>
      <Swiper
        v-else
        :slides-per-view="1"
        :space-between="20"
        :modules="[Navigation, Pagination, Thumbs]"
        :watchSlidesVisibility="true"
        :thumbs="{ swiper: thumbsSwiper }"
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
          prevEl: `.products_prev_${gallery.id}`,
          nextEl: `.products_next_${gallery.id}`,
        }"
        @swiper="onSwiperInit"
      >
        <SwiperSlide
          v-for="(item, i) in gallery.gallery_images"
          :key="'products-item-slide-' + gallery.id + '-' + i"
        >
          <a :href="item" :data-fancybox="'fancy-products-' + gallery.id">
            <img :src="item" />
          </a>
        </SwiperSlide>
      </Swiper>

      <div
        class="products_navigation"
        v-if="gallery && gallery.gallery_images && !loading"
      >
        <div :class="`products_prev products_prev_${gallery.id}`">
          <Icons icon="iconamoon:arrow-left-2-thin" :size="70" />
        </div>
        <div :class="`products_next products_next_${gallery.id}`">
          <Icons icon="iconamoon:arrow-right-2-thin" :size="70" />
        </div>
      </div>
    </div>
    <div class="products_thumbnails">
      <Swiper
        v-if="gallery.gallery_images"
        :slides-per-view="5"
        :space-between="10"
        :modules="[Thumbs]"
        @swiper="setThumbsSwiper"
        :breakpoints="{
          320: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 4,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 5,
            spaceBetween: 5,
          },
        }"
      >
        <SwiperSlide
          v-for="(item, i) in gallery.gallery_images"
          :key="'products-thumbnail-slide-' + gallery.id + '-' + i"
        >
          <img :src="item" />
        </SwiperSlide>
      </Swiper>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Navigation, Pagination, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import { computed, ref, watch } from "vue";

const props = defineProps<{
  gallery: any;
  isStock: string;
}>();

// Управляем загрузкой
const loading = ref(true);

// Ссылка на экземпляр Swiper
const swiperInstance = ref<any>(null);

// Ссылка на слайдер для миниатюр
const thumbsSwiper = ref<any>(null);

// Метод для установки слайдера миниатюр
const setThumbsSwiper = (swiper: any) => {
  thumbsSwiper.value = swiper;
};

// Метод для инициализации Swiper
const onSwiperInit = (swiper: any) => {
  swiperInstance.value = swiper;
};

// Слушатель изменений props
watch(
  () => props.gallery,
  (newGallery, oldGallery) => {
    if (newGallery && newGallery !== oldGallery) {
      // Отображаем загрузчик
      loading.value = true;

      // Сбрасываем на первый слайд
      if (swiperInstance.value) {
        swiperInstance.value.slideTo(0, 0); // Аргументы: индекс, скорость перехода (0 = мгновенно)
      }

      // Симуляция загрузки
      setTimeout(() => {
        loading.value = false;
      }, 1000); // Задержка для демонстрации загрузки
    }
  },
  { immediate: true }
);

const isStockText = computed(() => {
  switch (props.isStock) {
    case "outofstock":
      return "Нет в наличии";
    case "instock":
      return "В наличии";
    case "onbackorder":
      return "Предзаказ";
    default:
      break;
  }
});
</script>

<style scoped lang="scss">
.products-sliders {
  width: 50%;
  min-width: 50%;
  position: relative;

  @include bp($point_2) {
    width: 100%;
  }
}
.products_slider {
  position: relative;
  @include bp($point_2) {
    max-width: 100%;
    width: 100%;
  }

  :deep(.swiper) {
    height: 55rem !important;
    height: 100%;
    @include bp($point_2) {
      height: 22.3rem !important;
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

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 55rem;
  font-size: 1.5rem;
  color: $lbrown;
  border-radius: 1rem;
  background-color: #b5a59679;

  @include bp($point_2) {
    height: 22.3rem;
  }
}

.products_navigation {
  @include flex-space;
  user-select: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 100%;
  height: 100%;
  z-index: 11;
  pointer-events: none;

  @include bp($point_2) {
    display: none;
  }

  div {
    pointer-events: all;
    cursor: pointer;
    @include flex-center;
    height: 100%;
    background-color: #b5a59617;
    backdrop-filter: blur(2px);
    color: $brown;
    transition: all 0.3s ease-in-out;
    &:hover {
      background-color: #b5a59680;
    }

    &.swiper-button-disabled {
      opacity: 0.4;
      pointer-events: none;
      color: $gray;
    }
  }
}

.fraction {
  font-size: 2.4rem;
  @include flex-center;
  font-family: $font_2;
}

.single_slider {
  margin-bottom: 1rem;
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.products_thumbnails {
  margin-top: 1rem;
  max-width: 100%;

  @include bp($point_2) {
    padding: 0 1rem;
  }

  :deep(.swiper) {
    height: 12rem !important;
    @include bp($point_2) {
      height: 7rem !important;
    }
  }
  .swiper-slide {
    width: auto;
    height: auto;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      // border: 0.2rem solid transparent;
      transition: border-color 0.3s ease;
    }
  }
}

:deep(.swiper-slide-thumb-active) {
  img {
    border: 0.2rem solid $brown;
  }
}

.isStock {
  position: absolute;
  top: 2rem;
  left: 2rem;
  z-index: 88;
  padding: 0.7rem 2rem;
  border-radius: 0.4rem;
  font-size: 1.4rem;
  font-family: $font_2;
  color: $white;

  &.instock {
    background-color: #2cc840;
  }

  &.outofstock {
    background-color: #eb1d1d;
  }
  &.onbackorder {
    background-color: #eb8e1dff;
  }
}
</style>
