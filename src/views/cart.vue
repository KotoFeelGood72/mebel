<template>
  <div class="cart">
    <div class="container">
      <div class="cart_main">
        <div class="cart_main__content">
          <h2>Корзина ({{ carts.length }})</h2>
          <div class="cart_products__w">
            <div class="cart_products__head">
              <div class="cart_select__all">
                <input
                  type="checkbox"
                  name="select-all"
                  id="select-all"
                  :checked="isAllSelected"
                  @change="toggleSelectAll"
                />
                <label for="select-all">Выбрать все</label>
              </div>
              <div
                class="cart_delete"
                :class="{ active: hasSelectedItems }"
                @click="deleteSelectedItems"
              >
                Удалить
              </div>
            </div>
            <ul class="cart_products__list">
              <li
                class="cart_products__item"
                v-for="(item, i) in carts"
                :key="'carts-item-' + i"
              >
                <div class="cart_select__single">
                  <input
                    type="checkbox"
                    name="single-cart"
                    :id="item.variationId"
                    :checked="selectedItems.includes(item.variationId)"
                    @change="toggleSelectItem(item.variationId)"
                  />
                  <label :for="item.variationId"></label>
                </div>

                <div class="cart_item__img">
                  <img :src="item.thumbnail" alt="" />
                </div>
                <div class="cart_item__content">
                  <h3>{{ item.title }}</h3>
                  <ul>
                    <li>
                      <p>Цвет:</p>
                      <span>{{ item.color }}</span>
                    </li>
                  </ul>
                </div>
                <div class="cart_item__action">
                  <div class="cart_item__price">{{ item.price }} Р</div>
                  <Qty
                    :initialQuantity="item.quantity"
                    @updateQuantity="
                      (quantity) => updateQuantity(item, quantity)
                    "
                    @clear="removeCart(item.variationId)"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div class="list-block">
            <BlockUserInfo />
            <BlockDeliveryCalc
              :defaultAddress="
                user?.billing?.address_1 || user?.billing?.address
              "
            />
            <BlockPayments :total="totalWithDelivery" />
          </div>
        </div>
        <BlockCartTotals
          :total="totalPrice"
          :delivery="totalDeliveryPrice"
          :length="totalQuantity"
        >
          <DefaultBtn
            name="Оплатить"
            color="brown"
            size="normal"
            type="primary"
            @click="handlePayment"
          />
        </BlockCartTotals>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import Qty from "@/components/ui/Qty.vue";
import BlockUserInfo from "@/components/blocks/BlockUserInfo.vue";
import BlockDeliveryCalc from "@/components/blocks/BlockDeliveryCalc.vue";
import BlockCartTotals from "@/components/blocks/BlockCartTotals.vue";
import { useUserStoreRefs } from "@/stores/useUserStore";
import { useRouter } from "vue-router";
import BlockPayments from "@/components/blocks/BlockPayments.vue";
import { ref, computed, watch, onMounted } from "vue";
import { useCartStoreRefs, useCartStore } from "@/stores/useCartStore";
import { useDelivery } from "@/composables/useDelivery";
import { useToast } from "vue-toastification"; // Подключаем useToast

const { carts, currentOrder } = useCartStoreRefs();
const { updateCartItem, createOrder, removeCart } = useCartStore();
const { deliveryPrice } = useDelivery();
const { user } = useUserStoreRefs();
const selectedItems = ref<string[]>([]);
const router = useRouter();
const toast = useToast(); // Инициализируем useToast

const hasSelectedItems = computed(() => selectedItems.value.length > 0);

const updateQuantity = (item: any, quantity: number) => {
  item.quantity = quantity;
  updateCartItem(item);
};

const deleteSelectedItems = () => {
  selectedItems.value.forEach((variationId) => {
    const itemIndex = carts.value.findIndex(
      (cartItem: any) => cartItem.variationId === variationId
    );
    if (itemIndex !== -1) {
      carts.value.splice(itemIndex, 1);
    }
  });
  selectedItems.value = [];
};

const toggleSelectItem = (variationId: string) => {
  if (selectedItems.value.includes(variationId)) {
    selectedItems.value = selectedItems.value.filter(
      (id) => id !== variationId
    );
  } else {
    selectedItems.value.push(variationId);
  }
};

