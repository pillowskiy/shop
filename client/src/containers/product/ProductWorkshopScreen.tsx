import ProductService from '@api/services/product.service'
import AuthProvider from '@providers/AuthProvider'
import { useQuery } from '@tanstack/react-query'
import type { FC } from 'react'

import { Loader } from '@containers/Loader'
import { Main } from '@containers/Main'
import { Meta } from '@containers/Meta'
import { NotFoundScreen } from '@containers/NotFoundScreen'

import { ProductWorkShop } from './containers/workshop'

interface WorkshopScreenProps {
	id: string
}

export const ProductWorkshopScreen: FC<WorkshopScreenProps> = ({ id }) => {
	const { data: product, isInitialLoading } = useQuery(
		['get product by id', id],
		() => {
			return ProductService.getByValue('id', +id)
		},
		{
			select: ({ data }) => data,
			enabled: !!id && id !== '@me'
		}
	)

	if ((!product && isInitialLoading) || !id) {
		return <Loader />
	}

	if (!product && id !== '@me' && !isInitialLoading) {
		return <NotFoundScreen />
	}

	return (
		<Meta title={`Workshop ${product?.name || ''}`}>
			<AuthProvider forAuth={true}>
				<Main className='flex flex-col justify-center items-center min-h-screen-64 gap-4 relative'>
					<ProductWorkShop product={product} />
				</Main>
			</AuthProvider>
		</Meta>
	)
}
