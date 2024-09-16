<script setup>
import { YandexMap, YandexMapDefaultSchemeLayer } from "vue-yandex-maps";
import Btn from "~/components/base/btn.vue";
import AgentCard from "~/components/ui/Agent/agent-card.vue";
import PropsRow from "~/components/ui/props-row.vue";

const thumbsSwiper = ref(null);
const setThumbsSwiper = (swiperInstance) => {
  thumbsSwiper.value = swiperInstance;
};
const slider = ref(null);
const setSlider = (swiperInstance) => {
  slider.value = swiperInstance;
};
const slideThumb = (dir) => {
  switch (dir) {
    case "next":
      slider.value.slideNext();
      break;
    case "prev":
      slider.value.slidePrev();
      break;
  }
};

</script>
<template>
  <div class="object-detail container">
    <div class="object-detail__top-row">
      <ClientOnly>
        <div>
          <Swiper
            :modules="[SwiperThumbs]"
            :space-between="30"
            :thumbs="{ swiper: thumbsSwiper }"
            class="object-detail-slider"
            @swiper="setSlider"
          >
            <SwiperSlide class="object-detail-slide">
              <picture>
                <source srcset="/test.png" />
                <img class="object-detail-slide__image" alt="" />
              </picture>
            </SwiperSlide>
          </Swiper>
          <div class="object-detail-thumbs-slider__outer">
            <button
              class="object-detail-thumbs-slider__nav-btn object-detail-thumbs-slider__nav-btn--prev"
              @click="() => slideThumb('prev')"
            >
              <IArrowNav filled />
            </button>
            <button
              class="object-detail-thumbs-slider__nav-btn object-detail-thumbs-slider__nav-btn--next"
              @click="() => slideThumb('next')"
            >
              <IArrowNav filled />
            </button>
            <Swiper
              watch-slides-progress
              :modules="[SwiperThumbs]"
              slides-per-view="auto"
              :space-between="30"
              class="object-detail-thumbs-slider"
              @swiper="setThumbsSwiper"
            >
              <SwiperSlide class="object-detail-thumbs-slide">
                <div class="object-detail-thumbs-slide__wrapper">
                  <picture>
                    <source srcset="/test.png" />
                    <img class="object-detail-thumbs-slide__image" alt="" />
                  </picture>
                </div>
              </SwiperSlide>
            </Swiper>
          </div>
        </div>
      </ClientOnly>
      <div class="object-detail__content">
        <div class="object-detail__block object-detail__block--flex">
          <div class="object-detail__mini-info">
            <span> Просмотров: <span class="font-bold">4</span> </span>
            <span> id538453 </span>
          </div>
          <h1 class="object-detail__title">2 — комнатная квартира, 59.43 м²</h1>
          <span class="object-detail__red">4500000 ₽</span>
          <span class="object-detail__adr font-semibold"
            >Московская обл, Павловский Посад городской округ, г. Павловский Посад,
            ул. Кирова</span
          >
        </div>
        <div class="object-detail__block">
          <PropsRow />
          <PropsRow light />
        </div>
        <div class="object-detail__block object-detail__block--2cols">
          <div class="object-detail__btns">
            <Btn preference="gray"> <IFav filled /> В избранное </Btn>
            <Btn preference="gray"> <IPlacemark filled />На карте </Btn>
            <Btn preference="gray"> <IPrint filled /> Версия для печати </Btn>
          </div>
          <AgentCard />
        </div>
      </div>
    </div>
    <div class="object-detail__description">
      <p>
        Продам уютную 2-комнатную квартиру в сталинском доме в центральной части города.
        Квартира в хорошем состоянии, комнаты изолированные, высокие потолки, санузел
        раздельный, окна ПВХ, газ.колонка-автомат. Дом кирпичный, тёплый, в подъезде
        сделан ремонт. Приличные соседи. Рядом с домом вся необходимая инфраструктура:
        Лицей им.Тихонова, музыкальная школа, городской парк, магазины, банки, детские
        садики, дворец культуры и спорта и многое другое — все в пешей доступности. До ж/д
        вокзала 10 мин пешком. Квартира в собственности более 15 лет, 1 собственник,
        прямая продажа.
      </p>
    </div>
    <div class="object-detail__map-wrapper">
      <!-- <ClientOnly>
          <YandexMap :coordinates="[product.item.coordinates.lat, product.item.coordinates.lon]"> 
            <YandexMarker :coordinates="[product.item.coordinates.lat, product.item.coordinates.lon]" :options="{
              iconLayout: 'default#imageWithContent',
              iconImageHref: '/ekspertMarker.svg',
              iconImageSize: [50, 50],
              iconImageOffset: [-25, -55]
            }" :marker-id="product.item.id">
              <template #component>
                {{ product.item.location }}
              </template>
            </YandexMarker>
          </YandexMap>
      </ClientOnly> -->
    </div>
  </div>
</template>
<style lang="scss">
.object-detail {
  line-height: 1.33;
  display: flex;
  flex-direction: column;
  gap: 30px;
  &__top-row {
    display: flex;
    flex-direction: column-reverse;
    gap: 30px;

    @include min-llg {
      display: grid;
      grid-template-columns: 469px auto;
      gap: 24px;
    }
    @include min-xl {
      grid-template-columns: 675px auto;
    }
  }
  &__block {
    &--2cols {
      display: flex;
      flex-direction: column;
      gap: 30px;
      @include min-md {
        display: grid;
        gap: 90px;
        grid-template-columns: 4fr 6fr;
      }
    }
    &--flex {
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
  }
  &__content {
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
  &__btns {
    display: flex;
    flex-direction: column;
    gap: 22px;
    @include min-sm {
      display: grid;
      grid-template-columns: 1fr 1fr;
    }
    @include min-md {
      display: flex;
    }
    & > * {
      padding: 6px 0;
      width: 100%;
    }
  }

  &__mini-info {
    font-size: 14px;
    display: flex;
    justify-content: space-between;
    gap: 20px;
  }
  &__title {
    font-size: 20px;
    font-weight: 700;
    @include min-sm {
      font-size: 30px;
    }
  }
  &__red {
    display: block;
    color: $red;
    font-size: 24px;
    font-weight: bold;
  }
  &__description {
    line-height: 1.56;
    font-weight: 300;
  }
}
.object-detail-slider {
  width: 100%;
  margin-bottom: 32px;
}
.object-detail-slide {
  border-radius: $border-sm;
  overflow: hidden;
  picture {
    width: 100%;
  }
  &__image {
    object-fit: cover;
    width: 100%;
  }
}

.object-detail-thumbs-slider {
  margin: 0 30px;

  &__nav-btn {
    width: fit-content;
    height: fit-content;
    position: absolute;
    inset: 0;
    margin: auto 0;

    &--next {
      left: auto;
      right: 5px;
      transform: rotate(180deg);
    }
    &--prev {
      right: auto;
      left: 5px;
    }
  }
  &__outer {
    position: relative;
  }
}
.object-detail-thumbs-slide {
  border-radius: $border-sm;
  overflow: hidden;
  max-width: 84px;
  border: 1px solid transparent;
  transition: 0.3s ease-out border-color;
  cursor: pointer;
  picture {
    width: 100%;
  }
  &__image {
    object-fit: cover;
    width: 100%;
    aspect-ratio: 4/3;
  }

  &.swiper-slide-thumb-active {
    border-color: $red;
  }
}
</style>
