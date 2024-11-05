<template>
  <div class="phone_input">
    <MaskInput
      v-if="isVisible"
      :key="key"
      :class="{ error: error }"
      type="tel"
      v-model="localValue"
      mask="+7 (###) ###-##-##"
      :placeholder="placeholder"
    />
    <span v-if="error" class="input-message">{{ message }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps, watch, ref, nextTick } from "vue";

const props = defineProps<{
  modelValue: any;
  placeholder: string;
  message?: string;
  error?: boolean;
}>();

const emit = defineEmits(["update:modelValue"]);
const isVisible = ref(true);
const key = ref(0);

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});

watch(
  () => props.modelValue,
  async (newValue) => {
    if (newValue === "") {
      isVisible.value = false;
      await nextTick();
      key.value += 1;
      isVisible.value = true;
    }
  }
);
</script>

<style scoped lang="scss">
.phone_input {
  width: 100%;
  input {
    background-color: $white;
    padding: 2rem;
    border: 0.1rem solid #b2b2b2;
    color: $gray;
    width: 100%;
    font-size: 1.6rem;
    height: 6.1rem;
    &::-webkit-input-placeholder {
      color: $gray;
    }

    &.error {
      border: 0.1rem solid red;
      &::-webkit-input-placeholder {
        color: red;
      }
    }
  }
}

.input-message {
  color: red;
  font-size: 1.2rem;
}
</style>
