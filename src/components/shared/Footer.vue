<template>
  <footer class="footer">
    <div class="container">
      <div class="footer_main">
        <div class="footer_col__brand">
          <Logo position="footer" />
          <div class="footer__email">
            <a target="_blank" href="mailto:Softpear@ya.ru">
              <Icons icon="ph:envelope-light" />
              <p>Softpear@ya.ru</p>
            </a>
          </div>
        </div>
        <div class="footer_col__center">
          <Nav />
          <div class="footer_additionaly">
            <RouterLink
              v-for="(item, i) in additionaly"
              :key="'additionaly-nav-item-' + i"
              :to="item.link"
              >{{ item.name }}</RouterLink
            >
          </div>
          <div class="footer_legal__info">
            <span>ИП Ворфоломеева Ольга Александровна </span>
            <span>ИНН 571000616047</span>
          </div>
        </div>
        <div class="footer_col__info">
          <Socials />
          <div class="footer_phone">
            <a target="_blank" href="tel:+78002222659">+7 (800) 222 26 59</a>
          </div>
          <div class="footer_phone">
            <a target="_blank" href="tel:+79189609505">+7 (918) 960 95 05</a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import Logo from "../ui/Logo.vue";
import Nav from "../ui/Nav.vue";
import Socials from "../ui/Socials.vue";
import { ref } from "vue";

const additionaly = ref<any>([
  { name: "Оферта для физических лиц", link: "/offer-physical" },
  { name: "Оферта для юридических лиц и ИП", link: "/offer-legal" },
  { name: "Политика конфиденциальности", link: "/privacy" },
]);
</script>

<style scoped lang="scss">
.footer {
  background-color: #fdfdff;
}

.footer_main {
  @include flex-start;
  align-items: flex-start;
  padding: 10rem 0 3.6rem 0;

  @include bp($point_2) {
    padding: 3rem 0;
    flex-wrap: wrap;
    gap: 3rem;
  }
}

.footer_col__center {
  padding: 0 12.7rem 0 19.9rem;
  @include flex-start;
  flex-direction: column;
  align-items: flex-start;
  gap: 3.3rem;

  @include bp($point_2) {
    padding: 0;
    order: 3;
    gap: 2.5rem;
  }

  :deep(.nav) {
    justify-content: flex-start;
  }
  :deep(.nav a) {
    font-family: $font_2;
  }
}

.footer_additionaly {
  font-size: 1.8rem;
  @include flex-start;
  gap: 3.4rem;

  @include bp($point_2) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    font-size: 1.6rem;
  }
  a {
    color: $brown;
  }
}

.footer_legal__info {
  font-size: 1.8rem;
  color: $gray;
  @include flex-start;
  gap: 1.9rem;

  @include bp($point_2) {
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    font-size: 1.2rem;
  }
}

.footer_col__info {
  :deep(.socials) {
    margin-bottom: 2rem;
  }

  div {
    margin-bottom: 1rem;
  }
}
.footer_phone {
  a {
    font-size: 1.8rem;
    color: $gray;
    line-height: 150%;
  }
}

.footer__email {
  a {
    @include flex-start;
    gap: 1.4rem;
    color: $gray;
    p {
      font-size: 1.8rem;
    }
  }
}

.footer_col__brand {
  gap: 2.2rem;
  display: flex;
  flex-direction: column;

  @include bp($point_2) {
    // max-width: 14.7rem;
    align-items: flex-start;
  }
}
</style>
