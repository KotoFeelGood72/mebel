<template>
  <div class="form">
    <p>Мы отправим SMS-сообщение с кодом подтверждения</p>
    <div class="form__main">
      <div class="form_input">
        <span>E-Mail </span>
        <Inputs v-model="localValue" placeholder="Введите e-mail" />
      </div>
      <div class="form_btn">
        <DefaultBtn
          name="Подтвердить e-mail"
          type="primary"
          color="brown"
          size="normal"
          @click="submitEmail"
          :icon="load ? 'svg-spinners:ring-resize' : ''"
        />
      </div>
      <div class="form__notice">
        Нажимая кнопку “Подтвердить номер”, Вы принимаете условия
        <RouterLink>Программы лояльности</RouterLink> и обработку персональных
        данных на условиях <RouterLink>Политики конфиденциальности</RouterLink>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Inputs from "@/components/ui/Inputs.vue";
import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import { defineEmits, computed } from "vue";

const props = defineProps<{
  modelValue: string;
  load: boolean;
}>();

const emit = defineEmits();

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

function submitEmail() {
  emit("submitEmail", localValue);
}
</script>

<style scoped lang="scss">
.form {
  padding-top: 2rem;
  & > p {
    font-size: 2rem;
    color: $gray;
    max-width: 44.3rem;
    margin-bottom: 3.5rem;
  }
}

.form_input {
  margin-bottom: 2.5rem;
  span {
    display: block;
    margin-bottom: 1.5rem;
    color: $gray;
    font-family: $font_2;
  }
}

.form_btn {
  margin-bottom: 3.5rem;
}

.form__notice {
  font-size: 1.4rem;
  color: #9e9e9e;
  max-width: 44.3rem;
  a {
    color: #4d7dec;
  }
}

.loader {
  font-size: 10rem;
  color: $lbrown;
}
</style>
