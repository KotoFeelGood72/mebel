<template>
  <div class="shop" v-if="products">
    <ShopHead
      :title="page.shop_title"
      :txt="page.shop_txt"
      :img="page.shop_img.url"
    />
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
      :img="page.изображение"
      :title="page.form_title"
      :txt="page.form_txt"
    />
  </div>
</template>

<script setup lang="ts">
import ShopHead from "@/components/head/ShopHead.vue";
import ProductsCard from "@/components/card/ProductsCard.vue";
import { onMounted } from "vue";
import { useProducts } from "@/services/useProducts";
import ActionBlock from "@/components/blocks/ActionBlock.vue";
import { usePage } from "@/services/usePage";

const { useGetProducts, products } = useProducts();
const { page, useGetPage } = usePage();

onMounted(() => {
  useGetProducts("all");
  useGetPage("118");
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
