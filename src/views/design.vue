<!-- @format -->

<template>
  <div class="degign" v-if="page">
    <PageHead :data="head" />
    <div class="whats">
      <div class="container">
        <div class="whats_main">
          <div class="whats__content">
            <h2>{{ page.whats_title }}</h2>
            <p>{{ page.whats_txt }}</p>
          </div>
          <div class="whats_imgs">
            <div
              class="whats_img"
              v-for="(item, i) in page.whats_gallery"
              :key="'whats-item-g-' + i"
            >
              <img :src="item.img.url" :alt="item.img.alt" />
            </div>
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
      img="/img/action-1.jpg"
      title="Как начать сотрудничество?"
      txt="Свяжитесь с нами, чтобы обсудить ваши идеи и запросы. Наши специалисты всегда готовы предоставить консультацию и помочь на каждом этапе реализации вашего проекта. Вместе мы сможем создать нечто действительно выдающееся."
    />
  </div>
</template>

<script setup lang="ts">
import PageHead from "~/components/head/PageHead.vue";
import ActionBlock from "~/components/blocks/ActionBlock.vue";

const head = ref<any>();
const page = ref<any>();

async function getDesign() {
  try {
    const { $main } = useNuxtApp();
    const response = await $main.get("/design.json");
    page.value = response.data.acf;
    head.value = {
      title: page?.value?.hero_title,
      txt: page?.value?.hero_txt,
      img: page?.value?.hero_img.url,
      btn: false,
    };
  } catch (error) {}
}

onMounted(async () => {
  await getDesign();
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
}

.whats__content {
  max-width: 84.3rem;

  h2 {
    font-size: 4rem;
    margin-bottom: 3rem;
  }
  p {
    color: $gray;
  }
}

.whats_imgs {
  @include flex-start;
  gap: 2rem;
  max-width: 70.4rem;
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

  & > h3 {
    font-size: 4rem;
    margin-bottom: 8rem;
  }
  p {
    color: $gray;
  }
}
.proposal_item__content {
  width: 50%;

  h3 {
    font-size: 3rem;
    color: $brown;
    margin-bottom: 2rem;
  }
}
.proposal_item__img {
  width: 50%;
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
  &:not(:last-child) {
    margin-bottom: 8rem;
  }
  &:nth-child(2) {
    .proposal_item__img {
      order: 1;
    }
    .proposal_item__content {
      order: 0;
    }
  }
  &:last-child {
    padding-top: 2rem;
    .proposal_item__img {
      @include flex-center;
      order: 1;
      img {
        max-width: 33rem;
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
