<script lang="ts" setup> 
import type { NeededParams } from '~/assets/types/entity/filterParams';
import Controls from './controls.vue';  
import type { KeyedObject } from '~/assets/types/entity/data-object';


const router = useRouter();
const route = useRoute();
const routeParams = computed(() => {
  return router.currentRoute.value.params as NeededParams;
}); 

const section = ref( 
  (!routeParams.value?.section || (routeParams.value?.section && routeParams.value?.section === 'all-immovable-types'))
    ? 'vtorichka'
    : routeParams.value?.section
); 
const offerType = ref(
  (!routeParams.value?.offerType || (routeParams.value?.offerType && routeParams.value?.offerType === 'all-services-types'))
    ? 'buy'
    : routeParams.value?.offerType
);
const { data: filterInitial, refresh } = await useApiFetch<object>('/NewBack/MainPage/Filter/', {
  method: 'POST',
  watch: false,
  body: {
    "typeOffer": offerType,
    "section": section,
    "greatDeals": ""
  }
}); 

// TODO: REMOVE DUPLICATING REQUESTS
const seoDataToPost = computed(() => {
  const inputeSeo: KeyedObject = {};
  if (routeParams.value.city && routeParams.value.city !== 'all-cities')
    inputeSeo['cities'] = routeParams.value.city.split('-');
  else inputeSeo['cities'] = 'all-cities';

  if (routeParams.value.offerType && routeParams.value.offerType !== 'all-services-types')
    inputeSeo['serviceTypes'] = routeParams.value.offerType.split('-');
  else inputeSeo['serviceTypes'] = 'all-services-types';

  if (routeParams.value.section && routeParams.value.section !== 'all-immovable-types')
    inputeSeo['immovableTypes'] = routeParams.value.section.split('-');
  else inputeSeo['immovableTypes'] = 'all-immovable-types';

  if (routeParams.value.objectType && routeParams.value.objectType !== 'all-immovable-properties')
    inputeSeo['immovableProperties'] = routeParams.value.objectType.split('-');
  else inputeSeo['immovableProperties'] = 'all-immovable-properties';

  return inputeSeo;
});
const { data: seoData, refresh: refreshSeo } = await useApiFetch<{
  H1: string,
  TITLE: string,
  DESCRIPTION: string,
}>('/realty-title', {
  method: 'POST',
  body: seoDataToPost,
  key: `${seoDataToPost.value.cities}-${seoDataToPost.value.serviceTypes}-${seoDataToPost.value.immovableTypes}-${seoDataToPost.value.immovableProperties}`,
});
const seoDataIsNotIndex = computed<{
  H1: string,
  TITLE: string,
  DESCRIPTION: string
}>(() => {
  if (seoData.value && route.path !== '/') {
    return seoData.value;
  } else {
    return {
      'H1': 'Эксперт недвижимость',
      'TITLE': 'N/A',
      'DESCRIPTION': 'N/A',
    }
  }
}); 
useSeoMeta({
  title: seoData.value?.TITLE,
  description: seoData.value?.DESCRIPTION,
});

watch(route, () => refreshSeo());
watch([offerType, section], async () => {
  refresh();
}) 

</script>
<template>
   <div class="e-filter-wrapper">
      <div class="e-filter-wrapper__container container">
         <h1 class="e-filter__title title-big"> {{ seoDataIsNotIndex.H1 }}</h1>
         <Controls 
            v-if="filterInitial"
            v-model:section="section"
            v-model:offer-type="offerType"
            :controls-data="(filterInitial as object)" />
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