<template>
  <div class="order" v-if="order">
    <!-- Табы -->
    <div class="order_tabs">
      <div
        v-for="t in tabs"
        :key="t.key"
        class="order__tab"
        :class="{ active: activeTab === t.key }"
        @click="activeTab = t.key"
      >
        {{ t.label }}
      </div>
    </div>

    <!-- Содержимое активного таба -->
    <div class="order_tabs__contents">
      <div class="order_tab__content">
        <template v-if="currentTabOrders.length">
          <OrderCard
            v-for="(item, i) in currentTabOrders"
            :key="`${activeTab}-order-${i}`"
            :order="item"
          />
        </template>

        <!-- Плейсхолдер, если заказов нет -->
        <div v-else class="order__placeholder">
          Нет заказов со статусом «{{ tabLabel(activeTab) }}»
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import OrderCard from "@/components/card/OrderCard.vue";
import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import { useUserStoreRefs, useUserStore } from "@/stores/useUserStore";

type OrderStatus = "in-work" | "paid" | "not-paid";

const tabs = [
  { key: "in-work", label: "В работе" },
  { key: "paid", label: "Оплачен" },
  { key: "not-paid", label: "Не оплачен" },
] as const;

const activeTab = ref<OrderStatus>("in-work");

const { order } = useUserStoreRefs();
const { fetchUser } = useUserStore();

const currentTabOrders = computed(() =>
  order.value.orders.filter((o: any) => o.status === activeTab.value)
);

const tabLabel = (key: OrderStatus) => tabs.find((t) => t.key === key)!.label;

onMounted(fetchUser);
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
