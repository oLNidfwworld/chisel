<script setup lang="ts">
interface IProps {
    totalItems: number,
    itemsPerPage?: number,
}
withDefaults(defineProps<IProps>(), {
    itemsPerPage: 10
}
)

const pageModel = defineModel<number>({
    default: 1,
    required: false
});
</script>
<template>
   <PaginationRoot
      v-model:page="pageModel"
      :total="totalItems"
      :items-per-page="itemsPerPage"
      :sibling-count="1"
      show-edges>
      <PaginationList
         v-slot="{ items }"
         class="pagination-list">
         <PaginationPrev class="pagination-list__btn">
            <IArrowDown style="transform:rotate(90deg);" />
         </PaginationPrev>
         <div class="pagination-list__pages">
            <template v-for="(page, index) in items">
               <PaginationListItem 
                  v-if="page.type === 'page'"
                  :key="index"
                  class="pagination-list__btn"
                  :value="page.value">
                  {{ page.value }}
               </PaginationListItem>
               <PaginationEllipsis
                  v-else
                  :key="page.type"
                  :index="index"
                  class="pagination-list__elipsis">
                  &#8230;
               </PaginationEllipsis>
            </template>
         </div>
         <PaginationNext class="pagination-list__btn">
            <IArrowDown style="transform:rotate(-90deg);" />
         </PaginationNext>
      </PaginationList>
   </PaginationRoot>
</template>
<style lang="scss">
@use '/assets/styles/mixins/media.scss' as media;
@use '/assets/styles/base/variables/colors.scss' as variable;
@use '/assets/styles/base/shortcuts.scss';

.pagination-list {
    display: flex;
    gap: 4px;

    &__btn {
        display: block;
        width: 38px;
        height: 38px;
        border: 2px solid transparent;
        border-radius: variable.$border-sm;
        background-color: variable.$gray;
        color: variable.$black;
        font-weight: 600;
        transition: 0.3s ease-out color, 0.3s ease-out background-color;

        &[data-selected="true"] {
            background-color: variable.$red;
            color: variable.$white;

        }
    }

    &__pages {
        display: flex;
        gap: 8px;
        align-items: baseline;
    }
}
</style>