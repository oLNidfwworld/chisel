<script setup>
import ContentInner from '~/components/ui/content-inner.vue';
import ServiceBlock from '~/components/ui/Services/service-block.vue'; 
definePageMeta({
    layout: 'content'
});
</script>
<template>
    <ContentInner h1="Услуги">
        <ServiceBlock />
    </ContentInner>
</template>