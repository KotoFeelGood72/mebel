<template>
  <div class="order" v-if="order">
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
        <div v-if="activeOrders.length === 0" class="order__placeholder">
          Нет активных заказов
        </div>
        <OrderCard
          v-for="(item, i) in activeOrders"
          :key="'active-orders-list-item-' + i"
          :order="item"
          v-else
        />
      </div>
      <div class="order_tab__content" v-if="activeTab === 'completed'">
        <div v-if="completedOrders.length === 0" class="order__placeholder">
          <h3>У вас пока что нет заказов</h3>
          <DefaultBtn
            name="Перейти в каталог"
            type="primary"
            color="brown"
            size="normal"
          />
        </div>
        <OrderCard
          v-for="(item, i) in completedOrders"
          :key="'completed-orders-list-item-' + i"
          :order="item"
          v-else
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, computed } from "vue";
import OrderCard from "@/components/card/OrderCard.vue";
import "swiper/swiper-bundle.css";
import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import { useUserStoreRefs, useUserStore } from "@/stores/useUserStore";
// Активная вкладка
const activeTab = ref<"active" | "completed">("active");

const { order } = useUserStoreRefs();
const { fetchUser } = useUserStore();

const activeOrders = computed(() =>
  order.value.orders.filter((order: any) => order.status !== "completed")
);
const completedOrders = computed(() =>
  order.value.orders.filter((order: any) => order.status === "completed")
);

onMounted(async () => {
  await fetchUser();
});
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

  @include bp($point_2) {
    padding: 0;
  }
}

:deep(.order-pagination) {
  display: none !important;
}

.order_tab__content {
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
}

.order__placeholder {
  @include flex-center;
  flex-direction: column;
  gap: 7.5rem;
  padding: 5rem 0;

  h3 {
    font-size: 3rem;
    font-family: $font_1;
  }
}
</style>
