import { defineStore, storeToRefs } from "pinia";

export const useLoadingStore = defineStore("loading", {
  state: () => ({
    isLoading: false as boolean,
  }),
  actions: {
    setLoading(value: boolean) {
      this.isLoading = value;
    },
  },
});

export const useLoadingStoreRefs = () => storeToRefs(useLoadingStore());
