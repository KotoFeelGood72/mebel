<template>
  <div class="products" v-if="products" :class="{ reverse: reverse }">
    <ProductsSlider
      :gallery="activeVariation"
      class="product-sliders"
      :isStock="variationStock"
    />
    <div class="products_content">
      <div class="products_content__head">
        <RouterLink
          class="product_title"
          :to="`/shop/products/${products.slug}`"
          ><h3>{{ products.title }}</h3></RouterLink
        >
        <div class="products_description">
          {{ products.acf.about_txt_product }}
        </div>
        <RouterLink :to="`/shop/products/${products.slug}`"
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
          <div class="price-col">
            <span v-if="boolSalePrice">{{ variationSalePrice }}</span>
            <p>{{ variationPrice }} ₽</p>
          </div>
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
  variationStock,
  isCarts,
  cartItem,
  selectedQuantity,
  toggleCart,
  updateQuantity,
  findVariationId,
  variationSalePrice,
  boolSalePrice,
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
      @include bp($point_2, $direction: min) {
        order: 0;
      }
    }

    :deep(.product-sliders) {
      @include bp($point_2, $direction: min) {
        order: 1;
      }
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
    font-size: 3.6rem;
    margin-bottom: 3rem;
    @include bp($point_2) {
      font-size: 2.4rem;
      margin-bottom: 1.5rem;
    }
  }

  a:not(.product_title) {
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
  max-height: 16rem;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 6;

  @include bp($point_2) {
    font-size: 1.6rem;
    margin-bottom: 2rem;
  }
}

.products_prices {
  @include flex-space;
  gap: 5rem;
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

.product_title {
  text-decoration: none;
  color: $black;
  &:hover {
    color: $brown;
  }
}

.price-col {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  position: relative;
  span {
    position: absolute;
    color: #a4a4a4ff;
    top: -2rem;
    font-family: $font_3;
    text-decoration: line-through;
  }
}
</style>
