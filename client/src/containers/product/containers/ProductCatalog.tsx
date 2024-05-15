import ProductService from '@api/services/product.service'
import { useQuery } from '@tanstack/react-query'
import { motion } from 'framer-motion'
import type { FC, PropsWithChildren } from 'react'

import * as Catalog from '@containers/product/cards/catalog'

import { Filter } from '@/types/product.interface'

const mountAnimation = {
	hidden: (custom: number = 0) => ({
		opacity: 0,
		transition: { delay: custom * 0.02 }
	}),
	visible: (custom: number) => ({
		opacity: 1,
		transition: { delay: custom * 0.02 }
	})
}

const MProductContainer: FC<PropsWithChildren> = ({ children }) => {
	return (
		<motion.section
			className='h-fit w-full flex flex-wrap gap-4 box-border'
			initial='hidden'
			whileInView='visible'
			viewport={{ once: true }}
		>
			{children}
		</motion.section>
	)
}

export const ProductCatalog: FC<Filter> = ({ ...filterParams }) => {
	const { data, isLoading } = useQuery(
		['get products', ...Object.values(filterParams)],
		() => {
			return ProductService.getAll(filterParams)
		},
		{
			select: ({ data }) => data
		}
	)

	if (isLoading) {
		return (
			<MProductContainer>
				{Array.from({ length: 8 }, (_, index) => (
					<Catalog.Skeleton.MProduct
						exit={mountAnimation.hidden(index)}
						key={index}
					/>
				))}
			</MProductContainer>
		)
	}

	return (
		<MProductContainer>
			{data?.length ? (
				data.products.map((product, index) => (
					<Catalog.Card.MProduct
						custom={index}
						variants={mountAnimation}
						key={product.id}
						product={product}
					/>
				))
			) : (
				<div className='p-4 rounded-lg bg-popover w-full text-2xl text-center font-medium select-none'>
					🙅There are no products yet!
				</div>
			)}
		</MProductContainer>
	)
}
