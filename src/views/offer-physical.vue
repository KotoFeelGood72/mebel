<template>
  <div class="offerta" v-if="page">
    <div class="container">
      <div class="offerta_main">
        <div class="offerta_head">
          <h1>{{ page.title }}</h1>
        </div>
        <div class="offerta_row">
          <div class="offerta__col">
            <ul class="offerta_list__action">
              <li class="offerta_item" @click="printPage">
                <Icons icon="material-symbols-light:print-outline" :size="40" />
              </li>
              <li class="offerta_item" @click="saveAsPDF">
                <Icons
                  icon="material-symbols-light:save-outline-rounded"
                  :size="40"
                />
              </li>
              <li class="offerta_item" @click="copyLink">
                <Icons icon="material-symbols-light:link-rounded" :size="42" />
              </li>
            </ul>
            <div class="offerta_quot" v-html="page.short_txt"></div>
            <div
              class="offerta_content"
              v-html="page.txt"
              ref="contentRef"
            ></div>
          </div>
          <div class="offerta__img">
            <img :src="page.img" alt="" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePage } from "@/services/usePage";
import { onMounted, ref } from "vue";
import html2pdf from "html2pdf.js";

const { useGetPage, page } = usePage();
const contentRef = ref<HTMLElement | null>(null);

onMounted(async () => {
  await useGetPage("oferta-dlya-fizicheskih-licz");
});

const printPage = () => {
  window.print();
};

const saveAsPDF = () => {
  if (contentRef.value) {
    html2pdf().from(contentRef.value).save("offerta.pdf");
  }
};

const copyLink = async () => {
  try {
    await navigator.clipboard.writeText(window.location.href);
    alert("Ссылка скопирована!");
  } catch (err) {
    console.error("Ошибка копирования ссылки:", err);
  }
};
</script>

<style lang="scss">
.offerta {
  padding-top: calc($header + 8.1rem);
  padding-bottom: 7.5rem;
  :deep(p) {
    font-size: 1.6rem;
    line-height: 150%;
    color: $gray;
  }
}

.offerta_head {
  margin-bottom: 4.5rem;
  h1 {
    font-size: 4rem;
    font-family: $font_2;
    font-weight: 500;
  }
}

.offerta_list__action {
  @include flex-start;
  gap: 5rem;
  margin-bottom: 6.8rem;
  li {
    @include flex-center;
    cursor: pointer;
  }
}

.offerta_row {
  @include flex-start;
  align-items: flex-start;
  gap: 11.2rem;
}

.offerta_quot {
  padding-bottom: 3.2rem;
  margin-bottom: 3.2rem;
  border-bottom: 0.1rem solid $black;
}

.offerta__img {
  max-width: 72.5rem;
  img {
    width: 100%;
    height: 100%;
  }
}

.offerta__col {
  max-width: 91.1rem;
}

@media print {
  header,
  footer {
    display: none !important;
  }

  .offerta {
    padding-top: 0 !important;
    padding-bottom: 0 !important;
  }

  body {
    margin: 0;
    padding: 0;
  }
}
</style>
