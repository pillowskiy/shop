import { Avatar, AvatarFallback, AvatarImage } from '@common/Avatar'
import { MCard } from '@common/Card'
import { Routes } from '@config'
import { transformBottomY } from '@lib/animations'
import { cn } from '@lib/utils'
import Link from 'next/link'
import type { FC } from 'react'

import { UserActionButtons } from '@containers/user/layout/ActionButtons'

import { Button } from '@ui/Button'
import { Skeleton } from '@ui/Skeleton'

import { useProfile } from '@hooks/useProfile'

import type { User } from '@/types/user.interface'

interface UserActionCardProps {
	user: User
}

export const UserActionCard: FC<UserActionCardProps> = ({ user }) => {
	const { profile } = useProfile()

	return (
		<MCard
			className='h-fit p-4 flex flex-col items-center gap-4 bg-popover'
			initial='initial'
			animate='animate'
			custom={1}
			variants={transformBottomY}
		>
			<Avatar className='w-full h-auto max-w-[220px] rounded-lg border'>
				<AvatarImage
					className='object-cover object-top'
					src={user.avatarURL}
					width={360}
					height={360}
				/>
				<AvatarFallback>
					<Skeleton />
				</AvatarFallback>
			</Avatar>

			<button
				className={cn(
					'w-full px-1 py-2 h-10 bg-white border shadow-sm rounded-lg',
					'uppercase font-bold text-center select-none'
				)}
				disabled
			>
				<p className='drop-shadow-lg text-primary shadow-muted-200'>
					{user.roles.at(-1)}
				</p>
			</button>

			{user.id === profile?.id ? (
				<Link className='w-full' href={Routes.ProfileWorkshop}>
					<Button className='w-full'>Edit profile</Button>
				</Link>
			) : (
				<UserActionButtons className='w-full' />
			)}
		</MCard>
	)
}
