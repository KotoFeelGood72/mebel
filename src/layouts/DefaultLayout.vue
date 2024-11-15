<template>
  <div class="main">
    <Header />
    <div class="content">
      <slot />
    </div>
    <transition name="modal">
      <ModalAuth v-if="modals.auth" class="modal-animate" />
    </transition>
    <transition name="modal">
      <ModalCallback v-if="modals.callback" class="modal-animate" />
    </transition>
    <transition name="modal">
      <ModalConfirm v-if="modals.confirm" class="modal-animate" />
    </transition>
    <transition name="modal-left">
      <Burger v-if="modals.burger" class="modal-animate" />
    </transition>
    <transition name="fade-bg">
      <div v-if="isModalActive" class="page-bg" @click="closeAllModals"></div>
    </transition>
    <Preloader />
    <Footer />
  </div>
</template>

<script setup lang="ts">
import ModalAuth from "@/components/modal/ModalAuth.vue";
import ModalCallback from "@/components/modal/ModalCallback.vue";
import ModalConfirm from "@/components/modal/ModalConfirm.vue";
import Burger from "@/components/modal/Burger.vue";
import Header from "@/components/shared/Header.vue";
import Footer from "@/components/shared/Footer.vue";
import Preloader from "@/components/shared/Preloader.vue";
import { useModalStore, useModalStoreRefs } from "@/stores/useModalStore";
import { useProductsStore } from "@/stores/useProductsStore";
import { useRoute } from "vue-router";
import { computed, watch, onMounted, onUnmounted } from "vue";

const route = useRoute();
const { closeAllModals } = useModalStore();
const { modals } = useModalStoreRefs();
const { getAllProducts } = useProductsStore();
let scrollPosition = 0;
const isModalActive = computed(() => {
  return Object.values(modals.value).some((isActive) => isActive);
});

watch(
  () => route.fullPath,
  () => {
    closeAllModals();
  }
);

watch(
  isModalActive,
  (active) => {
    if (active) {
      document.body.classList.add("fixed");
    } else {
      document.body.classList.remove("fixed");
    }
  },
  { immediate: true }
);
onUnmounted(() => {
  // Удаляем класс fixed при размонтировании компонента, чтобы избежать утечек
  document.body.classList.remove("fixed");
});

onMounted(async () => {
  await getAllProducts();
});
</script>

<style lang="scss">
.page-bg {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 100;
}
.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from {
  transform: translateX(100%);
  opacity: 0;
}

.modal-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
.modal-leave-from {
  transform: translateX(0%);
  opacity: 1;
}

.modal-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.modal-left-enter-active,
.modal-left-leave-active {
  transition: all 0.3s ease;
}

.modal-left-enter-from {
  transform: translateX(-100%);
  opacity: 0;
}

.modal-left-enter-to {
  transform: translateX(0%);
  opacity: 1;
}
.modal-left-leave-from {
  transform: translateX(0%);
  opacity: 1;
}

.modal-left-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

body {
  &.fixed {
    overflow: hidden;
  }
}
</style>
