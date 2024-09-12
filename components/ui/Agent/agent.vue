<script setup lang="ts">
interface IProps {
  visibleNumber? : boolean
}
withDefaults(defineProps<IProps>(), {
  visibleNumber: true
})
</script>
<template>
  <div class="agent">
    <span class="agent__name">Герцева Наталья</span>
    <span class="agent__phone">+7 (929) 599-<span v-if="visibleNumber">28-18</span><span v-else>xx-xx</span> </span>
  </div>
</template>
<style lang="scss">
.agent {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
  &__name {
    font-weight: 700;
  }
  &__phone {
    font-weight: 600;
  }
}
</style>
