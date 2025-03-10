<script setup>
import BargainingPreview from '~/components/ui/Bargaining/BargainingPreview.vue'; 

definePageMeta({
    layout : 'no-filter'
})
useSeoMeta(
    {
      title : 'Продажа земельных участокв МКР Трубицыно'
    }
)

const mapCenter = ref([55.77157346148135, 38.5848870091816])
const zoom = 17;
const { data: placements } = await useApiFetch(`/Bargaining/`);
  
const photos = computed(() => {
    const photosValue  = [ ]; 
    placements.value.items.map(el => {
        el.PHOTOS.map(photo => { 
            photosValue.push(photo); 
        })
    })
    return photosValue;
})  
const minPrice = computed(() => {
    return placements.value.items
                .filter(immovableItem => immovableItem.STATUS.CODE !== "RESERVED" && immovableItem.STATUS.CODE !== "SELLED" )
                .reduce((a, b) => Math.min(a, b.PRICE), Number.POSITIVE_INFINITY);
}) 
const minSquare = computed(() => {
    return placements.value.items
                .filter(immovableItem => immovableItem.STATUS.CODE !== "RESERVED" && immovableItem.STATUS.CODE !== "SELLED" )
                .reduce((a, b) => Math.min(a, b.SQUARE), Number.POSITIVE_INFINITY);
})    
 

provide('fromIBargainingToPreview', {
    "zoom" : zoom,
    "mapCenter" : mapCenter,
    "placements" : placements
});

</script>
<template>    
   <BargainingPreview
      :photos="photos"
      :min-price="minPrice"
      :min-square="minSquare"
      :similar="placements.items" />  
</template>
<style >    
*{
    --reserved : rgb(87, 98, 255);
    --selled : #e02d1f;
    --sellable : #79cd79 ;
}
#map {
    height: 80vh !important;
} 
</style>