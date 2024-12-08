<template>
  <div class="products" v-if="products" :class="{ reverse: reverse }">
    <ProductsSlider :gallery="activeVariation" class="product-sliders" />
    <div class="products_content">
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
        <ColorSelect
          :id="products.id"
          :colors="products.variations"
          v-model="selectedColor"
        />
        <div class="products_prices">
          <p>{{ variationPrice }} ₽</p>
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
              @clear="removeCart(findVariationId)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductVariation } from "@/composables/useProductVariation";
import AddToCart from "../ui/AddToCart.vue";
import ProductsSlider from "../ui/ProductsSlider.vue";
import ColorSelect from "../ui/ColorSelect.vue";
import Qty from "../ui/Qty.vue";
import { ref, watch } from "vue";

const props = withDefaults(
  defineProps<{
    products: any;
    reverse: boolean;
  }>(),
  {
    products: null,
    reverse: false,
  }
);

const productRef = ref(props.products);

const {
  selectedColor,
  variationPrice,
  isCarts,
  cartItem,
  selectedQuantity,
  toggleCart,
  updateQuantity,
  findVariationId,
  removeCart,
} = useProductVariation(productRef);

const activeVariation = ref(null);

// Watcher для обновления активной вариации
watch(
  selectedColor,
  (newColor) => {
    activeVariation.value = productRef.value?.variations?.find(
      (variation: any) => variation.attributes?.pa_colors === newColor
    );
  },
  { immediate: true }
);
</script>

<style scoped lang="scss">
.products {
  @include flex-start;
  gap: 16.5rem;

  @include bp($point_2) {
    flex-direction: column;
    gap: 1.8rem;
  }

  &.reverse {
    .products_content {
      order: 0;
    }

    :deep(.product-sliders) {
      order: 1;
    }
  }
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
