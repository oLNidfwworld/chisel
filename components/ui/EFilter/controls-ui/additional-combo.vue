<script setup lang="ts">
import { ref } from "vue";
import {
  ComboboxAnchor,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxRoot,
  ComboboxTrigger,
  ComboboxViewport,
} from "radix-vue";

const props = defineProps<{
  items: Array<any>
}>();
const selectedValues = computed(() => {
  return model.value.map(modelValue => props.items.find(item => item.xmlId === modelValue)?.name || '').join(', ');
});
const model = defineModel<Array<any>>({
  required: true
});
const isOpened = ref(false); 
</script>
<template>
  <ComboboxRoot v-model:open="isOpened" v-model="model" class="e-filter-combo" multiple>
    <ComboboxAnchor class="e-filter-combo__anchor">
      <ComboboxTrigger class="e-filter-combo__trigger">
        <template v-if="model.length <= 0">
          <span>Выбрать</span>
        </template>
        <div v-else class="e-filter-combo__selected-items">
          {{ selectedValues }}
        </div>
        <IArrowDown 
          :style="{ transform: isOpened ? 'rotate(180deg)' : '' }" class="e-filter-combo__arrow-down"
          filled />
      </ComboboxTrigger>
    </ComboboxAnchor>

    <ComboboxContent class="e-filter-combo__drop">
      <ComboboxViewport class="e-filter-combo__viewport">
        <ComboboxEmpty class="e-filter-combo__empty" />
        <ComboboxGroup>
          <ComboboxItem 
            v-for="(option, index) in items" :key="index" class="e-filter-combo__item"
            :value="option.xmlId">
            <span>
              {{ option.name }}
            </span>
          </ComboboxItem>
        </ComboboxGroup>
      </ComboboxViewport>
    </ComboboxContent>
  </ComboboxRoot>
</template>
<style lang="scss">
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/mixins/media.scss" as media;
.e-filter-combo {
  width: 200px;
  position: relative;
  box-shadow: variable.$base-inpt-shadow;

  &__anchor {
    background: variable.$white;
    border-radius: variable.$border-sm;
  }

  &__trigger {
    position: relative;
    width: 100%;
    text-align: left;
    font-size: 15px;
    padding: 9px 24px 9px 14px;
    overflow: hidden;
  }

  &__arrow-down {
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    right: 9px;
    margin: auto 0 !important;
    width: fit-content;
    height: fit-content;
  }

  &__drop {
    position: absolute;
    left: 0;
    right: 0;
    top: 100%;
    background-color: variable.$white;
  }

  &__item {
    padding: 8px 14px;
    max-height: 200px;
    overflow-y: scroll;
    background-color: variable.$white;
    cursor: pointer;

    &[data-state="checked"] {
      background-color: variable.$red;
      color: variable.$white;
    }
  }

  &__selected-items {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
    line-clamp: 1;
  }
}
</style>
