import { IntrumApi } from "~/assets/types/intrum/intrument"; 
import { cachedStockObjects } from "~/utils/intrum-stock-objects";

export default defineEventHandler(async () => {
  const cfg = useRuntimeConfig();
  const api = new IntrumApi({
    host: "ekspertrealty.intrumnet.com",
    apikey: cfg.public.intrumToken as string,
    port: "80",
  });

  const data = await cachedStockObjects(api, 'stockObjects')
  
  // stockTypes.data.forEach( function ( value, index, array ) {
  //     value.stockFields = stockFields.data[value.id]
  // }); 
  const filteredData = data.filter( object => {
    const findedField = object.fields.find( field => field.name == 'Выгружать на сайт' )
    return findedField && findedField.value != '0'
  } )
  
  return filteredData;
});
