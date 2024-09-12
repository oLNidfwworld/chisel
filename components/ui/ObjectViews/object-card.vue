<script setup lang="ts">
import Agent from "../Agent/agent.vue";
import Btn from "../../base/btn.vue";
import PropsRow from "../props-row.vue";
const numIsVisible = ref(false);
const swiperInstance = ref<unknown>();
const onSwiperInitialized = (swiperInstance: unknown) => {
  swiperInstance.value = swiperInstance;
};
</script>
<template>
  <div class="object-card">
    <div class="object-card__slider-wrapper">
      <ClientOnly>
        <Swiper
          class="object-card__slider"
          space-between="15"
          @swiper="onSwiperInitialized"
        >
          <SwiperSlide>
            <picture>
              <source srcset="/test.png" />
              <img alt="" />
            </picture>
          </SwiperSlide>
        </Swiper>
      </ClientOnly>
    </div>
    <div class="object-card__content">
      <div class="object-card__top">
        <div class="object-card__top-row">
          <h3 class="object-card__title">2 — комнатная квартира, 59.43 м²</h3>
          <div class="object-card__additional">
            <span>id23123</span>
            <ClientOnly>
              <button>
                <IFav filled />
              </button>
            </ClientOnly>
          </div>
        </div>
        <div class="object-card__red">450 000 ₽</div>
        <div class="object-card__desc">
          Московская обл, Павловский Посад городской округ, г. Павловский Посад,
          ул. Кирова
        </div>
        <PropsRow />
      </div>
      <div class="object-card__bottom">
        <Btn class="object-card__link" to="/realty/immovable-1" preference="transparent"
          >Подробнее
        </Btn>
        <Btn v-if="!numIsVisible" @click="numIsVisible = !numIsVisible">
          Показать телефон
        </Btn>
        <Agent v-else />
      </div>
    </div>
  </div>
</template>
<style lang="scss" scoped>
.object-card {
  border-radius: $border-sm;
  overflow: hidden;

  &__title {
    font-size: 18px;
    font-weight: 700;
  }

  &__slider {
    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
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

    @include min-md {
      height: 277px;
    }
    @include min-llg {
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

    @include min-md {
      padding: 30px 30px;
    }
  }

  &__desc {
    font-weight: 600;
    margin: 16px 0 15px 0;

    @include min-sm {
      margin: 16px 0 34px 0;
    }
    @include min-md {
      margin: 16px 0 4px 0;
    }
  }

  &__red {
    font-size: 24px;
    font-weight: 700;
    color: $red;
  }
  &__bottom {
    display: flex;
    flex-direction: column;
    gap: 10px;
    & > * {
      width: 100%;
      justify-content: center;
      @include min-sm {
        width: fit-content;
      }
    }
    @include min-sm {
      flex-direction: row;
      justify-content: space-between;
    }
  }

  &__link {
    background-color: transparent;
    border: 1px solid $red;
    color: $black;
  }

  @include min-llg {
    display: grid;
    grid-template-columns: 355px auto;
  }
}
</style>
