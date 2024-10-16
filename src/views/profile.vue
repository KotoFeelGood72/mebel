<template>
  <div class="profile">
    <div class="container">
      <div class="profile_main">
        <div class="profile_head">
          <h1>Личный кабинет</h1>
          <nav class="profile_nav">
            <RouterLink to="/profile"> Профиль </RouterLink>
            <RouterLink to="/profile/order"> Заказы </RouterLink>
          </nav>
        </div>
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.profile {
  padding-top: calc($header + 5.8rem);
  padding-bottom: 10rem;
}

.profile_head {
  text-align: center;
  h1 {
    font-size: 4rem;
    margin-bottom: 2.5rem;
  }
}

.profile_nav {
  @include flex-center;
  gap: 10rem;
  margin-bottom: 8.1rem;
  a {
    font-size: 1.8rem;
    @include flex-center;
    line-height: 110%;

    &.router-link-exact-active {
      color: $brown;
      font-family: $font_2;
      border-bottom: 0.1rem solid $brown;
    }
  }
}
</style>
