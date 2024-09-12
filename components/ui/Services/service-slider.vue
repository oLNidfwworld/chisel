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
.swiper .swiper-slide {
  .service-card {
    @include min-llg {
      grid-template-areas: "B A";
      grid-template-columns: auto 232px;
    }
  }
}
</style>
