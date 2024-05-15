import { cn } from '@lib/utils'
import type { FC, PropsWithChildren } from 'react'

import { CartDialog } from '@containers/cart/dialogs/CartDialog'

import { Button, type ButtonProps } from '@ui/Button'

import { addToCart } from '@redux/cart/cart.slice'
import { useAppDispatch } from '@redux/store'

import type { CartItem } from '@/types/cart.interface'

interface BuyNowButtonProps extends ButtonProps {
	items: CartItem[]
}

export const BuyNowButton: FC<PropsWithChildren<BuyNowButtonProps>> = ({
	items,
	className,
	children,
	...props
}) => {
	const dispatch = useAppDispatch()
	const addManyToCart = () => {
		items.forEach(item => dispatch(addToCart(item)))
	}

	return (
		<CartDialog>
			<Button
				className={cn('md:hover:underline', className)}
				onClick={() => addManyToCart()}
				{...props}
			>
				{children}
			</Button>
		</CartDialog>
	)
}
