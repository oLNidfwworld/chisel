<script setup lang="ts">
defineProps<{
    h1? : string
}>();
</script>
<template> 
   <div class="content-bg ">
      <div class="container">
         <h1 class="title-big">{{ h1 ?? '???' }}</h1>
      </div>
   </div>
   <main class="page-content">
      <div class="container typography">
         <slot/>
      </div>
   </main>
</template>
<style lang="scss" >
@use '/assets/styles/layouts/content.scss';
</style>