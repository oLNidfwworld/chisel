import type { IntrumApi, IntrumStockObject } from "~/assets/types/intrum/intrument";
import { cachedStockTypes } from './intrum-stock-types';
import { cachedStockFields } from './intrum-stock-fields';
import { transliterate } from './transliterate';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const cachedStockObjects = defineCachedFunction(async ( api : IntrumApi, key: string ) => { 

  const stockTypes = await cachedStockTypes(api, 'stockTypes');
  const stockFields = await cachedStockFields(api, 'stockFields');

  let stockObjects: IntrumStockObject[] = [];
  for (const type of stockTypes.data) {
    const data = await api.getStockByFilter({
      type: type.id,
      page: "1",
      publish: "1",
      limit: "500",
    });
    
    data.data.list.forEach((object) => {
      object.stock_type_name = type.name;
      object.fields.forEach((field) => {
        field.name = stockFields.data[type.id].fields[field.id].name; 
        field.code = transliterate(stockFields.data[type.id].fields[field.id].name); 
      });

      stockObjects.push(object);
    }); 
  }

  stockObjects = stockObjects.filter( stockObject => { 
    const findedField = stockObject.fields.find( field => field.name == 'Выгружать на сайт' )
    return findedField && findedField.value != '0' 
  })

  return stockObjects;
}, {
    maxAge: 60 * 60,
    name: 'stockObjects',
    getKey: ( api, key ) => key
});
