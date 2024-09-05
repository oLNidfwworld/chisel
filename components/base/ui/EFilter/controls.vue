<script setup lang="ts">
import AdditionalCombo from "./controls-ui/additional-combo.vue";
import AdditionalRadio from "./controls-ui/additional-radio.vue";
import AdditionalRange from "./controls-ui/additional-range.vue";

const minmax = ref({
  min: undefined,
  max: undefined,
});

const offerTypes = shallowReactive([
  {
    name: "Купить",
    value: "buy",
  },
  {
    name: "Арендовать",
    value: "rent",
  },
]);
const objectTypes = shallowReactive([
  {
    name: "Вторичка",
    value: "buy",
  },
  {
    name: "Загородная",
    value: "rent",
  },
  {
    name: "Комерческая",
    value: "rent",
  },
]);
const currentOfferType = ref();
const currentObjectType = ref();
</script>
<template>
  <form @submit.prevent class="e-filter">
    <div class="e-filter__toggler-group-1">
      <label v-for="(item, index) in offerTypes" :key="index" class="e-filter-toggler-1">
        <input
          v-model="currentOfferType"
          type="radio"
          name="offer-type"
          :value="item.value"
        />
        {{ item.name }}
      </label>
    </div>
    <div class="e-filter__toggler-group-2">
      <label v-for="(item, index) in objectTypes" :key="index" class="e-filter-toggler-2">
        <input
          v-model="currentObjectType"
          type="radio"
          name="object-type"
          :value="item.value"
        />
        {{ item.name }}
      </label>
    </div>
    <div class="e-filter-additional">
      <!-- <div class="e-filter-additional__group">
        <span class="e-filter-additional__group-title">Объект недвижимости</span>
        <AdditionalRadio />
      </div>
      <div class="e-filter-additional__group">
        <span class="e-filter-additional__group-title">Объект недвижимости</span>
        <AdditionalCombo />
      </div>
      <div class="e-filter-additional__group">
        <span class="e-filter-additional__group-title">Объект недвижимости</span>
        <AdditionalRange v-model="minmax" />
      </div> -->
    </div>
  </form>
</template>
<style lang="scss" scoped>
@import url("/assets/styles/base/shortcuts.scss");

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
  &__toggler-group-2 {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 5px;
    margin-bottom: 5px;

    .e-filter-toggler-2:last-child {
      grid-column: span 2;
    }
    @include min-md {
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
.e-filter-toggler-2 {
  width: 100%;
  text-align: center;
  padding: 8px 0px;
  background-color: $gray-dark;
  color: $white;
  font-weight: 700;
  border-radius: $border-sm;
  transition: 0.3s ease-out background-color, 0.3s ease-out color;

  &:has(input[type="radio"]:checked) {
    background-color: $red;
    color: $white;
  }

  @include min-md {
    width: fit-content;
    padding: 8px 20px;
  }
}
.e-filter-additional {
  border-radius: $border-sm;
  background-color: #f3f3f3;
  padding: 23px 20px;
  display: flex;
  gap: 24px;

  @include min-md {
    gap: 20px;
  }
  @include min-llg {
    gap: 61px;
  }

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
