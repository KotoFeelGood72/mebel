<template>
  <div class="orders">
    <div class="orders__head">№ {{ order.order_id }}</div>
    <div class="orders__main">
      <Swiper
        :slides-per-view="5.5"
        :space-between="25"
        :modules="[Navigation, Pagination]"
        :speed="700"
        :breakpoints="{
          320: {
            slidesPerView: 1.2,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 5.5,
            spaceBetween: 25,
          },
        }"
        :navigation="{
          prevEl: '.prev',
          nextEl: '.next',
        }"
        :pagination="{ el: '.order-pagination', clickable: true }"
      >
        <SwiperSlide
          v-for="(item, i) in order.items"
          :key="'order-item-slide-' + i"
        >
          <RouterLink :to="`/shop/products/${item.slug}`">
            <div class="order">
              <div class="order_img">
                <img :src="item.image_url" />
              </div>
              <div class="order__content">
                <h3>{{ item.name }}</h3>
                <p>
                  Цвет: <span>{{ item.color }}</span>
                </p>
              </div>
            </div>
          </RouterLink>
        </SwiperSlide>
      </Swiper>
      <div class="order__nav">
        <div class="order__btn prev">
          <Icons icon="bi:chevron-left" :size="30" />
        </div>
        <div class="order__btn next">
          <Icons icon="bi:chevron-right" :size="30" />
        </div>
      </div>
      <div class="order-pagination"></div>
    </div>
    <div class="orders__footer">
      <h4>Данные доставки</h4>
      <p>Адрес доставки</p>
      <span>{{ order.billing_address.address_1 }}</span>
    </div>
    <div class="orders__total">
      Сумма заказа: <b>{{ order.total }}</b>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";

const props = defineProps<{
  order: any;
}>();
</script>

<style scoped lang="scss">
.orders__head {
  margin-bottom: 2rem;
  color: $gray;
  font-family: $font_2;

  @include bp($point_2) {
    padding: 2rem 0 0 2rem;
  }
}

.order_img {
  width: 100%;
  @include flex-center;
  height: 17.9rem;
  margin-bottom: 1.3rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.order__content {
  h3 {
    font-size: 1.6rem;
    font-family: $font_3;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.6rem;
    @include flex-start;
    gap: 1rem;
    span {
      color: $brown;
    }
  }
}

.orders__main {
  border-bottom: 0.1rem solid #cbcbcb;
  position: relative;
  @include bp($point_2) {
    padding-left: 2rem;
  }
  :deep(.swiper) {
    padding-bottom: 3.6rem;
    @include bp($point_2) {
      padding-bottom: 2.5rem;
    }
  }
}

.orders__footer {
  padding: 2rem 0 2.7rem 0;
  border-bottom: 0.1rem solid #cbcbcb;
  @include bp($point_2) {
    padding: 2rem;
  }
  p {
    margin: 2.5rem 0 1.5rem 0;
    font-size: 1.8rem;
    font-family: $font_2;
    @include bp($point_2) {
      margin: 2.5rem 0 1rem 0;
    }
  }
}

.orders__total {
  padding-top: 2.4rem;
  @include bp($point_2) {
    padding: 2rem;
  }
}

.order__nav {
  position: absolute;
  top: 35%;
  left: 50%;
  transform: translate(-50%, -50%);
  @include flex-space;
  width: calc(100% + 11rem);
  z-index: 101;
  pointer-events: none;
  div {
    cursor: pointer;
    pointer-events: all;
    &.swiper-button-disabled {
      pointer-events: none;
      opacity: 0.2;
    }
  }
}
</style>
