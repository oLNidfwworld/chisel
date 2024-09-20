<script setup lang="ts">
import EHeader from "~/components/layout/EHeader.vue";
import EFooter from "~/components/layout/EFooter/index.vue";
import EFilter from "~/components/ui/EFilter/index.vue";
import { useUIstore } from "~/store/ui";
import type { NeededParams } from "~/assets/types/entity/filterParams";

const uiStore = useUIstore();

const route = useRoute();
const routeQuery = route.query;  
const routeParams = route.params as NeededParams; 

const section = ref(routeParams?.section || "vtorichka");
const offerType = ref(routeParams?.offerType || "buy"); 
const { data : filterInitial } = await useApiFetch<object>('/NewBack/MainPage/Filter/', {
  method : 'post',
  body : {
      "typeOffer" : offerType.value,
      "section" : section.value,
      "greatDeals" : ""
  }
});  

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
@import url("/assets/styles/layouts/default.scss");
</style>
