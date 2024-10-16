<template>
  <!-- <div class="code__form">
    <div class="code_form__title">Введите код</div>
    <div class="code__inputs">
      <Vue3OtpInput
        v-model="codes"
        :num-inputs="4"
        input-classes="otp-input"
        @on-complete="handleOnComplete"
        :placeholder="['*', '*', '*', '*']"
      />
    </div>
    <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
  </div>
  <div class="code__timer">
    <span @click="resendCode" :class="{ disabled: timer > 0 }">
      Отправить код повторно {{ formattedTime }}
    </span>
  </div> -->
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { defineEmits } from "vue";
import Vue3OtpInput from "vue3-otp-input";

const codes = ref("");
const timer = ref(180);
const errorMessage = ref("");

const emit = defineEmits(["onNext"]);

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

const startTimer = () => {
  const countdown = setInterval(() => {
    if (timer.value > 0) {
      timer.value--;
    } else {
      clearInterval(countdown);
    }
  }, 1000);
};

const resendCode = () => {
  if (timer.value === 0) {
    console.log("Повторная отправка кода...");
    errorMessage.value = "";
    codes.value = "";
    timer.value = 180;
    startTimer();
  }
};

const handleOnComplete = (value: any) => {
  if (value !== "1113") {
    errorMessage.value = "Неверный код";
  } else {
    emit("onNext");
    errorMessage.value = "";
  }
};
</script>

<style scoped lang="scss">
.code__form {
  text-align: center;
}

.code_form__title {
  font-size: 1.8rem;
  color: $gray;
  font-family: $font_2;
  margin-bottom: 2rem;
}

.otp-input-container {
  @include flex-center;
  gap: 2.6rem;
  margin-bottom: 4rem;
  :deep(.otp-input) {
    width: 5rem;
    height: 5rem;
    @include app;
    border: 0.1rem solid #878787;
    text-align: center;
    font-size: 3rem;
    font-family: $font_2;
  }
}

.code__timer {
  text-align: center;
  font-size: 1.6rem;
  color: $brown;
}

.error {
  color: #b23e00;
  font-size: 1.6rem;
  margin: -2rem 0 3rem 0;
}
</style>
