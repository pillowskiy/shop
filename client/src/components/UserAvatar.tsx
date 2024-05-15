'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@common/Avatar'
import { cn } from '@lib/utils'
import type { AvatarImageProps } from '@radix-ui/react-avatar'
import type { FC } from 'react'

import { Skeleton } from '@ui/Skeleton'

interface UserAvatarProps extends AvatarImageProps {}

export const UserAvatar: FC<UserAvatarProps> = ({ className, ...props }) => {
	return (
		<Avatar className={className}>
			<AvatarImage
				className={cn('object-cover object-top', className)}
				{...props}
			/>
			<AvatarFallback>
				<Skeleton />
			</AvatarFallback>
		</Avatar>
	)
}
