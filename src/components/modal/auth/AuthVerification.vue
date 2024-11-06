<template>
  <div class="ver_main">
    <div class="ver_head">
      <p>Мы отправим SMS-сообщение с кодом подтверждения</p>
    </div>
    <div class="ver__form">
      <p>Введите код</p>
      <div class="ver_code__inputs">
        <Vue3OtpInput
          v-model:value="localValue"
          :num-inputs="6"
          input-classes="otp-input"
          @on-complete="nextStep"
          :placeholder="['*', '*', '*', '*', '*', '*']"
        />
      </div>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
    <div class="ver__timer">
      <span @click="resendCode" :class="{ disabled: timer > 0 && !canResend }">
        Отправить код повторно {{ formattedTime }}
      </span>
    </div>
    <div class="form__notice">
      Нажимая кнопку “Подтвердить номер”, Вы принимаете условия
      <RouterLink to="/">Программы лояльности</RouterLink> и обработку
      персональных данных на условиях
      <RouterLink to="/">Политики конфиденциальности</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import Vue3OtpInput from "vue3-otp-input";

const props = defineProps<{
  modelValue?: string;
  error: string;
}>();

const emit = defineEmits(["update:modelValue", "verify", "resendOtp"]);

// Устанавливаем таймер: берем значение из localStorage или 180 по умолчанию
const timer = ref(Number(localStorage.getItem("otp_timer")) || 180);
const errorMessage = ref("");

// Флаг для отображения кнопки повторной отправки, если истек срок кода
const canResend = ref(false);

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

watch(
  () => props.modelValue,
  (newValue) => {
    localValue.value = newValue;
  }
);

const formattedTime = computed(() => {
  const minutes = Math.floor(timer.value / 60)
    .toString()
    .padStart(2, "0");
  const seconds = (timer.value % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
});

onMounted(() => {
  startTimer();
});

let countdown: any = null;

const startTimer = () => {
  canResend.value = false; // Скрываем кнопку "Запросить код повторно" при запуске таймера

  countdown = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
      // Обновляем значение таймера в localStorage каждую секунду
      localStorage.setItem("otp_timer", timer.value.toString());
    } else {
      clearInterval(countdown);
      localStorage.removeItem("otp_timer"); // Удаляем таймер из localStorage, когда он доходит до 0
      canResend.value = true; // Показываем кнопку "Запросить код повторно" при истечении таймера
    }
  }, 1000);
};

const resendCode = () => {
  if (timer.value === 0 || canResend.value) {
    // Разрешаем повторную отправку при истечении таймера или ошибке
    console.log("Повторная отправка кода...");
    errorMessage.value = "";
    localValue.value = "";
    emit("resendOtp");
    timer.value = 180;
    canResend.value = false;
    localStorage.setItem("otp_timer", "180"); // Сбрасываем значение таймера в localStorage
    startTimer();
  }
};

const nextStep = async (value: any) => {
  try {
    emit("verify", value);
  } catch (error: any) {
    if (error.response?.status === 400) {
      errorMessage.value =
        "Срок действия кода истек. Пожалуйста, запросите новый код.";
      canResend.value = true; // Активируем кнопку "Запросить код повторно" при ошибке 400
    }
  }
};
</script>

<style scoped lang="scss">
.ver_head {
  margin-bottom: 3.7rem;
  max-width: 44.3rem;
  p {
    font-size: 2rem;
    color: $gray;
    margin-top: 1.5rem;
  }
}

.ver__form {
  & > p {
    font-size: 1.8rem;
    color: $gray;
    margin-bottom: 1.5rem;
    font-family: $font_2;
  }
}

.ver_code__inputs {
  @include flex-start;
  gap: 2rem;
  margin-bottom: 1.5rem;
}

:deep(.otp-input) {
  @include app;
  border: 0.1rem solid #878787;
  max-width: 4rem;
  @include flex-center;
  height: 4rem;
  font-size: 2rem;
  font-family: $font_2;
  text-align: center;
}

.ver__timer {
  font-size: 1.6rem;
  color: $brown;
  cursor: pointer;
  margin-bottom: 3.5rem;

  &.disabled {
    cursor: not-allowed;
    color: #ccc;
  }
}

.error {
  color: #b23e00 !important;
  font-size: 1.8rem;
  margin-bottom: 3rem !important;
  font-family: $font_1 !important;
}

:deep(.otp-input-container) {
  gap: 1.5rem;
}

.form__notice {
  font-size: 1.4rem;
  color: #9e9e9e;
  max-width: 44.3rem;
  a {
    color: #4d7dec;
  }
}
</style>
