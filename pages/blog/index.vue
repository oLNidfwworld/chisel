<script setup>
import { useApiFetch } from "~/composables/api";
// import Pagination from "~/components/Base/Pagination.vue"; 
import { computed, watch } from "vue";
import ContentInner from "~/components/ui/content-inner.vue";
import BlogList from "~/components/ui/Blog/BlogList.vue";
import Pagination from "~/components/base/pagination.vue";

definePageMeta({
    layout: 'content'
});

useSeoMeta({
    title: 'Блог | АН "Эксперт"',
    description : "На электричке: С Курского вокзала доехать до ж/д станции Павловский Посад(приблизительное время в пути 1час 10минут), выйти в город на Привокзальную площадь. Далее 700 метров пешком до ДК «Октябрь»."
})

const route = useRoute();
const router = useRouter();

const page = ref(Number(route.query.page) || 1);
const pageSizeApi = computed(() => {
    return (route.query.size && route.query.size > 0) ? route.query.size : '20'
})

const { data: blog } = await useApiFetch(`/Blog/`,
    {
        watch : false,
        query: {
            page: `page-${page.value}`,
            size: `${pageSizeApi.value}`
        }
    }
)

const fetchNew = async ( page, pageSize ) => {
    return await $fetchApi('/Blog/', {
        query: {
            page: `page-${page}`,
            size: `${pageSize}`
        }
    })
}

watch(() => page.value, async ( newVal ) => {
    router.push(`?page=${page.value}`);
    blog.value = await fetchNew(newVal, pageSizeApi.value);
}) 
 

</script>
<template>
    <ContentInner h1="Блог">
        <BlogList :items="blog.items" />
        <div class=" mt-4">
            <Pagination v-model="page" :items-per-page="20" :total-items="20 * blog.nav_size"/>
        </div>
    </ContentInner>
</template>
<style lang="scss" >
@use '/assets/styles/base/shortcuts.scss';
</style>