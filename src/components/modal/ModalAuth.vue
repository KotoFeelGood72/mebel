<template>
  <div class="auth">
    <div class="auth__head">
      <h3>Войти или зарегистрироваться</h3>
      <div class="close-btn" @click="closeModal('auth')">
        <IconBtn
          icon="simple-line-icons:close"
          size="34"
          @click="closeModal('auth')"
        />
      </div>
    </div>
    <div class="auth_main">
      <div class="loader" v-if="isLoad">
        <Icon name="eos-icons:bubble-loading" />
      </div>
      <div class="auth_main__child" v-else>
        <!-- Шаг 1: Форма для ввода Email -->
        <EmailForm
          v-if="!showOtpForm && !showVerification"
          @submitEmail="sendOTP"
          v-model="email"
        />

        <!-- Шаг 2: Форма для ввода OTP -->
        <AuthVerification
          v-if="showOtpForm && !showVerification"
          v-model="otpCode"
          @resendOtp="resend"
          @verify="verifyOTP"
          :error="otpErrorMessage"
        />

        <!-- Шаг 3: Форма для заполнения имени и телефона, только если нет first_name -->
        <AuthNew v-if="showVerification" @onNext="handleNextStep" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import IconBtn from "../ui/IconBtn.vue";
import AuthNew from "./auth/AuthNew.vue";
import AuthVerification from "./auth/AuthVerification.vue";
import EmailForm from "./auth/EmailForm.vue";
import { useModalStore } from "~/store/useModalStore";
import { useRouter } from "vue-router";
import { useUserStore } from "~/store/useUserStore";
import axios from "axios";

// Флаги для отображения разных форм
const showOtpForm = ref(false);
const showVerification = ref(false);
const otpErrorMessage = ref("");
const otpCode = ref("");
const email = ref("");
const isLoad = ref<boolean>(false);
const userData = ref<any>(null);

const { loginUser } = useUserStore();
const { closeModal } = useModalStore();
const router = useRouter();

// Метод для отправки OTP кода
const sendOTP = async () => {
  try {
    isLoad.value = true; // Включаем прелоадер
    const response = await axios.post(
      "http://fura.dynamic-devs-collective.ru/wp-json/custom-auth/v1/send-otp",
      {
        email: email.value,
      }
    );
    showOtpForm.value = true;
    otpErrorMessage.value = "";
    userData.value = response.data.user_data;
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
  } finally {
    isLoad.value = false; // Отключаем прелоадер
  }
};

// Метод для повторной отправки OTP
const resend = async () => {
  try {
    isLoad.value = true;
    const response = await axios.post(
      "http://fura.dynamic-devs-collective.ru/wp-json/custom-auth/v1/resend-otp",
      {
        email: email.value,
      }
    );
    console.log(response.data);
    showOtpForm.value = true;
    otpErrorMessage.value = "";
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
  } finally {
    isLoad.value = false;
  }
};

const verifyOTP = async () => {
  try {
    isLoad.value = true;
    const response = await axios.post(
      "http://fura.dynamic-devs-collective.ru/wp-json/custom-auth/v1/verify-otp",
      {
        email: email.value,
        otp_code: otpCode.value,
      }
    );

    // Если OTP верен, авторизуем пользователя через loginUser
    if (response.data) {
      await loginUser(response.data);

      otpErrorMessage.value = "";

      if (userData.value && userData.value.first_name) {
        // Редирект на главную страницу
        router.push("/");
      } else {
        showVerification.value = true; // если нет first_name, показываем форму заполнения данных
      }
    }
  } catch (error) {
    console.error(error.response?.data?.message || error.message);
    otpErrorMessage.value = error.response?.data?.message || "Неверный код OTP";
  } finally {
    isLoad.value = false;
  }
};

// Метод для обновления профиля пользователя (сохранение имени и телефона)
const handleNextStep = async (data: { name: string; phone: string }) => {
  try {
    isLoad.value = true; // Включаем прелоадер
    const response = await axios.post(
      "http://fura.dynamic-devs-collective.ru/wp-json/custom-auth/v1/update-profile",
      {
        email: email.value,
        name: data.name,
        phone: data.phone,
      }
    );
    console.log("Профиль обновлен", response.data);
    // Перенаправляем пользователя на главную страницу или другую страницу
    // window.location.href = "/";
  } catch (error) {
    console.error("Ошибка при обновлении профиля:", error);
  } finally {
    isLoad.value = false; // Отключаем прелоадер
  }
};
</script>

<style scoped lang="scss">
.auth {
  position: fixed;
  max-width: 66rem;
  background-color: $white;
  top: 0;
  right: 0;
  z-index: 101;
  height: 100%;
  padding: 4.5rem 3rem;
}

.auth_main {
  position: relative;
  min-height: 50rem;
}

.auth__head {
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
