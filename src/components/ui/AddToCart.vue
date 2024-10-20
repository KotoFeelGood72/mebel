<template>
  <div
    class="button"
    :class="['button', isColorSheme, isType, { center: isCenter }, { active: active }]"
  >
    <div class="btn-icon" v-if="icon">
      <Icons :icon="active ? 'custom:cart' : 'custom:cart-white'" size="26" />
    </div>
    <p>{{ name }}</p>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps, computed } from "vue";
const props = withDefaults(
  defineProps<{
    type?: "secondary" | "primary";
    active: boolean;
    name: string;
    icon?: string;
    center?: boolean;
  }>(),
  {
    type: "secondary",
    color: "light",
    name: "Купить",
    active: false,
  }
);

const isColorSheme = computed(() => props.color);
const isType = computed(() => props.type);
const isCenter = computed(() => props.center);
</script>

<style scoped lang="scss">
.button {
  @include flex-start;
  background-color: $lbrown;
  padding: 2rem 4.9rem;
  color: $white;
  gap: 1rem;
  font-family: $font_2;
  font-size: 2.4rem;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  @include bp($point_2) {
    padding: 1.5rem 2rem;
    font-size: 1.6rem;
    width: 100%;
    justify-content: center;
  }

  &.active {
    background-color: $light;
    color: $brown;
    &:hover {
      background-color: $light;
    }
  }

  &.center {
    justify-content: center;
  }

  &:hover {
    background-color: $brown;
  }
}

.btn-icon {
  @include flex-center;
}
</style>
