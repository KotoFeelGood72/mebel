<template>
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
</template>

<script setup lang="ts">
import { Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import { ref, watch } from "vue";

const props = defineProps<{
  gallery: any;
}>();

// Управляем загрузкой
const loading = ref(true);

// Ссылка на экземпляр Swiper
const swiperInstance = ref<any>(null);

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
</script>

<style scoped lang="scss">
.products_slider {
  width: 50%;
  min-width: 50%;
  position: relative;
  @include bp($point_2) {
    max-width: 100%;
    width: 100%;
  }

  :deep(.swiper) {
    height: 60rem !important;
    height: 100%;
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

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60rem;
  font-size: 1.5rem;
  color: $lbrown;
  border-radius: 1rem;
  background-color: #b5a59679;
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

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
