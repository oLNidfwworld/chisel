<script setup lang="ts">
interface IProps {
  to?: string;
}
defineProps<IProps>();
</script>
<template>
  <NuxtLink v-if="to" :to="to" class="btn">
    <slot />
  </NuxtLink>
  <button v-else class="btn">
    <slot />
  </button>
</template>
<style lang="scss">
.btn {
  display: flex;
  gap: 12px;
  background-color: $red;
  color: $white;
  font-size: 16px;
  line-height: 1.31;
  padding: 11px 29px;
  width: fit-content;
  text-align: center;
  border-radius: $border-sm;
  font-weight: 700;
}
</style>
