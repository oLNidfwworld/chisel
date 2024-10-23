<script setup>
const { path } = useRoute();

const { data, error } = await useAsyncData(`content-${path}`, () => {
  return queryContent().where({ _path: path }).findOne();
});
if (error.value) {
    console.log(error.value);
    // createError({
    //   statusCode: 404,
    //   statusMessage: 'Not Found',
    // })
}
</script>
<template>
    <ContentDoc />
</template>