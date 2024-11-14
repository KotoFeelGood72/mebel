import { defineStore, storeToRefs } from "pinia";
import { useOtpTimer } from "@/composables/useOtpTimer";
import { useUserStoreRefs } from "./useUserStore";

interface ModalsState {
  auth: boolean;
  callback: boolean;
  burger: boolean;
  confirm: boolean;
}

export const useModalStore = defineStore("modal", {
  state: (): { modals: ModalsState } => ({
    modals: {
      auth: false,
      callback: false,
      burger: false,
      confirm: false,
    },
  }),
  actions: {
    openModal(modalName: keyof ModalsState) {
      this.modals[modalName] = !this.modals[modalName];
    },
    closeModal(modalName: keyof ModalsState): void {
      this.modals[modalName] = false;
      const {resetTimer} = useOtpTimer()
      const {showOtpForm, email} = useUserStoreRefs()

      showOtpForm.value = false
      email.value = ''
      resetTimer()
    },
    closeAllModals() {
      Object.keys(this.modals).forEach((modalName) => {
        this.modals[modalName as keyof ModalsState] = false;
      });
      const {resetTimer} = useOtpTimer()
      resetTimer()
      const {showOtpForm, email} = useUserStoreRefs()
      email.value = ''
      showOtpForm.value = false
    },
  },
});

export const useModalStoreRefs = () => storeToRefs(useModalStore());
