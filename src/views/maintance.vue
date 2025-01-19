<template>
  <div class="maintenance">
    <h1>Сайт в разработке</h1>
    <p>Мы скоро вернёмся! Следите за временем:</p>
    <div class="timer">
      <div
        v-for="(value, label) in timeRemaining"
        :key="label"
        class="time-box"
      >
        <span class="value">{{ value }}</span>
        <span class="label">{{ labels[label] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

// Укажите целевую дату
const targetDate = new Date("2025-02-01T00:00:00");

// Состояние для оставшегося времени
const timeRemaining = ref({
  days: "00",
  hours: "00",
  minutes: "00",
  seconds: "00",
});

// Русскоязычные метки для таймера
const labels = {
  days: "Дни",
  hours: "Часы",
  minutes: "Минуты",
  seconds: "Секунды",
};

// Функция для обновления времени
const updateTimer = () => {
  const now = new Date();
  const difference = targetDate.getTime() - now.getTime();

  if (difference <= 0) {
    timeRemaining.value = {
      days: "00",
      hours: "00",
      minutes: "00",
      seconds: "00",
    };
    return;
  }

  const days = Math.floor(difference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((difference % (1000 * 60)) / 1000);

  timeRemaining.value = {
    days: String(days).padStart(2, "0"),
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
};

let timerInterval: number;

// Обновляем таймер каждую секунду
onMounted(() => {
  updateTimer();
  timerInterval = setInterval(updateTimer, 1000);
});

// Очищаем интервал при размонтировании компонента
onUnmounted(() => {
  clearInterval(timerInterval);
});
</script>

<style scoped lang="scss">
.maintenance {
  background-image: url("../assets/img/maintance.webp");
  background-size: cover;
  width: 100%;
  height: 100dvh;
  @include flex-center;
  flex-direction: column;
  color: $white;
  position: relative;
  &:before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000;
    backdrop-filter: blur(2rem);
    content: "";
    opacity: 0.5;
  }

  h1 {
    font-size: 6rem;
    position: relative;
    z-index: 2;
  }

  p {
    margin: 2rem 0;
    color: $white;
    z-index: 2;
    position: relative;
  }
}

.timer {
  display: flex;
  gap: 20px;
  margin-top: 20px;
  position: relative;
  z-index: 22;
}

.time-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: 2rem;
}

.value {
  font-size: 6rem;
  font-weight: bold;
  color: $white;
}

.label {
  margin-top: 5px;
  font-size: 1.6rem;
  text-transform: uppercase;
  color: #b9b9b9;
}
</style>
