<template>
  <div class="hero_slider">
    <div class="container">
      <Swiper
        :slides-per-view="1"
        :modules="[Navigation, Pagination, Autoplay]"
        :speed="700"
        :space-between="20"
        :loop="true"
        :autoplay="{
          delay: 2000,
          disableOnInteraction: false,
        }"
        :navigation="{
          prevEl: '.hero_prev',
          nextEl: '.hero_next',
        }"
        :pagination="{ el: '.hero-pagination', clickable: true }"
      >
        <SwiperSlide
          v-for="(item, i) in slides"
          :key="'hero-item-slide-' + item.id"
          @click="router.push('/shop/')"
        >
          <div class="hero_slide">
            <!-- <div class="hero_slide__content">
              <p>{{ item.headtitle }}</p>
              <h1>{{ item.title }}</h1>
              <span>{{ item.subtitle }}</span>
              <div class="hero__link">
                <DefaultBtn
                  name="Купить"
                  type="secondary"
                  color="black"
                  size="large"
                  @click="router.push('/shop/')"
                />
              </div>
            </div> -->
            <div class="hero_slide__img">
              <img :src="item.img.url" alt="" class="desktop_img" />
              <img :src="item.mobile_img.url" alt="" class="mobile_img" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
      <div class="hero_navigation">
        <div class="hero_prev">
          <img src="@/assets/icons/arrow-right.svg" />
        </div>
        <div class="hero_next">
          <img src="@/assets/icons/arrow-left.svg" />
        </div>
      </div>
      <div class="hero-pagination"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import DefaultBtn from "../ui/DefaultBtn.vue";
import { useRouter } from "vue-router";

const router = useRouter();
defineProps<{
  slides?: any;
}>();
</script>

<style lang="scss" scoped>
:deep(.container) {
  position: relative;
}

.hero_slider {
  // background-color: $light;
  padding-top: calc($header + 2rem);
  @include bp($point_2) {
    padding-top: 8.3rem;
  }
}

.hero_slide {
  @include flex-space;
  width: 100%;
  // padding-left: 14.5rem;
  // z-index: -1;
  position: relative;
  border-radius: 2.4rem;
  overflow: hidden;

  @include bp($point_2) {
    // padding: 4rem 1.6rem;
    // width: 100%;
    // padding: 4rem 0 0 1.6rem;
  }

  // .hero_slide__content {
  //   max-width: 78.9rem;
  //   @include bp($point_2) {
  //     max-width: 100%;
  //     z-index: 1;
  //     width: 100%;
  //     position: relative;
  //     padding-bottom: 7rem;
  //   }

  //   & > p {
  //     font-size: 3rem;
  //     color: $brown;
  //     font-family: $font_2;
  //     margin-bottom: 2.5rem;
  //     @include bp($point_2) {
  //       font-size: 1.8rem;
  //       margin-bottom: 1.5rem;
  //     }
  //   }

  //   h1 {
  //     font-size: 6.5rem;
  //     line-height: 120%;
  //     margin-bottom: 2rem;
  //     margin-right: -7rem;
  //     @include bp($point_2) {
  //       font-size: 3rem;
  //       margin-right: 0;
  //       max-width: 26.1rem;
  //       margin-bottom: 26.3rem;
  //     }
  //   }

  //   span {
  //     font-size: 2.4rem;
  //     color: $gray;
  //     margin-bottom: 5.2rem;
  //     display: block;
  //     @include bp($point_2) {
  //       font-size: 1.6rem;
  //       margin-bottom: 3rem;
  //       max-width: 28rem;
  //       display: flex;
  //     }
  //   }
  // }

  .hero_slide__img {
    box-shadow: 0 0 1rem 0 #00000033;
    border-radius: 2.4rem;
    overflow: hidden;
    @include bp($point_2, $direction: min) {
      max-height: 59rem;
      height: 100%;
    }

    // min-width: 84.9rem;

    // @include bp($point_2) {
    //   min-width: 120%;
    //   position: absolute;
    //   top: 5%;
    //   z-index: 0;
    //   right: -10%;
    // }

    // img {
    //   @include flex-center;
    //   width: 100%;
    //   height: 100%;
    // }
  }
}

.hero__link {
  display: inline-flex;
  position: relative;
  z-index: 99;

  @include bp($point_2) {
    // padding: 0 1.6rem 0 0;
    display: flex;
  }
}

.hero_navigation {
  @include flex-space;
  width: 100%;
  position: absolute;
  top: 47%;
  left: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
  z-index: 33;

  div {
    cursor: pointer;
    pointer-events: all;

    &.swiper-button-disabled {
      opacity: 0.4;
      pointer-events: none;
      cursor: no-drop;
    }
  }

  .hero_prev,
  .hero_next {
    color: #9d9d9d;
    &:hover {
      color: $brown;
    }
  }
}

// .swiper-slide {
//   opacity: 0;
//   transition: all 0.3s ease-in-out;
//   &-active {
//     opacity: 1;
//   }
// }

.hero_slide__content,
.hero_slide__img {
  // opacity: 0;
  // transform: translateX(-5rem);
  transition: all 0.7s ease;
  @include bp($point_2) {
    // transform: translateX(0);
  }
}

// .swiper-slide-active .hero_slide__content,
// .swiper-slide-active .hero_slide__img {
//   opacity: 1;
//   transform: translateX(0);
// }

.hero-pagination {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  bottom: 4rem;
  z-index: 22;
  @include flex-center;
  gap: 3rem;
  @include bp($point_2) {
    bottom: 3rem;
  }
}

:deep(.swiper-pagination-bullet) {
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 100%;
  border: 0.1rem solid $brown;
  background-color: $white;
  transition: all 0.3s ease-in-out;
  cursor: pointer;
}

:deep(.swiper-pagination-bullet-active) {
  background-color: $lbrown;
}

.hero_slider * {
  z-index: 0;
  // transition: none !important;

  &.container {
    @include bp($point_2) {
      padding: 0;
    }
  }
}

.hero__link {
  z-index: 9999 !important;
}
.hero_navigation {
  pointer-events: none;
  @include bp($point_2) {
    display: none;
  }
}

.desktop_img {
  @include flex-center;
  width: 100%;
  height: 100%;
  @include bp($point_2) {
    display: none;
  }
}
.mobile_img {
  display: none;
  @include bp($point_2) {
    @include flex-center;
    width: 100%;
    height: 100%;
  }
}
</style>
