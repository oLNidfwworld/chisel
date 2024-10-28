<script setup>
import Pagination from '~/components/base/pagination.vue';
import ObjectList from '~/components/ui/ObjectViews/object-list.vue';
import { useFavoriteStore } from '~/store/fav';

const page = ref(1);
const pageSize = ref(20);
const favs = useFavoriteStore();
const {data} = await useApiFetch('/CatalogByIds/', {
    method: 'POST',
    params: {
        ids: JSON.stringify(favs.favoriteList),
        size: `9999`
    },
});


const slicedPageData = computed(( ) => {
  if ( data.value?.items?.length ) {
    return data.value.items.slice((page.value - 1) * pageSize.value, (page.value) * pageSize.value );
  } else {
    return [];
  }
}); 
</script>
<template>
    <div class="container">
        <template v-if="data?.items && data?.items?.length > 0">
        <ObjectList v-if="slicedPageData.length > 0" :items="slicedPageData" />
        <div v-else class="text-center font-bold" >
            У вас пока нет ничего в избранном!
        </div>
        <div  v-if="data?.items?.length > pageSize" class="mt-4">
            <Pagination v-model="page" :items-per-page="pageSize" :total-items="data?.items?.length"/>
        </div>
        </template>
    </div>
</template>