<script setup lang="ts">
import type { KeyedObject } from '~/assets/types/entity/data-object';
import type { NeededParams } from '~/assets/types/entity/filterParams';
import ObjectList from '~/components/ui/ObjectViews/object-list.vue';

const route = useRoute();
const routeParams = route.params as NeededParams;
const routeQuery = route.query as KeyedObject;

// console.log(routeQuery);
// console.log(routeParams);

const postBodyObject = computed(( ) => {
  const query = parseFromQuery(routeQuery);
  const newObject : KeyedObject = {};
  Object.keys(query).forEach(filterPropKey => {
    newObject[filterPropKey] = query[filterPropKey].value
  });
 
  if ( routeParams.city && routeParams.city !== 'all-cities' ) {
    newObject['city'] = routeParams.city.split('-');
  }
  if ( routeParams.section && routeParams.section !== 'all-sections' ) {
    newObject['section'] = routeParams.section.split('-');
  }
  if ( routeParams.offerType && routeParams.offerType !== 'all-offer-types' ) {
    newObject['typeOffer'] = routeParams.offerType?.split('-');
  }
  if ( routeParams.objectType && routeParams.objectType !== 'all-object-types' ) {
    newObject['objectRealty'] = routeParams.objectType;
  } 
  console.log(newObject);
  return newObject;
}); 
 

const { data: pageData} = useApiFetch<{ 
  elementsCatalog : {
    values : Array<KeyedObject>
  }
}>('/NewBack/NewFilter/Filter/', {
  method : 'POST',
  body : postBodyObject
});
 


</script> 
<template> 
  <div class="container">
    <ObjectList v-if="pageData?.elementsCatalog" :items="pageData.elementsCatalog.values"/>
  </div>
</template>
