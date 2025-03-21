<template>
  <div class="ver_main">
    <div class="ver_head">
      <p>Мы отправим E-Mail уведомление с кодом подтверждения</p>
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
      <RouterLink to="/">Программы лояльности</RouterLink> и обработку персональных данных
      на условиях
      <RouterLink to="/">Политики конфиденциальности</RouterLink>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from "vue";
import Vue3OtpInput from "vue3-otp-input";
import { useOtpTimer } from "@/composables/useOtpTimer";

const props = defineProps<{
  modelValue?: string;
  error: string;
}>();

const emit = defineEmits(["update:modelValue", "verify", "resendOtp"]);

const errorMessage = ref("");

// Подключаем таймер из composables
const {
  timer,
  canResend,
  formattedTime,
  startTimer,
  resetTimer,
  clearCountdown,
} = useOtpTimer();

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

const resendCode = () => {
  if (timer.value === 0 || canResend.value) {
    console.log("Повторная отправка кода...");
    errorMessage.value = "";
    localValue.value = "";
    emit("resendOtp");
    resetTimer();
    startTimer();
  }
};

const nextStep = async (value: any) => {
  try {
    emit("verify", value);
  } catch (error: any) {
    if (error.response?.status === 400) {
      errorMessage.value = "Срок действия кода истек. Пожалуйста, запросите новый код.";
      canResend.value = true;
    }
  }
};

onMounted(() => {
  startTimer();
});

onUnmounted(() => {
  clearCountdown();
});
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
