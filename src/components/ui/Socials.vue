<template>
  <div class="socials">
    <ul>
      <li v-for="(item, i) in socials" :key="'socials-item-' + i">
        <a target="_blank" :href="item.link"
          ><Icon :name="`custom:${item.icon}`" :size="item.size"
        /></a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const socials = ref<any>([
  { icon: "vk", link: "/", size: "35" },
  { icon: "tg", link: "/", size: "35" },
  { icon: "wa", link: "/", size: "35" },
]);
</script>

<style scoped lang="scss">
.socials {
  ul {
    @include flex-start;
    gap: 3rem;
    li {
      width: 3.5rem;
      height: 3.5rem;
      a {
        @include flex-center;
        width: 100%;
        height: 100%;
        // border: 0.1rem solid $brown;
        border-radius: 100%;
      }
      &:last-child {
        span {
          margin: -0.1rem -0.1rem 0 0;
        }
      }
    }
  }
}
</style>
