<script setup lang="ts"> 
interface IProps {
  min: number | string;
  max: number | string; 
}
defineProps<IProps>();
const model = defineModel<{
  min: number | undefined;
  max: number | undefined;
}>({
  required: true,
});  
// const numberMax = computed( (  ) => Number(props.max))
// const numberMin= computed( (  ) => Number(props.min))
</script>
<template>
   <div class="e-filter-range">
      <input 
         v-model="model.min"  
         step="0.01" 
         placeholder="От"
         type="number" >
      <span class="e-filter-range__separator" />
      <input   
         v-model="model.max" 
         step="0.01" 
         placeholder="До"
         type="number" >
   </div>
</template>
<style lang="scss" scoped>
@use "/assets/styles/base/variables/colors.scss" as variable;
@use "/assets/styles/mixins/media.scss" as media;

.e-filter-range {
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  min-width: 150px;
  width: 100%;
  border: 1px solid variable.$gray;
  border-radius: variable.$border-sm;
  background-color: variable.$white;
  padding: 9px 14px;
  input[type="number"] {
    border: unset;
    width: 100%;
    font-size: 15px;
    background-color: transparent;
  }
  &__separator {
    display: block;
    margin: 0 10px;
    height: 100%;
    width: 1px;
    background-color: variable.$gray;
  }

  input::placeholder{
    color: #69696978;
  }
}
</style>
