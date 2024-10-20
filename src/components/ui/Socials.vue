<template>
  <div class="socials">
    <ul>
      <li v-for="(item, i) in socials" :key="'socials-item-' + i">
        <a target="_blank" :href="item.link"
          ><Icons :icon="item.icon" :size="item.size"
        /></a>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const socials = ref<any>([
  { icon: "bxl:vk", link: "/", size: 25 },
  { icon: "mingcute:telegram-fill", link: "/", size: 23 },
  { icon: "mage:whatsapp-filled", link: "/", size: 23 },
]);
</script>

<style scoped lang="scss">
.socials {
  ul {
    @include flex-start;
    gap: 3rem;
    li {
      width: 4rem;
      height: 4rem;
      a {
        @include flex-center;
        width: 100%;
        height: 100%;
        border: 0.1rem solid $brown;
        color: $brown;
        border-radius: 100%;
        color: $brown;
        &:hover {
          color: $white;
          background-color: $brown;
        }
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
