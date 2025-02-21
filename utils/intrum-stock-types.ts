import type { IntrumApi } from "~/assets/types/intrum/intrument"

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const cachedStockTypes = defineCachedFunction(async (api: IntrumApi, key: string) => { 
    return await api.getStockTypes()
}, {
    maxAge: 60 * 60,
    name: 'stockTypes',
    getKey: (intrumObj, key : string) => key
})