const toggleSelectAll = (event: Event) => {
  if ((event.target as HTMLInputElement).checked) {
    selectedItems.value = carts.value.map((item: any) => item.variationId);
  } else {
    selectedItems.value = [];
  }
};

const isAllSelected = computed(
  () =>
    carts.value.length > 0 && selectedItems.value.length === carts.value.length
);

const isCheckUser = computed(() => {
  const billing = user.value.billing;
  return (
    !!billing.address_1 ||
    (billing.address &&
      !!billing.first_name &&
      !!billing.phone &&
      !!billing.email)
  );
});

const totalQuantity = computed(() =>
  carts.value.reduce((total: number, item: any) => total + item.quantity, 0)
);

const totalPrice = computed(() =>
  carts.value.reduce(
    (total: any, item: any) => total + item.price * item.quantity,
    0
  )
);

const totalDeliveryPrice = computed(() =>
  carts.value.reduce(
    (total: number, item: any) => total + deliveryPrice.value * item.quantity,
    0
  )
);

const totalWithDelivery = computed(
  () => totalPrice.value + totalDeliveryPrice.value
);

const handlePayment = () => {
  const missingFields: string[] = [];

  if (!user.value.billing.first_name) missingFields.push("Имя");
  if (!user.value.billing.phone) missingFields.push("Телефон");
  if (!user.value.billing.email) missingFields.push("Email");
  if (!user.value.billing.address_1 && !user.value.billing.address)
    missingFields.push("Адрес");

  if (missingFields.length > 0) {
    toast.error(`Заполните обязательные поля: ${missingFields.join(", ")}`);
    return;
  }

  createOrder();
};

const setLineItemsAndPrice = () => {
  const lineItems = carts.value.map((item: any) => ({
    product_id: item.id,
    name: item.title,
    quantity: item.quantity,
    color: item.color,
    variation_id: item.variationId,
    thumbnail: item.thumbnail,
    meta_data: [
      {
        key: "Тип",
        value: item.type,
      },
    ],
  }));

  currentOrder.value = {
    ...currentOrder.value,
    line_items: lineItems,
    shipping_cost: deliveryPrice.value,
    user_id: user.value?.ID || 0,
  };
};

watch([carts, deliveryPrice], setLineItemsAndPrice, { deep: true });

watch(
  carts,
  (newCarts) => {
    if (newCarts.length === 0) {
      router.push("/");
    }
  },
  { immediate: true }
);

onMounted(() => {
  setLineItemsAndPrice();
});
</script>

<style scoped lang="scss">
.cart {
  background-color: $light;
}
.cart_main {
  padding-top: calc($header + 10rem);
  @include flex-start;
  gap: 16rem;
  align-items: flex-start;
  padding-bottom: 13.5rem;
  @include bp($point_2) {
    padding-top: 10.5rem;
    padding-bottom: 3rem;
    flex-direction: column;
    gap: 3rem;
  }
}

.cart_main__content {
  flex-grow: 1;
  h2 {
    font-size: 5rem;
    margin-bottom: 4rem;
    @include bp($point_2) {
      font-size: 3rem;
      margin-bottom: 2.5rem;
    }
  }
}

.cart_select__all {
  input {
    display: none;
    &:checked ~ label {
      &:after {
        opacity: 1;
        visibility: visible;
      }
    }
  }
  label {
    color: $brown;
    position: relative;
    padding-left: 3.1rem;
    font-size: 1.6rem;
    cursor: pointer;
    user-select: none;
    &:before {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 1.6rem;
      height: 1.6rem;
      border: 0.1rem solid $brown;
      content: "";
    }
    &:after {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 1.6rem;
      height: 1.6rem;
      content: "";
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1rem' height='1rem' viewBox='0 0 24 24'%3E%3Cpath fill='%23946b55' d='M18.71 7.21a1 1 0 0 0-1.42 0l-7.45 7.46l-3.13-3.14A1 1 0 1 0 5.29 13l3.84 3.84a1 1 0 0 0 1.42 0l8.16-8.16a1 1 0 0 0 0-1.47'/%3E%3C/svg%3E");
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease-in-out;
    }
  }
}
.cart_delete {
  font-size: 1.6rem;
  cursor: pointer;
  line-height: 110%;
  transition: all 0.3s ease-in-out;
  color: $gray;
  pointer-events: none;
  border-bottom: 0.1rem solid $light;
  &.active {
    pointer-events: all;
    color: #b23e00;
    border-bottom: 0.1rem solid #b23e00;
  }
  &:hover {
    border-bottom: 0.1rem solid transparent;
  }
}

