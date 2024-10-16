<template>
  <div class="button" :class="['button', isColorSheme, isType, isSize]">
    <div class="btn-icon" v-if="icon">
      <Icon :name="icon" />
    </div>
    <p>{{ name }}</p>
  </div>
</template>

<script setup lang="ts">
import { withDefaults, defineProps } from "vue";
const props = withDefaults(
  defineProps<{
    type?: "secondary" | "primary";
    color?: "gray" | "brown" | "light" | "white" | "black";
    size?: "xsmall" | "small" | "normal" | "xnormal" | "large";
    name: string;
    icon?: string;
  }>(),
  {
    type: "secondary",
    color: "light",
    name: "Купить",
  }
);

const isColorSheme = computed(() => props.color);
const isType = computed(() => props.type);
const isSize = computed(() => props.size);
</script>

<style scoped lang="scss">
.button {
  font-size: 1.8rem;
  cursor: pointer;
  font-family: $font_2;
  transition: all 0.3s ease-in-out;
  position: relative;
  overflow: hidden;
  @include flex-center;
  gap: 1rem;
  @include bp($point_2) {
    width: 100%;
  }

  .btn-icon {
    font-size: 2.6rem;
    @include flex-center;
  }
  p {
    z-index: 1;
    position: relative;
    line-height: 120%;
  }
  &.xsmall {
    max-height: 4.2rem;
    padding: 1rem;
    p {
      line-height: 21.6rem;
    }
  }
  &.small {
    max-height: 4.8rem;
    padding: 1.3rem 4rem;
  }
  &.xnormal {
    padding: 1.55rem 5.45rem;
    max-height: 5.5rem;
  }
  &.normal {
    padding: 1.7rem 5.05rem;
    max-height: 5.8rem;
  }
  &.large {
    padding: 2rem 6.9rem;
    max-height: 6.9rem;
    font-size: 2.4rem;
    border-width: 0.2rem !important;
    @include bp($point_2) {
      font-size: 1.6rem;
      padding: 1.8rem 3rem;
    }
  }
  &.secondary {
    border: 0.1rem solid;
    &.gray {
      border-color: $gray;
    }
    &.brown {
      border-color: $brown;
      color: $brown;
      &:hover {
        color: $white;
        background-color: $brown;
      }
    }
    &.white {
      border-color: $white;
      color: $white;
      &:hover {
        color: $brown;
        background-color: $white;
      }
    }
    &.black {
      border-color: $black;
      &:hover {
        background-color: $black;
        color: $white;
      }
    }
  }
  &.primary {
    border: 0.1rem solid;
    &.gray {
      background-color: $gray;
    }
    &.brown {
      background-color: $lbrown;
      color: $white;
      &:hover {
        color: $white;
        background-color: $brown;
      }
    }

    &.white {
      border-color: $white;
      color: $white;
      &:hover {
        color: $brown;
        background-color: $white;
      }
    }
    &.black {
      border-color: $black;
    }
  }
}
</style>
