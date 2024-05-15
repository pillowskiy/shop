import { MCard } from '@common/Card'
import { opacityListAnimation } from '@lib/animations'
import type { FC } from 'react'

import { UserCommentForm } from '@containers/comment/forms/UserCommentForm'

interface UserCommentCard {
	userId: number
}

export const UserCommentCard: FC<UserCommentCard> = ({ userId }) => {
	return (
		<MCard
			id='feed-back'
			className='p-4 mt-4 bg-popover'
			initial='initial'
			animate='animate'
			custom={3}
			variants={opacityListAnimation}
		>
			<UserCommentForm userId={userId} />
		</MCard>
	)
}
