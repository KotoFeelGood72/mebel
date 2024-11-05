<template>
  <div class="callback">
    <div class="callback__head">
      <h3>Оставить заявку</h3>
      <div class="close-btn" @click="closeModal('callback')">
        <IconBtn
          icon="simple-line-icons:close"
          :size="34"
          @click="closeModal('callback')"
        />
      </div>
    </div>
    <div class="callback__form">
      <!-- Поле имени отображается только если requireName = true -->
      <Inputs
        v-if="requireName"
        placeholder="Ваше имя"
        v-model="formData.name"
        :error="v$.name.$error"
        message="Заполните ваше имя"
      />
      <Divider :height="1" />
      <InputPhone
        placeholder="Ваш телефон"
        v-model="formData.phone"
        message="Заполните ваш телефон"
        :error="v$.phone.$error"
      />
      <Divider :height="2" />
      <DefaultBtn
        :name="isLoading ? 'Отправка...' : 'Отправить'"
        type="secondary"
        color="black"
        size="normal"
        @click="submitForm"
        :icon="isLoading ? 'svg-spinners:ring-resize' : ''"
        :disabled="isLoading"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import IconBtn from "../ui/IconBtn.vue";
import Inputs from "../ui/Inputs.vue";
import InputPhone from "../ui/InputPhone.vue";
import DefaultBtn from "../ui/DefaultBtn.vue";
import Divider from "../ui/Divider.vue";
import { useFormHandler } from "@/composables/useFormHandler";
import { useModalStore } from "@/stores/useModalStore";

const { closeModal } = useModalStore();

// Используем useFormHandler с названием формы и флагом для имени
const formTitle = "Заявка на обратный звонок";
const requireName = true; // Установите в false, если поле имени не нужно

// Подключаем useFormHandler и передаем параметры
const { formData, isLoading, submitForm, v$ } = useFormHandler(
  formTitle,
  requireName
);
</script>

<style scoped lang="scss">
.callback {
  position: fixed;
  max-width: 50rem;
  background-color: $white;
  top: 0;
  right: 0;
  z-index: 101;
  height: 100%;
  width: 100%;
  padding: 4.5rem 3rem;
}

.callback__form {
  position: relative;

  :deep(input) {
    height: 6.1rem;
  }
}

.callback__head {
  @include flex-space;
  gap: 5rem;
  font-size: 3rem;
  margin-bottom: 3rem;
  h3 {
    font-family: $font_2;
    font-weight: 400;
  }
}

.close-btn {
  color: $gray;
  &:hover {
    color: $dark;
  }
}

.loader {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 10rem;
  color: $lbrown;
}
</style>
