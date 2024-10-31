<template>
  <div class="order">
    <div class="order_tabs">
      <!-- Табы -->
      <div
        class="order__tab"
        :class="{ active: activeTab === 'active' }"
        @click="activeTab = 'active'"
      >
        Активные
      </div>
      <div
        class="order__tab"
        :class="{ active: activeTab === 'completed' }"
        @click="activeTab = 'completed'"
      >
        Завершенные
      </div>
    </div>

    <!-- Контент табов -->
    <div class="order_tabs__contents">
      <div class="order_tab__content" v-if="activeTab === 'active'">
        <OrderCard
          v-for="(item, i) in activeOrders"
          :key="'active-orders-list-item-' + i"
          :order="item"
        />
      </div>
      <div class="order_tab__content" v-if="activeTab === 'completed'">
        <OrderCard
          v-for="(item, i) in completedOrders"
          :key="'completed-orders-list-item-' + i"
          :order="item"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import OrderCard from "@/components/card/OrderCard.vue";
import "swiper/swiper-bundle.css";
import { useUserStoreRefs } from "@/stores/useUserStore";
// Активная вкладка
const activeTab = ref<"active" | "completed">("active");

// Пример данных заказов
const activeOrders = ref([
  {
    num: "12234",
    total: "60 500",
    address: "г. Краснодар, ул. Восточно-кругликовская 77",
    products: [
      {
        title: "Бескаркасное кресло Империал",
        color: "Молочный",
        img: "/img/about-1.jpg",
      },
      {
        title: "Бескаркасное кресло Империал",
        color: "Молочный",
        img: "/img/about-1.jpg",
      },
      {
        title: "Бескаркасное кресло Империал",
        color: "Молочный",
        img: "/img/about-1.jpg",
      },
      {
        title: "Бескаркасное кресло Империал",
        color: "Молочный",
        img: "/img/about-1.jpg",
      },
      {
        title: "Бескаркасное кресло Империал",
        color: "Молочный",
        img: "/img/about-1.jpg",
      },
      {
        title: "Бескаркасное кресло Империал",
        color: "Молочный",
        img: "/img/about-1.jpg",
      },
      {
        title: "Бескаркасное кресло Империал",
        color: "Молочный",
        img: "/img/about-1.jpg",
      },
    ],
  },
]);

const completedOrders = ref([
  {
    num: "54321",
    total: "40 000",
    address: "г. Москва, ул. Ленина 10",
    products: [
      {
        title: "Бескаркасное кресло Империал",
        color: "Чёрный",
        img: "/img/about-1.jpg",
      },
    ],
  },
]);

const {} = useUserStoreRefs();
</script>

<style scoped lang="scss">
.order_tabs {
  @include flex-start;
  display: inline-flex;
  background-color: $light;
  margin-bottom: 6rem;
  div {
    padding: 1rem 4.5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    font-family: $font_3;
    color: $gray;
    &.active {
      box-shadow: 0px 2.83px 11.34px 0px #0000001f;
      background-color: $white;
    }
  }
}

.orders {
  background-color: $light;
  padding: 3.6rem 6.4rem 3.6rem 6.4rem;
}

:deep(.order-pagination) {
  display: none !important;
}
</style>
