<script setup lang="ts">
defineOptions({
  inheritAttrs: false,
});
const model = defineModel<string | number | undefined>({
  required: false,
});
</script>
<template>
  <div class="inpt__outer">
    <input v-model="model" class="inpt" v-bind="$attrs" />
  </div>
</template>
<style lang="scss">
.inpt {
  width: 100%;
  border: unset;
  padding: 10px 14px;
  border: 1px solid $gray;
  border-radius: $border-sm;
  background-color: $white;
  font-weight: 600;
  color: $black;

  &::placeholder {
    color: $gray;
  }

  &__outer {
    width: 100%;
  }
}
</style>
