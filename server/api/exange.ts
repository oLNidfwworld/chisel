import { IntrumApi } from "~/assets/types/intrum/intrument"; 
import { cachedStockObjects } from "~/utils/intrum-stock-objects";
import { useRuntimeConfig } from '#imports';
import { cachedStockFields } from "~/utils/intrum-stock-fields";
import prisma from "~/lib/prisma";

export default defineEventHandler(async () => {
  const cfg = useRuntimeConfig();
  const api = new IntrumApi({
    host: "ekspertrealty.intrumnet.com",
    apikey: cfg.public.intrumToken as string,
    port: "80",
  });

  const data = await cachedStockObjects(api, 'stockObjects')  
  const stockFields= await cachedStockFields(api, 'stockFields');

  // await prisma.realtyObject.up({
  //   where: { id : }
  //   data : data.map( object => {
  //     return {
  //       id: Number(object.id),
  //       name: object.name
  //     }
  //   })
  // }); 

  return stockFields
  // return [...new Set(filteredData.map( item => item.stock_type_name))];
});
