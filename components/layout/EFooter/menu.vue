<script lang="ts" setup>
interface IProps {
  menu: Array<{
    name: string,
    path: string,
  }>,
  title: string
}
defineProps<IProps>();
</script>
<template>
  <div class="page-footer-menu">
    <span class="page-footer-menu__title">{{ title }}</span>
    <ul class="page-footer-menu__list">
      <li v-for="(menuItem, index) in menu" :key="index" class="page-footer-menu__list-item">
        <NuxtLink :href="menuItem.path">{{ menuItem.name }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>
<style lang="scss">
@use "/assets/styles/base/variables/colors.scss" as variable;

.page-footer-menu {
  font-size: 15px;
  color: variable.$white;

  &__title {
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
  }

  &__list {
    display: flex;
    line-height: 1.8;
    flex-direction: column;
  }

  &__list-item { 
    a {
      position: relative; 
      &::before {
        content: '';
        position: absolute;
        left: 0;
        bottom: -2px;
        width: 0%;
        height: 2px;
        background-color: variable.$white;
        transition: 0.3s ease width;
      } 
      &:hover {
        &::before {
          width: 100%;
        }
      }
    } 
  }


}
</style>