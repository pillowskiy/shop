import type { AxiosResponse } from 'axios'

import { $api } from '../api.interceptor'

import { StatisticValue } from '@/types'

export default class StatisticService {
	private static controller = 'statistics'

	static async getUserStatistic(
		userId: number
	): Promise<AxiosResponse<StatisticValue[]>> {
		return $api.get<StatisticValue[]>(
			`/${StatisticService.controller}/${userId}`
		)
	}
}
