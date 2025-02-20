interface IntrumApiConfig { apikey: string, host: string, port: string }

class IntrumApi {
    apikey: string;
    host: string;
    port: string;
    
    constructor( { apikey, host, port } : IntrumApiConfig) {
        this.apikey = apikey;
        this.host = host;
        this.port = port
    }

    private async send<T = unknown>( subUrl : string, data?: Record<string, unknown> ) { 
 
        const postObject = {
            ...data,
            apikey: this.apikey,
        }

        const postData = new URLSearchParams(postObject) 

        const responseData = $fetch(`http://${this.host}:${this.port}/sharedapi${subUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: postData
        });

        return responseData as T;
    }
    async getStockTypes( ) {
        return await this.send('/stock/types');
    }
    async getStockCategory( ) {
        return await this.send('/stock/category');
    }
    async getStockFields( ) {
        return await this.send('/stock/fields');
    }
    async getStockByFilter( params: Record<string, unknown>) { 
        return await this.send('/stock/filter', params);
    }
    async getStockById( id: number | string ) {
        const data = await this.getStockByFilter({
            'byid': id
        }) as { data : { list: Array<unknown>}} ; 
        return data.data.list[0];
    }
    getStockUrlPhoto(name: string){
        return `http://${this.host}/files/crm/product/${encodeURIComponent(name)}`
    }
    async insertStock(data : Record<string, unknown>){
        return await this.send('/stock/insert', data);
    } 
    async updateStock(data : Record<string, unknown>){
        return await this.send('/stock/update', data);
    } 
    async updateStockByFilter(filter: Record<string, unknown>, values: Record<string, unknown>){
        return await this.send('/stock/updateByFilter', { filter, values });
    } 
    async deleteStock(params : Record<string, unknown>){
        return await this.send('/stock/delete', params);
    } 
}

export default defineEventHandler( async event => {

    const api = new IntrumApi({
        host: 'ekspertrealty.intrumnet.com',
        apikey: '82bbe8a090d5ee5e0ffac837686ff178',
        port: '80'
    });

    const data = await api.getStockById(100000);
 
    return data;

} );