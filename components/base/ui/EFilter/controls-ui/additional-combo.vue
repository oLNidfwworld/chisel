<script setup lang="ts">
import { ref } from 'vue'
import { ComboboxAnchor, ComboboxContent, ComboboxEmpty, ComboboxGroup, ComboboxItem, ComboboxItemIndicator, ComboboxLabel, ComboboxRoot, ComboboxTrigger, ComboboxViewport } from 'radix-vue'

const v = ref([]);
const options = ['Apple', 'Banana', 'Blueberry', 'Grapes', 'Pineapple'] 
</script> 
<template>
    <ComboboxRoot v-model="v" class="e-filter-combo" multiple>
        <ComboboxAnchor class="e-filter-combo__anchor">
            <ComboboxTrigger class="e-filter-combo__trigger">   
                <template v-if="v.length <= 0">
                    <span>Выбрать</span>
                </template>
                <template v-else>
                    <span v-for="(item, index) in v" :key="index"> {{ item }}</span>
                </template> 
                    <IArrowDown class="e-filter-combo__arrow-down" filled/> 
            </ComboboxTrigger>
        </ComboboxAnchor>

        <ComboboxContent class="e-filter-combo__drop">
            <ComboboxViewport class="e-filter-combo__viewport">
                <ComboboxEmpty class="e-filter-combo__empty" /> 
                <ComboboxGroup> 
                    <ComboboxItem v-for="(option, index) in options" :key="index" class="e-filter-combo__item" :value="option"> 
                        <span>
                            {{ option }}
                        </span>
                    </ComboboxItem> 
                </ComboboxGroup> 
            </ComboboxViewport>
        </ComboboxContent>
    </ComboboxRoot> 
</template>
<style lang="scss" >
.e-filter-combo{ 
    max-width: 200px;
    position: relative;
    &__anchor{
        background: $white;
        border-radius: $border-sm;
    }
    &__trigger{
        position: relative;
        width: 100%;
        text-align: left;
        font-size: 15px;
        padding: 8px 14px;   
        overflow: hidden;
    }
    &__arrow-down{
        position: absolute;
        right: 0;
        top: 0;
        bottom: 0;
        margin : auto 0;
        width: fit-content;
        height: fit-content;
    }
    &__drop{
        position: absolute;
        left : 0;
        right: 0;
        top: 100%;
        background-color: $white;
    }
    &__item{ 
        padding: 8px 14px;  
        max-height: 200px;
        overflow-y: scroll;
        background-color: $white;

        &[data-state="checked"] {
            background-color: $red;
            color: $white;
        }
    }
}
</style>