<script lang="ts" setup>
import type { KeyedObject } from '~/assets/types/entity/data-object';
import BlogCard from './BlogCard.vue';

defineProps<
    { items: KeyedObject[] }
>();

</script>
<template>
   <div class="blog-list">
      <BlogCard
         v-for="(item, index) in items"
         :key="index"
         :item="item" />
   </div>
</template>
<style lang="scss">
@use '/assets/styles/mixins/media.scss' as media;

.blog-list {
    display: grid;
    grid-template-columns: 1fr;
    gap: 30px 40px;
    grid-template-rows: 1fr;

    @include media.min-sm {
        grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
    }
}
</style>