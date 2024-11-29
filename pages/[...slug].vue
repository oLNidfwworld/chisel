<script setup>
import ContentInner from '~/components/ui/content-inner.vue'

definePageMeta({
    layout : 'content'
})

const { params } = useRoute(); 
const path = computed(() => '/' + params.slug.filter( sl => sl).join('/')); 
const { data, error } = await useAsyncData(`content-${path.value}`, () => {
  return queryContent().where({ _path: path.value }).findOne();
});
if (error.value) {
  showError({ statusCode: 404, statusMessage: 'Page Not Found' })
  throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
}  
</script>
<template>
   <ContentInner :h1="data?.h1">
      <ContentDoc />
   </ContentInner>
</template> 
<style>
</style>