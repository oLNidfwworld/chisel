import type { IntrumApi, IntrumStockObject } from "~/assets/types/intrum/intrument";
import { cachedStockTypes } from './intrum-stock-types';
import { cachedStockFields } from './intrum-stock-fields';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const cachedStockObjects = defineCachedFunction(async ( api : IntrumApi, key: string ) => { 

  const stockTypes = await cachedStockTypes(api, 'stockTypes');
  const stockFields = await cachedStockFields(api, 'stockFields');

  const stockObjects: IntrumStockObject[] = [];
  for (const type of stockTypes.data) {
    const data = await api.getStockByFilter({
      type: type.id,
      page: "1",
      publish: "1",
      limit: "500",
    });
    data.data.list.forEach((object) => {
      object.fields.forEach((field) => {
        field.name = stockFields.data[type.id].fields[field.id].name;
      });
      stockObjects.push(object);
    });

  }

  return stockObjects;
}, {
    maxAge: 60 * 60,
    name: 'stockObjects',
    getKey: ( api, key ) => key
});
