import { Card } from '@common/Card'
import { Routes } from '@config'
import { cn } from '@lib/utils'
import { motion } from 'framer-motion'
import { Edit } from 'lucide-react'
import Link from 'next/link'
import { forwardRef } from 'react'

import { ProductHorizontalInfo } from '@containers/product/cards/ProductHorizontalInfo'
import { DeleteButton } from '@containers/product/layout/DeleteButton'

import { Button } from '@ui/Button'

import { useProfile } from '@hooks/useProfile'

import type { Product } from '@/types/product.interface'

interface UserProductProps {
	product: Product
	ownerId: number
}

const UserProductCard = forwardRef<HTMLDivElement, UserProductProps>(
	({ product, ownerId }, ref) => {
		const { profile } = useProfile()

		return (
			<Card
				ref={ref}
				className={cn(
					'relative flex flex-col justify-start md:flex-row md:items-center my-0 mx-auto',
					'border mt-4 rounded-lg shadow-sm bg-popover hover:shadow-xl hover:bg-muted transition-all',
					'duration-200 border h-fit md:h-[98px] p-2 md:p-0',
					{
						'opacity-90': !product.quantity
					}
				)}
			>
				<ProductHorizontalInfo product={product} />

				{profile?.id === ownerId && (
					<>
						<Button className='ml-auto mt-2 md:mt-0 w-full md:w-fit' asChild>
							<Link href={`${Routes.ProductWorkshop}/${product.id}`}>
								<Edit /> Edit
							</Link>
						</Button>
						<DeleteButton
							className='hidden md:block mx-4'
							variant='secondary'
							productId={product.id}
						/>
					</>
				)}
			</Card>
		)
	}
)

UserProductCard.displayName = 'UserProductCard'
const MUserProductCard = motion<UserProductProps>(UserProductCard)
export { UserProductCard, MUserProductCard }
