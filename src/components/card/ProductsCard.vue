<template>
  <div class="products">
    <ProductsSlider :products="products" />
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
          :colors="products.attributes.pa_colors || []"
          v-model="selectedColor"
        />
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
              @clear="removeCart(products.id, selectedColor)"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore, useCartStoreRefs } from "@/stores/useCartStore";
import AddToCart from "../ui/AddToCart.vue";
import { ref, computed } from "vue";
import Qty from "../ui/Qty.vue";
import { useToast } from "vue-toastification";
import ProductsSlider from "../ui/ProductsSlider.vue";
import ColorSelect from "../ui/ColorSelect.vue";

const { addCart, removeCart, updateCartItem } = useCartStore();
const { carts } = useCartStoreRefs();

const props = withDefaults(
  defineProps<{
    products: any;
  }>(),
  {
    products: null,
  }
);

const toast = useToast();

const selectedColor = ref(
  props.products?.attributes?.pa_colors &&
    props.products.attributes.pa_colors.length > 0
    ? props.products.attributes.pa_colors[0]
    : null
);

// Проверка, находится ли товар с конкретным цветом в корзине
const isCarts = computed(() =>
  carts.value.some(
    (cart: any) =>
      cart.id === props.products.id && cart.color === selectedColor.value
  )
);
const cartItem = computed(() =>
  carts.value.find(
    (cart: any) =>
      cart.id === props.products.id && cart.color === selectedColor.value
  )
);

const selectedQuantity = ref(cartItem.value ? cartItem.value.quantity : 1);

const toggleCart = () => {
  if (isCarts.value) {
    removeCart(props.products.id, selectedColor.value);
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

const updateCart = () => {
  if (isCarts.value) {
    updateCartItem({
      id: props.products.id,
      color: selectedColor.value,
      quantity: selectedQuantity.value,
    });
  }
};

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