.cart_products__item {
  @include flex-start;
  background-color: $white;
  padding: 2rem 4rem 2rem 5.1rem;
  gap: 5rem;
  position: relative;

  @include bp($point_2) {
    gap: 1rem;
    padding: 1.5rem 3.7rem 1.5rem 1.5rem;
    align-items: flex-start;
    flex-wrap: wrap;
  }
}

.cart_item__img {
  min-width: 23.3rem;
  width: 23.3rem;
  height: 17.9rem;
  @include flex-center;

  @include bp($point_2) {
    min-width: 6.5rem;
    width: 6.5rem;
    height: 4.9rem;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.cart_item__content {
  // max-width: 41.6rem;
  flex-grow: 1;
  @include bp($point_2) {
    max-width: calc(100% - 7.5rem);
  }

  h3 {
    margin-bottom: 2rem;
    @include bp($point_2) {
      font-size: 1.6rem;
      margin-bottom: 1rem;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 1.8rem;
    @include bp($point_2) {
      gap: 0.2rem;
    }
    li {
      @include flex-start;
      gap: 1rem;
      @include bp($point_2) {
        font-size: 1.4rem;
        gap: 0.5rem;
      }
      p {
        font-family: $font_2;
      }
      span {
        color: $brown;
      }
    }
  }
}

.cart_item__price {
  text-align: center;
  font-size: 3rem;
  font-family: $font_2;
  margin-bottom: 3.2rem;
  @include bp($point_2) {
    margin-bottom: 0;
    font-size: 1.8rem;
  }
}

.cart_products__w {
  margin-bottom: 3.5rem;
  @include bp($point_2) {
    margin-bottom: 3rem;
  }
}

.userInfo {
  background-color: $white;
  padding: 1.7rem 2.4rem 3.4rem 2.4rem;
  @include bp($point_2) {
    padding: 1.5rem;
  }
}

.list-block {
  display: flex;
  flex-direction: column;
  gap: 3.5rem;
  @include bp($point_2) {
    margin-bottom: 0;
    gap: 3rem;
    width: 100%;
  }
}

.cart_select__single {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: 1.5rem;
  @include bp($point_2) {
    top: 1.6rem;
    right: 1.5rem;
    left: auto;
    transform: translate(0);
    // width: 100%;
    // height: 100%;
  }
  input {
    display: none;
    &:checked + label:after {
      opacity: 1;
      visibility: visible;
    }
  }

  label {
    border: 0.1rem solid $brown;
    width: 1.6rem;
    height: 1.6rem;
    @include flex-center;
    cursor: pointer;
    &:after {
      position: absolute;
      top: 50%;
      left: 0;
      transform: translateY(-50%);
      width: 1.6rem;
      height: 1.6rem;
      content: "";
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1rem' height='1rem' viewBox='0 0 24 24'%3E%3Cpath fill='%23946b55' d='M18.71 7.21a1 1 0 0 0-1.42 0l-7.45 7.46l-3.13-3.14A1 1 0 1 0 5.29 13l3.84 3.84a1 1 0 0 0 1.42 0l8.16-8.16a1 1 0 0 0 0-1.47'/%3E%3C/svg%3E");
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease-in-out;
    }
  }
}

.cart_products__list {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  @include bp($point_2) {
    gap: 1.5rem;
  }
}

.cart_item__action {
  @include bp($point_2) {
    width: 100%;
    @include flex-start;
    gap: 3rem;
    padding-left: 7.5rem;
  }
}

.cart_products__head {
  @include flex-space;
  gap: 2rem;
  margin-bottom: 3.5rem;
  @include bp($point_2) {
    margin-bottom: 3rem;
  }
}
</style>
