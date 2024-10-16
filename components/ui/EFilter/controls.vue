<script setup lang="ts">
import Btn from "../../base/btn.vue";
import AdditionalCombo from "./controls-ui/additional-combo.vue";
import AdditionalRadio from "./controls-ui/additional-radio.vue";
import AdditionalRange from "./controls-ui/additional-range.vue";

interface IProps {
  controlsData: { [index: string]: any; } | null | string
}
const props = defineProps<IProps>();
const { controlsData } = toRefs(props);
const onlyFillableFields = computed(() => {
  const fields: { [index: string]: any } = {};
  if (controlsData.value && typeof controlsData.value === 'object') { 
    const controlsDataValue = controlsData.value as { [index: string]: any; };
    Object.keys(controlsData.value).forEach(key => {
      if (typeof controlsDataValue[key] === 'object') { // убираем non-object types 
        if (!('values' in controlsDataValue[key] && controlsDataValue[key].values.length > 0 && !controlsDataValue[key].values[0].name)) { // убираем неподходящие по заданному предикату
          fields[key] = controlsDataValue[key];
          if (key !== 'city')
            fields[key]['type'] = 'list'
          else
            fields[key]['type'] = 'dropdown-list';
        }
        if ('min' in controlsDataValue[key] && 'max' in controlsDataValue[key]) {
          fields[key] = controlsDataValue[key];
          fields[key]['type'] = 'range'
        }
      }
    }); 
  }  
  return fields
});
const prefillValues = (onlyFillableFieldsVal: { [index: string]: any }) => {
  const newValuesToPost: { [index: string]: any } = {};
  Object.keys(onlyFillableFieldsVal).forEach(key => {
    switch (onlyFillableFieldsVal[key].type) {
      case 'list':
      case 'dropdown-list':
        newValuesToPost[key] = [];
        break;
      case 'range':
        newValuesToPost[key] = {
          min: undefined,
          max: undefined
        };
        break;
    }
  })
  return newValuesToPost;
}
const valuesToPost = ref<{ [index: string]: any }>(prefillValues(onlyFillableFields.value));
watch(controlsData, () => { valuesToPost.value = prefillValues(onlyFillableFields.value) })
const modelSection = defineModel<string>('section', {
  required: true
});
const modelOfferType = defineModel<string>('offerType', {
  required: true
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
const sectionTypes = shallowReactive([
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
const submit = ( ) => {
  const city = valuesToPost.value['city'] as Array<{xmlId : string}> | null;
  const objectRealty = valuesToPost.value['objectRealty'] as Array<string> | null;
  const params = Object.assign({}, valuesToPost.value);
  delete params['city'];
  delete params['objectRealty'];

  let resultUrl = '';
  if ( objectRealty ) {
    resultUrl += '/' + objectRealty.join('-');
  }
  resultUrl = ('/' + modelSection.value) + resultUrl;
  resultUrl = ('/' + modelOfferType.value) + resultUrl;
  if ( city && city.length > 0 ) { 
    resultUrl = ('/realty/' + city.map(c => c.xmlId).join('-')) + resultUrl;
  } else { 
    resultUrl = ('/realty/' + 'all-cities') + resultUrl;
  }
  navigateTo(resultUrl);
}
</script>
<template>
  <form class="e-filter" @submit.prevent="submit">
    <div class="e-filter__toggler-group-1">
      <label v-for="(item, index) in offerTypes" :key="index" class="e-filter-toggler-1">
        <input v-model="modelOfferType" type="radio" name="offer-type" :value="item.value"
          :checked="item.value === modelOfferType" />
        {{ item.name }}
      </label>
    </div>
    <div class="e-filter__toggler-group-2">
      <label v-for="(item, index) in sectionTypes" :key="index" class="e-filter-toggler-2">
        <input v-model="modelSection" type="radio" name="object-type" :value="item.value"
          :checked="item.value === modelSection" />
        {{ item.name }}
      </label>
    </div>
    <div v-if="Object.keys(onlyFillableFields).length > 0" class="e-filter-additional">
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
          <template v-if="control.type === 'list'">
            <AdditionalRadio v-model="(valuesToPost[index] as unknown as string[])" :items="control.values" />
          </template>
          <template v-else-if="control.type === 'dropdown-list'">
            <AdditionalCombo v-model="valuesToPost[index]" :items="control.values" />
          </template>
          <template v-else-if="control.type === 'range'">
            <AdditionalRange v-model="valuesToPost[index]" :min="control.min" :max="control.max" />
          </template>
        </div>
      </div>
      <div class="e-filter-additional__bottom">
        <div class="e-filter-additional__label-row" />
        <div class="e-filter-additional__submit-row">
          <Btn type="submit">Показать объекта</Btn>
          <!-- <Btn class="e-filter-additional__expand" preference="sea">Расширенный фильтр</Btn> -->
        </div>
      </div>
    </div>
    <div v-else class="e-filter-additional">
      К сожалению нет подходящих объектов недвижимости
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
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      // display: grid;
      // grid-template-columns: repeat(3, 1fr);
    }

    @include min-llg {
      gap: 61px;
      // grid-template-columns: repeat(5, 1fr);
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
