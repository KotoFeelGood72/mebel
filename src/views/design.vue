<template>
  <div class="degign" v-if="page">
    <PageHead v-if="head && head.title" :data="head" />

    <div class="whats">
      <div class="container">
        <div class="whats_main">
          <div class="whats__content">
            <h2>{{ page.whats_title }}</h2>
            <p>{{ page.whats_txt }}</p>
          </div>
          <div class="whats_imgs">
            <a
              :href="item.img.url"
              data-fancybox="design"
              class="whats_img"
              v-for="(item, i) in page.whats_gallery"
              :key="'whats-item-g-' + i"
            >
              <img :src="item.img.url" :alt="item.img.alt" />
            </a>
          </div>
        </div>
      </div>
    </div>
    <div class="proposal">
      <div class="container">
        <div class="propposal_main">
          <h3>{{ page.services_title }}</h3>
          <ul class="propposal_list">
            <li
              class="proposal_item"
              v-for="(item, i) in page.services_list"
              :key="'proposal-item-' + i"
            >
              <div class="proposal_item__img">
                <img :src="item.img.url" :alt="item.img.alt" />
              </div>
              <div class="proposal_item__content">
                <h3>{{ item.title }}</h3>
                <p>{{ item.txt }}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ActionBlock
      img="http://fu.gleede.ru/wp-content/uploads/2024/11/action-2.jpg"
      title="Как начать сотрудничество?"
      txt="Свяжитесь с нами, чтобы обсудить ваши идеи и запросы. Наши специалисты всегда готовы предоставить консультацию и помочь на каждом этапе реализации вашего проекта. Вместе мы сможем создать нечто действительно выдающееся."
    />
  </div>
</template>

<script setup lang="ts">
import { usePage } from "@/services/usePage";
import PageHead from "@/components/head/PageHead.vue";
import ActionBlock from "@/components/blocks/ActionBlock.vue";
import { ref, onMounted, computed } from "vue";

const { useGetPage, page } = usePage();
// const head = ref<any>();

const head = computed(() => {
  if (page.value) {
    return {
      title: page.value.hero_title || "", // Если данные есть, то используем их
      txt: page.value.hero_txt || "",
      img: page.value.hero_img?.url || "",
      imgMobile: page.value.hero_img_mobile?.url || "",
      btn: false,
    };
  }
  return null; // Если данных нет, возвращаем null
});

onMounted(async () => {
  await useGetPage("116"); // Загружаем данные страницы
});
</script>

<style scoped lang="scss">
.whats {
  background-color: $light;
}

.whats_main {
  @include flex-space;
  gap: 10rem;
  padding: 4.2rem 0;

  @include bp($point_2) {
    flex-direction: column-reverse;
    gap: 2rem;
  }
}

.whats__content {
  max-width: 84.3rem;

  h2 {
    font-size: 4rem;
    margin-bottom: 3rem;
    @include bp($point_2) {
      font-size: 2.6rem;
      margin-bottom: 1rem;
    }
  }
  p {
    color: $gray;
  }
}

.whats_imgs {
  @include flex-start;
  gap: 2rem;
  max-width: 70.4rem;
  @include bp($point_2) {
    max-width: 100%;
    gap: 1rem;
  }
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.whats_img {
  @include flex-center;
  background-color: $black;
  cursor: pointer;
  img {
    transition: all 0.3s ease-in-out;
  }
  &:hover {
    img {
      opacity: 0.7;
    }
  }
}

.propposal_main {
  padding: 10rem 0;
  @include bp($point_2) {
    padding: 3rem 0;
  }

  & > h3 {
    font-size: 4rem;
    margin-bottom: 8rem;
    @include bp($point_2) {
      font-size: 2.6rem;
      margin-bottom: 1.8rem;
    }
  }
  p {
    color: $gray;
  }
}
.proposal_item__content {
  width: 50%;

  @include bp($point_2) {
    width: 100%;
  }
  h3 {
    font-size: 3rem;
    color: $brown;
    margin-bottom: 2rem;
    @include bp($point_2) {
      font-size: 2rem;
      margin-bottom: 1rem;
    }
  }
}
.proposal_item__img {
  width: 50%;
  @include bp($point_2) {
    width: 100%;
  }
  img {
    max-width: 80rem;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
}

.proposal_item {
  @include flex-start;
  gap: 2.9rem;

  @include bp($point_2) {
    flex-direction: column;
    gap: 1.5rem;
  }
  &:not(:last-child) {
    margin-bottom: 8rem;
    @include bp($point_2) {
      margin-bottom: 3rem;
    }
  }
  &:nth-child(2) {
    .proposal_item__img {
      @include bp($point_2, $direction: min) {
        order: 1;
      }
    }
    .proposal_item__content {
      @include bp($point_2, $direction: min) {
        order: 0;
      }
    }
  }
  &:last-child {
    padding-top: 2rem;
    .proposal_item__img {
      @include flex-center;
      order: 1;
      @include bp($point_2) {
        justify-content: flex-start;
      }
      img {
        max-width: 33rem;
        @include bp($point_2) {
          max-width: 13.5rem;
        }
      }
    }
    .proposal_item__content {
      order: 0;
      h3 {
        color: $dark;
      }
    }
  }
}
</style>
