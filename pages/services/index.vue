<script setup>
import ContentInner from '~/components/ui/content-inner.vue';
import ServiceBlock from '~/components/ui/Services/service-block.vue'; 
definePageMeta({
    layout: 'content'
});
useSeoMeta({
    title: 'Услуги | АН "Эксперт"',
    description : "В список наши услуг входят: покупка и продажа недвижимости. Помощь с ипотекой и другие юридические услуги. Срочный выкуп квартир. "
})
</script>
<template>
    <ContentInner h1="Услуги">
        <ServiceBlock />
    </ContentInner>
</template>