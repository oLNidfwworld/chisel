<script setup lang="ts">
interface IProps {
  title: string;
}

defineProps<IProps>();

const visible = ref(false);
</script>
<template>
  <div class="submenu">
    <div class="submenu__header">
      <h3 class="submenu__title">{{ title }}</h3>
      <button class="submenu__trigger" @click="visible = !visible">
        <IArrowDown filled />
      </button>
    </div>
    <div class="submenu__wrapper" :class="{ visible: visible }">
      <div class="submenu__content">
        <slot />
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.submenu {
  background: #f3f3f3;
  color: $black;
  padding: 19px 15px;
  border-radius: $border-sm;

  transition: 0.6s ease-out box-shadow;

  &:hover {
    box-shadow: 0px 31px 27px -22px #ae1d1d40;
  }

  &__title {
    font-size: 15px;
    font-weight: bold;
  }
  &__header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 14px;
    align-items: center;
  }
  &__wrapper {
    display: grid;
    overflow: hidden;
    grid-template-rows: 0fr;
    transition: 0.3s ease-out;
    min-height: 0;
    overflow: hidden;

    &.visible {
      grid-template-rows: 1fr;
    }
    @include min-llg {
      grid-template-rows: 1fr;
    }
  }
  &__content {
    font-size: 14px;
    min-height: 0;
  }
  &__trigger {
    @include min-llg {
      display: none;
    }
  }
}
</style>
