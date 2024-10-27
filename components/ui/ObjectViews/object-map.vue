<script setup>
const props = defineProps({
    items: {
        type: Array,
        required: true
    }
});
const router = useRouter();
const center = computed(( ) => {
    return [
        (props.items.reduce((a, b) => a + Number(b.coordinates.lat), 0) / (props.items.length)),
        (props.items.reduce((a, b) => a + Number(b.coordinates.lon), 0) / (props.items.length))
    ];
}); 
const goto = ( item ) => {
    router.push(`/realty/immovable-${item.id}`)
}
</script>
<template>
    <ClientOnly>
        <YandexMap :controls="[]" class="objects-map" :coordinates="center">
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