<script setup lang="ts">
import type { ObjectShorted } from "~/assets/types/entity/object-detail";
import MiniCard from "./mini-card.vue";
interface IProps{
  items : ObjectShorted[],
}
defineProps<IProps>();
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
      <SwiperSlide
         v-for="(item, index) in items"
         :key="index">
         <MiniCard :data="item"/>
      </SwiperSlide> 
   </Swiper>
</template>
