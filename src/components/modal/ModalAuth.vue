<template>
  <div class="auth">
    <div class="auth__head">
      <h3>Войти или зарегистрироваться</h3>
      <div class="close-btn" @click="closeModal('auth')">
        <IconBtn
          icon="simple-line-icons:close"
          :size="34"
          @click="closeModal('auth')"
        />
      </div>
    </div>
    <div class="auth_main">
      <div class="loader" v-if="isLoad">
        <Icons icon="svg-spinners:ring-resize" :size="50" />
      </div>
      <div class="auth_main__child" v-else>
        <EmailForm
          v-if="!showOtpForm && !showVerification"
          @submitEmail="sendOTP"
          v-model="email"
          :load="isLoad"
        />
        <AuthVerification
          v-if="showOtpForm && !showVerification"
          v-model="otpCode"
          @resendOtp="resendOTP"
          @verify="verifyOTP"
          :error="otpErrorMessage"
        />
        <AuthNew v-if="showVerification" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import IconBtn from "../ui/IconBtn.vue";
import AuthNew from "./auth/AuthNew.vue";
import AuthVerification from "./auth/AuthVerification.vue";
import EmailForm from "./auth/EmailForm.vue";
import { useModalStore } from "@/stores/useModalStore";
import { useRouter } from "vue-router";
import { useUserStore, useUserStoreRefs } from "@/stores/useUserStore";

// ddc-sellers@yandex.ru

const { closeModal } = useModalStore();
const {
  email,
  otpCode,
  isLoad,
  otpErrorMessage,
  showOtpForm,
  showVerification,
} = useUserStoreRefs();
const { loginUser, sendOTP, resendOTP, verifyOTP, logout } = useUserStore();
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
