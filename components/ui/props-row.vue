<script setup lang="ts">
interface IProps {
  light?: boolean;
  items: Array<{
    name: string,
    value: string
  }>
}

withDefaults(defineProps<IProps>(), {
  light: false,
});
</script>
<template>
  <ul class="props-row" :class="{ light: light }">
    <li v-for="(item, index) in items" :key="index" class="props-row__prop">
      <span class="props-row__title" v-html="item.name" />
      <span class="props-row__desc" v-html="item.value" /> 
    </li>
  </ul>
</template>
<style lang="scss">
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/mixins/media.scss" as media;

.props-row {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 15px;
  background-color: #d9d9d9;
  padding: 12px 9px;

  &.light {
    background-color: variable.$white;
  }

  &__prop {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  &__desc {
    font-weight: 700;
  }
}
</style>
