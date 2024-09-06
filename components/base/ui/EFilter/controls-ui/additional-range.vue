<script setup lang="ts">
const model = defineModel<{
  min: number | undefined;
  max: number | undefined;
}>({
  required: true,
});
</script>
<template>
  <div class="e-filter-range">
    <input v-model="model.min" placeholder="От" type="number" />
    <span class="e-filter-range__separator" />
    <input v-model="model.max" placeholder="До" type="number" />
  </div>
</template>
<style lang="scss">
.e-filter-range {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
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
