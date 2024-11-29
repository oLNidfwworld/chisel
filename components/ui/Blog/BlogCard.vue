<script setup lang="ts">
import type { KeyedObject } from '~/assets/types/entity/data-object';

const props = defineProps<{
    item: KeyedObject
}>(); 
</script>
<template>
   <NuxtLink
      :href="`/blog/${props.item.CODE}`"
      class="blog-card">
      <picture>
         <source :srcset="apiServerUrl(item.PREVIEW_PICTURE.url)" >
         <img
            class="blog-card__img"
            :alt="item.NAME">
      </picture>
      <div class="blog-card__content">
         <h2 class="blog-card__name">
            {{ item.NAME }}
         </h2>
         <p class="blog-card__desc">
            {{ item.PREVIEW_TEXT }}
         </p>
      </div>
   </NuxtLink>
</template>
<style lang="scss">
@use '/assets/styles/base/variables/colors.scss' as variable;
@use '/assets/styles/mixins/media.scss' as media;

.blog-card{
    background-color: variable.$another-gray;
    height: 100%;
    line-height: 1.4 !important;
    display: flex;
    flex-direction : column;
    &__name {
        font-size: 18px !important;
        font-weight: 500 !important;
        margin: 0 !important;

        @include media.min-sm{
            font-size: 24px !important;
        }
    }
    &__content {
        padding: 20px;
        display: flex;
        flex-direction: column;
        gap: 12px;
    }
    &__desc{
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 5;
        line-clamp: 5;
        margin: 0 !important;
    }
    &__img{
        max-height: 200px;
        height: 100%;
        width: 100%;
        object-fit: cover;


        @include media.min-md{
            max-height: 300px;
        }
    }
}
</style>