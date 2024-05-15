import { cn } from '@lib/utils'
import type { FC } from 'react'

import { UserAvatar } from '@components/UserAvatar'

import { ProfileHoverCard } from '@containers/user/cards/popover/ProfileHoverCard'

import type { User } from '@/types/user.interface'

interface CommentUserHeaderProps {
	user?: User
	subtitle?: string
}

export const CommentUserHeader: FC<CommentUserHeaderProps> = ({
	user,
	subtitle
}) => {
	return (
		<ProfileHoverCard user={user}>
			<header className='flex items-center gap-2 w-fit'>
				{/*TEMP src*/}
				<UserAvatar
					className='rounded-full h-8 w-8 m-auto'
					src={
						user?.avatarURL ||
						'https://static.vecteezy.com/system/resources/previews/019/896/008/original/male-user-avatar-icon-in-flat-design-style-person-signs-illustration-png.png'
					}
					alt={user?.name || 'Customer Avatar'}
				/>
				<section>
					<h2
						className={cn('font-medium text-lg leading-5 transition-all', {
							'md:hover:underline cursor-pointer': !!user
						})}
					>
						{user?.name || 'Customer'}
					</h2>
					<p className='text-primary opacity-90 text-xs leading-3'>
						{subtitle || 'Customer feedback'}
					</p>
				</section>
			</header>
		</ProfileHoverCard>
	)
}
