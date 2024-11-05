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
</script>
<template>
    <ClientOnly>
        <YandexMap :controls="[]" class="objects-map" :coordinates="center || defaultCenter">
            <YandexMarker  
                v-for="(item, index) in items" :key="index"
                :coordinates="[item.coordinates.lat, item.coordinates.lon]" :options="{
                    iconLayout: 'default#imageWithContent',
                    iconImageHref: '/ekspertMarker.svg',
                    iconImageSize: [50, 50],
                    iconImageOffset: [-25, -55],
                }" :marker-id="item.id" 
                @click="() => goto(item)"/>  
        </YandexMap>
    </ClientOnly>
</template>
<style lang="scss">
.objects-map {
    height: 700px;
}
</style>