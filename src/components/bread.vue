<template>
  <!-- Добавляем класс с учётом выбранной темы -->
  <nav class="breadcrumbs" :class="themeClass" aria-label="breadcrumb">
    <ol>
      <li v-for="(crumb, index) in items" :key="index">
        <!-- Если есть 'to' и это не последний пункт - делаем ссылку -->
        <RouterLink v-if="crumb.to && index < items.length - 1" :to="crumb.to">
          {{ crumb.label }}
        </RouterLink>

        <!-- Иначе выводим простой текст (последний пункт) -->
        <span v-else>{{ crumb.label }}</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
import { RouterLink } from "vue-router";
import { computed } from "vue";

interface CrumbItem {
  label: string;
  to?: string;
}

// Можно указать в типе две возможные темы: 'white' | 'dark'
const props = defineProps<{
  items: CrumbItem[];
  theme?: "white" | "dark"; // делаем необязательным, чтобы была тема по умолчанию
}>();

// Если 'theme' не передали, по умолчанию используем 'white'
const themeClass = computed(() => {
  return props.theme === "dark" ? "dark" : "white";
});
</script>

<style scoped lang="scss">
.breadcrumbs {
  font-size: 1.8rem;
  margin-bottom: 2rem;

  @include bp($point_2) {
    font-size: 1.2rem;
  }

  ol {
    list-style: none;
    display: flex;
    gap: 0.5rem;
    padding: 0;
    margin: 0;

    @include bp($point_2) {
      flex-wrap: wrap;
    }
  }

  li {
    &:not(:last-child)::after {
      content: "/";
      margin: 0 0.5rem;
      color: #999;
    }
  }

  a {
    text-decoration: none;
    transition: color 0.2s ease;
    &:hover {
      text-decoration: underline;
    }
  }

  /* Стили темы WHITE */
  &.white {
    color: $white;

    a {
      color: inherit;
    }
    li::after {
      color: inherit; /* Разделитель */
    }
  }

  /* Стили темы DARK */
  &.dark {
    color: $dark;

    a {
      color: inherit;
    }
    li::after {
      color: inherit;
    }
  }
}
</style>
