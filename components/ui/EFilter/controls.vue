<script setup lang="ts">
import Btn from "../../base/btn.vue";
import AdditionalCombo from "./controls-ui/additional-combo.vue";
import AdditionalRadio from "./controls-ui/additional-radio.vue";
import AdditionalRange from "./controls-ui/additional-range.vue"; 

interface IProps { 
    controlsData : any 
} 
const props = defineProps<IProps>();
const { controlsData } = toRefs(props); 
const onlyFillableFields = computed( ( ) => {
  const fields : { [index: string] : any } = {};
  Object.keys(controlsData.value as Object).forEach( key => { 
    if ( typeof controlsData.value[key] === 'object' ) { // убираем non-object types
      if ( !('values' in controlsData.value[key] && controlsData.value[key].values.length > 0 && !controlsData.value[key].values[0].name) ) { // убираем неподходящие по заданному предикату
        fields[key] = controlsData.value[key];
      }
      // TODO: filter filterdata 
      if ( 'values' in fields[key] && fields[key].values.length > 0 && key !== 'city' ) 
        fields[key]['type'] = 'list'
      else 
        fields[key]['type'] = 'dropdown-list';
    } 
    
  }); 
  return fields
}, );
console.log(onlyFillableFields);
const modelSection = defineModel<string>('section', {
    required : true
})
const modelOfferType = defineModel<string>('offerType', {
    required : true
});   
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
    value: "vtorichka",
  },
  {
    name: "Загородная",
    value: "zagorodnaya",
  },
  {
    name: "Комерческая",
    value: "commerce",
  },
]);  
</script>
<template>
  <form class="e-filter" @submit.prevent >
    <div class="e-filter__toggler-group-1">
      <label v-for="(item, index) in offerTypes" :key="index" class="e-filter-toggler-1">
        <input 
          type="radio"
          name="offer-type"
          :value="item.value"
          :checked="item.value === modelOfferType"
          :v-model="modelOfferType"
        />
        {{ item.name }}
      </label>
    </div>
    <div class="e-filter__toggler-group-2">
      <label v-for="(item, index) in objectTypes" :key="index" class="e-filter-toggler-2">
        <input 
          type="radio"
          name="object-type"
          :value="item.value"
          :checked="item.value === modelSection"
          :v-model="modelSection"
        />
        {{ item.name }}
      </label>
    </div>
    <div class="e-filter-additional">
      <div class="e-filter-additional__wrapper">
        <!-- <div class="e-filter-additional__group">
          <span class="e-filter-additional__group-title">Объект недвижимости</span>
          <AdditionalRadio />
        </div>
        <div class="e-filter-additional__group">
          <span class="e-filter-additional__group-title">Объект недвижимости</span>
          <AdditionalCombo />
        </div> -->  
        <div v-for="(control, index) in onlyFillableFields" :key="index" class="e-filter-additional__group">
          <span class="e-filter-additional__group-title">{{ control.name }}</span>
          <!-- <AdditionalRange v-model="minmax" /> -->
        </div>
      </div>
      <div class="e-filter-additional__bottom">
        <div class="e-filter-additional__label-row"></div>
        <div class="e-filter-additional__submit-row">
          <Btn type="submit">Показать 24 объекта</Btn>
          <Btn class="e-filter-additional__expand" preference="sea"
            >Расширенный фильтр</Btn
          >
        </div>
      </div>
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
    margin-bottom: 60px;

    .e-filter-toggler-2:last-child {
      grid-column: span 2;
    }
    @include min-md {
      display: flex;
      margin-bottom: 5px;
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
  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @include min-md {
      gap: 20px;
      display: grid;
      grid-template-columns: repeat(3, 1fr);
    }
    @include min-llg {
      gap: 61px;
      grid-template-columns: repeat(5, 1fr);
    }
  }
  &__bottom {
    display: flex;
    flex-direction: column-reverse;
    gap: 40px;

    @include min-md {
      flex-direction: column;
    }
    @include min-llg {
      display: grid;
      grid-template-columns: 1fr auto;
    }
  }
  &__submit-row {
    display: flex;
    flex-direction: column;
    gap: 18px;
    align-items: center;
    margin-top: 20px;
    & .btn {
      width: 100%;
      align-items: center;
      justify-content: center;
      @include min-md {
        width: fit-content;
      }
    }

    @include min-md {
      flex-direction: row;
    }
  }

  &__expand.btn {
    @include min-lg {
      display: initial;
    }
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
