<script setup lang="ts">
import { useDebounceFn } from '@vueuse/core';
// import { v } from '@vueuse/'
import Inpt from '~/components/base/inpt.vue';

const query = ref<string>();
const isOpened = ref(false);
const searchData = shallowRef<Array<{ name: string, id: number | string }>>();
const isPending = ref(false);

const searchProduct = useDebounceFn(async () => {
    isPending.value = true;
    const data = await $fetchApi<{ items: Array<{ name: string, id: number | string }> }>('/CatalogObjectIdSearch/', {
        method: 'POST',
        params: { search: query.value }
    });
    isPending.value = false;
    searchData.value = data?.items;
}, 600);

watch(query, async (queryValue) => {
    console.log(queryValue?.toString().length)
    if (queryValue && queryValue.toString().length > 1) {
        isOpened.value = true;
        await searchProduct();
    } else isOpened.value = false
});
</script>
<template>
    <ComboboxRoot  :open="isOpened" class="objects-search">
        <ComboboxAnchor class="objects-search__anchor">
            <Inpt v-model="query" type="number" />
        </ComboboxAnchor>
        <ComboboxContent class="objects-search__drop">
            <ComboboxViewport class="objects-search__viewport">
                <ComboboxEmpty class="objects-search__empty">
                    Ничего не найдено
                </ComboboxEmpty>
                <ComboboxGroup>
                    <ComboboxItem 
                        v-for="(item, index) in searchData" :key="index" class="objects-search__item"
                        :value="item.id">
                        <NuxtLink :href="`/realty/immovable-${item.id}`">
                            {{ item.name }}
                        </NuxtLink>
                    </ComboboxItem>
                </ComboboxGroup>
            </ComboboxViewport>
        </ComboboxContent>
    </ComboboxRoot>
</template>
<style lang="scss">
@use '/assets/styles/base/variables/colors.scss' as variable;

.objects-search {
    position: relative;

    &__drop {
        width: 100%;
        position: absolute;
        background-color: variable.$white;
        max-height: 300px;
        border-radius: 0 0 variable.$border-md variable.$border-md;
        font-size: 15px;
        overflow: scroll;
    }

    &__item {
        a {
            transition: 0.3s ease-out;
            
            &:hover {
                color: variable.$white;
                background-color: variable.$red;
            }
            @extend .objects-search__empty;
        }
    }

    &__empty {
        width: 100%;
        display: block;
        padding: 3px 5px;
    }
 
}
</style>