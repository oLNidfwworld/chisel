<script setup lang="ts">
interface IProps {
  light?: boolean;
}

withDefaults(defineProps<IProps>(), {
  light: false,
});
</script>
<template>
  <ul class="props-row" :class="{ light: light }">
    <li class="props-row__prop">
      <span class="props-row__title"> Пл. участка </span>
      <span class="props-row__desc">11</span>
    </li>
  </ul>
</template>
<style lang="scss">
.props-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 15px;
  background-color: #d9d9d9;
  padding: 12px 9px;

  &.light {
    background-color: $white;
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
