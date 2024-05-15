import type { AxiosResponse } from 'axios'

import { $api } from '../api.interceptor'

import type { CreateOrderData, Order, OrderItem } from '@/types/order.interface'

export default class OrderService {
	private static controller = 'orders'

	static async getOrders(): Promise<AxiosResponse<Order[]>> {
		return $api.get<Order[]>(`/${OrderService.controller}/`)
	}

	static async createOrder(
		data: CreateOrderData
	): Promise<AxiosResponse<Order>> {
		return $api.post<Order>(`/${OrderService.controller}/`, data)
	}

	static async getOrderItems(
		orderId: number
	): Promise<AxiosResponse<OrderItem[]>> {
		return $api.get<OrderItem[]>(`/${OrderService.controller}/items/${orderId}`)
	}

	static async cancelOrder(orderId: number): Promise<AxiosResponse<Order>> {
		return $api.patch<Order>(`/${OrderService.controller}/${orderId}`)
	}
}
