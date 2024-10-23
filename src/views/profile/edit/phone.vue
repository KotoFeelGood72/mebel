<template>
  <div class="edit_phone__w">
    <div class="edit-phone">
      <div class="close">
        <Icon name="simple-line-icons:close" size="30" />
      </div>
      <div class="edit_phone__head">
        <h3>Редактирование</h3>
        <p v-if="!phoneChanged && !showOtp">
          Укажите новый номер телефона, на него будет выслан СМС-код для
          подтверждения
        </p>
      </div>
      <div class="edit_phone" v-if="!phoneChanged && !showOtp">
        <div class="edit_input">
          <p>Телефон</p>
          <InputPhone v-model="phone" placeholder="+7 (999) 999-99-99" />
        </div>
        <div class="edit_btn">
          <DefaultBtn
            name="Подтвердить номер"
            type="primary"
            color="brown"
            size="small"
            @click="handleConfirm"
          />
        </div>
      </div>
    </div>
    <otpPhone v-if="showOtp && !phoneChanged" @onNext="handleOtpSuccess" />
    <div class="edit_phone__end" v-if="phoneChanged">
      <p>Номер телефона успешно изменен!</p>
      <DefaultBtn
        name="Вернуться к редактированию профиля"
        type="primary"
        color="brown"
        size="small"
        @click="pushEdit"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import InputPhone from "@/components/ui/InputPhone.vue";
import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import otpPhone from "./components/otp-phone.vue";
import { useRouter } from "vue-router";

const phone = ref<string>("");
const showOtp = ref<boolean>(false);
const phoneChanged = ref<boolean>(false);

const router = useRouter();

const handleConfirm = () => {
  if (phone.value) {
    showOtp.value = true;
  }
};

const handleOtpSuccess = () => {
  // Логика обработки успешного ввода OTP
  phoneChanged.value = true;
};

const pushEdit = () => {
  router.push("/profile/edit/");
};
</script>

<style scoped lang="scss">
.edit_phone__head {
  max-width: 59.1rem;
  margin: 0 auto 4.9rem auto;
  text-align: center;
  h3 {
    font-size: 2.4rem;
    margin-bottom: 2.5rem;
  }
}

.edit_phone {
  max-width: 55.9rem;
  margin: 0 auto;
  text-align: center;
  .edit_input {
    text-align: left;
    margin-bottom: 4.5rem;

    :deep(input) {
      max-height: 4.8rem;
    }
  }
}

.edit_btn {
  :deep(.button) {
    padding: 1.2rem 7.5rem;
  }
}

.edit_phone__end {
  max-width: 47.2rem;
  text-align: center;
  margin: 0 auto;
  padding-top: 5rem;
  padding-bottom: 5rem;
  p {
    font-size: 2.4rem;
    font-family: $font_2;
    margin-bottom: 4.9rem;
  }
}
</style>
