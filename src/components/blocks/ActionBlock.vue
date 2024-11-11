<template>
  <div class="action">
    <div class="container">
      <div class="action__main">
        <div class="action_form__w" :class="{ small: isHome, rent: isRent }">
          <h6>{{ title }}</h6>
          <div class="action__privacy" v-if="isHome">
            Отправляя заявку вы соглашаетесь на обработку своих
            <RouterLink to="/privacy">персональных данных</RouterLink> и
            принимаете
            <RouterLink to="/">политику конфиденциальности.</RouterLink>
          </div>
          <div class="action_txt" v-if="txt && !isHome">
            {{ txt }}
          </div>
          <div class="action_form">
            <div class="action_form__input">
              <InputPhone
                v-model="formData.phone"
                placeholder="Номер телефона"
                :error="v$.phone.$error"
              />
            </div>
            <div class="action__privacy" v-if="!isHome">
              Отправляя заявку вы соглашаетесь на обработку своих
              <RouterLink to="/privacy">персональных данных</RouterLink> и
              принимаете
              <RouterLink to="/">политику конфиденциальности.</RouterLink>
            </div>
            <div class="action_form__btn">
              <DefaultBtn
                :name="isLoading ? 'Отправка...' : 'Отправить заявку'"
                type="primary"
                color="brown"
                size="normal"
                @click="submitForm"
                :icon="isLoading ? 'svg-spinners:ring-resize' : ''"
                :disabled="isLoading"
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
import InputPhone from "../ui/InputPhone.vue";
import DefaultBtn from "../ui/DefaultBtn.vue";
import { useRoute } from "vue-router";
import { withDefaults, defineProps, computed } from "vue";
import { useFormHandler } from "@/composables/useFormHandler";

const route = useRoute();

withDefaults(
  defineProps<{
    title?: string;
    txt?: string;
    img?: string;
  }>(),
  {
    title: "Остались вопросы — с удовольствием ответим!",
    txt: "Свяжитесь с нами, чтобы обсудить ваши идеи и запросы. Наши специалисты всегда готовы предоставить консультацию и помочь на каждом этапе реализации вашего проекта. Вместе мы сможем создать нечто действительно выдающееся.",
    img: "https://fu.gleede.ru/wp-content/uploads/2024/11/action.jpg",
  }
);

const isPages = computed(() => {
  switch (route.name) {
    case "rent":
      return "Страница аренда";
    case "design":
      return "Страница дизайна";
    case "home":
      return "Главная страница";
  }
});

const formTitle = `Заявка на обратный звонок. Страница: ${isPages.value}`;
const requireName = false;

const { formData, isLoading, submitForm, v$ } = useFormHandler(
  formTitle,
  requireName
);

const isHome = computed(() => route.name === "home");
const isRent = computed(() => route.name === "rent");
</script>

<style scoped lang="scss">
.action {
  background-color: #f0f1f5;
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
    display: none;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.action_form {
  @include bp($point_2) {
    display: flex;
    flex-direction: column;
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
    order: 0;
  }
  a {
    color: #6484d4;
  }
}

.action_form__input {
  max-width: 41.5rem;
  margin-bottom: 3.1rem;
  @include bp($point_2) {
    margin-bottom: 2rem;
    order: 1;
  }
}

.action_form__btn {
  display: inline-flex;
  @include bp($point_2) {
    display: flex;
    order: 3;
  }
}

.action_txt {
  color: $gray;
  margin-bottom: 5rem;

  @include bp($point_2) {
    margin-bottom: 3.5rem;
  }
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
