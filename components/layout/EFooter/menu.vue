<script lang="ts" setup>
interface IProps {
    menu : Array<{
        name : string,
        path : string,
    }>,
    title : string
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

.page-footer-menu{
  font-size: 15px;
  color: $white; 
  &__title{
    font-weight: bold;
    display: block;
    margin-bottom: 10px;
  }

  &__list{
    display: flex;
    line-height: 1.8;
    flex-direction: column;
  }
}

</style>