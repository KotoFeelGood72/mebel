<template>
  <div class="callback">
    <div class="callback__head">
      <h3>Оставить заявку</h3>
      <div class="close-btn" @click="closeModal('callback')">
        <IconBtn
          icon="simple-line-icons:close"
          size="34"
          @click="closeModal('callback')"
        />
      </div>
    </div>
    <div class="callback__form">
      <Inputs placeholder="Ваше имя" v-model="formData.name" />
      <Divider :height="1" />
      <InputPhone placeholder="Ваш телефон" v-model="formData.phone" />
      <Divider :height="2" />
      <DefaultBtn
        name="Отправить"
        type="secondary"
        color="black"
        size="normal"
        @click="submitForm"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import IconBtn from "../ui/IconBtn.vue";
import Inputs from "../ui/Inputs.vue";
import InputPhone from "../ui/InputPhone.vue";
import { useModalStore } from "@/stores/useModalStore";
import { useRouter } from "vue-router";
import DefaultBtn from "../ui/DefaultBtn.vue";
import Divider from "../ui/Divider.vue";
// import { useTelegramBot } from "@/composables/useTelegramBot";

// Используем composable для отправки данных в Telegram
// const { sendMessage } = useTelegramBot();

const formData = ref<any>({
  name: "",
  phone: "",
});

const { closeModal } = useModalStore();
const router = useRouter();

const submitForm = async () => {
  if (formData.value.name && formData.value.phone) {
    const message = `Новая заявка:\nИмя: ${formData.value.name}\nТелефон: ${formData.value.phone}`;
    // const response = await sendMessage(message);
    // if (response.success) {
    //   alert("Заявка успешно отправлена!");
    //   closeModal("callback");
    // } else {
    //   alert("Ошибка при отправке заявки.");
    // }
  } else {
    alert("Пожалуйста, заполните все поля.");
  }
};
</script>

<style scoped lang="scss">
.callback {
  position: fixed;
  max-width: 66rem;
  background-color: $white;
  top: 0;
  right: 0;
  z-index: 101;
  height: 100%;
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
