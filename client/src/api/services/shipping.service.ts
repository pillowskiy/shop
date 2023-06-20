import type {CreateShippingData, Shipping} from "@types/shipping.interface";
import type {AxiosResponse} from "axios";
import {$api} from "@api/api.interceptor";

export default class ShippingService {
    private static controller = 'shipping';

    static async getAll()
        : Promise<AxiosResponse<Shipping[]>> {
        return $api.get<Shipping[]>(`${this.controller}`);
    }

    static async createShipping(data: CreateShippingData)
        : Promise<AxiosResponse<Shipping>> {
        return $api.post<Shipping>(`${this.controller}`, data);
    }

    static async deleteShipping(shippingId: number)
        : Promise<AxiosResponse<Shipping>> {
        return $api.delete<Shipping>(`${this.controller}/${shippingId}`);
    }
}