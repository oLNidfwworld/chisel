<script setup lang="ts">
import type { KeyedObject } from "~/assets/types/entity/data-object";
import ObjectCard from "./object-card.vue";
defineProps<{
  items : Array<KeyedObject>
}>();
</script>

<template>
   
  <div class="object-list">
    <ObjectCard v-for="(item, index) in items" :key="index" :item="item" />
  </div>
</template>
<style>
.object-list{
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>