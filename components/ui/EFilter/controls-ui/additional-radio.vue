<script setup lang="ts">
import { RadioGroupItem, RadioGroupRoot } from 'radix-vue' 
const modelValue = defineModel<string>({
    required: false
}); 
</script> 
<template>
  <RadioGroupRoot
    v-model="modelValue"
    class="e-filter-radio-group" 
    aria-label="View density"
  > 
      <RadioGroupItem
        id="r1"
        class="e-filter-radio"
        value="default"
      >kekw</RadioGroupItem> 
  </RadioGroupRoot>
</template>
<style lang="scss" scoped>
.e-filter-radio-group{
    display: flex;
    gap: 5px;
}
.e-filter-radio{
    background-color: $gray;
    border-radius: $border-sm;
    padding: 8px 7px;

    &:has(input[type="radio"]:checked) {
        background-color: $red;
        color: $white;
    }
}
</style>