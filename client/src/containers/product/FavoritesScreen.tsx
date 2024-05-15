import { opacityListAnimation } from '@lib/animations'
import AuthProvider from '@providers/AuthProvider'
import type { FC } from 'react'

import { EmptyItems } from '@containers/EmptyItems'
import { Main } from '@containers/Main'
import { Meta } from '@containers/Meta'
import { MFavoriteProductCard } from '@containers/product/cards/FavoriteProductCard'
import { HorizontalSkeleton } from '@containers/product/cards/HorizontalSkeleton'

import { useFavorites } from '@hooks/useFavorites'

export const FavoritesScreen: FC = () => {
	const { data, isLoading } = useFavorites()

	return (
		<Meta title='Favorites'>
			<AuthProvider forAuth={true}>
				<Main className='min-h-screen-64'>
					{isLoading ? (
						<div>
							{Array.from({ length: 20 }, (_, index) => (
								<HorizontalSkeleton key={index} />
							))}
						</div>
					) : !data?.products.length ? (
						<EmptyItems>There are not favorite items yet</EmptyItems>
					) : (
						data.products.map((product, index) => (
							<MFavoriteProductCard
								initial='initial'
								animate='animate'
								custom={index}
								variants={opacityListAnimation}
								key={product.id}
								product={product}
							/>
						))
					)}
				</Main>
			</AuthProvider>
		</Meta>
	)
}
