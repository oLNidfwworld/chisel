<script setup>
import MiniCard from "./mini-card.vue";
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
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 20,
      },
      1200: {
        slidesPerView: 4,
        spaceBetween: 20,
      },
    }"
  >
    <SwiperSlide>
      <MiniCard />
    </SwiperSlide>
    <SwiperSlide>
      <MiniCard />
    </SwiperSlide>
    <SwiperSlide>
      <MiniCard />
    </SwiperSlide>
    <SwiperSlide>
      <MiniCard />
    </SwiperSlide>
  </Swiper>
</template>
