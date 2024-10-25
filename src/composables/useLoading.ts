import { ref } from "vue";

// Глобальное состояние для loading
const isLoading = ref(false);

export function useLoading() {
  const setLoading = (value: boolean) => {
    isLoading.value = value;
  };

  return {
    isLoading,
    setLoading,
  };
}
