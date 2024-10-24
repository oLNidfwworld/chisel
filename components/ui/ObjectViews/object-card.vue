<script setup lang="ts">
import Btn from "../../base/btn.vue";
import PropsRow from "../props-row.vue";
import type { Swiper } from 'swiper';
import type { KeyedObject } from "~/assets/types/entity/data-object";
const numIsVisible = ref(false);
const swiperInstance = ref<Swiper | null>();
const onSwiperInitialized = (newSwiperInstance: Swiper) => {
  swiperInstance.value = newSwiperInstance;
};
const props = withDefaults(defineProps<{
  item: KeyedObject,
  showBottomRow? : boolean,
  showFav? : boolean
}>(), {
  showBottomRow : true,
  showFav : true
}); 
const price = computed(() => {
  if (props.item.PRICE) {
    return Number(props.item.PRICE).toLocaleString('ru-RU');
  } else {
    return undefined;
  }
}); 
const rowProps = computed(( ) => {
  const newProps : { name: string, value: string }[] = [...((props?.item?.CUSTOM_PROPS || []) as unknown as { name: string, value: string}[] )]; 
  return newProps ;
})
</script>
<template>
  <div class="object-card">
    <div class="object-card__slider-wrapper">
      <ClientOnly v-if="Array.isArray(item.PHOTO)">
        <Swiper class="object-card__slider" space-between="15" @swiper="onSwiperInitialized">
          <SwiperSlide v-for="(photo, index) in item.PHOTO" :key="index">
            <picture>
              <source :srcset="apiServerUrl(photo)" />
              <img class="object-card__img" :alt="item.NAME" />
            </picture>
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
      <div v-else>
        <picture>
          <source :srcset="apiServerUrl(item.PHOTO)" />
          <img class="object-card__img" :alt="item.NAME" />
        </picture>
      </div>
    </div>
    <div class="object-card__content">
      <div class="object-card__top">
        <div class="object-card__top-row">
          <h3 class="object-card__title">{{ item.NAME }}</h3>
          <div class="object-card__additional">
            <span v-if="item.ID_OBJECT">id{{ item.ID_OBJECT }}</span>
            <ClientOnly v-if="showFav">
              <button>
                <IFav filled />
              </button>
            </ClientOnly>
          </div>
        </div>
        <div class="object-card__red">{{ price }} ₽</div>
        <div v-if="item.ADDRESS" class="object-card__desc">
          {{ item.ADDRESS }}
        </div>
        <PropsRow :items="rowProps"/>
      </div>
      <div v-if="showBottomRow" class="object-card__bottom">
        <Btn class="object-card__link" to="/realty/immovable-1" preference="transparent">Подробнее
        </Btn>
        <Btn v-if="!numIsVisible" @click="numIsVisible = !numIsVisible">
          Показать телефон
        </Btn>
        <!-- <Agent v-else /> -->
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/mixins/media.scss" as media;

.object-card {
  border-radius: variable.$border-sm;
  overflow: hidden;

  &__title {
    font-size: 18px;
    font-weight: 700;
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
