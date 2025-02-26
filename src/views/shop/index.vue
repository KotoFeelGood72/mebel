<template>
  <div class="shop" v-if="products">
    <ShopHead />
    <div class="container">
      <ul class="products_list p10">
        <li
          class="products_item"
          v-for="(item, idx) in products"
          :key="'products-item' + item.id"
        >
          <ProductsCard :products="item" :reverse="idx % 2 !== 0" />
        </li>
      </ul>
    </div>
    <ActionBlock
      img="https://softpear.ru/wp-content/uploads/2024/11/action-2.jpg"
      title="Как начать сотрудничество?"
      txt="Свяжитесь с нами, чтобы обсудить ваши идеи и запросы. Наши специалисты всегда готовы предоставить консультацию и помочь на каждом этапе реализации вашего проекта. Вместе мы сможем создать нечто действительно выдающееся."
    />
  </div>
</template>

<script setup lang="ts">
import ShopHead from "@/components/head/ShopHead.vue";
import ProductsCard from "@/components/card/ProductsCard.vue";
import { onMounted } from "vue";
import { useProducts } from "@/services/useProducts";
import ActionBlock from "@/components/blocks/ActionBlock.vue";

const { useGetProducts, products } = useProducts();

onMounted(() => {
  useGetProducts("all");
});
</script>

<style scoped lang="scss">
.products_list {
  li {
    @include bp($point_2) {
      margin-bottom: 3rem;
    }
    &:not(:last-child) {
      margin-bottom: 10rem;
      @include bp($point_2) {
        margin-bottom: 6rem;
      }
    }

    &:nth-child(even) {
      :deep(.products_slider) {
        @include bp($point_2, $direction: min) {
          order: 1;
        }
      }

      :deep(.products_content) {
        @include bp($point_2, $direction: min) {
          order: 0;
        }
      }
    }
  }
}

.shop {
  .container {
    @include bp($point_2) {
      padding: 0;
    }
  }
}
</style>
