import ProductService from '@api/services/product.service'
import { useQuery } from '@tanstack/react-query'

import { useSelector } from '@hooks/useSelector'

import type { CartFullestItem } from '@/types/cart.interface'

export const useCart = () => {
	const { items } = useSelector(state => state.cart)
	const ids = items.map(({ productId }) => productId)
	const { data, isInitialLoading } = useQuery(
		['get cart products', ids.toString()],
		() => {
			return ProductService.getAll({ ids })
		},
		{
			select: ({ data }) => data,
			refetchInterval: false,
			keepPreviousData: true,
			enabled: !!items.length
		}
	)

	const fullestItems: CartFullestItem[] =
		items.length && data?.length
			? data?.products.map(product => {
					return {
						productId: product.id,
						product,
						count:
							items.find(({ productId }) => product.id === productId)?.count ||
							1
					}
			  })
			: []

	const totalCost = fullestItems.reduce((acc, current) => {
		return current.product.finalPrice * current.count + acc
	}, 0)
	const totalItems = fullestItems.reduce((acc, { count }) => {
		return acc + count
	}, 0)

	return { items: fullestItems, totalCost, totalItems, isInitialLoading }
}
