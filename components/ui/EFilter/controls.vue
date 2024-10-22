<script setup lang="ts">
import type { DataObject, KeyedObject } from "~/assets/types/entity/data-object";
import Btn from "../../base/btn.vue";
import AdditionalCombo from "./controls-ui/additional-combo.vue";
import AdditionalRadio from "./controls-ui/additional-radio.vue";
import AdditionalRange from "./controls-ui/additional-range.vue";
import ELabel from "../eLabel.vue";
import type { NeededParams } from "~/assets/types/entity/filterParams";

// TODO : non existing prop value bug (example : ?house-type=woob-stone-[kekkeelleel])

interface IProps {
  controlsData: KeyedObject | null | string
}
const props = defineProps<IProps>();
const { controlsData } = toRefs(props);
const routeQuery = useRoute().query as KeyedObject;
const routeParams = useRoute().params as NeededParams;

const onlyFillableFields = computed<KeyedObject>(() => {
  const fields: KeyedObject = {};
  if (controlsData.value && typeof controlsData.value === 'object') {
    const controlsDataValue = controlsData.value as KeyedObject;
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

const prepareValues = (onlyFillableFieldsVal: KeyedObject): KeyedObject => {
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
const valuesToPost = ref<KeyedObject>(prepareValues(onlyFillableFields.value));
if (Object.keys(routeQuery).length > 0) {
  valuesToPost.value = {
    ...valuesToPost.value,
    ...dataObjectToKeyObject(parseFromQuery(routeQuery))
  }
}
if (routeParams.city && routeParams.city !== 'all-cities') {
  valuesToPost.value.city = routeParams.city.split('-');
}
if (routeParams.objectType && routeParams.objectType !== 'all-object-types') {
  valuesToPost.value.objectRealty = routeParams.objectType.split('-');
}

const nonNullishValues = computed<DataObject>(() => {
  const nonFilteredObject = Object.assign({}, valuesToPost.value);
  const newObject: DataObject = {};
  Object.keys(nonFilteredObject).forEach((valueKey) => {
    if (('min' in nonFilteredObject[valueKey] || 'max' in nonFilteredObject[valueKey]) && (nonFilteredObject[valueKey].min || nonFilteredObject[valueKey].max)) {
      newObject[valueKey] = {
        type: 'range',
        value: nonFilteredObject[valueKey]
      };
    } else if (nonFilteredObject[valueKey].length > 0) {
      newObject[valueKey] = {
        type: 'list',
        value: nonFilteredObject[valueKey]
      };
    }
  }); 
  return newObject;
});
const labelsData = computed(() => {
  const data: { [index: string]: { name: string, value: string } } = {}; 
  Object.keys(nonNullishValues.value).forEach((key) => {
    if (key in onlyFillableFields.value) {
      let resultStr = ''
      if ((nonNullishValues.value[key].type === 'range')) {
        if (nonNullishValues.value[key].value.min) {
          resultStr += `от ${nonNullishValues.value[key].value.min} `;
        }
        if (nonNullishValues.value[key].value.max) {
          resultStr += `до ${nonNullishValues.value[key].value.max} `;
        }
      } else if (nonNullishValues.value[key].type === 'list') { 
        resultStr = (nonNullishValues.value[key].value.map(mapItem => onlyFillableFields.value[key].values.find(( obj : any ) => obj.xmlId === mapItem)?.name || '')).join(', ');
      }

      data[key] = {
        name: onlyFillableFields.value[key].name,
        value: resultStr
      };
    }
  });
  return data;
})
watch(controlsData, () => { valuesToPost.value = prepareValues(onlyFillableFields.value) })
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
const submit = () => {
  const cities = nonNullishValues.value['city']?.value as Array<string> | null;
  const objectRealty = nonNullishValues.value['objectRealty']?.value as Array<string> | null;
  const params = Object.assign({}, nonNullishValues.value);
  delete params['city'];
  delete params['objectRealty'];
  let resultUrl = '';
  if (objectRealty) {
    resultUrl += '/' + objectRealty.join('-') + '/';
  }
  resultUrl = ('/' + modelSection.value) + resultUrl;
  resultUrl = ('/' + modelOfferType.value) + resultUrl;
  if (cities && cities.length > 0) {
    resultUrl = ('/realty/' + cities.join('-')) + resultUrl;
  } else {
    resultUrl = ('/realty/' + 'all-cities') + resultUrl;
  }
  resultUrl += parseIntoQuery(params);
  navigateTo(resultUrl);
}
const removeFromValuesToPost = (key: string) => {
  if (!nonNullishValues.value[key]) return;
  switch (nonNullishValues.value[key].type) {
    case 'range':
      valuesToPost.value[key] = { min: undefined, max: undefined }
      break;
    case 'list':
      valuesToPost.value[key] = [];
      break;
  }
}
const removeAllValuesToPost = () => Object.keys(valuesToPost.value).forEach(key => removeFromValuesToPost(key)); 
</script>
<template>
  <form class="e-filter" @submit.prevent="submit">
    <div class="e-filter__toggler-group-1">
      <label v-for="(item, index) in offerTypes" :key="index" class="e-filter-toggler-1">
        <input 
          v-model="modelOfferType" type="radio" name="offer-type" :value="item.value"
          :checked="item.value === modelOfferType" />
        {{ item.name }}
      </label>
    </div>
    <div class="e-filter__toggler-group-2">
      <label v-for="(item, index) in sectionTypes" :key="index" class="e-filter-toggler-2">
        <input 
          v-model="modelSection" type="radio" name="object-type" :value="item.value"
          :checked="item.value === modelSection" />
        {{ item.name }}
      </label>
    </div>
    <div v-if="Object.keys(onlyFillableFields).length > 0" class="e-filter-additional">
      <div class="e-filter-additional__wrapper">
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
        <ul class="e-filter-additional__label-row">
          <li v-for="(label, labelIndex) in labelsData" :key="labelIndex" class="e-filter-additional__label-item">
            <ELabel @remove="() => removeFromValuesToPost(labelIndex.toString())">
              {{ label.name }}: {{ label.value }}
            </ELabel>
          </li>
          <li class="e-filter-additional__label-item">
            <ELabel v-if="Object.keys(labelsData).length > 1" hightlighted @remove="removeAllValuesToPost">
              Очистить
            </ELabel>
          </li>
        </ul>
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
@use "/assets/styles/base/shortcuts.scss";
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/mixins/media.scss" as media;

.e-filter {
  &__toggler-group-1 {
    display: flex;
    background-color: variable.$gray;
    gap: 8px;
    box-shadow: variable.$inner-shadow;
    padding: 5px;
    border-radius: variable.$border-md;
    margin-bottom: 23px;

    @include media.min-md {
      width: fit-content;
      margin-bottom: 41px;
    }

    @include media.min-md {
      margin-bottom: 41px;
    }

    @include media.min-llg {
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

    @include media.min-md {
      display: flex;
      margin-bottom: 5px;
    }
  }

  .e-filter-toggler-1 {
    width: 100%;

    @include media.min-md {
      width: fit-content;
    }
  }
}

.e-filter-toggler-1 {
  padding: 5px;
  text-align: center;
  font-weight: 700;
  transition: 0.3s ease-out background-color, 0.3s ease-out color;
  border-radius: variable.$border-sm;

  &:has(input[type="radio"]:checked) {
    background-color: variable.$red;
    color: variable.$white;
  }

  @include media.min-md {
    padding: 5px 44px;
  }
}

.e-filter-toggler-2 {
  width: 100%;
  text-align: center;
  padding: 8px 0px;
  background-color: variable.$gray-dark;
  color: variable.$white;
  font-weight: 700;
  border-radius: variable.$border-sm;
  transition: 0.3s ease-out background-color, 0.3s ease-out color;

  &:has(input[type="radio"]:checked) {
    background-color: variable.$red;
    color: variable.$white;
  }

  @include media.min-md {
    width: fit-content;
    padding: 8px 20px;
  }
}

.e-filter-additional {
  border-radius: variable.$border-sm;
  background-color: #f3f3f3;
  padding: 23px 20px;

  &__wrapper {
    display: flex;
    flex-direction: column;
    gap: 20px;

    @include media.min-md {
      gap: 20px;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      // display: grid;
      // grid-template-columns: repeat(3, 1fr);
    }

    @include media.min-llg {
      gap: 20px;
      // grid-template-columns: repeat(5, 1fr);
    }
  }

  &__bottom {
    display: flex;
    flex-direction: column-reverse;
    gap: 40px;

    @include media.min-md {
      flex-direction: column;
    }

    @include media.min-llg {
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

      @include media.min-md {
        width: fit-content;
      }
    }

    @include media.min-md {
      flex-direction: row;
    }
  }

  &__expand.btn {
    @include media.min-lg {
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

  @include media.min-sm {
    padding: 23px 30px;
  }

  @include media.min-md {
    padding: 23px;
  }

  &__label-row {
    display: flex;
    align-items: end;
    flex-direction: row;
    gap: 6px;
    flex-wrap: wrap
  }
}
</style>
