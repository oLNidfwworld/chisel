<script setup>
import Agent from "../agent.vue";
import Btn from "../btn.vue";

const numIsVisible = ref(false);
</script>
<template>
  <div class="mini-card">
    <NuxtPicture
      class="mini-card__image-wrapper"
      format="png"
      :img-attrs="{ class: 'mini-card__img' }"
      src="/test.png"
    />
    <div class="mini-card__content">
      <span class="mini-card__red">4 500 000 ₽</span>
      <h3 class="mini-card__title">2 - комнатная квартира, 59.43 м²</h3>
      <span class="mini-card__desc">г. Павловский Посад, ул. Горького</span>
      <Btn
        v-if="!numIsVisible"
        class="mini-card__btn"
        @click="numIsVisible = !numIsVisible"
        >Показать телефон</Btn
      >
      <Agent v-else />
    </div>
  </div>
</template>
<style lang="scss">
.mini-card {
  background-color: $light-gray;
  border-radius: $border-sm;
  overflow: hidden;
  &__content {
    padding: 17px 23px;
  }
  &__red {
    font-size: 20px;
    font-weight: 700;
    color: $red;
    display: block;
    margin-bottom: 13px;
  }
  &__title {
    font-weight: 600;
    display: block;
    margin-bottom: 9px;
  }
  &__desc {
    color: $gray-dark;
    display: block;
    margin-bottom: 25px;
  }
  &__btn.btn {
    margin: auto;
    background-color: transparent;
    color: $black;
    border: 1px solid $red;
    transition: 0.3s ease-out color, 0.3s ease-out background-color;
    &:hover {
      background-color: $red;
      color: $white;
    }
  }
  &__img {
    height: 246px;
    object-fit: cover;
    width: 100%;
    background-color: $gray;
  }
}
</style>
