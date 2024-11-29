<script lang="ts" setup> 
import Controls from './controls.vue'; 
interface IProps {
    controlsData?: { [index: string]: any; } | null | string,
    seoData : {
        H1 : string,
        TITLE : string,
        DESCRIPTION : string
    }
}
defineProps<IProps>();
const modelSection = defineModel<string>('section', {
    required: true
})
const modelOfferType = defineModel<string>('offerType', {
    required: true
});  

</script>
<template>
   <div class="e-filter-wrapper">
      <div class="e-filter-wrapper__container container">
         <h1 class="e-filter__title title-big"> {{ seoData.H1 }}</h1>
         <Controls 
            v-if="controlsData"
            v-model:section="modelSection"
            v-model:offer-type="modelOfferType"
            :controls-data="(controlsData as object)" />
      </div>
   </div>
</template>
<style lang="scss">
@use '/assets/styles/base/typography.scss';
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/mixins/media.scss" as media;

.e-filter{
    &__title::first-letter{
        text-transform: uppercase; 
    }
}
.e-filter-wrapper {
    // height: 640px;
    padding: 48px 0;
    background-image: url('/filter-bg.png');
    background-size: cover;
    background-position: bottom;

    @include media.min-md {
        padding: 106px 0 66px 0;
    }

    @include media.min-llg {
        padding: 106px 0 80px 0;
    }

    

    &__container {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        gap: 40px;
        height: 100%;
    }
}
</style>