import { Routes } from '@config'
import { cn } from '@lib/utils'
import { Heart, Home, List, ShoppingCart } from 'lucide-react'
import { memo } from 'react'

import { CartDialog } from '@containers/cart/dialogs/CartDialog'

import { useCart } from '@hooks/useCart'

import * as SideBar from './layout'

const Aside = memo(() => {
	const { totalItems } = useCart()
	return (
		<aside
			className={cn(
				'fixed bottom-0 md:top-0 md:bottom-auto text-foreground bg-popover border-muted border-t shadow-md md:shadow-none',
				'w-full md:w-20 md:pb-4 md:px-0 h-16 md:h-screen z-20'
			)}
		>
			<SideBar.Items>
				<SideBar.Item href={Routes.Home} Icon={Home} title='Home' />
				<CartDialog>
					<SideBar.Item Icon={ShoppingCart} title='Cart'>
						<p
							className={cn(
								'absolute text-xs rounded-full h-fit w-fit bg-destructive',
								'right-[8px] top-[2px] px-1.5 py-0.5 text-white hidden md:block',
								{
									'md:hidden': totalItems < 1
								}
							)}
						>
							{totalItems < 100 ? totalItems : '99+'}
						</p>
					</SideBar.Item>
				</CartDialog>
				<SideBar.Profile />
				<SideBar.Item href={Routes.Favorites} Icon={Heart} title='Favorites' />
				<SideBar.Item href={Routes.Orders} Icon={List} title='Orders' />
			</SideBar.Items>
		</aside>
	)
})
Aside.displayName = 'Aside'
export { Aside }
