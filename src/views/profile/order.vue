<template>
  <div class="order" v-if="order">
    <!-- Табы -->
    <div class="order_tabs">
      <div
        v-for="(t, idx) in tabs"
        :key="t.label"
        class="order__tab"
        :class="{ active: activeTabIdx === idx }"
        @click="activeTabIdx = idx"
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
            :key="`${tabs[activeTabIdx].key}-order-${i}`"
            :order="item"
          />
        </template>

        <!-- Плейсхолдер, если заказов нет -->
        <div v-else class="order__placeholder">
          Нет заказов со статусом «{{ tabLabel(activeTabIdx) }}»
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

const tabs: { key: string[]; label: string }[] = [
  { key: ["in-work"], label: "В работе" },
  { key: ["paid"], label: "Оплачен" },
  { key: ["not-paid", "pending"], label: "Не оплачен" },
];

const activeTabIdx = ref(0);

const { order } = useUserStoreRefs();
const { fetchUser } = useUserStore();

const currentTabOrders = computed(() =>
  (order.value as any[]).filter((o) => tabs[activeTabIdx.value].key.includes(o.status))
);

const tabLabel = (idx: number) => tabs[idx].label;

onMounted(async () => {
  await fetchUser();
  console.log(order.value);
});
</script>

<style scoped lang="scss">
.order_tabs {
  @include flex-start;
  display: inline-flex;
  background-color: $light;
  margin-bottom: 6rem;

  @include bp($point_2) {
    width: 100%;
  }
  div {
    padding: 1rem 4.5rem;
    cursor: pointer;
    transition: all 0.3s ease-in-out;
    font-family: $font_3;
    color: $gray;

    @include bp($point_2) {
      padding: 1rem 1.5rem;
      font-size: 1.2rem;
      flex-grow: 1;
      text-align: center;
    }

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
