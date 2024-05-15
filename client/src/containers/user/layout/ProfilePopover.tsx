import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger
} from '@common/DropdownMenu'
import { Routes } from '@config'
import type { DropdownMenuProps } from '@radix-ui/react-dropdown-menu'
import { useQueryClient } from '@tanstack/react-query'
import {
	Gift,
	LifeBuoy,
	List,
	LogOut,
	Mails,
	Package,
	Plus,
	Send,
	Truck,
	User as UserIcon
} from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import type { FC, PropsWithChildren } from 'react'

import { useAppDispatch } from '@redux/store'
import { logout as logoutAction } from '@redux/user/user.actions'

import type { User } from '@/types/user.interface'

interface ProfilePopoverProps extends DropdownMenuProps {
	profile: User
}

export const ProfilePopover: FC<PropsWithChildren<ProfilePopoverProps>> = ({
	children,
	profile,
	...props
}) => {
	const dispatch = useAppDispatch()
	const queryClient = useQueryClient()
	const router = useRouter()

	const logout = () => {
		dispatch(logoutAction()).finally(() => {
			queryClient.removeQueries(['get profile'])
			return router.reload()
		})
	}

	return (
		<DropdownMenu {...props}>
			<DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
			<DropdownMenuContent className='w-56'>
				<DropdownMenuLabel>{profile.name}</DropdownMenuLabel>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link className='w-full' href={`${Routes.Users}/${profile.id}`}>
						<DropdownMenuItem>
							<UserIcon className='mr-2 h-4 w-4' />
							<span>Your Profile</span>
						</DropdownMenuItem>
					</Link>
					<DropdownMenuItem>
						<List className='mr-2 h-4 w-4' />
						<span>Your Orders</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<DropdownMenuItem disabled>
						<Send className='mr-2 h-4 w-4' />
						<span>Correspondences</span>
					</DropdownMenuItem>
					<DropdownMenuItem disabled>
						<Mails className='mr-2 h-4 w-4' />
						<span>Mailings</span>
					</DropdownMenuItem>
					<DropdownMenuItem disabled>
						<Gift className='mr-2 h-4 w-4' />
						<span>Gifts</span>
					</DropdownMenuItem>
				</DropdownMenuGroup>
				<DropdownMenuItem disabled>
					<Truck className='mr-2 h-4 w-4' />
					<span>Delivery</span>
				</DropdownMenuItem>
				<DropdownMenuItem>
					<LifeBuoy className='mr-2 h-4 w-4' />
					<span>Support</span>
				</DropdownMenuItem>

				<DropdownMenuSeparator />
				<DropdownMenuGroup>
					<Link className='w-full' href={`${Routes.ProductWorkshop}/@me`}>
						<DropdownMenuItem>
							<Plus className='mr-2 h-4 w-4' />
							<span>Create Product</span>
						</DropdownMenuItem>
					</Link>
					<Link
						className='w-full'
						href={`${Routes.UserProducts}/${profile.id}`}
					>
						<DropdownMenuItem>
							<Package className='mr-2 h-4 w-4' />
							<span>Your Products</span>
						</DropdownMenuItem>
					</Link>
				</DropdownMenuGroup>
				<DropdownMenuSeparator />
				<DropdownMenuItem onClick={logout}>
					<LogOut className='mr-2 h-4 w-4' />
					<span>Log out</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
