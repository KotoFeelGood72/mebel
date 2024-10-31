<template>
  <div class="usernew">
    <!-- <div class="loader">
      <Icons icon="svg-spinners:pulse-3" :size="100" />
    </div> -->
    <div class="usernew__form">
      <div class="usernew__input">
        <p>Имя</p>
        <Inputs v-model="user.billing.first_name" placeholder="Поддубная Елена" />
      </div>
      <div class="usernew__input">
        <p>Номер телефона</p>
        <InputPhone v-model="user.billing.phone" placeholder="+7 (999) 999-99-99" />
      </div>
      <DefaultBtn
        name="Продолжить"
        type="primary"
        color="brown"
        size="normal"
        @click="updateUser"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Inputs from "@/components/ui/Inputs.vue";
import InputPhone from "@/components/ui/InputPhone.vue";
import DefaultBtn from "@/components/ui/DefaultBtn.vue";
import { useUserStoreRefs, useUserStore } from "@/stores/useUserStore";
import { ref } from "vue";

const { user } = useUserStoreRefs();
const { handleNextStep } = useUserStore();

const emit = defineEmits(["onNext"]);

const isLoad = ref<boolean>(false);

function updateUser() {
  isLoad.value = true;
  handleNextStep();
  setTimeout(() => {
    isLoad.value = false;
  }, 300);
}
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

.usernew {
  position: relative;
}

// .loader {
//   position: absolute;
//   top: 50%;
//   left: 50%;
//   transform: translate(-50%, -50%);
//   width: 100%;
//   height: 100%;
//   @include flex-center;
// }
</style>
