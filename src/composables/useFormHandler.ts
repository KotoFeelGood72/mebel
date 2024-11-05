import { ref, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { required, minLength } from "@vuelidate/validators";
import { useTelegramBot } from "@/composables/useTelegramBot";
import { useModalStore } from "@/stores/useModalStore";
import { useToast } from "vue-toastification";

export function useFormHandler(formTitle = "Новая заявка", requireName = true) {
  const toast = useToast();
  const formData = ref({
    name: "",
    phone: "",
  });

  const isLoading = ref(false);

  const { sendMessage } = useTelegramBot();
  const { closeModal } = useModalStore();

  const rules = computed(() => ({
    name: requireName ? { required, minLength: minLength(3) } : {},
    phone: { required },
  }));

  const v$ = useVuelidate(rules, formData);

  const submitForm = async () => {
    v$.value.$touch();
    if (v$.value.$invalid) {
      return;
    }

    isLoading.value = true;
    const message = `${formTitle}:\n${
      requireName ? `Имя: ${formData.value.name}\n` : ""
    }Телефон: ${formData.value.phone}`;
    const response = await sendMessage(message);

    setTimeout(() => {
      isLoading.value = false;
    }, 300);

    if (response.success) {
      closeModal("callback");

      // Очищаем значения формы
      formData.value.name = "";
      formData.value.phone = "";

      v$.value.$reset();

      setTimeout(() => {
        toast.success("Ваш запрос отправлен");
      }, 50);
    } else {
      toast.error("Ошибка при отправке заявки. Пожалуйста, попробуйте еще раз");
    }
  };

  return {
    formData,
    isLoading,
    submitForm,
    v$,
  };
}
