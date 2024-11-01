<template>
  <div class="rent" v-if="page">
    <PageHead :data="head" page="rent" />
    <div class="rent_desc">
      <div class="container">
        <div class="rentdesc_main">
          <div class="rentdesc__img">
            <img :src="page.your_img?.url" />
          </div>
          <div class="rentdesc__content">
            <ul>
              <li v-for="(item, i) in page.your_list" :key="'your-item-' + i">
                <p>{{ item.title }}</p>
                <span>{{ item.txt }} </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="price">
      <div class="container">
        <div class="price_main">
          <div class="price__content">
            <h2>{{ page.price_title }}</h2>
            <ul>
              <li v-for="(item, i) in page.price_list" :key="'price-item-' + i">
                <div class="price-icon">
                  <img src="@/assets/img/fruit.svg" alt="" />
                </div>
                <div v-html="item.item"></div>
              </li>
            </ul>
            <div class="price_notice">Длительная аренда — еще выгоднее!</div>
          </div>
          <div class="price_img">
            <img :src="page?.price_img?.url" :alt="page.price_img?.alt" />
          </div>
        </div>
      </div>
    </div>
    <div class="colors">
      <div class="container">
        <div class="colors_main">
          <div class="colors_head">
            <h3>{{ page.colors_title }}</h3>
            <p>{{ page.colors_subtitle }}</p>
          </div>
          <div class="colors_slder__w">
            <div class="color_slider" v-if="page && page.colors_list">
              <div class="colors_slider">
                <Swiper
                  :slides-per-view="4"
                  :space-between="20"
                  :modules="[Navigation]"
                  :navigation="{
                    prevEl: `.colors_prev`,
                    nextEl: `.colors_next`,
                  }"
                >
                  <SwiperSlide
                    v-for="(item, i) in page.colors_list"
                    :key="'colors-item-slide-' + i"
                  >
                    <div class="colors_slide">
                      <div class="color_slide__img">
                        <img :src="item.img.url" :alt="item.img.alt" />
                        <div class="color_ex" v-if="item.colors_ex">
                          <img src="@/assets/icons/fire.svg" />
                          <p>Эксклюзив</p>
                        </div>
                      </div>
                      <div class="colors_slide__txt" v-html="item.name"></div>
                    </div>
                  </SwiperSlide>
                </Swiper>
                <div class="colors_navigation">
                  <div class="colors_prev">
                    <img src="@/assets/icons/arrow-brown-right.png" />
                  </div>
                  <div class="colors_next">
                    <img src="@/assets/icons/arrow-brown-right.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="conditions">
      <div class="container">
        <div class="conditions_main">
          <h3>{{ page.conditions_title }}</h3>
          <ul class="conditions_list">
            <li
              class="conditions_item"
              v-for="(item, i) in page.conditions_list"
              :key="'conditions-item-' + i"
            >
              <div class="conditions_item__img">
                <img :src="item.img.url" :alt="item.img.alt" />
              </div>
              <p>{{ item.txt }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="rentxt">
      <div class="container">
        <div class="rentxt__main">
          <div class="rentxt__row">
            <h3>{{ page.whats_title }}</h3>
            <ul>
              <li v-for="(item, i) in page.whats_list" :key="'whats-item-' + i">
                <p>{{ item.title }}</p>
                <span>{{ item.txt }}</span>
              </li>
            </ul>
          </div>
          <div class="rentxt__row">
            <h3>{{ page.other_title }}</h3>
            <ul>
              <li v-for="(item, i) in page.other_list" :key="'other-item-' + i">
                <p>{{ item.title }}</p>
                <span>{{ item.txt }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="geo">
      <div class="container">
        <div class="geo_main">
          <h2>{{ page.geo_title }}</h2>
          <ul class="geo_list">
            <li
              class="geo_item"
              v-for="(item, i) in page.geo_list"
              :key="'geo-item-' + i"
            >
              <a class="geo_item__img" :href="item.img.url" v-fancybox>
                <img :src="item.img.url" :alt="item.img.alt" />
              </a>
              <p>{{ item.title }}</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="event">
      <div class="container">
        <div class="event_main">
          <h3>{{ page.events_title }}</h3>
          <ul class="event_list">
            <li
              class="event_item"
              v-for="(item, i) in page.events_list"
              :key="'events-item-' + i"
            >
              <p>{{ item.title }}</p>
              <span>{{ item.txt }}</span>
            </li>
          </ul>
          <ul class="event_grid">
            <li
              class="event_grid__item"
              v-for="(item, i) in page.events_gallery"
              :key="'event-gallery-item' + i"
            >
              <a :href="item.img.url" data-fancybox="gallery">
                <img :src="item.img.url" :alt="item.img.alt" />
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <ActionBlock
      title="Арендуйте у нас кресла-мешки для комфортного и радостного
		мероприятия"
      txt=""
      img="http://fu.gleede.ru/wp-content/uploads/2024/11/action-1.jpg"
    />
  </div>
</template>

<script setup lang="ts">
import PageHead from "@/components/head/PageHead.vue";
import { Swiper, SwiperSlide } from "swiper/vue";
import "swiper/swiper-bundle.css";
import { Navigation } from "swiper/modules";
import ActionBlock from "@/components/blocks/ActionBlock.vue";
import { computed, onMounted } from "vue";
import { usePage } from "@/services/usePage";

const { useGetPage, page } = usePage();
const head = computed(() => {
  if (page.value) {
    return {
      title: page.value.hero_title || "",
      txt: page.value.hero_txt || "",
      img: page.value.hero_img?.url || "",
      btn: false,
    };
  }
  return null;
});

onMounted(async () => {
  await useGetPage("124");
});
</script>

<style scoped lang="scss">
.rent_desc {
  background-color: $light;
}

.rentdesc_main {
  @include flex-start;
  gap: 16.5rem;
  padding: 6rem 0;
}

.rentdesc__img {
  max-width: 70.3rem;
}

.rentdesc__content {
  ul {
    li {
      max-width: 62.4rem;
      p {
        font-size: 3rem;
        font-weight: 600;
        margin-bottom: 2.5rem;
      }
      &:not(:last-child) {
        margin-bottom: 5rem;
      }
    }
  }
}

.price_main {
  padding: 10rem 0;
  @include flex-start;
  gap: 1rem;

  h2 {
    font-size: 5rem;
    margin-bottom: 4rem;
  }
}

.price__content {
  max-width: 105rem;
  ul {
    @include flex-start;
    flex-wrap: wrap;
    gap: 3.5rem 15.8rem;
    margin-bottom: 5.7rem;
    li {
      @include flex-start;
      gap: 1.9rem;
      :deep(span) {
        color: $brown;
      }
    }
  }
}

.price_notice {
  color: $brown;
  font-size: 2.4rem;
  font-weight: 500;
}

.price_img {
  max-width: 70.5rem;
  @include flex-center;
}

.colors_head {
  margin-bottom: 3rem;
  h3 {
    font-size: 5rem;
    margin-bottom: 2rem;
    font-family: $font_2;
  }
}

.color_slide__img {
  @include flex-center;
  margin-bottom: 1.5rem;
  max-width: 41.5rem;
  height: 25.9rem;
  background-color: $light;
  position: relative;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.color_ex {
  position: absolute;
  top: 2rem;
  left: 2rem;
  @include flex-start;
  align-items: flex-end;
  gap: 1.4rem;
  font-size: 1.4rem;
  color: $brown;
  font-family: $font_2;
  img {
    @include flex-center;
    width: 1.9rem;
  }
}

.colors_slide__txt {
  :deep(span) {
    color: $brown;
  }
}

.color_slider {
  padding: 6rem 0 9.5rem 0;
}

.colors_slider {
  position: relative;
  user-select: none;
}

.colors_navigation {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: calc(100% + 3rem);
  @include flex-space;
  z-index: 11;
  div {
    @include flex-center;
    cursor: pointer;
    color: $lbrown;
    transition: all 0.3s ease-in-out;
    &:first-child {
      transform: rotate(180deg);
    }

    &.swiper-button-disabled {
      opacity: 0.4;
      cursor: not-allowed;
    }
    &:hover {
      color: $brown;
    }
  }
}

.conditions {
  background-color: $light;
}

.conditions_main {
  padding: 7rem 0;
  text-align: center;
  h3 {
    font-size: 4rem;
    margin-bottom: 9rem;
  }
}

.conditions_list {
  @include flex-space;
  gap: 2rem;
}

.conditions_item__img {
  @include flex-center;
  margin-bottom: 4rem;
  img {
    max-width: 17rem;
    height: 100%;
    object-fit: contain;
  }
}

.rentxt {
}

.rentxt__main {
  padding: 10rem 0;
  display: flex;
  flex-direction: column;
  gap: 10rem;
}

.rentxt__row {
  h3 {
    font-size: 5rem;
    max-width: 90.9rem;
    font-family: $font_2;
    font-weight: 500;
    margin-bottom: 4.5rem;
  }

  ul {
    @include flex-start;
    flex-wrap: wrap;
    max-width: 130rem;
    gap: 4rem 16.5rem;
    li {
      max-width: 56rem;
      p {
        font-size: 2.6rem;
        font-family: $font_2;
        color: $brown;
        margin-bottom: 1.5rem;
      }
    }
  }
}

.geo {
  background-color: $light;
}

.geo_main {
  padding: 8rem 0;

  h2 {
    margin-bottom: 4rem;
    font-size: 4rem;
    font-family: $font_2;
    font-weight: 500;
    text-align: center;
  }
}

.geo_list {
  @include flex-space;
  justify-content: space-around;
}

.geo_item__img {
  height: 19rem;
  flex-direction: column;
  @include flex-center;
  margin-bottom: 4rem;
}

.event_main {
  padding: 10rem 0 5rem 0;

  h3 {
    font-size: 5rem;
    font-family: $font_2;
    font-weight: 500;
    margin-bottom: 4.5rem;
  }
}

.event_list {
  @include flex-start;
  flex-wrap: wrap;
  gap: 4rem 16.5rem;
  max-width: 129.2rem;
  margin-bottom: 8rem;
  li {
    max-width: 56rem;
    width: 100%;

    p {
      font-size: 2.5rem;
      font-family: $font_2;
      font-weight: 500;
      color: $brown;
      margin-bottom: 1.5rem;
    }
  }
}

.event_grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: auto auto;
  max-height: 70.2rem;
  grid-template-areas:
    "one two four"
    "one free four";

  .event_grid__item {
    background-color: $black;
    img {
      transition: all 0.3s ease-in-out;
    }
    &:hover {
      img {
        opacity: 0.7;
      }
    }
    a {
      @include flex-center;
    }
    &:nth-child(1) {
      grid-area: one;
    }

    &:nth-child(2) {
      grid-area: two;
      height: 40.4rem;
    }

    &:nth-child(3) {
      height: 29.8rem;
      grid-area: free;
    }
    &:nth-child(4) {
      grid-area: four;
    }
  }
}
</style>
