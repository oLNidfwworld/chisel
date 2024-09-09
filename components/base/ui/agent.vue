<template>
  <div class="agent">
    <span class="agent__name">Герцева Наталья</span>
    <span class="agent__phone">+7 (929) 599-28-18</span>
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
