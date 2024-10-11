<script setup lang="ts"> 
interface IProps {
  min: number | string;
  max: number | string; 
}
defineProps<IProps>();
const model = defineModel<{
  min: number | undefined;
  max: number | undefined;
}>({
  required: true,
}); 
</script>
<template>
  <div class="e-filter-range">
    <input v-model="model.min" :min="min" :max="max"  placeholder="От" type="number" />
    <span class="e-filter-range__separator" />
    <input v-model="model.max" :min="min" :max="max"  placeholder="До" type="number" />
  </div>
</template>
<style lang="scss">
.e-filter-range {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  min-width: 150px;
  width: 100%;
  border: 1px solid $gray;
  border-radius: $border-sm;
  background-color: $white;
  padding: 9px 14px;
  input[type="number"] {
    border: unset;
    width: 100%;
    font-size: 15px;
    background-color: transparent;
  }
  &__separator {
    display: block;
    margin: 0 10px;
    height: 100%;
    width: 1px;
    background-color: $gray;
  }
}
</style>
