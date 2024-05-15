import type { AxiosResponse } from 'axios'

import { $api } from '../api.interceptor'

import type {
	CreatePromoCodeData,
	PromoCode
} from '@/types/promo-code.interface'

export default class PromoCodeService {
	private static controller = 'promo-codes'

	static async create(
		data: CreatePromoCodeData
	): Promise<AxiosResponse<PromoCode>> {
		return $api.post<PromoCode>(`/${PromoCodeService.controller}/`, data)
	}
	static async findOne(promoName: string): Promise<AxiosResponse<PromoCode>> {
		return $api.get<PromoCode>(`/${PromoCodeService.controller}/${promoName}`)
	}
	static async remove(promoId: number): Promise<AxiosResponse<PromoCode>> {
		return $api.delete<PromoCode>(`/${PromoCodeService.controller}/${promoId}`)
	}
}
