export const useBargainingStore = defineStore('barg', () => {

    const lookOutObject = ref<Object | null>(null);

    const setLookOutObject = (newValue : Object) => {
        lookOutObject.value = newValue;
    }

    return {
        lookOutObject,
        setLookOutObject
    }
})