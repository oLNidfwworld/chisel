<script setup> 
import ServiceCard from './service-card.vue'; 

const { data } = await useAsyncData(`content-/services`, () => {
  return queryContent('services').find();
});  
</script>
<template>
   <div class="service-block">
      <ServiceCard
         v-for="(item, index) in data"
         :key="index"
         :item="item"/>
   </div>
</template>
<style lang="scss">
@use '/assets/styles/mixins/media.scss' as media;


.service-block{
    display : grid;
    gap: 20px;

    @include media.min-lg {
        grid-template-columns: 1fr 1fr;
        grid-template-rows: 1fr;
        // grid-auto-rows: minmax(200px,20/px);
    }
    
}
</style>