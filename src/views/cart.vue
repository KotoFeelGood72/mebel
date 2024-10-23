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
                    :id="item.id"
                    :checked="selectedItems.includes(item.id)"
                    @change="toggleSelectItem(item.id)"
                  />
                  <label :for="item.id"></label>
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
                    <li>
                      <p>Размеры:</p>
                      <span>180х150</span>
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
                    @clear="removeCartItem(item.id)"
                  />
                </div>
              </li>
            </ul>
          </div>
          <div class="list-block">
            <BlockUserInfo />
            <BlockDeliveryCalc />
            <div class="payment">
              <div class="payment__address">
                <h3>Выберите способ оплаты</h3>
              </div>
              <div class="payment__method">
                <div
                  v-for="method in paymentMethods"
                  :key="method.name"
                  class="payment__method-item"
                >
                  <input
                    type="radio"
                    :id="method.name"
                    v-model="selectedMethod"
                    :value="method.name"
                  />
                  <label :for="method.name">
                    <span>{{ method.name }}</span>
                    <img v-if="method.logo" :src="method.logo" alt="" />
                  </label>
                </div>
                <div class="split__w" v-if="selectedMethod === 'Оплатить'">
                  <div id="split-widget"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="cart_totals">
          <div class="cart_total__head">
            <span>Итого</span>
            <p>{{ totalPrice }} P</p>
          </div>
          <div class="cart_total__body">
            <ul>
              <li>
                <span>{{ carts.length }} товара(ов) на сумму</span>
                <p>{{ totalPrice }}</p>
              </li>
              <li>
                <span>Доставка</span>
                <p>{{ deliveryPrice }}</p>
              </li>
            </ul>
          </div>
          <div id="pay-button-container"></div>
          <div class="cart_total__privacy">
            Нажимая кнопку 'Оформить заказ', Вы принимаете условия
            соответствующей
            <RouterLink to="/">оферты: Оферты для физических лиц</RouterLink>
            или
            <RouterLink to="/"> Оферты для юридических лиц и ИП</RouterLink>,
            Политики конфиденциальности, а также даете Согласие на
            <RouterLink to="/"
              >обработку Ваших персональных данных и их передачу.</RouterLink
            >
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
// import DefaultBtn from "~/components/ui/DefaultBtn.vue";
import Qty from "@/components/ui/Qty.vue";
import BlockUserInfo from "@/components/blocks/BlockUserInfo.vue";
import BlockDeliveryCalc from "@/components/blocks/BlockDeliveryCalc.vue";
import { ref, computed, watch, onMounted } from "vue";
import { useCartStoreRefs, useCartStore } from "@/stores/useCartStore";
import { useDelivery } from "@/composables/useDelivery";
const { carts, currentOrder } = useCartStoreRefs();
const { updateCartItem, removeCartItem, createOrder } = useCartStore();
import { useYaPay } from "@/services/useYaPay";
const { deliveryPrice } = useDelivery();
const { createPaymentSession, resetPaymentButton, resetPaymentSession } =
  useYaPay();

// Данные из store

const selectedItems = ref<string[]>([]);
const selectedMethod = ref("Оплата картой онлайн или через СБП");

// Методы оплаты
const paymentMethods = [
  {
    name: "Оплата картой онлайн или через СБП",
  },
  { name: "Оплатить", logo: "/img/split.png" },
];

// Вычисляем, есть ли выбранные товары
const hasSelectedItems = computed(() => {
  return selectedItems.value.length > 0;
});

// Обновление количества товара в корзине
const updateQuantity = (item: any, quantity: number) => {
  item.quantity = quantity;
  updateCartItem(item);
};

// Удаление выбранных товаров из корзины
const deleteSelectedItems = () => {
  selectedItems.value.forEach((itemId) => {
    removeCartItem(itemId);
  });
  selectedItems.value = [];
};

// Обработка выбора товара
const toggleSelectItem = (itemId: string) => {
  if (selectedItems.value.includes(itemId)) {
    selectedItems.value = selectedItems.value.filter((id) => id !== itemId);
  } else {
    selectedItems.value.push(itemId);
  }
};

// Выбор всех товаров
const toggleSelectAll = (event: Event) => {
  if ((event.target as HTMLInputElement).checked) {
    selectedItems.value = carts.value.map((item: any) => item.id);
  } else {
    selectedItems.value = [];
  }
};

// Проверка, все ли товары выбраны
const isAllSelected = computed(() => {
  return (
    carts.value.length > 0 && selectedItems.value.length === carts.value.length
  );
});

// Подсчет общей стоимости корзины
const totalPrice = computed(() => {
  return carts.value.reduce((total: any, item: any) => {
    return total + item.price * item.quantity;
  }, 0);
});

// Функция установки товаров и цены в заказ
const setLineItemsAndPrice = () => {
  const lineItems = carts.value.map((item: any) => ({
    product_id: item.id,
    name: item.title,
    quantity: item.quantity,
    price: item.price,
    color: item.color,
    thumbnail: item.thumbnail,
  }));

  const totalOrderPrice = carts.value.reduce((total: any, item: any) => {
    return total + item.price * item.quantity;
  }, 0);

  currentOrder.value = {
    ...currentOrder.value,
    line_items: lineItems,
    price: totalOrderPrice,
  };
};

