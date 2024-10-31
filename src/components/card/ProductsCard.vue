<template>
  <div class="products">
    <div
      :class="`products_slider products_slider_${products.id}`"
      v-if="products && products.gallery_images"
    >
      <Swiper
        :slides-per-view="1"
        :space-between="20"
        :modules="[Navigation, Pagination]"
        :breakpoints="{
          320: {
            slidesPerView: 1.2,
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
    <div class="products_content">
      <!-- <yandex-pay-badge
        merchant-id="<YOUR_MERCHANT_ID>"
        type="bnpl"
        amount="1000.00"
        size="l"
        variant="detailed"
        theme="light"
        align="left"
        color="primary"
      /> -->
      <div class="products_content__head">
        <h3>{{ products.title }}</h3>
        <div class="products_description">
          {{ products.acf.about_txt_product }}
        </div>
        <RouterLink :to="`/shop/products/${products.id}`"
          >Подробнее о товаре</RouterLink
        >
      </div>
      <div class="products_content_bottom">
        <ul class="products_color_select">
          <li
            v-for="(color, index) in products.attributes.pa_colors"
            :key="index"
          >
            <input
              type="radio"
              :id="'color-' + index + '-' + products.id"
              :value="color"
              v-model="selectedColor"
              @change="updateCart"
            />
            <label :for="'color-' + index + '-' + products.id">
              <span :style="{ backgroundColor: colorMap[color] }"></span>
            </label>
          </li>
        </ul>
        <div class="products_color_selected">
          Цвет: <span>{{ selectedColor }}</span>
        </div>
        <div class="products_prices">
          <p>{{ products.price }} ₽</p>
          <div class="products_prices__right">
            <AddToCart
              :active="isCarts"
              :name="isCarts ? 'В корзине' : 'В корзину'"
              icon="custom:cart"
              @click="toggleCart"
            />
            <Qty
              :initialQuantity="cartItem?.quantity || selectedQuantity"
              v-if="isCarts"
              @updateQuantity="updateQuantity"
              @clear="removeCart(products)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import { Navigation, Pagination } from "swiper/modules";
import { useCartStore, useCartStoreRefs } from "@/stores/useCartStore";
import AddToCart from "../ui/AddToCart.vue";
import { ref, computed } from "vue";
import Qty from "../ui/Qty.vue";
import { useToast } from "vue-toastification";

// Используем Pinia store
const { addCart, removeCart, updateCartItem } = useCartStore();
const { carts } = useCartStoreRefs();

// Пропсы
const props = withDefaults(
  defineProps<{
    products: any;
  }>(),
  {
    products: null,
  }
);

// Реактивные переменные
const currentSlide = ref(1);
const totalSlides = ref(
  props.products?.gallery_images ? props.products.gallery_images.length : 0
);
const toast = useToast();
const cartItem = computed(() =>
  carts.value.find((cart: any) => cart.id === props.products?.id)
);

const selectedQuantity = ref(cartItem.value ? cartItem.value.quantity : 1);
const selectedColor = ref(
  props.products?.attributes?.pa_colors &&
    props.products.attributes.pa_colors.length > 0
    ? props.products.attributes.pa_colors[0]
    : null
);

// Карта цветов для визуального отображения
const colorMap: Record<string, string> = {
  Бежевый: "#D8D1B6",
  Зелёный: "#547C51",
  Серый: "#5B5E62",
  Темный: "#342F2F",
  ["Светло-жёлтый"]: "#EAECD7",
  Черный: "#000000",
  "Тёмно-серый": "#909090",
};

// Проверка, находится ли товар в корзине
const isCarts = computed(() =>
  carts.value.some((cart: any) => cart.id === props.products.id)
);

// Обновляем текущее количество слайдов
const updateCurrentSlide = (swiper: any) => {
  currentSlide.value = swiper.realIndex + 1;
};

// Метод для добавления или удаления товара из корзины
const toggleCart = () => {
  if (isCarts.value) {
    removeCart(props.products);
    toast.error("Удалено из корзины");
  } else {
    addCart({
      ...props.products,
      quantity: selectedQuantity.value,
      color: selectedColor.value,
    });
    toast.success("Добавлено в корзину");
  }
};

// Обновляем корзину при изменении цвета или количества
const updateCart = () => {
  if (isCarts.value) {
    updateCartItem({
      id: props.products.id,
      color: selectedColor.value,
      quantity: selectedQuantity.value,
    });
  }
};

// Обновляем количество товара
const updateQuantity = (quantity: number) => {
  selectedQuantity.value = quantity;
  updateCart();
};
</script>

<style scoped lang="scss">
.products {
  @include flex-start;
  gap: 16.5rem;

  @include bp($point_2) {
    flex-direction: column;
    gap: 1.8rem;
  }
}

.products_slider {
  max-width: 74.5rem;
  position: relative;
  @include bp($point_2) {
    max-width: 100%;
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

.products_content {
  @include bp($point_2) {
    max-width: 100%;
    padding: 0 1.6rem;
  }
}

.products_content__head {
  margin-bottom: 8rem;
  @include bp($point_2) {
    margin-bottom: 3.5rem;
  }
  h3 {
    font-size: 4rem;
    margin-bottom: 3rem;
    @include bp($point_2) {
      font-size: 2.4rem;
      margin-bottom: 1.5rem;
    }
  }

  a {
    color: $brown;
    font-size: 2.4rem;
    font-family: $font_2;
    text-decoration: underline;
    text-underline-position: under;
    display: inline-flex;

    @include bp($point_2) {
      font-size: 2rem;
    }
    &:hover {
      text-decoration: none;
    }
  }
}

.products_description {
  margin-bottom: 3.5rem;
  color: $gray;

  @include bp($point_2) {
    font-size: 1.6rem;
    margin-bottom: 2rem;
  }
}

.products_color_select {
  @include flex-start;
  margin-bottom: 3.5rem;
  gap: 2.1rem;
  @include bp($point_2) {
    gap: 1.5rem;
    margin-bottom: 2rem;
  }
  li {
    width: 3.5rem;
    height: 3.5rem;
  }

  input {
    display: none;
    &:checked + label {
      border: 0.1rem solid $brown;
      span {
        transform: scale(0.8);
      }
    }
  }

  label {
    width: 100%;
    height: 100%;
    @include flex-center;
    cursor: pointer;
    span {
      transition: all 0.3s ease-in-out;
      width: 100%;
      @include flex-center;
      height: 100%;
    }
  }
}

.products_color_selected {
  margin-bottom: 7rem;
  font-size: 2.4rem;
  font-family: $font_2;
  @include flex-start;
  gap: 0.5rem;
  @include bp($point_2) {
    font-size: 1.6rem;
    margin-bottom: 3rem;
  }
  span {
    color: $brown;
    font-size: 2rem;
    font-family: $font_1;
    @include bp($point_2) {
      font-size: 1.6rem;
    }
  }
}

.products_prices {
  @include flex-start;
  gap: 10rem;
  @include bp($point_2) {
    flex-direction: column;
    gap: 3rem;
    align-items: flex-start;
  }
  p {
    font-size: 4rem;
    font-family: $font_2;
    @include bp($point_2) {
    }
  }
}

.products_prices__right {
  @include flex-end;
  gap: 3.1rem;
  user-select: none;
  @include bp($point_2) {
    width: 100%;
  }
}
</style>
