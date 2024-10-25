<script setup>
import FormCallback from '../ui/Forms/FormCallback.vue';

const formVisible = ref(false);
</script>
<template>
    <div class="call-row">
        <button @click="formVisible = true">
            <IPen filled />
        </button>
        <a href="tel:+7(901)517-86-51">
            <IPhoneRinging filled />
        </a>
    </div> 
    <FormCallback v-model="formVisible"/>
</template>
<style lang="scss">
@use '/assets/styles/base/variables/colors.scss' as variable;
@use "/assets/styles/mixins/media.scss" as media;
.call-row{
    position: fixed;
    right: 0;
    top: 25%;
    display: flex;
    z-index: 50;
    flex-direction: column;
    gap: 12px;
    background-color: variable.$gray;
    padding: 12px 8px;
    border-radius: variable.$border-md 0 0 variable.$border-md;
  
    * {
      fill: variable.$red !important;
    }
  }
</style>
