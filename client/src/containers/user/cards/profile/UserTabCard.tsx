import CommentService from '@api/services/comment.service'
import { MCard } from '@common/Card'
import { opacityListAnimation } from '@lib/animations'
import { cn } from '@lib/utils'
import { useQuery } from '@tanstack/react-query'
import type { FC, PropsWithChildren } from 'react'

import { ProfileCommentCard } from '@containers/comment/cards/ProfileCommentCard'

interface UserTabCardProps {
	userId: number
}

const UserTabContainer: FC<PropsWithChildren<{ className?: string }>> = ({
	children,
	className
}) => {
	return (
		<MCard
			className={cn('p-4 bg-popover mt-4', className)}
			initial='initial'
			animate='animate'
			custom={4}
			variants={opacityListAnimation}
		>
			{children}
		</MCard>
	)
}

export const UserTabCard: FC<UserTabCardProps> = ({ userId }) => {
	const { data } = useQuery(
		['get comments', userId],
		() => {
			return CommentService.getById(userId)
		},
		{
			select: ({ data }) => data
		}
	)

	if (!data?.comments.length) {
		return (
			<UserTabContainer className='text-center'>
				<h2 className='text-xl sm:text-2xl font-medium py-4 select-none'>
					🙅 There are not items yet.
				</h2>
			</UserTabContainer>
		)
	}

	return (
		<UserTabContainer>
			{data.comments.map(comment => (
				<ProfileCommentCard
					key={comment.id}
					comment={comment}
					userId={userId}
				/>
			))}
		</UserTabContainer>
	)
}
