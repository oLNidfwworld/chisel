<script setup lang="ts"> 
import type { KeyedObject } from '~/assets/types/entity/data-object';
import type { NeededParams } from '~/assets/types/entity/filterParams';
import Pagination from '~/components/base/pagination.vue';
import ObjectList from '~/components/ui/ObjectViews/object-list.vue';
import ObjectMap from '~/components/ui/ObjectViews/object-map.vue';

const route = useRoute();
const routeParams = route.params as NeededParams;

const postBodyObjectGenerate = (routeQuery: KeyedObject, routeParams: NeededParams) => {
  const _routeQuery = Object.assign({}, routeQuery);
  delete _routeQuery['onMap'];
  const query = parseFromQuery(_routeQuery);
  const newObject: KeyedObject = {};
  Object.keys(query).forEach(filterPropKey => {
    newObject[filterPropKey] = query[filterPropKey].value
  });

  if (routeParams.city && routeParams.city !== 'all-cities') {
    newObject['city'] = routeParams.city.split('-');
  }
  if (routeParams.section && routeParams.section !== 'all-immovable-types') {
    newObject['section'] = routeParams.section.split('-');
    if (newObject['section'].length === 1) {
      newObject['section'] = newObject['section'][0];
    }
  }
  if (routeParams.offerType && routeParams.offerType !== 'all-services-types') {
    newObject['typeOffer'] = routeParams.offerType?.split('-');
    if (newObject['typeOffer'].length === 1) {
      newObject['typeOffer'] = newObject['typeOffer'][0];
    }
  }
  if (routeParams.objectType && routeParams.objectType !== 'all-object-types') {
    newObject['objectRealty'] = routeParams.objectType?.split('-');
  }
  return newObject;
}

const { data: pageData } = useApiFetch<{
  elementsCatalog: {
    values: Array<KeyedObject>
  }
}>('/NewBack/NewFilter/Filter/', {
  method: 'POST',
  body: postBodyObjectGenerate(route.query, route.params),
  watch: false
});

const isMap = ref('onMap' in route.query);
watch(route, async (oldVal, newVal) => {
  if (newVal.query.page === oldVal.query.page) {
    const postBodyObject = postBodyObjectGenerate(newVal.query, newVal.params);
    pageData.value = await $fetchApi<{
      elementsCatalog: {
        values: Array<KeyedObject>
      }
    }>('/NewBack/NewFilter/Filter/', {
      method: 'post',
      body: postBodyObject,
    })
  }
  isMap.value = 'onMap' in route.query;
}, {
  deep: true
});
const router = useRouter();
const page = ref(Number(route.query.page) || 1);
const pageSize = ref(20)
const slicedPageData = computed(() => {
  if (pageData.value?.elementsCatalog?.values) {
    return pageData.value?.elementsCatalog.values.slice((page.value - 1) * pageSize.value, (page.value) * pageSize.value);
  } else {
    return [];
  }
});
 
// TODO: REMOVE DUPLICATING REQUESTS
const seoDataToPost = computed(() => {
  const inputeSeo: KeyedObject = {};
  if (routeParams.city && routeParams.city !== 'all-cities')
    inputeSeo['cities'] = routeParams.city.split('-');
  else inputeSeo['cities'] = 'all-cities';

  if (routeParams.offerType && routeParams.offerType !== 'all-services-types')
    inputeSeo['serviceTypes'] = routeParams.offerType.split('-');
  else inputeSeo['serviceTypes'] = 'all-services-types';

  if (routeParams.section && routeParams.section !== 'all-immovable-types')
    inputeSeo['immovableTypes'] = routeParams.section.split('-');
  else inputeSeo['immovableTypes'] = 'all-immovable-types';

  if (routeParams.objectType && routeParams.objectType !== 'all-immovable-properties')
    inputeSeo['immovableProperties'] = routeParams.objectType.split('-');
  else inputeSeo['immovableProperties'] = 'all-immovable-properties';

  return inputeSeo;
}); 
const { data: seoData, refresh : refreshSeo } = await useApiFetch<{
  H1: string,
  TITLE: string,
  DESCRIPTION: string,
}>('/realty-title', {
  method: 'POST',
  body: seoDataToPost,
  key: `${seoDataToPost.value.cities}-${seoDataToPost.value.serviceTypes}-${seoDataToPost.value.immovableTypes}-${seoDataToPost.value.immovableProperties}`,
});
useSeoMeta({
  title: seoData.value?.TITLE,
  description: seoData.value?.DESCRIPTION,
})

watch(page, () => {
  refreshSeo();
  router.push({
    query: {
      ...route.query,
      page: page.value
    }
  })
});

const objectWithLocation = computed(() => pageData.value?.elementsCatalog?.values.filter((catalogElement) => catalogElement.coordinates?.lat && catalogElement.coordinates?.lon) || []);
</script>
<template>
  <div class="container">
    <template v-if="isMap">
      <ObjectMap :items="objectWithLocation" />
    </template>
    <template v-else-if="pageData">
      <ObjectList v-if="slicedPageData.length > 0" :items="slicedPageData" />
      <div class="text-center font-bold" v-else>
        Объектов по данному запросу не найдено!
      </div>
      <div v-if="pageData.elementsCatalog.values.length > pageSize" class="mt-4">
        <Pagination v-model="page" :items-per-page="pageSize" :total-items="pageData.elementsCatalog.values.length" />
      </div>
    </template>
  </div>
</template>
<style lang="scss">
@use '/assets/styles/base/shortcuts.scss';
</style>
