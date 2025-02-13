import type { KeyedObject } from "~/assets/types/entity/data-object";

export const filterControlsException = ( obj : KeyedObject, section : string ) => { 
    const newObj = Object.assign({}, obj);
    if ( 'objectRealty' in newObj ) { 
        // убираем доли
        const objectRealtyValues = newObj['objectRealty'].values as Array<{name: string, xmlId : string}>;

        {
            const newValues = objectRealtyValues.filter( objValue => objValue.xmlId !== 'part')
            if ( newValues ) 
                newObj['objectRealty'].values = newValues;
        }

        // сортируем 1к, 2к, 3к...
        {
            const checkIfExist  = objectRealtyValues.find( objValue => ['tryohkomnatnye','dnokomnatnye','dvuhkomnatnye','komnata'].indexOf(objValue.xmlId) !== -1 ); 
            if ( checkIfExist) { 
                newObj['objectRealty'].values = objectRealtyValues.sort( (a , b ) => a.name.charCodeAt(0) - b.name.charCodeAt(0));    
            }
        }
        {
            const relativeSort = ['house','dacha','area'];
            const checkIfExist  = objectRealtyValues.find( objValue => relativeSort.indexOf(objValue.xmlId) !== -1 ); 
            if ( checkIfExist ) { 
                newObj['objectRealty'].values = objectRealtyValues.sort( ( a , b ) => relativeSort.indexOf(a.xmlId) - relativeSort.indexOf(b.xmlId));    
            }
        }
        if ( section === 'zagorodnaya' ) {
             delete newObj['floor'];
        } 
    }  
    if ( section === 'zagorodnaya') {
        if ( 'totalSpace' in newObj ){
            newObj.totalSpace.name = 'Площадь дома'
        } 
    }

    return newObj;
}