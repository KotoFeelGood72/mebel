<template>
  <div class="character">
    <div class="link-character" id="link-character"></div>
    <div class="container">
      <h2>{{ title }}</h2>
      <div class="character_main">
        <div class="character_img">
          <img :src="img" alt="" />
        </div>
        <div class="character__content">
          <ul class="character_list">
            <li class="character_item" v-for="(item, i) in list">
              <p>{{ item.name }}</p>
              <span>{{ item.value }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  img: string;
  list: any;
}>();
</script>

<style scoped lang="scss">
.character {
  background-color: $light;
  padding: 8rem 0 14.5rem 0;
  position: relative;
  @include bp($point_2) {
    padding: 3rem 0 2.2rem 0;
  }
  h2 {
    font-size: 4rem;
    font-family: $font_2;
    font-weight: 500;
    margin-bottom: 6rem;
    @include bp($point_2) {
      font-size: 2.4rem;
      margin-bottom: 2rem;
    }
  }
}

.character_main {
  @include flex-start;
  gap: 30rem;
  @include bp($point_2) {
    gap: 3.4rem;
    flex-direction: column;
  }
}

.character_img {
  max-width: 65.2rem;
  @include bp($point_2) {
    order: 2;
  }
  img {
    width: 100%;
    height: 100%;
    @include flex-center;
    object-fit: cover;
  }
}

.character_list {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  min-width: 59.1rem;
  width: 100%;

  @include bp($point_2) {
    min-width: 100%;
    order: 1;
    gap: 2rem;
  }

  li {
    p {
      font-size: 3rem;
      font-family: $font_2;
      font-weight: 500;
      margin-bottom: 2rem;
      @include bp($point_2) {
        font-size: 1.8rem;
        margin-bottom: 1rem;
      }
    }
    span {
      color: $gray;
      display: block;
      border-bottom: 0.1rem solid $brown;
      padding-bottom: 1.5rem;
      @include bp($point_2) {
        font-size: 1.6rem;
      }
    }
  }
}

.link-character {
  position: absolute;
  top: -14rem;
}
</style>
