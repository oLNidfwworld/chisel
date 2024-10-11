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
.e-filter-radio-group{
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
}
.e-filter-radio{
    background-color: $gray;
    border-radius: $border-sm;
    padding: 8px 7px;
    transition: 0.3s ease-out all;
    &[data-state='on'] {
        background-color: $red;
        color: $white;
    }
}
</style>