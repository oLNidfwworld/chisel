<script setup lang="ts">
import AdditionalCombo from './controls-ui/additional-combo.vue';
import AdditionalRadio from './controls-ui/additional-radio.vue';
</script>

<template>
    <form @submit.prevent class="e-filter">
        <div class="e-filter__toggler-group-1">
            <label class="e-filter-toggler-1">
                <input type="radio" name="test" value="test" />
                Купить
            </label>
            <label class="e-filter-toggler-1">
                <input type="radio" name="test" value="test2" />
                Арендовать
            </label>
        </div>
        <div class="e-filter__toggler-group-2">
            <label class="e-filter-toggler-2">
                <input type="radio" name="test" value="test" />
                Вторичная
            </label>
            <label class="e-filter-toggler-2">
                <input type="radio" name="test" value="test2" />
                Загородная
            </label>
            <label class="e-filter-toggler-2">
                <input type="radio" name="test" value="test2" />
                Коммерческая
            </label>
        </div>
        <div class="e-filter-additional">
            <div class="e-filter-additional__group">
                <span class="e-filter-additional__group-title">Объект недвижимости</span>
                <AdditionalRadio/>
            </div>
            <div class="e-filter-additional__group">
                <span class="e-filter-additional__group-title">Объект недвижимости</span>
                <AdditionalCombo/>
            </div>
        </div>
    </form>
</template>
<style lang="scss" scoped>
@import url('/assets/styles/base/shortcuts.scss');

.e-filter {
    &__toggler-group-1 {
        display: flex;
        background-color: $gray;
        gap: 8px;
        box-shadow: $inner-shadow;
        padding: 5px;
        border-radius: $border-md;
        margin-bottom: 23px;

        @include min-md {
            width: fit-content;
            margin-bottom: 41px;
        }
        @include min-md { 
            margin-bottom: 41px;
        }
        @include min-llg { 
            margin-bottom: 41px;
        }
    }
    &__toggler-group-2{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 5px;
        margin-bottom: 5px;
        
        .e-filter-toggler-2:last-child{
            grid-column: span 2;
        }
        @include min-md{
            display: flex;
        }
    }

    .e-filter-toggler-1 {
        width: 100%;

        @include min-md {
            width: fit-content;
        }
    }
}

.e-filter-toggler-1 {
    padding: 5px;
    text-align: center;
    font-weight: 700;
    transition: 0.3s ease-out background-color, 0.3s ease-out color;
    border-radius: $border-sm; 

    &:has(input[type="radio"]:checked) {
        background-color: $red;
        color: $white;
    } 

    @include min-md {
        padding: 5px 44px;
    }
}
.e-filter-toggler-2{    
    width: 100%;
    text-align: center;
    padding : 8px 0px;
    background-color: $gray-dark;
    color: $white;
    border-radius: $border-sm;


    @include min-md{
        width: fit-content;
        padding : 8px 20px;
    }
}
.e-filter-additional{
    border-radius: $border-sm;
    background-color: #f3f3f3;
    padding: 23px 20px;

    

    &__group {
        line-height: 1.333; 
        
    display: flex;
    flex-direction: column;
    gap: 4px;
    }
    &__group-title {
        font-size: 15px;
        font-weight: 700;
    }

    @include min-sm {
        padding: 23px 30px;
    }
    @include min-md {
        padding: 23px;
    }
    
}
</style>