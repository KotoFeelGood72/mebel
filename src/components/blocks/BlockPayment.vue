<template>
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
</template>

<script setup>
import { ref, watch, onMounted } from "vue";
import { useCartStoreRefs } from "@/stores/useCartStore";
// import { useYaPay } from "@/composables/useYaPay";

const selectedMethod = ref("Оплата картой онлайн или через СБП");
const { currentOrder } = useCartStoreRefs();
// const { createPaymentSession, resetPaymentSession } = useYaPay();
const paymentMethods = [
  {
    name: "Оплата картой онлайн или через СБП",
  },
  { name: "Оплатить", logo: "/img/split.png" },
];

// Обновление сессии оплаты
// const updateYaPaySession = () => {
//   const amount = currentOrder.value.price || 0;

//   // Сбрасываем предыдущую сессию, если она есть
//   resetPaymentSession();

//   if (selectedMethod.value === "Оплатить") {
//     // Инициализируем сессию сплит-оплаты
//     createPaymentSession({
//       amount,
//       methods: ["SPLIT"],
//       buttonContainerId: "#payButton",
//       widgetContainerId: "#split-widget",
//     });
//   } else {
//     // Инициализируем обычную оплату
//     createPaymentSession({
//       amount,
//       methods: ["CARD"],
//       buttonContainerId: "#payButton", // Кнопка мгновенной оплаты
//     });
//   }
// };

// Следим за изменением способа оплаты и пересоздаем сессии
// watch(selectedMethod, () => {
//   updateYaPaySession();
// });

// Пересоздание сессии при изменении цены
// watch(
//   () => currentOrder.value.price,
//   () => {
//     updateYaPaySession();
//   }
// );

// onMounted(() => {
//   updateYaPaySession();
// });
</script>

<style scoped lang="scss">
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
