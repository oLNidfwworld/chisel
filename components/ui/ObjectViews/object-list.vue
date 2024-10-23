<script setup lang="ts">
import type { KeyedObject } from "~/assets/types/entity/data-object";
import ObjectCard from "./object-card.vue";
withDefaults(
  defineProps<{
  items : Array<KeyedObject>,
  showBottomRow? : boolean,
  showFav? : boolean,
}>(),
{
  showBottomRow: true,
  showFav: true
}
);
</script>

<template>
   
  <div class="object-list">
    <ObjectCard  v-for="(item, index) in items" :key="index" :item="item" :show-fav="showFav"  :show-bottom-row="showBottomRow"/>
  </div>
</template>
<style>
.object-list{
  display: flex;
  flex-direction: column;
  gap: 24px;
}
</style>