<template>
  <div class="confirm">
    <div class="confirm__head">
      <h3>Вы действительно хотите удалить профиль?</h3>
    </div>
    <div class="confirm_main">
      <DefaultBtn
        type="primary"
        color="orange"
        size="small"
        @click="deleteUser()"
        :name="loadUserDelete ? 'Удаление...' : 'Удалить'"
        :icon="loadUserDelete ? 'svg-spinners:ring-resize' : ''"
        :disabled="loadUserDelete"
      />
      <DefaultBtn
        name="Отмена"
        type="primary"
        color="brown"
        size="small"
        @click="closeAllModals()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import DefaultBtn from "../ui/DefaultBtn.vue";
import { useModalStore } from "@/stores/useModalStore";
import { useUserStore, useUserStoreRefs } from "@/stores/useUserStore";

const { closeAllModals } = useModalStore();
const { loadUserDelete } = useUserStoreRefs();
const { deleteUser } = useUserStore();
</script>

<style scoped lang="scss">
.confirm {
  position: fixed;
  max-width: 48.6rem;
  max-height: 19.7rem;
  background-color: $white;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 101;
  padding: 4.5rem 3rem;
  @include flex-center;
  flex-direction: column;
  text-align: center;
  gap: 3rem;
  font-size: 2.4rem;
}

.confirm_main {
  @include flex-center;
  gap: 2rem;

  :deep(.button) {
    padding: 0.9rem 6.5rem;
  }
}
</style>
