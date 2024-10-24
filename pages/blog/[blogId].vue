<script setup>

const route = useRoute()
const { data: blogElement } = await useApiFetch(`/Blog/${route.params.blogId}/`);
const goBack = () => {
    navigateTo('/blog/')
}
definePageMeta({
    layout: 'no-filter'
});
useSeoMeta({
    title: blogElement.value[0].SEO.ELEMENT_META_TITLE,
    description: blogElement.value[0].SEO.ELEMENT_META_DESCRIPTION
});

const data = computed(() => blogElement.value[0]);  
</script>
<template>
    <div class="blog-detail"> 
        <div class="container">
            <h1 class="title-big">{{ data.NAME }}</h1>
        </div> 
        <div class="blog-detail__image-row">
            <div class="container">
                <img class="blog-detail__image" :src="apiServerUrl(data.DETAIL_PICTURE)" />
            </div>
        </div>
        <div class="container typography">
            <div v-html="data.DETAIL_TEXT" />
            <button @click="goBack" class="blog-detail__back">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlns:xlink="http://www.w3.org/1999/xlink"
                    xmlns:svgjs="http://svgjs.com/svgjs" width="32" height="32" x="0" y="0" viewBox="0 0 24 24"
                    style="enable-background:new 0 0 512 512" xml:space="preserve" class="">
                    <g>
                        <path
                            d="M22 11H4.414l5.293-5.293a1 1 0 1 0-1.414-1.414l-7 7a1 1 0 0 0 0 1.414l7 7a1 1 0 0 0 1.414-1.414L4.414 13H22a1 1 0 0 0 0-2z"
                            fill="#000000" data-original="#000000"></path>
                    </g>
                </svg>
                <span class="font-bold">
                    Вернуться назад
                </span>
            </button>
        </div>
    </div>
</template>
<style lang="scss">
@use '/assets/styles/base/typography.scss';
@use '/assets/styles/base/shortcuts.scss';
@use '/assets/styles/base/variables/colors.scss' as variable;
@use '/assets/styles/layouts/content.scss';
.typography {
    p, h2, h3 {
        margin: 0;
    }
}
.blog-detail {
    &__back {
        display: flex;
        gap: 12px;
        align-items: center;
        margin-top: 12px;
    }

    &__image-row {
        background-color: variable.$gray;
        padding: 20px 0;
        margin: 20px 0;
    }
    &__image {
        width: 100%;
        height: 100%;
        max-height: 600px;
        object-fit: cover;
    }
}
</style>