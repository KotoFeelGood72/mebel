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
          v-model="paymentMethod"
          :value="method.name"
        />
        <label :for="method.name">
          <span>{{ method.name }}</span>
          <img v-if="method.logo" :src="method.logo" />
        </label>
      </div>
      <div class="split__w" v-if="paymentMethod === 'Оплатить'">
        <div class="loader" v-show="isLoading">
          <Icons icon="svg-spinners:ring-resize" :size="50" />
        </div>
        <div v-show="!isLoading" id="split-widget"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStoreRefs } from "@/stores/useCartStore";
import { onMounted, onUnmounted, ref, watch, nextTick } from "vue";
import { useYaPay } from "@/services/useYaPay";

const props = defineProps<{
  total: number;
}>();
const { paymentMethod } = useCartStoreRefs();
const { createPaymentSession, resetPaymentSession } = useYaPay();
const paymentMethods = [
  { name: "Оплата картой онлайн или через СБП" },
  {
    name: "Оплатить",
    logo: "https://softpear.ru/wp-content/uploads/2024/11/split.png",
  },
];
const widgetInitialized = ref(false);
const isLoading = ref<boolean>(false);

const initializeWidget = async () => {
  // Проверяем, инициализирован ли уже виджет
  if (widgetInitialized.value) return;

  isLoading.value = true;
  await nextTick();

  const widgetContainer = document.querySelector("#split-widget");
  if (widgetContainer) {
    await resetPaymentSession();
    await createPaymentSession({
      amount: props.total,
      widgetContainerId: "#split-widget",
    });
    widgetInitialized.value = true; // Устанавливаем флаг, чтобы указать, что виджет инициализирован
    setTimeout(() => {
      isLoading.value = false;
    }, 500);
  } else {
    isLoading.value = false;
  }
};

watch(
  paymentMethod,
  (newMethod) => {
    if (newMethod === "Оплатить") {
      initializeWidget(); // Инициализируем виджет при выборе метода "Оплатить"
    } else {
      resetPaymentSession(); // Очищаем сессию, если выбран другой метод
      widgetInitialized.value = false; // Сбрасываем флаг инициализации, чтобы можно было создать виджет снова
    }
  },
  { immediate: true }
);

watch(
  () => props.total,
  (newTotal) => {
    if (paymentMethod.value === "Оплатить" && widgetInitialized.value) {
      initializeWidget(); // Обновляем виджет при изменении суммы, если выбран метод "Оплатить"
    }
  }
);

onUnmounted(() => {
  resetPaymentSession();
  widgetInitialized.value = false; // Сбрасываем флаг инициализации при демонтировании компонента
});
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

.loader {
  height: 20rem;
  @include flex-center;
  color: $lbrown;
}
</style>
