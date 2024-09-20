<script lang="ts" setup>
import Controls from './controls.vue';
interface IProps { 
    controlsData : object
} 
defineProps<IProps>();
const modelSection = defineModel<string>('section', {
    required : true
})
const modelOfferType = defineModel<string>('offerType', {
    required : true
}) 
</script>
<template>
    <div class="e-filter-wrapper">
        <div class="e-filter-wrapper__container container">
            <h1 class="e-filter__title title-big">Купить квартиру 
                в Павловском Посаде</h1>
            <Controls v-model:section="modelSection" v-model:offer-type="modelOfferType" :controls-data="controlsData"/>
        </div>
    </div>
</template>
<style lang="scss">
@import url('/assets/styles/base/typography.scss');
.e-filter-wrapper{
    height: 640px;
    background-image: url('/filter-bg.png');
    background-size: cover;
    background-position: bottom;

    &__container{
        display: flex; 
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
    }
}
</style>