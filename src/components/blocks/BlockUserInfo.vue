<template>
  <div class="userInfo">
    <div class="userInfo__head">
      <h3>Информация о покупателе</h3>
      <p v-if="!token">Авторизуйтесь, чтобы отслеживать свой заказ</p>
    </div>

    <div class="user_toggle__w" v-if="!token">
      <div class="user__toggle">
        <label class="switch">
          <input
            type="checkbox"
            v-model="isAuthorized"
            @change="toggleAuthorization"
          />
          <span class="slider round"></span>
        </label>
        <span>Продолжить без авторизации</span>
      </div>
      <div class="userInfo__variant">
        <div v-if="!isAuthorized" class="userInfo_btn__auth">
          <DefaultBtn
            name="Войти или зарегистрироваться"
            type="secondary"
            color="black"
            size="large"
            @click="openModal('auth')"
          />
        </div>

        <div v-else class="userInfoForm">
          <div class="userInfoForm__input">
            <p>Имя*</p>
            <Inputs
              v-model="userData.name"
              placeholder="Поддубная Елена"
              :class="{ error: v$.name.$error && isAuthorized }"
            />
            <span v-if="v$.name.$error && isAuthorized" class="error">
              Имя обязательно и должно быть длиной не менее 2 символов.
            </span>
          </div>

          <div class="userInfoForm__input">
            <p>Телефон*</p>
            <InputPhone
              v-model="userData.phone"
              placeholder="+7 (918) 123 45 67"
              :class="{ error: v$.phone.$error && isAuthorized }"
            />
            <span v-if="v$.phone.$error && isAuthorized" class="error">
              Телефон обязателен.
            </span>
          </div>

          <div class="userInfoForm__input">
            <p>E-mail</p>
            <Inputs
              v-model="userData.email"
              placeholder="dundub@gmail.com"
              type="email"
              :class="{ error: v$.email.$error && isAuthorized }"
            />
            <span v-if="v$.email.$error && isAuthorized" class="error">
              Введите корректный e-mail.
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="userInfoData" v-else>
      <p>
        <strong>Имя:</strong> {{ user?.billing?.first_name || "Не указано" }}
      </p>
      <p>
        <strong>Телефон:</strong> {{ user?.billing?.phone || "Не указано" }}
      </p>
      <p><strong>Email:</strong> {{ user?.billing?.email || "Не указано" }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, watch, watchEffect } from "vue";
import useVuelidate from "@vuelidate/core";
import { required, email, minLength } from "@vuelidate/validators";
import { useUserStoreRefs, useUserStore } from "@/stores/useUserStore";
import { useModalStore } from "@/stores/useModalStore";
import DefaultBtn from "../ui/DefaultBtn.vue";
import Inputs from "../ui/Inputs.vue";
import InputPhone from "../ui/InputPhone.vue";

const { user, token } = useUserStoreRefs();
const { clearBilling } = useUserStore();
const { openModal } = useModalStore();
const isAuthorized = ref<boolean>(false);

// Создаем реактивные данные для хранения значений формы
const userData = ref({
  name: user.value.billing?.first_name || "",
  phone: user.value.billing?.phone || "",
  email: user.value.billing?.email || "",
});

watchEffect(() => {
  user.value.billing.first_name = userData.value.name;
  user.value.billing.phone = userData.value.phone;
  user.value.billing.email = userData.value.email;
});

// Обновляем userData, если изменяются данные в user.billing
watch(user, () => {
  userData.value = {
    name: user.value.billing?.first_name || "",
    phone: user.value.billing?.phone || "",
    email: user.value.billing?.email || "",
  };
});

// Определяем правила валидации
const rules = computed(() => ({
  name: { required, minLength: minLength(2) },
  phone: { required },
  email: { required, email },
}));

// Используем Vuelidate
const v$ = useVuelidate(rules, userData);

// Функция переключения авторизации и сброса валидации
const toggleAuthorization = () => {
  if (isAuthorized.value) {
    clearBilling();
    userData.value = {
      name: user.value.billing?.first_name || "",
      phone: user.value.billing?.phone || "",
      email: user.value.billing?.email || "",
    };
  } else {
    v$.value.$reset(); // Сбрасываем валидацию, если авторизация выключена
  }
};

// Следим за изменениями isAuthorized
watch(isAuthorized, toggleAuthorization);
</script>

<style scoped lang="scss">
.error {
  color: red;
  font-size: 0.9rem;
}

.user__toggle {
  @include flex-start;
  gap: 1.7rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 6.3rem;
  height: 3.4rem;
}

.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #b6b6b6;
  transition: 0.4s;
  border-radius: 2rem;
}

.slider:before {
  position: absolute;
  content: "";
  width: 2.4rem;
  height: 2.4rem;
  left: 0.5rem;
  top: 50%;
  transform: translateY(-50%);
  background-color: $white;
  transition: 0.4s;
  border-radius: 50%;
}

input:checked + .slider {
  background-color: $dark;
}

input:checked + .slider:before {
  left: 3.4rem;
}

.userInfo__head {
  h3 {
    font-size: 3rem;
    font-family: $font_2;
    margin-bottom: 2.5rem;
    font-weight: 500;

    @include bp($point_2) {
      font-size: 2.4rem;
    }
  }
  p {
    font-size: 1.8rem;
    margin-bottom: 3.5rem;
    @include bp($point_2) {
      font-size: 1.6rem;
    }
  }
}

.user__toggle {
  margin-bottom: 5rem;
}

.userInfo_btn__auth {
  display: inline-flex;
}

.userInfoForm {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  max-width: 53.6rem;

  p {
    margin-bottom: 1.5rem;
    font-size: 1.8rem;
    @include bp($point_2) {
      font-size: 1.6rem;
    }
  }

  &:deep(.phone_input) {
    input {
      max-height: 4.8rem;
    }
  }
}

.userInfoData {
  display: flex;
  flex-direction: column;
  gap: 3rem;
  @include bp($point_2) {
    gap: 1.5rem;
  }
  p {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    @include bp($point_2) {
      font-size: 1.6rem;
      gap: 1rem;
    }
  }
}
</style>
