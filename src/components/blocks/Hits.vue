<template>
  <div class="hits" v-if="products">
    <div class="container">
      <div class="hits_main p10">
        <div class="hits__title">
          <h2>{{ title ? title : "Хиты продаж" }}</h2>
        </div>
        <swiper
          :slides-per-view="3"
          :space-between="20"
          :breakpoints="{
            320: {
              slidesPerView: 1.2,
              spaceBetween: 10,
              slidesOffsetBefore: 10,
              slidesOffsetAfter: 10,
            },
            768: {
              slidesPerView: 1.5,
              spaceBetween: 10,
              slidesOffsetBefore: 10,
              slidesOffsetAfter: 10,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 30,
            },
          }"
        >
          <swiper-slide
            v-for="(item, i) in products"
            :key="`hits-item-${i}`"
            class="hits_item"
          >
            <RouterLink :to="`/shop/products/${item.id}`">
              <div class="hits_item__content">
                <span>{{ getStockStatus(item.stock) }}</span>
                <h3>{{ item.title }}</h3>
                <div class="hits_item__price">
                  <span>{{ item.price }} ₽</span>
                  <span class="item__oldprice" v-if="item.sale_price"
                    >{{ item.regular_price }} ₽</span
                  >
                </div>
              </div>
              <div class="hits_item__img">
                <img :src="item.acf?.featured_img.url" />
              </div>
            </RouterLink>
          </swiper-slide>
        </swiper>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";

defineProps<{
  title?: string;
  products: any;
}>();

const getStockStatus = (status: string) => {
  return status === "In stock" ? "В наличии" : "Не в наличии";
};
</script>

<style scoped lang="scss">
.hits {
  .container {
    @include bp($point_2) {
      padding: 0;
    }
  }
}
.hits_main {
  margin-top: 5rem;
  @include bp($point_2) {
    margin-top: 0;
    padding-top: 2.5rem;
  }
}

.hits__title {
  font-size: 5rem;
  margin-bottom: 4.5rem;
  @include bp($point_2) {
    font-size: 2.6rem;
    padding: 0 1.6rem;
    margin-bottom: 2rem;
  }
}

.swiper-slide {
  display: flex;
  justify-content: center;
}

.hits_item {
  background-color: $light;
  position: relative;
  overflow: hidden;
  a {
    @include flex-start;
    @include bp($point_2) {
      height: 18rem;
    }
  }
  &:hover {
    h3 {
      color: $brown;
    }
    &:before {
      transform: scale(1);
      opacity: 0.2;
      visibility: visible;
    }
    img {
      transform: rotate(5deg);
    }
  }
}

.hits_item__content {
  padding: 2.7rem 2.7rem;
  flex-direction: column;
  align-items: flex-start;
  display: flex;
  gap: 4.5rem;
  z-index: 2;
  @include bp($point_2) {
    // max-width: 14.1rem;
    gap: 0.5rem;
    padding: 1.5rem 0 1.5rem 1.5rem;
  }
  span {
    font-size: 1.2rem;
    color: $brown;
    text-transform: uppercase;
  }
  h3 {
    font-size: 2.4rem;
    transition: all 0.3s ease-in-out;
    max-width: 30rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    @include bp($point_2) {
      font-size: 1.8rem;
      padding: 1.5rem 0 2rem 0;
      max-height: 6.6rem;
      font-family: $font_2;
      font-weight: 500;
    }
  }
}

.hits_item__price {
  color: $brown;
  gap: 2rem;
  display: flex;
  gap: 1rem;
  span {
    font-size: 2rem;
    font-family: $font_2;
  }
}

.item__oldprice {
  color: $gray !important;
  text-decoration: line-through;
  font-size: 1.4rem !important;
}

.hits_item__img {
  width: 25rem;
  z-index: 2;
  @include bp($point_2) {
    max-width: 16rem;
  }
  img {
    transition: all 0.5s ease-in-out;
    z-index: 2;
    width: 100%;
  }
}
</style>
