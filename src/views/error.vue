<template>
  <div class="thanks">
    <div class="container">
      <div class="thanks__main">
        <h1>Ошибка при покупке!</h1>
        <div class="thanks_img">
          <img src="/img/thanks.png" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.thanks {
  padding-top: 18.3rem;
  background-color: $light;
}

.thanks__main {
  padding: 10rem 0 6.3rem 0;
  h1 {
    font-size: 6.5rem;
    text-align: center;
    font-family: $font_2;
    font-weight: 500;
    margin-bottom: 6.5rem;

    @include bp($point_2) {
      font-size: 4.5rem;
      margin-bottom: 4.5rem;
    }
  }
}

.thanks_img {
  @include flex-center;

  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}
</style>
