<template>
  <div class="single" v-if="productPage">
    <div class="products">
      <div class="container">
        <Breadcrumbs :crumbs="breadcrumbs" />
        <div class="products_main">
          <div class="products_slider" v-if="productPage.gallery_images">
            <Swiper
              :slides-per-view="1"
              :space-between="20"
              :modules="[Navigation, Pagination]"
              :navigation="{
                prevEl: `.products_prev`,
                nextEl: `.products_next`,
              }"
              @slideChange="updateCurrentSlide"
            >
              <SwiperSlide
                v-for="(item, i) in productPage.gallery_images"
                :key="'products-item-slide-' + i"
              >
                <img :src="item" />
              </SwiperSlide>
            </Swiper>
            <div class="products_navigation">
              <div class="products_prev">
                <Icons name="bi:chevron-left" :size="30" />
              </div>
              <div class="products-pagination">
                <span class="fraction"
                  >{{ currentSlide }}
                  <div class="total">/{{ totalSlides }}</div></span
                >
              </div>
              <div class="products_next">
                <Icons name="bi:chevron-right" :size="30" />
              </div>
            </div>
          </div>
          <div class="products_content">
            <div class="products_content__head">
              <h3>{{ productPage.title }}</h3>
              <div class="products_art">Артикул {{ productPage.sku }}</div>
            </div>
            <div
              class="products_content_bottom"
              v-if="productPage && productPage.attributes?.pa_colors"
            >
              <ColorSelect
                :id="productPage.slug"
                :colors="productPage.attributes.pa_colors"
                v-model="selectedColor"
              />

              <div class="products_prices">
                <p>{{ productPage.price }} ₽</p>
                <div class="product_cart__row">
                  <AddToCart
                    :center="true"
                    :active="isCarts"
                    :name="isCarts ? 'В корзине' : 'Добавить в корзину'"
                    icon="custom:cart"
                    @click="toggleCart()"
                  />
                  <Qty
                    :initialQuantity="cartItem?.quantity || selectedQuantity"
                    v-if="isCarts"
                    @updateQuantity="updateQuantity"
                    @clear="removeCart(product)"
                  />
                </div>
              </div>
              <ul class="products__nav">
                <li>
                  <a href="#"
                    ><p>Характеристики</p>
                    <Icons name="fluent:chevron-right-28-regular" />
                  </a>
                </li>
                <li>
                  <a href="#"
                    ><p>Отзывы</p>
                    <Icons name="fluent:chevron-right-28-regular" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
    <SingleAbout
      v-if="productPage.acf.galereya"
      :gallery="productPage.acf.galereya"
      :title="productPage.acf.about_product"
      :txt="productPage.acf.about_txt_product"
    />
    <SingleCharacter
      :title="productPage.acf.character_title"
      :img="productPage.acf.character_img.url"
      :list="productPage.acf.character_list"
    />
    <SingleIdeas :gallery="productPage.acf.ideas_gallery" />
  </div>
</template>

<script setup lang="ts">
import SingleCharacter from "@/components/single/SingleCharacter.vue";
import SingleIdeas from "@/components/single/SingleIdeas.vue";
import SingleAbout from "@/components/single/SingleAbout.vue";
import ColorSelect from "@/components/ui/ColorSelect.vue";
import AddToCart from "@/components/ui/AddToCart.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Navigation, Pagination } from "swiper/modules";
import Breadcrumbs from "@/components/ui/Breadcrumbs.vue";
import Qty from "@/components/ui/Qty.vue"; // Импортируем компонент для количества
import { useProductsStore } from "@/stores/useProductsStore";
import { useRoute } from "vue-router";
import { ref, computed, onMounted } from "vue";
import { useCartStore, useCartStoreRefs } from "@/stores/useCartStore";
import { useToast } from "vue-toastification";
import { watch } from "vue";
import { useProductPage } from "@/services/useProductPage";
import "swiper/swiper-bundle.css";
const { removeCart, addCart, updateCartItem } = useCartStore();
const { carts } = useCartStoreRefs();
const { useGetProductPage, productPage } = useProductPage();

const currentSlide = ref(1);

const product = ref<any>();
const totalSlides = ref();
const { getProductBySlug } = useProductsStore();
const route = useRoute();
const toast = useToast();
const breadcrumbs = ref([
  { text: "Каталог", href: "/shop" },
  { text: "Бескаркасное кресло империал" },
]);
const isCarts = computed(() =>
  carts.value.some((cart: any) => cart.id === productPage.value.id)
);

