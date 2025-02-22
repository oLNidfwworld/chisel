import type { IntrumApi } from "~/assets/types/intrum/intrument"
import { transliterate } from "./transliterate";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const cachedStockTypes = defineCachedFunction(async (api: IntrumApi, key: string) => { 
    const data = await api.getStockTypes();
    data.data.forEach( type => type.code = transliterate(type.name))
    return data
}, {
    maxAge: 60 * 60,
    name: 'stockTypes',
    getKey: (intrumObj, key : string) => key
})