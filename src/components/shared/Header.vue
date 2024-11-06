<template>
  <header class="header" :class="{ gray: isHome, scrolled: isScrolled }">
    <div class="container">
      <div class="header_top">
        <div class="burger" @click="openModal('burger')">
          <Icons icon="iconamoon:menu-burger-horizontal-thin" :size="35" />
        </div>
        <div class="header_col__left">
          <div class="header_phone">
            <a target="_blank" href="tel:+78002222659">+7 (800) 222 26 59 </a>
          </div>
          <Socials />
        </div>
        <div class="header_center" :class="{ 'logo--scrolled': isScrolled }">
          <Logo />
        </div>
        <div class="header_col__right">
          <DefaultBtn
            name="Связаться с нами"
            type="secondary"
            color="brown"
            size="xsmall"
            @click="isCallBackModal"
          />
          <div class="header__action">
            <div class="header_user" @click="targetUser()">
              <img src="@/assets/icons/user.svg" v-if="!user" />
              <div v-else class="icon-name">
                <div class="circle"></div>
                {{ firstLetter }}
              </div>
            </div>
            <div class="header_carts" @click="nextCarts()">
              <div class="counter">{{ isCarts.length }}</div>
              <IconBtn icon="solar:cart-large-4-outline" />
            </div>
          </div>
        </div>
      </div>
      <div class="header_bottom">
        <Nav />
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import Socials from "@/components/ui/Socials.vue";
import Logo from "../ui/Logo.vue";
import DefaultBtn from "../ui/DefaultBtn.vue";
import IconBtn from "../ui/IconBtn.vue";
import Nav from "../ui/Nav.vue";
import { useRoute, useRouter } from "vue-router";
import { useModalStore } from "@/stores/useModalStore";
import { useUserStoreRefs } from "@/stores/useUserStore";
import { useCartStoreRefs } from "@/stores/useCartStore";

const route = useRoute();
const router = useRouter();
const { openModal, closeModal } = useModalStore();
const { user } = useUserStoreRefs();
const { carts } = useCartStoreRefs();

const isHome = computed(() => route.name != "home");
const isCarts = computed(() => carts.value);

const isCallBackModal = () => {
  openModal("callback");
};

const targetUser = () => {
  if (!user.value) {
    openModal("auth");
  } else {
    closeModal("auth");
    router.push({ name: "user" });
  }
};

const nextCarts = () => {
  if (isCarts.value.length > 0) {
    router.push("/cart");
  }
};

const isScrolled = ref(false);
const firstLetter = computed(() =>
  user.value?.email ? user.value.email.charAt(0).toUpperCase() : ""
);

const handleScroll = () => {
  if (window.scrollY > 100) {
    isScrolled.value = true;
  } else {
    isScrolled.value = false;
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped lang="scss">
.header {
  padding-bottom: 4rem;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 99;
  height: $header;
  width: 100%;
  transition: all 0.3s ease-in-out;

  @include bp($point_2) {
    height: 7rem;
    padding: 0;
  }

  &.gray {
    background-color: $light;
  }

  &.scrolled {
    height: 11rem;
    background-color: #f0f1f59c;
    backdrop-filter: blur(1rem);
    border-bottom: 0.1rem solid #f0f1f59c;
    @include bp($point_2) {
      height: 7rem;
      padding: 0;
    }
    :deep(.logo) {
      @include bp($point_2, $direction: min) {
        transform: translateY(-300%);
      }
    }
    .header_bottom {
      @include bp($point_2, $direction: min) {
        transform: translateY(-320%);
      }
    }
  }
}

.header_bottom {
  transition: all 0.3s ease-in-out;
  @include bp($point_2) {
    display: none;
  }
}
.header_top {
  @include flex-space;
  padding: 3.4rem 0 4.6rem 0;
  position: relative;

  @include bp($point_2) {
    padding: 2rem 0;
  }
}

.header_center {
  position: absolute;
  left: 49.2%;
  top: 46.3%;
  transform: translate(-50%, -50%);
  @include bp($point_2) {
    position: static;
    transform: none;
  }
}

.header_col__left,
.header_col__right,
.header__action {
  @include flex-start;
  gap: 4rem;
}

.header_col__right {
  gap: 3.5rem;
  :deep(.button) {
    @include bp($point_2) {
      display: none;
    }
  }
}
.header__action {
  gap: 2.4rem;
  min-width: 7.8rem;
  position: relative;
  z-index: 11;
  @include bp($point_2) {
    min-width: auto;
  }
}
.header_col__left {
  align-items: flex-end;

  @include bp($point_2) {
    display: none;
  }
}
.header_phone {
  font-size: 1.8rem;
  font-family: $font_2;
  color: $gray;
}

.header_user {
  @include flex-start;
  gap: 1rem;
  font-size: 1.4rem;
  font-family: $font_3;
  color: $brown;
  cursor: pointer;
  @include bp($point_2) {
    display: none;
  }
}

.header_carts {
  position: relative;
  @include flex-center;
}

.counter {
  font-size: 1rem;
  background-color: $lbrown;
  width: 1.5rem;
  height: 1.5rem;
  @include flex-center;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
  font-weight: 400;
  color: $white;
  border-radius: 100%;
  position: absolute;
  top: -0.3rem;
  right: -0.5rem;
}

.burger {
  @include flex-center;
  color: $brown;
  @include bp($point_2, $direction: min) {
    display: none;
  }
}

.icon-name {
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 100%;
  @include flex-center;
  font-size: 2.2rem;
  font-family: $font_3;
  padding: 0.5rem 0.5rem 0.5rem 0.5rem;
  line-height: 0;
  position: relative;
  color: $brown;

  .circle {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    border-radius: 100%;
    z-index: -1;
    background-color: $lbrown;
    opacity: 0.3;
  }
}
</style>
