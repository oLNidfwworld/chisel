import type { KeyedObject } from "~/assets/types/entity/data-object";

export const filterControlsException = ( obj : KeyedObject ) => { 
    const newObj = Object.assign({}, obj);
    if ( 'objectRealty' in newObj ) { 
        // убираем доли
        const objectRealtyValues = newObj['objectRealty'].values as Array<{name: string, xmlId : string}>;

        {
            const newValues = objectRealtyValues.filter( objValue => objValue.xmlId !== 'part')
            if ( newValues ) 
                newObj['objectRealty'].values = newValues;
        }
        {
            const checkIfExist  = objectRealtyValues.find( objValue => ['tryohkomnatnye','dnokomnatnye','dvuhkomnatnye','komnata'].indexOf(objValue.xmlId) !== -1 ); 
            if ( checkIfExist) { 
                newObj['objectRealty'].values = objectRealtyValues.sort( (a , b ) => a.name.charCodeAt(0) - b.name.charCodeAt(0));    
            }
        }
    } 
    
    return newObj;
}