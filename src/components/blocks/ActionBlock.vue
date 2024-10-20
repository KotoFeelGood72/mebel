<template>
  <div class="action">
    <div class="container">
      <div class="action__main">
        <div class="action_form__w" :class="{small: isHome, rent: isRent}">
          <h6>{{ title }}</h6>
          <div class="action__privacy" v-if="isHome">
            Отправляя заявку вы соглашаетесь на обработку своих
            <RouterLink to="/privacy">персональных данных</RouterLink to="/privacy"> и принимаете <RouterLink to="/">политику
            конфиденциальности.</RouterLink>
          </div>
          <div class="action_txt" v-if="txt && !isHome">
          {{ txt }}
          </div>
          <div class="action_form">
          <div class="action_form__input">
           <InputPhone v-model="phone" placeholder="Номер телефона"/>
          </div>
          <div class="action__privacy" v-if="!isHome">
            Отправляя заявку вы соглашаетесь на обработку своих
            <RouterLink to="/privacy">персональных данных</RouterLink to="/privacy"> и принимаете <RouterLink to="/">политику
            конфиденциальности.</RouterLink>
          </div>
          <div class="action_form__btn">
          
          <DefaultBtn
            name="Отправить заявку"
            type="primary"
            color="brown"
            size="normal"
          />
          </div>
          </div>
        </div>
        <div class="action__img">
          <img :src="img" alt="" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputPhone from '../ui/InputPhone.vue';
import DefaultBtn from '../ui/DefaultBtn.vue';
import { useRoute } from 'vue-router';
import { withDefaults, defineProps, ref, computed } from 'vue';

const route = useRoute()

const props = withDefaults(
  defineProps<{
    title?: string
    txt?: string
    img?: string
  }>(), {
    
    title: 'Остались вопросы — с удовольствием ответим!',
    txt: 'Свяжитесь с нами, чтобы обсудить ваши идеи и запросы. Наши специалисты всегда готовы предоставить консультацию и помочь на каждом этапе реализации вашего проекта. Вместе мы сможем создать нечто действительно выдающееся.',
    img: '/img/action.jpg'
  }
)
const phone = ref<string>()

const isHome = computed(() => route.name === 'home')
const isRent = computed(() => route.name === 'rent')
</script>

<style scoped lang="scss">

.action {
  background-color: #F0F1F5;
  position: relative;
  margin-top: 5rem;
  .container {
    @include bp($point_2) {
      padding: 0;
    }
  }
}

.action__main {
  @include flex-start;
  min-height: 61.1rem;

  @include bp($point_2) {
    min-height: auto;
    flex-direction: column-reverse;
  }
}


.action__img {
  max-width: 110rem;
  @include flex-center;
  position: absolute;
  right: 0;
  height: 100%;
  @include bp($point_2) {
    position: static;

  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.action_form__w {

  max-width: 84.3rem;
  @include bp($point_2) {
    padding: 1.6rem 1.6rem 5rem 1.6rem;
  }
  
  &.small {
    max-width: 56.9rem;
  }

  h6 {
    font-size: 4rem;
    margin-bottom: 2rem;
    @include bp($point_2) {
      font-size: 2.6rem;
    }
  }
}

.action__privacy {
  font-size: 1.8rem;
  color: $gray;
  margin-bottom: 4rem;
  max-width: 75rem;
  @include bp($point_2) {
    font-size: 1.4rem;
    margin-bottom: 2.5rem;
  }
  a {
    color: #6484D4;
  }
}

.action_form__input {
  max-width: 41.5rem;
  margin-bottom: 3.1rem;
  @include bp($point_2) {
    margin-bottom: 2rem;
  }
}

.action_form__btn {
  display: inline-flex;
  @include bp($point_2) {
    display: flex;
  }
}

.action_txt {
  // margin-right: -29rem;
  color: $gray;
  margin-bottom: 5rem;
}

.rent {
  &.action_form__w {
    max-width: 70.5rem;
    h6 {
      margin-bottom: 5rem;
    }
    .action__privacy {
      max-width: 56rem;
    }
  }
}
</style>
