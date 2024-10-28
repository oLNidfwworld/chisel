<script setup lang="ts">
import EHeader from "~/components/layout/EHeader.vue";
import EFooter from "~/components/layout/EFooter/index.vue";
import EFilter from "~/components/ui/EFilter/index.vue";
import { useUIstore } from "~/store/ui";
import type { NeededParams } from "~/assets/types/entity/filterParams";
import ECallRow from "~/components/layout/ECallRow.vue";
import type { KeyedObject } from "~/assets/types/entity/data-object";

const uiStore = useUIstore();

const route = useRoute();
const routeParams = computed(() => {
  return route.params as NeededParams;
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
  method: 'post',
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
})
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
  <div class="page-wrapper">
    <EHeader />
    <EFilter 
      v-model:offer-type="offerType" v-model:section="section" :seo-data="seoDataIsNotIndex"
      :controls-data="filterInitial" />
    <main class="page-content">
      <slot />
    </main>
    <EFooter />
    <Transition name="overlay-appear">
      <div v-if="uiStore.overlayVisibility" class="page-overlay" />
    </Transition>
    <ECallRow />
  </div>
</template>
<style lang="scss">
@use "/assets/styles/layouts/default.scss";
</style>
