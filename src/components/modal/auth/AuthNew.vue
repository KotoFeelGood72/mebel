<template>
  <div class="usernew">
    <div class="usernew__form">
      <div class="usernew__input">
        <p>Имя</p>
        <Inputs
          v-model="user.customer.first_name"
          placeholder="Поддубная Елена"
        />
      </div>
      <div class="usernew__input">
        <p>Номер телефона</p>
        <InputPhone
          v-model="user.customer.phone"
          placeholder="+7 (999) 999-99-99"
        />
      </div>
      <DefaultBtn
        name="Продолжить"
        type="primary"
        color="brown"
        size="normal"
        @click="handleNextStep"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Inputs from "@/components/ui/Inputs.vue";
import InputPhone from "@/components/ui/InputPhone.vue";
import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import { useUserStoreRefs, useUserStore } from "@/stores/useUserStore";

const { user } = useUserStoreRefs();
const { handleNextStep } = useUserStore();

const emit = defineEmits(["onNext"]);
</script>

<style scoped lang="scss">
.usernew__input {
  margin-bottom: 2.5rem;
  p {
    font-size: 1.8rem;
    font-family: $font_2;
    color: $gray;
    margin-bottom: 1.5rem;
  }
}
</style>
