<script lang="ts" setup>
import Controls from './controls.vue'; 
</script>
<template>
    <div class="e-filter-wrapper">
        <div class="e-filter-wrapper__container container">
            <h1 class="e-filter__title title-big">Купить квартиру 
                в Павловском Посаде</h1>
            <Controls/>
        </div>
    </div>
</template>
<style lang="scss">
@import url('/assets/styles/base/typography.scss');
.e-filter-wrapper{
    height: 640px;
    background-image: url('/filter-bg.png');
    background-size: cover;
    background-position: bottom;

    &__container{
        display: flex; 
        flex-direction: column;
        justify-content: space-around;
        height: 100%;
    }
}
</style>