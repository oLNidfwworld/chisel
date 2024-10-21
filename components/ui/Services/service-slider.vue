<script setup>
import ServiceCard from "./service-card.vue";
</script>
<template>
  <Swiper
    :breakpoints="{
      0: {
        slidesPerView: 1,
        spaceBetween: 20,
      },
      780: {
        slidesPerView: 2,
        spaceBetween: 20,
        grid: {
          rows: 2,
          fill: 'row',
        },
      },
    }"
    :modules="[SwiperGrid]"
  >
    <SwiperSlide>
      <ServiceCard />
    </SwiperSlide>
  </Swiper>
</template>
<style lang="scss">
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/mixins/media.scss" as media;
.swiper .swiper-slide {
  .service-card {
    @include media.min-llg {
      grid-template-areas: "B A";
      grid-template-columns: auto 232px;
    }
  }
}
</style>
