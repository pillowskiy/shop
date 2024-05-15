import ProductService from '@api/services/product.service'
import { getStringFromQuery } from '@lib/utils'
import { useQuery } from '@tanstack/react-query'
import type { ParsedUrlQuery } from 'querystring'
import type { FC } from 'react'

import * as Catalog from '@containers/product/cards/catalog'

import { type Filter, ProductSort } from '@/types/product.interface'

interface CatalogWithQueryProps {
	query: ParsedUrlQuery
}

export const CatalogWithQuery: FC<CatalogWithQueryProps> = ({ query }) => {
	const filterParams: Filter = {
		sort: (getStringFromQuery(query.sort) ||
			ProductSort.Popular) as ProductSort,
		term: getStringFromQuery(query.term)
	}

	const { data, isLoading } = useQuery(
		['get products', ...Object.values(query)],
		() => {
			return ProductService.getAll(filterParams)
		},
		{
			select: ({ data }) => data
		}
	)

	if (isLoading) {
		return (
			<section className='h-fit w-full flex flex-wrap gap-4 box-border'>
				{Array.from({ length: 8 }, () => (
					<Catalog.Skeleton.Product key={Date.now() * Math.random()} />
				))}
			</section>
		)
	}

	return (
		<section className='mt-4 h-fit w-full flex flex-wrap gap-4 box-border'>
			{data?.length ? (
				data.products.map(product => (
					<Catalog.Card.MProduct key={product.id} product={product} />
				))
			) : (
				<div className='p-4 rounded-lg bg-popover w-full text-2xl text-center font-medium select-none'>
					🙅There are no products yet!
				</div>
			)}
		</section>
	)
}
