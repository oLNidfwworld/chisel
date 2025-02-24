<script setup>
const props = defineProps({
    items: {
        type: Array,
        required: true
    }
});
const router = useRouter(); 
const defaultCenter = ref([55.780826, 38.670362]);
const center = computed(( ) => {
    const newCenter = [
        (props.items.reduce((a, b) => a + Number(b.coordinates.lat), 0) / (props.items.length)),
        (props.items.reduce((a, b) => a + Number(b.coordinates.lon), 0) / (props.items.length))
    ]; 
    if ( !Number.isNaN(newCenter[0]) && !Number.isNaN(newCenter[1]) ) return newCenter
    else return defaultCenter.value
}); 
const goto = ( item ) => {
    router.push(`/realty/immovable-${item.id}`)
}  
const route = useRoute()
const backToCatalog = ( ) => {
    router.push(route.fullPath.replaceAll('onMap=1', ''))
}
</script>
<template>
   <ClientOnly>
      <div class="objects-map-wrapper"> 
         <button
            class="objects-map__close"
            @click="backToCatalog">
            <ICross/>
         </button>
         <YandexMap
            :controls="[]"
            class="objects-map"
            :coordinates="center || defaultCenter">
            <YandexMarker  
               v-for="(item, index) in items"
               :key="index"
               :coordinates="[item.coordinates.lat, item.coordinates.lon]"
               :options="{
                  iconLayout: 'default#imageWithContent',
                  iconImageHref: '/ekspertMarker.svg',
                  iconImageSize: [50, 50],
                  iconImageOffset: [-25, -55],
               }"
               :marker-id="item.id" 
               @click="() => goto(item)"/>  
         </YandexMap>
      </div>
   </ClientOnly>
</template>
<style lang="scss">
@use '/assets/styles/base/variables/colors.scss';
.objects-map {
    height: 700px;
    &__close{
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        top: 32px;
        right: 32px;
        width: 44px;
        height: 44px;
        z-index: 123123; 
        padding: 10px 10px;
        border-radius: 8px;
        background-color: colors.$white;
        svg {
            width: 100% !important;
            height: 100% !important;
        }
    }
}
.objects-map-wrapper{
    position: relative;
}
</style>