// Следим за изменениями в корзине и обновляем line_items и price
watch(carts, setLineItemsAndPrice, { deep: true });

watch(selectedMethod, (newMethod) => {
  const amount = totalPrice.value;
  const methods = newMethod === "Оплатить" ? ["SPLIT"] : ["CARD"];

  // Уничтожаем текущую сессию перед созданием новой
  resetPaymentSession();

  // Пересоздаем платежную сессию только если выбран метод оплаты "Оплатить"
  if (newMethod === "Оплатить") {
    createPaymentSession({
      amount: amount,
      methods: ["SPLIT"],
      buttonContainerId: "#pay-button-container",
      widgetContainerId: "#split-widget",
    });
  } else {
    // Если метод оплаты не "Оплатить", создаем сессию для обычной оплаты картой
    createPaymentSession({
      amount: amount,
      methods: ["CARD"],
      buttonContainerId: "#pay-button-container",
    });
  }
});

// Очищаем контейнеры перед монтированием новой кнопки или виджета
function clearContainer(selector: string) {
  const container = document.querySelector(selector);
  if (container) {
    container.innerHTML = ""; // Очищаем контейнер
  }
}

// Инициализация платежной сессии при монтировании компонента
onMounted(() => {
  const amount = totalPrice.value;
  const methods = selectedMethod.value === "Оплатить" ? ["SPLIT"] : ["CARD"];

  clearContainer("#pay-button-container"); // Очищаем контейнер для кнопки

  createPaymentSession({
    amount: amount,
    methods: methods,
    buttonContainerId: "#pay-button-container",
    widgetContainerId:
      selectedMethod.value === "Оплатить" ? "#split-widget" : undefined,
  });
});

// Инициализация платежной сессии при монтировании компонента
onMounted(() => {
  const amount = totalPrice.value;
  const methods = selectedMethod.value === "Оплатить" ? ["SPLIT"] : ["CARD"];

  // Создаем платежную сессию
  createPaymentSession({
    amount: amount,
    methods: methods,
    buttonContainerId: "#pay-button-container",
    widgetContainerId: "#split-widget", // Если используется SPLIT
  });
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

.cart_totals {
  max-width: 43.5rem;
  position: sticky;
  top: 2rem;
  right: 0;
}

.cart_products__head {
  @include flex-space;
  gap: 2rem;
  margin-bottom: 3.5rem;
  @include bp($point_2) {
    margin-bottom: 3rem;
  }
}

.cart_total__head {
  @include flex-space;
  gap: 2rem;
  margin-bottom: 4rem;
  @include bp($point_2) {
    margin-bottom: 2rem;
  }
  span,
  p {
    font-size: 4rem;
    font-family: $font_2;
    @include bp($point_2) {
      font-size: 2.4rem;
    }
  }

  p {
    @include bp($point_2) {
      font-size: 3rem;
    }
  }
}

.cart_total__body {
  ul {
    margin-bottom: 4.5rem;
    @include bp($point_2) {
      margin-bottom: 2.7rem;
    }
  }
  li {
    @include flex-space;
    @include bp($point_2) {
      font-size: 1.6rem;
    }
    &:not(:last-child) {
      margin-bottom: 2rem;
      @include bp($point_2) {
        margin-bottom: 1.5rem;
      }
    }
  }
}

.cart_total__privacy {
  padding-top: 3.5rem;
  font-size: 1.6rem;
  @include bp($point_2) {
    font-size: 1.2rem;
    padding-top: 2rem;
  }
  a {
    color: $brown;
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
    font-size: 2rem;
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

.payment {
  background-color: $white;
  padding: 1.7rem 2.4rem 3.4rem 2.4rem;
  @include bp($point_2) {
    padding: 1.5rem;
  }

  h3 {
    font-size: 3rem;
    margin-bottom: 3rem;
    font-family: $font_2;
    font-weight: 500;
    @include bp($point_2) {
      font-size: 2.4rem;
    }
  }
}

.payment__method-item {
  input:checked + label {
    &:after {
      opacity: 1;
      visibility: visible;
    }
  }
  label {
    cursor: pointer;
    @include flex-start;
    position: relative;
    padding-left: 3.1rem;
    font-size: 1.8rem;

    span {
      margin-right: 1.2rem;
    }

    img {
      @include flex-start;
    }
    &:before {
      position: absolute;
      top: 45%;
      left: 0%;
      width: 1.6rem;
      height: 1.6rem;
      border: 0.1rem solid $brown;
      border-radius: 100%;
      content: "";
      transform: translateY(-50%);
      @include bp($point_2) {
        transform: translateY(0);
        top: 0.2rem;
      }
    }
    &:after {
      position: absolute;
      top: 45%;
      left: 0.3rem;
      transform: translateY(-50%);
      width: 1rem;
      height: 1rem;
      content: "";
      opacity: 0;
      visibility: hidden;
      transition: all 0.3s ease-in-out;
      background-position: center center;
      background-color: $brown;
      border-radius: 100%;
      @include bp($point_2) {
        top: 0.5rem;
        transform: translateY(0);
      }
    }
  }

  input {
    display: none;
  }
  &:not(:last-child) {
    margin-bottom: 1rem;
  }
}

.split__w {
  max-width: 50rem;
}
</style>
