<script setup lang="ts">
import type Detail from "~/assets/types/calls/detail";
import ObjectDetail from "~/components/ui/ObjectViews/object-detail.vue";
import ObjectList from "~/components/ui/ObjectViews/object-list.vue";

definePageMeta({
  layout: "no-filter",
});
const route = useRoute();
const objectId = route?.params?.id;
const { data: object } = await useApiFetch<Detail>(`/Catalog/${objectId}/`);
if (!objectId && !object) {
  createError({
    statusCode: 404,
    statusMessage: "Страница не найдена!",
  });
}
</script>
<template>
  <section>
    <ObjectDetail v-if="object?.item" :object-item="object.item" />
  </section>
  <section class="container">
    <h2 class="title-md title-md-bottom-margin">Похожие объявления</h2>
    <ObjectList />
  </section>
</template>
