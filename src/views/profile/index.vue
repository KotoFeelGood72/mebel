<template>
  <div class="user" v-if="user && user.billing">
    <div class="user__main">
      <div class="user__info">
        <div class="user__content">
          <p>{{ user.billing?.first_name }}</p>
          <ul>
            <li>
              <p>Телефон</p>
              <span>{{ user?.billing.phone }}</span>
            </li>
            <li>
              <p>E-mail</p>
              <span>{{ user?.email }}</span>
            </li>
          </ul>
        </div>
        <div class="user__edit">
          <RouterLink to="/profile/edit">Редактировать</RouterLink>
        </div>
        <div class="user__logout" @click.prevent="logoutUser">Выйти</div>
      </div>
      <div class="user__img">
        <img src="/img/profile.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useUserStoreRefs, useUserStore } from "@/stores/useUserStore";

// definePageMeta({
//   middleware: "auth",
// });

const { user } = useUserStoreRefs();
const { logout } = useUserStore();

async function logoutUser() {
  await logout();
}
</script>

<style scoped lang="scss">
.user__main {
  @include flex-start;
  align-items: flex-end;
  gap: 7.1rem;
  padding-bottom: 20rem;

  @include bp($point_2) {
    flex-direction: column;
    gap: 0;
    padding-bottom: 0;
  }

  & > div {
    width: 50%;
    @include bp($point_2) {
      width: 100%;
    }
    &:first-child {
      background-color: $light;
      padding: 3rem;
      position: relative;
      margin-bottom: 1.1rem;
      max-height: 33.1rem;
      @include bp($point_2) {
        padding: 3rem 1.5rem;
        max-height: 100%;
      }
    }
  }
}

.user__edit,
.user__logout {
  position: absolute;
  top: 3rem;
  right: 3rem;
  cursor: pointer;
  font-size: 1.8rem;
  border-bottom: 0.1rem solid $brown;
  line-height: 95%;
  transition: all 0.3s ease-in-out;
  color: $brown;
  @include bp($point_2) {
    position: static;
    display: flex;
    justify-content: center;
    text-align: center;
    border-color: transparent;
  }
  a {
    color: inherit;
    @include bp($point_2) {
      display: inline-flex;
      text-decoration: underline;
    }
  }
  &:hover {
    border-color: transparent;
    color: $lbrown;
    @include bp($point_2) {
      display: inline-flex;
      text-decoration: none;
    }
  }
}

.user__logout {
  top: auto;
  bottom: 3rem;
  border-color: transparent;

  @include bp($point_2) {
    width: 100%;
    margin-top: 2rem;
    color: #b23e00;
  }
  &:hover {
    color: $lbrown;
    border-color: $lbrown;
  }
}

.user__content {
  padding: 1.8rem 1.3rem 2.7rem 1.3rem;
  @include bp($point_2) {
    padding: 0 0 3rem 0;
  }
  & > p {
    margin-bottom: 4.5rem;
    font-size: 2.4rem;
    font-family: $font_2;
    color: $dark;
    @include bp($point_2) {
      font-size: 2rem;
      margin-bottom: 2rem;
    }
  }

  ul {
    li {
      &:not(:last-child) {
        margin-bottom: 4rem;
        @include bp($point_2) {
          margin-bottom: 2.5rem;
        }
      }
      p {
        color: $gray;
        font-family: $font_2;
        margin-bottom: 1rem;
        @include bp($point_2) {
          font-size: 1.8rem;
        }
      }
      span {
        font-weight: 400;
      }
    }
  }
}

.user__img {
  max-width: 80rem;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
