<template>
  <div class="phone_input">
    <input
      v-model="localValue"
      v-mask="'# (###) ###-##-##'"
      :placeholder="placeholder"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, defineEmits, defineProps } from "vue";

const props = defineProps<{
  modelValue: any;
  placeholder: string;
}>();

const emit = defineEmits(["update:modelValue"]);

const localValue = computed({
  get: () => props.modelValue,
  set: (newValue) => emit("update:modelValue", newValue),
});
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
  }
}
</style>
