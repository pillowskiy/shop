import type { AxiosResponse } from 'axios'

import { $api } from '../api.interceptor'

import type {
	Filter,
	GetAllProductsResponse,
	Product,
	ProductFullest
} from '@/types/product.interface'

export default class ProductService {
	private static controller = 'products'

	static async getAll(
		filterParams?: Filter
	): Promise<AxiosResponse<GetAllProductsResponse>> {
		const identifiers = filterParams?.ids?.length
			? { ids: filterParams?.ids.toString() }
			: {}
		return $api.get<GetAllProductsResponse>(`${this.controller}`, {
			params: { ...filterParams, ...identifiers } || {}
		})
	}

	static async getUserProducts(
		userId: number,
		filterParams?: Filter
	): Promise<AxiosResponse<GetAllProductsResponse>> {
		return $api.get<GetAllProductsResponse>(
			`${this.controller}/users/${userId}`,
			{ params: filterParams || {} }
		)
	}

	static async getUserFavorites(
		filterParams?: Filter
	): Promise<AxiosResponse<GetAllProductsResponse>> {
		return $api.get<GetAllProductsResponse>(`${this.controller}/favorites`, {
			params: filterParams || {}
		})
	}

	static async getByValue<T extends keyof Pick<Product, 'id' | 'slug'>>(
		type: T,
		value: Product[T]
	): Promise<AxiosResponse<ProductFullest>> {
		return $api.get<ProductFullest>(`${this.controller}/${type}/${value}`)
	}

	static async getByCategorySlug(
		slug: string
	): Promise<AxiosResponse<Product[]>> {
		return $api.get<Product[]>(`${this.controller}/category/${slug}`)
	}

	static async getSimilar(
		productId: number
	): Promise<AxiosResponse<Product[]>> {
		return $api.get<Product[]>(`${this.controller}/similar/${productId}`)
	}

	static async upsert(
		data: FormData,
		productId: number = -1
	): Promise<AxiosResponse<ProductFullest>> {
		return $api.post<ProductFullest>(`${this.controller}/${productId}`, data)
	}

	static async delete(productId: number): Promise<AxiosResponse<number>> {
		return $api.delete<number>(`${this.controller}/${productId}`)
	}
}
