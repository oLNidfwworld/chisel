<script setup lang="ts">
import { YandexMap } from 'vue-yandex-maps';
import type { KeyedObject } from '~/assets/types/entity/data-object';
import type { NeededParams } from '~/assets/types/entity/filterParams';
import Pagination from '~/components/base/pagination.vue';
import ObjectList from '~/components/ui/ObjectViews/object-list.vue';
import ObjectMap from '~/components/ui/ObjectViews/object-map.vue';

const route = useRoute();

const postBodyObjectGenerate = (routeQuery: KeyedObject, routeParams: NeededParams) => {
  delete routeQuery['on-map'];
  const query = parseFromQuery(routeQuery);
  const newObject: KeyedObject = {};
  Object.keys(query).forEach(filterPropKey => {
    newObject[filterPropKey] = query[filterPropKey].value
  });

  if (routeParams.city && routeParams.city !== 'all-cities') {
    newObject['city'] = routeParams.city.split('-');
  }
  if (routeParams.section && routeParams.section !== 'all-sections') {
    newObject['section'] = routeParams.section.split('-');
    if (newObject['section'].length === 1) {
      newObject['section'] = newObject['section'][0];
    }
  }
  if (routeParams.offerType && routeParams.offerType !== 'all-offer-types') {
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
watch(page, () => {
  router.push({
    query: {
      ...route.query,
      page: page.value
    }
  })
});

const isMap = computed(() => {
  return route.query['on-map'] ?? false
});
const objectWithLocation = computed(() => pageData.value?.elementsCatalog?.values.filter((catalogElement) => catalogElement.coordinates?.lat && catalogElement.coordinates?.lon) || []);
</script>
<template>
  <div class="container">
    <template v-if="isMap"> 
      <ObjectMap :items="objectWithLocation"/>
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
