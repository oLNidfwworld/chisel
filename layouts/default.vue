<script setup>
import EHeader from "~/components/layout/EHeader.vue";
import EFooter from "~/components/layout/EFooter";
import EFilter from "~/components/ui/EFilter/index.vue";
import { useUIstore } from "~/store/ui";

const uiStore = useUIstore();
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
      <div v-if="uiStore.overlayVisibility" class="page-overlay" />
    </Transition>
  </div>
</template>
<style lang="scss">
@import url("/assets/styles/layouts/default.scss");
</style>
