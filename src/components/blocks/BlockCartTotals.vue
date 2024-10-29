<template>
  <div class="cart_totals">
    <div class="cart_total__head">
      <span>Итого</span>
      <p>{{ total }} P</p>
    </div>
    <div class="cart_total__body">
      <ul>
        <li>
          <span>{{ length }} товара(ов) на сумму</span>
          <p>{{ total }}</p>
        </li>
        <li>
          <span>Доставка</span>
          <p>{{ delivery }}</p>
        </li>
      </ul>
    </div>
    <slot />
    <!-- <DefaultBtn name="Оплатить" color="brown" size="normal" type="primary" /> -->
    <div class="cart_total__privacy">
      Нажимая кнопку 'Оформить заказ', Вы принимаете условия соответствующей
      <RouterLink to="/">оферты: Оферты для физических лиц</RouterLink>
      или
      <RouterLink to="/"> Оферты для юридических лиц и ИП</RouterLink>, Политики
      конфиденциальности, а также даете Согласие на
      <RouterLink to="/"
        >обработку Ваших персональных данных и их передачу.</RouterLink
      >
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  total: any;
  length: any;
  delivery: any;
}>();
</script>

<style scoped lang="scss">
.cart_totals {
  max-width: 43.5rem;
  position: sticky;
  top: 12rem;
  right: 0;
}

.cart_total__head {
  @include flex-space;
  gap: 2rem;
  margin-bottom: 4rem;
  @include bp($point_2) {
    margin-bottom: 2rem;
  }
  span,
  p {
    font-size: 4rem;
    font-family: $font_2;
    @include bp($point_2) {
      font-size: 2.4rem;
    }
  }

  p {
    @include bp($point_2) {
      font-size: 3rem;
    }
  }
}

.cart_total__body {
  ul {
    margin-bottom: 4.5rem;
    @include bp($point_2) {
      margin-bottom: 2.7rem;
    }
  }
  li {
    @include flex-space;
    @include bp($point_2) {
      font-size: 1.6rem;
    }
    &:not(:last-child) {
      margin-bottom: 2rem;
      @include bp($point_2) {
        margin-bottom: 1.5rem;
      }
    }
  }
}

.cart_total__privacy {
  padding-top: 3.5rem;
  font-size: 1.6rem;
  @include bp($point_2) {
    font-size: 1.2rem;
    padding-top: 2rem;
  }
  a {
    color: $brown;
  }
}
</style>
