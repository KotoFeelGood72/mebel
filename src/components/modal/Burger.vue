<template>
  <div class="burger">
    <div class="close-btn" @click="closeAllModals">
      <IconBtn icon="simple-line-icons:close" :size="34" />
    </div>
    <div class="burger-logo">
      <RouterLink to="/">
        <img src="/img/logo.svg" />
      </RouterLink>
    </div>
    <div class="burger-nav">
      <nav>
        <RouterLink to="/"> Главная</RouterLink>
        <RouterLink to="/shop/products"> Каталог</RouterLink>
        <RouterLink to="/rent"> Аренда</RouterLink>
        <RouterLink to="/design"> Для дизайнеров</RouterLink>
      </nav>
    </div>
    <div class="burger_bottom">
      <div class="burger-phone">
        <a target="_blank" href="tel:+78002222659">+7 (800) 222 26 59 </a>
      </div>
      <Socials />
    </div>
    <div class="burger-info">
      <nav>
        <RouterLink to="/offer-physical"> Оферта для физических лиц</RouterLink>
        <RouterLink to="/offer-legal">
          Оферта для юридических лиц и ИП</RouterLink
        >
        <RouterLink to="/privacy"> Политика конфиденциальности</RouterLink>
      </nav>
      <ul class="burger-company__info">
        <li>ИП Ворфоломеева Ольга Александровна</li>
        <li>ИНН 571000616047</li>
      </ul>
    </div>
    <DefaultBtn
      name="Войти"
      type="primary"
      color="brown"
      size="small"
      @click="openAuthModal()"
      v-if="!token"
    />
    <div class="user-card" @click="targetUser" v-else-if="token && user">
      <div class="user-icon">
        <img src="@/assets/icons/user.svg" />
      </div>
      <div class="user_content">
        <span>{{ user.email }}</span>
        <p>{{ user.billing.first_name }}</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Socials from "../ui/Socials.vue";
import { useModalStore } from "@/stores/useModalStore";
import IconBtn from "../ui/IconBtn.vue";
import DefaultBtn from "../ui/DefaultBtn.vue";
import { useRouter } from "vue-router";
import { useUserStoreRefs } from "@/stores/useUserStore";

const { closeAllModals, openModal, closeModal } = useModalStore();
const { user, token } = useUserStoreRefs();
const router = useRouter();

function openAuthModal() {
  closeModal("burger");
  openModal("auth");
}

const targetUser = () => {
  if (!user.value) {
    openModal("auth");
  } else {
    closeModal("auth");
    router.push("profile");
  }
};
</script>

<style scoped lang="scss">
.burger {
  position: fixed;
  top: 0;
  left: 0;
  max-width: 32rem;
  width: 100%;
  background-color: $white;
  z-index: 102;
  height: 100dvh;
  padding: 3rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;
}

.burger-nav {
  flex-grow: 1;
  nav {
    display: flex;
    flex-direction: column;
    a {
      border-bottom: 0.1rem solid #f0ecec;
      display: flex;
      padding: 1.5rem 0;
    }
  }
}

.burger_bottom {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.burger-phone {
  a {
    font-size: 2rem;
    color: $brown;
    font-family: $font_3;
  }
}

.burger-info {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    a {
      font-size: 1.4rem;
    }
  }
}

.burger-company__info {
  font-size: 1.2rem;
}

.burger-logo {
  a {
    @include flex-start;
  }
}

.close-btn {
  position: absolute;
  top: 2rem;
  right: -2rem;
  @include flex-center;
  padding: 0.2rem;
  :deep(svg) {
    border-radius: 100%;
    background-color: $white;
  }
}

.user-card {
  @include flex-start;
  align-items: flex-start;
  background-color: $light;
  border-radius: 0.5rem;
  padding: 1rem 2rem;
  gap: 1.5rem;
  font-size: 1.6rem;
  color: $brown;
  font-family: $font_2;
}

.user-icon {
  @include flex-center;
}
</style>
