import { defineStore } from "pinia";

interface ModalsState {
  auth: boolean;
  callback: boolean;
}

export const useModalStore = defineStore("modal", {
  state: (): { modals: ModalsState } => ({
    modals: {
      auth: false,
      callback: false,
    },
  }),
  actions: {
    openModal(modalName: keyof ModalsState) {
      this.modals[modalName] = !this.modals[modalName];
    },
    closeModal(modalName: keyof ModalsState): void {
      this.modals[modalName] = false;
    },
    closeAllModals() {
      Object.keys(this.modals).forEach((modalName) => {
        this.modals[modalName as keyof ModalsState] = false;
      });
    },
  },
});

export const useModalStoreRefs = () => storeToRefs(useModalStore());
