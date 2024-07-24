

export const useUIstore = defineStore("overlay", ( ) => {
    const overlayVisibility = useState( "overlayState", ( ) => false );  

    const toggleOverlayVisibility = ( show : boolean ) : void => {
        overlayVisibility.value = show;
    }

    return {
        overlayVisibility,
        toggleOverlayVisibility
    }
})