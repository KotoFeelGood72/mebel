<template>
  <div class="select-color">
    <ul class="products_color_select">
      <li v-for="(color, index) in colors" :key="index">
        <input
          type="radio"
          :id="'color-' + index + '-' + id"
          :value="color.attributes.pa_colors"
          v-model="internalSelectedColor"
        />
        <label :for="'color-' + index + '-' + id">
          <span
            :style="{ backgroundColor: colorMap[color.attributes.pa_colors] }"
          ></span>
        </label>
      </li>
    </ul>
    <div class="products_color_selected">
      Цвет: <span>{{ internalSelectedColor }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watch, ref } from "vue";
const props = defineProps<{
  colors: any[];
  id: number;
  modelValue?: any;
}>();

const emit = defineEmits(["update:modelValue"]);

// Локальная реактивная переменная для выбранного цвета
const internalSelectedColor = ref(props.modelValue);

// Следим за изменениями и обновляем выбранный цвет
watch(
  () => props.modelValue,
  (newValue) => {
    internalSelectedColor.value = newValue;
  }
);

// Эмитируем событие при изменении цвета
watch(internalSelectedColor, (newValue) => {
  emit("update:modelValue", newValue);
});

const colorMap: Record<string, string> = {
  ["bone"]: "#e2d6c5",
  ["brown"]: "#857367",
  ["chocolate"]: "#3f2c25",
  ["coral"]: "#996263",
  ["cream"]: "#dfd1c1",
  ["forest"]: "#5e7272",
  ["grafit"]: "#62656c",
  ["indigo"]: "#404a6f",
  ["steel"]: "#a2a8b4",
  ["umber"]: "#c88b45",
};
</script>

<style scoped lang="scss">
.products_color_select {
  @include flex-start;
  margin-bottom: 3.5rem;
  gap: 2.1rem;
  @include bp($point_2) {
    flex-wrap: wrap;
    gap: 0.5rem;
    margin-bottom: 2rem;
  }
  li {
    width: 3.5rem;
    height: 3.5rem;
  }

  input {
    display: none;
    &:checked + label {
      border: 0.1rem solid $brown;
      span {
        transform: scale(0.8);
      }
    }
  }

  label {
    width: 100%;
    height: 100%;
    @include flex-center;
    cursor: pointer;
    span {
      transition: all 0.3s ease-in-out;
      width: 100%;
      @include flex-center;
      height: 100%;
    }
  }
}

.products_color_selected {
  margin-bottom: 7rem;
  font-size: 2.4rem;
  font-family: $font_2;
  @include flex-start;
  gap: 0.5rem;
  @include bp($point_2) {
    margin-bottom: 2.5rem;
    font-size: 1.6rem;
  }
  span {
    color: $brown;
    font-size: 2rem;
    font-family: $font_1;
    @include bp($point_2) {
      font-size: 1.6rem;
    }
  }
}
</style>
