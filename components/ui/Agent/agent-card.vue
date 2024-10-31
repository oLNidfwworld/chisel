<script setup lang="ts">
import Btn from "~/components/base/btn.vue";
import Agent from "./agent.vue";
import Inpt from "~/components/base/inpt.vue";
import type IAgent from "~/assets/types/entity/agent";
import EPopupForm from "../e-popup-form.vue";

defineProps<{ agent: IAgent }>();
 
const visibleNumber = defineModel({
  required: false,
  type: Boolean
}); 

const myPhone = ref('')
const validation = ref(false), validationMessage = ref('');
const show = ref(false), title = ref(''), content = ref('');
const callbackMe = async () => {

  if (myPhone.value.length < 16) {
    validationMessage.value = 'Неверный формат номера телефона'
    validation.value = false;
  } else {
    validation.value = true;
    validationMessage.value = ''
  }

  if (validation.value) {
    const res : { status : boolean } = await $fetchApi('/Mail/', {
      method: 'POST',
      params: {
        action: 'DETAIL_FORM_CALLBACK',
        phone: myPhone.value,
        TITLE: `Заявка на обратный звонок по участкам МКР Трубицыно`,
      }
    })
    show.value = true;
    if (res.status) {
      title.value = 'Заявка успешно отправленна!'
      content.value = 'Мы свяжемся с вами'
    } else {
      title.value = 'Ошибка'
      content.value = 'Произошла непредвиденная ошибка'
    }
  }
}

</script>
<template>
  <form class="agent-card" @submit.prevent="callbackMe">
    <div class="agent-card__block agent-card__container">
      <h4 class="agent-card__title">Специалист по объекту</h4>
      <Agent :agent="agent" :visible-number="visibleNumber" />
      <button v-if="!visibleNumber" type="button" class="agent-card__show" @click="visibleNumber = true">
        Показать
        <IPhone filled />
      </button>
    </div>
    <div class="agent-card__block">
      <p class="agent-card__text">Оставьте свой номер,мы вам перезвоним</p>
      <Inpt v-model="myPhone" v-maska="'+7 ### ### ##-##'" class="agent-card__inpt" type="text" name="number" />
      <p v-if="validationMessage" class="text-red text-center"  >{{ validationMessage }}</p>
    </div>
    <Btn type="submit" class="agent-card__submit">Позвоните мне</Btn>
  </form> 
  <EPopupForm :is-visible="show" @close="show = !show">
    <template #header>
      {{ title }}
    </template>
    <template #content>
      <p class="text-center">
        {{ content }}
      </p>
    </template>
  </EPopupForm>
</template>
<style lang="scss">
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/mixins/media.scss" as media;

.agent-card {
  background-color: #f3f3f3;
  border-radius: variable.$border-sm;

  &__block {
    padding: 11px;
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__block+&__block {
    border-top: 1px solid variable.$gray;
  }

  &__show {
    color: variable.$red;
    font-size: 14px;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 10px;
    width: fit-content;
    margin: 0 auto;
  }

  &__title {
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    display: block;
  }

  &__text {
    font-size: 14px;
    font-weight: 600;
    text-align: center;
  }

  &__submit {
    width: 100%;
  }

  &__inpt.inpt {
    text-align: center;
  }
}
</style>
