<script setup lang="ts">
import { ToggleGroupRoot, ToggleGroupItem } from 'radix-vue' 
// TODO: make generic
defineProps<{ items : Array<{ name : string, xmlId : string}>}>();
const modelValue = defineModel<string[]>({
  required: true
});   
</script> 
<template>
  <ToggleGroupRoot
    v-model="modelValue"
    type="multiple"
    class="e-filter-radio-group"  
  > 
      <ToggleGroupItem
        v-for="(item,index) in items" 
        :id="'r-'+item.xmlId"
        :key="index"
        class="e-filter-radio"
        :value="item.xmlId"
      >{{item.name}}</ToggleGroupItem> 
  </ToggleGroupRoot>
</template>
<style lang="scss" scoped> 
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/mixins/media.scss" as media;
.e-filter-radio-group{
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}
.e-filter-radio{
    background-color: variable.$gray;
    border-radius: variable.$border-sm;
    padding: 8px 7px;
    transition: 0.3s ease-out all;
    &[data-state='on'] {
        background-color: variable.$red;
        color: variable.$white;
    }
}
</style>