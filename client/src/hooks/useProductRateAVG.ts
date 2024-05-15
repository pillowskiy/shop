import ReviewService from '@api/services/review.service'
import { useQuery } from '@tanstack/react-query'

export const useProductRateAvg = (productId: number) => {
	const rating =
		useQuery(
			['product avg rate', productId],
			() => {
				return ReviewService.getAvg(productId)
			},
			{ select: ({ data }) => data }
		).data || 0.0
	return rating
}
