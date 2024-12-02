<script setup lang="ts">
import type Swiper from 'swiper';

 
const props = defineProps<{
    swiperInstance?: Swiper
}>();
function slideNext(){
    if( props.swiperInstance ) props.swiperInstance.slideNext(); 
}
function slidePrev(){ 
    if( props.swiperInstance ) props.swiperInstance.slidePrev(); 
}
</script>
<template>
   <div class="nav-arrows">
      <button
         class="nav-arrows__btn" 
         @click="slidePrev" >
         <IArrowDown filled/>
      </button>
      <button
         class="nav-arrows__btn" 
         @click="slideNext">
         <IArrowDown filled/>
      </button>
   </div>
</template>
<style scoped lang="scss">
@use '/assets/styles/base/variables/colors.scss' as variable;
.nav-arrows{
    display: flex; 
    gap: 12px; 

    &__btn{
        & > svg * {
            fill: variable.$white;
        }
        width: 24px;
        height: 24px;
        border-radius: variable.$border-sm;
        background-color: variable.$red;
        
        &:first-child{
            svg{
                transform: rotate(90deg);
            }
        }
        &:last-child{
            svg{
                transform: rotate(270deg);
            }
        }
    }
}
</style>