<template>
  <transition name="fade">
    <div class="preloader" v-if="isLoading">
      <div class="preloader-inner">
        <div class="preloader__icon">
          <Icons icon="line-md:loading-twotone-loop" :size="100" />
        </div>
        <Logo />
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
import Logo from "../ui/Logo.vue";
import { useLoadingStoreRefs } from "@/stores/useLoadingStore";

const { isLoading } = useLoadingStoreRefs();
</script>

<style scoped lang="scss">
.preloader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #fff;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.preloader-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
}

.preloader__icon {
  color: $brown;
  @include flex-center;

  /* Добавим анимацию вращения */
  animation: spin 2s linear infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Стили для transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
.fade-enter-to,
.fade-leave-from {
  opacity: 1;
}
</style>
