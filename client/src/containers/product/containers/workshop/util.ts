import { INITIAL_PRODUCT } from '@containers/product/containers/workshop/constant'

import type { Product, UpdateProductData } from '@/types/product.interface'

export const getInitialProductState = (
	product?: Product
): UpdateProductData => {
	if (!product) return INITIAL_PRODUCT

	return {
		images: product.images,
		description: product.description,
		quantity: product.quantity,
		name: product.name,
		discountPercent: product.discountPercent,
		categories: product.categories.map(({ id }) => id),
		price: product.price,
		weight: 0
	}
}
