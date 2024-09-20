<script setup lang="ts">
import Agent from "../Agent/agent.vue";
import Btn from "../../base/btn.vue";
import type { ObjectShorted } from "~/assets/types/entity/object-detail";
interface IProps {
  data : ObjectShorted
}
const props = defineProps<IProps>();
const numIsVisible = ref(false); 
const price = computed(() => props.data.price.toLocaleString("ru-RU"));
</script>
<template>
  <div class="mini-card">
    <NuxtPicture
      v-if="(data.photos.length > 0)"
      class="mini-card__image-wrapper"
      format="png"
      :img-attrs="{ class: 'mini-card__img' }"
      :src="apiServerUrl(data.photos[0].websrc)"
    />
    <ICityPlaceholder v-else class="mini-card__placeholder" filled />
    <div class="mini-card__content">
      <span class="mini-card__red">{{ price }} ₽</span>
      <h3 class="mini-card__title">{{ data.name }}</h3>
      <span class="mini-card__desc">{{ data.location }}</span>
      <Btn
        v-if="!numIsVisible"
        class="mini-card__btn"
        preference="transparent"
        @click="numIsVisible = !numIsVisible"
        >Показать телефон</Btn
      >
      <Agent v-else :agent="data.agent" />
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
  &__placeholder{
    width: 100% !important;
    display: block; 
    height: 246px !important;
    & > * {
      fill: $red;
      background-color: $gray;
    }
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
  }
  &__img {
    height: 246px;
    object-fit: cover;
    width: 100%;
    background-color: $gray;
  }
}
</style>