const cartItem = computed(() =>
  carts.value.find((cart: any) => cart.id === productPage.value?.id)
);

const selectedQuantity = ref(cartItem.value ? cartItem.value.quantity : 1);
const selectedColor = ref(
  cartItem.value
    ? cartItem.value.color
    : productPage.value?.attributes?.pa_colors[0] || ""
);

const toggleCart = () => {
  if (isCarts.value) {
    removeCart(productPage.value);
    toast.error("Удалено из корзины");
  } else {
    addCart({
      ...productPage.value,
      quantity: selectedQuantity.value,
      color: selectedColor.value,
    });
    toast.success("Добавлено в корзину");
  }
};

watch(cartItem, (newVal) => {
  if (newVal) {
    selectedQuantity.value = newVal.quantity;
    selectedColor.value = newVal.color;
  }
});

const updateCart = () => {
  if (isCarts.value) {
    updateCartItem({
      id: productPage.value.id,
      color: selectedColor.value,
      quantity: selectedQuantity.value,
    });
  }
};

const updateQuantity = (quantity: number) => {
  selectedQuantity.value = quantity;
  updateCart();
};

// Обновляем текущее состояние слайда
const updateCurrentSlide = (swiper: any) => {
  currentSlide.value = swiper.realIndex + 1;
};

// Карта цветов
const colorMap: Record<string, string> = {
  Бежевый: "#D8D1B6",
  Зелёный: "#547C51",
  Серый: "#5B5E62",
  Темный: "#342F2F",
  ["Светло-жёлтый"]: "#EAECD7",
  Черный: "#000000",
  "Тёмно-серый": "#909090",
};

// Обновление цвета
const updateSelectedColor = (color: string) => {
  selectedColor.value = color;
  console.log(color);
};

onMounted(async () => {
  useGetProductPage(String(route.params.id));
  // product.value = await getProductBySlug(route.params.slug[1]);
  if (cartItem.value) {
    selectedQuantity.value = cartItem.value.quantity;
    selectedColor.value = cartItem.value.color;
  }

  if (productPage.value && productPage.value.gallery_images) {
    totalSlides.value = productPage.value.gallery_images.length;
  }
});
</script>

<style scoped lang="scss">
.products {
  padding-top: calc($header + 4.6rem);
  @include bp($point_2) {
    padding-top: 7.5rem;
  }
}

.products_main {
  @include flex-start;
  gap: 16.5rem;
  align-items: flex-start;
  @include bp($point_2) {
    flex-direction: column;
    gap: 2rem;
  }
}

.products_slider {
  max-width: 99.5rem;
  margin-bottom: 3rem;

  @include bp($point_2) {
    max-width: 100%;
    margin-bottom: 0;
  }

  :deep(.swiper-slide) {
    height: 78.4rem;
    // height: 100%;
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

.products_content__head {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  margin-bottom: 5.6rem;
  @include bp($point_2) {
    gap: 1.5rem;
    margin-bottom: 3rem;
  }
  h3 {
    font-size: 4rem;
    @include bp($point_2) {
      font-size: 2.4rem;
    }
  }
  .products_art {
    color: $brown;
  }
}

.products_prices {
  font-size: 4rem;
  font-family: $font_2;
  margin-bottom: 8rem;
  @include bp($point_2) {
    margin-bottom: 3.5rem;
    font-size: 2.2rem;
  }
  p {
    margin-bottom: 7rem;
    @include bp($point_2) {
      margin-bottom: 3rem;
    }
  }
}

.products__nav {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  @include bp($point_2) {
    gap: 1.5rem;
  }
  li {
    &:first-child {
      border-bottom: 0.1rem solid #d5d5d5;
      padding-bottom: 2rem;
      @include bp($point_2) {
        padding-bottom: 1.5rem;
      }
    }
    a {
      @include flex-space;
      color: $brown;
      font-size: 2.4rem;
      font-family: $font_2;
      @include bp($point_2) {
        font-size: 1.6rem;
      }
    }
  }
}

.products_navigation {
  @include flex-space;
  margin-top: 3rem;

  @include bp($point_2) {
    display: none;
  }

  .products_prev,
  .products_next {
    color: $brown;
    cursor: pointer;
  }
  div {
    @include flex-center;
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

.product_cart__row {
  @include flex-start;
  gap: 2rem;
  :deep(.button) {
    flex-grow: 1;
  }
}
</style>
