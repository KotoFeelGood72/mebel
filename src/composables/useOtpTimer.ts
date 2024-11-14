// composables/useOtpTimer.ts
import { ref, computed } from "vue";

export function useOtpTimer() {
  const timer = ref(Number(localStorage.getItem("otp_timer")) || 180);
  const canResend = ref(false);
  let countdown: any = null;

  const formattedTime = computed(() => {
    const minutes = Math.floor(timer.value / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (timer.value % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  });

  const startTimer = () => {
    canResend.value = false;
    countdown = setInterval(() => {
      if (timer.value > 0) {
        timer.value--;
        localStorage.setItem("otp_timer", timer.value.toString());
      } else {
        clearInterval(countdown);
        localStorage.removeItem("otp_timer");
        canResend.value = true;
      }
    }, 1000);
  };

  const resetTimer = () => {
    clearInterval(countdown);
    timer.value = 180;
    localStorage.setItem("otp_timer", "180");
    canResend.value = false;
  };

  const clearCountdown = () => {
    clearInterval(countdown);
  };

  return {
    timer,
    canResend,
    formattedTime,
    startTimer,
    resetTimer,
    clearCountdown, // Возвращаем clearCountdown, чтобы можно было использовать в onUnmounted
  };
}
