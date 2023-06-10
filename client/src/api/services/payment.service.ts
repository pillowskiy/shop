import type {CreatePaymentData, Payment} from "@/types/payment.interface";
import {AxiosResponse} from "axios";
import {$api} from "@api/api.interceptor";

export default class PaymentService {
    private static controller = 'payments';

    static async getAll()
        : Promise<AxiosResponse<Payment[]>> {
        return $api.get<Payment[]>(`${this.controller}`);
    }

    static async createPayment(data: CreatePaymentData)
        : Promise<AxiosResponse<Payment>> {
        return $api.post<Payment>(`${this.controller}`);
    }

    static async deletePayment(paymentId: number)
        : Promise<AxiosResponse<Payment>> {
        return $api.delete<Payment>(`${this.controller}/${paymentId}`);
    }

    static async createMagicCard()
        : Promise<AxiosResponse<Payment>> {
        return $api.post<Payment>(`${this.controller}/magic`);
    }
}