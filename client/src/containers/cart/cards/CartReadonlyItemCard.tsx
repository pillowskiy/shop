import { Card } from '@common/Card'
import { priceFormat } from '@lib/formatter'
import { cn } from '@lib/utils'
import type { FC } from 'react'

import { ProductHorizontalInfo } from '@containers/product/cards/ProductHorizontalInfo'

import type { CartFullestItem } from '@/types/cart.interface'

interface CartReadonlyItemCardProps {
	item: CartFullestItem
}

export const CartReadonlyItemCard: FC<CartReadonlyItemCardProps> = ({
	item
}) => {
	return (
		<Card
			key={item.product.id}
			className={cn(
				'bg-white hover:bg-muted hover:shadow-lg transition-all min-w-[260px] w-full mt-4 animate-catalog-mount',
				'relative flex flex-col lg:flex-row lg:justify-between lg:items-center shadow-md p-2 lg:p-0'
			)}
		>
			<ProductHorizontalInfo product={item.product} />
			<section className='flex justify-between md:px-2 w-full text-center'>
				<article className='py-2 px-2 md:px-4'>
					<h2 className='text-lg leading-5'>
						{priceFormat(item.product.finalPrice)}
					</h2>
					<p className='text-xs leading-3 m-auto text-primary opacity-90'>
						Price
					</p>
				</article>
				<article className='py-2 px-2 md:px-4'>
					<h2 className='text-lg leading-5'>{item.count}</h2>
					<p className='text-xs leading-3 m-auto text-primary opacity-90'>
						Item(s)
					</p>
				</article>
				<article className='py-2 px-2 md:px-4'>
					<h2 className='text-lg leading-5'>
						{priceFormat(item.count * item.product.finalPrice)}
					</h2>
					<p className='text-xs leading-3 m-auto text-primary opacity-90'>
						Amount
					</p>
				</article>
			</section>
		</Card>
	)
}
