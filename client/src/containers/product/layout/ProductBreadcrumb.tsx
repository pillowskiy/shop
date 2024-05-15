import { Routes } from '@config'
import { ChevronRight, Home } from 'lucide-react'
import { type FC, Fragment, useContext } from 'react'

import { OverviewProductContext } from '@containers/product/cards/overview/OverviewProductCard'

import { Anchor } from '@ui/Anchor'

export const ProductBreadcrumb: FC = () => {
	const product = useContext(OverviewProductContext)
	if (!product) return null

	return (
		<section className='hidden lg:flex gap-2 items-center py-2 px-4 rounded-md w-full bg-muted overflow-x-auto'>
			<Anchor href={Routes.Home}>
				<Home className='w-5 h-5' />
			</Anchor>
			<ChevronRight className='text-primary w-4 h-4' />
			{product.categories.map(category => (
				<Fragment key={category.id}>
					<Anchor href={`${Routes.Categories}/${category.slug}/`}>
						{category.name}
					</Anchor>
					<ChevronRight className='text-primary opacity-90 w-4 h-4' />
				</Fragment>
			))}
			<span className='font-medium break-words overflow-hidden max-h-6'>
				{product.name.length > 48 ? 'Product' : product.name}
			</span>
		</section>
	)
}
