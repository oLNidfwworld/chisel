<script lang="ts" setup>
import Controls from './controls.vue';
interface IProps {
    controlsData?: { [index: string]: any; } | null | string
}
defineProps<IProps>();
const modelSection = defineModel<string>('section', {
    required: true
})
const modelOfferType = defineModel<string>('offerType', {
    required: true
});

// const route = useRoute();
// const { data: seoData } = await useApiFetch(`/Seo/`, {
//     query: {
//         'link': route.path,
//     }
// }); 
</script>
<template>
    <div class="e-filter-wrapper">
        <div class="e-filter-wrapper__container container">
            <h1 class="e-filter__title title-big">Купить квартиру
                в Павловском Посаде</h1>
            <Controls 
                v-if="controlsData" v-model:section="modelSection" v-model:offer-type="modelOfferType"
                :controls-data="(controlsData as object)" />
        </div>
    </div>
</template>
<style lang="scss">
@use '/assets/styles/base/typography.scss';
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/mixins/media.scss" as media;

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