<script setup lang="ts">
import { propsPush } from "~/composables/propsPush";
import Btn from "../../base/btn.vue";
import PropsRow from "../props-row.vue";
import type { Swiper } from 'swiper';
import type { KeyedObject } from "~/assets/types/entity/data-object";
import Agent from "../Agent/agent.vue";
import { useFavoriteStore } from "~/store/fav"; 
const numIsVisible = ref(false);
const swiperInstance = ref<Swiper | null>();
const onSwiperInitialized = (newSwiperInstance: Swiper) => {
  swiperInstance.value = newSwiperInstance;
};
const props = withDefaults(defineProps<{
  item: KeyedObject,
  showBottomRow?: boolean,
  showFav?: boolean
}>(), {
  showBottomRow: true,
  showFav: true
});
const price = computed(() => {
  if (props.item.price) {
    return Number(props.item.price).toLocaleString('ru-RU');
  } else {
    return 'цена не указана';
  }
});
const photos = computed<string[]>(() => {
  return props.item.photos.map((photo: any) => photo?.src || photo)
}); 
const propsData = computed(() => {
  const detailData = props.item;
  const arr = [...((props?.item?.customProps || []) as unknown as { name: string, value: string }[])];
  propsPush(detailData, arr);

  return arr;
});
const favStore = useFavoriteStore();
const inFav = favStore.isFavorite(props.item.id);
const topPropsRow = computed(() => propsData.value.slice(0, 5));
// const bottomPropsRow = computed(() => propsData.value.slice(5, 9));


const isLink = computed(() => {
  if (props.item.id) {
    return {
      tag: resolveComponent('NuxtLink'),
      attrs: {
        href: `/realty/immovable-${props.item.id}`
      }
    }
  } else {
    return {
      tag: 'div'
    }
  }
}); 
</script>
<template>
   <div class="object-card">
      <component
         :is="isLink.tag"
         v-bind="isLink.attrs"
         class="object-card__slider-wrapper">
         <ClientOnly>
            <Swiper
               class="object-card__slider"
               space-between="15"
               @swiper="onSwiperInitialized">
               <SwiperSlide
                  v-for="(photo, index) in photos"
                  :key="index">
                  <picture>
                     <source :srcset="apiServerUrl(photo)" >
                     <img
                        class="object-card__img"
                        :alt="item?.name" >
                  </picture>
               </SwiperSlide>
            </Swiper>
         </ClientOnly>
      </component>
      <div class="object-card__content">
         <div class="object-card__top">
            <div class="object-card__top-row">
               <NuxtLink :to="`/realty/immovable-${item.id}`">
                  <h3 class="object-card__title">{{ item.name }}</h3>
               </NuxtLink>
               <div class="object-card__additional">
                  <span v-if="item.ID_OBJECT">id{{ item.ID_OBJECT }}</span>
                  <ClientOnly v-if="showFav">
                     <button @click="favStore.changeFavorite(item.id)">
                        <IFav
                           :class="{ 'is-fav': inFav }"
                           filled />
                     </button>
                  </ClientOnly>
               </div>
            </div>
            <div class="object-card__red">{{ price }} ₽</div>
            <div
               v-if="item.location"
               class="object-card__desc">
               {{ item.location }}
            </div>
            <PropsRow
               v-if="topPropsRow && topPropsRow.length > 0"
               :items="topPropsRow" />
         </div>
         <div
            v-if="showBottomRow"
            class="object-card__bottom">
            <Btn
               class="object-card__link"
               :to="`/realty/immovable-${item.id}`"
               preference="transparent">Подробнее
            </Btn>
            <Btn
               v-if="!numIsVisible"
               @click="numIsVisible = !numIsVisible">
               Показать телефон
            </Btn>
            <Agent
               v-else
               :agent="item.agent" />
         </div>
      </div>
   </div>
</template>
<style lang="scss" scoped>
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/mixins/media.scss" as media;

.is-fav {
  // filter: brightness(0) saturate(100%) invert(27%) sepia(76%) saturate(2653%) hue-rotate(348deg) brightness(87%) contrast(103%);
  // filter: brightness(0) saturate(100%) invert(60%) sepia(86%) saturate(1304%) hue-rotate(122deg) brightness(111%) contrast(80%);
  // variable.$re
}

.object-card {
  border-radius: variable.$border-sm;
  overflow: hidden;

  &__title {
    font-size: 18px;
    font-weight: 700;
    &:hover{
      color: variable.$red;
    }
  }

  &__img {
    aspect-ratio: 1/1;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  &__slider-wrapper {
    height: 207px;
    overflow: hidden;
    position: relative;

    & .swiper {
      height: 100%;
    }

    & picture {
      height: 100%;
      display: block;
    }

    @include media.min-md {
      height: 277px;
    }

    @include media.min-llg {
      height: unset;
    }
  }

  &__top-row {
    display: flex;
    gap: 10px;
    justify-content: space-between;
    margin-bottom: 15px;
  }

  &__additional {
    display: flex;
    align-items: end;
    flex-direction: column;
    gap: 15px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    gap: 30px;
    padding: 30px 10px;
    background-color: #f3f3f3;

    @include media.min-md {
      padding: 30px 30px;
    }
  }

  &__desc {
    font-weight: 600;
    margin: 16px 0 15px 0;

    @include media.min-sm {
      margin: 16px 0 34px 0;
    }

    @include media.min-md {
      margin: 16px 0 4px 0;
    }
  }

  &__red {
    font-size: 24px;
    font-weight: 700;
    color: variable.$red;
  }

  &__bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;

    &>* {
      width: 100%;
      justify-content: center;

      @include media.min-sm {
        width: fit-content;
      }
    }

    @include media.min-sm {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__link {
    background-color: transparent;
    border: 1px solid variable.$red;
    color: variable.$black;
  }

  @include media.min-llg {
    display: grid;
    grid-template-columns: 355px auto;
  }
}
</style>
