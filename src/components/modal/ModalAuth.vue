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
import { useUserStore, useUserStoreRefs } from "@/stores/useUserStore";

const { closeModal } = useModalStore();
const {
  email,
  otpCode,
  isLoad,
  otpErrorMessage,
  showOtpForm,
  showVerification,
} = useUserStoreRefs();
const { sendOTP, resendOTP, verifyOTP } = useUserStore();
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

  @include bp($point_2) {
    max-width: 100%;
    height: 70dvh;
    bottom: 0;
    top: auto;
    align-items: flex-end;
    padding: 2.5rem 2rem 3rem 2rem;
  }
}

.auth_main {
  position: relative;
  min-height: 50rem;
  @include bp($point_2) {
    min-height: auto;
    height: 100%;
  }
}

.auth__head {
  @include flex-space;
  gap: 5rem;
  font-size: 3rem;
  margin-bottom: 3rem;
  @include bp($point_2) {
    flex-direction: column-reverse;
    gap: 0;
    margin-bottom: 0;
  }
  h3 {
    font-family: $font_2;
    font-weight: 400;
  }
}

.close-btn {
  color: $gray;

  @include bp($point_2) {
    width: 100%;
    @include flex-end;
    margin-bottom: -2rem;
    position: relative;
    z-index: 2;
  }

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

.auth_main__child {
  @include bp($point_2) {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    height: 100%;
  }
}
</style>
