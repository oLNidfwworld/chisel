<script setup lang="ts">
import EHeader from "~/components/layout/EHeader.vue";
import EFooter from "~/components/layout/EFooter/index.vue";
import EFilter from "~/components/ui/EFilter/index.vue";
import { useUIstore } from "~/store/ui";
import type { NeededParams } from "~/assets/types/entity/filterParams";

const uiStore = useUIstore();

const route = useRoute(); 
const routeParams = computed(( ) => {
  return route.params as NeededParams;
}); 


const section = ref(routeParams.value?.section || "vtorichka");
const offerType = ref(routeParams.value?.offerType || "buy"); 
const { data : filterInitial, refresh, status } = await useApiFetch<object>('/NewBack/MainPage/Filter/', {
  method : 'post',
  watch : false,
  body : {
      "typeOffer" : offerType,
      "section" : section,
      "greatDeals" : ""
  }
});   
watch([offerType, section], async ( ) => { 
  refresh();
  // let resultNavigateTo = '/realty/all-cities/all-services-types/all-immovable-types/all-property';
  // navigateTo(`/realty/all-cities/${offerType.value}/${section.value}`)
})

// const offerType = ['buy','rent'] as const;
// type OfferType = (typeof offerType)[number];
// const isOfferType = ( x : any ) : x is OfferType => offerType.includes(x); 
// if ( !('offerType' in routeParams && isOfferType(routeParams.offerType)) ) { 
//   throw createError({ statusCode: 404, statusMessage: 'Page Not Found' }) 
// }


//https://api-ekspert.tw1.ru/Api/NewBack/MainPage/Filter/
</script>
<template>
  <div class="page-wrapper">
    <EHeader />
    <EFilter v-model:offer-type="offerType" v-model:section="section" :controls-data="filterInitial" />
    <main class="page-content">
      <slot />
    </main>
    <EFooter />
    <Transition name="overlay-appear">
      <div v-if="uiStore.overlayVisibility" class="page-overlay" />
    </Transition>
  </div>
</template>
<style lang="scss">
@use "/assets/styles/base/variables/colors.scss";
@use "/assets/styles/mixins/media.scss";
@use "/assets/styles/layouts/default.scss";
</style>
