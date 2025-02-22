// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-ignore
import * as qs from 'qs'

interface IntrumResponse<T> {
    status: string,
    data: T
}
export type IntrumStockType = {
    id: string,
    name: string,
    code?: string,
    groups: Array<unknown>,
    stockFields?: IntrumStockField
}

export type IntrumStockField = {
    fields: Record<string | number, { id: string, datatype: string, name: string, require: string }>,
    grouds: Record<string | number, { id: string, childs: Array<string>, name: string, order: string }>,
    nested_selects: Array<string>,
    deleted_fields: Record<string | number, Array<string>>
}
export type IntrumStockObject = {
    id: string,
    stock_type: string,
    stock_type_name?: string,
    type: string,
    parent: string,
    name: string,
    date_add: string,
    count: string,
    author: string,
    employee_id: string,
    additional_author: Array<unknown>,
    additional_employee_id: Array<unknown>,
    last_modify: string,
    customer_relation: string,
    stock_activity_type: string,
    stock_activity_date: string,
    publish: string,
    copy: string,
    group_id: string,
    stock_creator_id: string,
    log?: unknown,
    fields: Array<
        {
            id: string,
            name?: string,
            type: "select" | "decimal" | "multiselect" | "radio" | "integer" | "text" | "file",
            value: string,
            code?: string,
        } |
        {
            id: string,
            type: "point",
            name?: string,
            value: {
                x: string,
                y: string
            }
            code?: string,
        }
    >
}

export interface IntrumApiConfig { apikey: string, host: string, port: string }

export class IntrumApi {
    apikey: string;
    host: string;
    port: string;

    constructor({ apikey, host, port }: IntrumApiConfig) {
        this.apikey = apikey;
        this.host = host;
        this.port = port
    }

    private async send<T = unknown>(subUrl: string, params?: Record<string, unknown>) { 

        const responseData = $fetch<IntrumResponse<T>>(`http://${this.host}:${this.port}/sharedapi${subUrl}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: qs.stringify({
                apikey: this.apikey,
                params
            })
        });

        return responseData;
    }
    async getStockTypes() {
        return await this.send<IntrumStockType[]>('/stock/types');
    }
    async getStockCategory() {
        return await this.send('/stock/category');
    }
    async getStockFields() {
        return await this.send<Record<string | number, IntrumStockField>>('/stock/fields');
    }
    async getStockByFilter(params: Record<string, string>) {
        return await this.send<{list: IntrumStockObject[]}>('/stock/filter', params);
    }
    async getStockById(id: number | string) {
        const data = await this.getStockByFilter({
            'byid': id.toString()
        });
        return data.data.list[0];
    }
    getStockUrlPhoto(name: string) {
        return `http://${this.host}/files/crm/product/${encodeURIComponent(name)}`
    }
    async insertStock(data: Record<string, string>) {
        return await this.send('/stock/insert', data);
    }
    async updateStock(data: Record<string, string>) {
        return await this.send('/stock/update', data);
    }
    async updateStockByFilter(filter: Record<string, string>, values: Record<string, string>) {
        return await this.send('/stock/updateByFilter', { filter, values });
    }
    async deleteStock(params: Record<string, string>) {
        return await this.send('/stock/delete', params);
    }
}