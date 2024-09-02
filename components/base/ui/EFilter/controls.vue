<template>
    <div class="e-filter">
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
    </div>
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

        @include min-md {
            width: fit-content;
        }
    }
    &__toggler-group-2{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 5px;
        
        .e-filter-toggler-2{
            grid-column: span 2;
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
}
</style>