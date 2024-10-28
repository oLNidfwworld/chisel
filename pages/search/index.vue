<script setup>
import Pagination from '~/components/base/pagination.vue';
import ObjectList from '~/components/ui/ObjectViews/object-list.vue';

definePageMeta({
    layout : 'no-filter'
})

const route = useRoute();
const { data } = await useApiFetch('/CatalogSearch/', { 
      query : {
        query : route.query.q
      }
});

watch(( ) => route.query.q, async ( ) => {
    data.value = await $fetchApi('/CatalogSearch/', { 
      query : {
        query : route.query.q
      }
});
} );

const page = ref(Number(route.query.page) || 1);
const pageSize = ref(20);
const slicedPageData = computed(( ) => {
  if ( data.value?.items?.length ) {
    return data.value.items.slice((page.value - 1) * pageSize.value, (page.value) * pageSize.value );
  } else {
    return [];
  }
});
const router = useRouter();
watch(page, ( ) => {
    router.push({
        query : {
            ...route.query,
            page : page.value   
        }
    })
})
</script>
<template>
    <div class="container">
        <template v-if="data?.items && data?.items?.length > 0">
            <h1 class="title-md title-md-bottom-margin">Найдено по запросу: {{ route.query.q }}</h1>
            <ObjectList v-if="slicedPageData.length > 0" :items="slicedPageData" />
            <div  v-if="data?.items?.length > pageSize" class="mt-4">
                <Pagination v-model="page" :items-per-page="pageSize" :total-items="data?.items?.length"/>
            </div>
        </template>
        <template v-else> 
            <div class="text-center font-bold" >
                По данному запросу ничего не найдено!
            </div>
        </template>
    </div>
</template>
<style lang="scss">
@use '/assets/styles/base/shortcuts.scss';

</style>