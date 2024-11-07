<template>
  <div class="edit">
    <div class="edit_form">
      <div class="close">
        <Icon name="simple-line-icons:close" size="30" />
      </div>
      <div class="edit_head">
        <h3>Редактирование</h3>
      </div>
      <div class="edit_form">
        <div class="edit_input">
          <p>Имя</p>
          <Inputs
            placeholder="Поддубная Елена"
            v-model="user.billing.first_name"
          />
        </div>
        <div class="edit_input">
          <p>E-mail</p>
          <Inputs placeholder="elrnadub@gmail.com" v-model="user.email" />
        </div>
        <div class="edit_btn">
          <DefaultBtn
            :name="isLoad ? 'Сохраняем...' : 'Сохранить изменения'"
            type="primary"
            color="brown"
            size="small"
            @click="updateUser"
            :icon="isLoad ? 'svg-spinners:ring-resize' : ''"
            :disabled="isLoad"
          />
        </div>
        <div class="edit__delete" @click="openModal('confirm')">
          Удалить профиль
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Inputs from "@/components/ui/Inputs.vue";
import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import { useUserStoreRefs, useUserStore } from "@/stores/useUserStore";
import { useToast } from "vue-toastification";
import { useModalStore } from "@/stores/useModalStore";
import { ref } from "vue";

const { user } = useUserStoreRefs();
const { handleNextStep } = useUserStore();
const { openModal } = useModalStore();

const isLoad = ref<boolean>(false);
const toast = useToast();

function updateUser() {
  isLoad.value = true;
  handleNextStep();
  setTimeout(() => {
    isLoad.value = false;
    toast.success("Профиль обновлен");
  }, 300);
}
</script>

<style lang="scss">
.edit {
  background-color: $light;
  max-width: 114rem;
  margin: 0 auto 10rem auto;
  position: relative;
  padding: 4.8rem 4.8rem 5.9rem 4.8rem;
  @include bp($point_2) {
    padding: 2rem 2rem 5rem 2rem;
  }
}

.close {
  position: absolute;
  top: 3.8rem;
  right: 3.8rem;
  cursor: pointer;
  @include flex-center;
  color: #9e9e9e;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: #b23e00;
  }
}

.edit_head {
  text-align: center;
  margin-bottom: 1.5rem;
  @include bp($point_2) {
    margin: 0;
  }
  h3 {
    font-size: 3rem;
    margin-bottom: 2rem;
    @include bp($point_2) {
      margin: 0;
      font-size: 2.6rem;
    }
  }

  a {
    color: $brown;
  }
}

.edit_form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 55.9rem;
  width: 100%;
  margin: 0 auto;
  gap: 2.8rem;
  @include bp($point_2) {
    gap: 2rem;
  }
}

.edit_input {
  p {
    font-size: 1.8rem;
    font-family: $font_2;
    color: $gray;
    margin-bottom: 1rem;
  }
}

.edit_btn {
  display: inline-flex;
  justify-content: center;
}

.edit__delete {
  text-align: center;
  cursor: pointer;
  font-size: 1.8rem;
  color: #b23e00;
  &:hover {
    color: $brown;
  }
}
</style>
