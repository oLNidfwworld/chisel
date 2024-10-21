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
    <input v-model="model" class="inpt" v-bind="variable.$attrs" />
  </div>
</template>
<style lang="scss">
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/mixins/media.scss" as media;
.inpt {
  width: 100%;
  border: unset;
  padding: 10px 14px;
  border: 1px solid variable.$gray;
  border-radius: variable.$border-sm;
  background-color: variable.$white;
  font-weight: 600;
  color: variable.$black;

  &::placeholder {
    color: variable.$gray;
  }

  &__outer {
    width: 100%;
  }
}
</style>
