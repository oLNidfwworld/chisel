<script setup>
import EHeader from "~/components/base/layout/EHeader.vue";
import EFooter from "~/components/base/layout/EFooter.vue";
</script>
<template>
  <div class="page-wrapper">
    <EHeader />
    <main class="page-content">
      <slot />
    </main>
    <EFooter />
  </div>
</template>
<style lang="scss">
@import url("/assets/styles/layouts/default.scss");
</style>
