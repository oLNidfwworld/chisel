<script setup lang="ts">
import EHeader from "~/components/layout/EHeader.vue";
import EFooter from "~/components/layout/EFooter/index.vue";
import EFilter from "~/components/ui/EFilter/index.vue";
import { useUIstore } from "~/store/ui"; 
import ECallRow from "~/components/layout/ECallRow.vue"; 
const uiStore = useUIstore();

useRecaptchaProvider()

</script>
<template>
   <div class="page-wrapper">
      <EHeader />
      <EFilter />
      <main class="page-content">
         <slot />
      </main>
      <EFooter />
      <Transition name="overlay-appear">
         <div
            v-if="uiStore.overlayVisibility"
            class="page-overlay" />
      </Transition>
      <ECallRow />
   </div>
</template>
<style lang="scss">
@use "/assets/styles/layouts/default.scss";
</style>
