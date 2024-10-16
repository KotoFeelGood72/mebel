<template>
  <!-- <div class="edit">
    <div class="edit_form">
      <div class="close">
        <Icon name="simple-line-icons:close" size="30" />
      </div>
      <div class="edit_head">
        <h3>Редактирование</h3>
        <NuxtLink to="/profile/edit/phone"> Изменить номер телефона </NuxtLink>
      </div>
      <div class="edit_form">
        <div class="edit_input">
          <p>Имя</p>
          <Inputs placeholder="Поддубная Елена" v-model="user.name" />
        </div>
        <div class="edit_input">
          <p>E-mail</p>
          <Inputs placeholder="elrnadub@gmail.com" v-model="user.email" />
        </div>
        <div class="edit_btn">
          <DefaultBtn
            name="Сохранить изменения"
            type="primary"
            color="brown"
            size="small"
          />
        </div>
        <div class="edit__delete">Удалить профиль</div>
      </div>
    </div>
  </div> -->
</template>

<script setup lang="ts">
import Inputs from "~/components/ui/Inputs.vue";
import DefaultBtn from "~/components/ui/DefaultBtn.vue";
import { useUserStoreRefs } from "~/store/useUserStore";

const { user } = useUserStoreRefs();
</script>

<style lang="scss">
.edit {
  background-color: $light;
  max-width: 114rem;
  margin: 0 auto 20.4rem auto;
  position: relative;
  padding: 4.8rem 4.8rem 5.9rem 4.8rem;
}

.close {
  position: absolute;
  top: 3.8rem;
  right: 3.8rem;
  cursor: pointer;
  @include flex-center;
  color: #9e9e9e;
  transition: all 0.3s ease-in-out;
  &:hover {
    color: #b23e00;
  }
}

.edit_head {
  text-align: center;
  margin-bottom: 1.5rem;

  h3 {
    font-size: 3rem;
    margin-bottom: 2rem;
  }

  a {
    color: $brown;
  }
}

.edit_form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  max-width: 55.9rem;
  width: 100%;
  margin: 0 auto;
  gap: 2.8rem;
}

.edit_input {
  p {
    font-size: 1.8rem;
    font-family: $font_2;
    color: $gray;
    margin-bottom: 1rem;
  }
}

.edit_btn {
  display: inline-flex;
  justify-content: center;
}

.edit__delete {
  text-align: center;
  cursor: pointer;
  font-size: 1.8rem;
  color: #b23e00;
  &:hover {
    color: $brown;
  }
}
</style>
