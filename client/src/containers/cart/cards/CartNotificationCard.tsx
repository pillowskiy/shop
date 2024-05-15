import { Card } from '@common/Card'
import { Routes } from '@config'
import { priceFormat } from '@lib/formatter'
import Image from 'next/image'
import Link from 'next/link'
import type { FC } from 'react'

import { CartDialog } from '@containers/cart/dialogs/CartDialog'

import { Button } from '@ui/Button'
import { Skeleton } from '@ui/Skeleton'

import { useCart } from '@hooks/useCart'

export const CartNotificationCard: FC = () => {
	const { items, totalCost, isInitialLoading } = useCart()

	if (!items.length && !isInitialLoading) {
		return null
	}

	if (!items.length && isInitialLoading) {
		return (
			<Card className='w-full bg-popover p-4 flex flex-col md:flex-row gap-2 justify-between mt-4 items-center'>
				<section>
					<Skeleton className='w-[96px] md:w-[256px] h-7' />
					<Skeleton className='mt-2 w-[64px] md:w-[156px] h-5' />
				</section>
				<section className='flex gap-2 select-none max-w-full overflow-x-auto'>
					{Array.from({ length: 5 }, (_, index) => (
						<Skeleton key={index} className='w-[64px] h-[64px]' />
					))}
				</section>
				<section className='flex gap-2 flex-col lg:flex-row w-full md:w-4/12 lg:w-3/12 justify-end items-end'>
					<Skeleton className='w-full md:w-[128px] h-10' />
					<Skeleton className='w-full md:w-[128px] h-10' />
				</section>
			</Card>
		)
	}

	return (
		<Card className='w-full bg-popover p-4 flex flex-col md:flex-row gap-2 justify-between mt-4 items-center animate-catalog-mount'>
			<section className='text-center md:text-left'>
				<h2 className='font-medium text-xl'>
					There are {items.length} product(-s)
				</h2>
				<p className='text-primary opacity-90'>
					worth {priceFormat(totalCost)}
				</p>
			</section>

			<section className='flex gap-2 select-none max-w-full overflow-x-auto'>
				{items.slice(0, 4).map(item => (
					<Image
						key={item.product.id}
						className='w-[64px] h-[64px] rounded-lg border object-cover'
						src={item.product.images[0]}
						alt='Product Image'
						width={96}
						height={96}
					/>
				))}
				{items.length > 4 && (
					<div className='p-2 w-[64px] h-[64px] bg-muted shadow-md rounded-lg flex flex-col items-center justify-center'>
						<h2 className='text-2xl font-medium leading-5'>
							+{items.length - 4}
						</h2>
						<p className='text-xs text-primary opacity-90 leading-4'>
							products
						</p>
					</div>
				)}
			</section>

			<section className='flex gap-2 flex-col lg:flex-row w-full md:w-4/12 lg:w-3/12 justify-end items-end'>
				<CartDialog>
					<Button className='w-full md:w-fit' variant='link'>
						Go to cart
					</Button>
				</CartDialog>
				<Link className='w-full md:w-fit' href={Routes.OrderCheckout}>
					<Button className='w-full'>Place an order</Button>
				</Link>
			</section>
		</Card>
	)
}
